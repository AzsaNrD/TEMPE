'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

const statusOptions = [
  {
    value: 'false',
    label: 'Belum Dikerjakan',
  },
  {
    value: 'true',
    label: 'Sudah Dikerjakan',
  },
];

const DEFAULT_STATUS = 'default';

export function SelectStatus() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const paramValue = searchParams?.get('status') || DEFAULT_STATUS;

  const isValidStatus = statusOptions.some((status) => status.value === paramValue);
  const validValue = isValidStatus ? paramValue : DEFAULT_STATUS;

  const handleSelectChange = (value: string) => {
    const params = new URLSearchParams(searchParams?.toString() || '');

    if (value !== DEFAULT_STATUS) {
      params.set('status', value);
    } else {
      params.delete('status');
    }

    router.replace(`${pathname}?${params.toString()}`);
  };

  return (
    <Select onValueChange={handleSelectChange} value={validValue}>
      <SelectTrigger className='sm:w-[170px]' aria-label='status'>
        <SelectValue placeholder={validValue === DEFAULT_STATUS ? 'Semua Status' : undefined} />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value={DEFAULT_STATUS}>Semua Status</SelectItem>
        {statusOptions.map((status) => (
          <SelectItem key={status.value} value={status.value}>
            {status.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
