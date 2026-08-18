import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { fetchGaleri, fetchPengaturan } from '@/lib/api/galeri';
import { Camera, ExternalLink, Image as ImageIcon } from 'lucide-react';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';

export const metadata: Metadata = {
  title: 'Galeri Foto | Kampung Cidamar',
  description: 'Album foto dan dokumentasi kegiatan warga Kampung Cidamar.',
};

export const dynamic = 'force-dynamic';

export default async function GaleriPage() {
  const [galeriData, pengaturanData] = await Promise.all([
    fetchGaleri().catch(() => ({ data: [] })),
    fetchPengaturan().catch(() => ({ data: {} }))
  ]);

  const fotos = galeriData.data || [];
  const gdriveLink = pengaturanData.data?.galeri_gdrive_link || '';

  return (
    <div className="bg-cream-bg min-h-screen pt-28 pb-20 font-sans">
      <div className="container-custom max-w-6xl">
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge variant="green" className="mb-4">
            <Camera className="w-4 h-4 mr-1.5" />
            Dokumentasi
          </Badge>
          <h1 className="text-4xl md:text-5xl font-extrabold text-green-primary mb-4">
            Galeri Kampung
          </h1>
          <p className="text-lg text-brown-medium mb-8">
            Potret kebersamaan, kegiatan, dan pembangunan di Kampung Cidamar.
          </p>

          {gdriveLink && (
            <a href={gdriveLink} target="_blank" rel="noopener noreferrer">
              <Button variant="secondary" className="bg-amber-accent hover:bg-amber-500 border-none shadow-md">
                <ExternalLink className="w-4 h-4 mr-2" />
                Lihat Album Lengkap di Google Drive
              </Button>
            </a>
          )}
        </div>

        {/* Gallery Grid */}
        {fotos.length > 0 ? (
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
            {fotos.map((foto: any) => (
              <div 
                key={foto.id} 
                className="break-inside-avoid rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group bg-white border border-gray-100"
              >
                <div className="relative aspect-auto w-full overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={foto.foto_url}
                    alt={foto.judul}
                    className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  
                  {/* Overlay Gradient on Hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                    <h3 className="text-white font-bold text-lg leading-tight mb-1 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                      {foto.judul}
                    </h3>
                    <div className="flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75">
                      {foto.kategori && (
                        <span className="text-xs bg-white/20 backdrop-blur-sm text-white px-2.5 py-1 rounded-full font-medium">
                          {foto.kategori}
                        </span>
                      )}
                      {foto.tahun && (
                        <span className="text-xs text-white/80 font-medium">
                          {foto.tahun}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-12 text-center max-w-2xl mx-auto">
            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <ImageIcon className="w-10 h-10 text-gray-300" />
            </div>
            <h3 className="text-xl font-bold text-gray-700 mb-2">Belum Ada Foto</h3>
            <p className="text-gray-500">
              Admin belum menambahkan foto ke dalam galeri website.
            </p>
          </div>
        )}

      </div>
    </div>
  );
}
