import Link from 'next/link';
import Image from 'next/image';
import { Trophy, ChevronRight, Award, MapPin } from 'lucide-react';
import Badge from '@/components/ui/Badge';
import { fetchPrestasiList } from '@/lib/api/prestasi';

export default async function PrestasiSection() {
  const { data: prestasiData } = await fetchPrestasiList({ limit: 3 }).catch(() => ({ data: [] }));

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Decorative background element */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-green-50/50 rounded-l-[120px] -z-0"></div>
      
      <div className="container-custom relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="max-w-2xl">
            <Badge variant="gold" className="mb-4">
              <Trophy className="w-4 h-4 mr-1.5" />
              Kebanggaan Cidamar
            </Badge>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Prestasi & <span className="text-green-primary">Pencapaian</span>
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              Dedikasi warga Kampung Cidamar telah menghasilkan berbagai penghargaan 
              yang mengharumkan nama desa di berbagai tingkat.
            </p>
          </div>
          
          <Link 
            href="/prestasi" 
            className="inline-flex items-center gap-2 text-green-primary font-semibold hover:text-green-700 transition-colors group"
          >
            Lihat Semua Prestasi
            <span className="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center group-hover:bg-green-100 transition-colors">
              <ChevronRight className="w-4 h-4" />
            </span>
          </Link>
        </div>

        {prestasiData && prestasiData.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {prestasiData.map((item: any, index: number) => (
              <div 
                key={item.id} 
                className="group relative bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden"
              >
                {/* Image or Pattern fallback */}
                <div className="relative h-48 w-full bg-gray-100 overflow-hidden">
                  {item.foto_url ? (
                    <Image
                      src={item.foto_url}
                      alt={item.nama_prestasi}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-green-50 to-amber-50">
                      <Trophy className="w-16 h-16 text-amber-200" />
                    </div>
                  )}
                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  
                  {/* Badge Tingkat */}
                  <div className="absolute bottom-4 left-4">
                    <Badge variant={item.tingkat === 'nasional' ? 'gold' : item.tingkat === 'provinsi' ? 'silver' : 'bronze'} size="sm" className="shadow-lg">
                      <MapPin className="w-3 h-3 mr-1" />
                      Tingkat {item.tingkat.replace('_', '/').toUpperCase()}
                    </Badge>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-3 text-sm text-gray-500 mb-3 font-medium">
                    <span className="flex items-center gap-1 bg-gray-50 px-2 py-1 rounded-md">
                      <Award className="w-4 h-4 text-amber-500" />
                      Juara Tahun {item.tahun}
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-3 leading-snug group-hover:text-green-primary transition-colors line-clamp-2">
                    {item.nama_prestasi}
                  </h3>
                  
                  <p className="text-gray-600 line-clamp-2 mb-6">
                    {item.deskripsi || `Penghargaan yang diraih di kategori ${item.kategori.replace('_', ' ')}.`}
                  </p>

                  <Link 
                    href={`/prestasi/${item.slug}`}
                    className="inline-flex w-full items-center justify-center gap-2 px-4 py-2.5 bg-gray-50 hover:bg-green-primary hover:text-white text-green-primary font-medium rounded-xl transition-colors"
                  >
                    Detail Prestasi
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-gray-50 rounded-3xl border border-gray-100">
            <Trophy className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 font-medium">Belum ada data prestasi yang ditambahkan.</p>
          </div>
        )}
      </div>
    </section>
  );
}
