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
import { ClipboardIcon, FileText, Home } from 'lucide-react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Logo from './logo';

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
      </SidebarContent>
    </Sidebar>
  );
}
