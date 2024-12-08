import { date } from 'drizzle-orm/mysql-core';
import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';
import { sql } from 'drizzle-orm';

export const usersTable = sqliteTable('users', {
    id: integer('id').primaryKey(),
    email: text('email').notNull(),
    nickname: text('nickname').notNull(),
    passwordHash: text('password_hash').notNull(),  // camelCase pro ORM
    token: text('token'),
    tokenExpires: text('token_expires'),
    isEmailVerified: integer('is_email_verified').default(0).notNull(),
    isOnline: integer('is_online').default(0).notNull(),
    userLevel: integer('user_level').default(1).notNull(),
    createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`).notNull(),
    updatedAt: text('updated_at').default(sql`CURRENT_TIMESTAMP`).notNull(),
    profileImage: text('profile_image').default("https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg"),
  });

export const temata = sqliteTable('themes', {
    id: integer('id').primaryKey(),
    name: text('name').notNull(),
    content: text('content').notNull(),
    verified: integer('verified').default(0).notNull(),
    createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`).notNull()
});

export const komentare = sqliteTable('coments', {
    id: integer('id').primaryKey(),
    themeId: integer('theme_id').references(() => temata.id).notNull(),
    content: text('content').notNull(),
    posterId: integer('poster_id').notNull(),
    createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`).notNull()
});