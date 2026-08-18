import Link from 'next/link';
import { ArrowRight, Images, ImageIcon } from 'lucide-react';
import { fetchGaleri } from '@/lib/api/galeri';

export default async function GaleriSection() {
  let galeriData = { data: [] };
  try {
    galeriData = await fetchGaleri();
  } catch (error) {
    console.error('Failed to fetch galeri:', error);
  }

  const fotos = galeriData.data?.slice(0, 6) || [];

  return (
    <section
      id="galeri"
      className="section-padding bg-cream-bg"
      aria-label="Galeri Foto Kampung Cidamar"
    >
      <div className="container-custom">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <span className="inline-block text-amber-accent font-semibold text-sm uppercase tracking-widest mb-3">
              Kenangan Bersama
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-green-primary">
              Galeri Kegiatan
            </h2>
          </div>
          <Link
            href="/galeri"
            className="inline-flex items-center gap-1.5 text-green-secondary font-semibold hover:text-green-primary transition-colors shrink-0"
          >
            <Images className="w-4 h-4" />
            Lihat Semua Foto
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Gallery Grid */}
        {fotos.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
            {fotos.map((foto: any, i: number) => (
              <div
                key={foto.id}
                className={`group relative rounded-2xl overflow-hidden cursor-pointer ${
                  i === 0 ? 'md:row-span-2' : ''
                }`}
              >
                {/* Image */}
                <div
                  className={`bg-gray-100 flex items-center justify-center transition-transform duration-500 group-hover:scale-105 ${
                    i === 0 ? 'h-64 md:h-full min-h-[280px]' : 'h-44 md:h-48'
                  }`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={foto.foto_url}
                    alt={foto.judul}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <div>
                    <p className="text-white font-semibold text-sm leading-tight mb-1">{foto.judul}</p>
                    {foto.kategori && (
                      <p className="text-white/70 text-xs font-medium">{foto.kategori}</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white/50 backdrop-blur-sm rounded-3xl border border-gray-100 shadow-sm p-12 text-center max-w-2xl mx-auto">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <ImageIcon className="w-8 h-8 text-gray-300" />
            </div>
            <h3 className="text-lg font-bold text-gray-700 mb-1">Galeri Masih Kosong</h3>
            <p className="text-gray-500 text-sm">
              Belum ada foto kegiatan yang diunggah ke dalam galeri.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
