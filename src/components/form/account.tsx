'use client';

import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
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
import { User } from '@/types/user';
import { updateUserByNpm } from '@/actions/user';
import { useToast } from '@/hooks/use-toast';

export default function AccountForm({ user }: { user: User }) {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { toast } = useToast();

  const formSchema = z
    .object({
      nama: z.string().min(3, { message: 'Nama minimal 3 karakter' }).nonempty('Nama harus diisi.'),
      email: z.string().email({ message: 'Email tidak valid.' }).nonempty('Email harus diisi.'),
    })
    .superRefine((val, ctx) => {
      if (val.nama === user.nama && val.email === user.email) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Nama tidak boleh sama dengan sebelumnya.',
          path: ['nama'],
        });
      }

      if (val.email === user.email && val.nama === user.nama) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Email tidak boleh sama dengan sebelumnya.',
          path: ['email'],
        });
      }
    });

  type LoginFormValues = z.infer<typeof formSchema>;

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nama: user.nama,
      email: user.email || '',
    },
  });

  async function onSubmit(values: LoginFormValues) {
    try {
      setIsLoading(true);
      await updateUserByNpm(user.npm, values);
      toast({
        title: 'Berhasil',
        description: 'Akun berhasil diperbarui.',
      });
    } catch (e) {
      const error = e as Error;
      toast({
        variant: 'destructive',
        title: 'Terjadi kesalahan',
        description: `${error.message}`,
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className='flex flex-col gap-4'>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='w-full sm:max-w-2xl bg-white p-6 border border-neutral-200 rounded-lg flex flex-col gap-6 md:shadow'
        >
          <FormField
            control={form.control}
            name='nama'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nama</FormLabel>
                <FormControl>
                  <Input placeholder='Masukkan nama...' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name='npm'
            render={() => (
              <FormItem>
                <FormLabel>NPM</FormLabel>
                <FormControl>
                  <Input type='email' value={user.npm} disabled />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name='role'
            render={() => (
              <FormItem>
                <FormLabel>Role</FormLabel>
                <FormControl>
                  <Input value={user.role.toLocaleUpperCase()} disabled />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type='email' placeholder='email@example.com' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type='submit'
            size='sm'
            className='w-full sm:w-fit sm:ms-auto'
            disabled={isLoading}
          >
            {isLoading ? 'Memperbarui...' : 'Simpan Perubahan'}
          </Button>
        </form>
      </Form>
    </div>
  );
}
