import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const links = [
  { href: '/berita',    label: 'Berita & Update' },
  { href: '/prestasi',  label: 'Prestasi'        },
  { href: '/agustusan', label: 'Jurnal Agustusan' },
  { href: '/umkm',      label: 'Direktori UMKM'  },
  { href: '/galeri',    label: 'Galeri Foto'     },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-charcoal text-cream border-t border-slate">
      <div className="container-custom py-20 md:py-32">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8">
          
          {/* Main Brand Section */}
          <div className="md:col-span-5 xl:col-span-6 flex flex-col justify-between">
            <div>
              <Link href="/" className="inline-block mb-8">
                <span className="font-heading font-medium text-3xl md:text-4xl tracking-tight text-cream">
                  Cidamar.
                </span>
              </Link>
              <p className="text-cream/70 text-lg leading-relaxed max-w-sm font-light">
                Menyatukan tradisi dan inovasi. Menyajikan cerita, budaya, dan kehidupan warga Kampung Cidamar.
              </p>
            </div>
            
            <div className="mt-16 hidden md:block">
              <p className="text-cream/50 text-sm">© {year} Kampung Cidamar. Hak cipta dilindungi.</p>
            </div>
          </div>

          {/* Navigation */}
          <div className="md:col-span-4 xl:col-span-3">
            <h4 className="text-xs uppercase tracking-widest text-earth-accent font-semibold mb-8">Jelajahi</h4>
            <ul className="space-y-4">
              {links.map((link) => (
                <li key={link.href}>
                  <Link 
                    href={link.href} 
                    className="group flex items-center gap-2 text-cream/80 hover:text-cream transition-colors text-lg"
                  >
                    <span>{link.label}</span>
                    <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-earth-accent" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Legal */}
          <div className="md:col-span-3 xl:col-span-3">
            <h4 className="text-xs uppercase tracking-widest text-earth-accent font-semibold mb-8">Kontak & Lokasi</h4>
            <address className="not-italic space-y-4 text-cream/80 text-lg font-light leading-relaxed">
              <p>Kampung Cidamar,<br />Jawa Barat, Indonesia</p>
              <p className="pt-4">
                <a href="mailto:info@kampungcidamar.id" className="hover:text-cream transition-colors border-b border-earth-accent/30 hover:border-earth-accent pb-1">
                  info@kampungcidamar.id
                </a>
              </p>
            </address>

            <div className="mt-12 pt-12 border-t border-slate">
              <Link href="/admin/login" className="text-sm text-cream/40 hover:text-earth-accent transition-colors">
                Portal Admin
              </Link>
            </div>
          </div>
        </div>

        {/* Mobile Footer Copy */}
        <div className="mt-16 md:hidden border-t border-slate pt-8">
          <p className="text-cream/50 text-sm">© {year} Kampung Cidamar. Hak cipta dilindungi.</p>
        </div>
      </div>
    </footer>
  );
}
