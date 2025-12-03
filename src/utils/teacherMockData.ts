// Teacher Dashboard Mock Data (English)

export const jobs = [
  {
    id: 1,
    title: 'Math Teacher Needed (Class 8-10)',
    subject: 'Mathematics',
    studentClass: 'Class 8-10',
    location: 'Dhanmondi, Dhaka',
    salary: '8,000-10,000',
    posted: '2 hours ago',
    applicants: 5,
    matched: true,
    gender: 'any',
    schedule: 'Evening 5-7 PM, 3 days/week',
    duration: '6 months',
    requirements: [
      'Bachelor\'s Degree (Math/Science)',
      'Minimum 2 years teaching experience',
      'Good communication skills',
      'Familiar with textbooks'
    ],
    guardian: {
      name: 'Mr. Rahim Uddin',
      verified: true,
    },
    postedDate: 'January 25, 2025',
  },
  {
    id: 2,
    title: 'English & Science Tutor',
    subject: 'English, Science',
    studentClass: 'Class 6-7',
    location: 'Gulshan, Dhaka',
    salary: '6,000-8,000',
    gender: 'female',
    schedule: 'Afternoon 4-6 PM, Daily',
    duration: '1 year',
    requirements: [
      'Female teacher required',
      'English medium teaching experience',
      'Preferably living in residential area'
    ],
    guardian: {
      name: 'Mrs. Nasrin Akter',
      verified: true,
    },
    postedDate: 'January 25, 2025',
    posted: '5 hours ago',
    applicants: 12,
    matched: false,
  },
  {
    id: 3,
    title: 'Physics Teacher (HSC)',
    subject: 'Physics',
    studentClass: 'HSC (11-12)',
    location: 'Mirpur, Dhaka',
    salary: '10,000-12,000',
    posted: '1 day ago',
    applicants: 8,
    matched: true,
    gender: 'male',
    schedule: 'Morning 8-10 AM, Fri-Sat off',
    duration: '1 year (till exam)',
    requirements: [
      'Bachelor\'s from Physics Department',
      'HSC student teaching experience',
      'Can prepare for practical exams'
    ],
    guardian: {
      name: 'Dr. Kamal Hossain',
      verified: true,
    },
    postedDate: 'January 24, 2025',
  },
];

export const applications = [
  {
    id: 1,
    title: 'Math Teacher - Class 9',
    location: 'Banani, Dhaka',
    appliedDate: '2 days ago',
    status: 'shortlisted',
  },
  {
    id: 2,
    title: 'Science Tutor - Class 7',
    location: 'Uttara, Dhaka',
    appliedDate: '5 days ago',
    status: 'pending',
  },
  {
    id: 3,
    title: 'English Teacher - Class 8',
    location: 'Mohammadpur, Dhaka',
    appliedDate: '1 week ago',
    status: 'rejected',
  },
];

export const teacherPayments = [
  { id: 1, student: 'Rafi Ahmed', guardian: 'Mrs. Rahima Khatun', amount: 8000, month: 'January 2025', status: 'paid', date: '05/01/2025' },
  { id: 2, student: 'Samiya Khan', guardian: 'Mr. Karim', amount: 6000, month: 'January 2025', status: 'paid', date: '05/01/2025' },
  { id: 3, student: 'Tanvir Hasan', guardian: 'Mrs. Sabina', amount: 7000, month: 'January 2025', status: 'paid', date: '07/01/2025' },
  { id: 4, student: 'Rafi Ahmed', guardian: 'Mrs. Rahima Khatun', amount: 8000, month: 'February 2025', status: 'pending', date: '-' },
  { id: 5, student: 'Samiya Khan', guardian: 'Mr. Karim', amount: 6000, month: 'February 2025', status: 'pending', date: '-' },
  { id: 6, student: 'Tanvir Hasan', guardian: 'Mrs. Sabina', amount: 7000, month: 'February 2025', status: 'pending', date: '-' },
];

export const myStudents = [
  {
    id: 1,
    name: 'Rafi Ahmed',
    guardian: 'Mrs. Rahima Khatun',
    subject: 'Mathematics',
    class: 'Class 9',
    progress: 85,
    lastUpdate: '25/01/2025',
    photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80',
  },
  {
    id: 2,
    name: 'Samiya Khan',
    guardian: 'Mr. Karim',
    subject: 'English',
    class: 'Class 7',
    progress: 78,
    lastUpdate: '24/01/2025',
    photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80',
  },
  {
    id: 3,
    name: 'Tanvir Hasan',
    guardian: 'Mrs. Sabina',
    subject: 'Science',
    class: 'Class 8',
    progress: 72,
    lastUpdate: '23/01/2025',
    photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80',
  },
];
