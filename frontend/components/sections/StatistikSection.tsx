'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

const STATISTIK = [
  { label: 'Kepala Keluarga', nilai: 150, satuan: 'KK' },
  { label: 'Rukun Tetangga',  nilai: 5,   satuan: 'RT' },
  { label: 'Penghargaan',     nilai: 20,  satuan: 'Total' },
  { label: 'Usaha Lokal',     nilai: 15,  satuan: 'UMKM' },
];

function CountUp({ target, duration = 1.5 }: { target: number; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const obj = { val: 0 };
      gsap.to(obj, {
        val: target,
        duration,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 85%',
          once: true,
        },
        onUpdate: () => {
          if (ref.current) ref.current.textContent = Math.round(obj.val).toLocaleString('id-ID');
        },
      });
    });
    mm.add('(prefers-reduced-motion: reduce)', () => {
      if (ref.current) ref.current.textContent = target.toLocaleString('id-ID');
    });
  }, { scope: ref });

  return <span ref={ref}>0</span>;
}

export default function StatistikSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.from('.stat-item', {
        opacity: 0,
        y: 30,
        duration: 0.6,
        stagger: 0.12,
        ease: 'power2.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 85%' },
      });
    });
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      id="statistik"
      className="py-24 bg-white border-y-[2px] border-charcoal/10"
      aria-label="Statistik Kampung Cidamar"
    >
      <div className="container-custom">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-14">
          {STATISTIK.map(({ label, nilai, satuan }) => (
            <div
              key={label}
              className="stat-item flex flex-col border-l-[3px] border-charcoal pl-6 lg:pl-8"
            >
              <div className="text-[56px] lg:text-[72px] font-medium text-charcoal mb-1 leading-none tracking-tight">
                <CountUp target={nilai} />
              </div>
              <div className="text-[15px] uppercase tracking-widest text-earth-accent font-semibold mb-1">
                {satuan}
              </div>
              <div className="text-[18px] text-charcoal/70">
                {label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
