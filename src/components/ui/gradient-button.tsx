import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from './utils';

const gradientButtonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        emerald: 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white hover:from-emerald-700 hover:to-teal-700 shadow-md hover:shadow-lg active:scale-95',
        blue: 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 shadow-md hover:shadow-lg active:scale-95',
        red: 'bg-gradient-to-r from-red-600 to-pink-600 text-white hover:from-red-700 hover:to-pink-700 shadow-md hover:shadow-lg active:scale-95',
        orange: 'bg-gradient-to-r from-orange-600 to-red-600 text-white hover:from-orange-700 hover:to-red-700 shadow-md hover:shadow-lg active:scale-95',
        purple: 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700 shadow-md hover:shadow-lg active:scale-95',
      },
      size: {
        default: 'h-10 px-4 py-2 text-sm md:text-base',
        sm: 'h-8 px-3 py-1.5 text-xs md:text-sm',
        lg: 'h-12 px-6 py-3 text-base md:text-lg',
        xl: 'h-14 px-8 py-4 text-lg md:text-xl',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'emerald',
      size: 'default',
    },
  }
);

export interface GradientButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof gradientButtonVariants> {
  asChild?: boolean;
}

const GradientButton = React.forwardRef<HTMLButtonElement, GradientButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(gradientButtonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
GradientButton.displayName = 'GradientButton';

export { GradientButton, gradientButtonVariants };
