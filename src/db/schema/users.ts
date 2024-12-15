import { pgEnum, pgTable, text, timestamp, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import * as z from 'zod';

export const rolesEnum = pgEnum('role', ['admin', 'mahasiswa', 'dosen']);
export const gendersEnum = pgEnum('gender', ['laki-laki', 'perempuan']);

export const users = pgTable('users', {
  npm: varchar('npm', { length: 8 }).primaryKey(),
  nama: varchar('nama', { length: 100 }).notNull(),
  email: varchar('email', { length: 254 }).unique(),
  role: rolesEnum().default('mahasiswa').notNull(),
  gender: gendersEnum().notNull(),
  password: text('password').notNull(),
  createdAt: timestamp('created_at', { mode: 'string' }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { mode: 'string' }).notNull().defaultNow(),
});

export const UserSchema = createSelectSchema(users);
export const NewUserSchema = createInsertSchema(users).pick({
  npm: true,
  nama: true,
  email: true,
  role: true,
  gender: true,
  password: true,
})

export type TUser = z.infer<typeof UserSchema>;
export type TNewUser = z.infer<typeof NewUserSchema>;