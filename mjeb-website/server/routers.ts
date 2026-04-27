import { COOKIE_NAME } from "@shared/const";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router, adminProcedure } from "./_core/trpc";
import { z } from "zod";
import {
  getPublishedArticles,
  getArticleBySlug,
  getAllArticles,
  createArticle,
  updateArticle,
  deleteArticle,
  createPartner,
  updatePartner,
  deletePartner,
  getAllGalleryCategories,
  getGalleryByCategory,
  createGalleryItem,
  deleteGalleryItem,
  getAllGalleryItems,
  getAllPartners,
  createContactMessage,
} from "./db";

export const appRouter = router({
  system: systemRouter,
  auth: router({
    login: publicProcedure
      .input(z.object({ code: z.string(), state: z.string() }))
      .mutation(async () => {
        throw new Error(
          "L'administration est temporairement desactivee. Contactez l'equipe MJEB."
        );
      }),
    me: publicProcedure.query(async ({ ctx }) => {
      return ctx.user;
    }),
    logout: publicProcedure.mutation(({ ctx }) => {
      ctx.res.clearCookie(COOKIE_NAME, { path: "/" });
      return { success: true };
    }),
  }),

  // Articles/Actualités routes
  articles: router({
    list: publicProcedure.query(async () => {
      return getPublishedArticles(10);
    }),
    adminList: adminProcedure.query(async () => {
      return getAllArticles();
    }),
    getBySlug: publicProcedure
      .input(z.string())
      .query(async ({ input }) => {
        return getArticleBySlug(input);
      }),
    create: adminProcedure
      .input(z.object({
        title: z.string(),
        slug: z.string(),
        description: z.string().optional(),
        content: z.string().optional(),
        published: z.boolean().optional(),
        imageUrl: z.string().optional()
      }))
      .mutation(async ({ input }) => {
        const data: any = { ...input };
        if (input.published) { data.publishedAt = new Date(); }
        return createArticle(data);
      }),
    update: adminProcedure
      .input(z.object({
        id: z.number(),
        data: z.object({
           title: z.string().optional(),
           slug: z.string().optional(),
           description: z.string().optional(),
           content: z.string().optional(),
           published: z.boolean().optional(),
           imageUrl: z.string().optional()
        })
      }))
      .mutation(async ({ input }) => {
        const payload: any = { ...input.data };
        if (input.data.published) { payload.publishedAt = new Date(); }
        return updateArticle(input.id, payload);
      }),
    delete: adminProcedure
      .input(z.number())
      .mutation(async ({ input }) => {
        return deleteArticle(input);
      })
  }),

  // Gallery routes
  gallery: router({
    list: publicProcedure.query(async () => {
      return getAllGalleryItems();
    }),
    listByCategory: publicProcedure
      .input(z.string())
      .query(async ({ input }) => {
        return getGalleryByCategory(input);
      }),
    categories: publicProcedure.query(async () => {
      return getAllGalleryCategories();
    }),
    create: adminProcedure
      .input(z.object({
        title: z.string().optional(),
        description: z.string().optional(),
        category: z.string(),
        mediaUrl: z.string(),
        mediaType: z.enum(["image", "video"]).default("image"),
      }))
      .mutation(async ({ input }) => {
        return createGalleryItem({ ...input, mediaKey: "local" });
      }),
    delete: adminProcedure
      .input(z.number())
      .mutation(async ({ input }) => {
        return deleteGalleryItem(input);
      })
  }),

  // Partners routes
  partners: router({
    list: publicProcedure.query(async () => {
      return getAllPartners();
    }),
    create: adminProcedure
      .input(z.object({
        name: z.string(),
        description: z.string().optional(),
        category: z.string().optional(),
        website: z.string().optional(),
        logoUrl: z.string().optional()
      }))
      .mutation(async ({ input }) => {
        return createPartner({ ...input, logoKey: "local" });
      }),
    update: adminProcedure
      .input(z.object({
        id: z.number(),
        data: z.object({
          name: z.string().optional(),
          description: z.string().optional(),
          category: z.string().optional(),
          website: z.string().optional(),
          logoUrl: z.string().optional()
        })
      }))
      .mutation(async ({ input }) => {
        return updatePartner(input.id, input.data);
      }),
    delete: adminProcedure
      .input(z.number())
      .mutation(async ({ input }) => {
        return deletePartner(input);
      })
  }),

  uploadFile: adminProcedure
    .input(z.object({
      filename: z.string().max(100),
      base64: z.string(),
    }))
    .mutation(async ({ input }) => {
      const fs = await import("fs");
      const path = await import("path");
      const matches = input.base64.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
      if (!matches) throw new Error('Invalid base64 string');

      // Validation du type MIME
      const mimeType = matches[1];
      const allowedMimes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
      if (!allowedMimes.includes(mimeType)) {
        throw new Error('Type de fichier non autorisé. Seules les images sont acceptées.');
      }

      const buffer = Buffer.from(matches[2], 'base64');

      // Limite de taille: 5MB
      const maxSizeBytes = 5 * 1024 * 1024;
      if (buffer.length > maxSizeBytes) {
        throw new Error('Fichier trop volumineux. Taille maximale: 5MB.');
      }

      const uniqueName = `${Date.now()}-${input.filename.replace(/[^a-zA-Z0-9.-]/g, '_')}`;
      const dir = path.join(process.cwd(), 'client', 'public', 'uploads');
      if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
      fs.writeFileSync(path.join(dir, uniqueName), buffer);
      return { url: `/uploads/${uniqueName}` };
    }),

  // Contact routes
  contact: router({
    submit: publicProcedure
      .input(
        z.object({
          name: z.string().min(1),
          email: z.string().email(),
          message: z.string().min(1),
        })
      )
      .mutation(async ({ input }) => {
        const result = await createContactMessage({
          name: input.name,
          email: input.email,
          message: input.message,
        });
        return { success: !!result };
      }),
  }),
});

export type AppRouter = typeof appRouter;
