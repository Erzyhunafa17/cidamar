import { Store, Clock } from 'lucide-react';
import Badge from '@/components/ui/Badge';
import Link from 'next/link';
import Button from '@/components/ui/Button';

export default function AdminUMKMPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] bg-white rounded-3xl border border-gray-100 shadow-sm p-8 text-center">
      
      <div className="w-24 h-24 bg-amber-50 rounded-full flex items-center justify-center mx-auto mb-6">
        <Store className="w-10 h-10 text-amber-500" />
      </div>

      <Badge variant="gold" className="mb-4">
        <Clock className="w-4 h-4 mr-1.5" />
        Dalam Tahap Pengembangan
      </Badge>

      <h1 className="text-2xl font-bold text-gray-800 mb-3">
        Modul UMKM Segera Hadir
      </h1>
      
      <p className="text-gray-500 max-w-md mx-auto mb-8 leading-relaxed">
        Fitur pengelolaan UMKM (Usaha Mikro, Kecil, dan Menengah) sedang dalam tahap rancangan. Anda nantinya dapat mengelola katalog produk warga dari halaman ini.
      </p>

      <Link href="/admin/dashboard">
        <Button variant="outline">
          Kembali ke Dashboard Utama
        </Button>
      </Link>
    </div>
  );
}
