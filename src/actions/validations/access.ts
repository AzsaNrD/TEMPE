'use server';

import { db } from '@/db/drizzle';
import { users } from '@/db/schema/users';
import { auth } from '@/lib/auth';
import { eq } from 'drizzle-orm';

export async function validateAdminOrDosen() {
  const npm = await auth();
  const user = await db.select().from(users).where(eq(users.npm, npm?.user.npm as string));

  if (user.length === 0) {
    throw new Error('Kamu tidak memiliki akses!');
  }

  if (user[0].role !== 'admin' && user[0].role !== 'dosen') {
    throw new Error('Kamu tidak memiliki akses!');
  }
}
