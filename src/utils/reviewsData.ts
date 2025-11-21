// Review System Data Structure and Utilities
// Supports: Platform Reviews, Google Reviews, Facebook Reviews

export type ReviewSource = 'platform' | 'google' | 'facebook';
export type ReviewerType = 'guardian' | 'teacher' | 'student' | 'donor';
export type ReviewStatus = 'pending' | 'approved' | 'rejected';

export interface Review {
  id: string;
  source: ReviewSource;
  reviewerType: ReviewerType;
  reviewerName: string;
  reviewerImage?: string;
  reviewerLocation?: string;
  rating: number; // 1-5
  title?: string;
  text: string;
  date: Date;
  status: ReviewStatus;
  
  // Platform-specific data
  userId?: string; // For platform reviews
  verified?: boolean;
  
  // External review data
  externalId?: string; // Google/Facebook review ID
  externalUrl?: string; // Link to original review
  
  // Admin actions
  approvedBy?: string;
  approvedAt?: Date;
  rejectedReason?: string;
}

export interface ExternalReviewConnection {
  id: string;
  source: 'google' | 'facebook';
  connected: boolean;
  connectedAt?: Date;
  
  // Google Business
  googlePlaceId?: string;
  googleBusinessName?: string;
  
  // Facebook Page
  facebookPageId?: string;
  facebookPageName?: string;
  facebookAccessToken?: string;
  
  // Stats
  totalReviews: number;
  averageRating: number;
  lastSyncedAt?: Date;
}

// Helper Functions

export function getReviewSourceIcon(source: ReviewSource): string {
  const icons = {
    platform: '⭐',
    google: '🔍',
    facebook: '👍'
  };
  return icons[source];
}

export function getReviewSourceName(source: ReviewSource, language: 'bn' | 'en'): string {
  const names = {
    bn: {
      platform: 'প্ল্যাটফর্ম রিভিউ',
      google: 'গুগল রিভিউ',
      facebook: 'ফেসবুক রিভিউ'
    },
    en: {
      platform: 'Platform Review',
      google: 'Google Review',
      facebook: 'Facebook Review'
    }
  };
  return names[language][source];
}

export function getReviewerTypeLabel(type: ReviewerType, language: 'bn' | 'en'): string {
  const labels = {
    bn: {
      guardian: 'অভিভাবক',
      teacher: 'শিক্ষক',
      student: 'ছাত্র/ছাত্রী',
      donor: 'দাতা'
    },
    en: {
      guardian: 'Guardian',
      teacher: 'Teacher',
      student: 'Student',
      donor: 'Donor'
    }
  };
  return labels[language][type];
}

export function getReviewerTypeColor(type: ReviewerType): string {
  const colors = {
    guardian: 'emerald',
    teacher: 'purple',
    student: 'blue',
    donor: 'pink'
  };
  return colors[type];
}

export function filterApprovedReviews(reviews: Review[]): Review[] {
  return reviews.filter(r => r.status === 'approved');
}

export function filterReviewsBySource(reviews: Review[], source: ReviewSource): Review[] {
  return reviews.filter(r => r.source === source);
}

export function filterReviewsByType(reviews: Review[], type: ReviewerType): Review[] {
  return reviews.filter(r => r.reviewerType === type);
}

export function calculateAverageRating(reviews: Review[]): number {
  if (reviews.length === 0) return 0;
  const sum = reviews.reduce((acc, r) => acc + r.rating, 0);
  return Math.round((sum / reviews.length) * 10) / 10;
}

export function getRatingDistribution(reviews: Review[]): Record<number, number> {
  const distribution: Record<number, number> = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
  reviews.forEach(r => {
    if (r.rating >= 1 && r.rating <= 5) {
      distribution[r.rating]++;
    }
  });
  return distribution;
}

export function sortReviewsByDate(reviews: Review[], order: 'asc' | 'desc' = 'desc'): Review[] {
  return [...reviews].sort((a, b) => {
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();
    return order === 'desc' ? dateB - dateA : dateA - dateB;
  });
}

export function sortReviewsByRating(reviews: Review[], order: 'asc' | 'desc' = 'desc'): Review[] {
  return [...reviews].sort((a, b) => {
    return order === 'desc' ? b.rating - a.rating : a.rating - b.rating;
  });
}

