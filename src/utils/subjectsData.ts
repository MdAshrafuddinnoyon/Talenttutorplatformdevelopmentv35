/**
 * Comprehensive Subjects Database for Talent Tutor Platform
 * Includes all educational levels, religious studies, languages, arts, and specialized subjects
 */

export interface Subject {
  id: string;
  name_bn: string;
  name_en: string;
  category: string;
  icon: string;
  level?: string[];
  description_bn?: string;
  description_en?: string;
  popular?: boolean;
  mediums?: string[]; // Array of medium IDs: 'bangla-medium', 'english-medium', 'arabic-medium'
}

export interface SubjectCategory {
  id: string;
  name_bn: string;
  name_en: string;
  icon: string;
  description_bn: string;
  description_en: string;
  color: string;
}

// Subject Categories
export const subjectCategories: SubjectCategory[] = [
  {
    id: 'primary',
    name_bn: 'প্রাথমিক শিক্ষা',
    name_en: 'Primary Education',
    icon: 'GraduationCap',
    description_bn: 'কেজি থেকে ৫ম শ্রেণী পর্যন্ত',
    description_en: 'KG to Grade 5',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    id: 'secondary',
    name_bn: 'মাধ্যমিক শিক্ষা',
    name_en: 'Secondary Education',
    icon: 'BookOpen',
    description_bn: '৬ষ্ঠ থেকে ১০ম শ্রেণী (JSC/SSC)',
    description_en: 'Grade 6-10 (JSC/SSC)',
    color: 'from-green-500 to-emerald-500',
  },
  {
    id: 'higher_secondary',
    name_bn: 'উচ্চ মাধ্যমিক',
    name_en: 'Higher Secondary',
    icon: 'Award',
    description_bn: 'একাদশ ও দ্বাদশ শ্রেণী (HSC)',
    description_en: 'Grade 11-12 (HSC)',
    color: 'from-purple-500 to-pink-500',
  },
  {
    id: 'english_medium',
    name_bn: 'ইংলিশ মিডিয়াম',
    name_en: 'English Medium',
    icon: 'Globe2',
    description_bn: 'O Level, A Level, IB',
    description_en: 'O Level, A Level, IB',
    color: 'from-orange-500 to-red-500',
  },
  {
    id: 'religious',
    name_bn: 'ধর্মীয় শিক্ষা',
    name_en: 'Religious Studies',
    icon: 'Book',
    description_bn: 'কুরআন, আরবি, মাদ্রাসা শিক্ষা',
    description_en: 'Quran, Arabic, Madrasa Education',
    color: 'from-teal-500 to-cyan-600',
  },
  {
    id: 'languages',
    name_bn: 'ভাষা প্রশিক্ষণ',
    name_en: 'Language Training',
    icon: 'Languages',
    description_bn: 'IELTS, TOEFL, বিদেশি ভাষা',
    description_en: 'IELTS, TOEFL, Foreign Languages',
    color: 'from-indigo-500 to-blue-600',
  },
  {
    id: 'engineering',
    name_bn: 'ইঞ্জিনিয়ারিং',
    name_en: 'Engineering',
    icon: 'Code',
    description_bn: 'প্রোগ্রামিং, ইঞ্জিনিয়ারিং বিষয়সমূহ',
    description_en: 'Programming, Engineering Subjects',
    color: 'from-gray-700 to-gray-900',
  },
  {
    id: 'medical',
    name_bn: 'চিকিৎসা শিক্ষা',
    name_en: 'Medical Studies',
    icon: 'Heart',
    description_bn: 'MBBS, মেডিকেল বিষয়সমূহ',
    description_en: 'MBBS, Medical Subjects',
    color: 'from-red-500 to-pink-600',
  },
  {
    id: 'arts',
    name_bn: 'শিল্পকলা',
    name_en: 'Arts & Crafts',
    icon: 'Palette',
    description_bn: 'চিত্রাঙ্কন, সঙ্গীত, নৃত্য',
    description_en: 'Drawing, Music, Dance',
    color: 'from-pink-500 to-rose-500',
  },
  {
    id: 'skills',
    name_bn: 'দক্ষতা উন্নয়ন',
    name_en: 'Skill Development',
    icon: 'Zap',
    description_bn: 'কম্পিউটার, গ্রাফিক্স, ডিজাইন',
    description_en: 'Computer, Graphics, Design',
    color: 'from-yellow-500 to-orange-500',
  },
];

