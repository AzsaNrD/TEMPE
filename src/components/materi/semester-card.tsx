import Link from 'next/link';
import { Folder } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Course } from '@/types/course';
import DropdownMateri from '@/components/materi/dropdown-materi';
import { Semester } from '@/types/semester';
import AlertDeleteSemester from './delete-semester';

interface SemesterCardProps {
  semester: number;
  semesters: Semester[];
  materi?: Course[];
}

export default function SemesterCard({ semester, semesters, materi = [] }: SemesterCardProps) {
  return (
    <div className='bg-white md:shadow rounded-lg border border-neutral-200 h-fit'>
      <div className='p-6 flex justify-between items-center'>
        <h2 className='text-xl font-semibold'>Semester {semester}</h2>
        <AlertDeleteSemester
          semester={semesters.find((s) => s.semester === semester) as Semester}
        />
      </div>
      <Separator />
      <div className='px-6 py-6 flex flex-col gap-4'>
        {materi.length === 0 ? (
          <p className='text-sm text-neutral-600'>Belum ada materi untuk semester ini.</p>
        ) : (
          materi.map((item) => (
            <div key={item.id} className='flex justify-between items-center relative'>
              <Link
                href={item.link}
                target='_blank'
                rel='noopener noreferrer'
                className='hover:underline flex items-center gap-2 text-neutral-600 text-sm'
              >
                <Folder size={20} />
                <span>{item.name}</span>
              </Link>
              <DropdownMateri semesters={semesters} materi={item} />
            </div>
          ))
        )}
      </div>
    </div>
  );
}
