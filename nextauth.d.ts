import { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  interface User {
    npm: string;
    nama: string;
    email: string;
    role: string;
    gender: string;
    nama: string;
  }

  interface Session {
    user: User & DefaultSession['user'];
  }
}
