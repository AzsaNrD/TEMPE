'use client';

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
import { useToast } from '@/hooks/use-toast';
import { Semester } from '@/types/semester';
import { Trash } from 'lucide-react';
import { deleteSemester } from '@/actions/semester'; // Import fungsi deleteSemester
import { useSession } from 'next-auth/react';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';

interface AlertDeleteSemesterProps {
  semester: Semester;
}

export default function AlertDeleteSemester({ semester }: AlertDeleteSemesterProps) {
  const { data: session } = useSession();
  const { toast } = useToast();

  const selectParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  if (session?.user.role !== 'admin') return null;

  const handleDelete = async () => {
    const params = new URLSearchParams(selectParams);

    try {
      const result = await deleteSemester(session.user.npm, semester.id);

      if (result.success) {
        toast({
          title: 'Berhasil',
          description: `Semester ${semester.semester} berhasil dihapus.`,
        });
        params.set('sem', 'default');
        replace(`${pathname}?${params.toString()}`);
      } else {
        toast({
          variant: 'destructive',
          title: 'Gagal',
          description: result.message,
        });
      }
    } catch (error) {
      console.error(error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Terjadi kesalahan saat menghapus semester.',
      });
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger className='border border-input bg-background hover:bg-accent hover:text-accent-foreground p-2 rounded-md'>
        <Trash size={16} />
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Apa kamu yakin ingin menghapus Semester {semester.semester}?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Aksi ini tidak dapat dikembalikan. Pastikan semester ini tidak memiliki materi kuliah.
            Klik lanjutkan untuk menghapus.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Batal</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete}>Lanjutkan</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
