'use server';

import { db } from '@/db/drizzle';
import { assignmentsStatus } from '@/db/schema/assignments-status';
import { auth } from '@/lib/auth';
import { AssignmentStatus } from '@/types/assignment-status';
import { ActionResponse } from '@/types/response';
import { and, eq, sql } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';

export async function createAssignmentStatus(
  data: Omit<AssignmentStatus, 'id' | 'completedAt' | 'userId'>,
): Promise<ActionResponse<string>> {
  try {
    const session = await auth();
    if (!session?.user) {
      return {
        success: false,
        data: null,
        message: 'Anda belum login.',
      };
    }

    await db
      .insert(assignmentsStatus)
      .values({
        ...data,
        userId: session.user.npm,
        completedAt: sql`now()`,
      })
      .returning();

    revalidatePath('/tugas');

    return {
      success: true,
      data: null,
      message: 'Status tugas berhasil ditambahkan.',
    };
  } catch (e) {
    const error = e as Error;

    if (error.message.includes('unique')) {
      return {
        success: false,
        data: null,
        message: 'Status tugas sudah ada.',
      };
    }

    return {
      success: false,
      data: null,
      message: error.message,
    };
  }
}


export async function deleteAssignmentStatus(
  assignmentId: number,
): Promise<ActionResponse<string>> {
  try {
    const session = await auth();
    if (!session?.user) {
      return {
        success: false,
        data: null,
        message: 'Anda belum login.',
      };
    }

    const result = await db
      .delete(assignmentsStatus)
      .where(
        and(
          eq(assignmentsStatus.assignmentId, assignmentId),
          eq(assignmentsStatus.userId, session.user.npm),
        ),
      )
      .returning();

    if (!result.length) {
      return {
        success: false,
        data: null,
        message: 'Status tugas tidak ditemukan.',
      };
    }

    revalidatePath('/tugas');

    return {
      success: true,
      data: null,
      message: 'Status tugas berhasil dihapus.',
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
