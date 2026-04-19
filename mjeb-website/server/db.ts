import { eq, desc } from "drizzle-orm";
import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";
import { InsertUser, users, articles, galleryItems, partners, contactMessages, InsertContactMessage } from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;
let client: ReturnType<typeof createClient> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db) {
    try {
      if (!client) {
        client = createClient({
          url: ENV.databaseUrl,
        });
      }
      _db = drizzle(client);
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

    await db.insert(users).values(values).onConflictDoUpdate({
      target: users.openId,
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

// Articles queries
export async function getPublishedArticles(limit = 10) {
  const db = await getDb();
  if (!db) return [];
  return db
    .select()
    .from(articles)
    .where(eq(articles.published, true))
    .orderBy((t) => t.publishedAt)
    .limit(limit);
}

export async function getArticleBySlug(slug: string) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db
    .select()
    .from(articles)
    .where(eq(articles.slug, slug))
    .limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function getAllArticles() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(articles).orderBy((t) => t.createdAt);
}

export async function createArticle(data: any) {
  const db = await getDb();
  if (!db) return null;
  const result = await db.insert(articles).values(data).returning();
  return result[0];
}

export async function updateArticle(id: number, data: any) {
  const db = await getDb();
  if (!db) return null;
  const result = await db.update(articles).set({ ...data, updatedAt: new Date() }).where(eq(articles.id, id)).returning();
  return result[0];
}

export async function deleteArticle(id: number) {
  const db = await getDb();
  if (!db) return false;
  await db.delete(articles).where(eq(articles.id, id));
  return true;
}

// Gallery queries
export async function getGalleryByCategory(category: string) {
  const db = await getDb();
  if (!db) return [];
  return db
    .select()
    .from(galleryItems)
    .where(eq(galleryItems.category, category))
    .orderBy((t) => t.createdAt);
}

export async function getAllGalleryCategories() {
  const db = await getDb();
  if (!db) return [];
  const items = await db.select().from(galleryItems);
  const categorySet = new Set(items.map((item) => item.category));
  const categories = Array.from(categorySet);
  return categories.sort();
}

export async function getAllGalleryItems() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(galleryItems).orderBy((t) => t.createdAt);
}

export async function createGalleryItem(data: any) {
  const db = await getDb();
  if (!db) return null;
  const result = await db.insert(galleryItems).values(data).returning();
  return result[0];
}

export async function deleteGalleryItem(id: number) {
  const db = await getDb();
  if (!db) return false;
  await db.delete(galleryItems).where(eq(galleryItems.id, id));
  return true;
}

// Partners queries
export async function getAllPartners() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(partners).orderBy((t) => t.createdAt);
}

export async function createPartner(data: any) {
  const db = await getDb();
  if (!db) return null;
  const result = await db.insert(partners).values(data).returning();
  return result[0];
}

export async function updatePartner(id: number, data: any) {
  const db = await getDb();
  if (!db) return null;
  const result = await db.update(partners).set({ ...data, updatedAt: new Date() }).where(eq(partners.id, id)).returning();
  return result[0];
}

export async function deletePartner(id: number) {
  const db = await getDb();
  if (!db) return false;
  await db.delete(partners).where(eq(partners.id, id));
  return true;
}

// Contact messages
export async function createContactMessage(data: InsertContactMessage) {
  const db = await getDb();
  if (!db) return null;
  const result = await db.insert(contactMessages).values(data);
  return result;
}
