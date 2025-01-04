import { getCountLatestCourses } from '@/actions/course';
import SummaryCard from '@/components/beranda/summary-card';
import { Book } from 'lucide-react';

export default async function LatestCourse() {
  const count = await getCountLatestCourses();

  return (
    <SummaryCard
      title='Materi Terbaru'
      icon={<Book className='text-blue-500' />}
      count={count?.data?.[0]?.count || 0}
      description='Materi telah diunggah'
    />
  );
}
