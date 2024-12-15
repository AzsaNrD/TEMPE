// nextauth.d.ts
import { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  interface User {
    npm: string;
    nama: string; // Pastikan ini sesuai dengan yang Anda inginkan
    email: string;
    role: string;
    gender: string;
    nama: string; // Tambahkan nama di sini
  }

  interface Session {
    user: User & DefaultSession['user'];
  }
}
