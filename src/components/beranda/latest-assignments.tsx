import { getLatestAssignments } from '@/actions/assignment';
import { formatIndonesianDate } from '@/lib/date-utils';
import { ArrowRight, Calendar } from 'lucide-react';
import Link from 'next/link';

export default async function LatestAssignments() {
  const assignments = await getLatestAssignments();

  if (!assignments?.data || assignments.data.length === 0) {
    return (
      <div className='bg-white rounded-lg border border-neutral-200 md:shadow mb-6 p-6'>
        <div className='flex justify-between items-center'>
          <h2 className='font-medium text-xl'>🚀 Tugas Terbaru</h2>
          <Link href='/tugas' className='flex items-center gap-2 hover:underline'>
            <span className='font-medium text-sm text-neutral-600'>Lihat Semua</span>
            <ArrowRight size={16} className='text-neutral-600' />
          </Link>
        </div>
        <p className='mt-6 text-sm text-neutral-600'>Belum ada tugas terbaru.</p>
      </div>
    );
  }

  return (
    <div className='bg-white rounded-lg border border-neutral-200 md:shadow mb-6 p-6'>
      <div className='flex justify-between items-center'>
        <h2 className='font-medium text-xl'>🚀 Tugas Terbaru</h2>
        <Link href='/tugas' className='flex items-center gap-2 hover:underline'>
          <span className='font-medium text-sm text-neutral-600'>Lihat Semua</span>
          <ArrowRight size={16} className='text-neutral-600' />
        </Link>
      </div>
      <div className='flex flex-col gap-4 mt-6'>
        {assignments.data.map((item) => (
          <div
            key={item.id}
            className='bg-white rounded-md border border-neutral-200 flex flex-col sm:flex-row justify-between p-4'
          >
            <div className='flex flex-col gap-2'>
              <h3 className='font-medium'>{item.title}</h3>
              <p className='text-sm text-neutral-600'>{item.courseName}</p>
            </div>
            <div className='flex items-center gap-2 mt-3 sm:mt-0'>
              <Calendar size={16} strokeWidth={2} className='text-neutral-600 sm:hidden' />
              <p className='text-xs text-neutral-600 sm:font-normal sm:text-sm'>
                {formatIndonesianDate(item.deadline)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
