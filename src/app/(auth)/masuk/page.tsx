import LoginForm from '@/components/auth/login-form';
import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';

export default async function Login() {
  const session = await auth();
  if (session) return redirect('/');

  return (
    <div className='flex flex-col gap-8'>
      <div>
        <h1 className='text-2xl font-semibold'>Masuk</h1>
        <p className='mt-2 text-neutral-600 text-sm'>
          Silakan masuk ke akun anda untuk mengakses fitur tanda selesai tugas dan pengelolaan tugas
          khusus admin.
        </p>
      </div>
      <LoginForm />
    </div>
  );
}
