import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/layouts/app-sidebar';
import { SessionProvider } from 'next-auth/react';
import { Toaster } from '@/components/ui/toaster';

const geistSans = localFont({
  src: '../fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: '../fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

export const metadata: Metadata = {
  title: 'TEMPE',
  description: 'Tugas Emang Perlu Dikerjain',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-neutral-50`}>
        <SessionProvider>
          <SidebarProvider>
            <AppSidebar />
            <main className='w-full min-h-dvh grid grid-rows-[auto_1fr_auto]'>
              <div className='px-3 sm:p-0 pt-3 w-full flex justify-end sm:justify-start'>
                <SidebarTrigger />
              </div>
              <div className='px-3 sm:px-6 py-3'>{children}</div>
              <footer className='px-3 sm:px-6 py-3 text-sm text-neutral-500'>
                TEMPE © {new Date().getFullYear()}. All rights reserved
              </footer>
            </main>
          </SidebarProvider>
          <Toaster />
        </SessionProvider>
      </body>
    </html>
  );
}
