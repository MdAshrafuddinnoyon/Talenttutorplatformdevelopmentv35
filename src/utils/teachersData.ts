// Comprehensive teachers database for Upwork-style marketplace

export interface Teacher {
  id: string;
  name: string;
  title: string;
  photo: string;
  hourlyRate: {
    min: number;
    max: number;
  };
  location: string;
  verified: boolean;
  topRated: boolean;
  rating: number;
  totalReviews: number;
  jobSuccess: number; // percentage
  totalEarnings: number;
  totalJobs: number;
  completedJobs: number;
  ongoingJobs: number;
  availability: 'available' | 'busy' | 'offline';
  responseTime: string;
  languages: string[];
  subjects: string[];
  classes: string[];
  medium: string[]; // Bangla, English, Both
  experience: number; // years
  education: {
    degree: string;
    institution: string;
    year: string;
  }[];
  certifications: {
    name: string;
    issuer: string;
    year: string;
  }[];
  skills: string[];
  bio: string;
  videoIntro?: string;
  videoUrl?: string; // YouTube video URL
  portfolio: {
    title: string;
    description: string;
    image?: string;
  }[];
  workHistory: {
    title: string;
    client: string;
    duration: string;
    description: string;
    rating: number;
    earnings: number;
  }[];
  testimonials: {
    client: string;
    rating: number;
    comment: string;
    date: string;
  }[];
  lastActive: string;
  memberSince: string;
}

