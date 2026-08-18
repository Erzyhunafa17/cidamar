import Link from 'next/link';
import { Leaf, MapPin, Phone, Mail, Heart } from 'lucide-react';

const navLinks = [
  { href: '/',          label: 'Beranda'   },
  { href: '/berita',    label: 'Berita'    },
  { href: '/prestasi',  label: 'Prestasi'  },
  { href: '/agustusan', label: 'Agustusan' },
];

const otherLinks = [
  { href: '/umkm',    label: 'Direktori UMKM' },
  { href: '/galeri',  label: 'Galeri Foto'    },
  { href: '/kontak',  label: 'Kontak'         },
  { href: '/admin/login', label: 'Login Admin'   },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-green-primary text-white">
      <div className="container-custom py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center">
                <Leaf className="w-5 h-5 text-white" />
              </div>
              <div className="leading-tight">
                <span className="font-heading font-extrabold text-white text-lg block leading-none">Kampung</span>
                <span className="font-heading font-extrabold text-amber-accent text-lg block leading-none">Cidamar</span>
              </div>
            </div>
            <p className="text-green-light text-sm leading-relaxed max-w-xs">
              Website resmi Kampung Cidamar — menyajikan informasi, berita, dan kegiatan warga secara digital.
            </p>
          </div>

          {/* Nav Utama */}
          <div>
            <h3 className="font-heading font-semibold text-white mb-4 text-base">Menu Utama</h3>
            <ul className="space-y-2.5">
              {navLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-green-light hover:text-white text-sm transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Nav Lainnya */}
          <div>
            <h3 className="font-heading font-semibold text-white mb-4 text-base">Lainnya</h3>
            <ul className="space-y-2.5">
              {otherLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-green-light hover:text-white text-sm transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Kontak */}
          <div>
            <h3 className="font-heading font-semibold text-white mb-4 text-base">Kontak</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2.5 text-green-light text-sm">
                <MapPin className="w-4 h-4 mt-0.5 shrink-0 text-amber-accent" />
                <span>Kampung Cidamar, Kecamatan [Kecamatan], Kabupaten [Kabupaten], Jawa Barat</span>
              </li>
              <li className="flex items-center gap-2.5 text-green-light text-sm">
                <Phone className="w-4 h-4 shrink-0 text-amber-accent" />
                <span>+62 xxx-xxxx-xxxx</span>
              </li>
              <li className="flex items-center gap-2.5 text-green-light text-sm">
                <Mail className="w-4 h-4 shrink-0 text-amber-accent" />
                <span>info@kampungcidamar.id</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-green-secondary/50 py-5">
        <div className="container-custom flex flex-col sm:flex-row items-center justify-between gap-2 text-sm text-green-light">
          <p>© {year} Kampung Cidamar. Hak cipta dilindungi.</p>
          <p className="flex items-center gap-1">
            Dibuat dengan <Heart className="w-4 h-4 text-red-400 fill-red-400" /> untuk warga Cidamar
          </p>
        </div>
      </div>
    </footer>
  );
}
