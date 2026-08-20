import { cn } from '@/lib/utils/cn';
import { HTMLAttributes } from 'react';

type BadgeVariant = 'green' | 'gold' | 'silver' | 'bronze' | 'red' | 'gray' | 'amber' | 'blue' | 'white';

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  size?: 'sm' | 'md';
}

const variantClasses: Record<BadgeVariant, string> = {
  green:  'bg-green-pale  text-green-primary  border border-green-light',
  gold:   'bg-amber-light text-amber-accent   border border-amber-200',
  silver: 'bg-gray-100   text-gray-600       border border-gray-300',
  bronze: 'bg-orange-50  text-orange-700     border border-orange-200',
  red:    'bg-red-50     text-red-alert      border border-red-200',
  gray:   'bg-gray-100   text-gray-500       border border-gray-200',
  amber:  'bg-amber-light text-amber-700     border border-amber-200',
  blue:   'bg-blue-50    text-blue-600       border border-blue-200',
  white:  'bg-white      text-gray-800       border border-gray-200 shadow-sm',
};

const sizeClasses = {
  sm: 'text-xs  px-2   py-0.5',
  md: 'text-sm  px-2.5 py-1',
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
        'inline-flex items-center gap-1 rounded-full font-semibold whitespace-nowrap',
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

// Badge khusus tingkat prestasi
export function BadgeTingkat({ tingkat }: { tingkat: string }) {
  const config: Record<string, { label: string; variant: BadgeVariant; icon: string }> = {
    nasional:  { label: 'Nasional',  variant: 'gold',   icon: '🥇' },
    provinsi:  { label: 'Provinsi',  variant: 'gold',   icon: '🥇' },
    kabupaten: { label: 'Kabupaten', variant: 'silver', icon: '🥈' },
    kecamatan: { label: 'Kecamatan', variant: 'bronze', icon: '🥉' },
    rt_rw:     { label: 'RT/RW',     variant: 'green',  icon: '🌿' },
  };

  const { label, variant, icon } = config[tingkat] ?? { label: tingkat, variant: 'gray' as BadgeVariant, icon: '📌' };

  return (
    <Badge variant={variant}>
      <span>{icon}</span>
      <span>{label}</span>
    </Badge>
  );
}
