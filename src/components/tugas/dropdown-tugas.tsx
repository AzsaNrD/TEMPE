'use client';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
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
import { Pencil, Trash, EllipsisVertical } from 'lucide-react';
import EditAssignmentForm from '@/components/form/tugas/edit';
import { useToast } from '@/hooks/use-toast';
import { deleteAssignment } from '@/actions/assignment';
import { AssignmentWithStatus } from '@/types/assignment';
import { Course } from '@/types/course';
import { Separator } from '@/components/ui/separator';
import { useState } from 'react';

interface DropdownTugasProps {
  assignment: AssignmentWithStatus;
  courses: Course[];
}

export default function DropdownTugas({ assignment, courses }: DropdownTugasProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  const handleDelete = async () => {
    try {
      const response = await deleteAssignment(assignment.id!);
      if (response.success) {
        toast({
          title: 'Berhasil',
          description: `Tugas ${assignment.title} berhasil dihapus.`,
        });
      } else {
        toast({
          variant: 'destructive',
          title: 'Gagal',
          description: response.message,
        });
      }
    } catch {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Terjadi kesalahan saat menghapus tugas.',
      });
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant='ghost'
          size='icon'
          className='font-normal absolute right-3'
          aria-label='menu'
        >
          <EllipsisVertical size={16} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <DropdownMenuItem onSelect={(e) => e.preventDefault()} className='cursor-pointer'>
              <Pencil size={16} />
              Edit
            </DropdownMenuItem>
          </DialogTrigger>
          <DialogContent className='max-h-[90vh] sm:max-h-[95vh] overflow-y-auto'>
            <DialogHeader>
              <DialogTitle>Edit Tugas</DialogTitle>
              <DialogDescription>
                Edit tugas di sini. Klik simpan untuk menyimpan perubahan.
              </DialogDescription>
            </DialogHeader>
            <Separator />
            <EditAssignmentForm
              assignment={assignment}
              courses={courses}
              closeDialog={() => setIsDialogOpen(false)}
            />
          </DialogContent>
        </Dialog>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <DropdownMenuItem onSelect={(e) => e.preventDefault()} className='cursor-pointer'>
              <Trash size={16} />
              Hapus
            </DropdownMenuItem>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                Yakin ingin menghapus tugas <strong>{assignment.title}</strong>?
              </AlertDialogTitle>
              <AlertDialogDescription>
                Aksi ini tidak dapat dikembalikan. Klik &quot;Lanjutkan&quot; untuk menghapus tugas.
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
