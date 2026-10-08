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

  useEffect(() => { setOpen(false); }, [pathname]);

  return (
    <header className="fixed top-6 left-0 right-0 z-50 px-4 md:px-10 flex justify-center pointer-events-none">
      <nav 
        className="pointer-events-auto bg-white rounded-[50px] flex items-center justify-between px-3 h-[72px] shadow-sm max-w-[1200px] w-full"
        aria-label="Main Navigation"
      >
        {/* Brand Logo Container */}
        <Link
          href="/"
          className="flex items-center gap-3 group z-50 h-[48px] px-5 rounded-[24px] hover:bg-cream transition-colors"
          aria-label="Kampung Cidamar"
        >
          <div className="w-8 h-8 bg-earth-accent rounded-xl flex items-center justify-center">
             <span className="text-white font-bold text-lg">C</span>
          </div>
          <span className="font-heading font-medium text-[17px] text-charcoal">
            Cidamar.
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-8 px-6">
          {navLinks.map(({ href, label }) => {
            const isActive = pathname === href || (href !== '/' && pathname.startsWith(href));
            return (
              <Link
                key={href}
                href={href}
                className={cn(
                  'text-[15px] font-medium transition-colors relative',
                  isActive ? 'text-charcoal' : 'text-charcoal/60 hover:text-charcoal'
                )}
              >
                {label}
                {isActive && (
                  <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 bg-charcoal rounded-full" />
                )}
              </Link>
            );
          })}
        </div>

        <div className="flex items-center gap-3">
          {/* Mobile Menu Toggle (Green circular button) */}
          <button
            onClick={() => setOpen(!open)}
            className="lg:hidden w-[48px] h-[48px] bg-earth-accent rounded-full flex items-center justify-center text-charcoal hover:bg-[#7bc851] transition-colors"
            aria-expanded={open}
            aria-label="Toggle Navigation"
          >
            {open ? <X strokeWidth={2} className="w-5 h-5 text-charcoal" /> : <Menu strokeWidth={2} className="w-5 h-5 text-charcoal" />}
          </button>
          
          <Link
            href="/kontak"
            className="hidden sm:inline-flex items-center gap-3 bg-white border-2 border-charcoal h-[48px] pl-6 pr-2 rounded-[24px] text-[15px] font-medium text-charcoal hover:bg-cream-alt transition-colors"
          >
            Kontak
            {/* MindMarket-style blue avatar face */}
            <div className="w-[32px] h-[32px] rounded-full bg-sky-pop flex items-end justify-center overflow-hidden border-2 border-charcoal">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="translate-y-1">
                {/* Hair tuft */}
                <path d="M7 6c2-4 8-4 10 0" stroke="#000" strokeWidth="2" strokeLinecap="round" />
                {/* Eyes */}
                <circle cx="9" cy="11" r="1.5" fill="#000" />
                <circle cx="15" cy="11" r="1.5" fill="#000" />
                {/* Mouth */}
                <path d="M10 16c1 1.5 3 1.5 4 0" stroke="#000" strokeWidth="2" strokeLinecap="round" />
                {/* Red tongue */}
                <path d="M11 16.5c.5.5 1.5.5 2 0v1.5c-.5.5-1.5.5-2 0v-1.5z" fill="#ff705d" />
              </svg>
            </div>
          </Link>
        </div>

        {/* Mobile Fullscreen Menu */}
        <div
          className={cn(
            'fixed inset-0 bg-cream z-40 flex flex-col justify-center px-6 transition-all duration-300 ease-in-out',
            open ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-4 pointer-events-none'
          )}
        >
          <div className="flex flex-col gap-6 max-w-sm">
            <Link
              href="/"
              className={cn(
                'text-display text-[53px] font-medium transition-colors',
                pathname === '/' ? 'text-charcoal' : 'text-charcoal/40'
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
                    'text-display text-[53px] font-medium transition-colors',
                    isActive ? 'text-charcoal' : 'text-charcoal/40'
                  )}
                >
                  {label}
                </Link>
              );
            })}
          </div>
        </div>
      </nav>
    </header>
  );
}
