import { relations } from 'drizzle-orm';
import { integer, pgTable, serial, timestamp } from 'drizzle-orm/pg-core';
import { courses } from './courses';

export const semesters = pgTable('semesters', {
  id: serial('id').primaryKey(),
  semester: integer('semester').notNull().unique(),
  createdAt: timestamp('created_at', { mode: 'string' }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { mode: 'string' }).notNull().defaultNow(),
});

export const semestersRelations = relations(semesters, ({ many }) => ({
  courses: many(courses),
}));
