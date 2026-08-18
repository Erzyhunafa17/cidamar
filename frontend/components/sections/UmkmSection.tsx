import Link from 'next/link';
import { ArrowRight, Phone, Store } from 'lucide-react';

const UMKM_DUMMY = [
  { nama: 'Warung Bu Sari',     jenis: 'Kuliner',    emoji: '🍽️', kontak: '0812-xxxx-1234' },
  { nama: 'Kerajinan Bambu Pak Amin', jenis: 'Kerajinan', emoji: '🎋', kontak: '0813-xxxx-5678' },
  { nama: 'Toko Sembako Maju',  jenis: 'Perdagangan',emoji: '🏪', kontak: '0856-xxxx-9012' },
  { nama: 'Jasa Jahit Bu Rini', jenis: 'Jasa',       emoji: '🧵', kontak: '0821-xxxx-3456' },
];

const KONTAK_PENTING = [
  { nama: 'Bidan Desa',      nomor: '0812-xxxx-0001', icon: '👩‍⚕️' },
  { nama: 'Ketua RT 01',     nomor: '0812-xxxx-0002', icon: '👨‍💼' },
  { nama: 'Damkar Terdekat', nomor: '113',             icon: '🚒'  },
  { nama: 'Puskesmas',       nomor: '0812-xxxx-0003', icon: '🏥'  },
];

export default function UmkmSection() {
  return (
    <section
      id="umkm"
      className="section-padding bg-white"
      aria-label="Direktori UMKM dan Kontak Penting"
    >
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-12">

          {/* UMKM */}
          <div className="lg:col-span-2">
            <div className="flex items-end justify-between mb-8">
              <div>
                <span className="inline-block text-amber-accent font-semibold text-sm uppercase tracking-widest mb-2">
                  Potensi Lokal
                </span>
                <h2 className="text-3xl font-extrabold text-green-primary">
                  Direktori UMKM
                </h2>
              </div>
              <Link
                href="/umkm"
                className="inline-flex items-center gap-1.5 text-green-secondary font-semibold text-sm hover:text-green-primary transition-colors"
              >
                Semua UMKM <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {UMKM_DUMMY.map((umkm) => (
                <div
                  key={umkm.nama}
                  className="flex items-center gap-4 p-4 rounded-2xl bg-cream-bg border border-gray-100 hover:border-green-light hover:shadow-sm transition-all"
                >
                  <div className="w-14 h-14 rounded-xl bg-green-pale flex items-center justify-center text-3xl shrink-0">
                    {umkm.emoji}
                  </div>
                  <div className="min-w-0">
                    <div className="font-semibold text-green-primary text-sm truncate">{umkm.nama}</div>
                    <div className="text-xs text-brown-medium mb-1">{umkm.jenis}</div>
                    <a
                      href={`tel:${umkm.kontak}`}
                      className="inline-flex items-center gap-1 text-xs text-green-secondary hover:text-green-primary"
                    >
                      <Phone className="w-3 h-3" />
                      {umkm.kontak}
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Kontak Penting */}
          <div>
            <div className="mb-8">
              <span className="inline-block text-amber-accent font-semibold text-sm uppercase tracking-widest mb-2">
                Darurat & Penting
              </span>
              <h2 className="text-3xl font-extrabold text-green-primary">
                Kontak Penting
              </h2>
            </div>

            <div className="space-y-3">
              {KONTAK_PENTING.map((k) => (
                <div
                  key={k.nama}
                  className="flex items-center gap-3 p-4 rounded-2xl bg-green-pale border border-green-light/50"
                >
                  <span className="text-2xl">{k.icon}</span>
                  <div className="min-w-0 flex-1">
                    <div className="font-semibold text-green-primary text-sm">{k.nama}</div>
                    <a
                      href={`tel:${k.nomor}`}
                      className="text-green-secondary font-bold text-lg hover:text-green-primary transition-colors"
                    >
                      {k.nomor}
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
