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
import { useToast } from '@/hooks/use-toast';
import { insertSemester } from '@/actions/semester';

const formSchema = z.object({
  semester: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
    message: 'Semester harus berupa angka positif.',
  }),
});

type SemesterFormValues = z.infer<typeof formSchema>;

export default function AddSemesterForm({ npm }: { npm: string }) {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<SemesterFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      semester: '',
    },
  });

  async function onSubmit(values: SemesterFormValues) {
    setIsLoading(true);
    try {
      const response = await insertSemester(npm, { semester: Number(values.semester) });
      if (response.success) {
        toast({
          title: 'Berhasil',
          description: 'Semester berhasil ditambahkan.',
        });
        form.reset();
      } else {
        toast({
          variant: 'destructive',
          title: 'Gagal',
          description: response.message,
        });
      }
    } catch (error) {
      console.error(error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Terjadi kesalahan saat menambahkan semester.',
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
          name='semester'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Semester</FormLabel>
              <FormControl>
                <Input type='number' placeholder='Masukkan angka semester' className='pointer-events-auto' {...field} />
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
