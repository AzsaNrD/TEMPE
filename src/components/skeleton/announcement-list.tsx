import { AnnouncementCardSkeleton } from '@/components/skeleton/announcement-card';

export function AnnouncementListSkeleton() {
  return (
    <div className='bg-white rounded-lg border border-neutral-200 md:shadow mb-6 p-6'>
      <div className='flex justify-between items-center'>
        <h2 className='font-medium text-xl'>📢 Pengumuman</h2>
      </div>
      <div className='mt-6 flex flex-col gap-4'>
        {Array.from({ length: 4 }).map((_, index) => (
          <AnnouncementCardSkeleton key={index} />
        ))}
      </div>
    </div>
  );
}
