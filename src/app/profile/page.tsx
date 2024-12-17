import { getUserByNpm } from '@/actions/user';
import ProfileTabs from '@/components/profile/tabs';
import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';

export default async function Profile() {
  const session = await auth();
  if (!session) return redirect('/masuk');

  const { data } = await getUserByNpm(session.user.npm);

  return (
    <div className='flex flex-col gap-8'>
      <div>
        <h1 className='text-2xl font-semibold'>Profile</h1>
        <p className='mt-2 text-neutral-600 text-sm'>
          Kelola informasi akunmu atau perbarui kata sandi di sini.
        </p>
      </div>
      {data && <ProfileTabs user={data.user} />}
    </div>
  );
}
