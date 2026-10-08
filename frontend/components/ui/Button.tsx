'use client';

import { cn } from '@/lib/utils/cn';
import { ButtonHTMLAttributes, forwardRef } from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
type ButtonSize    = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  fullWidth?: boolean;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:   'bg-charcoal text-cream hover:bg-slate active:scale-[0.98] transition-all duration-300 cursor-pointer',
  secondary: 'bg-earth-accent text-cream hover:bg-[#7a6b5e] active:scale-[0.98] transition-all duration-300 cursor-pointer',
  outline:   'border-[1.5px] border-charcoal text-charcoal hover:bg-charcoal hover:text-cream active:scale-[0.98] transition-all duration-300 cursor-pointer',
  ghost:     'text-charcoal hover:bg-black/5 active:scale-[0.98] transition-all duration-300 cursor-pointer',
  danger:    'bg-red-alert text-cream hover:bg-[#6c2d27] active:scale-[0.98] transition-all duration-300 cursor-pointer',
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'h-10 px-5 text-sm tracking-wide',
  md: 'h-12 px-7 text-[0.95rem] tracking-wide',
  lg: 'h-14 px-10 text-base tracking-wide',
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(({
  className,
  variant  = 'primary',
  size     = 'md',
  loading  = false,
  fullWidth = false,
  disabled,
  children,
  ...props
}, ref) => {
  return (
    <button
      ref={ref}
      className={cn(
        'inline-flex items-center justify-center gap-3 font-body font-medium rounded-sm',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-charcoal focus-visible:ring-offset-2',
        'disabled:opacity-40 disabled:cursor-not-allowed disabled:pointer-events-none',
        variantClasses[variant],
        sizeClasses[size],
        fullWidth && 'w-full',
        className,
      )}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
      )}
      <span className="relative top-[1px]">{children}</span>
    </button>
  );
});

Button.displayName = 'Button';
export default Button;
