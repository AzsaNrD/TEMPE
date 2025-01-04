import { getUserByNpm } from '@/actions/user';
import Announcements from '@/components/beranda/announcements';
import LatestAsignments from '@/components/beranda/latest-assignments';
import LatestCourse from '@/components/beranda/latest-course';
import UrgentTask from '@/components/beranda/urgent-task';
import { AnnouncementListSkeleton } from '@/components/skeleton/announcement-list';
import LatestAssignmentsSkeleton from '@/components/skeleton/latest-assignments';
import SummaryCardSkeleton from '@/components/skeleton/summary-card';
import { auth } from '@/lib/auth';
import { Suspense } from 'react';

export default async function Home(props: {
  searchParams?: Promise<{
    page?: string;
  }>;
}) {
  const session = await auth();
  const searchParams = await props.searchParams;
  const page = searchParams?.page || '1';
  const { data } = await getUserByNpm(session?.user.npm as string);

  return (
    <div>
      <div className='mb-7'>
        <h1 className='text-2xl font-semibold'>👋 Selamat Datang di TEMPE! {data?.user.nama}</h1>
        <p className='mt-2 text-neutral-600 text-sm'>
          Tugas Emang Perlu Dikerjain - Akses Informasi tugas kuliahmu dengan lebih mudah
        </p>
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6'>
        <Suspense fallback={<SummaryCardSkeleton />}>
          <UrgentTask />
        </Suspense>
        <Suspense fallback={<SummaryCardSkeleton />}>
          <LatestCourse />
        </Suspense>
      </div>

      <Suspense fallback={<LatestAssignmentsSkeleton />}>
        <LatestAsignments />
      </Suspense>

      <Suspense fallback={<AnnouncementListSkeleton />}>
        <Announcements page={page} />
      </Suspense>
    </div>
  );
}
