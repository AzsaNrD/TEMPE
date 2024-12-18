import { integer, pgTable, serial, text, timestamp, varchar } from 'drizzle-orm/pg-core';
import { semesters } from './semesters';
import { relations } from 'drizzle-orm';

export const courses = pgTable('courses', {
  id: serial('id').primaryKey(),
  semesterId: integer('semester_id')
    .notNull()
    .references(() => semesters.id),
  name: varchar('name', { length: 100 }).notNull().unique(),
  link: text('link').notNull(),
  createdAt: timestamp('created_at', { mode: 'string' }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { mode: 'string' }).notNull().defaultNow(),
});

export const coursesRelations = relations(courses, ({ one }) => ({
  semesters: one(semesters, {
    fields: [courses.semesterId],
    references: [semesters.id],
  }),
}));
