'use server';

import { format } from 'date-fns';
import { db } from '@/db/drizzle';
import { assignments } from '@/db/schema/assignments';
import { ActionResponse } from '@/types/response';
import { revalidatePath } from 'next/cache';
import { validateAdminOrDosen } from '../validations/access';
import { Assignment, AssignmentWithCourse, AssignmentWithStatus } from '@/types/assignment';
import { and, asc, count, desc, eq, ilike, or, sql, SQL } from 'drizzle-orm';
import { assignmentsStatus } from '@/db/schema/assignments-status';
import { courses } from '@/db/schema';
import { auth } from '@/lib/auth';

interface AssignmentFilter {
  query?: string;
  type?: string;
  status?: string;
  page?: number;
}

export async function insertAssignment(
  data: Omit<Assignment, 'id' | 'addedBy' | 'createdAt' | 'updatedAt'>,
): Promise<ActionResponse<string>> {
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
      .insert(assignments)
      .values({ ...data, deadline: format(data.deadline, 'yyyy-MM-dd HH:mm:ss'), addedBy: npm })
      .returning();

    revalidatePath('/assignments');

    return {
      success: true,
      data: null,
      message: 'Tugas berhasil ditambahkan.',
    };
  } catch (e) {
    const error = e as Error & { code?: string };

    if (error.code === '23505') {
      return {
        success: false,
        data: null,
        message: 'Tugas dengan data ini sudah ada.',
      };
    }

    return {
      success: false,
      data: null,
      message: error.message,
    };
  }
}