export const teachersDatabase: Teacher[] = [
  {
    id: '1',
    name: 'মোহাম্মদ রাকিব',
    title: 'SSC/HSC গণিত ও পদার্থবিজ্ঞান বিশেষজ্ঞ | ঢাবি গ্র্যাজুয়েট',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80',
    hourlyRate: {
      min: 500,
      max: 800,
    },
    location: 'ধানমন্ডি, ঢাকা',
    verified: true,
    topRated: true,
    rating: 4.9,
    totalReviews: 87,
    jobSuccess: 98,
    totalEarnings: 450000,
    totalJobs: 45,
    completedJobs: 42,
    ongoingJobs: 3,
    availability: 'available',
    responseTime: '১ ঘণ্টার মধ্যে',
    languages: ['বাংলা', 'English'],
    subjects: ['গণিত', 'পদার্থবিজ্ঞান', 'উচ্চতর গণিত'],
    classes: ['ক্লাস ৯', 'ক্লাস ১০', 'HSC'],
    medium: ['বাংলা', 'English'],
    experience: 7,
    education: [
      {
        degree: 'পদার্থবিজ্ঞানে স্নাতক',
        institution: 'ঢাকা বিশ্ববিদ্যালয়',
        year: '২০১৮',
      },
      {
        degree: 'পদার্থবিজ্ঞানে স্নাতকোত্তর',
        institution: 'ঢাকা বিশ্ববিদ্যালয়',
        year: '২০২০',
      },
    ],
    certifications: [
      {
        name: 'Advanced Mathematics Teaching',
        issuer: 'Cambridge Assessment',
        year: '২০২১',
      },
      {
        name: 'Physics Education Specialist',
        issuer: 'British Council',
        year: '২০২২',
      },
    ],
    skills: ['গণিত', 'পদার্থবিজ্ঞান', 'Problem Solving', 'Conceptual Teaching', 'Exam Preparation'],
    bio: 'আমি ৭ বছরের অভিজ্ঞ শিক্ষক। ঢাকা বিশ্ববিদ্যালয় থেকে পদার্থবিজ্ঞানে স্নাতকোত্তর সম্পন্ন করেছি। আমার লক্ষ্য হলো শিক্ষার্থীদের মধ্যে বিষয়ের প্রতি আগ্রহ তৈরি করা এবং conceptual clarity আনা। আমি গত ৭ বছরে ১০০+ শিক্ষার্থীকে SSC এবং HSC তে A+ পেতে সাহায্য করেছি।',
    videoIntro: 'https://example.com/intro-video-1',
    videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    portfolio: [
      {
        title: 'SSC 2024 Batch - 100% A+ Results',
        description: '১৫ জন শিক্ষার্থী সবাই গণিত ও পদার্থবিজ্ঞানে A+ পেয়েছে',
      },
      {
        title: 'HSC Physics Special Notes',
        description: 'সম্পূর্ণ HSC পদার্থবিজ্ঞান সিলেবাসের হাতে লেখা নোট',
      },
    ],
    workHistory: [
      {
        title: 'HSC Physics & Math Tuition',
        client: 'জনাব করিম',
        duration: '৬ মাস',
        description: 'একজন HSC শিক্ষার্থীকে পদার্থবিজ্ঞান ও উচ্চতর গণিত পড়িয়েছি। ছাত্র উভয় বিষয়ে A+ পেয়েছে।',
        rating: 5.0,
        earnings: 48000,
      },
      {
        title: 'SSC Math Crash Course',
        client: 'মিসেস রহমান',
        duration: '৩ মাস',
        description: 'SSC পরীক্ষার আগে ৩ মাসের intensive math course। ছাত্র গণিতে A+ পেয়েছে।',
        rating: 4.9,
        earnings: 24000,
      },
    ],
    testimonials: [
      {
        client: 'জনাব করিম',
        rating: 5.0,
        comment: 'অসাধারণ শিক্ষক! আমার ছেলে তার কাছে পড়ে পদার্থবিজ্ঞান এ A+ পেয়েছে। তার teaching method খুবই কার্যকর।',
        date: '১৫ অক্টোবর, ২০২৫',
      },
      {
        client: 'মিসেস রহমান',
        rating: 4.9,
        comment: 'খুব ধৈর্যশীল এবং dedicated শিক্ষক। আমার মেয়ে গণিতে দুর্বল ছিল কিন্তু তার সাহায্যে A+ পেয়েছে।',
        date: '৫ সেপ্টেম্বর, ২০২৫',
      },
    ],
    lastActive: 'এখন অনলাইনে',
    memberSince: 'জানুয়ারি ২০১৮',
  },
  {
    id: '2',
    name: 'সাদিয়া আফরিন',
    title: 'O/A Level Math, Physics & Chemistry Expert | Cambridge Certified',
    photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80',
    hourlyRate: {
      min: 700,
      max: 1000,
    },
    location: 'গুলশান, ঢাকা',
    verified: true,
    topRated: true,
    rating: 5.0,
    totalReviews: 62,
    jobSuccess: 100,
    totalEarnings: 680000,
    totalJobs: 38,
    completedJobs: 35,
    ongoingJobs: 3,
    availability: 'available',
    responseTime: '৩০ মিনিটের মধ্যে',
    languages: ['English', 'বাংলা'],
    subjects: ['Mathematics', 'Physics', 'Chemistry', 'Biology'],
    classes: ['O Level', 'A Level', 'IGCSE'],
    medium: ['English'],
    experience: 9,
    education: [
      {
        degree: 'BSc in Chemistry',
        institution: 'Imperial College London',
        year: '2015',
      },
      {
        degree: 'MSc in Chemical Engineering',
        institution: 'University of Cambridge',
        year: '2017',
      },
    ],
    certifications: [
      {
        name: 'Cambridge IGCSE Teacher Training',
        issuer: 'Cambridge Assessment',
        year: '2018',
      },
      {
        name: 'A Level Sciences Specialist',
        issuer: 'Pearson Edexcel',
        year: '2019',
      },
    ],
    skills: ['O/A Level Teaching', 'IGCSE', 'Chemistry', 'Physics', 'Mathematics', 'Exam Techniques'],
    bio: 'I am a Cambridge-certified teacher with 9 years of experience in teaching O/A Level sciences and mathematics. I have studied at Imperial College London and University of Cambridge. My students consistently achieve A*/A grades in their Cambridge examinations. I focus on conceptual understanding and exam techniques.',
    videoIntro: 'https://example.com/intro-video-2',
    portfolio: [
      {
        title: 'A Level Chemistry - 95% A* Rate',
        description: 'My last batch of 20 students - 19 achieved A*, 1 achieved A',
      },
      {
        title: 'O Level Math - Perfect Score Achievement',
        description: '5 students achieved perfect 100/100 in O Level Math',
      },
    ],
    workHistory: [
      {
        title: 'A Level Chemistry & Physics',
        client: 'Mr. Rahman',
        duration: '১ বছর',
        description: 'Taught A Level Chemistry and Physics to a student preparing for Cambridge exams. Student achieved A* in both subjects.',
        rating: 5.0,
        earnings: 120000,
      },
      {
        title: 'O Level Math & Sciences',
        client: 'Mrs. Khan',
        duration: '৮ মাস',
        description: 'Complete O Level Math, Physics, Chemistry, and Biology tutoring. Student got 8 A*s in total.',
        rating: 5.0,
        earnings: 96000,
      },
    ],
    testimonials: [
      {
        client: 'Mr. Rahman',
        rating: 5.0,
        comment: 'Excellent teacher! My daughter got A* in both Chemistry and Physics thanks to her teaching. She explains complex topics very clearly.',
        date: 'October 20, 2025',
      },
      {
        client: 'Mrs. Khan',
        rating: 5.0,
        comment: 'Best O Level teacher in Dhaka! My son improved from C grades to A*s. Highly recommended!',
        date: 'September 8, 2025',
      },
    ],
    lastActive: 'এখন অনলাইনে',
    memberSince: 'মার্চ ২০১৬',
  },
  {
    id: '3',
    name: 'আরিফুল ইসলাম',
    title: 'IELTS Expert | 8.5 Band Holder | British Council Certified',
    photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80',
    hourlyRate: {
      min: 600,
      max: 900,
    },
    location: 'বনানী, ঢাকা',
    verified: true,
    topRated: true,
    rating: 4.8,
    totalReviews: 95,
    jobSuccess: 96,
    totalEarnings: 520000,
    totalJobs: 58,
    completedJobs: 55,
    ongoingJobs: 3,
    availability: 'busy',
    responseTime: '২ ঘণ্টার মধ্যে',
    languages: ['English', 'বাংলা'],
    subjects: ['English', 'IELTS', 'Spoken English', 'Grammar'],
    classes: ['Adult Learning', 'University', 'Professional'],
    medium: ['English'],
    experience: 6,
    education: [
      {
        degree: 'BA in English Literature',
        institution: 'University of Dhaka',
        year: '2017',
      },
      {
        degree: 'MA in Applied Linguistics',
        institution: 'North South University',
        year: '2019',
      },
    ],
    certifications: [
      {
        name: 'IELTS Teacher Training',
        issuer: 'British Council',
        year: '2020',
      },
      {
        name: 'TESOL Certification',
        issuer: 'Trinity College London',
        year: '2021',
      },
    ],
    skills: ['IELTS Preparation', 'Spoken English', 'Academic Writing', 'Grammar', 'Pronunciation'],
    bio: 'IELTS এ ৮.৫ ব্যান্ড স্কোর সহ আমি একজন British Council certified IELTS instructor। ৬ বছরে ২০০+ students কে তাদের desired band score অর্জনে সাহায্য করেছি। আমার structured approach এবং personalized feedback এর মাধ্যমে students দ্রুত improvement করে।',
    videoIntro: 'https://example.com/intro-video-3',
    portfolio: [
      {
        title: 'IELTS Success Stories - 7+ Band',
        description: '৮০% students ৭+ band achieve করেছে আমার guidance এ',
      },
      {
        title: 'Speaking Module Mastery',
        description: 'Special techniques for IELTS Speaking - Average 7.5 band',
      },
    ],
    workHistory: [
      {
        title: 'IELTS Preparation - Overall 8.0',
        client: 'Tanzila Begum',
        duration: '৩ মাস',
        description: 'Complete IELTS preparation for Canada immigration. Student achieved Overall 8.0 (L:8.5, R:8.0, W:7.5, S:7.5)',
        rating: 5.0,
        earnings: 36000,
      },
      {
        title: 'IELTS Academic - Band 7.5',
        client: 'Fahim Ahmed',
        duration: '২ মাস',
        description: 'Intensive IELTS preparation for UK university. Student got 7.5 overall.',
        rating: 4.8,
        earnings: 24000,
      },
    ],
    testimonials: [
      {
        client: 'Tanzila Begum',
        rating: 5.0,
        comment: 'Best IELTS teacher! আমি overall 8.0 পেয়েছি। His teaching methods are very effective. Highly recommended!',
        date: '১০ অক্টোবর, ২০২৫',
      },
      {
        client: 'Fahim Ahmed',
        rating: 4.8,
        comment: 'Very knowledgeable instructor. Speaking এবং Writing এ আমার significant improvement হয়েছে।',
        date: '২৫ সেপ্টেম্বর, ২০২৫',
      },
    ],
    lastActive: '২ ঘণ্টা আগে',
    memberSince: 'জুন ২০১৯',
  },
  {
    id: '4',
    name: 'ফাতিমা জাহান',
    title: 'Primary & Junior School All Subjects | Montessori Trained',
    photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80',
    hourlyRate: {
      min: 400,
      max: 600,
    },
    location: 'মিরপুর, ঢাকা',
    verified: true,
    topRated: false,
    rating: 4.7,
    totalReviews: 43,
    jobSuccess: 94,
    totalEarnings: 280000,
    totalJobs: 52,
    completedJobs: 49,
    ongoingJobs: 3,
    availability: 'available',
    responseTime: '১ ঘণ্টার মধ্যে',
    languages: ['বাংলা', 'English'],
    subjects: ['সব বিষয়', 'বাংলা', 'ইংরেজি', 'গণিত', 'বিজ্ঞান'],
    classes: ['ক্লাস ১', 'ক্লাস ২', 'ক্লাস ৩', 'ক্লাস ৪', 'ক্লাস ৫'],
    medium: ['বাংলা', 'English'],
    experience: 5,
    education: [
      {
        degree: 'B.Ed in Primary Education',
        institution: 'Teachers Training College, Dhaka',
        year: '2019',
      },
    ],
    certifications: [
      {
        name: 'Montessori Teacher Training',
        issuer: 'Association Montessori Internationale',
        year: '2020',
      },
      {
        name: 'Child Psychology Certificate',
        issuer: 'Bangladesh Psychological Association',
        year: '2021',
      },
    ],
    skills: ['Primary Education', 'Creative Teaching', 'Child Psychology', 'Activity-based Learning', 'Patience'],
    bio: 'আমি ছোট বাচ্চাদের পড়ানোতে বিশেষজ্ঞ। Montessori পদ্ধতিতে trained হয়ে আমি বাচ্চাদের মজার ও creative উপায়ে পড়াই। আমার লক্ষ্য শুধু পড়া নয়, বাচ্চাদের মধ্যে শেখার আগ্রহ তৈরি করা।',
    portfolio: [
      {
        title: 'Creative Learning Activities',
        description: 'Fun and engaging activities for primary students',
      },
    ],
    workHistory: [
      {
        title: 'Class 1-3 All Subjects',
        client: 'Mrs. Haque',
        duration: '১ বছর',
        description: 'Taught all subjects to twin children. Both improved significantly in reading and math.',
        rating: 4.8,
        earnings: 48000,
      },
    ],
    testimonials: [
      {
        client: 'Mrs. Haque',
        rating: 4.8,
        comment: 'খুব ভালো শিক্ষক। আমার বাচ্চারা তার কাছে পড়তে খুব পছন্দ করে। She makes learning fun!',
        date: '১ অক্টোবর, ২০২৫',
      },
    ],
    lastActive: 'এখন অনলাইনে',
    memberSince: 'আগস্ট ২০২০',
  },
  {
    id: '5',
    name: 'তানভীর হাসান',
    title: 'Web Development & Programming | JavaScript, Python Expert',
    photo: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&q=80',
    hourlyRate: {
      min: 800,
      max: 1200,
    },
    location: 'উত্তরা, ঢাকা',
    verified: true,
    topRated: true,
    rating: 4.9,
    totalReviews: 71,
    jobSuccess: 97,
    totalEarnings: 920000,
    totalJobs: 64,
    completedJobs: 62,
    ongoingJobs: 2,
    availability: 'available',
    responseTime: '১ ঘণ্টার মধ্যে',
    languages: ['বাংলা', 'English'],
    subjects: ['Programming', 'Web Development', 'Python', 'JavaScript', 'React'],
    classes: ['University', 'Professional', 'Adult Learning'],
    medium: ['English', 'বাংলা'],
    experience: 8,
    education: [
      {
        degree: 'BSc in Computer Science',
        institution: 'BUET',
        year: '2016',
      },
      {
        degree: 'MSc in Software Engineering',
        institution: 'BUET',
        year: '2018',
      },
    ],
    certifications: [
      {
        name: 'Full Stack Web Development',
        issuer: 'Meta (Facebook)',
        year: '2021',
      },
      {
        name: 'Python for Data Science',
        issuer: 'IBM',
        year: '2022',
      },
    ],
    skills: ['JavaScript', 'Python', 'React', 'Node.js', 'Django', 'Web Development', 'Data Structures'],
    bio: 'BUET থেকে Software Engineering এ স্নাতকোত্তর। ৮ বছরের professional experience এবং ৫ বছরের teaching experience। আমি beginners থেকে advanced level পর্যন্ত programming এবং web development পড়াই। Real-world projects এর মাধ্যমে হাতে-কলমে শেখাই।',
    videoIntro: 'https://example.com/intro-video-5',
    portfolio: [
      {
        title: 'Full Stack Course - 30+ Projects',
        description: 'Complete web development course with hands-on projects',
      },
      {
        title: 'Python Bootcamp Success',
        description: '50+ students now working as developers',
      },
    ],
    workHistory: [
      {
        title: 'Full Stack Development Course',
        client: 'Raihan Khan',
        duration: '৬ মাস',
        description: 'Complete full stack web development training. Student now working at a tech company.',
        rating: 5.0,
        earnings: 72000,
      },
    ],
    testimonials: [
      {
        client: 'Raihan Khan',
        rating: 5.0,
        comment: 'Best programming teacher! His teaching style is very practical. এখন আমি একটি tech company তে developer হিসেবে কাজ করছি।',
        date: '১৫ অক্টোবর, ২০২৫',
      },
    ],
    lastActive: 'এখন অনলাইনে',
    memberSince: 'ফেব্রুয়ারি ২০১৭',
  },
  {
    id: '6',
    name: 'ফাতিমা জাহান',
    title: 'Primary & Junior School All Subjects | Montessori Trained',
    photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80',
    hourlyRate: {
      min: 400,
      max: 600,
    },
    location: 'মিরপুর, ঢাকা',
    verified: true,
    topRated: true,
    rating: 4.7,
    totalReviews: 58,
    jobSuccess: 94,
    totalEarnings: 280000,
    totalJobs: 52,
    completedJobs: 49,
    ongoingJobs: 3,
    availability: 'available',
    responseTime: '১ ঘণ্টার মধ্যে',
    languages: ['বাংলা', 'English'],
    subjects: ['সব বিষয়', 'বাংলা', 'ইংরেজি', 'গণিত', 'বিজ্ঞান'],
    classes: ['ক্লাস ১', 'ক্লাস ২', 'ক্লাস ৩', 'ক্লাস ৪', 'ক্লাস ৫'],
    medium: ['বাংলা', 'English'],
    experience: 5,
    education: [
      {
        degree: 'B.Ed in Primary Education',
        institution: 'Teachers Training College, Dhaka',
        year: '২০১৯',
      },
    ],
    certifications: [
      {
        name: 'Montessori Teacher Training',
        issuer: 'Association Montessori Internationale',
        year: '২০২০',
      },
      {
        name: 'Child Psychology Certificate',
        issuer: 'Bangladesh Psychological Association',
        year: '২০২১',
      },
    ],
    skills: ['Primary Education', 'Creative Teaching', 'Child Psychology', 'Activity-based Learning', 'Patience'],
    bio: 'আমি ছোট বাচ্চাদের পড়ানোতে বিশেষজ্ঞ। Montessori পদ্ধতিতে trained হয়ে আমি বাচ্চাদের মজার ও creative উপায়ে পড়াই। আমার লক্ষ্য শুধু পড়া নয়, বাচ্চাদের মধ্যে শেখার আগ্রহ তৈরি করা।',
    videoIntro: '',
    portfolio: [
      {
        title: 'Fun Learning Activities',
        description: 'আমি ছোট বাচ্চাদের জন্য বিভিন্ন creative learning activities তৈরি করি যা তাদের শিক্ষাকে মজাদার করে তোলে।',
      },
      {
        title: 'Montessori Materials Collection',
        description: 'Montessori পদ্ধতির জন্য বিশেষভাবে তৈরি শিক্ষা উপকরণ।',
      },
    ],
    workHistory: [
      {
        title: 'Primary Tuition - All Subjects',
        client: 'মিসেস নাজমা',
        duration: '১ বছর',
        description: 'ক্লাস ৩ এর একটি বাচ্চাকে সব বিষয় পড়িয়েছি। বাচ্চা পরীক্ষায় ভালো ফলাফল করেছে এবং পড়াশোনায় আগ্রহী হয়ে উঠেছে।',
        rating: 5.0,
        earnings: 48000,
      },
      {
        title: 'Montessori-based Learning',
        client: 'জনাব রহমান',
        duration: '৮ মাস',
        description: 'ক্লাস ১ এর বাচ্চাকে Montessori method ব্যবহার করে পড়িয়েছি। বাচ্চার reading ও writing skill অনেক উন্নতি হয়েছে।',
        rating: 4.8,
        earnings: 32000,
      },
      {
        title: 'Creative English Teaching',
        client: 'মিসেস সুমাইয়া',
        duration: '৬ মাস',
        description: 'ক্লাস ২ এর বাচ্চাকে ইংরেজি পড়িয়েছি। Songs, stories এবং games এর মাধ্যমে বাচ্চা ইংরেজিতে confident হয়েছে।',
        rating: 4.9,
        earnings: 24000,
      },
    ],
    testimonials: [
      {
        client: 'মিসেস নাজমা',
        rating: 5.0,
        comment: 'আমার মেয়ে Miss Fatima এর কাছে পড়ে অনেক উন্নতি করেছে। তিনি খুব ধৈর্যশীল এবং বাচ্চাদের সাথে ভালো communicate করতে পারেন। পড়ানোর পদ্ধতি খুবই মজাদার এবং কার্যকর।',
        date: '২০ অক্টোবর, ২০২৫',
      },
      {
        client: 'জনাব রহমান',
        rating: 4.8,
        comment: 'আমার ছেলে আগে পড়তে চাইতো না। কিন্তু Miss Fatima এর creative teaching method এ এখন সে পড়াশোনা উপভোগ করে। Montessori approach সত্যিই কাজ করে!',
        date: '১০ অক্টোবর, ২০২৫',
      },
      {
        client: 'মিসেস সুমাইয়া',
        rating: 4.9,
        comment: 'খুব ভালো শিক্ষক! আমার মেয়ে এখন ইংরেজিতে গল্প বলতে পারে। Miss Fatima এর patience ও dedication সত্যিই প্রশংসনীয়।',
        date: '২৫ সেপ্টেম্বর, ২০২৫',
      },
    ],
    lastActive: 'এখন অনলাইনে',
    memberSince: 'আগস্ট ২০২০',
  },
];

export function getTeacherById(id: string): Teacher | undefined {
  return teachersDatabase.find(teacher => teacher.id === id);
}

export function filterTeachers(filters: {
  subject?: string;
  class?: string;
  location?: string;
  minRate?: number;
  maxRate?: number;
  verified?: boolean;
  topRated?: boolean;
}): Teacher[] {
  return teachersDatabase.filter(teacher => {
    if (filters.subject && !teacher.subjects.includes(filters.subject)) return false;
    if (filters.class && !teacher.classes.includes(filters.class)) return false;
    if (filters.location && !teacher.location.includes(filters.location)) return false;
    if (filters.minRate && teacher.hourlyRate.max < filters.minRate) return false;
    if (filters.maxRate && teacher.hourlyRate.min > filters.maxRate) return false;
    if (filters.verified && !teacher.verified) return false;
    if (filters.topRated && !teacher.topRated) return false;
    return true;
  });
}
