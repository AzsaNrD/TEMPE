interface SummaryCard {
  title: string;
  count: number;
  description: string;
  icon: React.ReactNode;
}

export default function SummaryCard({ title, count, description, icon }: SummaryCard) {
  return (
    <div className='bg-white rounded-lg border border-neutral-200 md:shadow p-6'>
      <div className='flex justify-between'>
        <h2 className='font-medium text-xl mb-4'>{title}</h2>
        {icon}
      </div>
      <h2 className='text-2xl font-bold mb-4'>{count}</h2>
      <p className='text-sm text-neutral-600'>{description}</p>
    </div>
  );
}
