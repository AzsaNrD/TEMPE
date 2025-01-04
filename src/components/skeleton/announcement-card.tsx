import { Skeleton } from '@/components/ui/skeleton';

export function AnnouncementCardSkeleton() {
  return (
    <div className='bg-white rounded-md border border-neutral-200 flex items-center justify-between p-4'>
      <div className='flex flex-col gap-2 w-full'>
        <Skeleton className='h-6 w-1/2 bg-neutral-200' />
        <Skeleton className='h-5 w-3/4 bg-neutral-200' />
      </div>
    </div>
  );
}
