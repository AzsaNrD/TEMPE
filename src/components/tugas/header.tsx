import DialogAdd from '@/components/tugas/dialog-add';
import { Suspense } from 'react';
import { ButtonSkeleton } from '@/components/skeleton/button';
import { SelectType } from '@/components/tugas/select-type';
import { SelectStatus } from '@/components/tugas/select-status';
import Search from '@/components/ui/search';

interface HeaderWithFiltersProps {
  isLoggedIn: boolean;
}

export function Header({ isLoggedIn }: HeaderWithFiltersProps) {
  return (
    <div className='flex xl:flex-row flex-col xl:justify-between xl:items-center sm:gap-6'>
      <div>
        <h1 className='text-2xl font-semibold'>Daftar Tugas</h1>
        <p className='mt-2 text-neutral-600 text-sm'>Sebaiknya jangan terlalu santai</p>
      </div>
      <div className='flex flex-col xl:flex-row mt-6 xl:mt-0 gap-2'>
        <Search placeholder='Cari tugas' />
        <div className='grid grid-cols-2 sm:flex sm:justify-end gap-2'>
          <SelectType />
          {isLoggedIn && (
            <>
              <SelectStatus />
              <Suspense fallback={<ButtonSkeleton />}>
                <DialogAdd />
              </Suspense>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
