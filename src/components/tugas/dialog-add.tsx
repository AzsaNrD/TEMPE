import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import AddAssignmentForm from '../form/tugas/add';
import { Separator } from '@/components/ui/separator';
import { Plus } from 'lucide-react';
import { getCourses } from '@/actions/course';
import { Button } from '../ui/button';
import Link from 'next/link';

export default async function DialogAdd() {
  const courses = await getCourses();
  const hasCourses = courses.data && courses.data.length > 0;

  return (
    <Dialog>
      <DialogTrigger className='inline-flex col-span-2 w-full sm:w-fit items-center justify-center gap-2 whitespace-nowrap text-sm ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 font-normal border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 rounded-md px-3 '>
        <Plus size={16} />
        Tambah
      </DialogTrigger>
      <DialogContent className='max-h-[90vh] sm:max-h-[95vh] overflow-y-auto'>
        {hasCourses ? (
          <>
            <DialogHeader>
              <DialogTitle>Tambah Tugas Baru</DialogTitle>
              <DialogDescription>
                Masukkan tugas baru di sini. Klik simpan untuk menambahkan tugas.
              </DialogDescription>
            </DialogHeader>
            <Separator />
            <AddAssignmentForm courses={courses.data || []} />
          </>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle>Mata Kuliah Tidak Tersedia</DialogTitle>
              <DialogDescription>
                Untuk menambahkan tugas, Anda harus memiliki mata kuliah terlebih dahulu. Tambahkan
                mata kuliah Anda di halaman Materi Kuliah.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter className='gap-2 sm:gap-0'>
              <DialogClose asChild>
                <Button variant='outline'>Batal</Button>
              </DialogClose>
              <Link
                href='/materi-kuliah'
                className='inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2'
              >
                Halaman Materi Kuliah
              </Link>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
