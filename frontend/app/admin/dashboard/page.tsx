import { Metadata } from 'next';
import { Newspaper, Trophy, Flag, Store, Image as ImageIcon, FolderArchive } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Dashboard Admin | Kampung Cidamar',
  description: 'Panel kendali website Kampung Cidamar',
};

const menuItems = [
  { href: '/admin/dashboard/berita', label: 'Kelola Berita', icon: Newspaper, color: 'text-blue-500', bg: 'bg-blue-50' },
  { href: '/admin/dashboard/prestasi', label: 'Kelola Prestasi', icon: Trophy, color: 'text-yellow-500', bg: 'bg-yellow-50' },
  { href: '/admin/dashboard/agustusan', label: 'Lomba Agustusan', icon: Flag, color: 'text-red-500', bg: 'bg-red-50' },
  { href: '/admin/dashboard/umkm', label: 'Kelola UMKM', icon: Store, color: 'text-orange-500', bg: 'bg-orange-50' },
  { href: '/admin/dashboard/galeri', label: 'Galeri Foto', icon: ImageIcon, color: 'text-green-500', bg: 'bg-green-50' },
  { href: '/admin/dashboard/arsip', label: 'Arsip & Surat', icon: FolderArchive, color: 'text-purple-500', bg: 'bg-purple-50' },
];

export default function AdminDashboardPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Selamat Datang di Panel Admin! 👋</h1>
        <p className="text-gray-500">
          Dari sini Anda dapat mengelola seluruh konten dan fitur website Kampung Cidamar. Silakan pilih menu di bawah atau di samping untuk mulai bekerja.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link 
              key={item.href} 
              href={item.href}
              className="flex items-center p-6 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all group"
            >
              <div className={`w-14 h-14 rounded-xl flex items-center justify-center mr-4 ${item.bg}`}>
                <Icon className={`w-7 h-7 ${item.color} group-hover:scale-110 transition-transform`} />
              </div>
              <div>
                <h3 className="font-bold text-gray-800 text-lg group-hover:text-green-primary transition-colors">
                  {item.label}
                </h3>
                <p className="text-sm text-gray-400 mt-1">Klik untuk mengelola</p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