// All Subjects Database
export const allSubjects: Subject[] = [
  // ============ PRIMARY EDUCATION (KG - 5) ============
  {
    id: 'bangla_primary',
    name_bn: 'বাংলা',
    name_en: 'Bangla',
    category: 'primary',
    icon: 'Book',
    level: ['KG', 'Class 1', 'Class 2', 'Class 3', 'Class 4', 'Class 5'],
    popular: true,
  },
  {
    id: 'english_primary',
    name_bn: 'ইংরেজি',
    name_en: 'English',
    category: 'primary',
    icon: 'Languages',
    level: ['KG', 'Class 1', 'Class 2', 'Class 3', 'Class 4', 'Class 5'],
    popular: true,
  },
  {
    id: 'math_primary',
    name_bn: 'গণিত',
    name_en: 'Mathematics',
    category: 'primary',
    icon: 'Calculator',
    level: ['KG', 'Class 1', 'Class 2', 'Class 3', 'Class 4', 'Class 5'],
    popular: true,
  },
  {
    id: 'science_primary',
    name_bn: 'বিজ্ঞান',
    name_en: 'Science',
    category: 'primary',
    icon: 'Beaker',
    level: ['Class 3', 'Class 4', 'Class 5'],
    popular: true,
  },
  {
    id: 'social_science_primary',
    name_bn: 'সামাজিক বিজ্ঞান',
    name_en: 'Social Science',
    category: 'primary',
    icon: 'Users',
    level: ['Class 3', 'Class 4', 'Class 5'],
  },
  {
    id: 'religion_primary',
    name_bn: 'ধর্ম শিক্ষা',
    name_en: 'Religious Studies',
    category: 'primary',
    icon: 'Book',
    level: ['Class 1', 'Class 2', 'Class 3', 'Class 4', 'Class 5'],
  },

  // ============ SECONDARY EDUCATION (6-10) ============
  {
    id: 'bangla_secondary',
    name_bn: 'বাংলা',
    name_en: 'Bangla',
    category: 'secondary',
    icon: 'Book',
    level: ['Class 6', 'Class 7', 'Class 8', 'Class 9', 'Class 10'],
    popular: true,
  },
  {
    id: 'english_secondary',
    name_bn: 'ইংরেজি',
    name_en: 'English',
    category: 'secondary',
    icon: 'Languages',
    level: ['Class 6', 'Class 7', 'Class 8', 'Class 9', 'Class 10'],
    popular: true,
  },
  {
    id: 'math_secondary',
    name_bn: 'গণিত',
    name_en: 'Mathematics',
    category: 'secondary',
    icon: 'Calculator',
    level: ['Class 6', 'Class 7', 'Class 8', 'Class 9', 'Class 10'],
    popular: true,
  },
  {
    id: 'general_science',
    name_bn: 'সাধারণ বিজ্ঞান',
    name_en: 'General Science',
    category: 'secondary',
    icon: 'Beaker',
    level: ['Class 6', 'Class 7', 'Class 8'],
    popular: true,
  },
  {
    id: 'physics_secondary',
    name_bn: 'পদার্থবিজ্ঞান',
    name_en: 'Physics',
    category: 'secondary',
    icon: 'Atom',
    level: ['Class 9', 'Class 10'],
    popular: true,
  },
  {
    id: 'chemistry_secondary',
    name_bn: 'রসায়ন',
    name_en: 'Chemistry',
    category: 'secondary',
    icon: 'Flask',
    level: ['Class 9', 'Class 10'],
    popular: true,
  },
  {
    id: 'biology_secondary',
    name_bn: 'জীববিজ্ঞান',
    name_en: 'Biology',
    category: 'secondary',
    icon: 'Microscope',
    level: ['Class 9', 'Class 10'],
    popular: true,
  },
  {
    id: 'higher_math',
    name_bn: 'উচ্চতর গণিত',
    name_en: 'Higher Mathematics',
    category: 'secondary',
    icon: 'Calculator',
    level: ['Class 9', 'Class 10'],
    popular: true,
  },
  {
    id: 'ict_secondary',
    name_bn: 'তথ্য ও যোগাযোগ প্রযুক্তি',
    name_en: 'ICT',
    category: 'secondary',
    icon: 'Computer',
    level: ['Class 6', 'Class 7', 'Class 8', 'Class 9', 'Class 10'],
  },
  {
    id: 'bangladesh_global_studies',
    name_bn: 'বাংলাদেশ ও বিশ্বপরিচয়',
    name_en: 'Bangladesh & Global Studies',
    category: 'secondary',
    icon: 'Globe2',
    level: ['Class 6', 'Class 7', 'Class 8'],
  },
  {
    id: 'agriculture',
    name_bn: 'কৃষি শিক্ষা',
    name_en: 'Agriculture',
    category: 'secondary',
    icon: 'Leaf',
    level: ['Class 6', 'Class 7', 'Class 8', 'Class 9', 'Class 10'],
  },
  {
    id: 'home_economics',
    name_bn: 'গার্হস্থ্য বিজ্ঞান',
    name_en: 'Home Economics',
    category: 'secondary',
    icon: 'Home',
    level: ['Class 6', 'Class 7', 'Class 8', 'Class 9', 'Class 10'],
  },
  {
    id: 'geography_secondary',
    name_bn: 'ভূগোল',
    name_en: 'Geography',
    category: 'secondary',
    icon: 'Map',
    level: ['Class 9', 'Class 10'],
  },
  {
    id: 'history_secondary',
    name_bn: 'ইতিহাস',
    name_en: 'History',
    category: 'secondary',
    icon: 'Clock',
    level: ['Class 9', 'Class 10'],
  },
  {
    id: 'civics_secondary',
    name_bn: 'পৌরনীতি',
    name_en: 'Civics',
    category: 'secondary',
    icon: 'Building',
    level: ['Class 9', 'Class 10'],
  },
  {
    id: 'economics_secondary',
    name_bn: 'অর্থনীতি',
    name_en: 'Economics',
    category: 'secondary',
    icon: 'TrendingUp',
    level: ['Class 9', 'Class 10'],
  },
  {
    id: 'accounting_secondary',
    name_bn: 'হিসাববিজ্ঞান',
    name_en: 'Accounting',
    category: 'secondary',
    icon: 'Calculator',
    level: ['Class 9', 'Class 10'],
  },
  {
    id: 'business_studies',
    name_bn: 'ব্যবসায় উদ্যোগ',
    name_en: 'Business Studies',
    category: 'secondary',
    icon: 'Briefcase',
    level: ['Class 9', 'Class 10'],
  },
  {
    id: 'finance_banking',
    name_bn: 'ফিন্যান্স ও ব্যাংকিং',
    name_en: 'Finance & Banking',
    category: 'secondary',
    icon: 'DollarSign',
    level: ['Class 9', 'Class 10'],
  },

  // ============ HIGHER SECONDARY (11-12 / HSC) ============
  {
    id: 'bangla_hsc',
    name_bn: 'বাংলা',
    name_en: 'Bangla',
    category: 'higher_secondary',
    icon: 'Book',
    level: ['HSC 1st Year', 'HSC 2nd Year'],
    popular: true,
  },
  {
    id: 'english_hsc',
    name_bn: 'ইংরেজি',
    name_en: 'English',
    category: 'higher_secondary',
    icon: 'Languages',
    level: ['HSC 1st Year', 'HSC 2nd Year'],
    popular: true,
  },
  {
    id: 'physics_hsc',
    name_bn: 'পদার্থবিজ্ঞান',
    name_en: 'Physics',
    category: 'higher_secondary',
    icon: 'Atom',
    level: ['HSC 1st Year', 'HSC 2nd Year'],
    popular: true,
  },
  {
    id: 'chemistry_hsc',
    name_bn: 'রসায়ন',
    name_en: 'Chemistry',
    category: 'higher_secondary',
    icon: 'Flask',
    level: ['HSC 1st Year', 'HSC 2nd Year'],
    popular: true,
  },
  {
    id: 'biology_hsc',
    name_bn: 'জীববিজ্ঞান',
    name_en: 'Biology',
    category: 'higher_secondary',
    icon: 'Microscope',
    level: ['HSC 1st Year', 'HSC 2nd Year'],
    popular: true,
  },
  {
    id: 'higher_math_hsc',
    name_bn: 'উচ্চতর গণিত',
    name_en: 'Higher Mathematics',
    category: 'higher_secondary',
    icon: 'Calculator',
    level: ['HSC 1st Year', 'HSC 2nd Year'],
    popular: true,
  },
  {
    id: 'ict_hsc',
    name_bn: 'তথ্য ও যোগাযোগ প্রযুক্তি',
    name_en: 'ICT',
    category: 'higher_secondary',
    icon: 'Computer',
    level: ['HSC 1st Year', 'HSC 2nd Year'],
  },
  {
    id: 'accounting_hsc',
    name_bn: 'হিসাববিজ্ঞান',
    name_en: 'Accounting',
    category: 'higher_secondary',
    icon: 'Calculator',
    level: ['HSC 1st Year', 'HSC 2nd Year'],
  },
  {
    id: 'management_hsc',
    name_bn: 'ব্যবসায় সংগঠন ও ব্যবস্থাপনা',
    name_en: 'Business Organization & Management',
    category: 'higher_secondary',
    icon: 'Briefcase',
    level: ['HSC 1st Year', 'HSC 2nd Year'],
  },
  {
    id: 'finance_hsc',
    name_bn: 'ফিন্যান্স ও ব্যাংকিং',
    name_en: 'Finance & Banking',
    category: 'higher_secondary',
    icon: 'DollarSign',
    level: ['HSC 1st Year', 'HSC 2nd Year'],
  },
  {
    id: 'economics_hsc',
    name_bn: 'অর্থনীতি',
    name_en: 'Economics',
    category: 'higher_secondary',
    icon: 'TrendingUp',
    level: ['HSC 1st Year', 'HSC 2nd Year'],
  },
  {
    id: 'history_hsc',
    name_bn: 'ইতিহাস',
    name_en: 'History',
    category: 'higher_secondary',
    icon: 'Clock',
    level: ['HSC 1st Year', 'HSC 2nd Year'],
  },
  {
    id: 'geography_hsc',
    name_bn: 'ভূগোল',
    name_en: 'Geography',
    category: 'higher_secondary',
    icon: 'Map',
    level: ['HSC 1st Year', 'HSC 2nd Year'],
  },
  {
    id: 'civics_hsc',
    name_bn: 'পৌরনীতি ও সুশাসন',
    name_en: 'Civics & Good Governance',
    category: 'higher_secondary',
    icon: 'Building',
    level: ['HSC 1st Year', 'HSC 2nd Year'],
  },
  {
    id: 'social_work_hsc',
    name_bn: 'সমাজকর্ম',
    name_en: 'Social Work',
    category: 'higher_secondary',
    icon: 'Users',
    level: ['HSC 1st Year', 'HSC 2nd Year'],
  },
  {
    id: 'logic_hsc',
    name_bn: 'যুক্তিবিদ্যা',
    name_en: 'Logic',
    category: 'higher_secondary',
    icon: 'Brain',
    level: ['HSC 1st Year', 'HSC 2nd Year'],
  },
  {
    id: 'psychology_hsc',
    name_bn: 'মনোবিজ্ঞান',
    name_en: 'Psychology',
    category: 'higher_secondary',
    icon: 'Brain',
    level: ['HSC 1st Year', 'HSC 2nd Year'],
  },

  // ============ ENGLISH MEDIUM (O Level, A Level) ============
  {
    id: 'english_olevel',
    name_bn: 'ইংরেজি (O Level)',
    name_en: 'English (O Level)',
    category: 'english_medium',
    icon: 'Languages',
    level: ['O Level'],
    popular: true,
  },
  {
    id: 'math_olevel',
    name_bn: 'গণিত (O Level)',
    name_en: 'Mathematics (O Level)',
    category: 'english_medium',
    icon: 'Calculator',
    level: ['O Level'],
    popular: true,
  },
  {
    id: 'physics_olevel',
    name_bn: 'পদার্থবিজ্ঞান (O Level)',
    name_en: 'Physics (O Level)',
    category: 'english_medium',
    icon: 'Atom',
    level: ['O Level'],
    popular: true,
  },
  {
    id: 'chemistry_olevel',
    name_bn: 'রসায়ন (O Level)',
    name_en: 'Chemistry (O Level)',
    category: 'english_medium',
    icon: 'Flask',
    level: ['O Level'],
    popular: true,
  },
  {
    id: 'biology_olevel',
    name_bn: 'জীববিজ্ঞান (O Level)',
    name_en: 'Biology (O Level)',
    category: 'english_medium',
    icon: 'Microscope',
    level: ['O Level'],
    popular: true,
  },
  {
    id: 'computer_science_olevel',
    name_bn: 'কম্পিউটার সায়েন্স (O Level)',
    name_en: 'Computer Science (O Level)',
    category: 'english_medium',
    icon: 'Computer',
    level: ['O Level'],
  },
  {
    id: 'accounting_olevel',
    name_bn: 'একাউন্টিং (O Level)',
    name_en: 'Accounting (O Level)',
    category: 'english_medium',
    icon: 'Calculator',
    level: ['O Level'],
  },
  {
    id: 'business_studies_olevel',
    name_bn: 'বিজনেস স্টাডিজ (O Level)',
    name_en: 'Business Studies (O Level)',
    category: 'english_medium',
    icon: 'Briefcase',
    level: ['O Level'],
  },
  {
    id: 'economics_olevel',
    name_bn: 'ইকোনমিক্স (O Level)',
    name_en: 'Economics (O Level)',
    category: 'english_medium',
    icon: 'TrendingUp',
    level: ['O Level'],
  },
  {
    id: 'english_alevel',
    name_bn: 'ইংরেজি (A Level)',
    name_en: 'English (A Level)',
    category: 'english_medium',
    icon: 'Languages',
    level: ['A Level'],
    popular: true,
  },
  {
    id: 'math_alevel',
    name_bn: 'ম্যাথমেটিক্স (A Level)',
    name_en: 'Mathematics (A Level)',
    category: 'english_medium',
    icon: 'Calculator',
    level: ['A Level'],
    popular: true,
  },
  {
    id: 'physics_alevel',
    name_bn: 'ফিজিক্স (A Level)',
    name_en: 'Physics (A Level)',
    category: 'english_medium',
    icon: 'Atom',
    level: ['A Level'],
    popular: true,
  },
  {
    id: 'chemistry_alevel',
    name_bn: 'কেমিস্ট্রি (A Level)',
    name_en: 'Chemistry (A Level)',
    category: 'english_medium',
    icon: 'Flask',
    level: ['A Level'],
    popular: true,
  },
  {
    id: 'biology_alevel',
    name_bn: 'বায়োলজি (A Level)',
    name_en: 'Biology (A Level)',
    category: 'english_medium',
    icon: 'Microscope',
    level: ['A Level'],
    popular: true,
  },
  {
    id: 'computer_science_alevel',
    name_bn: 'কম্পিউটার সায়েন্স (A Level)',
    name_en: 'Computer Science (A Level)',
    category: 'english_medium',
    icon: 'Computer',
    level: ['A Level'],
  },
  {
    id: 'accounting_alevel',
    name_bn: 'একাউন্টিং (A Level)',
    name_en: 'Accounting (A Level)',
    category: 'english_medium',
    icon: 'Calculator',
    level: ['A Level'],
  },
  {
    id: 'business_alevel',
    name_bn: 'বিজনেস (A Level)',
    name_en: 'Business (A Level)',
    category: 'english_medium',
    icon: 'Briefcase',
    level: ['A Level'],
  },
  {
    id: 'economics_alevel',
    name_bn: 'ইকোনমিক্স (A Level)',
    name_en: 'Economics (A Level)',
    category: 'english_medium',
    icon: 'TrendingUp',
    level: ['A Level'],
  },

  // ============ RELIGIOUS STUDIES ============
  {
    id: 'quran_recitation',
    name_bn: 'কুরআন তিলাওয়াত',
    name_en: 'Quran Recitation',
    category: 'religious',
    icon: 'Book',
    popular: true,
    description_bn: 'সহীহ তিলাওয়াত শিক্ষা',
    description_en: 'Proper Quran Recitation',
  },
  {
    id: 'quran_memorization',
    name_bn: 'কুরআন মুখস্থ (হিফজ)',
    name_en: 'Quran Memorization (Hifz)',
    category: 'religious',
    icon: 'Book',
    popular: true,
    description_bn: 'হিফজুল কুরআন',
    description_en: 'Quran Memorization',
  },
  {
    id: 'tajweed',
    name_bn: 'তাজভিদ',
    name_en: 'Tajweed',
    category: 'religious',
    icon: 'Book',
    popular: true,
    description_bn: 'তিলাওয়াতের নিয়মকানুন',
    description_en: 'Rules of Quranic Recitation',
  },
  {
    id: 'arabic_language',
    name_bn: 'আরবি ভাষা',
    name_en: 'Arabic Language',
    category: 'religious',
    icon: 'Languages',
    popular: true,
    description_bn: 'আরবি পড়া, লেখা ও বলা',
    description_en: 'Arabic Reading, Writing & Speaking',
  },
  {
    id: 'islamic_studies',
    name_bn: 'ইসলামিক স্টাডিজ',
    name_en: 'Islamic Studies',
    category: 'religious',
    icon: 'Book',
    description_bn: 'ইসলামের মৌলিক বিষয়সমূহ',
    description_en: 'Basic Islamic Studies',
  },
  {
    id: 'hadith',
    name_bn: 'হাদিস',
    name_en: 'Hadith',
    category: 'religious',
    icon: 'Book',
    description_bn: 'হাদিসের পাঠ ও ব্যাখ্যা',
    description_en: 'Hadith Study & Explanation',
  },
  {
    id: 'fiqh',
    name_bn: 'ফিকহ',
    name_en: 'Fiqh',
    category: 'religious',
    icon: 'Book',
    description_bn: 'ইসলামি আইনশাস্ত্র',
    description_en: 'Islamic Jurisprudence',
  },
  {
    id: 'aqeedah',
    name_bn: 'আকিদা',
    name_en: 'Aqeedah',
    category: 'religious',
    icon: 'Book',
    description_bn: 'ইসলামি বিশ্বাস',
    description_en: 'Islamic Belief',
  },
  {
    id: 'urdu',
    name_bn: 'উর্দু',
    name_en: 'Urdu',
    category: 'religious',
    icon: 'Languages',
    description_bn: 'উর্দু ভাষা শিক্ষা',
    description_en: 'Urdu Language Learning',
  },
  {
    id: 'madrasa_subjects',
    name_bn: 'মাদ্রাসা বিষয়সমূহ',
    name_en: 'Madrasa Subjects',
    category: 'religious',
    icon: 'GraduationCap',
    description_bn: 'দাখিল, আলিম, ফাজিল',
    description_en: 'Dakhil, Alim, Fazil',
  },

  // ============ LANGUAGE TRAINING ============
  {
    id: 'ielts',
    name_bn: 'IELTS',
    name_en: 'IELTS',
    category: 'languages',
    icon: 'Globe2',
    popular: true,
    description_bn: 'IELTS পরীক্ষার প্রস্তুতি',
    description_en: 'IELTS Exam Preparation',
  },
  {
    id: 'toefl',
    name_bn: 'TOEFL',
    name_en: 'TOEFL',
    category: 'languages',
    icon: 'Globe2',
    popular: true,
    description_bn: 'TOEFL পরীক্ষার প্রস্তুতি',
    description_en: 'TOEFL Exam Preparation',
  },
  {
    id: 'spoken_english',
    name_bn: 'স্পোকেন ইংলিশ',
    name_en: 'Spoken English',
    category: 'languages',
    icon: 'Languages',
    popular: true,
    description_bn: 'ইংরেজি কথোপকথন',
    description_en: 'English Conversation',
  },
  {
    id: 'gre',
    name_bn: 'GRE',
    name_en: 'GRE',
    category: 'languages',
    icon: 'GraduationCap',
    description_bn: 'GRE পরীক্ষার প্রস্তুতি',
    description_en: 'GRE Exam Preparation',
  },
  {
    id: 'sat',
    name_bn: 'SAT',
    name_en: 'SAT',
    category: 'languages',
    icon: 'GraduationCap',
    description_bn: 'SAT পরীক্ষার প্রস্তুতি',
    description_en: 'SAT Exam Preparation',
  },
  {
    id: 'french',
    name_bn: 'ফরাসি ভাষা',
    name_en: 'French Language',
    category: 'languages',
    icon: 'Languages',
    description_bn: 'ফরাসি ভাষা শিক্ষা',
    description_en: 'French Language Learning',
  },
  {
    id: 'spanish',
    name_bn: 'স্প্যানিশ ভাষা',
    name_en: 'Spanish Language',
    category: 'languages',
    icon: 'Languages',
    description_bn: 'স্প্যানিশ ভাষা শিক্ষা',
    description_en: 'Spanish Language Learning',
  },
  {
    id: 'german',
    name_bn: 'জার্মান ভাষা',
    name_en: 'German Language',
    category: 'languages',
    icon: 'Languages',
    description_bn: 'জার্মান ভাষা শিক্ষা',
    description_en: 'German Language Learning',
  },
  {
    id: 'japanese',
    name_bn: 'জাপানিজ ভাষা',
    name_en: 'Japanese Language',
    category: 'languages',
    icon: 'Languages',
    description_bn: 'জাপানিজ ভাষা শিক্ষা',
    description_en: 'Japanese Language Learning',
  },
  {
    id: 'korean',
    name_bn: 'কোরিয়ান ভাষা',
    name_en: 'Korean Language',
    category: 'languages',
    icon: 'Languages',
    description_bn: 'কোরিয়ান ভাষা শিক্ষা',
    description_en: 'Korean Language Learning',
  },
  {
    id: 'chinese',
    name_bn: 'চীনা ভাষা',
    name_en: 'Chinese Language',
    category: 'languages',
    icon: 'Languages',
    description_bn: 'চীনা ভাষা শিক্ষা',
    description_en: 'Chinese Language Learning',
  },
  {
    id: 'hindi',
    name_bn: 'হিন্দি ভাষা',
    name_en: 'Hindi Language',
    category: 'languages',
    icon: 'Languages',
    description_bn: 'হিন্দি ভাষা শিক্ষা',
    description_en: 'Hindi Language Learning',
  },

  // ============ ENGINEERING & TECHNOLOGY ============
  {
    id: 'programming_basics',
    name_bn: 'প্রোগ্রামিং বেসিক',
    name_en: 'Programming Basics',
    category: 'engineering',
    icon: 'Code',
    popular: true,
    description_bn: 'প্রোগ্রামিং এর মৌলিক বিষয়',
    description_en: 'Basic Programming Concepts',
  },
  {
    id: 'python',
    name_bn: 'পাইথন',
    name_en: 'Python',
    category: 'engineering',
    icon: 'Code',
    popular: true,
    description_bn: 'পাইথন প্রোগ্রামিং',
    description_en: 'Python Programming',
  },
  {
    id: 'java',
    name_bn: 'জাভা',
    name_en: 'Java',
    category: 'engineering',
    icon: 'Code',
    popular: true,
    description_bn: 'জাভা প্রোগ্রামিং',
    description_en: 'Java Programming',
  },
  {
    id: 'cpp',
    name_bn: 'C/C++',
    name_en: 'C/C++',
    category: 'engineering',
    icon: 'Code',
    popular: true,
    description_bn: 'C এবং C++ প্রোগ্রামিং',
    description_en: 'C and C++ Programming',
  },
  {
    id: 'web_development',
    name_bn: 'ওয়েব ডেভেলপমেন্ট',
    name_en: 'Web Development',
    category: 'engineering',
    icon: 'Globe2',
    popular: true,
    description_bn: 'HTML, CSS, JavaScript',
    description_en: 'HTML, CSS, JavaScript',
  },
  {
    id: 'data_structures',
    name_bn: 'ডেটা স্ট্রাকচার',
    name_en: 'Data Structures',
    category: 'engineering',
    icon: 'Database',
    description_bn: 'ডেটা স্ট্রাকচার ও অ্যালগরিদম',
    description_en: 'Data Structures & Algorithms',
  },
  {
    id: 'database',
    name_bn: 'ডাটাবেস',
    name_en: 'Database',
    category: 'engineering',
    icon: 'Database',
    description_bn: 'SQL, MySQL, PostgreSQL',
    description_en: 'SQL, MySQL, PostgreSQL',
  },
  {
    id: 'machine_learning',
    name_bn: 'মেশিন লার্নিং',
    name_en: 'Machine Learning',
    category: 'engineering',
    icon: 'Brain',
    description_bn: 'মেশিন লার্নিং ও AI',
    description_en: 'Machine Learning & AI',
  },
  {
    id: 'electrical_engineering',
    name_bn: 'ইলেক্ট্রিক্যাল ইঞ্জিনিয়ারিং',
    name_en: 'Electrical Engineering',
    category: 'engineering',
    icon: 'Zap',
    description_bn: 'ইলেক্ট্রিক্যাল বিষয়সমূহ',
    description_en: 'Electrical Engineering Subjects',
  },
  {
    id: 'mechanical_engineering',
    name_bn: 'মেকানিক্যাল ইঞ্জিনিয়ারিং',
    name_en: 'Mechanical Engineering',
    category: 'engineering',
    icon: 'Cog',
    description_bn: 'মেকানিক্যাল বিষয়সমূহ',
    description_en: 'Mechanical Engineering Subjects',
  },
  {
    id: 'civil_engineering',
    name_bn: 'সিভিল ইঞ্জিনিয়ারিং',
    name_en: 'Civil Engineering',
    category: 'engineering',
    icon: 'Building',
    description_bn: 'সিভিল ইঞ্জিনিয়ারিং বিষয়সমূহ',
    description_en: 'Civil Engineering Subjects',
  },

  // ============ MEDICAL STUDIES ============
  {
    id: 'anatomy',
    name_bn: 'অ্যানাটমি',
    name_en: 'Anatomy',
    category: 'medical',
    icon: 'Heart',
    description_bn: 'মানব শরীরের গঠন',
    description_en: 'Human Body Structure',
  },
  {
    id: 'physiology',
    name_bn: 'ফিজিওলজি',
    name_en: 'Physiology',
    category: 'medical',
    icon: 'Activity',
    description_bn: 'শরীরবিদ্যা',
    description_en: 'Body Functions',
  },
  {
    id: 'biochemistry',
    name_bn: 'বায়োকেমিস্ট্রি',
    name_en: 'Biochemistry',
    category: 'medical',
    icon: 'Flask',
    description_bn: 'জৈব রসায়ন',
    description_en: 'Biological Chemistry',
  },
  {
    id: 'pharmacology',
    name_bn: 'ফার্মাকোলজি',
    name_en: 'Pharmacology',
    category: 'medical',
    icon: 'Pill',
    description_bn: 'ঔষধবিদ্যা',
    description_en: 'Drug Science',
  },
  {
    id: 'pathology',
    name_bn: 'প্যাথলজি',
    name_en: 'Pathology',
    category: 'medical',
    icon: 'Microscope',
    description_bn: 'রোগবিদ্যা',
    description_en: 'Disease Study',
  },
  {
    id: 'microbiology',
    name_bn: 'মাইক্রোবায়োলজি',
    name_en: 'Microbiology',
    category: 'medical',
    icon: 'Microscope',
    description_bn: 'অণুজীববিজ্ঞান',
    description_en: 'Microbial Science',
  },
  {
    id: 'surgery',
    name_bn: 'সার্জারি',
    name_en: 'Surgery',
    category: 'medical',
    icon: 'Scissors',
    description_bn: 'শল্যচিকিৎসা',
    description_en: 'Surgical Medicine',
  },
  {
    id: 'medicine',
    name_bn: 'মেডিসিন',
    name_en: 'Medicine',
    category: 'medical',
    icon: 'Stethoscope',
    description_bn: 'চিকিৎসা বিজ্ঞান',
    description_en: 'Medical Science',
  },

  // ============ ARTS & CRAFTS ============
  {
    id: 'drawing',
    name_bn: 'অঙ্কন',
    name_en: 'Drawing',
    category: 'arts',
    icon: 'Palette',
    popular: true,
    description_bn: 'ড্রয়িং ও স্কেচিং',
    description_en: 'Drawing & Sketching',
  },
  {
    id: 'painting',
    name_bn: 'চিত্রাঙ্কন',
    name_en: 'Painting',
    category: 'arts',
    icon: 'Paintbrush',
    popular: true,
    description_bn: 'পেইন্টিং শিল্প',
    description_en: 'Painting Art',
  },
  {
    id: 'music',
    name_bn: 'সঙ্গীত',
    name_en: 'Music',
    category: 'arts',
    icon: 'Music',
    popular: true,
    description_bn: 'গান ও বাদ্যযন্ত্র',
    description_en: 'Singing & Instruments',
  },
  {
    id: 'dance',
    name_bn: 'নৃত্য',
    name_en: 'Dance',
    category: 'arts',
    icon: 'Music',
    description_bn: 'নৃত্যকলা',
    description_en: 'Dance Art',
  },
  {
    id: 'crafts',
    name_bn: 'হস্তশিল্প',
    name_en: 'Handicrafts',
    category: 'arts',
    icon: 'Scissors',
    description_bn: 'হাতের কাজ ও কারুশিল্প',
    description_en: 'Handwork & Crafts',
  },
  {
    id: 'calligraphy',
    name_bn: 'ক্যালিগ্রাফি',
    name_en: 'Calligraphy',
    category: 'arts',
    icon: 'Pen',
    description_bn: 'সুন্দর লেখার শিল্প',
    description_en: 'Beautiful Writing Art',
  },
  {
    id: 'photography',
    name_bn: 'ফটোগ্রাফি',
    name_en: 'Photography',
    category: 'arts',
    icon: 'Camera',
    description_bn: 'ছবি তোলার শিল্প',
    description_en: 'Art of Photography',
  },

  // ============ SKILL DEVELOPMENT ============
  {
    id: 'computer_basics',
    name_bn: 'কম্পিউটার বেসিক',
    name_en: 'Computer Basics',
    category: 'skills',
    icon: 'Computer',
    popular: true,
    description_bn: 'কম্পিউটার পরিচিতি',
    description_en: 'Introduction to Computer',
  },
  {
    id: 'ms_office',
    name_bn: 'মাইক্রোসফট অফিস',
    name_en: 'Microsoft Office',
    category: 'skills',
    icon: 'FileText',
    popular: true,
    description_bn: 'Word, Excel, PowerPoint',
    description_en: 'Word, Excel, PowerPoint',
  },
  {
    id: 'graphic_design',
    name_bn: 'গ্রাফিক ডিজাইন',
    name_en: 'Graphic Design',
    category: 'skills',
    icon: 'Palette',
    popular: true,
    description_bn: 'Photoshop, Illustrator',
    description_en: 'Photoshop, Illustrator',
  },
  {
    id: 'video_editing',
    name_bn: 'ভিডিও এডিটিং',
    name_en: 'Video Editing',
    category: 'skills',
    icon: 'Video',
    description_bn: 'ভিডিও সম্পাদনা',
    description_en: 'Video Editing',
  },
  {
    id: 'digital_marketing',
    name_bn: 'ডিজিটাল মার্কেটিং',
    name_en: 'Digital Marketing',
    category: 'skills',
    icon: 'TrendingUp',
    description_bn: 'অনলাইন মার্কেটিং',
    description_en: 'Online Marketing',
  },
  {
    id: 'excel_advanced',
    name_bn: 'এক্সেল অ্যাডভান্সড',
    name_en: 'Excel Advanced',
    category: 'skills',
    icon: 'BarChart',
    description_bn: 'উন্নত এক্সেল কৌশল',
    description_en: 'Advanced Excel Techniques',
  },
];

