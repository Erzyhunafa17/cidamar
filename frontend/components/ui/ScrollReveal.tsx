'use client';

import { useRef, ReactNode } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

type Direction = 'up' | 'down' | 'left' | 'right' | 'none';

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  direction?: Direction;
  distance?: number;
  once?: boolean;
}

const directionMap: Record<Direction, { x: number; y: number }> = {
  up:    { x: 0,   y: 40  },
  down:  { x: 0,   y: -40 },
  left:  { x: 40,  y: 0   },
  right: { x: -40, y: 0   },
  none:  { x: 0,   y: 0   },
};

export default function ScrollReveal({
  children,
  className = '',
  delay = 0,
  duration = 0.7,
  direction = 'up',
  distance,
  once = true,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const { x, y } = directionMap[direction];
      const actualX = distance !== undefined && (direction === 'left' || direction === 'right') ? (direction === 'left' ? distance : -distance) : x;
      const actualY = distance !== undefined && (direction === 'up' || direction === 'down') ? (direction === 'up' ? distance : -distance) : y;

      gsap.from(ref.current, {
        opacity: 0,
        x: actualX,
        y: actualY,
        duration,
        delay,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 88%',
          toggleActions: once ? 'play none none none' : 'play none none reverse',
        },
      });
    });
  }, { scope: ref });

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
