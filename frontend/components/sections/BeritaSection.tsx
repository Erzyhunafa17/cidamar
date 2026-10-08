import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { fetchBeritaList } from '@/lib/api/berita';

const formatDateString = (dateStr: string) => {
  if (!dateStr) return '';
  const date = new Date(dateStr);
  return new Intl.DateTimeFormat('id-ID', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  }).format(date);
};

export default async function BeritaSection() {
  const { data: beritaList = [] } = await fetchBeritaList(1, 3).catch(() => ({ data: [] }));

  return (
    <section
      id="berita"
      className="py-24 md:py-32 bg-cream text-charcoal border-b border-slate/10"
      aria-label="Berita Terkini Kampung Cidamar"
    >
      <div className="container-custom">
        <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-16 md:mb-20 border-b border-slate/10 pb-8">
          <div>
            <span className="block text-xs uppercase tracking-widest text-earth-accent font-semibold mb-4">
              Jurnal Kampung
            </span>
            <h2 className="text-4xl md:text-5xl font-heading font-medium leading-tight text-charcoal">
              Berita & Pembaruan
            </h2>
          </div>
          <Link
            href="/berita"
            className="group flex items-center gap-2 text-charcoal font-medium hover:text-earth-accent transition-colors pb-1"
          >
            Lihat semua arsip
            <ArrowRight className="w-4 h-4 opacity-70 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
          </Link>
        </div>

        {beritaList.length === 0 ? (
          <p className="text-charcoal/60 italic font-light">Belum ada berita yang diterbitkan saat ini.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-12 gap-y-16">
            {beritaList.map((berita) => (
              <Link
                key={berita.id}
                href={`/berita/${berita.slug}`}
                className="group flex flex-col items-start"
              >
                <div className="w-full aspect-[4/3] bg-muted-green-light mb-6 overflow-hidden">
                  {berita.thumbnail_url ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={berita.thumbnail_url}
                      alt={berita.judul}
                      className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)]"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-charcoal/20 bg-cream-alt">
                      <span className="text-sm uppercase tracking-widest font-semibold">Cidamar</span>
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-4 mb-3 w-full">
                  <span className="text-xs font-semibold uppercase tracking-widest text-earth-accent">
                    {berita.kategori}
                  </span>
                  <div className="h-px bg-slate/10 flex-1" />
                  <time className="text-xs text-charcoal/60 uppercase tracking-wider">
                    {formatDateString(berita.tanggal_terbit)}
                  </time>
                </div>

                <h3 className="font-heading text-2xl font-medium leading-snug mb-3 group-hover:text-earth-accent transition-colors">
                  {berita.judul}
                </h3>
                
                <p className="text-charcoal/70 text-[0.95rem] leading-relaxed line-clamp-3 font-light">
                  {berita.isi}
                </p>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
