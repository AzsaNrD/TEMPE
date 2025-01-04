'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Separator } from '@/components/ui/separator';
import { EllipsisVertical, Pencil, Trash } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { Course } from '@/types/course';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import EditCourseForm from '../form/course/edit';
import { Semester } from '@/types/semester';
import { deleteCourse } from '@/actions/course';
import { useToast } from '@/hooks/use-toast';

interface DropdownTambahProps {
  semesters: Semester[];
  materi: Course;
}

export default function DropdownMateri({ semesters, materi }: DropdownTambahProps) {
  const { data: session } = useSession();
  const { toast } = useToast();

  if (session?.user.role !== 'admin') return null;

  const handleDelete = async () => {
    try {
      const result = await deleteCourse(session.user.npm, materi.id);

      if (result.success) {
        toast({
          title: 'Berhasil',
          description: `Materi mata kuliah ${materi.name} berhasil dihapus`,
        });
      } else {
        toast({
          variant: 'destructive',
          title: 'Gagal',
          description: result.message,
        });
      }
    } catch {
      toast({
        variant: 'destructive',
        title: 'Gagal',
        description: 'Terjadi kesalahan saat menghapus mata kuliah.',
      });
    }
  };
  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button variant='ghost' size='icon' className='font-normal absolute right-0'>
          <EllipsisVertical size={16} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <Dialog>
          <DialogTrigger asChild>
            <DropdownMenuItem onSelect={(e) => e.preventDefault()} className='cursor-pointer'>
              <span className='flex items-center gap-2'>
                <Pencil size={16} />
                <span>Edit</span>
              </span>
            </DropdownMenuItem>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Tambah Semester</DialogTitle>
              <DialogDescription>
                Masukkan semester baru di sini. Klik simpan untuk menambahkan semester.
              </DialogDescription>
            </DialogHeader>
            <Separator />
            <EditCourseForm course={materi} semesters={semesters} />
          </DialogContent>
        </Dialog>

        <AlertDialog>
          <AlertDialogTrigger className='w-full'>
            <DropdownMenuItem onSelect={(e) => e.preventDefault()} className='cursor-pointer'>
              <span className='flex items-center gap-2'>
                <Trash size={16} />
                <span>Hapus</span>
              </span>
            </DropdownMenuItem>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                Apa kamu yakin ingin menghapus materi {materi.name.toUpperCase()}?
              </AlertDialogTitle>
              <AlertDialogDescription>
                Aksi ini tidak dapat dikembalikan. Klik lanjutkan untuk menghapus materi.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Batal</AlertDialogCancel>
              <AlertDialogAction onClick={handleDelete}>Lanjutkan</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
