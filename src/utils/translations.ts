/**
 * Talent Tutor Platform - Comprehensive Translation System
 * 
 * This file contains all translations for the platform in English and Bengali.
 * Default language: English (en)
 * Secondary language: Bengali (bn)
 */

export type Language = 'en' | 'bn';

// Common translations used across the platform
export const commonTranslations = {
  en: {
    // Navigation
    home: 'Home',
    about: 'About',
    findTeachers: 'Find Teachers',
    browseTuitions: 'Browse Tuitions',
    blog: 'Blog',
    donation: 'Donation',
    contact: 'Contact',
    help: 'Help Center',
    
    // Authentication
    login: 'Login',
    logout: 'Logout',
    register: 'Register',
    signUp: 'Sign Up',
    signIn: 'Sign In',
    forgotPassword: 'Forgot Password?',
    resetPassword: 'Reset Password',
    
    // User Types
    teacher: 'Teacher',
    guardian: 'Guardian',
    student: 'Student',
    admin: 'Admin',
    donor: 'Donor',
    
    // Dashboard
    dashboard: 'Dashboard',
    profile: 'Profile',
    settings: 'Settings',
    notifications: 'Notifications',
    messages: 'Messages',
    
    // Actions
    save: 'Save',
    cancel: 'Cancel',
    delete: 'Delete',
    edit: 'Edit',
    submit: 'Submit',
    apply: 'Apply',
    view: 'View',
    viewProfile: 'View Profile',
    viewMore: 'View More',
    loadMore: 'Load More',
    search: 'Search',
    filter: 'Filter',
    download: 'Download',
    upload: 'Upload',
    
    // Credits
    credits: 'Credits',
    buyCredits: 'Buy Credits',
    creditBalance: 'Credit Balance',
    freeCredits: 'Free Credits',
    
    // Status
    active: 'Active',
    inactive: 'Inactive',
    pending: 'Pending',
    approved: 'Approved',
    rejected: 'Rejected',
    verified: 'Verified',
    featured: 'Featured',
    urgent: 'Urgent',
    
    // Messages
    success: 'Success',
    error: 'Error',
    warning: 'Warning',
    info: 'Information',
    loading: 'Loading...',
    noData: 'No data available',
    somethingWentWrong: 'Something went wrong',
    
    // Common Fields
    name: 'Name',
    email: 'Email',
    phone: 'Phone',
    address: 'Address',
    location: 'Location',
    description: 'Description',
    date: 'Date',
    time: 'Time',
    subject: 'Subject',
    subjects: 'Subjects',
    
    // Language
    language: 'Language',
    english: 'English',
    bengali: 'বাংলা',
    changeLanguage: 'Change Language',
  },
  bn: {
    // Navigation
    home: 'হোম',
    about: 'আমাদের সম্পর্কে',
    findTeachers: 'শিক্ষক খুঁজুন',
    browseTuitions: 'টিউশন ব্রাউজ করুন',
    blog: 'ব্লগ',
    donation: 'দান',
    contact: 'যোগাযোগ',
    help: 'সহায়তা কেন্দ্র',
    
    // Authentication
    login: 'লগইন',
    logout: 'লগআউট',
    register: 'নিবন্ধন',
    signUp: 'সাইন আপ',
    signIn: 'সাইন ইন',
    forgotPassword: 'পাসওয়ার্ড ভুলে গেছেন?',
    resetPassword: 'পাসওয়ার্ড রিসেট',
    
    // User Types
    teacher: 'শিক্ষক',
    guardian: 'অভিভাবক',
    student: 'ছাত্র/ছাত্রী',
    admin: 'অ্যাডমিন',
    donor: 'দাতা',
    
    // Dashboard
    dashboard: 'ড্যাশবোর্ড',
    profile: 'প্রোফাইল',
    settings: 'সেটিংস',
    notifications: 'বিজ্ঞপ্তি',
    messages: 'বার্তা',
    
    // Actions
    save: 'সংরক্ষণ',
    cancel: 'বাতিল',
    delete: 'মুছুন',
    edit: 'সম্পাদনা',
    submit: 'জমা দিন',
    apply: 'আবেদন করুন',
    view: 'দেখুন',
    viewProfile: 'প্রোফাইল দেখুন',
    viewMore: 'আরও দেখুন',
    loadMore: 'আরও লোড করুন',
    search: 'খুঁজুন',
    filter: 'ফিল্টার',
    download: 'ডাউনলোড',
    upload: 'আপলোড',
    
    // Credits
    credits: 'ক্রেডিট',
    buyCredits: 'ক্রেডিট কিনুন',
    creditBalance: 'ক্রেডিট ব্যালেন্স',
    freeCredits: 'ফ্রি ক্রেডিট',
    
    // Status
    active: 'সক্রিয়',
    inactive: 'নিষ্ক্রিয়',
    pending: 'অপেক্ষমাণ',
    approved: 'অনুমোদিত',
    rejected: 'প্রত্যাখ্যাত',
    verified: 'যাচাইকৃত',
    featured: 'বৈশিষ্ট্যযুক্ত',
    urgent: 'জরুরি',
    
    // Messages
    success: 'সফল',
    error: 'ত্রুটি',
    warning: 'সতর্কতা',
    info: 'তথ্য',
    loading: 'লোড হচ্ছে...',
    noData: 'কোন ডেটা নেই',
    somethingWentWrong: 'কিছু ভুল হয়েছে',
    
    // Common Fields
    name: 'নাম',
    email: 'ইমেইল',
    phone: 'ফোন',
    address: 'ঠিকানা',
    location: 'অবস্থান',
    description: 'বিবরণ',
    date: 'তারিখ',
    time: 'সময়',
    subject: 'বিষয়',
    subjects: 'বিষয়সমূহ',
    
    // Language
    language: 'ভাষা',
    english: 'English',
    bengali: 'বাংলা',
    changeLanguage: 'ভাষা পরিবর্তন',
  },
};

