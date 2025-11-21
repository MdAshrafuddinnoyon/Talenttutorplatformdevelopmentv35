import { ReactNode } from 'react';

interface PageSectionProps {
  title?: string;
  subtitle?: string;
  description?: string;
  language?: 'bn' | 'en';
  children: ReactNode;
  variant?: 'default' | 'gradient' | 'white' | 'gray';
  className?: string;
  containerClassName?: string;
  centered?: boolean;
  noPadding?: boolean;
}

/**
 * Reusable Page Section Component
 * Ensures consistent spacing and layout across all pages
 * 
 * Usage:
 * <PageSection 
 *   title="জনপ্রিয় বিষয়"
 *   subtitle="সবচেয়ে চাহিদা সম্পন্ন বিষয়গুলি"
 *   variant="gradient"
 * >
 *   <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
 *     {/* Content */}
 *   </div>
 * </PageSection>
 */
export function PageSection({
  title,
  subtitle,
  description,
  language = 'bn',
  children,
  variant = 'default',
  className = '',
  containerClassName = '',
  centered = false,
  noPadding = false
}: PageSectionProps) {
  const baseClasses = noPadding ? "" : "py-12 md:py-16 lg:py-20";
  
  const variantClasses = {
    default: "bg-white",
    gradient: "bg-gradient-to-br from-teal-50 via-cyan-50 to-blue-50",
    white: "bg-white",
    gray: "bg-gray-50"
  };

  const titleColorClasses = {
    default: "text-gray-900",
    gradient: "text-gray-900",
    white: "text-gray-900",
    gray: "text-gray-900"
  };

  const subtitleColorClasses = {
    default: "text-gray-600",
    gradient: "text-gray-600",
    white: "text-gray-600",
    gray: "text-gray-600"
  };

  return (
    <section className={`${baseClasses} ${variantClasses[variant]} ${className}`}>
      <div className={`container mx-auto px-4 ${containerClassName}`}>
        {/* Section Header */}
        {(title || subtitle || description) && (
          <div className={`mb-12 ${centered ? 'text-center max-w-3xl mx-auto' : ''}`}>
            {title && (
              <h2 
                className={`${titleColorClasses[variant]} mb-4 ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : 'font-[Libre_Franklin]'}`}
              >
                {title}
              </h2>
            )}
            
            {subtitle && (
              <p 
                className={`${subtitleColorClasses[variant]} text-lg md:text-xl mb-4 ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : 'font-[Libre_Franklin]'}`}
              >
                {subtitle}
              </p>
            )}

            {description && (
              <p 
                className={`${subtitleColorClasses[variant]} ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : 'font-[Libre_Franklin]'}`}
              >
                {description}
              </p>
            )}
          </div>
        )}

        {/* Section Content */}
        {children}
      </div>
    </section>
  );
}
