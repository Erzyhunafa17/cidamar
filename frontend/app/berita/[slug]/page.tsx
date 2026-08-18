import { Metadata, ResolvingMetadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Calendar, User, ArrowLeft, Share2 } from 'lucide-react';
import { fetchBeritaBySlug, fetchBeritaList } from '@/lib/api/berita';
import { formatDate } from '@/lib/utils/format';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata(
  { params }: PageProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { slug } = await params;
  const { data: berita } = await fetchBeritaBySlug(slug).catch(() => ({ data: null }));

  if (!berita) {
    return { title: 'Berita Tidak Ditemukan' };
  }

  const previousImages = (await parent).openGraph?.images || [];

  return {
    title: berita.judul,
    description: berita.isi.substring(0, 160) + '...',
    openGraph: {
      title: berita.judul,
      description: berita.isi.substring(0, 160) + '...',
      images: berita.thumbnail_url
        ? [berita.thumbnail_url, ...previousImages]
        : previousImages,
    },
  };
}

// Generate static params untuk performa maksimal pada artikel populer (opsional)
export async function generateStaticParams() {
  const { data } = await fetchBeritaList(1, 10).catch(() => ({ data: [] }));
  return data.map((b) => ({
    slug: b.slug,
  }));
}

export default async function DetailBeritaPage({ params }: PageProps) {
  const { slug } = await params;
  const { data: berita } = await fetchBeritaBySlug(slug).catch(() => ({ data: null }));

  if (!berita) {
    notFound();
  }

  return (
    <div className="bg-cream-bg min-h-screen pt-28 pb-20">
      <div className="container-custom max-w-4xl">
        {/* Back Link */}
        <Link
          href="/berita"
          className="inline-flex items-center gap-2 text-brown-medium hover:text-green-primary font-medium mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Kembali ke Daftar Berita
        </Link>

        {/* Article Container */}
        <article className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          {/* Thumbnail */}
          {berita.thumbnail_url && (
            <div className="relative w-full h-[300px] md:h-[450px]">
              <Image
                src={berita.thumbnail_url}
                alt={berita.judul}
                fill
                priority
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 896px"
              />
            </div>
          )}

          <div className="p-6 md:p-10 md:pt-12">
            {/* Meta */}
            <div className="flex flex-wrap items-center gap-4 mb-6">
              <Badge variant="green" size="md" className="capitalize">
                {berita.kategori}
              </Badge>
              <div className="flex items-center gap-4 text-sm text-brown-medium font-medium">
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4" />
                  {formatDate(berita.tanggal_terbit)}
                </span>
                <span className="flex items-center gap-1.5">
                  <User className="w-4 h-4" />
                  {berita.penulis?.nama || 'Admin Cidamar'}
                </span>
              </div>
            </div>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-green-primary leading-tight mb-8">
              {berita.judul}
            </h1>

            {/* Content */}
            <div className="prose-cidamar border-t border-gray-100 pt-8">
              {/* Karena kita belum pakai Rich Text, kita pisahkan berdasarkan newline agar paragraf terbaca rapi */}
              {berita.isi.split('\n').map((paragraph, idx) => (
                paragraph.trim() ? (
                  <p key={idx}>{paragraph}</p>
                ) : (
                  <br key={idx} />
                )
              ))}
            </div>

            {/* Footer Action */}
            <div className="border-t border-gray-100 mt-12 pt-8 flex items-center justify-between">
              <span className="text-sm font-semibold text-brown-medium">
                Bagikan artikel ini:
              </span>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="rounded-full h-10 w-10 p-0">
                  <Share2 className="w-4 h-4" />
                  <span className="sr-only">Bagikan</span>
                </Button>
              </div>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}
