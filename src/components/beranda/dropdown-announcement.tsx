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
import { useToast } from '@/hooks/use-toast';
import { Separator } from '@/components/ui/separator';
import { useState } from 'react';
import { Announcement } from '@/types/announcement';
import EditAnnouncementForm from '../form/announcement/edit';
import { deleteAnnouncement } from '@/actions/announcement';

interface DropdownAnnouncementProps {
  announcement: Announcement;
}

export default function DropdownAnnouncement({ announcement }: DropdownAnnouncementProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  const handleDelete = async () => {
    try {
      const response = await deleteAnnouncement(announcement.id);
      if (response.success) {
        toast({
          title: 'Berhasil',
          description: `Tugas ${announcement.title} berhasil dihapus.`,
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
        <Button variant='ghost' size='icon' className='ml-4' aria-label='menu'>
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
              <DialogTitle>Edit Pengumuman</DialogTitle>
              <DialogDescription>
                Edit pengumuman di sini. Klik simpan untuk menyimpan perubahan.
              </DialogDescription>
            </DialogHeader>
            <Separator />
            <EditAnnouncementForm
              announcement={announcement}
              onClose={() => setIsDialogOpen(false)}
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
                Yakin ingin menghapus <strong>{announcement.title}</strong>?
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
