'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

const DEFAULT_VALUE = 'default';

const types = [
  {
    value: 'individu',
    label: 'Individu',
  },
  {
    value: 'kelompok',
    label: 'Kelompok',
  },
  {
    value: 'vclass',
    label: 'Vclass',
  },
  {
    value: 'kuis',
    label: 'Kuis',
  },
];

export function SelectType() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const paramValue = searchParams?.get('type') || DEFAULT_VALUE;

  const isValidType = types.some((type) => type.value === paramValue);
  const validValue = isValidType ? paramValue : DEFAULT_VALUE;

  const handleSelectChange = (value: string) => {
    const params = new URLSearchParams(searchParams?.toString() || '');

    if (value !== DEFAULT_VALUE) {
      params.set('type', value);
    } else {
      params.delete('type');
    }

    router.replace(`${pathname}?${params.toString()}`);
  };

  return (
    <Select onValueChange={handleSelectChange} value={validValue}>
      <SelectTrigger className='sm:w-[150px]' aria-label='type'>
        <SelectValue placeholder={validValue === DEFAULT_VALUE ? 'Semua Tipe' : undefined} />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value={DEFAULT_VALUE}>Semua Tipe</SelectItem>
        {types.map((item) => (
          <SelectItem key={item.value} value={item.value}>
            {item.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
