import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { verifyPassword } from '@/lib/bcrypt';
import { db } from '@/db/drizzle';
import { users } from '@/db/schema/users';
import { eq } from 'drizzle-orm';

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        npm: { label: 'NPM', type: 'text', placeholder: 'Masukkan npm...' },
        password: { label: 'Password', type: 'password', placeholder: '********' },
      },
      async authorize(credentials) {
        if (!credentials?.npm || !credentials?.password)
          throw new Error('NPM dan password harus diisi.');

        const user = await db
          .select()
          .from(users)
          .where(eq(users.npm, credentials.npm as string))
          .execute();
        if (!user || user.length === 0) {
          throw new Error('NPM / Password salah.');
        }

        const isPasswordValid = await verifyPassword(
          credentials.password as string,
          user[0].password,
        );
        if (!isPasswordValid) {
          throw new Error('NPM / Password salah.');
        }

        return {
          npm: user[0].npm,
          nama: user[0].nama,
          email: user[0].email,
          role: user[0].role,
          gender: user[0].gender,
        };
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.npm = user.npm;
        token.nama = user.nama;
        token.email = user.email;
        token.role = user.role;
        token.gender = user.gender;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user = {
          id: '',
          npm: token.npm as string,
          nama: token.nama as string,
          email: token.email as string,
          role: token.role as string,
          gender: token.gender as string,
          emailVerified: null,
        };
      }
      return session;
    },
  },
  pages: {
    signIn: '/masuk',
  },
  secret: process.env.NEXTAUTH_SECRET,
});
