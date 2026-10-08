'use client';

import Link from 'next/link';
import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const skyPopRef = useRef<HTMLDivElement>(null);
  const grassRef = useRef<HTMLDivElement>(null);
  const coralRef = useRef<HTMLDivElement>(null);
  const sunshineRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Parallax effects
    gsap.to(skyPopRef.current, {
      yPercent: -40,
      ease: 'none',
      scrollTrigger: {
        trigger: sectionRef.current,
        scrub: true,
        start: 'top top',
        end: 'bottom top',
      },
    });

    gsap.to(coralRef.current, {
      yPercent: -20,
      ease: 'none',
      scrollTrigger: {
        trigger: sectionRef.current,
        scrub: true,
        start: 'top top',
        end: 'bottom top',
      },
    });

    gsap.to(sunshineRef.current, {
      yPercent: -60,
      ease: 'none',
      scrollTrigger: {
        trigger: sectionRef.current,
        scrub: true,
        start: 'top top',
        end: 'bottom top',
      },
    });

    gsap.to(grassRef.current, {
      yPercent: -10, // Slowest layer to give depth
      ease: 'none',
      scrollTrigger: {
        trigger: sectionRef.current,
        scrub: true,
        start: 'top top',
        end: 'bottom top',
      },
    });

    // The Green Worm (Cacing Hijau) that scrolls way down across the page
    gsap.to('.cacing-hijau', {
      y: () => (typeof window !== 'undefined' ? window.innerHeight * 2.5 : 2000), 
      rotation: 180,
      ease: 'none',
      scrollTrigger: {
        trigger: typeof document !== 'undefined' ? document.body : sectionRef.current,
        scrub: 1, // Adds a slight smoothing delay to the scrub
        start: 'top top',
        end: 'bottom bottom',
      },
    });
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-[90vh] flex flex-col items-center justify-center bg-cream text-center section-padding"
      aria-label="Hero Kampung Cidamar"
    >
      {/* Decorative Paper-cut Elements (Parallax Layers) */}
      <div 
        ref={sunshineRef} 
        className="absolute top-[10%] left-[5%] w-32 h-32 md:w-64 md:h-64 rounded-full bg-[#f5e211] opacity-90 z-0 border-2 border-charcoal" 
      />
      <div 
        ref={skyPopRef} 
        className="absolute top-[30%] right-[10%] w-24 h-24 md:w-40 md:h-40 rounded-[40px] bg-[#2ba0ff] rotate-12 opacity-90 z-0 border-2 border-charcoal" 
      />
      
      {/* The Scrolling Green Worm */}
      <svg className="cacing-hijau absolute top-[20%] left-[20%] w-16 h-40 z-10" viewBox="0 0 40 120" fill="none">
        <path d="M20 5 Q35 20 20 35 T20 65 T20 95 T20 115" stroke="#8ed462" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round" />
      </svg>

      {/* Another Yellow Worm */}
      <svg className="absolute bottom-[40%] right-[20%] w-12 h-32 z-10 rotate-45" viewBox="0 0 40 120" fill="none">
        <path d="M20 5 Q5 20 20 35 T20 65 T20 95" stroke="#f5e211" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" />
      </svg>

      <div 
        ref={coralRef} 
        className="absolute bottom-[20%] left-[15%] w-16 h-16 md:w-28 md:h-28 rounded-[20px] bg-[#ff705d] -rotate-12 opacity-90 z-0 border-2 border-charcoal" 
      />
      <div 
        ref={grassRef} 
        className="absolute bottom-[-10%] right-[-5%] w-[120vw] h-40 md:h-64 rounded-t-full bg-[#8ed462] z-0 border-t-2 border-charcoal flex justify-center items-end pb-8" 
      >
        {/* Paper-cut Avatars Sitting on the Hill */}
        <div className="flex items-end gap-2 translate-y-4">
          {/* Avatar 1 */}
          <div className="w-20 h-24 bg-coral-pop rounded-t-full border-2 border-charcoal relative">
             <div className="absolute -top-6 left-2 w-16 h-16 rounded-full bg-pure-white border-2 border-charcoal flex items-center justify-center">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                   <circle cx="8" cy="10" r="1.5" fill="#000" />
                   <circle cx="16" cy="10" r="1.5" fill="#000" />
                   <path d="M8 16 Q12 19 16 16" stroke="#000" strokeWidth="2" strokeLinecap="round" />
                </svg>
             </div>
          </div>
          {/* Avatar 2 */}
          <div className="w-24 h-32 bg-sky-pop rounded-t-[40px] border-2 border-charcoal relative -translate-y-4">
             <div className="absolute -top-8 left-4 w-16 h-16 rounded-full bg-[#2c2e2a] border-2 border-charcoal flex items-center justify-center">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                   <circle cx="8" cy="12" r="1.5" fill="#fff" />
                   <circle cx="16" cy="12" r="1.5" fill="#fff" />
                   <path d="M8 16 Q12 19 16 16" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
                </svg>
             </div>
          </div>
        </div>
      </div>

      {/* Foreground Content */}
      <div className="container-custom relative z-10 max-w-[1000px] flex flex-col items-center">
        {/* Location tag */}
        <div className="animate-fade-in-up mb-8">
          <span className="bg-white border-2 border-charcoal px-5 py-2.5 rounded-[50px] text-[15px] font-medium text-charcoal shadow-none">
            Jawa Barat, Indonesia
          </span>
        </div>

        {/* Main headline — oversized, editorial, MindMarket style */}
        <div className="animate-fade-in-up" style={{ animationDelay: '100ms' }}>
          <h1 className="text-display text-charcoal">
            Kampung asri, <br />
            berprestasi & <br />
            berkembang.
          </h1>
        </div>

        {/* Bottom row: tagline + CTA */}
        <div
          className="mt-12 flex flex-col items-center gap-8 animate-fade-in-up"
          style={{ animationDelay: '200ms' }}
        >
          <p className="text-charcoal text-[20px] max-w-2xl font-normal leading-[1.5]">
            Menyatukan tradisi dan inovasi. Jelajahi cerita, budaya, dan kehidupan nyata warga Cidamar melalui lensa digital kami.
          </p>
          
          <Link
            href="#sekilas"
            className="inline-flex items-center gap-3 bg-white border-2 border-charcoal text-charcoal font-medium text-[15px] h-[56px] px-6 rounded-[50px] hover:bg-cream-alt transition-colors group"
          >
            Jelajahi Sekarang
            <span className="w-8 h-8 rounded-full bg-earth-accent flex items-center justify-center text-charcoal group-hover:bg-charcoal group-hover:text-white transition-colors">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
