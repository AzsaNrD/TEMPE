import { Skeleton } from '@/components/ui/skeleton';
import { Separator } from '@/components/ui/separator';

export function AssignmentCardSkeleton() {
  return (
    <div className='bg-white md:shadow rounded-md border border-neutral-200'>
      <div className='p-6 relative flex flex-col gap-4'>
        <Skeleton className='h-6 w-2/3 bg-neutral-200' />
        <div className='flex gap-2 items-center'>
          <Skeleton className='h-5 w-1/3 bg-neutral-200' />
        </div>
      </div>
      <Separator />
      <div className='p-6 flex flex-col gap-4'>
        <Skeleton className='h-5 w-full bg-neutral-200' />
        <Skeleton className='h-5 w-5/6 bg-neutral-200' />
        <div className='flex gap-2'>
          <Skeleton className='h-5 w-20 bg-neutral-200 rounded-md' />
          <Skeleton className='h-5 w-28 bg-neutral-200 rounded-md' />
        </div>
        <div className='flex justify-between items-center'>
          <div className='flex gap-2'>
            <Skeleton className='h-5 w-32 bg-neutral-200' />
          </div>
          <Skeleton className='h-5 w-24 bg-neutral-200' />
        </div>
      </div>
      <Separator />
      <div className='px-6 py-3 flex justify-between items-center'>
        <Skeleton className='h-10 w-32 bg-neutral-200 rounded-md' />
        <Skeleton className='h-10 w-32 bg-neutral-200 rounded-md' />
      </div>
    </div>
  );
}
