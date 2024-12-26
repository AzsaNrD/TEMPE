export interface Assignment {
  id?: number;
  courseId: number;
  title: string;
  description: string;
  deadline: string;
  type: 'individu' | 'kelompok' | 'vclass' | 'kuis';
  link?: string | null;
  addedBy: string;
  createdAt?: string;
  updatedAt?: string;
}

export type AssignmentWithCourse = Assignment & { courseName: string };

export type AssignmentWithStatus = Assignment & {
  isCompleted?: boolean;
  courseName?: string;
  completedAt?: string;
};
