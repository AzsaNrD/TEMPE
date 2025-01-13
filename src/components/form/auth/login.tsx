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
import { useToast } from '@/hooks/use-toast';
import { Eye, EyeOff } from 'lucide-react'; // Gunakan library ikon

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

  const { toast } = useToast();
  const router = useRouter();
  const [hasError, setHasError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false); // State untuk visibilitas password

  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

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
      toast({
        title: 'Berhasil Masuk',
      });
      router.push('/');
    }
  }

  return (
    <div className='flex flex-col gap-4'>
      {hasError && (
        <AlertMessage
          title='Gagal'
          description='NPM atau password salah.'
          variant='destructive'
          className='w-full sm:max-w-2xl bg-red-50'
        />
      )}
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='w-full sm:max-w-2xl bg-white p-6 border border-neutral-200 rounded-lg flex flex-col gap-6 md:shadow'
        >
          <FormField
            control={form.control}
            name='npm'
            render={({ field }) => (
              <FormItem>
                <FormLabel>NPM</FormLabel>
                <FormControl>
                  <Input placeholder='Masukkan NPM' {...field} />
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
                  <div className='relative'>
                    <Input
                      type={showPassword ? 'text' : 'password'}
                      placeholder='******'
                      autoComplete='off'
                      {...field}
                    />
                    <button
                      type='button'
                      className='absolute inset-y-0 right-3 flex items-center text-gray-500'
                      onClick={togglePasswordVisibility}
                    >
                      {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
                    </button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className='flex justify-between gap-4'>
            <Button
              type='button'
              size='sm'
              variant='link'
              className='p-0'
              onClick={() =>
                window.open(
                  'https://wa.me/6285155001570?text=Lupa%20password%3A%20(isi%20npm)',
                  '_blank',
                )
              }
            >
              Lupa Password?
            </Button>
            <Button type='submit' size='sm' disabled={isLoading}>
              {isLoading ? 'Memuat...' : 'Masuk'}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
