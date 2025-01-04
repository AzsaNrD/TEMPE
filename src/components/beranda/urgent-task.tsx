import { getCountUrgentAssignments } from '@/actions/assignment';
import SummaryCard from '@/components/beranda/summary-card';
import { Bell } from 'lucide-react';

export default async function UrgentTask() {
  const count = await getCountUrgentAssignments();

  return (
    <SummaryCard
      title='Tugas Mendesak'
      icon={<Bell className='text-red-600' />}
      count={count?.data?.[0]?.count || 0}
      description='Perlu diselesaikan minggu ini'
    />
  );
}
