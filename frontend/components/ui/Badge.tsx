import { cn } from '@/lib/utils/cn';
import { HTMLAttributes } from 'react';

type BadgeVariant = 'green' | 'gold' | 'silver' | 'bronze' | 'red' | 'gray' | 'amber' | 'blue' | 'white';

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  size?: 'sm' | 'md';
}

const variantClasses: Record<BadgeVariant, string> = {
  green:  'bg-muted-green-light text-muted-green',
  gold:   'bg-earth-light/30 text-earth-accent',
  silver: 'bg-slate/10 text-slate',
  bronze: 'bg-earth-accent/10 text-earth-accent',
  red:    'bg-red-alert/10 text-red-alert',
  gray:   'bg-slate/5 text-slate/70',
  amber:  'bg-earth-light/50 text-earth-accent',
  blue:   'bg-slate/5 text-slate/70',
  white:  'bg-cream text-charcoal border border-slate/10',
};

const sizeClasses = {
  sm: 'text-[0.7rem] px-2.5 py-0.5 uppercase tracking-widest',
  md: 'text-xs px-3 py-1 uppercase tracking-widest',
};

export default function Badge({
  variant = 'green',
  size    = 'md',
  className,
  children,
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 font-medium whitespace-nowrap',
        variantClasses[variant],
        sizeClasses[size],
        className,
      )}
      {...props}
    >
      {children}
    </span>
  );
}

export function BadgeTingkat({ tingkat }: { tingkat: string }) {
  const config: Record<string, { label: string; variant: BadgeVariant }> = {
    nasional:  { label: 'Nasional',  variant: 'gold' },
    provinsi:  { label: 'Provinsi',  variant: 'silver' },
    kabupaten: { label: 'Kabupaten', variant: 'gray' },
    kecamatan: { label: 'Kecamatan', variant: 'gray' },
    rt_rw:     { label: 'Lokal',     variant: 'green' },
  };

  const { label, variant } = config[tingkat] ?? { label: tingkat, variant: 'gray' as BadgeVariant };

  return (
    <Badge variant={variant}>
      <span>{label}</span>
    </Badge>
  );
}
