'use server';

import { eq, sql } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import { db } from '@/db/drizzle';
import { users } from '@/db/schema/users';
import { User } from '@/types/user';
import { hashPassword, verifyPassword } from '@/lib/bcrypt';
import { ActionResponse } from '@/types/response';

export async function getUserByNpm(npm: string): Promise<ActionResponse<{ user: User }>> {
  try {
    const user = await db.select().from(users).where(eq(users.npm, npm));
    if (user.length === 0) throw new Error('Pengguna tidak ditemukan.');

    return {
      success: true,
      data: {
        user: {
          nama: user[0].nama,
          npm: user[0].npm,
          role: user[0].role,
          email: user[0].email || undefined,
          gender: user[0].gender,
        },
      },
    };
  } catch (e) {
    const error = e as Error;

    return {
      success: false,
      data: null,
      message: error.message,
    };
  }
}

export async function updateUserByNpm(
  npm: string,
  data: {
    nama: string;
    email: string;
  },
): Promise<ActionResponse<null>> {
  try {
    const updatedUser = await db
      .update(users)
      .set({ ...data, updatedAt: sql`now()` })
      .where(eq(users.npm, npm));
    if (!updatedUser.rowCount) throw new Error('Gagal memperbarui pengguna.');

    revalidatePath('/profil');

    return {
      success: true,
      data: null,
      message: 'Pengguna berhasil diperbarui.',
    };
  } catch (e) {
    const error = e as Error;

    return {
      success: false,
      data: null,
      message: error.message,
    };
  }
}

export async function updateUserPassword(
  npm: string,
  data: {
    currentPassword: string;
    newPassword: string;
  },
): Promise<ActionResponse<null>> {
  try {
    const user = await db.select().from(users).where(eq(users.npm, npm));
    if (user.length === 0) throw new Error('Pengguna tidak ditemukan.');

    const isPasswordValid = await verifyPassword(data.currentPassword, user[0].password);
    if (!isPasswordValid) throw new Error('Password saat ini salah.');

    const hashedNewPassword = await hashPassword(data.newPassword);
    const updatedUser = await db
      .update(users)
      .set({ password: hashedNewPassword, updatedAt: sql`now()` })
      .where(eq(users.npm, npm));

    if (!updatedUser.rowCount) throw new Error('Gagal memperbarui password.');

    revalidatePath('/profil');

    return {
      success: true,
      data: null,
      message: 'Password berhasil diperbarui.',
    };
  } catch (e) {
    const error = e as Error;

    return {
      success: false,
      data: null,
      message: error.message,
    };
  }
}
