import {
  getAssignmentsPaginated,
  getUserAssignmentsWithStatusPaginated,
} from '@/actions/assignment';
import { getCourses } from '@/actions/course';
import { AssignmentCard } from '@/components/tugas/assignment-card';
import { auth } from '@/lib/auth';
import { PaginationBar } from '@/components/ui/pagination-bar';
import EmptyAssignment from '@/components/tugas/empty-assigment';
import EmptySearch from './empty-search';

interface AssignmentListProps {
  query?: string;
  type?: string;
  status?: string;
  page?: string;
}

export async function AssignmentList({ query, type, status, page }: AssignmentListProps) {
  const session = await auth();
  const courses = await getCourses();

  const assignments = session?.user
    ? await getUserAssignmentsWithStatusPaginated(session.user.npm, {
        query,
        type,
        status,
        page: Number(page),
      })
    : await getAssignmentsPaginated({ query, type, status, page: Number(page) });

  if (!assignments?.data?.data || assignments.data.data.length === 0) {
    return (
      <div className='flex sm:flex-col flex-wrap items-center justify-center h-full gap-2 text-neutral-500 py-6 select-none'>
        {query || type || status ? <EmptySearch /> : <EmptyAssignment />}
      </div>
    );
  }

  const { data, currentPage, totalPages } = assignments.data;

  return (
    <>
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
        {data.map((assignment) => (
          <AssignmentCard
            key={assignment.id}
            assignment={assignment}
            courses={courses.data || []}
            isLoggedIn={!!session?.user}
          />
        ))}
      </div>
      {data.length > 6 && (
        <div className='my-6'>
          <PaginationBar currentPage={currentPage} totalPages={totalPages} />
        </div>
      )}
    </>
  );
}
