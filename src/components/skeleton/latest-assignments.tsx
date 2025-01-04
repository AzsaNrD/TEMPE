import { Skeleton } from '@/components/ui/skeleton';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function LatestAssignmentsSkeleton() {
  return (
    <div className='bg-white rounded-lg border border-neutral-200 md:shadow mb-6 p-6'>
      <div className='flex justify-between items-center mb-6'>
        <h2 className='font-medium text-xl'>🚀 Tugas Terbaru</h2>
        <Link href='/tugas' className='flex items-center gap-2 hover:underline'>
          <span className='font-medium text-sm text-neutral-600'>Lihat Semua</span>
          <ArrowRight size={16} className='text-neutral-600' />
        </Link>
      </div>
      <div className='flex flex-col gap-4'>
        {Array.from({ length: 3 }).map((_, index) => (
          <div
            key={index}
            className='bg-white rounded-md border border-neutral-200 flex flex-col sm:flex-row justify-between p-4'
          >
            <div className='flex flex-col gap-2'>
              <Skeleton className='h-4 w-32' />
              <Skeleton className='h-4 w-24' />
            </div>
            <div className='flex items-center gap-2 mt-2'>
              <Skeleton className='h-4 w-20' />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
