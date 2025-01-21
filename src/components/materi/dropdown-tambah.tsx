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
import { ListPlus, FolderPlus, Plus } from 'lucide-react';
import AddSemesterForm from '@/components/form/semester/add';
import AddCourseForm from '@/components/form/course/add';
import { useSession } from 'next-auth/react';
import { Semester } from '@/types/semester';

interface DropdownTambahProps {
  semesters: Semester[];
}

export default function DropdownTambah({ semesters }: DropdownTambahProps) {
  const { data: session } = useSession();
  if (session?.user.role !== 'admin' && session?.user.role !== 'dosen') return null;
  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button variant='outline' size='sm' className='font-normal h-10'>
          <Plus size={16} />
          Tambah
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <Dialog>
          <DialogTrigger asChild>
            <DropdownMenuItem onSelect={(e) => e.preventDefault()} className='cursor-pointer'>
              <span className='flex items-center gap-2'>
                <ListPlus size={16} />
                <span>Semester</span>
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
            <AddSemesterForm npm={session.user.npm} />
          </DialogContent>
        </Dialog>

        <Dialog>
          <DialogTrigger asChild>
            <DropdownMenuItem onSelect={(e) => e.preventDefault()} className='cursor-pointer'>
              <span className='flex items-center gap-2'>
                <FolderPlus size={16} />
                <span>Materi Kuliah</span>
              </span>
            </DropdownMenuItem>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Tambah Materi Kuliah</DialogTitle>
              <DialogDescription>
                Masukkan materi kuliah baru di sini. Klik simpan untuk menambahkan materi kuliah.
              </DialogDescription>
            </DialogHeader>
            <Separator />
            <AddCourseForm npm={session.user.npm} semesters={semesters} />
          </DialogContent>
        </Dialog>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
