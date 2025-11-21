// Demo Users Data for Testing
// এই ফাইলে সব ধরনের demo users এর data আছে

export interface DemoUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  password: string; // Demo password (হ্যাশ করা হবে production এ)
  role: 'teacher' | 'guardian' | 'student' | 'donor' | 'admin';
  credits: number;
  status: 'active' | 'pending' | 'approved' | 'blocked';
  createdAt: string;
  // Role-specific fields
  [key: string]: any;
}

// ============== 5 DEMO TEACHERS ==============
export const demoTeachers: DemoUser[] = [
  {
    id: 'teacher-demo-001',
    name: 'মোঃ করিম উদ্দিন',
    email: 'karim@teacher.demo',
    phone: '01712345678',
    password: 'teacher123',
    role: 'teacher',
    credits: 50,
    status: 'approved',
    createdAt: '2025-10-01T10:00:00Z',
    subjects: 'গণিত, পদার্থবিজ্ঞান',
    education: 'বিএসসি (পদার্থবিজ্ঞান) - ঢাকা বিশ্ববিদ্যালয়',
    experience: '৮ বছর',
    location: 'ধানমন্ডি, ঢাকা',
    rating: 4.8,
    totalStudents: 15,
    bio: 'অভিজ্ঞ গণিত শিক্ষক। SSC ও HSC পরীক্ষার্থীদের জন্য বিশেষ কৌশল প্রয়োগ করি।',
    photo: 'https://i.pravatar.cc/150?img=12',
  },
  {
    id: 'teacher-demo-002',
    name: 'ফাতেমা আক্তার',
    email: 'fatema@teacher.demo',
    phone: '01823456789',
    password: 'teacher123',
    role: 'teacher',
    credits: 45,
    status: 'approved',
    createdAt: '2025-10-05T14:30:00Z',
    subjects: 'ইংরেজি, বাংলা',
    education: 'এমএ (ইংরেজি) - জাহাঙ্গীরনগর বিশ্ববিদ্যালয়',
    experience: '৫ বছর',
    location: 'মিরপুর, ঢাকা',
    rating: 4.9,
    totalStudents: 12,
    bio: 'ইংরেজি ও বাংলা সাহিত্যে বিশেষজ্ঞ। শিক্ষার্থীদের পড়া মুখস্থ নয়, বোঝার উপর জোর দিই।',
    photo: 'https://i.pravatar.cc/150?img=23',
  },
  {
    id: 'teacher-demo-003',
    name: 'রাকিবুল ইসলাম',
    email: 'rakib@teacher.demo',
    phone: '01934567890',
    password: 'teacher123',
    role: 'teacher',
    credits: 38,
    status: 'approved',
    createdAt: '2025-10-10T09:15:00Z',
    subjects: 'রসায়ন, জীববিজ্ঞান',
    education: 'বিএসসি (রসায়ন) - রাজশাহী বিশ্ববিদ্যালয়',
    experience: '৬ বছর',
    location: 'উত্তরা, ঢাকা',
    rating: 4.7,
    totalStudents: 18,
    bio: 'বিজ্ঞান বিষয়ে হাতে-কলমে শিক্ষা প্রদান করি। মেডিকেল ভর্তি পরীক্ষার জন্য বিশেষ কোর্স।',
    photo: 'https://i.pravatar.cc/150?img=33',
  },
  {
    id: 'teacher-demo-004',
    name: 'সাবিনা ইয়াসমিন',
    email: 'sabina@teacher.demo',
    phone: '01645678901',
    password: 'teacher123',
    role: 'teacher',
    credits: 42,
    status: 'approved',
    createdAt: '2025-10-15T11:45:00Z',
    subjects: 'হিসাববিজ্ঞান, ব্যবসায় শিক্ষা',
    education: 'বিবিএ - নর্থ সাউথ ইউনিভার্সিটি',
    experience: '৪ বছর',
    location: 'গুলশান, ঢাকা',
    rating: 4.6,
    totalStudents: 10,
    bio: 'ব্যবসায় শিক্ষায় বিশেষজ্ঞ। Practical examples দিয়ে শিক্ষা প্রদান করি।',
    photo: 'https://i.pravatar.cc/150?img=44',
  },
  {
    id: 'teacher-demo-005',
    name: 'তানভীর হাসান',
    email: 'tanvir@teacher.demo',
    phone: '01756789012',
    password: 'teacher123',
    role: 'teacher',
    credits: 35,
    status: 'pending',
    createdAt: '2025-10-20T16:20:00Z',
    subjects: 'কম্পিউটার সায়েন্স, ICT',
    education: 'বিএসসি (CSE) - বুয়েট',
    experience: '৩ বছর',
    location: 'বনানী, ঢাকা',
    rating: 4.5,
    totalStudents: 8,
    bio: 'Programming এবং ICT তে হাতে-কলমে শিক্ষা দিই। বিশ্ববিদ্যালয় ভর্তি পরীক্ষার প্রস্তুতি।',
    photo: 'https://i.pravatar.cc/150?img=56',
  },
];

