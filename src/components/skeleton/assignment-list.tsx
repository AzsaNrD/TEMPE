import { AssignmentCardSkeleton } from '@/components/skeleton/assignment-card';

export function AssignmentListSkeleton() {
  return (
    <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
      {Array.from({ length: 4 }).map((_, index) => (
        <div key={index}>
          <AssignmentCardSkeleton />
        </div>
      ))}
    </div>
  );
}
