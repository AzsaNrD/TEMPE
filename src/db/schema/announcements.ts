import { pgTable, serial, timestamp, varchar } from 'drizzle-orm/pg-core';
import { users } from '@/db/schema';
import { relations } from 'drizzle-orm';

export const announcements = pgTable('announcements', {
  id: serial('id').primaryKey(),
  title: varchar('title', { length: 100 }).notNull(),
  description: varchar('description', { length: 150 }).notNull(),
  addedBy: varchar('added_by', { length: 8 })
    .notNull()
    .references(() => users.npm),
  createdAt: timestamp('created_at', { mode: 'string' }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { mode: 'string' }).notNull().defaultNow(),
});

export const announcementsRelations = relations(announcements, ({ one }) => ({
  addedByUser: one(users, {
    fields: [announcements.addedBy],
    references: [users.npm],
  }),
}));
