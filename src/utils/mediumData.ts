/**
 * Medium Data System for Talent Tutor
 * Defines educational mediums available in Bangladesh
 */

export interface Medium {
  id: string;
  name: {
    bn: string;
    en: string;
  };
  description: {
    bn: string;
    en: string;
  };
  icon: string;
  color: string;
  categories: string[]; // Which subject categories typically use this medium
}

export const mediums: Medium[] = [
  {
    id: 'bangla-medium',
    name: {
      bn: 'বাংলা মিডিয়াম',
      en: 'Bangla Medium'
    },
    description: {
      bn: 'বাংলাদেশের জাতীয় শিক্ষাক্রম অনুসরণকারী বাংলা মাধ্যম শিক্ষা',
      en: 'Bangla medium education following national curriculum of Bangladesh'
    },
    icon: '📚',
    color: 'from-emerald-500 to-teal-500',
    categories: [
      'primary',
      'secondary',
      'higher-secondary',
      'competitive-exams',
      'skill-development',
      'arts-music'
    ]
  },
  {
    id: 'english-medium',
    name: {
      bn: 'ইংলিশ মিডিয়াম',
      en: 'English Medium'
    },
    description: {
      bn: 'O Level, A Level এবং আন্তর্জাতিক শিক্ষাক্রমভুক্ত ইংরেজি মাধ্যম',
      en: 'English medium including O Level, A Level and international curriculum'
    },
    icon: '🌍',
    color: 'from-blue-500 to-cyan-500',
    categories: [
      'o-a-level',
      'language-training',
      'higher-education',
      'skill-development',
      'arts-music'
    ]
  },
  {
    id: 'arabic-medium',
    name: {
      bn: 'আরবি মিডিয়াম',
      en: 'Arabic Medium'
    },
    description: {
      bn: 'কুরআন, হাদিস, আরবি ভাষা এবং মাদ্রাসা শিক্ষা',
      en: 'Quran, Hadith, Arabic language and Madrasa education'
    },
    icon: '☪️',
    color: 'from-purple-500 to-pink-500',
    categories: [
      'religious-studies',
      'language-training'
    ]
  }
];

/**
 * Get medium by ID
 */
export function getMediumById(id: string): Medium | undefined {
  return mediums.find(m => m.id === id);
}

/**
 * Get mediums for a specific category
 */
export function getMediumsForCategory(categoryId: string): Medium[] {
  return mediums.filter(m => m.categories.includes(categoryId));
}

/**
 * Get all mediums
 */
export function getAllMediums(): Medium[] {
  return mediums;
}

/**
 * Medium display names for UI
 */
export const mediumLabels = {
  bn: {
    all: 'সকল মিডিয়াম',
    select: 'মিডিয়াম নির্বাচন করুন',
    'bangla-medium': 'বাংলা মিডিয়াম',
    'english-medium': 'ইংলিশ মিডিয়াম',
    'arabic-medium': 'আরবি মিডিয়াম',
  },
  en: {
    all: 'All Mediums',
    select: 'Select Medium',
    'bangla-medium': 'Bangla Medium',
    'english-medium': 'English Medium',
    'arabic-medium': 'Arabic Medium',
  }
};