// Mock/Demo Reviews Data
export const mockReviews: Review[] = [
  // Platform Reviews - Guardians
  {
    id: 'pr-001',
    source: 'platform',
    reviewerType: 'guardian',
    reviewerName: 'মিসেস রহিমা খাতুন',
    reviewerImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80',
    reviewerLocation: 'ঢাকা',
    rating: 5,
    title: 'অসাধারণ সেবা',
    text: 'Talent Tutor-এর মাধ্যমে আমার মেয়ের জন্য অসাধারণ একজন গণিতের শিক্ষক পেয়েছি। তার ফলাফল এখন অনেক ভালো। প্রসেসটাও খুবই সহজ ছিল।',
    date: new Date('2024-10-15'),
    status: 'approved',
    userId: 'guardian-001',
    verified: true,
    approvedBy: 'admin-001',
    approvedAt: new Date('2024-10-16')
  },
  {
    id: 'pr-002',
    source: 'platform',
    reviewerType: 'guardian',
    reviewerName: 'জনাব তানভীর আহমেদ',
    reviewerImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80',
    reviewerLocation: 'চট্টগ্রাম',
    rating: 5,
    title: 'খুবই সন্তুষ্ট',
    text: 'আমার মেয়ে গণিতে দুর্বল ছিল। এখন সে A+ পাচ্ছে। শিক্ষক খুব ভালোভাবে পড়ান এবং নিয়মিত আমাকে আপডেট দেন।',
    date: new Date('2024-10-20'),
    status: 'approved',
    userId: 'guardian-002',
    verified: true
  },
  
  // Platform Reviews - Teachers
  {
    id: 'pr-003',
    source: 'platform',
    reviewerType: 'teacher',
    reviewerName: 'প্রফেসর সাদিয়া রহমান',
    reviewerImage: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&q=80',
    reviewerLocation: 'ঢাকা',
    rating: 5,
    title: 'শিক্ষকদের জন্য দারুণ প্ল্যাটফর্ম',
    text: 'খুব সহজেই ছাত্র খুঁজে পেয়েছি। পেমেন্ট সিস্টেম নিরাপদ এবং সময়মতো। ক্রেডিট সিস্টেমটা ভালো লেগেছে।',
    date: new Date('2024-10-18'),
    status: 'approved',
    userId: 'teacher-001',
    verified: true
  },
  {
    id: 'pr-004',
    source: 'platform',
    reviewerType: 'teacher',
    reviewerName: 'মুহাম্মদ কামাল',
    reviewerImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80',
    reviewerLocation: 'সিলেট',
    rating: 4,
    title: 'ভালো অভিজ্ঞতা',
    text: 'প্ল্যাটফর্মটি ব্যবহার করা সহজ এবং নিরাপদ। আরও বেশি টিউশন পোস্ট থাকলে ভালো হতো।',
    date: new Date('2024-10-22'),
    status: 'approved',
    userId: 'teacher-002',
    verified: true
  },
  
  // Platform Reviews - Donors
  {
    id: 'pr-005',
    source: 'platform',
    reviewerType: 'donor',
    reviewerName: 'হাজী আব্দুল করিম',
    reviewerImage: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80',
    reviewerLocation: 'রাজশাহী',
    rating: 5,
    title: 'স্বচ্ছ দান ব্যবস্থা',
    text: 'যাকাত ও দান করার জন্য চমৎকার একটি প্ল্যাটফর্ম। সবকিছু স্বচ্ছ এবং আমি জানতে পারি আমার টাকা কোথায় যাচ্ছে।',
    date: new Date('2024-10-25'),
    status: 'approved',
    userId: 'donor-001',
    verified: true
  },
  
  // Google Reviews
  {
    id: 'gr-001',
    source: 'google',
    reviewerType: 'guardian',
    reviewerName: 'Fatima Rahman',
    reviewerImage: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80',
    reviewerLocation: 'Dhaka, Bangladesh',
    rating: 5,
    text: 'Excellent platform for finding qualified tutors. The verification process gives me peace of mind. Highly recommended!',
    date: new Date('2024-10-12'),
    status: 'approved',
    externalId: 'google-rev-001',
    externalUrl: 'https://g.page/talent-tutor/review'
  },
  {
    id: 'gr-002',
    source: 'google',
    reviewerType: 'teacher',
    reviewerName: 'Ahmed Hossain',
    reviewerImage: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&q=80',
    reviewerLocation: 'Chittagong, Bangladesh',
    rating: 5,
    text: 'Great platform for teachers. Easy to use, transparent payment system, and good support team.',
    date: new Date('2024-10-17'),
    status: 'approved',
    externalId: 'google-rev-002',
    externalUrl: 'https://g.page/talent-tutor/review'
  },
  
  // Facebook Reviews
  {
    id: 'fb-001',
    source: 'facebook',
    reviewerType: 'guardian',
    reviewerName: 'নাজমা আক্তার',
    reviewerImage: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&q=80',
    reviewerLocation: 'খুলনা',
    rating: 5,
    text: 'আমার দুই সন্তানের জন্য আলাদা আলাদা শিক্ষক দরকার ছিল। Talent Tutor-এর মাধ্��মে খুব দ্রুত এবং সহজে উভয়ের জন্য যোগ্য শিক্ষক পেয়েছি। ধন্যবাদ!',
    date: new Date('2024-10-14'),
    status: 'approved',
    externalId: 'fb-rev-001',
    externalUrl: 'https://facebook.com/talenttutor/reviews'
  },
  {
    id: 'fb-002',
    source: 'facebook',
    reviewerType: 'donor',
    reviewerName: 'Kamal Uddin',
    reviewerImage: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=200&q=80',
    reviewerLocation: 'Sylhet',
    rating: 5,
    text: 'অসহায় শিক্ষার্থীদের সাহায্য করার জন্য একটি বিশ্বস্ত মাধ্যম। আল্লাহ এই উদ্যোগকে কবুল করুন।',
    date: new Date('2024-10-19'),
    status: 'approved',
    externalId: 'fb-rev-002',
    externalUrl: 'https://facebook.com/talenttutor/reviews'
  }
];

