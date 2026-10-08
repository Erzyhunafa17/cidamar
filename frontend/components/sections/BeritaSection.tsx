import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { fetchBeritaList } from '@/lib/api/berita';
import ScrollReveal from '@/components/ui/ScrollReveal';

const formatDateString = (dateStr: string) => {
  if (!dateStr) return '';
  const date = new Date(dateStr);
  return new Intl.DateTimeFormat('id-ID', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(date);
};

export default async function BeritaSection() {
  const { data: beritaList = [] } = await fetchBeritaList(1, 3).catch(() => ({ data: [] }));

  return (
    <section
      id="berita"
      className="py-28 md:py-40 bg-cream text-charcoal"
      aria-label="Berita Terkini Kampung Cidamar"
    >
      <div className="container-custom">
        {/* Header */}
        <ScrollReveal direction="up">
          <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-16 md:mb-20 border-b-[2px] border-charcoal/10 pb-8">
            <div>
              <span className="block text-[18px] uppercase tracking-widest text-earth-accent font-semibold mb-4">
                Jurnal Kampung
              </span>
              <h2 className="text-[53px] md:text-[72px] leading-[1.05] font-medium tracking-tight">
                Berita &amp; Pembaruan
              </h2>
            </div>
            <Link
              href="/berita"
              className="group flex items-center gap-3 text-charcoal font-medium hover:text-earth-accent transition-colors pb-1 border-b-2 border-charcoal/20 hover:border-earth-accent text-[18px]"
            >
              Lihat semua arsip
              <ArrowRight className="w-5 h-5 opacity-70 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
            </Link>
          </div>
        </ScrollReveal>

        {beritaList.length === 0 ? (
          <p className="text-charcoal/60 italic text-[18px]">Belum ada berita yang diterbitkan saat ini.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-10 gap-y-16">
            {beritaList.map((berita, i) => (
              <ScrollReveal key={berita.id} direction="up" delay={i * 0.12}>
                <Link
                  href={`/berita/${berita.slug}`}
                  className="group flex flex-col items-start cursor-pointer"
                >
                  {/* Thumbnail */}
                  <div className="w-full aspect-[4/3] bg-cream-alt mb-6 overflow-hidden rounded-[24px] border-[2px] border-charcoal/10 group-hover:border-charcoal transition-colors">
                    {berita.thumbnail_url ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={berita.thumbnail_url}
                        alt={berita.judul}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-charcoal/20 bg-cream-alt">
                        <span className="text-[18px] uppercase tracking-widest font-semibold">Cidamar</span>
                      </div>
                    )}
                  </div>

                  {/* Meta */}
                  <div className="flex items-center gap-4 mb-3 w-full">
                    <span className="text-[15px] font-semibold uppercase tracking-widest text-earth-accent">
                      {berita.kategori}
                    </span>
                    <div className="h-[2px] bg-charcoal/10 flex-1" />
                    <time className="text-[15px] text-charcoal/60 uppercase tracking-wider">
                      {formatDateString(berita.tanggal_terbit)}
                    </time>
                  </div>

                  {/* Title */}
                  <h3 className="text-[26px] md:text-[28px] font-medium leading-snug mb-3 group-hover:text-earth-accent transition-colors tracking-tight">
                    {berita.judul}
                  </h3>

                  <p className="text-charcoal/70 text-[18px] leading-relaxed line-clamp-3">
                    {berita.isi}
                  </p>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
