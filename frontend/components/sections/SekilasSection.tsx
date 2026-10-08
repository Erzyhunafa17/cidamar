export default function SekilasSection() {
  return (
    <section
      id="sekilas"
      className="py-24 md:py-32 bg-cream text-charcoal border-b border-slate/10"
      aria-label="Profil Kampung Cidamar"
    >
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 items-start">
          
          {/* Section Heading */}
          <div className="md:col-span-5 xl:col-span-4">
            <span className="block text-xs uppercase tracking-widest text-earth-accent font-semibold mb-6">
              Mengenal Kampung Kami
            </span>
            <h2 className="text-4xl md:text-5xl font-heading font-medium leading-tight mb-8">
              Sebuah cerita tentang harmoni.
            </h2>
          </div>

          {/* Editorial Text */}
          <div className="md:col-span-7 xl:col-span-7 xl:col-start-6">
            <div className="prose prose-lg text-charcoal/80 font-light leading-relaxed mb-12">
              <p className="text-xl md:text-2xl text-charcoal leading-snug mb-8">
                Kampung Cidamar hadir sebagai ruang di mana tradisi dijaga dengan penuh hormat dan inovasi diterima dengan tangan terbuka. Di sinilah alam yang asri berpadu dengan semangat kekeluargaan yang tak pernah lekang oleh waktu.
              </p>
              <p className="mb-6">
                Dengan semangat gotong royong yang kuat, warga Cidamar bersama-sama membangun lingkungan yang bersih, sehat, dan produktif. Kami merawat peninggalan budaya, merayakan keberagaman, dan terus mencetak prestasi dari tingkat lokal hingga nasional.
              </p>
              <p>
                Setiap sudut kampung menyimpan kisah, dari rimbunnya pepohonan yang meneduhi jalanan, hingga aktivitas UMKM yang menggerakkan ekonomi warga. Inilah Cidamar—rumah bagi harapan dan masa depan yang terus tumbuh.
              </p>
            </div>

            {/* Subtle List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6 pt-12 border-t border-slate/10">
              {[
                'Lingkungan asri & terjaga',
                'Solidaritas warga yang erat',
                'Ekonomi UMKM yang dinamis',
                'Beragam prestasi membanggakan',
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-4">
                  <span className="text-earth-accent font-heading italic text-lg">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="text-charcoal text-[0.95rem] pt-0.5 font-medium tracking-wide">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