// Helper functions
export const getSubjectsByCategory = (categoryId: string): Subject[] => {
  return allSubjects.filter(subject => subject.category === categoryId);
};

export const getPopularSubjects = (): Subject[] => {
  return allSubjects.filter(subject => subject.popular === true);
};

export const searchSubjects = (query: string, language: 'bn' | 'en' = 'bn'): Subject[] => {
  const lowerQuery = query.toLowerCase();
  return allSubjects.filter(subject => {
    const name = language === 'bn' ? subject.name_bn : subject.name_en;
    const description = language === 'bn' ? subject.description_bn : subject.description_en;
    return (
      name.toLowerCase().includes(lowerQuery) ||
      (description && description.toLowerCase().includes(lowerQuery))
    );
  });
};

export const getSubjectById = (id: string): Subject | undefined => {
  return allSubjects.find(subject => subject.id === id);
};

export const getCategoryById = (id: string): SubjectCategory | undefined => {
  return subjectCategories.find(cat => cat.id === id);
};

// Get all unique subject names for dropdowns
export const getAllSubjectNames = (language: 'bn' | 'en' = 'bn'): string[] => {
  return allSubjects.map(s => language === 'bn' ? s.name_bn : s.name_en);
};

/**
 * Automatically assign mediums to subjects based on their category
 * This enriches the subjects array with medium information
 */
