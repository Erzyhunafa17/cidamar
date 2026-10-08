'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import Button from '@/components/ui/Button';

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="relative min-h-[90vh] flex items-center bg-cream pt-24 overflow-hidden"
      aria-label="Hero Kampung Cidamar"
    >
      <div className="container-custom relative z-10 grid lg:grid-cols-12 gap-12 lg:gap-8 items-center h-full">
        {/* Typographical Content (Asymmetric Left) */}
        <div className="lg:col-span-7 xl:col-span-8 flex flex-col justify-center h-full animate-fade-in-up">
          <p className="text-earth-accent uppercase tracking-widest text-sm font-medium mb-6 md:mb-8">
            Jawa Barat, Indonesia
          </p>
          
          <h1 className="font-heading text-5xl sm:text-6xl md:text-7xl xl:text-[5.5rem] font-medium leading-[1.1] text-charcoal mb-8">
            Kampung yang asri, berprestasi, dan berkembang bersama.
          </h1>

          <div className="max-w-2xl flex flex-col sm:flex-row gap-6 sm:gap-12 mt-4">
            <p className="text-lg md:text-xl text-slate/80 leading-relaxed font-light">
              Menyatukan tradisi dan inovasi di Cidamar. Temukan budaya lokal, cerita warga, dan pesona alam yang kami rawat dengan bangga.
            </p>
            <div className="shrink-0">
              <Link href="/sekilas">
                <Button size="lg" variant="outline" className="rounded-full !px-8 border-charcoal/20">
                  Jelajahi
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Minimalist Visual Component (Right) */}
        <div className="lg:col-span-5 xl:col-span-4 relative h-full min-h-[400px] hidden lg:block animate-fade-in-up" style={{ animationDelay: '200ms' }}>
          <div className="absolute inset-0 bg-muted-green-light rounded-sm overflow-hidden flex items-end p-8">
            <div className="text-charcoal/60">
              <span className="block font-heading text-4xl mb-2">01</span>
              <span className="uppercase tracking-widest text-xs font-medium">Est. 1950 — Cidamar</span>
            </div>
          </div>
          {/* Subtle Decorative Element */}
          <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-earth-accent/10 rounded-full blur-2xl" />
        </div>
      </div>
    </section>
  );
}
