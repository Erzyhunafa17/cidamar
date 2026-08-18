import { Users, Home, Trophy, Store } from 'lucide-react';

// Data ini akan diganti dengan fetch dari backend di Fase 2
const STATISTIK_DUMMY = [
  { icon: Home,   label: 'Jumlah KK',       nilai: 150,  satuan: 'KK',           warna: 'text-green-secondary' },
  { icon: Users,  label: 'Jumlah RT',        nilai: 5,    satuan: 'RT',           warna: 'text-amber-accent'    },
  { icon: Trophy, label: 'Total Prestasi',   nilai: 20,   satuan: 'penghargaan',  warna: 'text-green-primary'   },
  { icon: Store,  label: 'UMKM Aktif',       nilai: 15,   satuan: 'usaha',        warna: 'text-brown-medium'    },
];

export default function StatistikSection() {
  return (
    <section
      id="statistik"
      className="py-16 bg-white border-b border-gray-100"
      aria-label="Statistik Kampung Cidamar"
    >
      <div className="container-custom">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {STATISTIK_DUMMY.map(({ icon: Icon, label, nilai, satuan, warna }, i) => (
            <div
              key={label}
              className="flex flex-col items-center text-center p-6 rounded-2xl bg-gradient-to-b from-green-pale/50 to-cream-bg border border-green-pale hover:shadow-md transition-shadow group"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <div className="w-14 h-14 rounded-2xl bg-green-pale flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Icon className={`w-7 h-7 ${warna}`} />
              </div>
              <div className={`text-3xl lg:text-4xl font-extrabold font-heading ${warna} mb-1`}>
                {nilai.toLocaleString('id-ID')}
              </div>
              <div className="text-xs text-brown-medium font-medium uppercase tracking-wide mb-1">
                {satuan}
              </div>
              <div className="text-sm text-brown-dark font-semibold">
                {label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
