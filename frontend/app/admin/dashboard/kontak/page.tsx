import { Wallet, AtSign, Heart, Code, Briefcase } from 'lucide-react';
import Badge from '@/components/ui/Badge';
import Image from 'next/image';

export default function AdminKontakPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] bg-white rounded-3xl border border-gray-100 shadow-sm p-8 text-center">
      
      <div className="relative w-24 h-24 rounded-full shadow-lg mx-auto mb-6 border-4 border-blue-50 overflow-hidden transform hover:scale-105 transition-transform">
        <Image
          src="/developer.jpg"
          alt="Erzy Hunafa"
          fill
          className="object-cover"
        />
      </div>

      <Badge variant="blue" className="mb-4">
        Info Developer
      </Badge>

      <h1 className="text-2xl font-bold text-gray-800 mb-2">
        Kontak & Dukungan
      </h1>
      
      <p className="text-gray-500 max-w-md mx-auto mb-8 leading-relaxed">
        Halaman kontak publik saat ini didedikasikan untuk menampilkan informasi pengembang sistem ini. Anda tidak perlu mengelola konten kontak secara manual.
      </p>

      <div className="bg-gray-50 p-6 rounded-2xl w-full max-w-md text-left space-y-4 border border-gray-100 shadow-inner">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white rounded-lg shadow-sm flex items-center justify-center text-gray-700">
            <Code className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs text-gray-500 font-bold uppercase">Nama Pembuat</p>
            <p className="font-semibold text-gray-800">Erzy Hunafa</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white rounded-lg shadow-sm flex items-center justify-center text-pink-500">
            <AtSign className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs text-gray-500 font-bold uppercase">Instagram</p>
            <a href="https://www.instagram.com/erzyhunafa/" target="_blank" rel="noopener noreferrer" className="font-semibold text-pink-600 hover:underline">
              @erzyhunafa
            </a>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white rounded-lg shadow-sm flex items-center justify-center text-blue-600">
            <Briefcase className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs text-gray-500 font-bold uppercase">LinkedIn</p>
            <a href="https://www.linkedin.com/in/erzy-hunafa-939034240/" target="_blank" rel="noopener noreferrer" className="font-semibold text-blue-700 hover:underline">
              Erzy Hunafa
            </a>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white rounded-lg shadow-sm flex items-center justify-center text-blue-500">
            <Wallet className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs text-gray-500 font-bold uppercase">No. DANA (Saweria)</p>
            <p className="font-bold text-blue-600 text-lg">08561758556</p>
          </div>
        </div>
      </div>
      
      <p className="mt-8 text-sm text-gray-400 flex items-center gap-1">
        Dibuat dengan <Heart className="w-4 h-4 text-red-400" /> untuk Kampung Cidamar
      </p>
    </div>
  );
}
