import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const UMKM_DUMMY = [
  { nama: 'Warung Bu Sari',     jenis: 'Kuliner',    kontak: '0812-xxxx-1234' },
  { nama: 'Kerajinan Bambu Pak Amin', jenis: 'Kriya', kontak: '0813-xxxx-5678' },
  { nama: 'Toko Sembako Maju',  jenis: 'Dagang',kontak: '0856-xxxx-9012' },
  { nama: 'Jasa Jahit Bu Rini', jenis: 'Jasa',       kontak: '0821-xxxx-3456' },
];

const KONTAK_PENTING = [
  { nama: 'Bidan Desa',      nomor: '0812-xxxx-0001' },
  { nama: 'Ketua RT 01',     nomor: '0812-xxxx-0002' },
  { nama: 'Damkar Terdekat', nomor: '113' },
  { nama: 'Puskesmas',       nomor: '0812-xxxx-0003' },
];

export default function UmkmSection() {
  return (
    <section
      id="umkm"
      className="py-24 md:py-32 bg-cream-alt text-charcoal border-t border-slate/10"
      aria-label="Direktori UMKM dan Kontak Penting"
    >
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8">

          {/* UMKM Directory */}
          <div className="lg:col-span-7 xl:col-span-6">
            <div className="flex flex-col mb-12">
              <span className="block text-xs uppercase tracking-widest text-earth-accent font-semibold mb-4">
                Potensi Lokal
              </span>
              <div className="flex items-end justify-between border-b border-slate/10 pb-6">
                <h2 className="text-3xl md:text-4xl font-heading font-medium">
                  Direktori UMKM
                </h2>
                <Link
                  href="/umkm"
                  className="group flex items-center gap-2 text-charcoal text-sm hover:text-earth-accent transition-colors"
                >
                  <span className="hidden sm:inline">Selengkapnya</span>
                  <ArrowRight className="w-4 h-4 opacity-70 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                </Link>
              </div>
            </div>

            <div className="flex flex-col border-b border-slate/10">
              {UMKM_DUMMY.map((umkm) => (
                <div
                  key={umkm.nama}
                  className="flex items-center justify-between py-6 border-t border-slate/10 group"
                >
                  <div className="flex flex-col">
                    <span className="text-xs uppercase tracking-widest text-charcoal/50 mb-1">{umkm.jenis}</span>
                    <span className="font-heading text-xl md:text-2xl font-medium group-hover:text-earth-accent transition-colors">{umkm.nama}</span>
                  </div>
                  <div className="text-right">
                    <a href={`tel:${umkm.kontak}`} className="text-sm font-medium hover:text-earth-accent transition-colors">
                      {umkm.kontak}
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Emergency Contacts */}
          <div className="lg:col-span-4 xl:col-span-4 xl:col-start-9">
            <div className="flex flex-col mb-12">
              <span className="block text-xs uppercase tracking-widest text-earth-accent font-semibold mb-4">
                Darurat & Penting
              </span>
              <div className="border-b border-slate/10 pb-6">
                <h2 className="text-3xl md:text-4xl font-heading font-medium">
                  Layanan Darurat
                </h2>
              </div>
            </div>

            <div className="flex flex-col">
              {KONTAK_PENTING.map((k) => (
                <div
                  key={k.nama}
                  className="flex flex-col sm:flex-row sm:items-center justify-between py-5 border-b border-slate/10"
                >
                  <span className="font-medium text-lg mb-1 sm:mb-0">{k.nama}</span>
                  <a href={`tel:${k.nomor}`} className="text-earth-accent hover:text-charcoal transition-colors font-semibold">
                    {k.nomor}
                  </a>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
