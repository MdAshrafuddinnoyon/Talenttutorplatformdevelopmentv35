import { ReactNode } from 'react';

interface ResponsiveWrapperProps {
  children: ReactNode;
  className?: string;
}

export function ResponsiveWrapper({ children, className = '' }: ResponsiveWrapperProps) {
  return (
    <div className={`w-full ${className}`}>
      {children}
    </div>
  );
}

// Responsive container component
export function ResponsiveContainer({ children, className = '' }: ResponsiveWrapperProps) {
  return (
    <div className={`container mx-auto px-4 sm:px-6 lg:px-8 ${className}`}>
      {children}
    </div>
  );
}

// Responsive grid component
interface ResponsiveGridProps {
  children: ReactNode;
  cols?: {
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
  };
  gap?: string;
  className?: string;
}

export function ResponsiveGrid({ 
  children, 
  cols = { sm: 1, md: 2, lg: 3, xl: 4 },
  gap = 'gap-4 md:gap-6',
  className = ''
}: ResponsiveGridProps) {
  const gridCols = `grid grid-cols-${cols.sm || 1} ${cols.md ? `md:grid-cols-${cols.md}` : ''} ${cols.lg ? `lg:grid-cols-${cols.lg}` : ''} ${cols.xl ? `xl:grid-cols-${cols.xl}` : ''}`;
  
  return (
    <div className={`grid grid-cols-1 ${cols.md ? `md:grid-cols-${cols.md}` : ''} ${cols.lg ? `lg:grid-cols-${cols.lg}` : ''} ${cols.xl ? `xl:grid-cols-${cols.xl}` : ''} ${gap} ${className}`}>
      {children}
    </div>
  );
}
