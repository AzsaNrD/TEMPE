import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { User } from '@/types/user';
import AccountForm from '@/components/form/account';
import ResetPasswordForm from '@/components/form/auth/reset-password';

export default function ProfileTabs({ user }: { user: User }) {
  return (
    <Tabs defaultValue='account' className='w-full sm:max-w-2xl'>
      <TabsList className='grid w-full grid-cols-2'>
        <TabsTrigger value='account'>Akun</TabsTrigger>
        <TabsTrigger value='password'>Kata Sandi</TabsTrigger>
      </TabsList>
      <TabsContent value='account'>
        <AccountForm user={user} />
      </TabsContent>
      <TabsContent value='password'>
        <ResetPasswordForm npm={user.npm} />
      </TabsContent>
    </Tabs>
  );
}
