import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Calendar, User, Image as ImageIcon } from 'lucide-react';
import Badge from '@/components/ui/Badge';
import { fetchBeritaList } from '@/lib/api/berita';
import { formatDate } from '@/lib/utils/format'; // Kita akan buat util ini

const BADGE_VARIANT: Record<string, 'green' | 'amber' | 'gray' | 'red'> = {
  kegiatan: 'green',
  kesehatan: 'red',
  pengumuman: 'amber',
  umum: 'gray',
};

export default async function BeritaSection() {
  // Ambil 3 berita terbaru
  const { data: beritaList = [] } = await fetchBeritaList(1, 3).catch(() => ({ data: [] }));

  return (
    <section
      id="berita"
      className="section-padding bg-cream-bg"
      aria-label="Berita Terkini Kampung Cidamar"
    >
      <div className="container-custom">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <span className="inline-block text-amber-accent font-semibold text-sm uppercase tracking-widest mb-3">
              Terkini dari Kampung
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-green-primary">
              Berita & Kegiatan
            </h2>
          </div>
          <Link
            href="/berita"
            className="inline-flex items-center gap-2 text-green-secondary font-semibold hover:text-green-primary transition-colors shrink-0"
          >
            Semua Berita
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Cards */}
        {beritaList.length === 0 ? (
          <div className="text-center py-10 bg-white rounded-2xl border border-gray-100">
            <p className="text-brown-medium">Belum ada berita yang diterbitkan.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {beritaList.map((berita) => (
              <Link
                key={berita.id}
                href={`/berita/${berita.slug}`}
                className="group bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col"
              >
                {/* Thumbnail area */}
                <div className="relative bg-gradient-to-br from-green-pale to-green-light h-48 flex items-center justify-center text-gray-400 overflow-hidden">
                  {berita.thumbnail_url ? (
                    <Image
                      src={berita.thumbnail_url}
                      alt={berita.judul}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 33vw"
                    />
                  ) : (
                    <ImageIcon className="w-10 h-10 opacity-50" />
                  )}
                </div>

                {/* Content */}
                <div className="p-5 flex flex-col flex-1">
                  <div className="mb-3">
                    <Badge variant={BADGE_VARIANT[berita.kategori] ?? 'gray'} size="sm">
                      {berita.kategori.charAt(0).toUpperCase() + berita.kategori.slice(1)}
                    </Badge>
                  </div>

                  <h3 className="font-heading font-bold text-green-primary text-base mb-2 group-hover:text-green-secondary transition-colors line-clamp-2">
                    {berita.judul}
                  </h3>

                  <p className="text-brown-medium text-sm leading-relaxed line-clamp-3 flex-1 mb-4">
                    {berita.isi}
                  </p>

                  {/* Meta */}
                  <div className="flex items-center justify-between text-xs text-brown-medium border-t border-gray-100 pt-3">
                    <span className="flex items-center gap-1">
                      <User className="w-3 h-3" />
                      {berita.penulis?.nama || 'Admin'}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {formatDate(berita.tanggal_terbit)}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
