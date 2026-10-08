'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

const navLinks = [
  { href: '/berita',     label: 'Berita'     },
  { href: '/prestasi',   label: 'Prestasi'   },
  { href: '/agustusan',  label: 'Agustusan'  },
  { href: '/umkm',       label: 'UMKM'       },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => { setOpen(false); }, [pathname]);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
        scrolled
          ? 'bg-cream/95 backdrop-blur-md border-b border-black/5 py-4'
          : 'bg-transparent py-6 md:py-10',
      )}
    >
      <nav className="container-custom" aria-label="Main Navigation">
        <div className="flex items-center justify-between">
          
          {/* Brand Logo */}
          <Link
            href="/"
            className="flex items-baseline gap-1 group z-50 relative"
            aria-label="Kampung Cidamar"
          >
            <span className="font-heading font-semibold text-2xl md:text-3xl text-charcoal tracking-tight">
              Cidamar.
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-10">
            {navLinks.map(({ href, label }) => {
              const isActive = pathname === href || (href !== '/' && pathname.startsWith(href));
              return (
                <Link
                  key={href}
                  href={href}
                  className={cn(
                    'text-[0.9rem] uppercase tracking-widest transition-all duration-300 relative after:content-[\'\'] after:absolute after:-bottom-1.5 after:left-0 after:w-full after:h-[1px] after:bg-charcoal after:transition-transform after:duration-300',
                    isActive
                      ? 'text-charcoal after:scale-x-100 font-medium'
                      : 'text-charcoal/60 hover:text-charcoal after:scale-x-0 hover:after:scale-x-100',
                  )}
                >
                  {label}
                </Link>
              );
            })}
          </div>

          <div className="hidden lg:flex items-center gap-6">
            <Link
              href="/kontak"
              className="text-[0.9rem] uppercase tracking-widest text-charcoal hover:text-earth-accent transition-colors"
            >
              Kontak
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setOpen(!open)}
            className="lg:hidden z-50 w-10 h-10 flex items-center justify-end text-charcoal"
            aria-expanded={open}
            aria-label="Toggle Navigation"
          >
            {open ? <X strokeWidth={1.5} className="w-6 h-6" /> : <Menu strokeWidth={1.5} className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Fullscreen Menu */}
        <div
          className={cn(
            'fixed inset-0 bg-cream z-40 flex flex-col justify-center px-6 transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]',
            open ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'
          )}
        >
          <div className="flex flex-col gap-8 max-w-sm">
            <Link
              href="/"
              className={cn(
                'text-3xl font-heading font-medium transition-colors',
                pathname === '/' ? 'text-charcoal' : 'text-charcoal/60'
              )}
            >
              Beranda
            </Link>
            {navLinks.map(({ href, label }) => {
              const isActive = pathname === href || (href !== '/' && pathname.startsWith(href));
              return (
                <Link
                  key={href}
                  href={href}
                  className={cn(
                    'text-3xl font-heading font-medium transition-colors',
                    isActive ? 'text-charcoal' : 'text-charcoal/60'
                  )}
                >
                  {label}
                </Link>
              );
            })}
            <div className="h-px w-16 bg-charcoal/20 my-2" />
            <Link
              href="/kontak"
              className="text-xl font-heading text-charcoal/60 hover:text-charcoal transition-colors"
            >
              Kontak
            </Link>
            <Link
              href="/admin/dashboard"
              className="text-xl font-heading text-earth-accent hover:text-charcoal transition-colors"
            >
              Login Admin
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}