// Homepage translations
export const homeTranslations = {
  en: {
    hero: {
      title: 'Find Your Perfect Teacher',
      subtitle: 'Connect with verified teachers across Bangladesh for personalized learning',
      ctaPrimary: 'Find Teachers',
      ctaSecondary: 'Post Tuition',
    },
    stats: {
      teachers: 'Teachers',
      students: 'Students',
      sessions: 'Sessions Completed',
      satisfaction: 'Satisfaction Rate',
    },
  },
  bn: {
    hero: {
      title: 'আপনার আদর্শ শিক্ষক খুঁজুন',
      subtitle: 'ব্যক্তিগত শিক্ষার জন্য সারা বাংলাদেশ জুড়ে যাচাইকৃত শিক্ষকদের সাথে সংযুক্ত হন',
      ctaPrimary: 'শিক্ষক খুঁজুন',
      ctaSecondary: 'টিউশন পোস্ট করুন',
    },
    stats: {
      teachers: 'শিক্ষক',
      students: 'শিক্ষার্থী',
      sessions: 'সেশন সম্পন্ন',
      satisfaction: 'সন্তুষ্টির হার',
    },
  },
};

// Dashboard translations
export const dashboardTranslations = {
  en: {
    welcome: 'Welcome',
    overview: 'Overview',
    recentActivity: 'Recent Activity',
    quickActions: 'Quick Actions',
    statistics: 'Statistics',
    earnings: 'Earnings',
    applications: 'Applications',
    jobs: 'Jobs',
    contracts: 'Contracts',
  },
  bn: {
    welcome: 'স্বাগতম',
    overview: 'সংক্ষিপ্ত বিবরণ',
    recentActivity: 'সাম্প্রতিক কার্যকলাপ',
    quickActions: 'দ্রুত কাজ',
    statistics: 'পরিসংখ্যান',
    earnings: 'আয়',
    applications: 'আবেদন',
    jobs: 'চাকরি',
    contracts: 'চুক্তি',
  },
};

