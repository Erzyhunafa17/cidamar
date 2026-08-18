import { Metadata, ResolvingMetadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Award, ArrowLeft, Trophy, Calendar, MapPin, Share2 } from 'lucide-react';
import { fetchPrestasiBySlug, fetchPrestasiList } from '@/lib/api/prestasi';
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
  const { data: prestasi } = await fetchPrestasiBySlug(slug).catch(() => ({ data: null }));

  if (!prestasi) {
    return { title: 'Prestasi Tidak Ditemukan' };
  }

  const previousImages = (await parent).openGraph?.images || [];

  return {
    title: `${prestasi.nama_prestasi} | Prestasi Cidamar`,
    description: prestasi.deskripsi?.substring(0, 160) || `Penghargaan tingkat ${prestasi.tingkat} yang diraih pada tahun ${prestasi.tahun}.`,
    openGraph: {
      title: prestasi.nama_prestasi,
      description: prestasi.deskripsi?.substring(0, 160) || `Penghargaan tingkat ${prestasi.tingkat} yang diraih pada tahun ${prestasi.tahun}.`,
      images: prestasi.foto_url
        ? [prestasi.foto_url, ...previousImages]
        : previousImages,
    },
  };
}

// ISR Static Params
export async function generateStaticParams() {
  const { data } = await fetchPrestasiList({ limit: 20 }).catch(() => ({ data: [] }));
  return data.map((b: any) => ({
    slug: b.slug,
  }));
}

export default async function DetailPrestasiPage({ params }: PageProps) {
  const { slug } = await params;
  const { data: prestasi } = await fetchPrestasiBySlug(slug).catch(() => ({ data: null }));

  if (!prestasi) {
    notFound();
  }

  return (
    <div className="bg-cream-bg min-h-screen pt-28 pb-20">
      <div className="container-custom max-w-4xl">
        {/* Back Link */}
        <Link
          href="/prestasi"
          className="inline-flex items-center gap-2 text-brown-medium hover:text-green-primary font-medium mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Kembali ke Daftar Prestasi
        </Link>

        {/* Card Container */}
        <article className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden relative">
          
          {/* Top accent */}
          <div className="h-4 w-full bg-gradient-to-r from-amber-400 via-amber-200 to-green-primary"></div>

          <div className="p-6 md:p-12">
            {/* Header Content */}
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-8 mb-10 border-b border-gray-100 pb-10">
              
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-3 mb-6">
                  <Badge variant={prestasi.tingkat === 'nasional' ? 'gold' : prestasi.tingkat === 'provinsi' ? 'silver' : 'bronze'} size="md">
                    <Trophy className="w-4 h-4 mr-1.5" />
                    Tingkat {prestasi.tingkat.replace('_', '/').toUpperCase()}
                  </Badge>
                  <span className="flex items-center gap-1.5 text-sm text-brown-medium font-medium bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-200">
                    <Calendar className="w-4 h-4" />
                    Tahun {prestasi.tahun}
                  </span>
                  <span className="flex items-center gap-1.5 text-sm text-brown-medium font-medium bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-200 capitalize">
                    <MapPin className="w-4 h-4" />
                    Kategori {prestasi.kategori.replace('_', ' ')}
                  </span>
                </div>

                <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-green-primary leading-tight mb-6">
                  {prestasi.nama_prestasi}
                </h1>
              </div>

              {/* Icon/Medal visual representation if no image */}
              {!prestasi.foto_url && (
                <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-amber-50 flex items-center justify-center flex-shrink-0 border-8 border-white shadow-lg mx-auto md:mx-0">
                  <Award className="w-16 h-16 text-amber-400" />
                </div>
              )}
            </div>

            {/* Content Body */}
            <div className="flex flex-col lg:flex-row gap-10">
              <div className="flex-1 prose-cidamar">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Award className="w-6 h-6 text-amber-500" />
                  Keterangan Pencapaian
                </h3>
                {prestasi.deskripsi ? (
                  prestasi.deskripsi.split('\n').map((paragraph: string, idx: number) => (
                    paragraph.trim() ? (
                      <p key={idx} className="text-gray-700 leading-relaxed text-lg">{paragraph}</p>
                    ) : (
                      <br key={idx} />
                    )
                  ))
                ) : (
                  <p className="text-gray-500 italic">Tidak ada keterangan detail mengenai prestasi ini.</p>
                )}
              </div>

              {/* Image Side */}
              {prestasi.foto_url && (
                <div className="w-full lg:w-5/12">
                  <div className="relative h-[300px] lg:h-[400px] rounded-2xl overflow-hidden shadow-md border border-gray-100">
                    <Image
                      src={prestasi.foto_url}
                      alt={prestasi.nama_prestasi}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 400px"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Footer Action */}
            <div className="border-t border-gray-100 mt-12 pt-8 flex items-center justify-between">
              <span className="text-sm font-semibold text-brown-medium">
                Bagikan kebanggaan ini:
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
