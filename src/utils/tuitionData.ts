// Centralized tuition posts data
export interface TuitionPost {
  id: string;
  title: string;
  description: string;
  parent: {
    id?: string;
    name: string;
    avatar: string;
    verified: boolean;
    rating: number;
    postsCount: number;
    memberSince?: string;
    reviews?: number;
    jobsPosted?: number;
  };
  subjects: string[];
  studentClass: string;
  location: string;
  budget: {
    min: number;
    max: number;
  };
  duration: string;
  schedule: string;
  postedDate: Date;
  applicants: number;
  views: number;
  featured: boolean;
  urgent: boolean;
  preferences: {
    gender: string;
    experience: string;
    qualification: string;
  };
  requirements?: string[];
  mode?: string;
  startDate?: string;
}

export const tuitionPosts: TuitionPost[] = [
  {
    id: '1',
    title: 'ক্লাস ১০ - গণিত ও পদার্থবিজ্ঞান শিক্ষক প্রয়োজন',
    description: 'আমার ছেলের জন্য একজন অভিজ্ঞ শিক্ষক খুঁজছি যিনি ক্লাস ১০ এর গণিত এবং পদার্থবিজ্ঞান পড়াতে পারবেন। শিক্ষার্থী SSC 2026 পরীক্ষার প্রস্তুতি নিচ্ছে। শিক্ষকের উচিত কনসেপ্ট ক্লিয়ার করতে পারা এবং সমস্যা সমাধানে দক্ষ হওয়া।',
    parent: {
      id: '2',
      name: 'সাবিনা আক্তার',
      avatar: '',
      verified: true,
      rating: 4.8,
      postsCount: 5,
      memberSince: '২০২৩',
      reviews: 8,
      jobsPosted: 5,
    },
    subjects: ['গণিত', 'পদার্থবিজ্ঞান'],
    studentClass: 'ক্লাস ১০',
    location: 'ধানমন্ডি, ঢাকা',
    budget: {
      min: 15000,
      max: 20000,
    },
    duration: '৬ মাস',
    schedule: '৫ দিন/সপ্তাহ, ২ ঘণ্টা/দিন',
    postedDate: new Date(Date.now() - 1000 * 60 * 30),
    applicants: 12,
    views: 145,
    featured: true,
    urgent: false,
    preferences: {
      gender: 'male',
      experience: '৩+ বছর',
      qualification: 'বিশ্ববিদ্যালয় স্নাতক',
    },
    requirements: [
      'ন্যূনতম স্নাতক ডিগ্রি',
      'গণিত বা পদার্থবিজ্ঞানে ভালো দক্ষতা',
      '৩+ বছরের টিউশন অভিজ্ঞতা',
      'SSC/HSC লেভেল পড়ানোর অভিজ্ঞতা',
    ],
    mode: 'অফলাইন',
    startDate: '১ নভেম্বর, ২০২৫',
  },
  {
    id: '2',
    title: 'IELTS Preparation - Experienced Tutor Needed Urgently',
    description: 'Looking for an experienced IELTS instructor for my daughter. She needs to score at least 7.0 band in 2 months. Must have proven track record and teaching materials.',
    parent: {
      id: '1',
      name: 'Rahima Begum',
      avatar: '',
      verified: true,
      rating: 4.9,
      postsCount: 3,
      memberSince: '২০২৪',
      reviews: 5,
      jobsPosted: 3,
    },
    subjects: ['English', 'IELTS'],
    studentClass: 'Adult Learning',
    location: 'Gulshan, Dhaka',
    budget: {
      min: 25000,
      max: 35000,
    },
    duration: '২ মাস',
    schedule: '৬ দিন/সপ্তাহ, ২ ঘণ্টা/দিন',
    postedDate: new Date(Date.now() - 1000 * 60 * 60),
    applicants: 18,
    views: 203,
    featured: false,
    urgent: true,
    preferences: {
      gender: 'female',
      experience: '৫+ বছর IELTS',
      qualification: 'IELTS 8.0+ holder',
    },
    requirements: [
      'IELTS band 8.0 or higher',
      '৫+ years of IELTS teaching experience',
      'Complete study materials',
      'Mock test provisions',
    ],
    mode: 'অনলাইন/অফলাইন',
    startDate: 'Immediate',
  },
  {
    id: '3',
    title: 'English Medium - O Level Math and Science',
    description: 'Searching for a qualified teacher for O Level Math, Physics and Chemistry. Student is in Year 10 preparing for Cambridge exams in May 2026.',
    parent: {
      id: '3',
      name: 'Ahmed Hassan',
      avatar: '',
      verified: false,
      rating: 4.5,
      postsCount: 2,
      memberSince: '২০২৫',
      reviews: 2,
      jobsPosted: 2,
    },
    subjects: ['Mathematics', 'Physics', 'Chemistry'],
    studentClass: 'O Level',
    location: 'Banani, Dhaka',
    budget: {
      min: 20000,
      max: 28000,
    },
    duration: '৮ মাস',
    schedule: '৪ দিন/সপ্তাহ, ২.৫ ঘণ্টা/দিন',
    postedDate: new Date(Date.now() - 1000 * 60 * 60 * 5),
    applicants: 8,
    views: 127,
    featured: false,
    urgent: false,
    preferences: {
      gender: 'any',
      experience: 'O/A Level teaching',
      qualification: 'Science graduate from reputed university',
    },
    requirements: [
      'O/A Level teaching experience',
      'Cambridge curriculum knowledge',
      'Good communication skills',
      'Own teaching materials',
    ],
    mode: 'অফলাইন',
    startDate: '১৫ নভেম্বর, ২০২৫',
  },
  {
    id: '4',
    title: 'HSC Physics and Chemistry - Expert Teacher Required',
    description: 'Need expert teacher for HSC final preparation. My son is weak in practical concepts. Need someone who can make topics easy and interesting.',
    parent: {
      id: '1',
      name: 'Kamal Ahmed',
      avatar: '',
      verified: true,
      rating: 5.0,
      postsCount: 7,
      memberSince: '২০২২',
      reviews: 12,
      jobsPosted: 7,
    },
    subjects: ['Physics', 'Chemistry'],
    studentClass: 'HSC',
    location: 'Uttara, Dhaka',
    budget: {
      min: 18000,
      max: 22000,
    },
    duration: '৪ মাস',
    schedule: '৬ দিন/সপ্তাহ, ২ ঘণ্টা/দিন',
    postedDate: new Date(Date.now() - 1000 * 60 * 180),
    applicants: 15,
    views: 198,
    featured: false,
    urgent: true,
    preferences: {
      gender: 'any',
      experience: '৪+ বছর',
      qualification: 'Engineering Background',
    },
    requirements: [
      'Engineering or Science background',
      'HSC level teaching experience',
      'Strong practical knowledge',
      'Ability to explain complex topics simply',
    ],
    mode: 'অফলাইন',
    startDate: 'Immediate',
  },
  {
    id: '5',
    title: 'বাংলা মাধ্যম - ক্লাস ৬ সকল বিষয়',
    description: 'আমার ছেল���র পড়াশোনায় মনোযোগ নেই। একজন ভালো শিক্ষক প্রয়োজন যিনি মজার করে পড়াতে পারেন এবং আগ্রহ তৈরি করতে পারেন।',
    parent: {
      id: '2',
      name: 'ফরিদা আক্তার',
      avatar: '',
      verified: true,
      rating: 4.7,
      postsCount: 4,
      memberSince: '২০২৪',
      reviews: 6,
      jobsPosted: 4,
    },
    subjects: ['সকল বিষয়'],
    studentClass: 'ক্লাস ৬',
    location: 'মিরপুর, ঢাকা',
    budget: {
      min: 8000,
      max: 12000,
    },
    duration: '১ বছর',
    schedule: '৫ দিন/সপ্তাহ, ১.৫ ঘণ্টা/দিন',
    postedDate: new Date(Date.now() - 1000 * 60 * 60 * 12),
    applicants: 22,
    views: 267,
    featured: true,
    urgent: false,
    preferences: {
      gender: 'female',
      experience: '২+ বছর',
      qualification: 'স্নাতক',
    },
    requirements: [
      'ধৈর্যশীল এবং বন্ধুত্বপূর্ণ',
      'শিশুদের সাথে ভালো ব্যবহার',
      'মজাদার পদ্ধতিতে পড়ানোর দক্ষতা',
      'নিয়মিত এবং সময়নিষ্ঠ',
    ],
    mode: 'অফলাইন',
    startDate: '১ ডিসেম্বর, ২০২৫',
  },
  {
    id: '6',
    title: 'Programming & Web Development - Online Classes',
    description: 'Looking for an expert programmer to teach Python, JavaScript and Web Development. Student is interested in freelancing and wants to build real projects.',
    parent: {
      id: '4',
      name: 'Tanvir Rahman',
      avatar: '',
      verified: true,
      rating: 4.9,
      postsCount: 6,
      memberSince: '২০২৩',
      reviews: 10,
      jobsPosted: 6,
    },
    subjects: ['Python', 'JavaScript', 'Web Development'],
    studentClass: 'Adult Learning',
    location: 'অনলাইন (যেকোনো স্থান)',
    budget: {
      min: 12000,
      max: 18000,
    },
    duration: '৬ মাস',
    schedule: '৩ দিন/সপ্তাহ, ২ ঘণ্টা/দিন',
    postedDate: new Date(Date.now() - 1000 * 60 * 45),
    applicants: 28,
    views: 342,
    featured: true,
    urgent: false,
    preferences: {
      gender: 'any',
      experience: 'Professional Developer',
      qualification: 'CS Graduate or Self-taught',
    },
    requirements: [
      'Hands-on development experience',
      'Portfolio of real projects',
      'Teaching through project-based learning',
      'Knowledge of latest tech stack',
    ],
    mode: 'অনলাইন',
    startDate: '৫ নভেম্বর, ২০২৫',
  },
  {
    id: '7',
    title: 'ক্লাস ৮ - বিজ্ঞান ও ইংরেজি (মেয়ে শিক্ষক প্রয়োজন)',
    description: 'আমার মেয়ের জন্য একজন অভিজ্ঞ মহিলা শিক্ষক খুঁজছি। বিজ্ঞান বিষয়ে weak এবং ইংরেজিতে ভয় পায়। ধৈর্যশীল শিক্ষক দরকার।',
    parent: {
      id: '5',
      name: 'নাসরিন জাহান',
      avatar: '',
      verified: true,
      rating: 4.6,
      postsCount: 3,
      memberSince: '২০২৪',
      reviews: 4,
      jobsPosted: 3,
    },
    subjects: ['বিজ্ঞান', 'ইংরেজি'],
    studentClass: 'ক্লাস ৮',
    location: 'মোহাম্মদপুর, ঢাকা',
    budget: {
      min: 10000,
      max: 14000,
    },
    duration: '১ বছর',
    schedule: '৪ দিন/সপ্তাহ, ১.৫ ঘণ্টা/দিন',
    postedDate: new Date(Date.now() - 1000 * 60 * 120),
    applicants: 16,
    views: 178,
    featured: false,
    urgent: false,
    preferences: {
      gender: 'female',
      experience: '৩+ বছর',
      qualification: 'বিজ্ঞান স্নাতক',
    },
    requirements: [
      'শুধুমাত্র মহিলা শিক্ষক',
      'ছাত্রীদের পড়ানোর অভিজ্ঞতা',
      'ধৈর্যশীল এবং উৎসাহদায়ক',
      'বাংলা ও ইংরেজি দুটোতেই দক্ষ',
    ],
    mode: 'অফলাইন',
    startDate: '১০ নভেম্বর, ২০২৫',
  },
  {
    id: '8',
    title: 'A Level - Mathematics & Further Math (Edexcel)',
    description: 'Urgent requirement for A Level Math teacher with Edexcel board experience. Student targeting A* grade. Need comprehensive problem-solving practice.',
    parent: {
      id: '6',
      name: 'Dr. Imran Hossain',
      avatar: '',
      verified: true,
      rating: 5.0,
      postsCount: 8,
      memberSince: '২০২২',
      reviews: 15,
      jobsPosted: 8,
    },
    subjects: ['Mathematics', 'Further Mathematics'],
    studentClass: 'A Level',
    location: 'Bashundhara, Dhaka',
    budget: {
      min: 30000,
      max: 40000,
    },
    duration: '১ বছর',
    schedule: '৫ দিন/সপ্তাহ, ৩ ঘণ্টা/দিন',
    postedDate: new Date(Date.now() - 1000 * 60 * 15),
    applicants: 9,
    views: 95,
    featured: true,
    urgent: true,
    preferences: {
      gender: 'any',
      experience: 'A Level Specialist',
      qualification: 'Masters in Mathematics',
    },
    requirements: [
      'Edexcel A Level teaching experience',
      'Further Math expertise',
      'Proven track record of A* students',
      'Complete past papers collection',
      'University lecturer preferred',
    ],
    mode: 'অফলাইন',
    startDate: 'Immediate',
  },
];

export function getTuitionPostById(id: string): TuitionPost | undefined {
  return tuitionPosts.find((post) => post.id === id);
}

export function getFeaturedPosts(): TuitionPost[] {
  return tuitionPosts.filter(post => post.featured);
}

export function getUrgentPosts(): TuitionPost[] {
  return tuitionPosts.filter(post => post.urgent);
}

export function getRecentPosts(limit: number = 5): TuitionPost[] {
  return [...tuitionPosts]
    .sort((a, b) => b.postedDate.getTime() - a.postedDate.getTime())
    .slice(0, limit);
}
