'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col bg-cream overflow-hidden"
      aria-label="Hero Kampung Cidamar"
    >
      {/* ── Full-screen grid: text left, image right ── */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 min-h-screen">

        {/* ── Left: editorial text column ── */}
        <div className="relative z-10 flex flex-col justify-between pt-32 pb-12 px-6 sm:px-10 lg:px-16 xl:px-20">
          {/* Location tag */}
          <div className="animate-fade-in-up">
            <p className="text-[0.75rem] uppercase tracking-[0.2em] text-charcoal/50 font-medium">
              Jawa Barat, Indonesia
            </p>
          </div>

          {/* Main headline — oversized, editorial */}
          <div className="mt-auto mb-8 animate-fade-in-up" style={{ animationDelay: '100ms' }}>
            <h1
              className="font-heading font-medium leading-[1.05] text-charcoal"
              style={{ fontSize: 'clamp(3rem, 7vw, 6.5rem)' }}
            >
              Kampung<br />
              yang asri,<br />
              <span className="italic text-earth-accent">berprestasi,</span><br />
              dan berkembang<br />
              bersama.
            </h1>
          </div>

          {/* Bottom row: tagline + CTA */}
          <div
            className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-8 pt-8 border-t border-charcoal/10 animate-fade-in-up"
            style={{ animationDelay: '200ms' }}
          >
            <p className="text-charcoal/60 text-base leading-relaxed max-w-xs font-light">
              Menyatukan tradisi dan inovasi. Cerita, budaya, dan kehidupan warga Cidamar.
            </p>
            <Link
              href="#sekilas"
              className="group shrink-0 inline-flex items-center gap-3 text-sm uppercase tracking-[0.15em] font-semibold text-charcoal border-b border-charcoal pb-1 hover:text-earth-accent hover:border-earth-accent transition-colors duration-300"
            >
              Jelajahi
              <svg
                width="16" height="16" viewBox="0 0 16 16" fill="none"
                className="group-hover:translate-x-1 transition-transform duration-300"
                aria-hidden="true"
              >
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </div>
        </div>

        {/* ── Right: full-bleed photograph ── */}
        <div className="relative min-h-[50vw] lg:min-h-0 overflow-hidden">
          <Image
            src="/hero-cidamar.jpg"
            alt="Pemandangan Kampung Cidamar — hamparan sawah, rumah tradisional, dan pegunungan"
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover object-center"
          />
          {/* Subtle gradient overlay at the left edge for blending */}
          <div
            className="absolute inset-0 bg-gradient-to-r from-cream/60 via-transparent to-transparent lg:from-cream/30 pointer-events-none"
            aria-hidden="true"
          />
          {/* Floating label */}
          <div className="absolute bottom-8 left-8 right-8">
            <span className="inline-block bg-charcoal/80 backdrop-blur-sm text-cream text-[0.7rem] uppercase tracking-widest px-3 py-1.5 font-semibold">
              Est. 1950 — Cidamar, Jawa Barat
            </span>
          </div>
        </div>
      </div>

      {/* ── Scroll indicator ── */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 lg:hidden flex flex-col items-center gap-2 animate-bounce" aria-hidden="true">
        <span className="text-[0.65rem] uppercase tracking-widest text-charcoal/40">Scroll</span>
        <div className="w-px h-8 bg-charcoal/20" />
      </div>
    </section>
  );
}
