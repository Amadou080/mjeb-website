import { sqliteTable, text, integer, real } from "drizzle-orm/sqlite-core";

// Users
export const users = sqliteTable("users", {
  id: integer("id").primaryKey(),
  openId: text("openId").notNull().unique(),
  name: text("name"),
  email: text("email"),
  loginMethod: text("loginMethod"),
  role: text("role").default("user").notNull(),
  createdAt: text("createdAt").default("CURRENT_TIMESTAMP").notNull(),
  updatedAt: text("updatedAt").default("CURRENT_TIMESTAMP").notNull(),
  lastSignedIn: text("lastSignedIn").default("CURRENT_TIMESTAMP").notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

// Articles
export const articles = sqliteTable("articles", {
  id: integer("id").primaryKey(),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  description: text("description"),
  content: text("content"),
  imageUrl: text("imageUrl"),
  imageKey: text("imageKey"),
  authorId: integer("authorId"),
  published: integer("published", { mode: "boolean" }).default(false).notNull(),
  publishedAt: text("publishedAt"),
  createdAt: text("createdAt").default("CURRENT_TIMESTAMP").notNull(),
  updatedAt: text("updatedAt").default("CURRENT_TIMESTAMP").notNull(),
});

export type Article = typeof articles.$inferSelect;
export type InsertArticle = typeof articles.$inferInsert;

// Gallery
export const galleryItems = sqliteTable("galleryItems", {
  id: integer("id").primaryKey(),
  title: text("title"),
  description: text("description"),
  mediaUrl: text("mediaUrl").notNull(),
  mediaKey: text("mediaKey").notNull(),
  mediaType: text("mediaType").default("image").notNull(),
  category: text("category").notNull(),
  uploadedBy: integer("uploadedBy"),
  createdAt: text("createdAt").default("CURRENT_TIMESTAMP").notNull(),
  updatedAt: text("updatedAt").default("CURRENT_TIMESTAMP").notNull(),
});

export type GalleryItem = typeof galleryItems.$inferSelect;
export type InsertGalleryItem = typeof galleryItems.$inferInsert;

// Partners
export const partners = sqliteTable("partners", {
  id: integer("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  logoUrl: text("logoUrl"),
  logoKey: text("logoKey"),
  website: text("website"),
  category: text("category"),
  createdAt: text("createdAt").default("CURRENT_TIMESTAMP").notNull(),
  updatedAt: text("updatedAt").default("CURRENT_TIMESTAMP").notNull(),
});

export type Partner = typeof partners.$inferSelect;
export type InsertPartner = typeof partners.$inferInsert;

// Contact Messages
export const contactMessages = sqliteTable("contactMessages", {
  id: integer("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  message: text("message").notNull(),
  read: integer("read", { mode: "boolean" }).default(false).notNull(),
  createdAt: text("createdAt").default("CURRENT_TIMESTAMP").notNull(),
});

export type ContactMessage = typeof contactMessages.$inferSelect;
export type InsertContactMessage = typeof contactMessages.$inferInsert;