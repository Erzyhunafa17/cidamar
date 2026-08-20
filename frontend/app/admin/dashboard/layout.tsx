'use client';

import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { LayoutDashboard, FileText, Trophy, CalendarDays, FolderOpen, Store, Image as ImageIcon, Phone, LogOut, Users } from 'lucide-react';
import { getUser, logout } from '@/lib/api/auth';

const MENU_ITEMS = [
  { href: '/admin/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { href: '/admin/dashboard/berita', icon: FileText, label: 'Berita' },
  { href: '/admin/dashboard/prestasi', icon: Trophy, label: 'Prestasi' },
  { href: '/admin/dashboard/agustusan', icon: CalendarDays, label: 'Agustusan' },
  { href: '/admin/dashboard/arsip', icon: FolderOpen, label: 'Arsip Surat' },
  { href: '/admin/dashboard/umkm', icon: Store, label: 'UMKM' },
  { href: '/admin/dashboard/galeri', icon: ImageIcon, label: 'Galeri' },
  { href: '/admin/dashboard/kontak', icon: Phone, label: 'Kontak Penting' },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const currentUser = getUser();
    if (!currentUser) {
      router.push('/admin/login');
    } else {
      setUser(currentUser);
    }
  }, [router]);

  const handleLogout = () => {
    logout();
    window.location.href = '/admin/login';
  };

  if (!user) return <div className="min-h-screen flex items-center justify-center bg-gray-50">Memuat...</div>;
  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden font-sans">
      {/* Sidebar (Desktop Only untuk sementara) */}
      <aside className="w-64 bg-green-primary text-white flex-shrink-0 hidden md:flex flex-col">
        <div className="p-6">
          <Link href="/" className="flex items-center gap-2">
            <span className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center font-bold text-xl">
              C
            </span>
            <span className="font-heading font-bold text-lg tracking-wide">
              Panel Admin
            </span>
          </Link>
        </div>

        <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto">
          {MENU_ITEMS.map((item) => {
            const isActive = pathname === item.href || (item.href !== '/admin/dashboard' && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                  isActive ? 'bg-white/20 text-white font-bold' : 'text-green-pale hover:bg-white/10 hover:text-white'
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span className="font-medium text-sm">{item.label}</span>
              </Link>
            );
          })}
          
          {/* Menu Khusus Superadmin */}
          {user?.role === 'superadmin' && (
            <Link
              href="/admin/dashboard/users"
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors mt-4 border-t border-white/10 pt-4 ${
                pathname.startsWith('/admin/dashboard/users') ? 'bg-white/20 text-white font-bold' : 'text-green-pale hover:bg-white/10 hover:text-white'
              }`}
            >
              <Users className="w-5 h-5" />
              <span className="font-medium text-sm">Kelola Admin</span>
            </Link>
          )}
        </nav>

        <div className="p-4 mt-auto">
          <button 
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-red-300 hover:bg-white/10 hover:text-red-200 transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium text-sm">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 h-16 flex items-center justify-between px-6 flex-shrink-0 shadow-sm">
          <h2 className="font-semibold text-gray-700 capitalize">
            {pathname.split('/').pop()?.replace('-', ' ') || 'Dashboard'}
          </h2>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-500 hidden sm:inline-block">
              {user?.nama || 'Admin'} ({user?.role})
            </span>
            <div className="w-9 h-9 rounded-full bg-green-100 flex items-center justify-center text-green-primary font-bold">
              A
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6 md:p-8">
          <div className="max-w-6xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
