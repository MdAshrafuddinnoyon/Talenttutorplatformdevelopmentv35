/**
 * Global Brand Configuration for Talent Tutor
 * 
 * এই ফাইল থেকে সম্পূর্ণ ব্র্যান্ডিং কন্ট্রোল করা হয়:
 * - লোগো (আইকন এবং টেক্সট)
 * - রঙ
 * - ফন্ট
 * - ট্যাগলাইন
 * 
 * এক জায়গা থেকে পরিবর্তন করলে সমস্ত অ্যাপ্লিকেশনে আপডেট হবে।
 */

import { Sparkles, GraduationCap, BookHeart, Lightbulb, Award, Heart } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

// ==================== LOGO CONFIGURATION ====================

/**
 * লোগো আইকন - এখানে পরিবর্তন করলে সব জায়গায় আপডেট হবে
 * 
 * Available icons:
 * - Sparkles (বর্তমানে ব্যবহৃত)
 * - GraduationCap (শিক্ষার প্রতীক)
 * - BookHeart (বই এবং হৃদয়)
 * - Lightbulb (আইডিয়া/শিক্ষা)
 * - Award (পুরস্কার/অর্জন)
 * - Heart (দান/ভালোবাসা)
 */
export const LOGO_ICON: LucideIcon = Sparkles;

/**
 * ব্র্যান্ড নাম - এখানে পরিবর্তন করলে সব জায়গায় আপডেট হবে
 */
export const BRAND_NAME = {
  en: 'Talent Tutor',
  bn: 'ট্যালেন্ট টিউটর'
} as const;

/**
 * ট্যাগলাইন/সাবটাইটেল - এখানে পরিবর্তন করলে সব জায়গায় আপডেট হবে
 */
export const BRAND_TAGLINE = {
  en: 'Bridge of Education & Charity',
  bn: 'শিক্ষা ও দানের সেতু'
} as const;

/**
 * সংক্ষিপ্ত বর্ণনা
 */
export const BRAND_DESCRIPTION = {
  en: 'Connecting teachers, students, and donors for a better education system',
  bn: 'শিক্ষক, শিক্ষার্থী এবং দাতাদের একসাথে করে একটি উন্নত শিক্ষা ব্যবস্থা গড়ার প্ল্যাটফর্ম'
} as const;

// ==================== COLOR CONFIGURATION ====================

/**
 * প্রাথমিক ব্র্যান্ড কালার - লোগো এবং মূল UI এলিমেন্টে ব্যবহৃত
 */
export const BRAND_COLORS = {
  primary: {
    from: 'emerald-500',   // #10b981
    via: 'teal-500',       // #14b8a6
    to: 'cyan-500',        // #06b6d4
  },
  secondary: {
    from: 'blue-500',
    to: 'indigo-500',
  },
  accent: {
    from: 'rose-500',
    to: 'pink-500',
  }
} as const;

/**
 * লোগো গ্রেডিয়েন্ট ক্লাস - TailwindCSS
 */
export const LOGO_GRADIENT_BG = `bg-gradient-to-br from-${BRAND_COLORS.primary.from} via-${BRAND_COLORS.primary.via} to-${BRAND_COLORS.primary.to}`;
export const LOGO_GRADIENT_TEXT = `bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent`;

/**
 * লোগো গ্লো/শ্যাডো ইফেক্ট
 */
export const LOGO_SHADOW = {
  sm: `shadow-lg shadow-${BRAND_COLORS.primary.from}/30`,
  md: `shadow-lg shadow-${BRAND_COLORS.primary.from}/40`,
  lg: `shadow-xl shadow-${BRAND_COLORS.primary.from}/50`,
  hover: `shadow-${BRAND_COLORS.primary.from}/50`
} as const;

// ==================== SIZE PRESETS ====================

/**
 * লোগো সাইজ প্রিসেট
 */
