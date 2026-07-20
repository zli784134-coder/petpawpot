import { int, mysqlEnum, mysqlTable, text, timestamp, varchar, uniqueIndex } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: int("id").autoincrement().primaryKey(),
  /** Manus OAuth identifier (openId) returned from the OAuth callback. Unique per user. */
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

/**
 * Blog comments table
 */
export const blogComments = mysqlTable("blog_comments", {
  id: int("id").autoincrement().primaryKey(),
  articleSlug: varchar("articleSlug", { length: 255 }).notNull(),
  userId: int("userId"),
  userName: varchar("userName", { length: 255 }).notNull(),
  email: varchar("email", { length: 320 }).notNull(),
  content: text("content").notNull(),
  approved: int("approved").default(0).notNull(), // 0 = pending, 1 = approved, -1 = rejected
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type BlogComment = typeof blogComments.$inferSelect;
export type InsertBlogComment = typeof blogComments.$inferInsert;

/**
 * Email subscribers table
 */
export const emailSubscribers = mysqlTable("email_subscribers", {
  id: int("id").autoincrement().primaryKey(),
  email: varchar("email", { length: 320 }).notNull().unique(),
  subscribed: int("subscribed").default(1).notNull(), // 1 = subscribed, 0 = unsubscribed
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type EmailSubscriber = typeof emailSubscribers.$inferSelect;
export type InsertEmailSubscriber = typeof emailSubscribers.$inferInsert;


/**
 * CMS Content - Page copy and text content
 */
export const cmsContent = mysqlTable(
  "cms_content",
  {
    id: int("id").autoincrement().primaryKey(),
    key: varchar("key", { length: 255 }).notNull(), // e.g., "home.hero.title"
    language: mysqlEnum("language", ["en", "zh"]).notNull(), // English or Chinese
    value: text("value").notNull(), // The actual content
    description: text("description"), // Admin notes about this content
    category: varchar("category", { length: 100 }).notNull(), // e.g., "home", "product", "about"
    createdBy: int("createdBy").notNull(), // User ID who created it
    updatedBy: int("updatedBy"), // User ID who last updated it
    createdAt: timestamp("createdAt").defaultNow().notNull(),
    updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  },
  (table) => ({
    keyLanguageUnique: uniqueIndex("cms_content_key_lang_unique").on(table.key, table.language),
  })
);

export type CmsContent = typeof cmsContent.$inferSelect;
export type InsertCmsContent = typeof cmsContent.$inferInsert;

/**
 * CMS Images - Manage product images, banners, etc.
 */
export const cmsImages = mysqlTable("cms_images", {
  id: int("id").autoincrement().primaryKey(),
  key: varchar("key", { length: 255 }).notNull().unique(), // e.g., "product.hero.image"
  url: text("url").notNull(), // S3 storage URL
  fileName: varchar("fileName", { length: 255 }).notNull(), // Original file name
  fileSize: int("fileSize"), // File size in bytes
  mimeType: varchar("mimeType", { length: 100 }), // e.g., "image/jpeg"
  alt: text("alt"), // Alt text for accessibility
  description: text("description"), // Admin notes
  category: varchar("category", { length: 100 }).notNull(), // e.g., "hero", "product", "blog"
  page: varchar("page", { length: 100 }).notNull(), // Which page uses this image
  uploadedBy: int("uploadedBy").notNull(), // User ID who uploaded it
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type CmsImage = typeof cmsImages.$inferSelect;
export type InsertCmsImage = typeof cmsImages.$inferInsert;

/**
 * CMS Audit Log - Track all content changes
 */
export const cmsAuditLog = mysqlTable("cms_audit_log", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(), // User who made the change
  action: mysqlEnum("action", ["create", "update", "delete"]).notNull(),
  contentType: mysqlEnum("contentType", ["content", "image"]).notNull(),
  contentId: int("contentId").notNull(), // ID of the content/image
  oldValue: text("oldValue"), // Previous value (for updates)
  newValue: text("newValue"), // New value (for updates)
  description: text("description"), // What was changed
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type CmsAuditLog = typeof cmsAuditLog.$inferSelect;
export type InsertCmsAuditLog = typeof cmsAuditLog.$inferInsert;
