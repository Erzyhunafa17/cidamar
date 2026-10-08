import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import Badge, { BadgeTingkat } from '@/components/ui/Badge';
import { fetchPrestasiList } from '@/lib/api/prestasi';

export default async function PrestasiSection() {
  const { data: prestasiData = [] } = await fetchPrestasiList({ limit: 4 }).catch(() => ({ data: [] }));

  return (
    <section className="py-24 md:py-32 bg-cream" aria-label="Prestasi Kampung">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 mb-16">
          <div className="lg:col-span-5 flex flex-col justify-end">
            <span className="block text-xs uppercase tracking-widest text-earth-accent font-semibold mb-4">
              Pencapaian & Kebanggaan
            </span>
            <h2 className="text-4xl md:text-5xl font-heading font-medium leading-tight text-charcoal mb-6">
              Jejak Prestasi<br />Kampung Cidamar.
            </h2>
            <Link 
              href="/prestasi" 
              className="group inline-flex items-center gap-3 text-charcoal font-medium hover:text-earth-accent transition-colors w-fit border-b border-charcoal/20 hover:border-earth-accent pb-1"
            >
              Arsip Prestasi
              <ArrowRight className="w-4 h-4 opacity-70 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
            </Link>
          </div>
          <div className="lg:col-span-6 xl:col-span-5 lg:col-start-7 flex items-end">
             <p className="text-lg text-charcoal/70 leading-relaxed font-light">
              Dedikasi warga telah membuahkan berbagai penghargaan yang mengharumkan nama kampung dari tingkat wilayah hingga nasional.
            </p>
          </div>
        </div>

        {prestasiData.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12 border-t border-slate/10 pt-16">
            {prestasiData.map((item: any) => (
              <Link 
                key={item.id}
                href={`/prestasi/${item.slug}`}
                className="group flex flex-col sm:flex-row gap-6 md:gap-8 items-start"
              >
                <div className="w-full sm:w-1/3 aspect-square bg-muted-green-light shrink-0 overflow-hidden">
                  {item.foto_url ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={item.foto_url}
                      alt={item.nama_prestasi}
                      className="w-full h-full object-cover grayscale opacity-90 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-charcoal/30 bg-cream-alt">
                      <span className="text-xs uppercase tracking-widest font-semibold">Tahun {item.tahun}</span>
                    </div>
                  )}
                </div>

                <div className="flex flex-col flex-1 h-full justify-center">
                  <div className="flex items-center gap-3 mb-4">
                    <BadgeTingkat tingkat={item.tingkat} />
                    <span className="text-xs text-charcoal/50 font-medium">Tahun {item.tahun}</span>
                  </div>
                  
                  <h3 className="text-2xl font-heading font-medium text-charcoal mb-3 leading-snug group-hover:text-earth-accent transition-colors">
                    {item.nama_prestasi}
                  </h3>
                  
                  <p className="text-charcoal/70 line-clamp-2 font-light text-sm leading-relaxed">
                    {item.deskripsi || `Penghargaan yang diraih di kategori ${item.kategori.replace('_', ' ')}.`}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 border-y border-slate/10">
            <p className="text-charcoal/50 font-light italic">Belum ada data prestasi yang diterbitkan.</p>
          </div>
        )}
      </div>
    </section>
  );
}