// Mock External Connections
export const mockExternalConnections: ExternalReviewConnection[] = [
  {
    id: 'conn-google',
    source: 'google',
    connected: true,
    connectedAt: new Date('2024-09-01'),
    googlePlaceId: 'ChIJN1t_tDeuEmsRUsoyG83frY4',
    googleBusinessName: 'Talent Tutor - টিউশন মার্কেটপ্লেস',
    totalReviews: 47,
    averageRating: 4.8,
    lastSyncedAt: new Date('2024-10-26')
  },
  {
    id: 'conn-facebook',
    source: 'facebook',
    connected: true,
    connectedAt: new Date('2024-09-05'),
    facebookPageId: '123456789012345',
    facebookPageName: 'Talent Tutor Bangladesh',
    facebookAccessToken: 'mock-access-token-xxx',
    totalReviews: 89,
    averageRating: 4.9,
    lastSyncedAt: new Date('2024-10-26')
  }
];

// Get all approved reviews
export function getAllApprovedReviews(): Review[] {
  return filterApprovedReviews(mockReviews);
}

// Get reviews for testimonials section (featured/best reviews)
export function getFeaturedReviews(limit: number = 6): Review[] {
  const approved = getAllApprovedReviews();
  const fiveStarReviews = approved.filter(r => r.rating === 5);
  const sorted = sortReviewsByDate(fiveStarReviews);
  return sorted.slice(0, limit);
}

// Get reviews grouped by type
export function getReviewsByType(): Record<ReviewerType, Review[]> {
  const approved = getAllApprovedReviews();
  return {
    guardian: filterReviewsByType(approved, 'guardian'),
    teacher: filterReviewsByType(approved, 'teacher'),
    student: filterReviewsByType(approved, 'student'),
    donor: filterReviewsByType(approved, 'donor')
  };
}

// Get review statistics
export function getReviewStats() {
  const approved = getAllApprovedReviews();
  return {
    total: approved.length,
    averageRating: calculateAverageRating(approved),
    distribution: getRatingDistribution(approved),
    bySource: {
      platform: filterReviewsBySource(approved, 'platform').length,
      google: filterReviewsBySource(approved, 'google').length,
      facebook: filterReviewsBySource(approved, 'facebook').length
    },
    byType: {
      guardian: filterReviewsByType(approved, 'guardian').length,
      teacher: filterReviewsByType(approved, 'teacher').length,
      student: filterReviewsByType(approved, 'student').length,
      donor: filterReviewsByType(approved, 'donor').length
    }
  };
}
