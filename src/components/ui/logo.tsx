import Image from 'next/image';
import Link from 'next/link';

export default function Logo() {
  return (
    <div className='flex flex-col justify-center w-full gap-2 text-center select-none'>
      <div className='flex justify-center'>
        <Link href='/'>
          <div className='flex gap-2.5'>
            <Image
              src='/images/icon_img.svg'
              alt='Logo'
              width={21}
              height={21}
              style={{ width: 'auto', height: 'auto' }}
            />
            <Image
              src='/images/icon_text.svg'
              alt='Logo'
              width={153}
              height={45}
              style={{ width: 'auto', height: 'auto' }}
              className='group-data-[collapsible=icon]:hidden'
            />
          </div>
        </Link>
      </div>
      <p className='text-sm group-data-[collapsible=icon]:hidden'>Tugas Emang Perlu Dikerjain</p>
    </div>
  );
}
