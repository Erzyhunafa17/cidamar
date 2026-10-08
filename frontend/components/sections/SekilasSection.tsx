'use client';

import ScrollReveal from '@/components/ui/ScrollReveal';

const highlights = [
  { num: '01', text: 'Lingkungan asri & terjaga' },
  { num: '02', text: 'Solidaritas warga yang erat' },
  { num: '03', text: 'Ekonomi UMKM yang dinamis' },
  { num: '04', text: 'Beragam prestasi membanggakan' },
];

export default function SekilasSection() {
  return (
    <section
      id="sekilas"
      className="py-28 md:py-40 bg-cream text-charcoal"
      aria-label="Profil Kampung Cidamar"
    >
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 items-start">

          {/* Section Heading */}
          <div className="md:col-span-5 xl:col-span-4 md:sticky md:top-32">
            <ScrollReveal direction="left">
              <span className="block text-[18px] uppercase tracking-widest text-earth-accent font-semibold mb-6">
                Mengenal Kampung Kami
              </span>
              <h2 className="text-[53px] md:text-[72px] leading-[1.05] font-medium tracking-tight mb-8">
                Sebuah cerita tentang harmoni.
              </h2>
              {/* Green squiggle decoration */}
              <svg width="80" height="24" viewBox="0 0 80 24" fill="none">
                <path d="M2 12 Q10 4 20 12 T40 12 T60 12 T78 12" stroke="#8ed462" strokeWidth="4" strokeLinecap="round" fill="none"/>
              </svg>
            </ScrollReveal>
          </div>

          {/* Editorial Text */}
          <div className="md:col-span-7 xl:col-span-7 xl:col-start-6">
            <ScrollReveal direction="up" delay={0.1}>
              <p className="text-[24px] md:text-[28px] text-charcoal leading-[1.4] font-medium mb-10">
                Kampung Cidamar hadir sebagai ruang di mana tradisi dijaga dengan penuh hormat dan inovasi diterima dengan tangan terbuka.
              </p>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.2}>
              <p className="text-[18px] text-charcoal/80 leading-relaxed mb-6">
                Dengan semangat gotong royong yang kuat, warga Cidamar bersama-sama membangun lingkungan yang bersih, sehat, dan produktif. Kami merawat peninggalan budaya, merayakan keberagaman, dan terus mencetak prestasi dari tingkat lokal hingga nasional.
              </p>
              <p className="text-[18px] text-charcoal/80 leading-relaxed mb-14">
                Setiap sudut kampung menyimpan kisah, dari rimbunnya pepohonan yang meneduhi jalanan, hingga aktivitas UMKM yang menggerakkan ekonomi warga. Inilah Cidamar—rumah bagi harapan dan masa depan yang terus tumbuh.
              </p>
            </ScrollReveal>

            {/* Highlights grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6 pt-12 border-t-[2px] border-charcoal/10">
              {highlights.map((item, i) => (
                <ScrollReveal key={i} direction="up" delay={i * 0.1}>
                  <div className="flex items-start gap-5 group">
                    <span className="text-[32px] font-medium text-earth-accent leading-none">
                      {item.num}
                    </span>
                    <span className="text-charcoal text-[18px] pt-1.5 font-medium leading-tight">
                      {item.text}
                    </span>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
