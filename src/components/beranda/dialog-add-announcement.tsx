'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { Plus } from 'lucide-react';
import AddAnnouncementForm from '@/components/form/announcement/add';
import { useState } from 'react';

export default function DialogAddAnnouncement() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger className='inline-flex col-span-2 w-fit items-center justify-center gap-2 whitespace-nowrap text-sm ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 font-normal border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 rounded-md px-3 '>
        <Plus size={16} />
        Tambah
      </DialogTrigger>
      <DialogContent className='max-h-[90vh] sm:max-h-[95vh] overflow-y-auto'>
        <DialogHeader>
          <DialogTitle>Tambah Pengumuman Baru</DialogTitle>
          <DialogDescription>
            Masukkan pengumuman baru di sini. Klik simpan untuk menambahkan pengumuman.
          </DialogDescription>
        </DialogHeader>
        <Separator />
        <AddAnnouncementForm onClose={() => setIsDialogOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}
