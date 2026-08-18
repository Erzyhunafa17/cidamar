'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Menu, X, Leaf, LogIn } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

const navLinks = [
  { href: '/',           label: 'Beranda'    },
  { href: '/berita',     label: 'Berita'     },
  { href: '/prestasi',   label: 'Prestasi'   },
  { href: '/agustusan',  label: 'Agustusan'  },
  { href: '/umkm',       label: 'UMKM'       },
  { href: '/kontak',     label: 'Kontak'     },
];

export default function Navbar() {
  const pathname    = usePathname();
  const [open,    setOpen]    = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // tutup menu saat navigasi
  useEffect(() => { setOpen(false); }, [pathname]);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-md border-b border-gray-100'
          : 'bg-transparent',
      )}
    >
      <nav className="container-custom" aria-label="Navigasi Utama">
        <div className="flex items-center justify-between h-16 md:h-20">

          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2.5 group"
            aria-label="Kampung Cidamar — Beranda"
          >
            <div className="w-9 h-9 rounded-xl bg-green-secondary flex items-center justify-center shadow-sm group-hover:bg-green-primary transition-colors">
              <Leaf className="w-5 h-5 text-white" />
            </div>
            <div className="leading-tight">
              <span className="font-heading font-800 text-green-primary text-base block leading-none">
                Kampung
              </span>
              <span className="font-heading font-800 text-amber-accent text-base block leading-none">
                Cidamar
              </span>
            </div>
          </Link>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map(({ href, label }) => {
              const isActive = pathname === href || (href !== '/' && pathname.startsWith(href));
              return (
                <Link
                  key={href}
                  href={href}
                  className={cn(
                    'px-3 py-2 rounded-lg text-sm font-semibold transition-all duration-200',
                    isActive
                      ? 'text-green-secondary bg-green-pale'
                      : 'text-brown-dark hover:text-green-secondary hover:bg-green-pale',
                  )}
                >
                  {label}
                </Link>
              );
            })}
            
            {/* Dropdown Publikasi */}
            <div className="relative group">
              <button
                className={cn(
                  'px-3 py-2 rounded-lg text-sm font-semibold transition-all duration-200 flex items-center gap-1',
                  pathname.startsWith('/galeri') || pathname.startsWith('/arsip')
                    ? 'text-green-secondary bg-green-pale'
                    : 'text-brown-dark hover:text-green-secondary hover:bg-green-pale'
                )}
              >
                Publikasi
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              <div className="absolute top-full right-0 mt-1 w-48 bg-white border border-gray-100 shadow-xl rounded-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 overflow-hidden">
                <Link href="/galeri" className="block px-4 py-3 text-sm font-medium text-gray-700 hover:bg-green-50 hover:text-green-secondary">
                  Galeri Foto
                </Link>
                <Link href="/arsip" className="block px-4 py-3 text-sm font-medium text-gray-700 hover:bg-green-50 hover:text-green-secondary">
                  Arsip & Dokumen
                </Link>
              </div>
            </div>
          </div>

          {/* CTA + Hamburger */}
          <div className="flex items-center gap-3">
            <Link
              href="/admin/dashboard"
              className="hidden md:inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-green-secondary text-white text-sm font-semibold hover:bg-green-primary transition-colors shadow-sm"
            >
              <LogIn className="w-4 h-4" />
              Admin
            </Link>

            {/* Hamburger Mobile */}
            <button
              onClick={() => setOpen(!open)}
              className="lg:hidden w-11 h-11 flex items-center justify-center rounded-xl bg-green-pale text-green-primary hover:bg-green-light transition-colors"
              aria-expanded={open}
              aria-label="Buka menu navigasi"
            >
              {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Drawer */}
        <div
          className={cn(
            'lg:hidden overflow-hidden transition-all duration-300 ease-in-out',
            open ? 'max-h-screen opacity-100 pb-6' : 'max-h-0 opacity-0',
          )}
        >
          <div className="flex flex-col gap-1 pt-2 border-t border-gray-100">
            {navLinks.map(({ href, label }) => {
              const isActive = pathname === href || (href !== '/' && pathname.startsWith(href));
              return (
                <Link
                  key={href}
                  href={href}
                  className={cn(
                    'px-4 py-3 rounded-xl text-base font-semibold transition-colors',
                    isActive
                      ? 'text-green-secondary bg-green-pale'
                      : 'text-brown-dark hover:text-green-secondary hover:bg-green-pale',
                  )}
                >
                  {label}
                </Link>
              );
            })}
            
            {/* Publikasi Mobile */}
            <div className="pt-2 pb-1 border-t border-gray-50 mt-2">
              <span className="px-4 text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 block">
                Publikasi
              </span>
              <Link
                href="/galeri"
                className={cn(
                  'px-4 py-3 rounded-xl text-base font-semibold transition-colors block',
                  pathname.startsWith('/galeri')
                    ? 'text-green-secondary bg-green-pale'
                    : 'text-brown-dark hover:text-green-secondary hover:bg-green-pale'
                )}
              >
                Galeri Foto
              </Link>
              <Link
                href="/arsip"
                className={cn(
                  'px-4 py-3 rounded-xl text-base font-semibold transition-colors block',
                  pathname.startsWith('/arsip')
                    ? 'text-green-secondary bg-green-pale'
                    : 'text-brown-dark hover:text-green-secondary hover:bg-green-pale'
                )}
              >
                Arsip & Dokumen
              </Link>
            </div>
            <Link
              href="/admin/dashboard"
              className="mt-2 flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-green-secondary text-white font-semibold hover:bg-green-primary transition-colors"
            >
              <LogIn className="w-4 h-4" />
              Masuk sebagai Admin
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}
