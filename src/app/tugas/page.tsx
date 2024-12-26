import { Header } from '@/components/tugas/header';
import { auth } from '@/lib/auth';
import { AssignmentListSkeleton } from '@/components/skeleton/assignment-list';
import { Suspense } from 'react';
import { AssignmentList } from '@/components/tugas/assignment-list';

export default async function Page(props: {
  searchParams?: Promise<{
    query?: string;
    type?: string;
    status?: string;
    page?: string;
  }>;
}) {
  const session = await auth();
  const searchParams = await props.searchParams;
  const query = searchParams?.query || '';
  const type = searchParams?.type || '';
  const status = searchParams?.status || '';
  const page = searchParams?.page || '1';

  return (
    <div className='flex flex-col gap-8 h-full'>
      <Header isLoggedIn={!!session?.user} />
      <Suspense key={query + type + status + page} fallback={<AssignmentListSkeleton />}>
        <AssignmentList query={query} type={type} status={status} page={page} />
      </Suspense>
    </div>
  );
}