// ============== 5 DEMO GUARDIANS ==============
export const demoGuardians: DemoUser[] = [
  {
    id: 'guardian-demo-001',
    name: 'মিসেস রহিমা খাতুন',
    email: 'rahima@guardian.demo',
    phone: '01812345678',
    password: 'guardian123',
    role: 'guardian',
    credits: 100,
    status: 'active',
    createdAt: '2025-09-25T08:30:00Z',
    location: 'ধানমন্ডি, ঢাকা',
    children: [
      { name: 'আয়েশা রহমান', class: 'ক্লাস ৯', subjects: 'গণিত, ইংরেজি' },
    ],
    activeContracts: 2,
    totalSpent: 24000,
    bio: 'আমার মেয়ের জন্য ভালো মানের শিক্ষক খুঁজছি। SSC পরীক্ষার প্রস্তুতি।',
  },
  {
    id: 'guardian-demo-002',
    name: 'জনাব আহমেদ আলী',
    email: 'ahmed@guardian.demo',
    phone: '01923456789',
    password: 'guardian123',
    role: 'guardian',
    credits: 85,
    status: 'active',
    createdAt: '2025-09-28T10:15:00Z',
    location: 'মিরপুর, ঢাকা',
    children: [
      { name: 'ফাহাদ আহমেদ', class: 'ক্লাস ১০', subjects: 'পদার্থ, রসায়ন' },
      { name: 'ফারহান আহমেদ', class: 'ক্লাস ৮', subjects: 'সব বিষয়' },
    ],
    activeContracts: 3,
    totalSpent: 36000,
    bio: 'দুই ছেলের জন্য বিজ্ঞান বিষয়ে অভিজ্ঞ শিক্ষক প্রয়োজন।',
  },
  {
    id: 'guardian-demo-003',
    name: 'মিসেস নাজমা বেগম',
    email: 'nazma@guardian.demo',
    phone: '01634567890',
    password: 'guardian123',
    role: 'guardian',
    credits: 92,
    status: 'active',
    createdAt: '2025-10-02T12:45:00Z',
    location: 'উত্তরা, ঢাকা',
    children: [
      { name: 'তাসনিম নাজ', class: 'ক্লাস ৭', subjects: 'ইংরেজি, গণিত' },
    ],
    activeContracts: 1,
    totalSpent: 12000,
    bio: 'মেয়ের ইংরেজি দুর্বলতা কাটানোর জন্য experienced teacher চাই।',
  },
  {
    id: 'guardian-demo-004',
    name: 'জনাব কামরুল হাসান',
    email: 'kamrul@guardian.demo',
    phone: '01745678901',
    password: 'guardian123',
    role: 'guardian',
    credits: 78,
    status: 'active',
    createdAt: '2025-10-05T14:20:00Z',
    location: 'গুলশান, ঢাকা',
    children: [
      { name: 'সামিহা কামরুল', class: 'একাদশ', subjects: 'ব্যবসায় শিক্ষা' },
    ],
    activeContracts: 1,
    totalSpent: 18000,
    bio: 'HSC ব্যবসায় শিক্ষা বিভাগের জন্য specialist শিক্ষক দরকার।',
  },
  {
    id: 'guardian-demo-005',
    name: 'মিসেস শাহানা পারভী��',
    email: 'shahana@guardian.demo',
    phone: '01856789012',
    password: 'guardian123',
    role: 'guardian',
    credits: 95,
    status: 'active',
    createdAt: '2025-10-08T09:00:00Z',
    location: 'বনানী, ঢাকা',
    children: [
      { name: 'রাফি শাহানা', class: 'ক্লাস ৬', subjects: 'সব বিষয়' },
    ],
    activeContracts: 1,
    totalSpent: 8000,
    bio: 'ছেলের সব বিষয়ে foundation মজবুত করতে patient teacher চাই।',
  },
];