// Settings translations
export const settingsTranslations = {
  en: {
    settings: 'Settings',
    account: 'Account',
    notifications: 'Notifications',
    privacy: 'Privacy',
    security: 'Security',
    preferences: 'Preferences',
    accountSettings: 'Account Settings',
    fullName: 'Full Name',
    email: 'Email',
    phone: 'Phone',
    bio: 'Bio',
    profilePicture: 'Profile Picture',
    changePhoto: 'Change Photo',
    notificationSettings: 'Notification Settings',
    emailNotifications: 'Email Notifications',
    pushNotifications: 'Push Notifications',
    smsNotifications: 'SMS Notifications',
    jobAlerts: 'Job Alerts',
    messageAlerts: 'Message Alerts',
    paymentAlerts: 'Payment Alerts',
    weeklyReport: 'Weekly Report',
    privacySettings: 'Privacy Settings',
    profileVisibility: 'Profile Visibility',
    public: 'Public',
    private: 'Private',
    registered: 'Registered Users',
    showEmail: 'Show Email',
    showPhone: 'Show Phone',
    showLocation: 'Show Location',
    securitySettings: 'Security Settings',
    changePassword: 'Change Password',
    currentPassword: 'Current Password',
    newPassword: 'New Password',
    confirmPassword: 'Confirm Password',
    twoFactorAuth: 'Two-Factor Authentication',
    enableTwoFactor: 'Enable Two-Factor',
    preferencesSettings: 'Preferences Settings',
    languagePreference: 'Language',
    bengali: 'বাংলা',
    english: 'English',
    theme: 'Theme',
    light: 'Light',
    dark: 'Dark',
    timezone: 'Timezone',
    save: 'Save',
    cancel: 'Cancel',
    update: 'Update',
    delete: 'Delete',
    export: 'Export',
    dataAndAccount: 'Data & Account',
    exportData: 'Export Data',
    exportDataDesc: 'Download all your data',
    deleteAccount: 'Delete Account',
    deleteAccountDesc: 'Permanently delete your account',
    deleteAccountConfirm: 'Are you sure?',
    deleteAccountWarning: 'This action cannot be undone. All your data will be permanently deleted.',
    settingsSaved: 'Settings saved!',
    passwordChanged: 'Password changed successfully!',
    passwordMismatch: 'New passwords do not match!',
    accountDeleted: 'Account deleted. We will miss you!',
    dataExported: 'Your data download has started!',
  },
  bn: {
    settings: 'সেটিংস',
    account: 'একাউন্ট',
    notifications: 'বিজ্ঞপ্তি',
    privacy: 'গোপনীয়তা',
    security: 'নিরাপত্তা',
    preferences: 'পছন্দসমূহ',
    accountSettings: 'একাউন্ট সেটিংস',
    fullName: 'পূর্ণ নাম',
    email: 'ইমেইল',
    phone: 'ফোন',
    bio: 'বায়ো',
    profilePicture: 'প্রোফাইল ছবি',
    changePhoto: 'ছবি পরিবর্তন করুন',
    notificationSettings: 'বিজ্ঞপ্তি সেটিংস',
    emailNotifications: 'ইমেইল বিজ্ঞপ্তি',
    pushNotifications: 'পুশ বিজ্ঞপ্তি',
    smsNotifications: 'এসএমএস বিজ্ঞপ্তি',
    jobAlerts: 'জব সতর্কতা',
    messageAlerts: 'বার্তা সতর্কতা',
    paymentAlerts: 'পেমেন্ট সতর্কতা',
    weeklyReport: 'সাপ্তাহিক রিপোর্ট',
    privacySettings: 'গোপনীয়তা সেটিংস',
    profileVisibility: 'প্রোফাইল দৃশ্যমানতা',
    public: 'সর্বজনীন',
    private: 'ব্যক্তিগত',
    registered: 'নিবন্ধিত ইউজার',
    showEmail: 'ইমেইল দেখান',
    showPhone: 'ফোন দেখান',
    showLocation: 'অবস্থান দেখান',
    securitySettings: 'নিরাপত্তা সেটিংস',
    changePassword: 'পাসওয়ার্ড পরিবর্তন',
    currentPassword: 'বর্তমান পাসওয়ার্ড',
    newPassword: 'নতুন পাসওয়ার্ড',
    confirmPassword: 'পাসওয়ার্ড নিশ্চিত করুন',
    twoFactorAuth: 'টু-ফ্যাক্টর প্রমাণীকরণ',
    enableTwoFactor: 'টু-ফ্যাক্টর সক্রিয় করুন',
    preferencesSettings: 'পছন্দ সেটিংস',
    languagePreference: 'ভাষা',
    bengali: 'বাংলা',
    english: 'English',
    theme: 'থিম',
    light: 'লাইট',
    dark: 'ডার্ক',
    timezone: 'টাইমজোন',
    save: 'সংরক্ষণ করুন',
    cancel: 'বাতিল',
    update: 'আপডেট করুন',
    delete: 'ডিলিট',
    export: 'এক্সপোর্ট',
    dataAndAccount: 'ডেটা ও একাউন্ট',
    exportData: 'ডেটা এক্সপোর্ট করুন',
    exportDataDesc: 'আপনার সব ডেটা ডাউনলোড করুন',
    deleteAccount: 'একাউন্ট মুছুন',
    deleteAccountDesc: 'স্থায়ীভাবে একাউন্ট মুছে ফেলুন',
    deleteAccountConfirm: 'আপনি কি নিশ্চিত?',
    deleteAccountWarning: 'এই কাজটি পূর্বাবস্থায় ফেরানো যাবে না। আপনার সব ডেটা স্থায়ীভাবে মুছে যাবে।',
    settingsSaved: 'সেটিংস সংরক্ষিত হয়েছে!',
    passwordChanged: 'পাসওয়ার্ড সফলভাবে পরিবর্তন হয়েছে!',
    passwordMismatch: 'নতুন পাসওয়ার্ড মিলছে না!',
    accountDeleted: 'একাউন্ট মুছে ফেলা হয়েছে। আপনাকে মিস করব!',
    dataExported: 'আপনার ডেটা ডাউনলোড শুরু হয়েছে!',
  },
};

// Helper function to get translation
export function getTranslation(translations: any, language: Language, key: string): string {
  const keys = key.split('.');
  let value = translations[language];
  
  for (const k of keys) {
    if (value && typeof value === 'object' && k in value) {
      value = value[k];
    } else {
      return key; // Return key if translation not found
    }
  }
  
  return typeof value === 'string' ? value : key;
}

// Export all translations
export const translations = {
  common: commonTranslations,
  home: homeTranslations,
  dashboard: dashboardTranslations,
  settings: settingsTranslations,
};

export default translations;
