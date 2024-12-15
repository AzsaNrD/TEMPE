'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { useState } from 'react';

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
import AlertMessage from '@/components/ui/alert-message';

const formSchema = z.object({
  npm: z.string().max(8, { message: 'NPM tidak valid.' }).nonempty('NPM harus diisi.'),
  password: z.string().nonempty('Password harus diisi.'),
});

type LoginFormValues = z.infer<typeof formSchema>;

export default function LoginForm() {
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      npm: '',
      password: '',
    },
  });

  const router = useRouter();
  const [hasError, setHasError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  async function onSubmit(values: LoginFormValues) {
    setIsLoading(true);
    const result = await signIn('credentials', {
      npm: values.npm,
      password: values.password,
      redirect: false,
    });
    setIsLoading(false);

    if (result?.error) {
      setHasError(true);
    } else {
      router.push('/');
    }
  }

  return (
    <div className='flex flex-col gap-4'>
      {hasError && (
        <AlertMessage
          title='Error'
          description='NPM atau password salah.'
          variant='destructive'
          className='w-full sm:max-w-2xl bg-red-50'
        />
      )}
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='w-full sm:max-w-2xl bg-white p-6 border border-neutral-200 rounded-lg flex flex-col gap-6 shadow'
        >
          <FormField
            control={form.control}
            name='npm'
            render={({ field }) => (
              <FormItem>
                <FormLabel>NPM</FormLabel>
                <FormControl>
                  <Input placeholder='Masukkan NPM...' {...field} />
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
          <Button
            type='submit'
            size='sm'
            className='w-full sm:w-fit sm:ms-auto'
            disabled={isLoading}
          >
            {isLoading ? 'Memuat...' : 'Masuk'}
          </Button>
        </form>
      </Form>
    </div>
  );
}
