import Link from 'next/link';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#f5e211] text-charcoal pt-24 pb-12 px-6 sm:px-10 lg:px-16 mt-20 rounded-t-[50px]">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-12">
          
          {/* Brand & Tagline */}
          <div className="flex flex-col gap-6 max-w-md">
            <h2 className="text-display text-[53px] leading-[1.1] font-medium tracking-tight">
              Cidamar.<br/>Desa Nyata.
            </h2>
            <p className="text-[18px] font-normal leading-relaxed opacity-90">
              Menyatukan tradisi dan inovasi. Jelajahi cerita, budaya, dan kehidupan nyata warga Cidamar melalui lensa digital kami.
            </p>
          </div>

          {/* Links & Contact */}
          <div className="flex flex-col md:text-right gap-4">
            <nav className="flex flex-col sm:flex-row gap-4 sm:gap-8 text-[17px] font-medium">
              <Link href="/berita" className="hover:opacity-70 transition-opacity">Berita</Link>
              <Link href="/prestasi" className="hover:opacity-70 transition-opacity">Prestasi</Link>
              <Link href="/agustusan" className="hover:opacity-70 transition-opacity">Agustusan</Link>
              <Link href="/umkm" className="hover:opacity-70 transition-opacity">UMKM</Link>
              <Link href="/kontak" className="hover:opacity-70 transition-opacity">Kontak</Link>
            </nav>
            <div className="mt-4 pt-4 border-t border-charcoal/20 flex flex-col sm:flex-row justify-between md:justify-end gap-4 sm:gap-10 text-[15px] opacity-75">
              <span>© {year} Kampung Cidamar.</span>
              <Link href="/admin/login" className="hover:opacity-100 transition-opacity">Login Admin</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
