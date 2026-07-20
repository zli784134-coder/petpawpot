import { eq, and, desc } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { InsertUser, users, blogComments, InsertBlogComment, emailSubscribers, InsertEmailSubscriber, cmsContent, cmsImages, cmsAuditLog } from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

// Blog Comments queries
export async function getCommentsByArticle(articleSlug: string, approvedOnly = true) {
  const db = await getDb();
  if (!db) return [];

  const query = db
    .select()
    .from(blogComments)
    .where(
      approvedOnly
        ? and(eq(blogComments.articleSlug, articleSlug), eq(blogComments.approved, 1))
        : eq(blogComments.articleSlug, articleSlug)
    )
    .orderBy(desc(blogComments.createdAt));

  return await query;
}

export async function addComment(comment: InsertBlogComment) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const result = await db.insert(blogComments).values(comment);
  return result;
}

export async function approveComment(commentId: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  return await db
    .update(blogComments)
    .set({ approved: 1 })
    .where(eq(blogComments.id, commentId));
}

export async function rejectComment(commentId: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  return await db
    .update(blogComments)
    .set({ approved: -1 })
    .where(eq(blogComments.id, commentId));
}

// Email Subscribers queries
export async function subscribeEmail(email: string) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const normalized = email.toLowerCase().trim();
  
  try {
    await db
      .insert(emailSubscribers)
      .values({ email: normalized, subscribed: 1 })
      .onDuplicateKeyUpdate({
        set: { subscribed: 1, updatedAt: new Date() },
      });
    return { success: true, email: normalized };
  } catch (error) {
    console.error("[Database] Failed to subscribe email:", error);
    throw error;
  }
}

export async function unsubscribeEmail(email: string) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const normalized = email.toLowerCase().trim();
  
  return await db
    .update(emailSubscribers)
    .set({ subscribed: 0 })
    .where(eq(emailSubscribers.email, normalized));
}

export async function getSubscribedEmails() {
  const db = await getDb();
  if (!db) return [];

  return await db
    .select()
    .from(emailSubscribers)
    .where(eq(emailSubscribers.subscribed, 1));
}

// CMS Content queries
export async function getCmsContent(key: string, language: 'en' | 'zh') {
  const db = await getDb();
  if (!db) return undefined;

  const result = await db
    .select()
    .from(cmsContent)
    .where(and(eq(cmsContent.key, key), eq(cmsContent.language, language)))
    .limit(1);

  return result.length > 0 ? result[0] : undefined;
}

export async function getAllCmsContent(language?: 'en' | 'zh') {
  const db = await getDb();
  if (!db) return [];

  if (language) {
    return await db.select().from(cmsContent).where(eq(cmsContent.language, language));
  }
  return await db.select().from(cmsContent);
}

export async function getCmsContentByCategory(category: string, language?: 'en' | 'zh') {
  const db = await getDb();
  if (!db) return [];

  if (language) {
    return await db
      .select()
      .from(cmsContent)
      .where(and(eq(cmsContent.category, category), eq(cmsContent.language, language)));
  }
  return await db.select().from(cmsContent).where(eq(cmsContent.category, category));
}

export async function createOrUpdateCmsContent(
  key: string,
  language: 'en' | 'zh',
  value: string,
  category: string,
  userId: number,
  description?: string
) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const existing = await getCmsContent(key, language);

  if (existing) {
    return await db
      .update(cmsContent)
      .set({
        value,
        description,
        updatedBy: userId,
      })
      .where(eq(cmsContent.id, existing.id));
  } else {
    return await db.insert(cmsContent).values({
      key,
      language,
      value,
      category,
      description,
      createdBy: userId,
    });
  }
}

// CMS Images queries
export async function getCmsImage(key: string) {
  const db = await getDb();
  if (!db) return undefined;

  const result = await db
    .select()
    .from(cmsImages)
    .where(eq(cmsImages.key, key))
    .limit(1);

  return result.length > 0 ? result[0] : undefined;
}

export async function getCmsImagesByPage(page: string) {
  const db = await getDb();
  if (!db) return [];

  return await db.select().from(cmsImages).where(eq(cmsImages.page, page));
}

export async function getCmsImagesByCategory(category: string) {
  const db = await getDb();
  if (!db) return [];

  return await db.select().from(cmsImages).where(eq(cmsImages.category, category));
}

export async function createOrUpdateCmsImage(
  key: string,
  url: string,
  fileName: string,
  category: string,
  page: string,
  userId: number,
  fileSize?: number,
  mimeType?: string,
  alt?: string,
  description?: string
) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const existing = await getCmsImage(key);

  if (existing) {
    return await db
      .update(cmsImages)
      .set({
        url,
        fileName,
        fileSize,
        mimeType,
        alt,
        description,
      })
      .where(eq(cmsImages.id, existing.id));
  } else {
    return await db.insert(cmsImages).values({
      key,
      url,
      fileName,
      fileSize,
      mimeType,
      alt,
      description,
      category,
      page,
      uploadedBy: userId,
    });
  }
}

export async function updateCmsImage(
  id: number,
  alt?: string,
  description?: string
) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const updateData: Record<string, unknown> = {};
  if (alt !== undefined) updateData.alt = alt;
  if (description !== undefined) updateData.description = description;

  if (Object.keys(updateData).length === 0) {
    return null;
  }

  return await db
    .update(cmsImages)
    .set(updateData)
    .where(eq(cmsImages.id, id));
}

export async function deleteCmsImage(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  return await db.delete(cmsImages).where(eq(cmsImages.id, id));
}

// Audit log
export async function createAuditLog(
  userId: number,
  action: 'create' | 'update' | 'delete',
  contentType: 'content' | 'image',
  contentId: number,
  description?: string,
  oldValue?: string,
  newValue?: string
) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  return await db.insert(cmsAuditLog).values({
    userId,
    action,
    contentType,
    contentId,
    description,
    oldValue,
    newValue,
  });
}
