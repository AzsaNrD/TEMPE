'use client';

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

const formSchema = z.object({
  npm: z.string().max(8, { message: 'NPM tidak valid.'}).nonempty('NPM harus diisi.'),
  password: z.string().nonempty('Password harus diisi.'),
});

export default function Login() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      npm: '',
      password: '',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <div className='flex flex-col gap-8'>
      <div>
        <h1 className='text-2xl font-semibold'>Masuk</h1>
        <p className='mt-2 text-neutral-600 text-sm'>
          Silakan masuk ke akun anda untuk mengakses fitur tanda selesai tugas dan pengelolaan tugas
          khusus admin.
        </p>
      </div>
      <div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='w-full shadow-sm sm:max-w-2xl bg-white p-6 border border-neutral-200 rounded-md flex flex-col gap-6'>
            <FormField
              control={form.control}
              name='npm'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>NPM</FormLabel>
                  <FormControl>
                    <Input placeholder='Masukkan npm...' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='password'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type='password' placeholder='******' autoComplete='off' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type='submit' size='sm' className='w-full sm:w-fit sm:ms-auto'>Masuk</Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
