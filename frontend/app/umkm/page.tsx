import { Metadata } from 'next';
import { Store, Clock } from 'lucide-react';
import Badge from '@/components/ui/Badge';
import Link from 'next/link';
import Button from '@/components/ui/Button';

export const metadata: Metadata = {
  title: 'UMKM Desa | Kampung Cidamar',
  description: 'Pusat produk unggulan dan UMKM masyarakat Kampung Cidamar.',
};

export default function UMKMPage() {
  return (
    <div className="bg-cream-bg min-h-screen pt-32 pb-20 flex items-center justify-center font-sans">
      <div className="container-custom max-w-2xl text-center px-4">
        
        {/* Dekorasi Latar Belakang Lingkaran (Opsional agar lebih estetis) */}
        <div className="relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-amber-100 rounded-full blur-3xl opacity-50 -z-10"></div>
          
          <div className="w-24 h-24 bg-white rounded-3xl shadow-xl shadow-amber-500/10 flex items-center justify-center mx-auto mb-8 transform -rotate-6 hover:rotate-0 transition-transform duration-500">
            <Store className="w-12 h-12 text-amber-500" />
          </div>
        </div>

        <Badge variant="gold" className="mb-6 mx-auto">
          <Clock className="w-4 h-4 mr-1.5" />
          Sedang Dalam Pengembangan
        </Badge>

        <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-6 leading-tight">
          Pusat <span className="text-amber-500">UMKM</span> Cidamar
        </h1>
        
        <p className="text-lg text-gray-600 mb-10 leading-relaxed max-w-lg mx-auto">
          Halaman untuk mempromosikan produk-produk unggulan dan potensi ekonomi kreatif warga Kampung Cidamar sedang dipersiapkan. Nantikan kehadirannya segera!
        </p>

        <Link href="/">
          <Button className="px-8 py-3 rounded-xl bg-green-primary text-white hover:bg-green-600 shadow-lg shadow-green-500/30 transition-all hover:-translate-y-1">
            Kembali ke Beranda
          </Button>
        </Link>

      </div>
    </div>
  );
}
