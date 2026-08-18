import { CheckCircle } from 'lucide-react';

const KEUNGGULAN = [
  'Lingkungan asri dengan penghijauan aktif',
  'Warga aktif bergotong royong',
  'Banyak UMKM lokal yang berkembang',
  'Prestasi di berbagai bidang dari tingkat RT hingga nasional',
  'Program posyandu dan kesehatan berjalan rutin',
];

export default function SekilasSection() {
  return (
    <section
      id="sekilas"
      className="section-padding bg-cream-bg"
      aria-label="Sekilas Kampung Cidamar"
    >
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* Teks Kiri */}
          <div>
            <span className="inline-block text-amber-accent font-semibold text-sm uppercase tracking-widest mb-3">
              Mengenal Kampung Kami
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-green-primary mb-6 leading-tight">
              Sekilas Tentang<br />
              <span className="text-amber-accent">Kampung Cidamar</span>
            </h2>
            <p className="text-brown-dark text-lg leading-relaxed mb-6">
              Kampung Cidamar adalah kampung yang terletak di wilayah Jawa Barat dengan suasana alam yang asri dan warga yang ramah. Kampung ini terus berkembang dengan berbagai program pemberdayaan masyarakat dan pencapaian prestasi di berbagai bidang.
            </p>
            <p className="text-brown-medium leading-relaxed mb-8">
              Dengan semangat gotong royong yang kuat, warga Cidamar bersama-sama membangun lingkungan yang bersih, sehat, dan produktif. Berbagai kegiatan rutin seperti posyandu, kerja bakti, dan pelatihan UMKM menjadi bagian dari kehidupan sehari-hari.
            </p>

            {/* Keunggulan */}
            <ul className="space-y-3">
              {KEUNGGULAN.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-secondary shrink-0 mt-0.5" />
                  <span className="text-brown-dark">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Visual Kanan */}
          <div className="relative">
            {/* Main card */}
            <div className="rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-br from-green-primary to-green-secondary aspect-[4/3] flex items-center justify-center relative">
              <div className="absolute inset-0 opacity-20"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='1' fill-rule='evenodd'%3E%3Ccircle cx='3' cy='3' r='3'/%3E%3Ccircle cx='13' cy='13' r='3'/%3E%3C/g%3E%3C/svg%3E")`,
                }}
              />
              <div className="relative text-center text-white p-8">
                <div className="text-7xl mb-4">🌿</div>
                <p className="text-xl font-heading font-bold">Kampung Cidamar</p>
                <p className="text-green-light text-sm mt-1">Asri · Berprestasi · Bersatu</p>
              </div>
            </div>

            {/* Floating badges */}
            <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl shadow-xl p-4 flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-amber-light flex items-center justify-center text-2xl">🏆</div>
              <div>
                <div className="font-heading font-bold text-green-primary text-lg">20+</div>
                <div className="text-xs text-brown-medium">Penghargaan</div>
              </div>
            </div>

            <div className="absolute -top-4 -right-4 bg-white rounded-2xl shadow-xl p-4 flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-green-pale flex items-center justify-center text-2xl">🏘️</div>
              <div>
                <div className="font-heading font-bold text-green-primary text-lg">150+</div>
                <div className="text-xs text-brown-medium">Kepala Keluarga</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