export const getSubjectsWithMediums = (): Subject[] => {
  return allSubjects.map(subject => {
    // Assign mediums based on category
    let mediums: string[] = [];
    
    switch (subject.category) {
      case 'primary':
      case 'secondary':
      case 'higher_secondary':
      case 'competitive':
      case 'skills':
        mediums = ['bangla-medium', 'english-medium'];
        break;
      
      case 'english_medium':
        mediums = ['english-medium'];
        break;
      
      case 'religious':
        mediums = ['arabic-medium', 'bangla-medium'];
        break;
      
      case 'language':
        // IELTS, TOEFL are English medium only
        if (subject.id.includes('ielts') || subject.id.includes('toefl') || subject.id.includes('english')) {
          mediums = ['english-medium'];
        } 
        // Arabic language is Arabic medium
        else if (subject.id.includes('arabic')) {
          mediums = ['arabic-medium'];
        }
        // Others can be taught in multiple mediums
        else {
          mediums = ['bangla-medium', 'english-medium'];
        }
        break;
      
      case 'engineering':
      case 'medical':
        // Higher education is typically in English medium
        mediums = ['english-medium', 'bangla-medium'];
        break;
      
      case 'arts':
        // Arts can be taught in any medium
        mediums = ['bangla-medium', 'english-medium'];
        break;
      
      default:
        mediums = ['bangla-medium'];
    }
    
    return {
      ...subject,
      mediums
    };
  });
};

/**
 * Filter subjects by medium
 */
export const getSubjectsByMedium = (mediumId: string): Subject[] => {
  const subjectsWithMediums = getSubjectsWithMediums();
  return subjectsWithMediums.filter(subject => 
    subject.mediums && subject.mediums.includes(mediumId)
  );
};

/**
 * Filter subjects by both category and medium
 */
export const getSubjectsByCategoryAndMedium = (categoryId: string, mediumId: string): Subject[] => {
  const subjectsWithMediums = getSubjectsWithMediums();
  return subjectsWithMediums.filter(subject => 
    subject.category === categoryId && 
    subject.mediums && 
    subject.mediums.includes(mediumId)
  );
};

/**
 * Get popular subjects filtered by medium
 */
export const getPopularSubjectsByMedium = (mediumId?: string): Subject[] => {
  const subjectsWithMediums = getSubjectsWithMediums();
  const popularSubjects = subjectsWithMediums.filter(subject => subject.popular === true);
  
  if (!mediumId) {
    return popularSubjects;
  }
  
  return popularSubjects.filter(subject => 
    subject.mediums && subject.mediums.includes(mediumId)
  );
};
