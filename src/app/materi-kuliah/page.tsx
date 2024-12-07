import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Folder } from 'lucide-react';
import Link from 'next/link';

const daftarMateriKuliah = [
  {
    semester: 1,
    materi: [
      {
        nama: 'Matematika Lanjut 2 **',
        link: '#',
      },
      {
        nama: 'Matematika Sistem Informasi 2',
        link: '#',
      },
      {
        nama: 'Pengantar Akuntansi Keuangan 1',
        link: '#',
      },
      {
        nama: 'Sistem Basis Data 2 */**',
        link: '#',
      },
      {
        nama: 'Manajemen & SIM 2 *',
        link: '#',
      },
      {
        nama: 'Manajemen Layanan Sistem Informasi',
        link: '#',
      },
      {
        nama: 'Bahasa Indonesia 1',
        link: '#',
      },
      {
        nama: 'Pemrograman Berorientasi Objek**',
        link: '#',
      },
      {
        nama: 'Sistem Operasi **',
        link: '#',
      },
    ],
  },
  {
    semester: 2,
    materi: [
      {
        nama: 'Matematika Lanjut 2 **',
        link: '#',
      },
      {
        nama: 'Matematika Sistem Informasi 2',
        link: '#',
      },
      {
        nama: 'Pengantar Akuntansi Keuangan 1',
        link: '#',
      },
      {
        nama: 'Sistem Basis Data 2 */**',
        link: '#',
      },
      {
        nama: 'Manajemen & SIM 2 *',
        link: '#',
      },
      {
        nama: 'Manajemen Layanan Sistem Informasi',
        link: '#',
      },
      {
        nama: 'Bahasa Indonesia 1',
        link: '#',
      },
      {
        nama: 'Pemrograman Berorientasi Objek**',
        link: '#',
      },
      {
        nama: 'Sistem Operasi **',
        link: '#',
      },
    ],
  },
  {
    semester: 3,
    materi: [
      {
        nama: 'Matematika Lanjut 2 **',
        link: '#',
      },
      {
        nama: 'Matematika Sistem Informasi 2',
        link: '#',
      },
      {
        nama: 'Pengantar Akuntansi Keuangan 1',
        link: '#',
      },
      {
        nama: 'Sistem Basis Data 2 */**',
        link: '#',
      },
      {
        nama: 'Manajemen & SIM 2 *',
        link: '#',
      },
      {
        nama: 'Manajemen Layanan Sistem Informasi',
        link: '#',
      },
      {
        nama: 'Bahasa Indonesia 1',
        link: '#',
      },
      {
        nama: 'Pemrograman Berorientasi Objek**',
        link: '#',
      },
      {
        nama: 'Sistem Operasi **',
        link: '#',
      },
    ],
  },
  {
    semester: 4,
    materi: [
      {
        nama: 'Matematika Lanjut 2 **',
        link: '#',
      },
      {
        nama: 'Matematika Sistem Informasi 2',
        link: '#',
      },
      {
        nama: 'Pengantar Akuntansi Keuangan 1',
        link: '#',
      },
      {
        nama: 'Sistem Basis Data 2 */**',
        link: '#',
      },
      {
        nama: 'Manajemen & SIM 2 *',
        link: '#',
      },
      {
        nama: 'Manajemen Layanan Sistem Informasi',
        link: '#',
      },
      {
        nama: 'Bahasa Indonesia 1',
        link: '#',
      },
      {
        nama: 'Pemrograman Berorientasi Objek**',
        link: '#',
      },
      {
        nama: 'Sistem Operasi **',
        link: '#',
      },
    ],
  },
  {
    semester: 5,
    materi: [
      {
        nama: 'Matematika Lanjut 2 **',
        link: '#',
      },
      {
        nama: 'Matematika Sistem Informasi 2',
        link: '#',
      },
      {
        nama: 'Pengantar Akuntansi Keuangan 1',
        link: '#',
      },
      {
        nama: 'Sistem Basis Data 2 */**',
        link: '#',
      },
      {
        nama: 'Manajemen & SIM 2 *',
        link: '#',
      },
      {
        nama: 'Manajemen Layanan Sistem Informasi',
        link: '#',
      },
      {
        nama: 'Bahasa Indonesia 1',
        link: '#',
      },
      {
        nama: 'Pemrograman Berorientasi Objek**',
        link: '#',
      },
      {
        nama: 'Sistem Operasi **',
        link: '#',
      },
    ],
  },
];

export default function MaterKuliah() {
  return (
    <div className='flex flex-col gap-8'>
      <div className='flex justify-between items-center'>
        <div>
          <h1 className='text-2xl font-semibold'>Materi Kuliah</h1>
          <p className='mt-2 text-neutral-600 text-sm'>
            Semua materi kuliah dari semester awal hingga akhir, tersedia dalam satu tempat!
          </p>
        </div>
        <div>
          <Select>
            <SelectTrigger className='w-[150px]'>
              <SelectValue placeholder='Semester' />
            </SelectTrigger>
            <SelectContent>
              {[1, 2, 3, 4, 5].map((item) => (
                <SelectItem key={item} value={`${item}`}>
                  Semester {item}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
        {daftarMateriKuliah.map((item, index) => (
          <div key={index} className='bg-white shadow rounded-md border border-neutral-200'>
            <div className='p-6'>
              <h2 className='text-xl font-semibold'>Semester {item.semester}</h2>
            </div>
            <Separator />
            <div className='px-6 py-6 flex flex-col gap-4'>
              {item.materi.map((materi) => (
                <Link
                  key={materi.nama}
                  href={materi.link}
                  className='hover:underline flex items-center gap-2 text-neutral-600 text-sm'
                >
                  <Folder size={20} />
                  <span>{materi.nama} Materi</span>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
