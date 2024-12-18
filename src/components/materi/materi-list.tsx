import SemesterCard from '@/components/materi/semester-card';
import { Semester, SemesterWithCourses } from '@/types/semester';

interface MateriListProps {
  semesters: Semester[] | undefined;
  daftarMateriKuliah: SemesterWithCourses[];
}

export default function MateriList({ semesters = [], daftarMateriKuliah = [] }: MateriListProps) {
  return (
    <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
      {daftarMateriKuliah.map((item) => (
        <SemesterCard key={item.id} semester={item.semester} semesters={semesters} materi={item.courses} />
      ))}
    </div>
  );
}
