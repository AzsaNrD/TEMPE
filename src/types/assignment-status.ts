export interface AssignmentStatus {
  id: number;
  userId: string;
  assignmentId: number;
  courseId: number;
  isCompleted: boolean;
  completedAt: string | null;
}
