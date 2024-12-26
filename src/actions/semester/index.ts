'use server';

import { db } from '@/db/drizzle';
import { semesters } from '@/db/schema/semesters';
import { ActionResponse } from '@/types/response';
import { revalidatePath } from 'next/cache';
import { validateAdminOrDosen } from '../validations/access';
import { Semester, SemesterWithCourses } from '@/types/semester';
import { asc, eq } from 'drizzle-orm';
import { courses } from '@/db/schema';

export async function insertSemester(
  npm: string,
  data: { semester: number },
): Promise<ActionResponse<string>> {
  try {
    await validateAdminOrDosen();
    await db.insert(semesters).values(data).returning();

    revalidatePath('/mata-kuliah');

    return {
      success: true,
      data: null,
      message: 'Semester berhasil ditambahkan.',
    };
  } catch (e) {
    const error = e as Error & { code?: string };

    if (error.code) {
      switch (error.code) {
        case '23505':
          return {
            success: false,
            data: null,
            message: `Semester ${data.semester} sudah ada.`,
          };
        default:
          return {
            success: false,
            data: null,
            message: `Database Error: ${error.message}`,
          };
      }
    }

    return {
      success: false,
      data: null,
      message: error.message,
    };
  }
}

export async function getSemesters(): Promise<ActionResponse<{ semesters: Semester[] }>> {
  try {
    const result = await db.select().from(semesters).orderBy(asc(semesters.semester));
    return {
      success: true,
      data: {
        semesters: result,
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

export async function getSemestersWithCourses(): Promise<
  ActionResponse<{ semesters: SemesterWithCourses[] }>
> {
  try {
    const result = await db.query.semesters.findMany({
      with: { courses: true },
      orderBy: asc(semesters.semester),
    });

    return {
      success: true,
      data: {
        semesters: result,
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

export async function deleteSemester(
  npm: string,
  semesterId: number,
): Promise<ActionResponse<string>> {
  try {
    await validateAdminOrDosen();

    const hasCourses = await db
      .select()
      .from(courses)
      .where(eq(courses.semesterId, semesterId))
      .limit(1);

    if (hasCourses.length > 0) {
      return {
        success: false,
        data: null,
        message:
          'Semester ini memiliki mata kuliah yang terkait. Hapus mata kuliah terlebih dahulu.',
      };
    }

    const result = await db.delete(semesters).where(eq(semesters.id, semesterId)).returning();

    if (!result.length) {
      return {
        success: false,
        data: null,
        message: 'Semester tidak ditemukan.',
      };
    }

    revalidatePath('/mata-kuliah');

    return {
      success: true,
      data: null,
      message: 'Semester berhasil dihapus.',
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
