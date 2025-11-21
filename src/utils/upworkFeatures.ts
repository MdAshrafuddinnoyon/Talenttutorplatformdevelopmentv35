// Upwork-style features for Talent Tutor
// Chat, Video Meetings, Contracts, Proposals

export interface ChatMessage {
  id: string;
  conversationId: string;
  senderId: string;
  senderName: string;
  senderAvatar: string;
  senderType: 'teacher' | 'guardian' | 'admin';
  message: string;
  timestamp: Date;
  read: boolean;
  attachments?: {
    type: 'image' | 'file' | 'document';
    url: string;
    name: string;
  }[];
}

export interface Conversation {
  id: string;
  participants: {
    id: string;
    name: string;
    avatar: string;
    type: 'teacher' | 'guardian';
    online: boolean;
  }[];
  lastMessage: ChatMessage;
  unreadCount: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface VideoMeeting {
  id: string;
  title: string;
  titleEn: string;
  teacherId: string;
  teacherName: string;
  guardianId: string;
  guardianName: string;
  scheduledTime: Date;
  duration: number; // in minutes
  status: 'scheduled' | 'ongoing' | 'completed' | 'cancelled';
  meetingLink?: string;
  agenda?: string;
  notes?: string;
  creditsCost: number;
  createdAt: Date;
}

export interface Proposal {
  id: string;
  tuitionPostId: string;
  teacherId: string;
  teacherName: string;
  teacherAvatar: string;
  guardianId: string;
  coverLetter: string;
  proposedRate: {
    min: number;
    max: number;
    perSession?: boolean;
  };
  availability: string;
  startDate: Date;
  status: 'pending' | 'accepted' | 'rejected' | 'withdrawn';
  submittedAt: Date;
  respondedAt?: Date;
}

export interface Contract {
  id: string;
  title: string;
  titleEn: string;
  teacherId: string;
  teacherName: string;
  teacherAvatar: string;
  guardianId: string;
  guardianName: string;
  guardianAvatar: string;
  studentName: string;
  subjects: string[];
  class: string;
  schedule: {
    day: string;
    time: string;
  }[];
  rate: number;
  rateType: 'perHour' | 'perSession' | 'perMonth';
  startDate: Date;
  endDate?: Date;
  duration: string; // e.g., "3 months", "6 months"
  terms: string;
  status: 'draft' | 'pending' | 'active' | 'completed' | 'terminated';
  paymentStatus: 'pending' | 'partial' | 'paid';
  totalAmount: number;
  paidAmount: number;
  createdAt: Date;
  signedAt?: Date;
  signatures: {
    teacherSigned: boolean;
    teacherSignedAt?: Date;
    guardianSigned: boolean;
    guardianSignedAt?: Date;
  };
  milestones?: {
    id: string;
    description: string;
    amount: number;
    dueDate: Date;
    status: 'pending' | 'completed';
  }[];
}

export interface HiringAgreement {
  id: string;
  contractId: string;
  teacherId: string;
  guardianId: string;
  agreedRate: number;
  agreedSchedule: string;
  agreedDuration: string;
  specialTerms?: string;
  platformCommission: number;
  status: 'pending' | 'accepted' | 'rejected';
  createdAt: Date;
  expiresAt: Date;
}

// Mock data
export const mockConversations: Conversation[] = [
  {
    id: 'conv-001',
    participants: [
      {
        id: 'teacher-001',
        name: 'রহিম উদ্দিন',
        avatar: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=100',
        type: 'teacher',
        online: true,
      },
      {
        id: 'guardian-001',
        name: 'সাবিনা আক্তার',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100',
        type: 'guardian',
        online: true,
      },
    ],
    lastMessage: {
      id: 'msg-001',
      conversationId: 'conv-001',
      senderId: 'guardian-001',
      senderName: 'সাবিনা আক্তার',
      senderAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100',
      senderType: 'guardian',
      message: 'আগামীকাল কি আপনার ডেমো ক্লাসের জন্য সময় আছে?',
      timestamp: new Date('2025-01-28T10:30:00'),
      read: false,
    },
    unreadCount: 2,
    createdAt: new Date('2025-01-25'),
    updatedAt: new Date('2025-01-28T10:30:00'),
  },
  {
    id: 'conv-002',
    participants: [
      {
        id: 'teacher-002',
        name: 'জামাল হোসেন',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100',
        type: 'teacher',
        online: false,
      },
      {
        id: 'guardian-002',
        name: 'ফাতিমা খানম',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100',
        type: 'guardian',
        online: true,
      },
    ],
    lastMessage: {
      id: 'msg-002',
      conversationId: 'conv-002',
      senderId: 'teacher-002',
      senderName: 'জামাল হোসেন',
      senderAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100',
      senderType: 'teacher',
      message: 'ধন্যবাদ। আমি রবিবার সকাল ১০টায় পারব।',
      timestamp: new Date('2025-01-27T15:20:00'),
      read: true,
    },
    unreadCount: 0,
    createdAt: new Date('2025-01-26'),
    updatedAt: new Date('2025-01-27T15:20:00'),
  },
];

export const mockVideoMeetings: VideoMeeting[] = [
  {
    id: 'meeting-001',
    title: 'ডেমো ক্লাস - গণিত',
    titleEn: 'Demo Class - Mathematics',
    teacherId: 'teacher-001',
    teacherName: 'রহিম উদ্দিন',
    guardianId: 'guardian-001',
    guardianName: 'সাবিনা আক্তার',
    scheduledTime: new Date('2025-01-29T10:00:00'),
    duration: 30,
    status: 'scheduled',
    meetingLink: 'https://meet.talenttutor.com/demo-001',
    agenda: 'গণিত ক্লাস ৯-১০ এর ডেমো',
    creditsCost: 20,
    createdAt: new Date('2025-01-28'),
  },
  {
    id: 'meeting-002',
    title: 'প্যারেন্ট-টিচার মিটিং',
    titleEn: 'Parent-Teacher Meeting',
    teacherId: 'teacher-002',
    teacherName: 'জামাল হোসেন',
    guardianId: 'guardian-002',
    guardianName: 'ফাতিমা খানম',
    scheduledTime: new Date('2025-01-30T16:00:00'),
    duration: 30,
    status: 'scheduled',
    agenda: 'ছাত্রের অগ্রগতি নিয়ে আলোচনা',
    creditsCost: 20,
    createdAt: new Date('2025-01-27'),
  },
];

export const mockProposals: Proposal[] = [
  {
    id: 'prop-001',
    tuitionPostId: 'post-001',
    teacherId: 'teacher-001',
    teacherName: 'রহিম উদ্দিন',
    teacherAvatar: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=100',
    guardianId: 'guardian-001',
    coverLetter: 'আসসালামু আলাইকুম। আমি ১০ বছরের অভিজ্ঞতা সম্পন্ন গণিত শিক্ষক। আমি আপনার সন্তানকে গণিতে দক্ষ করে তুলতে পারব।',
    proposedRate: {
      min: 4500,
      max: 5000,
      perSession: false,
    },
    availability: 'সপ্তাহে ৩ দিন, সন্ধ্যা ৫-৭টা',
    startDate: new Date('2025-02-01'),
    status: 'pending',
    submittedAt: new Date('2025-01-27'),
  },
  {
    id: 'prop-002',
    tuitionPostId: 'post-002',
    teacherId: 'teacher-003',
    teacherName: 'সাবিহা রহমান',
    teacherAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100',
    guardianId: 'guardian-003',
    coverLetter: 'আমি পদার্থবিজ্ঞানে স্পেশালাইজড। BUET থেকে পাশ করেছি এবং HSC ছাত্রদের পড়াতে অভিজ্ঞ।',
    proposedRate: {
      min: 6000,
      max: 7000,
      perSession: false,
    },
    availability: 'সপ্তাহে ৪ দিন',
    startDate: new Date('2025-02-05'),
    status: 'accepted',
    submittedAt: new Date('2025-01-25'),
    respondedAt: new Date('2025-01-26'),
  },
];

export const mockContracts: Contract[] = [
  {
    id: 'contract-001',
    title: 'গণিত টিউশন চুক্তি - ক্লাস ৯',
    titleEn: 'Mathematics Tuition Contract - Class 9',
    teacherId: 'teacher-001',
    teacherName: 'রহিম উদ্দিন',
    teacherAvatar: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=100',
    guardianId: 'guardian-001',
    guardianName: 'সাবিনা আক্তার',
    guardianAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100',
    studentName: 'আয়শা আক্তার',
    subjects: ['গণিত'],
    class: 'ক্লাস ৯',
    schedule: [
      { day: 'রবিবার', time: '৫:০০ - ৬:৩০ PM' },
      { day: 'মঙ্গলবার', time: '৫:০০ - ৬:৩০ PM' },
      { day: 'বৃহস্পতিবার', time: '৫:০০ - ৬:৩০ PM' },
    ],
    rate: 5000,
    rateType: 'perMonth',
    startDate: new Date('2025-02-01'),
    duration: '6 months',
    terms: `
১. শিক্ষক সপ্তাহে ৩ দিন ক্লাস নেবেন (রবি, মঙ্গল, বৃহস্পতি)
২. প্রতিটি ক্লাস ১.৫ ঘণ্টা হবে
৩. মাসিক ফি ৫,০০০ টাকা (প্রতি মাসের ১ তারিখে প্রদেয়)
৪. ছুটির দিন: সরকারি ছুটি এবং পরীক্ষার সময়
৫. প্ল্যাটফর্ম কমিশন: ১০% (শ��ক্ষক থেকে কাটা হবে)
৬. চুক্তি বাতিল: ১৫ দিন আগে নোটিশ দিতে হবে
    `,
    status: 'active',
    paymentStatus: 'paid',
    totalAmount: 30000, // 6 months x 5000
    paidAmount: 10000, // 2 months paid
    createdAt: new Date('2025-01-20'),
    signedAt: new Date('2025-01-25'),
    signatures: {
      teacherSigned: true,
      teacherSignedAt: new Date('2025-01-24'),
      guardianSigned: true,
      guardianSignedAt: new Date('2025-01-25'),
    },
    milestones: [
      {
        id: 'mile-001',
        description: 'প্রথম মাসের ফি',
        amount: 5000,
        dueDate: new Date('2025-02-01'),
        status: 'completed',
      },
      {
        id: 'mile-002',
        description: 'দ্বিতীয় মাসের ফি',
        amount: 5000,
        dueDate: new Date('2025-03-01'),
        status: 'completed',
      },
      {
        id: 'mile-003',
        description: 'তৃতীয় মাসের ফি',
        amount: 5000,
        dueDate: new Date('2025-04-01'),
        status: 'pending',
      },
    ],
  },
];

export const mockHiringAgreements: HiringAgreement[] = [
  {
    id: 'hire-001',
    contractId: 'contract-001',
    teacherId: 'teacher-001',
    guardianId: 'guardian-001',
    agreedRate: 5000,
    agreedSchedule: 'সপ্তাহে ৩ দিন (রবি, মঙ্গল, বৃহস্পতি)',
    agreedDuration: '৬ মাস',
    specialTerms: 'পরীক্ষার আগে অতিরিক্ত ক্লাস দেওয়া হবে',
    platformCommission: 500, // 10%
    status: 'accepted',
    createdAt: new Date('2025-01-20'),
    expiresAt: new Date('2025-01-27'),
  },
];

// Helper functions
export function getUnreadConversationCount(conversations: Conversation[]): number {
  return conversations.filter(conv => conv.unreadCount > 0).length;
}

export function getPendingProposalsCount(proposals: Proposal[]): number {
  return proposals.filter(prop => prop.status === 'pending').length;
}

export function getActiveContractsCount(contracts: Contract[]): number {
  return contracts.filter(contract => contract.status === 'active').length;
}

export function getUpcomingMeetings(meetings: VideoMeeting[]): VideoMeeting[] {
  const now = new Date();
  return meetings
    .filter(meeting => meeting.scheduledTime > now && meeting.status === 'scheduled')
    .sort((a, b) => a.scheduledTime.getTime() - b.scheduledTime.getTime());
}

export function formatMeetingTime(date: Date, language: 'bn' | 'en'): string {
  if (language === 'bn') {
    return date.toLocaleString('bn-BD', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }
  return date.toLocaleString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}

export function canScheduleMeeting(
  teacherCredits: number,
  guardianCredits: number,
  meetingCost: number = 20
): { canSchedule: boolean; reason?: string } {
  if (teacherCredits < meetingCost) {
    return { canSchedule: false, reason: 'Teacher has insufficient credits' };
  }
  if (guardianCredits < meetingCost) {
    return { canSchedule: false, reason: 'Guardian has insufficient credits' };
  }
  return { canSchedule: true };
}

// User Credits System
export interface UserCredits {
  userId: string;
  userType: 'teacher' | 'guardian' | 'student';
  currentBalance: number;
  totalEarned: number;
  totalSpent: number;
  lastUpdated: Date;
}

export const mockUserCredits: { [userId: string]: UserCredits } = {
  'guardian-001': {
    userId: 'guardian-001',
    userType: 'guardian',
    currentBalance: 85,
    totalEarned: 100, // Initial free credits
    totalSpent: 15,
    lastUpdated: new Date(),
  },
  'guardian-002': {
    userId: 'guardian-002',
    userType: 'guardian',
    currentBalance: 92,
    totalEarned: 100,
    totalSpent: 8,
    lastUpdated: new Date(),
  },
  'teacher-001': {
    userId: 'teacher-001',
    userType: 'teacher',
    currentBalance: 45,
    totalEarned: 50, // Initial free credits
    totalSpent: 5,
    lastUpdated: new Date(),
  },
  'teacher-002': {
    userId: 'teacher-002',
    userType: 'teacher',
    currentBalance: 38,
    totalEarned: 50,
    totalSpent: 12,
    lastUpdated: new Date(),
  },
};
