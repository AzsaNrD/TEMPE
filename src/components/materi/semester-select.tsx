'use client';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Semester } from '@/types/semester';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

interface SemesterSelectProps {
  semesters: Semester[];
}

export default function SemesterSelect({ semesters }: SemesterSelectProps) {
  const selectParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const paramValue = selectParams.get('sem') ?? 'default';
  const selectedSemester = semesters.some((semester) => semester.semester === Number(paramValue))
    ? paramValue
    : 'default';

  const handleSelectChange = (value: string) => {
    const params = new URLSearchParams(selectParams);

    if (value !== 'default') {
      params.set('sem', value);
    } else {
      params.delete('sem');
    }

    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <Select onValueChange={handleSelectChange} value={selectedSemester}>
      <SelectTrigger className='sm:w-[150px]'>
        <SelectValue placeholder='Pilih Semester' />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value='default'>Pilih Semester</SelectItem>
          {semesters.map((semester) => (
            <SelectItem key={semester.id} value={`${semester.semester}`}>
              Semester {semester.semester}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
