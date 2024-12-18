import { Course } from './course';

export interface Semester {
  id: number;
  semester: number;
  createdAt?: string;
  updatedAt?: string;
}

export type SemesterWithCourses = Semester & { courses?: Course[] };
