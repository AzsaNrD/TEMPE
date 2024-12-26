import { integer, pgEnum, pgTable, serial, text, timestamp, varchar } from 'drizzle-orm/pg-core';
import { courses, users } from '@/db/schema';
import { relations } from 'drizzle-orm';

export const assignmentTypeEnum = pgEnum('type', ['individu', 'kelompok', 'vclass', 'kuis']);

export const assignments = pgTable('assignments', {
  id: serial('id').primaryKey(),
  courseId: integer('course_id')
    .notNull()
    .references(() => courses.id),
  addedBy: varchar('added_by', { length: 8 })
    .notNull()
    .references(() => users.npm),
  title: varchar('title', { length: 150 }).notNull(),
  type: assignmentTypeEnum().notNull(),
  description: text('description').notNull(),
  link: text('link'),
  deadline: timestamp('deadline', { mode: 'string' }).notNull(),
  createdAt: timestamp('created_at', { mode: 'string' }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { mode: 'string' }).notNull().defaultNow(),
});

export const assignmentsRelations = relations(assignments, ({ one }) => ({
  course: one(courses, {
    fields: [assignments.courseId],
    references: [courses.id],
  }),
  addedByUser: one(users, {
    fields: [assignments.addedBy],
    references: [users.npm],
  }),
}));
