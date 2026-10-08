'use client';

import Link from 'next/link';
import { useRef, useEffect, useState, forwardRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

// ─── Paper-cut Avatar SVG components ────────────────────────────────────────

function AvatarOrangeKid() {
  return (
    <svg viewBox="0 0 120 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      {/* Body */}
      <rect x="25" y="80" width="70" height="90" rx="35" fill="#ff705d" stroke="#2c2e2a" strokeWidth="3"/>
      {/* Head */}
      <circle cx="60" cy="60" r="38" fill="#f9c5a8" stroke="#2c2e2a" strokeWidth="3"/>
      {/* Hair */}
      <path d="M22 55 Q30 10 60 18 Q90 10 98 55" fill="#2c2e2a" stroke="#2c2e2a" strokeWidth="1"/>
      {/* Eyes */}
      <circle cx="46" cy="58" r="5" fill="#2c2e2a"/>
      <circle cx="74" cy="58" r="5" fill="#2c2e2a"/>
      <circle cx="48" cy="56" r="2" fill="white"/>
      <circle cx="76" cy="56" r="2" fill="white"/>
      {/* Big smile */}
      <path d="M44 72 Q60 85 76 72" stroke="#2c2e2a" strokeWidth="3" strokeLinecap="round" fill="none"/>
      {/* Cheeks */}
      <ellipse cx="36" cy="68" rx="8" ry="5" fill="#ff705d" opacity="0.5"/>
      <ellipse cx="84" cy="68" rx="8" ry="5" fill="#ff705d" opacity="0.5"/>
      {/* Arms */}
      <path d="M25 100 Q5 110 8 130" stroke="#f9c5a8" strokeWidth="14" strokeLinecap="round"/>
      <path d="M95 100 Q115 110 112 130" stroke="#f9c5a8" strokeWidth="14" strokeLinecap="round"/>
      {/* Legs */}
      <path d="M40 165 Q35 185 30 195" stroke="#8ed462" strokeWidth="16" strokeLinecap="round"/>
      <path d="M80 165 Q85 185 90 195" stroke="#8ed462" strokeWidth="16" strokeLinecap="round"/>
    </svg>
  );
}

function AvatarBlueDude() {
  return (
    <svg viewBox="0 0 120 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      {/* Body */}
      <rect x="20" y="80" width="80" height="100" rx="40" fill="#2ba0ff" stroke="#2c2e2a" strokeWidth="3"/>
      {/* Head */}
      <circle cx="60" cy="58" r="40" fill="#2c2e2a" stroke="#2c2e2a" strokeWidth="3"/>
      {/* Eyes */}
      <circle cx="46" cy="55" r="6" fill="white"/>
      <circle cx="74" cy="55" r="6" fill="white"/>
      <circle cx="48" cy="57" r="3" fill="#2c2e2a"/>
      <circle cx="76" cy="57" r="3" fill="#2c2e2a"/>
      {/* Smile */}
      <path d="M44 72 Q60 82 76 72" stroke="white" strokeWidth="3" strokeLinecap="round" fill="none"/>
      {/* Hat stripe */}
      <path d="M20 38 Q60 28 100 38" stroke="#f5e211" strokeWidth="6" strokeLinecap="round"/>
      {/* Arms - pointing */}
      <path d="M20 110 Q-10 95 -5 75" stroke="#2c2e2a" strokeWidth="14" strokeLinecap="round"/>
      <path d="M100 110 Q135 85 140 60" stroke="#2c2e2a" strokeWidth="14" strokeLinecap="round"/>
      {/* Hand fist */}
      <circle cx="140" cy="57" r="12" fill="#f9c5a8" stroke="#2c2e2a" strokeWidth="2"/>
      {/* Legs */}
      <path d="M38 175 Q30 190 25 200" stroke="#ff705d" strokeWidth="18" strokeLinecap="round"/>
      <path d="M82 175 Q90 190 95 200" stroke="#ff705d" strokeWidth="18" strokeLinecap="round"/>
    </svg>
  );
}

function AvatarGreenGirl() {
  return (
    <svg viewBox="0 0 120 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      {/* Body */}
      <rect x="15" y="85" width="90" height="95" rx="30" fill="#8ed462" stroke="#2c2e2a" strokeWidth="3"/>
      {/* Flower on body */}
      <circle cx="60" cy="120" r="10" fill="white" stroke="#2c2e2a" strokeWidth="2"/>
      <circle cx="60" cy="120" r="5" fill="#f5e211"/>
      {/* Head */}
      <circle cx="60" cy="58" r="38" fill="#f9c5a8" stroke="#2c2e2a" strokeWidth="3"/>
      {/* Curly hair */}
      <path d="M22 50 Q18 20 40 18 Q60 10 80 18 Q102 20 98 50" fill="#ff705d" stroke="#2c2e2a" strokeWidth="2"/>
      <circle cx="22" cy="50" r="10" fill="#ff705d" stroke="#2c2e2a" strokeWidth="2"/>
      <circle cx="98" cy="50" r="10" fill="#ff705d" stroke="#2c2e2a" strokeWidth="2"/>
      {/* Eyes */}
      <ellipse cx="46" cy="58" rx="6" ry="7" fill="#2c2e2a"/>
      <ellipse cx="74" cy="58" rx="6" ry="7" fill="#2c2e2a"/>
      <circle cx="48" cy="55" r="2" fill="white"/>
      <circle cx="76" cy="55" r="2" fill="white"/>
      {/* Smile */}
      <path d="M46 72 Q60 82 74 72" stroke="#2c2e2a" strokeWidth="3" strokeLinecap="round" fill="none"/>
      {/* Arms waving */}
      <path d="M15 100 Q-5 80 2 60" stroke="#f9c5a8" strokeWidth="14" strokeLinecap="round"/>
      <path d="M105 100 Q125 75 118 55" stroke="#f9c5a8" strokeWidth="14" strokeLinecap="round"/>
      {/* Legs */}
      <path d="M40 175 Q38 192 33 200" stroke="#2ba0ff" strokeWidth="16" strokeLinecap="round"/>
      <path d="M80 175 Q82 192 87 200" stroke="#2ba0ff" strokeWidth="16" strokeLinecap="round"/>
    </svg>
  );
}

function AvatarPurpleKid() {
  return (
    <svg viewBox="0 0 120 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      {/* Body */}
      <rect x="20" y="80" width="80" height="100" rx="35" fill="#c084fc" stroke="#2c2e2a" strokeWidth="3"/>
      {/* Head */}
      <circle cx="60" cy="60" r="38" fill="#f9c5a8" stroke="#2c2e2a" strokeWidth="3"/>
      {/* Short hair */}
      <path d="M25 50 Q28 15 60 20 Q92 15 95 50" fill="#2c2e2a"/>
      {/* Eyes - big surprised */}
      <circle cx="46" cy="60" r="7" fill="white" stroke="#2c2e2a" strokeWidth="2"/>
      <circle cx="74" cy="60" r="7" fill="white" stroke="#2c2e2a" strokeWidth="2"/>
      <circle cx="46" cy="60" r="4" fill="#2c2e2a"/>
      <circle cx="74" cy="60" r="4" fill="#2c2e2a"/>
      {/* O mouth */}
      <ellipse cx="60" cy="74" rx="8" ry="7" fill="#2c2e2a"/>
      <ellipse cx="60" cy="74" rx="5" ry="4" fill="#ff705d"/>
      {/* Cheeks */}
      <ellipse cx="34" cy="68" rx="7" ry="5" fill="#ff705d" opacity="0.4"/>
      <ellipse cx="86" cy="68" rx="7" ry="5" fill="#ff705d" opacity="0.4"/>
      {/* Arms up excited */}
      <path d="M20 100 Q0 70 5 50" stroke="#f9c5a8" strokeWidth="14" strokeLinecap="round"/>
      <path d="M100 100 Q120 70 115 50" stroke="#f9c5a8" strokeWidth="14" strokeLinecap="round"/>
      {/* Legs */}
      <path d="M42 175 Q35 188 28 197" stroke="#f5e211" strokeWidth="16" strokeLinecap="round"/>
      <path d="M78 175 Q85 188 92 197" stroke="#f5e211" strokeWidth="16" strokeLinecap="round"/>
    </svg>
  );
}

const CacingHijau = forwardRef<SVGSVGElement, { className?: string }>(
  function CacingHijau({ className = '' }, ref) {
    return (
      <svg ref={ref} className={className} viewBox="0 0 60 300" fill="none" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="30" cy="30" rx="22" ry="25" fill="#8ed462" stroke="#2c2e2a" strokeWidth="3"/>
        <ellipse cx="30" cy="75" rx="20" ry="23" fill="#8ed462" stroke="#2c2e2a" strokeWidth="3"/>
        <ellipse cx="30" cy="118" rx="19" ry="22" fill="#8ed462" stroke="#2c2e2a" strokeWidth="3"/>
        <ellipse cx="30" cy="160" rx="18" ry="21" fill="#8ed462" stroke="#2c2e2a" strokeWidth="3"/>
        <ellipse cx="30" cy="200" rx="16" ry="19" fill="#8ed462" stroke="#2c2e2a" strokeWidth="3"/>
        <ellipse cx="30" cy="238" rx="14" ry="17" fill="#8ed462" stroke="#2c2e2a" strokeWidth="3"/>
        <ellipse cx="30" cy="272" rx="11" ry="13" fill="#8ed462" stroke="#2c2e2a" strokeWidth="3"/>
        <circle cx="30" cy="292" r="6" fill="#8ed462" stroke="#2c2e2a" strokeWidth="2"/>
        <circle cx="20" cy="22" r="4" fill="#2c2e2a"/>
        <circle cx="40" cy="22" r="4" fill="#2c2e2a"/>
        <circle cx="21" cy="20" r="1.5" fill="white"/>
        <circle cx="41" cy="20" r="1.5" fill="white"/>
        <path d="M22 34 Q30 40 38 34" stroke="#2c2e2a" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
        <path d="M20 8 Q15 0 12 -5" stroke="#2c2e2a" strokeWidth="2" strokeLinecap="round"/>
        <circle cx="12" cy="-5" r="3" fill="#f5e211" stroke="#2c2e2a" strokeWidth="1.5"/>
        <path d="M40 8 Q45 0 48 -5" stroke="#2c2e2a" strokeWidth="2" strokeLinecap="round"/>
        <circle cx="48" cy="-5" r="3" fill="#f5e211" stroke="#2c2e2a" strokeWidth="1.5"/>
      </svg>
    );
  }
);

// ─── Main HeroSection ─────────────────────────────────────────────────────────

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const skyPopRef = useRef<HTMLDivElement>(null);
  const grassRef = useRef<HTMLDivElement>(null);
  const coralRef = useRef<HTMLDivElement>(null);
  const sunshineRef = useRef<HTMLDivElement>(null);
  const cacingRef = useRef<SVGSVGElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const tagRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  // Floating animation state for avatars
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  useGSAP(() => {
    // ── Entrance animations ──────────────────────────────────────
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    tl.from(tagRef.current, { opacity: 0, y: 20, duration: 0.6 })
      .from(headlineRef.current, { opacity: 0, y: 50, duration: 0.8 }, '-=0.3')
      .from(ctaRef.current, { opacity: 0, y: 20, duration: 0.5 }, '-=0.4');

    // ── Decorative shape parallax ─────────────────────────────────
    const mm = gsap.matchMedia();
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.to(skyPopRef.current, {
        yPercent: -45,
        ease: 'none',
        scrollTrigger: { trigger: sectionRef.current, scrub: true, start: 'top top', end: 'bottom top' },
      });
      gsap.to(sunshineRef.current, {
        yPercent: -65,
        rotation: 30,
        ease: 'none',
        scrollTrigger: { trigger: sectionRef.current, scrub: true, start: 'top top', end: 'bottom top' },
      });
      gsap.to(coralRef.current, {
        yPercent: -25,
        rotation: -20,
        ease: 'none',
        scrollTrigger: { trigger: sectionRef.current, scrub: true, start: 'top top', end: 'bottom top' },
      });
      gsap.to(grassRef.current, {
        yPercent: -8,
        ease: 'none',
        scrollTrigger: { trigger: sectionRef.current, scrub: true, start: 'top top', end: 'bottom top' },
      });

      // ── Cacing Hijau scrolls DOWN across the whole page ─────────
      gsap.to(cacingRef.current, {
        y: () => window.innerHeight * 3,
        rotation: 200,
        ease: 'none',
        scrollTrigger: {
          trigger: document.body,
          scrub: 0.8,
          start: 'top top',
          end: 'bottom bottom',
        },
      });
    });
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-[95vh] flex flex-col items-center justify-center bg-cream text-center"
      style={{ paddingTop: '120px', paddingBottom: '100px' }}
      aria-label="Hero Kampung Cidamar"
    >
      {/* ── Yellow circle ── */}
      <div
        ref={sunshineRef}
        className="absolute top-[12%] left-[4%] w-28 h-28 md:w-56 md:h-56 rounded-full bg-[#f5e211] z-0 border-[3px] border-charcoal"
      />

      {/* ── Blue square ── */}
      <div
        ref={skyPopRef}
        className="absolute top-[25%] right-[6%] w-20 h-20 md:w-44 md:h-44 rounded-[32px] bg-[#2ba0ff] rotate-12 z-0 border-[3px] border-charcoal"
      />

      {/* ── Coral rounded rect ── */}
      <div
        ref={coralRef}
        className="absolute bottom-[28%] left-[10%] w-14 h-14 md:w-24 md:h-24 rounded-[20px] bg-[#ff705d] -rotate-12 z-0 border-[3px] border-charcoal"
      />

      {/* ── Cacing Hijau (travels the whole page) ── */}
      <CacingHijau ref={cacingRef} className="absolute top-[10%] right-[18%] w-12 h-auto z-10 drop-shadow-sm" />

      {/* ── Green grass hill with avatars ── */}
      <div
        ref={grassRef}
        className="absolute bottom-[-5%] left-1/2 -translate-x-1/2 w-[130vw] h-56 md:h-72 rounded-t-full bg-[#8ed462] z-0 border-t-[3px] border-charcoal flex items-start justify-center pt-0"
      >
        {/* Avatars sitting on the hill */}
        <div className="flex items-end gap-2 md:gap-6 -translate-y-[60%] px-4">
          <div className={`w-16 h-24 md:w-24 md:h-36 transition-all duration-1000 ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`} style={{ transitionDelay: '200ms' }}>
            <AvatarOrangeKid />
          </div>
          <div className={`w-20 h-28 md:w-28 md:h-40 -translate-y-2 transition-all duration-1000 ${mounted ? 'translate-y-[-8px] opacity-100' : 'translate-y-8 opacity-0'}`} style={{ transitionDelay: '350ms' }}>
            <AvatarGreenGirl />
          </div>
          <div className={`w-20 h-28 md:w-28 md:h-40 -translate-y-4 transition-all duration-1000 ${mounted ? 'translate-y-[-16px] opacity-100' : 'translate-y-8 opacity-0'}`} style={{ transitionDelay: '500ms' }}>
            <AvatarBlueDude />
          </div>
          <div className={`w-16 h-24 md:w-24 md:h-36 transition-all duration-1000 ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`} style={{ transitionDelay: '650ms' }}>
            <AvatarPurpleKid />
          </div>
        </div>
      </div>

      {/* ── Foreground Text Content ── */}
      <div className="container-custom relative z-10 max-w-[1050px] flex flex-col items-center">
        {/* Tag pill */}
        <div ref={tagRef} className="mb-8">
          <span className="bg-white border-[2.5px] border-charcoal px-6 py-2.5 rounded-[50px] text-[16px] font-medium text-charcoal">
            Jawa Barat, Indonesia
          </span>
        </div>

        {/* Main headline */}
        <h1
          ref={headlineRef}
          className="font-medium text-charcoal leading-[0.95] tracking-[-0.04em] mb-10"
          style={{ fontSize: 'clamp(3.5rem, 10vw, 9rem)' }}
        >
          Kampung asri,<br />
          berprestasi &amp;<br />
          berkembang.
        </h1>

        {/* Tagline + CTA */}
        <div ref={ctaRef} className="flex flex-col items-center gap-8">
          <p className="text-charcoal text-[20px] md:text-[22px] max-w-2xl font-normal leading-[1.55]">
            Menyatukan tradisi dan inovasi. Jelajahi cerita, budaya, dan kehidupan nyata warga Cidamar melalui lensa digital kami.
          </p>

          <Link
            href="#sekilas"
            className="inline-flex items-center gap-3 bg-white border-[2.5px] border-charcoal text-charcoal font-medium text-[16px] h-[58px] px-7 rounded-[50px] hover:bg-cream-alt transition-colors group cursor-pointer"
          >
            Jelajahi Sekarang
            <span className="w-9 h-9 rounded-full bg-earth-accent flex items-center justify-center text-charcoal group-hover:bg-charcoal group-hover:text-white transition-colors">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
