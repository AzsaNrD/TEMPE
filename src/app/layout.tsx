import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/app-sidebar';

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
        <SidebarProvider>
          <AppSidebar />
          <main className='w-full'>
            <SidebarTrigger />
            <div className='px-5 sm:px-6 py-3'>{children}</div>
            <footer className='p-6 text-center text-sm text-neutral-400'>
              TEMPE © {new Date().getFullYear()}. All rights reserved
            </footer>
          </main>
        </SidebarProvider>
      </body>
    </html>
  );
}
