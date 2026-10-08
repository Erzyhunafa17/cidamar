import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { fetchGaleri } from '@/lib/api/galeri';

export default async function GaleriSection() {
  let galeriData = { data: [] };
  try {
    galeriData = await fetchGaleri();
  } catch (error) {
    console.error('Failed to fetch galeri:', error);
  }

  const fotos = galeriData.data?.slice(0, 4) || [];

  return (
    <section
      id="galeri"
      className="py-24 md:py-32 bg-charcoal text-cream border-t border-slate"
      aria-label="Galeri Foto Kampung Cidamar"
    >
      <div className="container-custom">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <span className="block text-xs uppercase tracking-widest text-earth-accent font-semibold mb-4">
              Jejak Visual
            </span>
            <h2 className="text-4xl md:text-5xl font-heading font-medium text-cream">
              Galeri Kegiatan
            </h2>
          </div>
          <Link
            href="/galeri"
            className="group flex items-center gap-2 text-cream font-medium hover:text-earth-accent transition-colors pb-1 border-b border-cream/20 hover:border-earth-accent"
          >
            Lihat Arsip Foto
            <ArrowRight className="w-4 h-4 opacity-70 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
          </Link>
        </div>

        {fotos.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {fotos.map((foto: any, i: number) => (
              <div
                key={foto.id}
                className="group relative overflow-hidden aspect-[4/5] bg-slate/50"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={foto.foto_url}
                  alt={foto.judul}
                  className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)]"
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6">
                  <span className="text-earth-accent text-[0.65rem] uppercase tracking-widest font-semibold mb-2 block">
                    {foto.kategori || 'Dokumentasi'}
                  </span>
                  <p className="text-cream font-medium text-lg leading-snug">
                    {foto.judul}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="border-t border-slate pt-16 text-center">
            <p className="text-cream/40 text-sm font-light italic">Belum ada dokumentasi visual yang diunggah.</p>
          </div>
        )}
      </div>
    </section>
  );
}
