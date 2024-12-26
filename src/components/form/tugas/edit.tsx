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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { updateAssignment } from '@/actions/assignment';
import { useToast } from '@/hooks/use-toast';
import { Course } from '@/types/course';
import { DateTimePicker } from '@/components/ui/date-time-picker';
import { Textarea } from '@/components/ui/textarea';
import { AssignmentWithStatus } from '@/types/assignment';

const baseFormSchema = z.object({
  courseId: z.string().min(1, { message: 'Mata kuliah harus dipilih.' }),
  title: z.string().min(3, { message: 'Judul tugas minimal 3 karakter.' }),
  description: z.string().min(5, { message: 'Deskripsi minimal 5 karakter.' }),
  type: z.enum(['individu', 'kelompok', 'vclass', 'kuis'], {
    required_error: 'Jenis tugas harus dipilih.',
  }),
  deadline: z.string().min(1, { message: 'Tenggat waktu harus diisi.' }),
  link: z.string().optional(),
});

type AssignmentFormValues = z.infer<typeof baseFormSchema>;

export default function EditAssignmentForm({
  assignment,
  courses,
  closeDialog,
}: {
  assignment: AssignmentWithStatus;
  courses: Course[];
  closeDialog: () => void;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const formSchema = baseFormSchema.refine(
    (data) =>
      data.courseId !== `${assignment.courseId}` ||
      data.title !== assignment.title ||
      data.description !== assignment.description ||
      data.type !== assignment.type ||
      data.deadline !== assignment.deadline ||
      data.link !== (assignment.link || ''),
    {
      message: 'Data tidak boleh sama seperti sebelumnya.',
      path: ['title'],
    },
  );

  const form = useForm<AssignmentFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      courseId: `${assignment.courseId}`,
      title: assignment.title,
      description: assignment.description,
      type: assignment.type,
      deadline: assignment.deadline,
      link: assignment.link || '',
    },
  });

  async function onSubmit(values: AssignmentFormValues) {
    setIsLoading(true);
    try {
      const response = await updateAssignment(assignment.id!, {
        courseId: Number(values.courseId),
        title: values.title,
        description: values.description,
        type: values.type,
        deadline: new Date(values.deadline).toISOString(),
        link: values.link || null,
      });
      if (response.success) {
        toast({
          title: 'Berhasil',
          description: `Tugas "${assignment.title}" berhasil diperbarui.`,
        });
        closeDialog();
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
        description: 'Terjadi kesalahan saat memperbarui tugas.',
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4 text-left'>
        <FormField
          control={form.control}
          name='courseId'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mata Kuliah</FormLabel>
              <FormControl>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder='Pilih Mata Kuliah' />
                  </SelectTrigger>
                  <SelectContent>
                    {courses.map((item) => (
                      <SelectItem key={item.id} value={`${item.id}`} className='hover:bg-accent'>
                        {item.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='title'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Judul Tugas</FormLabel>
              <FormControl>
                <Input placeholder='Masukkan judul tugas' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='description'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Deskripsi</FormLabel>
              <FormControl>
                <Textarea
                  placeholder='Masukkan deskripsi tugas'
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

        <FormField
          control={form.control}
          name='type'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Jenis Tugas</FormLabel>
              <FormControl>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder='Pilih Jenis Tugas' />
                  </SelectTrigger>
                  <SelectContent>
                    {['individu', 'kelompok', 'vclass', 'kuis'].map((type) => (
                      <SelectItem key={type} value={type} className='hover:bg-accent'>
                        {type.charAt(0).toUpperCase() + type.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='deadline'
          render={() => (
            <FormItem>
              <FormLabel>Tenggat Waktu</FormLabel>
              <FormControl>
                <DateTimePicker name='deadline' />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='link'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Link Tugas</FormLabel>
              <FormControl>
                <Input placeholder='Masukkan URL tugas (Opsional)' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type='submit' className='w-full' disabled={isLoading}>
          {isLoading ? 'Menyimpan...' : 'Simpan Perubahan'}
        </Button>
      </form>
    </Form>
  );
}