// ============== 3 DEMO STUDENTS (Help Seekers) ==============
export const demoStudents: DemoUser[] = [
  {
    id: 'student-demo-001',
    name: 'রিয়া আক্তার',
    email: 'riya@student.demo',
    phone: '01967890123',
    password: 'student123',
    role: 'student',
    credits: 0,
    status: 'pending',
    createdAt: '2025-10-12T11:30:00Z',
    class: 'ক্লাস ৯',
    subjects: 'গণিত, বিজ্ঞান',
    location: 'মতিঝিল, ঢাকা',
    reason: 'আমার বাবা-মা নেই। মামা-মামীর সাথে থাকি। টিউশন ফি দিতে পারি না কিন্তু পড়াশোনা করতে চাই।',
    financialStatus: 'অসহায়',
    guardianName: 'মোঃ জামাল (মামা)',
    guardianPhone: '01978901234',
  },
  {
    id: 'student-demo-002',
    name: 'সাকিব হোসেন',
    email: 'sakib@student.demo',
    phone: '01689012345',
    password: 'student123',
    role: 'student',
    credits: 0,
    status: 'approved',
    createdAt: '2025-10-15T13:45:00Z',
    class: 'ক্লাস ১০',
    subjects: 'সব বিষয়',
    location: 'যাত্রাবাড়ী, ঢাকা',
    reason: 'আমার বাবা রিকশা চালান। মা গৃহকর্মী। আমি SSC দিব কিন্তু টিউশন করার টাকা নেই।',
    financialStatus: 'দরিদ্র',
    guardianName: 'মোঃ রহিম (বাবা)',
    guardianPhone: '01790123456',
    assignedTeacher: 'teacher-demo-001',
    assignedTeacherName: 'মোঃ করিম উদ্দিন',
  },
  {
    id: 'student-demo-003',
    name: 'তাসনিয়া ইসলাম',
    email: 'tasniya@student.demo',
    phone: '01501234567',
    password: 'student123',
    role: 'student',
    credits: 0,
    status: 'approved',
    createdAt: '2025-10-18T10:20:00Z',
    class: 'ক্লাস ৮',
    subjects: 'ইংরেজি, গণিত',
    location: 'কামরাঙ্গীরচর, ঢাকা',
    reason: 'আমার বাবা মারা গেছেন। মা শ্রমিক। আমি মেধাবী ছাত্রী কিন্তু টিউশন করার সামর্থ্য নেই।',
    financialStatus: 'অতি দরিদ্র',
    guardianName: 'ফাতেমা বেগম (মা)',
    guardianPhone: '01612345678',
    assignedTeacher: 'teacher-demo-002',
    assignedTeacherName: 'ফাতেমা আক্তার',
  },
];

