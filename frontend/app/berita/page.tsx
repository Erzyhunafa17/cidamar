import Link from 'next/link';
import Image from 'next/image';
import { Calendar, User, Search, Image as ImageIcon } from 'lucide-react';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import { fetchBeritaList } from '@/lib/api/berita';
import { formatDate } from '@/lib/utils/format';
import { KATEGORI_BERITA } from '@/lib/utils/constants';

const BADGE_VARIANT: Record<string, 'green' | 'amber' | 'gray' | 'red'> = {
  kegiatan: 'green',
  kesehatan: 'red',
  pengumuman: 'amber',
  umum: 'gray',
};

// Generate metadata dinamis
export const metadata = {
  title: 'Berita & Kegiatan',
  description: 'Berita terbaru dan kegiatan seputar Kampung Cidamar.',
};

export default async function BeritaPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; kategori?: string; page?: string }>;
}) {
  const resolvedParams = await searchParams;
  const q = resolvedParams.q || '';
  const kategori = resolvedParams.kategori || '';
  const page = parseInt(resolvedParams.page || '1');

  // Fetch data (Server Component)
  const { data: beritaList = [], pagination } = await fetchBeritaList(page, 9, kategori, q).catch(() => ({
    data: [],
    pagination: { page: 1, limit: 9, total: 0, totalPages: 0 }
  }));

  return (
    <div className="section-padding bg-cream-bg min-h-screen pt-28">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-green-primary mb-4">
            Berita Kampung
          </h1>
          <p className="text-brown-medium text-lg max-w-2xl mx-auto">
            Ikuti terus perkembangan, pengumuman, dan kegiatan terbaru di Kampung Cidamar.
          </p>
        </div>

        {/* Search & Filter */}
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 mb-10">
          <form className="flex flex-col md:flex-row gap-4" action="/berita" method="GET">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                name="q"
                defaultValue={q}
                placeholder="Cari berita..."
                className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-green-secondary focus:ring-2 focus:ring-green-secondary/20 transition-all"
              />
            </div>
            <select
              name="kategori"
              defaultValue={kategori}
              className="px-4 py-3 rounded-xl border border-gray-200 bg-white focus:outline-none focus:border-green-secondary focus:ring-2 focus:ring-green-secondary/20 min-w-[200px]"
            >
              <option value="">Semua Kategori</option>
              {KATEGORI_BERITA.map((k) => (
                <option key={k.value} value={k.value}>{k.label}</option>
              ))}
            </select>
            <Button type="submit" size="lg" className="md:w-auto">
              Cari
            </Button>
          </form>
        </div>

        {/* List */}
        {beritaList.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-gray-100">
            <div className="text-6xl mb-4">📰</div>
            <h3 className="text-xl font-bold text-green-primary mb-2">Berita tidak ditemukan</h3>
            <p className="text-brown-medium">Coba ubah kata kunci atau kategori pencarian.</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {beritaList.map((berita) => (
                <Link
                  key={berita.id}
                  href={`/berita/${berita.slug}`}
                  className="group bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col"
                >
                  {/* Thumbnail area */}
                  <div className="relative bg-gradient-to-br from-green-pale to-green-light h-52 flex items-center justify-center text-gray-400 overflow-hidden">
                    {berita.thumbnail_url ? (
                      <Image
                        src={berita.thumbnail_url}
                        alt={berita.judul}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    ) : (
                      <ImageIcon className="w-10 h-10 opacity-50" />
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-6 flex flex-col flex-1">
                    <div className="mb-4">
                      <Badge variant={BADGE_VARIANT[berita.kategori] ?? 'gray'} size="sm">
                        {berita.kategori.charAt(0).toUpperCase() + berita.kategori.slice(1)}
                      </Badge>
                    </div>

                    <h3 className="font-heading font-bold text-green-primary text-xl mb-3 group-hover:text-green-secondary transition-colors line-clamp-2 leading-snug">
                      {berita.judul}
                    </h3>

                    <p className="text-brown-medium leading-relaxed line-clamp-3 flex-1 mb-5">
                      {berita.isi}
                    </p>

                    {/* Meta */}
                    <div className="flex items-center justify-between text-xs text-brown-medium border-t border-gray-100 pt-4 mt-auto">
                      <span className="flex items-center gap-1.5 font-medium">
                        <User className="w-3.5 h-3.5" />
                        {berita.penulis?.nama || 'Admin'}
                      </span>
                      <span className="flex items-center gap-1.5 font-medium">
                        <Calendar className="w-3.5 h-3.5" />
                        {formatDate(berita.tanggal_terbit)}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Pagination Controls */}
            {pagination && pagination.totalPages > 1 && (
              <div className="flex items-center justify-center gap-2">
                {Array.from({ length: pagination.totalPages }).map((_, i) => {
                  const p = i + 1;
                  const isActive = p === page;
                  return (
                    <Link
                      key={p}
                      href={`/berita?page=${p}${q ? `&q=${q}` : ''}${kategori ? `&kategori=${kategori}` : ''}`}
                    >
                      <Button
                        variant={isActive ? 'primary' : 'outline'}
                        className={`w-12 h-12 p-0 rounded-xl ${!isActive && 'bg-white'}`}
                      >
                        {p}
                      </Button>
                    </Link>
                  );
                })}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
