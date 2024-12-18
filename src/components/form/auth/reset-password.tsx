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
import { useToast } from '@/hooks/use-toast';
import { updateUserPassword } from '@/actions/user';

const formSchema = z
  .object({
    currentPassword: z
      .string()
      .min(8, 'Password lama tidak valid.')
      .nonempty('Password lama harus diisi.'),
    newPassword: z
      .string()
      .min(8, 'Password baru minimal 8 karakter.')
      .regex(/[A-Z]/, 'Password baru harus mengandung huruf besar.')
      .regex(/[a-z]/, 'Password baru harus mengandung huruf kecil.')
      .regex(/[0-9]/, 'Password baru harus mengandung angka.')
      .regex(/[@$!%*?&#]/, 'Password baru harus mengandung simbol spesial.'),
    confirmPassword: z.string().nonempty('Konfirmasi password harus diisi.'),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: 'Konfirmasi password tidak cocok.',
    path: ['confirmPassword'],
  });

type PasswordFormValues = z.infer<typeof formSchema>;

export default function PasswordForm({ npm }: { npm: string }) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { toast } = useToast();

  const form = useForm<PasswordFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
  });

  async function onSubmit(values: PasswordFormValues) {
    try {
      setIsLoading(true);
      const response = await updateUserPassword(npm, { ...values });

      if (!response.success) {
        throw new Error(response.message);
      }

      toast({
        title: 'Berhasil',
        description: 'Password berhasil diperbarui.',
      });

      form.reset();
    } catch (e) {
      const error = e as Error;
      toast({
        variant: 'destructive',
        title: 'Gagal memperbarui password',
        description: error.message,
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
            name='currentPassword'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password Lama</FormLabel>
                <FormControl>
                  <Input type='password' autoComplete='current-password' placeholder='Masukkan password lama...' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='newPassword'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password Baru</FormLabel>
                <FormControl>
                  <Input type='password' autoComplete='new-password' placeholder='Masukkan password baru...' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='confirmPassword'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Konfirmasi Password</FormLabel>
                <FormControl>
                  <Input type='password' autoComplete='new-password' placeholder='Ulangi password baru...' {...field} />
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
            {isLoading ? 'Memperbarui...' : 'Ganti Password'}
          </Button>
        </form>
      </Form>
    </div>
  );
}