// ============== 3 DEMO DONORS ==============
export const demoDonors: DemoUser[] = [
  {
    id: 'donor-demo-001',
    name: 'ডঃ মাহমুদুল হাসান',
    email: 'mahmud@donor.demo',
    phone: '01712345690',
    password: 'donor123',
    role: 'donor',
    credits: 0,
    status: 'active',
    createdAt: '2025-09-20T09:00:00Z',
    location: 'গুলশান, ঢাকা',
    profession: 'চিকিৎসক',
    totalDonations: 50000,
    lastDonation: 15000,
    lastDonationDate: '2025-10-25T10:00:00Z',
    donationType: 'যাকাত',
    regularDonor: true,
    bio: 'শিক্ষা সবার অধিকার। আমি নিয়মিত অসহায় শিক্ষার্থীদের সাহায্য করি।',
  },
  {
    id: 'donor-demo-002',
    name: 'জনাব আব্দুল কাদের',
    email: 'kader@donor.demo',
    phone: '01823456791',
    password: 'donor123',
    role: 'donor',
    credits: 0,
    status: 'active',
    createdAt: '2025-09-22T11:30:00Z',
    location: 'মতিঝিল, ঢাকা',
    profession: 'ব্যবসায়ী',
    totalDonations: 80000,
    lastDonation: 20000,
    lastDonationDate: '2025-10-28T14:30:00Z',
    donationType: 'সদকা',
    regularDonor: true,
    bio: 'দরিদ্র মেধাবী শিক্ষার্থীদের সাহায্য করা আমার দায়িত্ব।',
  },
  {
    id: 'donor-demo-003',
    name: 'মিসেস রুখসানা আহমেদ',
    email: 'rukhsana@donor.demo',
    phone: '01934567892',
    password: 'donor123',
    role: 'donor',
    credits: 0,
    status: 'active',
    createdAt: '2025-09-25T13:15:00Z',
    location: 'ধানমন্ডি, ঢাকা',
    profession: 'শিক্ষক (অবসরপ্রাপ্ত)',
    totalDonations: 35000,
    lastDonation: 10000,
    lastDonationDate: '2025-10-30T09:20:00Z',
    donationType: 'সাধারণ দান',
    regularDonor: false,
    bio: 'আমি নিজে শিক্ষক ছিলাম। শিক্ষার গুরুত্ব বুঝি। সাধ্যমত সাহায্য করি।',
  },
];

// ============== ADMIN USER ==============
export const demoAdmin: DemoUser = {
  id: 'admin-001',
  name: 'প্রশাসক',
  email: 'admin@talenttutor.com',
  phone: '01700000000',
  password: 'admin123',
  role: 'admin',
  credits: 0,
  status: 'active',
  createdAt: '2025-01-01T00:00:00Z',
  permissions: ['all'],
};

// ============== ALL DEMO USERS ==============
export const allDemoUsers: DemoUser[] = [
  ...demoTeachers,
  ...demoGuardians,
  ...demoStudents,
  ...demoDonors,
  demoAdmin,
];

// ============== LOGIN CREDENTIALS ==============
export const demoCredentials = {
  teachers: demoTeachers.map(t => ({
    email: t.email,
    password: t.password,
    name: t.name,
    role: 'শিক্ষক',
  })),
  guardians: demoGuardians.map(g => ({
    email: g.email,
    password: g.password,
    name: g.name,
    role: 'অভিভাবক',
  })),
  students: demoStudents.map(s => ({
    email: s.email,
    password: s.password,
    name: s.name,
    role: 'শিক্ষার্থী',
  })),
  donors: demoDonors.map(d => ({
    email: d.email,
    password: d.password,
    name: d.name,
    role: 'দাতা',
  })),
  admin: {
    email: demoAdmin.email,
    password: demoAdmin.password,
    name: demoAdmin.name,
    role: 'প্রশাসক',
  },
};

// ============== UTILITY FUNCTIONS ==============

/**
 * Get demo user by email
 */
export function getDemoUserByEmail(email: string): DemoUser | undefined {
  return allDemoUsers.find(user => user.email === email);
}

/**
 * Get demo users by role
 */
export function getDemoUsersByRole(role: string): DemoUser[] {
  return allDemoUsers.filter(user => user.role === role);
}

/**
 * Validate demo login
 */
export function validateDemoLogin(email: string, password: string): DemoUser | null {
  const user = getDemoUserByEmail(email);
  if (user && user.password === password) {
    return user;
  }
  return null;
}

/**
 * Get formatted credentials for display
 */
export function getFormattedCredentials() {
  return {
    'শিক্ষক (Teachers)': demoCredentials.teachers,
    'অভিভাবক (Guardians)': demoCredentials.guardians,
    'শিক্ষার্থী (Students)': demoCredentials.students,
    'দাতা (Donors)': demoCredentials.donors,
    'প্রশাসক (Admin)': [demoCredentials.admin],
  };
}

// ============== CONSOLE DISPLAY ==============
console.log('📋 Demo Users Loaded!');
console.log('Teachers:', demoTeachers.length);
console.log('Guardians:', demoGuardians.length);
console.log('Students:', demoStudents.length);
console.log('Donors:', demoDonors.length);
console.log('Total:', allDemoUsers.length);
