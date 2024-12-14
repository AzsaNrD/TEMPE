import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Book, Calendar, Clock, FileText, Search, Link as LinkIcon } from 'lucide-react';
import Link from 'next/link';

const daftarTugas = [
  {
    judul: 'Laporan Akhir IMK',
    matkul: 'Interaksi Manusia dan Komputer',
    tenggat: '30 September 2025',
    jenis: 'Vclass',
    selesai: false,
    deskripsi: 'Mengerjakan Laporan Akhir IMK',
  },
  {
    judul: 'Laporan Akhir KDM',
    matkul: 'Konsep Data Mining',
    tenggat: '30 Januari 2025',
    jenis: 'Kelompok',
    selesai: true,
    deskripsi: 'Mengerjakan Laporan Akhir KDM',
  },
  {
    judul: 'Laporan Akhir Statistika',
    matkul: 'Statistika',
    tenggat: '02 Februari 2025',
    jenis: 'Individu',
    selesai: false,
    deskripsi: 'Mengerjakan Laporan Akhir Statistika',
  },
];

export default function Tugas() {
  return (
    <div className='flex flex-col gap-8'>
      <div className='flex xl:flex-row flex-col xl:justify-between xl:items-center'>
        <div>
          <h1 className='text-2xl font-semibold'>Daftar Tugas</h1>
          <p className='mt-2 text-neutral-600 text-sm'>Sebaiknya jangan terlalu santai</p>
        </div>
        <div className='flex flex-col xl:flex-row mt-6 xl:mt-0 gap-2'>
          <Input
            icon={<Search className='text-neutral-400 w-5 h-5' />}
            type='text'
            placeholder='Cari tugas...'
          />
          <div className='flex justify-end gap-2'>
            <Select>
              <SelectTrigger className='w-[180px]'>
                <SelectValue placeholder='Filter' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='dark'>Vclass</SelectItem>
                <SelectItem value='light'>Kelompok</SelectItem>
                <SelectItem value='d'>Individu</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className='w-[180px]'>
                <SelectValue placeholder='Status' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='light'>Belum Dikerjakan</SelectItem>
                <SelectItem value='dark'>Sudah Dikerjakan</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
        {daftarTugas.map((item, index) => (
          <div key={index} className='bg-white shadow rounded-md border border-neutral-200'>
            <div className='p-6'>
              <h2 className='text-xl font-medium'>{item.judul}</h2>
              <div className='flex gap-2 items-center mt-2'>
                <Book className='text-neutral-600' size={16} strokeWidth={3} />
                <p className='text-neutral-600 text-sm'>{item.matkul}</p>
              </div>
            </div>
            <Separator />
            <div className='p-6 flex flex-col gap-5'>
              <p className='text-sm text-neutral-600 line-clamp-2'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis expedita quo facilis
                officia, quasi, incidunt ad error eligendi veritatis est nostrum! Atque eius at
                blanditiis nobis non illum recusandae, ratione deserunt sequi laborum nemo
                praesentium illo temporibus dolore, sunt dolor consectetur distinctio pariatur
                maxime voluptatibus in quia eos! Ad dolorem molestiae pariatur quisquam officiis
                maxime totam, sint, sed culpa exercitationem doloribus quibusdam iusto facilis
                asperiores blanditiis magni quae! Quasi laudantium doloribus, adipisci itaque
                dolorum exercitationem iste atque? Molestias, assumenda! Beatae ex iste tempore
                laudantium sapiente? Tempore et veritatis corrupti, assumenda recusandae, expedita
                minima repellat necessitatibus ullam est autem, quia obcaecati?
              </p>
              <div className='flex gap-2'>
                <Badge variant='taskType' className='w-fit'>
                  {item.jenis}
                </Badge>
                <Badge variant={item.selesai ? 'statusDone' : 'statusTodo'} className='w-fit'>
                  {item.selesai ? 'Sudah Dikerjakan' : 'Belum Dikerjakan'}
                </Badge>
              </div>
              <div className='flex justify-between items-center'>
                <div className='flex gap-2'>
                  <Calendar size={16} strokeWidth={3} className='text-neutral-600' />
                  <p className='text-sm text-neutral-600'>Tenggat waktu:</p>
                </div>
                <p className='text-sm font-medium text-neutral-950'>{item.tenggat}</p>
              </div>
            </div>
            <Separator />
            <div className='px-6 py-3 flex justify-between items-center'>
              <Sheet>
                <SheetTrigger asChild>
                  <Button size='sm' variant='link' className='p-0'>
                    <FileText size={16} strokeWidth={3} />
                    <p className='text-sm'>Lihat detail</p>
                  </Button>
                </SheetTrigger>
                <SheetContent className='overflow-y-auto'>
                  <SheetHeader>
                    <SheetTitle className='mb-3'>{item.matkul}</SheetTitle>
                  </SheetHeader>
                  <Separator />
                  <div className='py-6'>
                    <h3 className='text-xl font-medium'>{item.judul}</h3>
                    <p className='text-sm mt-3 text-neutral-600 text-justify'>
                      Lorem ipsum, dolor sit amet consectetur adipisicing elit. Suscipit sequi ipsam
                      porro autem quas sit, officia aperiam nihil aspernatur dolorum quae ad
                      reiciendis esse similique minima ipsum eos doloremque harum recusandae
                      consectetur quasi earum. Eveniet tenetur at magnam, debitis rem delectus quia
                      sit iure? Omnis eaque aliquid minus velit saepe excepturi, sed doloremque ea
                      cupiditate quos fugiat sunt tempore accusamus est voluptatem nulla unde qui,
                      similique error ratione nisi? Eum totam quisquam incidunt iste consequatur
                      minus temporibus expedita minima molestias, rerum repudiandae id sed quae quo
                      iusto, et illo! Repellat ipsam sit nobis quasi commodi vitae, voluptas
                      explicabo dolores inventore.
                    </p>
                  </div>
                  <div className='flex gap-2'>
                    <Badge variant='taskType' className='w-fit'>
                      {item.jenis}
                    </Badge>
                    <Badge variant={item.selesai ? 'statusDone' : 'statusTodo'} className='w-fit'>
                      {item.selesai ? 'Sudah Dikerjakan' : 'Belum Dikerjakan'}
                    </Badge>
                  </div>
                  <div className='flex flex-col gap-2 mt-6'>
                    <div className='flex gap-2 items-center'>
                      <Calendar size={16} strokeWidth={3} className='text-neutral-600' />
                      <p className='text-sm text-neutral-600'>Tenggat waktu: 10 Februari 2025</p>
                    </div>
                    <div className='flex gap-2 items-center'>
                      <Clock size={16} strokeWidth={3} className='text-neutral-600' />
                      <p className='text-sm text-neutral-600'>20 Hari lagi</p>
                    </div>
                  </div>
                  <div className='flex flex-col bg-neutral-100 p-5 rounded-md gap-2 mt-6'>
                    <div className='flex gap-2 items-center'>
                      <LinkIcon size={16} strokeWidth={3} />
                      <p className='text-sm font-medium'>Link Tugas</p>
                    </div>

                    <Link
                      className='text-sm text-blue-600 hover:underline break-words'
                      href='https://drive.google.com/drive/folders/1B8s5p6__1Odtrp6cSO1SkESu_OP3M_cW?usp=drive_link'
                      target='_blank'
                      rel='noreferrer noopener'
                    >
                      https://drive.google.com/drive/folders/1B8s5p6__1Odtrp6cSO1SkESu_OP3M_cW?usp=drive_link
                    </Link>
                  </div>
                </SheetContent>
              </Sheet>
              <Button size='sm'>Tandai Selesai</Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
