import { boolean, integer, pgTable, serial, timestamp, unique, varchar } from 'drizzle-orm/pg-core';
import { assignments, users } from '@/db/schema';
import { relations } from 'drizzle-orm';

export const assignmentsStatus = pgTable(
  'assignments_status',
  {
    id: serial('id').primaryKey(),
    assignmentId: integer('assignment_id')
      .notNull()
      .references(() => assignments.id, { onDelete: 'cascade' }),
    userId: varchar('user_id', { length: 8 })
      .notNull()
      .references(() => users.npm),
    isCompleted: boolean('is_completed').notNull().default(false),
    completedAt: timestamp('completed_at', { mode: 'string' }),
  },
  (table) => ({
    uniqueAssignmentUser: unique().on(table.assignmentId, table.userId),
  }),
);

export const assignmentsStatusRelations = relations(assignmentsStatus, ({ one }) => ({
  assignment: one(assignments, {
    fields: [assignmentsStatus.assignmentId],
    references: [assignments.id],
  }),
  user: one(users, {
    fields: [assignmentsStatus.userId],
    references: [users.npm],
  }),
}));