export async function getCountUrgentAssignments(): Promise<ActionResponse<{ count: number }[]>> {
  try {
    const result = await db
      .select({ count: count() })
      .from(assignments)
      .where(
        and(
          sql`DATE(assignments.deadline) >= DATE_TRUNC('week', CURRENT_DATE)`,
          sql`DATE(assignments.deadline) <= DATE_TRUNC('week', CURRENT_DATE) + INTERVAL '6 days'`,
        ),
      );

    return {
      success: true,
      data: result,
      message: 'Berhasil mendapatkan total daftar tugas mendesak.',
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

export async function getLatestAssignments(): Promise<ActionResponse<AssignmentWithStatus[]>> {
  try {
    const result = await db
      .select({
        id: assignments.id,
        courseId: assignments.courseId,
        courseName: courses.name,
        title: assignments.title,
        description: assignments.description,
        type: assignments.type,
        deadline: assignments.deadline,
        link: assignments.link,
        addedBy: assignments.addedBy,
        createdAt: assignments.createdAt,
        updatedAt: assignments.updatedAt,
      })
      .from(assignments)
      .leftJoin(courses, eq(courses.id, assignments.courseId))
      .orderBy(desc(assignments.deadline))
      .limit(4);

    return {
      success: true,
      data: result as AssignmentWithStatus[],
      message: 'Berhasil mendapatkan daftar tugas terbaru.',
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

export async function getAssignmentsPaginated(
  filters?: AssignmentFilter,
  limit: number = 6,
): Promise<
  ActionResponse<{
    data: AssignmentWithCourse[];
    currentPage: number;
    totalPages: number;
    totalItems: number;
  }>
> {
  try {
    const conditions: SQL[] = [];

    if (filters?.query) {
      const queryCondition = or(
        ilike(courses.name, `%${filters.query}%`),
        ilike(assignments.title, `%${filters.query}%`),
      );
      conditions.push(queryCondition!);
    }

    const validTypes = ['individu', 'kelompok', 'vclass', 'kuis'] as const;
    if (filters?.type && validTypes.includes(filters.type as (typeof validTypes)[number])) {
      conditions.push(eq(assignments.type, filters.type as (typeof validTypes)[number]));
    }

    const whereCondition = conditions.length ? and(...conditions) : undefined;

    const totalItems = await db
      .select({ count: sql`COUNT(*)` })
      .from(assignments)
      .leftJoin(courses, eq(assignments.courseId, courses.id))
      .where(whereCondition);

    const total = Number(totalItems[0]?.count || 0);

    const totalPages = Math.ceil(total / limit);

    const offset = ((filters?.page || 1) - 1) * limit;

    const result = await db
      .select({
        id: assignments.id,
        courseId: assignments.courseId,
        courseName: courses.name,
        title: assignments.title,
        description: assignments.description,
        type: assignments.type,
        deadline: assignments.deadline,
        link: assignments.link,
        addedBy: assignments.addedBy,
        createdAt: assignments.createdAt,
        updatedAt: assignments.updatedAt,
      })
      .from(assignments)
      .leftJoin(courses, eq(assignments.courseId, courses.id))
      .where(whereCondition)
      .orderBy(asc(assignments.deadline))
      .limit(limit)
      .offset(offset);

    const modifiedResult = result.map((item) => ({
      ...item,
      isCompleted: null,
    }));

    return {
      success: true,
      data: {
        data: modifiedResult as AssignmentWithCourse[],
        currentPage: Number(filters?.page || 1),
        totalPages,
        totalItems: total,
      },
      message: 'Berhasil mendapatkan daftar tugas.',
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

export async function getUserAssignmentsWithStatusPaginated(
  npm: string,
  filters?: AssignmentFilter,
  limit: number = 6,
): Promise<
  ActionResponse<{
    data: AssignmentWithStatus[];
    currentPage: number;
    totalPages: number;
    totalItems: number;
  }>
> {
  try {
    const conditions: SQL[] = [];

    if (filters?.query) {
      const queryCondition = or(
        ilike(courses.name, `%${filters.query}%`),
        ilike(assignments.title, `%${filters.query}%`),
      );
      conditions.push(queryCondition!);
    }

    const validTypes = ['individu', 'kelompok', 'vclass', 'kuis'] as const;
    if (filters?.type && validTypes.includes(filters.type as (typeof validTypes)[number])) {
      conditions.push(eq(assignments.type, filters.type as (typeof validTypes)[number]));
    }

    if (filters?.status === 'true' || filters?.status === 'false') {
      const isCompletedValue = filters.status === 'true';
      conditions.push(
        eq(sql<boolean>`COALESCE(assignments_status.is_completed, false)`, isCompletedValue),
      );
    }

    const whereCondition = conditions.length ? and(...conditions) : undefined;

    const totalItems = await db
      .select({ count: sql`COUNT(*)` })
      .from(assignments)
      .leftJoin(courses, eq(assignments.courseId, courses.id))
      .leftJoin(
        assignmentsStatus,
        and(eq(assignments.id, assignmentsStatus.assignmentId), eq(assignmentsStatus.userId, npm)),
      )
      .where(whereCondition);

    const total = Number(totalItems[0]?.count || 0);

    const totalPages = Math.ceil(total / limit);

    const offset = ((filters?.page || 1) - 1) * limit;

    const result = await db
      .select({
        id: assignments.id,
        title: assignments.title,
        courseName: courses.name,
        courseId: assignments.courseId,
        description: assignments.description,
        type: assignments.type,
        deadline: assignments.deadline,
        link: assignments.link,
        isCompleted: sql<boolean>`COALESCE(assignments_status.is_completed, false)`,
        completedAt: assignmentsStatus.completedAt,
      })
      .from(assignments)
      .leftJoin(courses, eq(assignments.courseId, courses.id))
      .leftJoin(
        assignmentsStatus,
        and(eq(assignments.id, assignmentsStatus.assignmentId), eq(assignmentsStatus.userId, npm)),
      )
      .where(whereCondition)
      .orderBy(
        asc(sql`COALESCE(assignments_status.is_completed, false)`),
        asc(assignments.deadline),
      )
      .limit(limit)
      .offset(offset);

    return {
      success: true,
      data: {
        data: result as AssignmentWithStatus[],
        currentPage: filters?.page || 1,
        totalPages,
        totalItems: total,
      },
      message: 'Berhasil mendapatkan daftar tugas dengan status.',
    };
  } catch (error) {
    const e = error as Error;
    return {
      success: false,
      data: null,
      message: e.message,
    };
  }
}

export async function updateAssignment(
  id: number,
  data: Partial<Omit<Assignment, 'id' | 'createdAt' | 'updatedAt'>>,
): Promise<ActionResponse<string>> {
  try {
    await validateAdminOrDosen();

    const result = await db.update(assignments).set(data).where(eq(assignments.id, id)).returning();

    if (!result.length) {
      return {
        success: false,
        data: null,
        message: 'Tugas tidak ditemukan.',
      };
    }

    revalidatePath('/assignments');

    return {
      success: true,
      data: null,
      message: 'Tugas berhasil diperbarui.',
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

export async function deleteAssignment(id: number): Promise<ActionResponse<string>> {
  try {
    await validateAdminOrDosen();

    const result = await db.delete(assignments).where(eq(assignments.id, id)).returning();

    if (!result.length) {
      return {
        success: false,
        data: null,
        message: 'Tugas tidak ditemukan.',
      };
    }

    revalidatePath('/assignments');

    return {
      success: true,
      data: null,
      message: 'Tugas berhasil dihapus.',
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
