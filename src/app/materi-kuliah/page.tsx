import { getSemesters, getSemestersWithCourses } from '@/actions/semester';
import { Header, MateriList, DropdownTambah, SemesterSelect } from '@/components/materi';

export default async function MaterKuliah(props: {
  searchParams?: Promise<{
    sem?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const semester = searchParams?.sem || '';

  const { data: semesters } = await getSemesters();
  const { data: semestersWithCourses } = await getSemestersWithCourses();

  const filteredSemestersWithCourses =
    semester === 'default' || !semester
      ? semestersWithCourses?.semesters
      : semestersWithCourses?.semesters.filter((s) => s.semester === Number(semester));

  return (
    <div className='flex flex-col gap-8'>
      <div className='flex lg:flex-row flex-col lg:justify-between lg:items-center gap-6'>
        <Header />
        <div className='flex gap-2'>
          {semesters?.semesters && (
            <>
              <SemesterSelect semesters={semesters.semesters} />
              <DropdownTambah semesters={semesters.semesters} />
            </>
          )}
        </div>
      </div>
      {filteredSemestersWithCourses && (
        <MateriList
          semesters={semesters?.semesters}
          daftarMateriKuliah={filteredSemestersWithCourses}
        />
      )}
    </div>
  );
}
