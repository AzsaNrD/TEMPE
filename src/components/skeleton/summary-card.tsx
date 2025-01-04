export default function SummaryCardSkeleton() {
  return (
    <div className='bg-white rounded-lg border border-neutral-200 md:shadow p-6 animate-pulse'>
      <div className='flex justify-between'>
        <h2 className='font-medium text-xl mb-4 bg-gray-200 rounded h-6 w-32'></h2>
        <div className='h-8 w-8 bg-gray-200 rounded-full'></div>
      </div>
      <div className='text-2xl font-bold mb-4'>
        <div className='h-8 w-16 bg-gray-200 rounded'></div>
      </div>
      <div className='text-sm text-neutral-600'>
        <p className='h-4 w-48 bg-gray-200 rounded'></p>
      </div>
    </div>
  );
}
