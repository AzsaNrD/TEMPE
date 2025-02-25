'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { updateAnnouncement } from '@/actions/announcement';
import { Announcement } from '@/types/announcement';

const baseFormSchema = z.object({
  title: z
    .string()
    .min(3, { message: 'Judul pengumuman minimal 3 karakter.' })
    .max(100, { message: 'Judul pengumuman maksimal 100 karakter.' }),
  description: z
    .string()
    .min(5, { message: 'Deskripsi minimal 5 karakter.' })
    .max(150, { message: 'Deskripsi maksimal 150 karakter.' }),
});

type AnnouncementFormValues = z.infer<typeof baseFormSchema>;

export default function EditAnnouncementForm({
  announcement,
  onClose,
}: {
  announcement: Announcement;
  onClose: () => void;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const formSchema = baseFormSchema.refine(
    (data) =>
      data.title !== announcement.title || data.description !== announcement.description,
    {
      message: 'Judul atau deskripsi harus berbeda dari sebelumnya.',
      path: ['title'],
    },
  );

  const form = useForm<AnnouncementFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: announcement.title,
      description: announcement.description,
    },
  });

  async function onSubmit(values: AnnouncementFormValues) {
    setIsLoading(true);
    try {
      const response = await updateAnnouncement(announcement.id, values);
      if (response.success) {
        toast({
          title: 'Berhasil',
          description: 'Pengumuman berhasil diperbarui.',
        });
        onClose();
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
        description: 'Terjadi kesalahan saat memperbarui pengumuman.',
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 text-left">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Judul Pengumuman</FormLabel>
              <FormControl>
                <Input placeholder="Masukkan judul pengumuman" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Deskripsi</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Masukkan deskripsi pengumuman"
                  {...field}
                  spellCheck={false}
                  onInput={(e) => {
                    const target = e.target as HTMLTextAreaElement;
                    target.style.height = 'auto';
                    target.style.height = `${target.scrollHeight}px`;
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? 'Menyimpan...' : 'Simpan Perubahan'}
        </Button>
      </form>
    </Form>
  );
}
