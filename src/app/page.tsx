import { ArrowRight, Bell, Book, Clock } from 'lucide-react';
import Link from 'next/link';

const daftarTugas = [
  {
    judul: 'Laporan Akhir IMK',
    matkul: 'Interaksi Manusia dan Komputer',
    tenggat: '30 September 2025',
  },
  {
    judul: 'Laporan Akhir KDM',
    matkul: 'Konsep Data Mining',
    tenggat: '30 Januari 2025',
  },
  {
    judul: 'Laporan Akhir Statistika',
    matkul: 'Statistika',
    tenggat: '02 Februari 2025',
  },
];

const daftarPengumuman = [
  {
    judul: 'Pengumuman 1',
    deskripsi: 'Deskripsi pengumuman 1',
  },
  {
    judul: 'Pengumuman 2',
    deskripsi: 'Deskripsi pengumuman 2',
  },
];

export default function Home() {
  return (
    <div>
      <div className='mb-7'>
        <h1 className='text-2xl font-semibold'>👋 Selamat Datang di TEMPE</h1>
        <p className='mt-2 text-neutral-600 text-sm'>
          Tugas Emang Perlu Dikerjain - Akses Informasi tugas kuliahmu dengan lebih mudah
        </p>
      </div>

      <div>
        {/* Tugas Mendesak dan Materi Terbaru */}
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6'>
          <div className='bg-white rounded-lg border border-neutral-200 shadow-sm p-6'>
            {/* Tugas Mendesak */}
            <div className='flex justify-between'>
              <h2 className='font-medium text-xl mb-4'>Tugas Mendesak</h2>
              <Bell className='text-red-600' />
            </div>
            <h2 className='text-2xl font-bold mb-4'>3</h2>
            <p className='text-sm text-neutral-600'>Perlu diselesaikan minggu ini</p>
          </div>

          <div className='bg-white rounded-lg border border-neutral-200 shadow-sm p-6'>
            {/* Tugas Materi terbaru */}
            <div className='flex justify-between'>
              <h2 className='font-medium text-xl mb-4'>Materi Terbaru</h2>
              <Book className='text-blue-500' />
            </div>
            <h2 className='text-2xl font-bold mb-4'>5</h2>
            <p className='text-sm text-neutral-600'>Materi telah diunggah</p>
          </div>
        </div>

        {/* TUGAS TERBARU */}
        <div className='bg-white rounded-lg border border-neutral-200 shadow-sm mb-6 p-6'>
          <div className='flex justify-between items-center mb-6'>
            <h2 className='font-medium text-xl'>🚀 Tugas Terbaru</h2>
            <Link href='/tugas' className='flex items-center gap-2 hover:underline'>
              <span className='font-medium text-sm text-neutral-600'>Lihat Semua</span>
              <ArrowRight size={16} className='text-neutral-600' />
            </Link>
          </div>
          {daftarTugas.map((item) => (
            <div
              key={item.judul}
              className='bg-white rounded-md border border-neutral-200 flex flex-col sm:flex-row justify-between p-4 mb-4'
            >
              <div className='flex flex-col gap-2'>
                <h3 className='font-medium'>{item.judul}</h3>
                <p className='text-sm text-neutral-600'>{item.matkul}</p>
              </div>
              <div className='flex items-center gap-2 mt-2'>
                <Clock size={16} strokeWidth={3} className='text-neutral-600 sm:hidden' />
                <p className='text-sm text-neutral-600  sm:font-normal'>
                  {item.tenggat}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Pengumuman */}
      <div className='bg-white rounded-lg border border-neutral-200 shadow-sm mb-6 p-6'>
        <h2 className='font-medium text-xl mb-4'>📢 Pengumuman</h2>
        {daftarPengumuman.map((item) => (
          <div
            key={item.judul}
            className='bg-white rounded-md border border-neutral-200 flex justify-between p-4 mb-4'
          >
            <div className='flex flex-col gap-2'>
              <h3 className='font-medium'>{item.judul}</h3>
              <p className='text-sm text-neutral-600'>{item.deskripsi}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
