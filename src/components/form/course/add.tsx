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
import { insertCourse } from '@/actions/course';
import { useToast } from '@/hooks/use-toast';
import { Semester } from '@/types/semester';

const formSchema = z.object({
  semesterId: z.string().min(1, { message: 'Semester harus dipilih.' }),
  name: z.string().min(3, { message: 'Nama mata kuliah minimal 3 karakter.' }),
  link: z.string().url({ message: 'Link materi harus berupa URL yang valid.' }),
});

type CourseFormValues = z.infer<typeof formSchema>;

export default function AddCourseForm({ npm, semesters }: { npm: string; semesters: Semester[] }) {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<CourseFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      semesterId: '',
      name: '',
      link: '',
    },
  });

  async function onSubmit(values: CourseFormValues) {
    setIsLoading(true);
    try {
      const response = await insertCourse(npm, {
        semesterId: Number(values.semesterId),
        name: values.name,
        link: values.link,
      });
      if (response.success) {
        toast({
          title: 'Berhasil',
          description: 'Mata kuliah dan materi berhasil ditambahkan.',
        });
        form.reset();
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
        description: 'Terjadi kesalahan saat menambahkan mata kuliah.',
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
        <FormField
          control={form.control}
          name='semesterId'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Semester</FormLabel>
              <FormControl>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder='Pilih Semester' />
                  </SelectTrigger>
                  <SelectContent>
                    {semesters.map((item) => (
                      <SelectItem key={item.id} value={`${item.id}`} className='hover:bg-accent'>
                        Semester {item.semester}
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
          name='name'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nama Mata Kuliah</FormLabel>
              <FormControl>
                <Input placeholder='Masukkan nama mata kuliah' {...field} />
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
              <FormLabel>Link Materi</FormLabel>
              <FormControl>
                <Input placeholder='Masukkan URL materi' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type='submit' className='w-full' disabled={isLoading}>
          {isLoading ? 'Menyimpan...' : 'Simpan'}
        </Button>
      </form>
    </Form>
  );
}
