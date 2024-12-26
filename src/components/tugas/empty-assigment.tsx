import Image from 'next/image';

export default function EmptyAssignment() {
  return (
    <div className='w-full flex flex-col justify-center items-center'>
      <Image
        src='/images/no_task.svg'
        alt='empty'
        width={305}
        height={257}
        className='mb-4 select-none pointer-events-none'
        draggable={false}
      />
      <h3 className='text-base font-semibold text-neutral-600 mb-2'>Belum ada tugas</h3>
      <p className='text-sm text-center text-neutral-600'>
        Saat ini belum ada tugas yang tersedia. Tugas akan muncul disini
      </p>
    </div>
  );
}
