'use client';

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from '@/components/ui/sidebar';
import { ClipboardIcon, FileText, Home, LogIn, LogOut } from 'lucide-react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Logo from './logo';
import { signOut, useSession } from 'next-auth/react';
import { Skeleton } from '@/components/ui/skeleton';

// Menu items.
const items = [
  {
    title: 'Beranda',
    url: '/',
    icon: Home,
  },
  {
    title: 'Tugas',
    url: '/tugas',
    icon: ClipboardIcon,
  },
  {
    title: 'Materi Kuliah',
    url: '/materi-kuliah',
    icon: FileText,
  },
];

export function AppSidebar() {
  const pathname = usePathname();
  const { data: session, status } = useSession();

  return (
    <Sidebar collapsible='icon'>
      <SidebarHeader>
        <Logo />
      </SidebarHeader>
      <SidebarContent>
        <SidebarSeparator />
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton isActive={pathname === item.url} asChild>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarSeparator />
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
              {status === 'loading' ? (
                    <Skeleton className='h-10 w-full bg-neutral-200' />
                ) : session ? (
                  <SidebarMenuButton
                    className="cursor-pointer"
                    variant="destructive"
                    onClick={() => signOut()}
                    asChild
                  >
                    <div className="text-red-800">
                      <LogOut />
                      <span>Keluar</span>
                    </div>
                  </SidebarMenuButton>
                ) : (
                  <SidebarMenuButton isActive={pathname === '/masuk'} asChild>
                    <Link href="/masuk">
                      <LogIn />
                      <span>Masuk</span>
                    </Link>
                  </SidebarMenuButton>
                )}
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
