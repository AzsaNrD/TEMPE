import Image from 'next/image';

export default function EmptySearch() {
  return (
    <div className='w-full flex flex-col justify-center items-center'>
      <Image
        src='/images/search.svg'
        alt='empty'
        width={238}
        height={122}
        className='mb-4 select-none pointer-events-none'
        draggable={false}
      />
      <h3 className='text-base font-semibold text-neutral-600 mb-2'>
        Tidak Ada Hasil yang Ditemukan
      </h3>
      <p className='text-sm text-center text-neutral-600'>
        Kami tidak menemukan data yang sesuai dengan pencarian Anda.
      </p>
    </div>
  );
}
