'use server';

import { db } from '@/db/drizzle';
import { announcements } from '@/db/schema/announcements';
import { ActionResponse } from '@/types/response';
import { revalidatePath } from 'next/cache';
import { auth } from '@/lib/auth';
import { validateAdminOrDosen } from '../validations/access';
import { and, desc, eq, ilike, SQL, sql } from 'drizzle-orm';
import { Announcement } from '@/types/announcement';

interface AnnouncementFilter {
  query?: string;
  page?: number;
}

const PAGE_LIMIT = 4;

export async function insertAnnouncement(data: {
  title: string;
  description: string;
}): Promise<ActionResponse<string>> {
  try {
    await validateAdminOrDosen();

    const session = await auth();
    if (!session?.user) {
      return {
        success: false,
        data: null,
        message: 'Anda belum login.',
      };
    }

    const { npm } = session.user;

    await db
      .insert(announcements)
      .values({ ...data, addedBy: npm })
      .returning();

    revalidatePath('/');

    return {
      success: true,
      data: null,
      message: 'Pengumuman berhasil ditambahkan.',
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

export async function getAnnouncementsPaginated(filters?: AnnouncementFilter): Promise<
  ActionResponse<{
    data: Announcement[];
    currentPage: number;
    totalPages: number;
    totalItems: number;
  }>
> {
  try {
    const conditions: SQL[] = [];
    if (filters?.query) {
      conditions.push(ilike(announcements.title, `%${filters.query}%`));
    }

    const whereCondition = conditions.length ? and(...conditions) : undefined;

    const totalItemsResult = await db
      .select({ count: sql`COUNT(*)` })
      .from(announcements)
      .where(whereCondition);

    const totalItems = Number(totalItemsResult[0]?.count || 0);
    const totalPages = Math.ceil(totalItems / PAGE_LIMIT);
    const offset = ((filters?.page || 1) - 1) * PAGE_LIMIT;

    const result = await db
      .select()
      .from(announcements)
      .where(whereCondition)
      .orderBy(desc(announcements.createdAt))
      .limit(PAGE_LIMIT)
      .offset(offset);

    return {
      success: true,
      data: {
        data: result as Announcement[],
        currentPage: filters?.page || 1,
        totalPages,
        totalItems,
      },
      message: 'Berhasil mendapatkan daftar pengumuman.',
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

export async function updateAnnouncement(
  id: number,
  data: { title?: string; description?: string },
): Promise<ActionResponse<string>> {
  try {
    await validateAdminOrDosen();

    const result = await db
      .update(announcements)
      .set(data)
      .where(eq(announcements.id, id))
      .returning();

    if (!result.length) {
      return {
        success: false,
        data: null,
        message: 'Pengumuman tidak ditemukan.',
      };
    }

    revalidatePath('/');

    return {
      success: true,
      data: null,
      message: 'Pengumuman berhasil diperbarui.',
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

export async function deleteAnnouncement(id: number): Promise<ActionResponse<string>> {
  try {
    await validateAdminOrDosen();

    const result = await db.delete(announcements).where(eq(announcements.id, id)).returning();

    if (!result.length) {
      return {
        success: false,
        data: null,
        message: 'Pengumuman tidak ditemukan.',
      };
    }

    revalidatePath('/');

    return {
      success: true,
      data: null,
      message: 'Pengumuman berhasil dihapus.',
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
