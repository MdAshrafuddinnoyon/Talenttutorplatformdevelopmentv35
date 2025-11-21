import { ReactNode } from 'react';
import { Button } from './ui/button';
import { ArrowLeft } from 'lucide-react';

interface PageHeroProps {
  title: string;
  subtitle?: string;
  description?: string;
  language?: 'bn' | 'en';
  showBackButton?: boolean;
  onBackClick?: () => void;
  backButtonText?: string;
  children?: ReactNode;
  variant?: 'default' | 'gradient' | 'simple';
}

/**
 * Reusable Page Hero Component
 * Ensures consistent design across all pages
 * 
 * Usage:
 * <PageHero 
 *   title="শিক্ষক খুঁজুন"
 *   subtitle="যোগ্য এবং যাচাইকৃত শিক্ষক খুঁজে পান"
 *   showBackButton
 *   onBackClick={() => setPage('home')}
 * />
 */
export function PageHero({
  title,
  subtitle,
  description,
  language = 'bn',
  showBackButton = false,
  onBackClick,
  backButtonText,
  children,
  variant = 'gradient'
}: PageHeroProps) {
  const baseClasses = "py-12 md:py-16 lg:py-20";
  
  const variantClasses = {
    default: "bg-white",
    gradient: "bg-gradient-to-r from-teal-600 via-emerald-600 to-cyan-600 text-white",
    simple: "bg-gradient-to-br from-teal-50 via-cyan-50 to-blue-50"
  };

  const textColorClasses = {
    default: "text-gray-900",
    gradient: "text-white",
    simple: "text-gray-900"
  };

  const subtitleColorClasses = {
    default: "text-gray-600",
    gradient: "text-teal-50",
    simple: "text-gray-600"
  };

  return (
    <div className={`${baseClasses} ${variantClasses[variant]}`}>
      <div className="container mx-auto px-4">
        {/* Back Button */}
        {showBackButton && onBackClick && (
          <Button
            variant="ghost"
            onClick={onBackClick}
            className={`mb-6 ${variant === 'gradient' ? 'text-white hover:bg-white/10' : 'text-gray-700 hover:bg-gray-100'}`}
          >
            <ArrowLeft className="mr-2 w-4 h-4" />
            {backButtonText || (language === 'bn' ? 'পিছনে যান' : 'Go Back')}
          </Button>
        )}

        {/* Content */}
        <div className="max-w-4xl mx-auto text-center">
          <h1 
            className={`${textColorClasses[variant]} mb-4 ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : 'font-[Libre_Franklin]'}`}
          >
            {title}
          </h1>
          
          {subtitle && (
            <p 
              className={`${subtitleColorClasses[variant]} mb-6 text-lg md:text-xl ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : 'font-[Libre_Franklin]'}`}
            >
              {subtitle}
            </p>
          )}

          {description && (
            <p 
              className={`${subtitleColorClasses[variant]} max-w-2xl mx-auto ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : 'font-[Libre_Franklin]'}`}
            >
              {description}
            </p>
          )}

          {/* Custom Children (e.g., Search Bar, CTA Buttons) */}
          {children && (
            <div className="mt-8">
              {children}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
