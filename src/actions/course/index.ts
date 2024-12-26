'use server';

import { db } from '@/db/drizzle';
import { courses } from '@/db/schema/courses';
import { Course } from '@/types/course';
import { ActionResponse } from '@/types/response';
import { revalidatePath } from 'next/cache';
import { validateAdminOrDosen } from '../validations/access';
import { asc, eq, sql } from 'drizzle-orm';

export async function insertCourse(
  npm: string,
  data: { semesterId: number; name: string; link: string },
): Promise<ActionResponse<string>> {
  try {
    await validateAdminOrDosen();
    await db.insert(courses).values(data).returning();

    revalidatePath('/mata-kuliah');

    return {
      success: true,
      data: null,
      message: 'Mata kuliah berhasil ditambahkan.',
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

export async function getCourses(): Promise<ActionResponse<Course[]>> {
  try {
    const result = await db.select().from(courses).orderBy(asc(courses.name));

    return {
      success: true,
      data: result,
      message: 'Berhasil mendapatkan daftar mata kuliah.',
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

export async function updateCourse(
  data: Partial<Course> & { id: number },
): Promise<ActionResponse<string>> {
  try {
    await validateAdminOrDosen();

    const result = await db
      .update(courses)
      .set({
        semesterId: data.semesterId,
        name: data.name,
        link: data.link,
        updatedAt: sql`now()`,
      })
      .where(eq(courses.id, data.id))
      .returning();

    if (!result.length) {
      return {
        success: false,
        data: null,
        message: 'Mata kuliah tidak ditemukan.',
      };
    }

    revalidatePath('/mata-kuliah');

    return {
      success: true,
      data: null,
      message: 'Mata kuliah berhasil diperbarui.',
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

export async function deleteCourse(npm: string, courseId: number): Promise<ActionResponse<string>> {
  try {
    await validateAdminOrDosen();

    const result = await db.delete(courses).where(eq(courses.id, courseId)).returning();

    if (!result.length) {
      return {
        success: false,
        data: null,
        message: 'Mata kuliah tidak ditemukan.',
      };
    }

    revalidatePath('/mata-kuliah');

    return {
      success: true,
      data: null,
      message: 'Mata kuliah berhasil dihapus.',
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
