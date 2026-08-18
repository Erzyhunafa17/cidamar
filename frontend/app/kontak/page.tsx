import { Metadata } from 'next';
import { Heart, AtSign, Wallet, Code, Mail, ArrowRight, Briefcase } from 'lucide-react';
import Badge from '@/components/ui/Badge';
import Link from 'next/link';
import Image from 'next/image';
import Button from '@/components/ui/Button';

export const metadata: Metadata = {
  title: 'Kontak Developer | Kampung Cidamar',
  description: 'Informasi pengembang website Kampung Cidamar.',
};

export default function KontakPage() {
  return (
    <div className="bg-cream-bg min-h-screen pt-32 pb-20 flex items-center justify-center font-sans relative overflow-hidden">

      {/* Background Ornaments */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-green-50 rounded-bl-full opacity-60 -z-10"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-50 rounded-tr-full opacity-60 -z-10"></div>

      <div className="container-custom max-w-4xl px-4 relative z-10">

        <div className="bg-white rounded-3xl shadow-xl shadow-green-900/5 overflow-hidden border border-gray-100 flex flex-col md:flex-row">

          {/* Left/Top Section (Profile) */}
          <div className="md:w-5/12 bg-green-primary p-10 flex flex-col items-center justify-center text-center relative overflow-hidden">
            {/* Overlay Patterns */}
            <div className="absolute inset-0 bg-green-800 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/20 to-transparent"></div>

            <div className="relative z-10 flex flex-col items-center">
              <div className="relative w-32 h-32 rounded-[2rem] border-4 border-white/20 shadow-2xl mb-6 mx-auto transform hover:scale-105 transition-transform duration-300 overflow-hidden">
                <Image
                  src="/developer.jpg"
                  alt="Erzy Hunafa"
                  fill
                  className="object-cover"
                />
              </div>

              <Badge variant="white" className="mb-4 bg-white/20 text-white border-none shadow-sm backdrop-blur-md">
                Developer Website
              </Badge>

              <h1 className="text-3xl font-black !text-white mb-2 leading-tight">
                Erzy Hunafa
              </h1>
              <p className="text-green-100 font-medium">
                Sistem Informasi Terpadu<br />Kampung Cidamar
              </p>
            </div>
          </div>

          {/* Right/Bottom Section (Contact & Donation) */}
          <div className="md:w-7/12 p-8 md:p-12 flex flex-col justify-center">

            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Mari Terhubung!
            </h2>
            <p className="text-gray-600 mb-8 leading-relaxed text-sm">
              Website ini dikembangkan dengan sepenuh hati untuk mendigitalkan administrasi dan memperluas jangkauan informasi publik Kampung Cidamar. Jika Anda memiliki kritik, saran, atau sekadar ingin menyapa, jangan ragu untuk menghubungi saya!
            </p>

            <div className="space-y-4 mb-8">
              {/* Instagram */}
              <a
                href="https://www.instagram.com/erzyhunafa/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center p-4 rounded-2xl bg-gray-50 hover:bg-pink-50 border border-gray-100 hover:border-pink-200 transition-all group"
              >
                <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-pink-500 mr-4 group-hover:scale-110 transition-transform">
                  <AtSign className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-medium uppercase tracking-wider mb-0.5">Instagram</p>
                  <p className="font-bold text-gray-800 group-hover:text-pink-600 transition-colors">@erzyhunafa</p>
                </div>
                <ArrowRight className="w-4 h-4 text-gray-300 ml-auto group-hover:text-pink-400 group-hover:translate-x-1 transition-all" />
              </a>

              {/* LinkedIn */}
              <a
                href="https://www.linkedin.com/in/erzy-hunafa-939034240/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center p-4 rounded-2xl bg-gray-50 hover:bg-blue-50 border border-gray-100 hover:border-blue-200 transition-all group"
              >
                <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-blue-600 mr-4 group-hover:scale-110 transition-transform">
                  <Briefcase className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-medium uppercase tracking-wider mb-0.5">LinkedIn</p>
                  <p className="font-bold text-gray-800 group-hover:text-blue-700 transition-colors">Erzy Hunafa</p>
                </div>
                <ArrowRight className="w-4 h-4 text-gray-300 ml-auto group-hover:text-blue-500 group-hover:translate-x-1 transition-all" />
              </a>

              {/* DANA (Saweria/Donation) */}
              <div className="flex items-center p-4 rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100">
                <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-blue-500 mr-4">
                  <Wallet className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-blue-600/70 font-bold uppercase tracking-wider mb-0.5">
                    Dukung Developer (DANA)
                  </p>
                  <div className="flex items-center gap-3">
                    <p className="font-extrabold text-blue-700 text-lg">08561758556</p>
                    <Badge variant="blue" size="sm" className="bg-blue-100 border-none shadow-sm">
                      Terima Kasih! ❤️
                    </Badge>
                  </div>
                </div>
              </div>
            </div>

            <p className="text-xs text-center text-gray-400 mt-auto pt-4 border-t border-gray-100">
              © {new Date().getFullYear()} Erzy Hunafa. Dikembangkan untuk Kampung Cidamar.
            </p>

          </div>
        </div>
      </div>
    </div>
  );
}
