#!/usr/bin/env node

/**
 * Script de migration SQLite vers PostgreSQL
 * Utilisation: npm run db:migrate-to-postgres
 */

import { drizzle } from 'drizzle-orm/libsql';
import { createClient } from '@libsql/client';
import { drizzle as drizzlePg } from 'drizzle-orm/pg';
import { Pool } from 'pg';
import { eq } from 'drizzle-orm';
import { users, articles, galleryItems, partners, contactMessages } from '../drizzle/schema.js';

async function migrateData() {
  console.log('🚀 Démarrage de la migration SQLite → PostgreSQL');

  // Connexion SQLite (source)
  const sqliteClient = createClient({ url: 'file:./sqlite.db' });
  const sqliteDb = drizzle(sqliteClient);

  // Connexion PostgreSQL (destination)
  const pgPool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
  });
  const pgDb = drizzlePg(pgPool);

  try {
    console.log('📖 Lecture des données depuis SQLite...');

    // Migrer les utilisateurs
    const sqliteUsers = await sqliteDb.select().from(users);
    console.log(`👥 Migration de ${sqliteUsers.length} utilisateurs...`);
    for (const user of sqliteUsers) {
      await pgDb.insert(users).values({
        ...user,
        createdAt: new Date(user.createdAt),
        updatedAt: new Date(user.updatedAt),
        lastSignedIn: new Date(user.lastSignedIn),
      }).onConflictDoNothing();
    }

    // Migrer les articles
    const sqliteArticles = await sqliteDb.select().from(articles);
    console.log(`📰 Migration de ${sqliteArticles.length} articles...`);
    for (const article of sqliteArticles) {
      await pgDb.insert(articles).values({
        ...article,
        published: Boolean(article.published),
        publishedAt: article.publishedAt ? new Date(article.publishedAt) : null,
        createdAt: new Date(article.createdAt),
        updatedAt: new Date(article.updatedAt),
      }).onConflictDoNothing();
    }

    // Migrer la galerie
    const sqliteGallery = await sqliteDb.select().from(galleryItems);
    console.log(`🖼️ Migration de ${sqliteGallery.length} éléments de galerie...`);
    for (const item of sqliteGallery) {
      await pgDb.insert(galleryItems).values({
        ...item,
        createdAt: new Date(item.createdAt),
        updatedAt: new Date(item.updatedAt),
      }).onConflictDoNothing();
    }

    // Migrer les partenaires
    const sqlitePartners = await sqliteDb.select().from(partners);
    console.log(`🤝 Migration de ${sqlitePartners.length} partenaires...`);
    for (const partner of sqlitePartners) {
      await pgDb.insert(partners).values({
        ...partner,
        createdAt: new Date(partner.createdAt),
        updatedAt: new Date(partner.updatedAt),
      }).onConflictDoNothing();
    }

    // Migrer les messages de contact
    const sqliteMessages = await sqliteDb.select().from(contactMessages);
    console.log(`💬 Migration de ${sqliteMessages.length} messages de contact...`);
    for (const message of sqliteMessages) {
      await pgDb.insert(contactMessages).values({
        ...message,
        read: Boolean(message.read),
        createdAt: new Date(message.createdAt),
      }).onConflictDoNothing();
    }

    console.log('✅ Migration terminée avec succès !');

  } catch (error) {
    console.error('❌ Erreur lors de la migration:', error);
    throw error;
  } finally {
    await sqliteClient.close();
    await pgPool.end();
  }
}

// Exécuter la migration
migrateData().catch(console.error);