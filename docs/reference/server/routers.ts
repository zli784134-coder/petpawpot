import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router, protectedProcedure, adminProcedure } from "./_core/trpc";
import { z } from "zod";
import * as db from "./db";

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  blog: router({
    getComments: publicProcedure
      .input(z.object({ slug: z.string() }))
      .query(async ({ input }) => {
        return await db.getCommentsByArticle(input.slug, true);
      }),

    addComment: publicProcedure
      .input(
        z.object({
          articleSlug: z.string(),
          userName: z.string().min(1),
          email: z.string().email(),
          content: z.string().min(1),
        })
      )
      .mutation(async ({ input }) => {
        return await db.addComment({
          articleSlug: input.articleSlug,
          userName: input.userName,
          email: input.email,
          content: input.content,
          approved: 0,
        });
      }),
  }),

  newsletter: router({
    subscribe: publicProcedure
      .input(z.object({ email: z.string().email() }))
      .mutation(async ({ input }) => {
        return await db.subscribeEmail(input.email);
      }),

    unsubscribe: publicProcedure
      .input(z.object({ email: z.string().email() }))
      .mutation(async ({ input }) => {
        await db.unsubscribeEmail(input.email);
        return { success: true };
      }),
  }),

  cms: router({
    // Content management
    getContent: publicProcedure
      .input(z.object({ key: z.string(), language: z.enum(["en", "zh"]) }))
      .query(async ({ input }) => {
        return await db.getCmsContent(input.key, input.language);
      }),

    getContentByCategory: publicProcedure
      .input(z.object({ category: z.string(), language: z.enum(["en", "zh"]).optional() }))
      .query(async ({ input }) => {
        return await db.getCmsContentByCategory(input.category, input.language);
      }),

    getAllContent: publicProcedure
      .input(z.object({ language: z.enum(["en", "zh"]).optional() }))
      .query(async ({ input }) => {
        return await db.getAllCmsContent(input.language);
      }),

    updateContent: protectedProcedure
      .input(
        z.object({
          key: z.string(),
          language: z.enum(["en", "zh"]),
          value: z.string(),
          category: z.string(),
          description: z.string().optional(),
        })
      )
      .mutation(async ({ input, ctx }) => {
        if (!ctx.user) throw new Error("User not authenticated");
        const result = await db.createOrUpdateCmsContent(
          input.key,
          input.language,
          input.value,
          input.category,
          ctx.user.id,
          input.description
        );
        await db.createAuditLog(
          ctx.user.id,
          "update",
          "content",
          0,
          `Updated content: ${input.key} (${input.language})`
        );
        return result;
      }),

    // Image management
    getImage: publicProcedure
      .input(z.object({ key: z.string() }))
      .query(async ({ input }) => {
        return await db.getCmsImage(input.key);
      }),

    getImagesByPage: publicProcedure
      .input(z.object({ page: z.string() }))
      .query(async ({ input }) => {
        return await db.getCmsImagesByPage(input.page);
      }),

    getImagesByCategory: publicProcedure
      .input(z.object({ category: z.string() }))
      .query(async ({ input }) => {
        return await db.getCmsImagesByCategory(input.category);
      }),

    uploadImage: protectedProcedure
      .input(
        z.object({
          key: z.string(),
          base64Data: z.string(), // Base64 encoded file data
          fileName: z.string(),
          category: z.string(),
          page: z.string(),
          fileSize: z.number().optional(),
          mimeType: z.string().optional(),
          alt: z.string().optional(),
          description: z.string().optional(),
        })
      )
      .mutation(async ({ input, ctx }) => {
        if (!ctx.user) throw new Error("User not authenticated");

        // Decode base64 and upload to S3 storage
        const { storagePut } = await import("./storage");
        const buffer = Buffer.from(input.base64Data, "base64");
        const storageKey = `cms-images/${input.key}`;
        const { url } = await storagePut(
          storageKey,
          buffer,
          input.mimeType || "image/jpeg"
        );

        const result = await db.createOrUpdateCmsImage(
          input.key,
          url,
          input.fileName,
          input.category,
          input.page,
          ctx.user.id,
          input.fileSize,
          input.mimeType,
          input.alt,
          input.description
        );
        await db.createAuditLog(
          ctx.user.id,
          "update",
          "image",
          0,
          `Uploaded image: ${input.key}`
        );
        return result;
      }),

    updateImage: protectedProcedure
      .input(
        z.object({
          id: z.number(),
          alt: z.string().optional(),
          description: z.string().optional(),
        })
      )
      .mutation(async ({ input, ctx }) => {
        if (!ctx.user) throw new Error("User not authenticated");
        const result = await db.updateCmsImage(
          input.id,
          input.alt,
          input.description
        );
        await db.createAuditLog(
          ctx.user.id,
          "update",
          "image",
          input.id,
          `Updated image metadata: ID ${input.id}`
        );
        return result;
      }),

    deleteImage: adminProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ input, ctx }) => {
        if (!ctx.user) throw new Error("User not authenticated");
        await db.createAuditLog(
          ctx.user.id,
          "delete",
          "image",
          input.id,
          `Deleted image with ID: ${input.id}`
        );
        return await db.deleteCmsImage(input.id);
      }),
  }),
});

export type AppRouter = typeof appRouter;