export const LOGO_SIZES = {
  xs: {
    container: 'w-6 h-6',
    icon: 'w-3 h-3',
    text: 'text-sm',
    subtitle: 'text-[10px]',
  },
  sm: {
    container: 'w-8 h-8',
    icon: 'w-4 h-4',
    text: 'text-lg',
    subtitle: 'text-xs',
  },
  md: {
    container: 'w-10 h-10',
    icon: 'w-5 h-5',
    text: 'text-xl',
    subtitle: 'text-xs',
  },
  lg: {
    container: 'w-12 h-12',
    icon: 'w-6 h-6',
    text: 'text-2xl',
    subtitle: 'text-sm',
  },
  xl: {
    container: 'w-16 h-16',
    icon: 'w-8 h-8',
    text: 'text-3xl',
    subtitle: 'text-base',
  },
  '2xl': {
    container: 'w-20 h-20',
    icon: 'w-10 h-10',
    text: 'text-4xl',
    subtitle: 'text-lg',
  },
} as const;

export type LogoSize = keyof typeof LOGO_SIZES;

// ==================== FONT CONFIGURATION ====================

/**
 * ফন্ট কনফিগারেশন
 */
export const BRAND_FONTS = {
  en: {
    primary: 'Libre Franklin',
    className: 'font-[Libre_Franklin]'
  },
  bn: {
    primary: 'Noto Serif Bengali',
    className: 'font-[Noto_Serif_Bengali]'
  }
} as const;

// ==================== HELPER FUNCTIONS ====================

/**
 * Get brand name based on language
 */
export const getBrandName = (language: 'en' | 'bn' = 'en'): string => {
  return BRAND_NAME[language];
};

/**
 * Get brand tagline based on language
 */
export const getBrandTagline = (language: 'en' | 'bn' = 'en'): string => {
  return BRAND_TAGLINE[language];
};

/**
 * Get brand description based on language
 */
export const getBrandDescription = (language: 'en' | 'bn' = 'en'): string => {
  return BRAND_DESCRIPTION[language];
};

/**
 * Get font class based on language
 */
export const getFontClass = (language: 'en' | 'bn' = 'en'): string => {
  return BRAND_FONTS[language].className;
};

/**
 * Get logo container classes
 */
export const getLogoContainerClasses = (size: LogoSize = 'md', withShadow: boolean = true): string => {
  const sizeClasses = LOGO_SIZES[size].container;
  const shadowClasses = withShadow ? LOGO_SHADOW.md : '';
  return `${sizeClasses} bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-500 rounded-xl flex items-center justify-center ${shadowClasses}`;
};

/**
 * Get logo icon classes
 */
export const getLogoIconClasses = (size: LogoSize = 'md'): string => {
  return `${LOGO_SIZES[size].icon} text-white`;
};

/**
 * Get logo text classes
 */
export const getLogoTextClasses = (size: LogoSize = 'md', language: 'en' | 'bn' = 'en'): string => {
  const sizeClass = LOGO_SIZES[size].text;
  const fontClass = getFontClass(language);
  return `${sizeClass} font-bold bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent ${fontClass}`;
};

/**
 * Get logo subtitle classes
 */
export const getLogoSubtitleClasses = (size: LogoSize = 'md', language: 'en' | 'bn' = 'en'): string => {
  const sizeClass = LOGO_SIZES[size].subtitle;
  const fontClass = getFontClass(language);
  return `${sizeClass} text-gray-500 -mt-0.5 ${fontClass}`;
};

// ==================== EXPORT DEFAULT ====================

/**
 * Default brand configuration export
 */
export const brandConfig = {
  icon: LOGO_ICON,
  name: BRAND_NAME,
  tagline: BRAND_TAGLINE,
  description: BRAND_DESCRIPTION,
  colors: BRAND_COLORS,
  fonts: BRAND_FONTS,
  sizes: LOGO_SIZES,
  getBrandName,
  getBrandTagline,
  getBrandDescription,
  getFontClass,
  getLogoContainerClasses,
  getLogoIconClasses,
  getLogoTextClasses,
  getLogoSubtitleClasses,
} as const;

export default brandConfig;
