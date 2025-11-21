// Centralized blog posts data
export interface BlogPost {
  id: string;
  title: string;
  titleEn: string;
  category: 'success' | 'education' | 'donor' | 'update';
  categoryBn: string;
  categoryEn: string;
  excerpt: string;
  excerptEn: string;
  content: string;
  contentEn: string;
  image: string;
  author: {
    name: string;
    nameEn: string;
    avatar: string;
    role: string;
    roleEn: string;
  };
  date: Date;
  views: number;
  likes: number;
  comments: number;
  featured: boolean;
  tags: string[];
  tagsEn: string[];
}

export const blogPosts: BlogPost[] = [
  {
    id: 'blog-001',
    title: 'রহিমার স্বপ্ন পূরণ: অসহায় থেকে মেধাবী',
    titleEn: 'Rahima\'s Dream Fulfilled: From Helpless to Brilliant',
    category: 'success',
    categoryBn: 'সাফল্যের গল্প',
    categoryEn: 'Success Stories',
    excerpt: 'রহিমা একজন এতিম শিক্ষার্থী যার বাবা মারা যাওয়ার পর পড়াশোনা বন্ধ করতে হয়েছিল। Talent Tutor প্ল্যাটফর্মের মাধ্যমে তিনি বৃত্তি পেয়ে আবার স্কুলে ফিরে এসেছেন এবং এখন তার ক্লাসে প্রথম স্থান অধিকার করেছে।',
    excerptEn: 'Rahima is an orphan student who had to stop her studies after her father\'s death. Through Talent Tutor platform, she received a scholarship, returned to school, and now ranks first in her class.',
    content: `রহিমার বয়স যখন ১২ বছর, তখন তার বাবা হঠাৎ মারা যান। পরিবারের একমাত্র উপার্জনকারী হারিয়ে রহিমার মা-সহ পুরো পরিবার অসহায় হয়ে পড়ে। স্কুল বন্ধ করে রহিমাকে কাজ করতে হতো।

**টার্নিং পয়েন্ট**

২০২৪ সালের জুলাই মাসে রহিমার মা Talent Tutor প্ল্যাটফর্মে তার মেয়ের জন্য সাহায্যের আবেদন করেন। প্ল্যাটফর্মে একজন দাতা রহিমার গল্প শুনে তাকে মাসিক ৫,০০০ টাকার বৃত্তি দেওয়ার সিদ্ধান্ত নেন।

**বর্তমান অবস্থা**

এখন রহিমা আবার স্কুলে ফিরে এসেছে এবং তার ক্লাসে প্রথম স্থান অধিকার করেছে। তার শিক্ষক বলেন, "রহিমা অত্যন্ত মেধাবী এবং পরিশ্রমী। সে তার সহপাঠীদের জন্য অনুপ্রেরণা।"

**ভবিষ্যৎ স্বপ্ন**

রহিমা বলে, "আমি একদিন ডাক্তার হয়ে দরিদ্র মানুষদের বিনামূল্যে সেবা করব। যারা আমাকে সাহায্য করেছে, আমি তাদের কাছে চিরকৃতজ্ঞ।"

**প্রভাব**

রহিমার গল্প প্ল্যাটফর্মে আরও ৫০+ দাতাকে অনুপ্রাণিত করেছে যারা অন্য শিক্ষার্থীদের সাহায্য করতে এগিয়ে এসেছেন।`,
    contentEn: `When Rahima was 12 years old, her father suddenly passed away. Losing the family's sole breadwinner, Rahima's mother and the entire family became helpless. Rahima had to quit school and start working.

**Turning Point**

In July 2024, Rahima's mother applied for help on the Talent Tutor platform. A donor on the platform heard Rahima's story and decided to provide her with a monthly scholarship of 5,000 Taka.

**Current Status**

Now Rahima has returned to school and ranks first in her class. Her teacher says, "Rahima is extremely talented and hardworking. She is an inspiration to her classmates."

**Future Dreams**

Rahima says, "One day I will become a doctor and serve poor people for free. I am forever grateful to those who helped me."

**Impact**

Rahima's story has inspired 50+ more donors on the platform who have come forward to help other students.`,
    image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=800&q=80',
    author: {
      name: 'Talent Tutor টিম',
      nameEn: 'Talent Tutor Team',
      avatar: '',
      role: 'প্ল্যাটফর্ম অ্যাডমিন',
      roleEn: 'Platform Admin',
    },
    date: new Date('2025-01-25'),
    views: 1547,
    likes: 342,
    comments: 45,
    featured: true,
    tags: ['সাফল্যের গল্প', 'বৃত্তি', 'শিক্ষা', 'দান'],
    tagsEn: ['Success Story', 'Scholarship', 'Education', 'Donation'],
  },
  {
    id: 'blog-002',
    title: 'করিমের যাত্রা: রিকশাচালক থেকে শিক্ষক',
    titleEn: 'Karim\'s Journey: From Rickshaw Puller to Teacher',
    category: 'success',
    categoryBn: 'সাফল্যের গল্প',
    categoryEn: 'Success Stories',
    excerpt: 'করিম একজন রিকশাচালক ছিলেন যিনি দিনে ১৬ ঘণ্টা কাজ করতেন। Talent Tutor এ শিক্ষক হিসেবে যোগ দিয়ে এখন তিনি ২০+ শিক্ষার্থীকে পড়াচ্ছেন এবং মাসে ৫০,০০০+ টাকা আয় করছেন।',
    excerptEn: 'Karim was a rickshaw puller who worked 16 hours a day. After joining Talent Tutor as a teacher, he now teaches 20+ students and earns 50,000+ Taka per month.',
    content: `করিমের শিক্ষাগত যোগ্যতা ছিল অনার্স ডিগ্রি, কিন্তু চাকরি না পেয়ে তিনি রিকশা চালাতে বাধ্য হন। দৈনিক ১৬ ঘণ্টা কঠোর পরিশ্রম করেও মাসে মাত্র ১৫,০০০ টাকা আয় হতো।

**প্ল্যাটফর্মে যোগদান**

২০২৪ সালের মার্চ মাসে করিম Talent Tutor প্ল্যাটফর্মে শিক্ষক হিসেবে রেজিস্ট্রেশন করেন। প্রথম মাসেই তিনি ৫ জন শিক্ষার্থী পান এবং মাসে ২৫,০০০ টাকা আয় করেন।

**বর্তমান সাফল্য**

এখন করিম সম্পূর্ণভাবে শিক্ষকতায় মনোনিবেশ করেছেন। তিনি ২০+ শিক্ষার্থীকে গণিত ও পদার্থবিজ্ঞান পড়াচ্ছেন এবং মাসে ৫০,০০০+ টাকা আয় করছেন। তার রেটিং ৪.৯/৫ এবং ১০০+ পজিটিভ রিভিউ রয়েছে।

**প্রভাব**

করিম বলেন, "Talent Tutor আমার জীবন পাল্টে দিয়েছে। এখন আমি সম্মানের সাথে জীবিকা নির্বাহ করতে পারছি এবং আমার জ্ঞান অন্যদের সাথে শেয়ার করছি।"

করিমের সাফল্য দেখে আরও ৩০+ বেকার শিক্ষিত যুবক প্ল্যাটফর্মে যোগ দিয়েছেন।`,
    contentEn: `Karim had an honors degree, but unable to find a job, he was forced to pull a rickshaw. Despite working 16 hours daily, he earned only 15,000 Taka per month.

**Joining the Platform**

In March 2024, Karim registered as a teacher on the Talent Tutor platform. In the first month, he got 5 students and earned 25,000 Taka.

**Current Success**

Now Karim has fully focused on teaching. He teaches Math and Physics to 20+ students and earns 50,000+ Taka per month. He has a 4.9/5 rating and 100+ positive reviews.

**Impact**

Karim says, "Talent Tutor changed my life. Now I can earn a living with dignity and share my knowledge with others."

Seeing Karim's success, 30+ more unemployed educated youth have joined the platform.`,
    image: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=800&q=80',
    author: {
      name: 'আমিনুল ইসলাম',
      nameEn: 'Aminul Islam',
      avatar: '',
      role: 'কন্টেন্ট রাইটার',
      roleEn: 'Content Writer',
    },
    date: new Date('2025-01-20'),
    views: 2134,
    likes: 487,
    comments: 67,
    featured: true,
    tags: ['সাফল্যের গল্প', 'শিক্ষক', 'ক্যারিয়ার'],
    tagsEn: ['Success Story', 'Teacher', 'Career'],
  },
  {
    id: 'blog-003',
    title: 'কীভাবে আপনার সন্তানের জন্য সঠিক শিক্ষক খুঁজবেন',
    titleEn: 'How to Find the Right Teacher for Your Child',
    category: 'education',
    categoryBn: 'শিক্ষা টিপস',
    categoryEn: 'Education Tips',
    excerpt: 'সঠিক শিক্ষক নির্বাচন আপনার সন্তানের শিক্ষাগত সাফল্যে গুরুত্বপূর্ণ ভূমিকা পালন করে। এই গাইডে জানুন কীভাবে Talent Tutor প্ল্যাটফর্মে সেরা শিক্ষক খুঁজে পাবেন।',
    excerptEn: 'Choosing the right teacher plays a crucial role in your child\'s educational success. Learn how to find the best teacher on Talent Tutor platform in this guide.',
    content: `সঠিক শিক্ষক নির্বাচন একটি গুরুত্বপূর্ণ সিদ্ধান্ত। এখানে কিছু টিপস দেওয়া হলো:

**১. যোগ্যতা যাচাই করুন**

- শিক্ষকের শিক্ষাগত যোগ্যতা দেখুন
- সার্টিফিকেট যাচাই করুন (Talent Tutor এ সব শিক্ষক যাচাইকৃত)
- সংশ্লিষ্ট বিষয়ে দক্ষতা নিশ্চিত করুন

**২. অভিজ্ঞতা বিবেচনা করুন**

- কত বছরের টিউশন অভিজ্ঞতা আছে
- কত শিক্ষার্থী পড়িয়েছেন
- তাদের সাফল্যের রেকর্ড কী

**৩. রিভিউ ও রেটিং দেখুন**

- অন্য অভিভাবকদের রিভিউ পড়ুন
- রেটিং ৪.৫+ থাকলে ভালো
- নেগেটিভ রিভিউ থাকলে কারণ জানুন

**৪. শিক্ষণ পদ্ধতি**

- শিক্ষকের teaching style জানুন
- আপনার সন্তানের learning style এর সাথে মিলে কিনা
- ডেমো ক্লাস নিতে বলুন

**৫. যোগাযোগ দক্ষতা**

- শিক্ষক কি নিয়মিত feedback দেন
- অভিভাবকদের সাথে যোগাযোগ রাখেন কিনা
- সমস্যা হলে responsive কিনা

**Talent Tutor এর সুবিধা**

আমাদের প্ল্যাটফর্মে:
- সকল শিক্ষক NID যাচাইকৃত
- Verified certificates
- Real-time chat ও video call সুবিধা
- ১০০ ফ্রি ক্রেডিট পাবেন
- ২৪/৭ সাপোর্ট`,
    contentEn: `Choosing the right teacher is an important decision. Here are some tips:

**1. Check Qualifications**

- Review the teacher's educational qualifications
- Verify certificates (All teachers on Talent Tutor are verified)
- Ensure expertise in relevant subjects

**2. Consider Experience**

- How many years of tutoring experience
- How many students taught
- What is their success record

**3. Check Reviews & Ratings**

- Read reviews from other parents
- Good if rating is 4.5+
- Understand reasons for negative reviews if any

**4. Teaching Method**

- Learn about teacher's teaching style
- Does it match your child's learning style
- Ask for a demo class

**5. Communication Skills**

- Does the teacher give regular feedback
- Do they stay in touch with parents
- Are they responsive when problems arise

**Talent Tutor Benefits**

On our platform:
- All teachers are NID verified
- Verified certificates
- Real-time chat and video call facility
- Get 100 free credits
- 24/7 support`,
    image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&q=80',
    author: {
      name: 'ড. সাবিনা খাতুন',
      nameEn: 'Dr. Sabina Khatun',
      avatar: '',
      role: 'শিক্ষা পরামর্শদাতা',
      roleEn: 'Education Consultant',
    },
    date: new Date('2025-01-18'),
    views: 3421,
    likes: 623,
    comments: 89,
    featured: false,
    tags: ['শিক্ষা টিপস', 'অভিভাবকদের গাইড', 'শিক্ষক নির্বাচন'],
    tagsEn: ['Education Tips', 'Parents Guide', 'Teacher Selection'],
  },
  {
    id: 'blog-004',
    title: 'যাকাতের মাধ্যমে শিক্ষা: একটি মহৎ উদ্যোগ',
    titleEn: 'Education Through Zakat: A Noble Initiative',
    category: 'donor',
    categoryBn: 'দাতাদের অভিজ্ঞতা',
    categoryEn: 'Donor Stories',
    excerpt: 'জনাব রফিকুল ইসলাম তার যাকাতের অর্থ দিয়ে ১০ জন অসহায় শিক্ষার্থীকে সাহায্য করছেন। জানুন কীভাবে আপনিও এই মহৎ কাজে অংশ নিতে পারেন।',
    excerptEn: 'Mr. Rofiqul Islam is helping 10 helpless students with his Zakat money. Learn how you too can participate in this noble work.',
    content: `জনাব রফিকুল ইসলাম ঢাকার একজন সফল ব্যবসায়ী। তিনি প্রতি বছর যাকাত দিতেন, কিন্তু কখনো জানতেন না তার অর্থ কোথায় খরচ হচ্ছে।

**Talent Tutor এর সাথে যাত্রা**

২০২৪ সালে তিনি Talent Tutor প্ল্যাটফর্ম সম্পর্কে জানতে পারেন। এখানে তিনি সরাসরি অসহায় শিক্ষার্থীদের প্রোফাইল দেখতে পান এবং তাদের গল্প শুনতে পারেন।

**বর্তমান অবদান**

এখন তিনি নিয়মিত ১০ জন শিক্ষার্থীকে সাহায্য করছেন:
- মাসিক মোট ৫০,০০০ টাকা বৃত্তি
- বই-খ��তা ও স্কুল উপকরণ
- প্রয়োজনে চিকিৎসা সহায়তা

**স্বচ্ছতা ও রিপোর্টিং**

Talent Tutor প্ল্যাটফর্মের মাধ্যমে তিনি:
- শিক্ষার্থীদের রেজাল্ট দেখতে পারেন
- সরাসরি তাদের সাথে কথা বলতে পারেন
- মাসিক প্রগতি রিপোর্ট পান
- ১০০% স্বচ্ছতা নিশ্চিত করেন

**অনুভূতি**

রফিক সাহেব বলেন, "আমার যাকাতের টাকা যে সত্যিই কাজে লাগছে, এটা দেখে আমি সন্তুষ্ট। এই শিক্ষার্থীরা আমার নিজের সন্তানের মতো।"

**আপনিও পারেন**

আপনি যদি আপনার যাকাত বা দান সঠিক জায়গায় দিতে চান:
- Talent Tutor এ রেজিস্টার করুন
- শিক্ষার্থীদের প্রোফাইল দেখুন
- মাসিক বা একবারে দান করুন
- নিয়মিত আপডেট পান`,
    contentEn: `Mr. Rofiqul Islam is a successful businessman in Dhaka. He used to give Zakat every year, but never knew where his money was being spent.

**Journey with Talent Tutor**

In 2024, he learned about the Talent Tutor platform. Here he could directly see profiles of helpless students and hear their stories.

**Current Contribution**

He now regularly helps 10 students:
- Total monthly scholarship of 50,000 Taka
- Books and school supplies
- Medical assistance when needed

**Transparency & Reporting**

Through Talent Tutor platform, he can:
- See students' results
- Talk directly with them
- Get monthly progress reports
- Ensure 100% transparency

**Feelings**

Rofiq says, "I am satisfied to see that my Zakat money is truly being used. These students are like my own children."

**You Can Too**

If you want to give your Zakat or donation to the right place:
- Register on Talent Tutor
- View student profiles
- Donate monthly or one-time
- Get regular updates`,
    image: 'https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=800&q=80',
    author: {
      name: 'ফারহানা আক্তার',
      nameEn: 'Farhana Akter',
      avatar: '',
      role: 'দাতা সমন্বয়কারী',
      roleEn: 'Donor Coordinator',
    },
    date: new Date('2025-01-15'),
    views: 1876,
    likes: 412,
    comments: 56,
    featured: false,
    tags: ['যাকাত', 'দান', 'স্বচ্ছতা', 'সাহায্য'],
    tagsEn: ['Zakat', 'Donation', 'Transparency', 'Help'],
  },
  {
    id: 'blog-005',
    title: 'Talent Tutor নতুন ফিচার: Video Meeting Scheduler',
    titleEn: 'Talent Tutor New Feature: Video Meeting Scheduler',
    category: 'update',
    categoryBn: 'প্ল্যাটফর্ম আপডেট',
    categoryEn: 'Platform Updates',
    excerpt: 'এখন আপনি সরাসরি প্ল্যাটফর্ম থেকেই শিক্ষকদের সাথে ভিডিও মিটিং শিডিউল করতে পারবেন। প্রতি মিটিং মাত্র ২০ ক্রেডিট খরচ হবে।',
    excerptEn: 'Now you can schedule video meetings with teachers directly from the platform. Each meeting costs only 20 credits.',
    content: `আমরা আনন্দের সাথে ঘোষণা করছি Talent Tutor এর নতুন Video Meeting Scheduler ফিচার!

**কী নতুন যুক্ত হলো?**

✅ **সরাসরি Video Call**
- শিক্ষকদের সাথে এক-ক্লিকে ভিডিও কল
- HD quality video এবং crystal clear audio
- Screen sharing সুবিধা

✅ **Meeting Scheduler**
- আগে থেকে মিটিং বুক করুন
- Calendar integration
- Automatic reminders

✅ **ক্রেডিট সিস্টেম**
- প্রতি ৩০ মিনিট মিটিং = ২০ ক্রেডিট
- শিক্ষক ও অভিভাবক উভয়ের থেকে কাটা হবে
- নতুন ইউজারদের ফ্রি ক্রেডিট

**কীভাবে ব্যবহার করবেন?**

১. শিক্ষকের প্রোফাইলে যান
২. "Schedule Video Meeting" বাটনে ক্লিক করুন
৩. সময় ও তারিখ সিলেক্ট করুন
৪. Confirm করুন
৫. নির্ধারিত সময়ে Join করুন

**সুবিধা**

- কোনো থার্ড-পার্টি অ্যাপ লাগবে না
- সম্পূর্ণ নিরাপদ ও encrypted
- মিটিং রেকর্ডিং সুবিধা
- Chat during call

**বিশেষ অফার**

প্রথম ১০০০ জন ইউজার:
- ৫০ ফ্রি ক্রেডিট বোনাস
- প্রথম মিটিং ফ্রি
- লাইফটাইম ১০% ডিসকাউন্ট

আজই ট্রাই করুন!`,
    contentEn: `We are excited to announce Talent Tutor's new Video Meeting Scheduler feature!

**What's New?**

✅ **Direct Video Call**
- One-click video call with teachers
- HD quality video and crystal clear audio
- Screen sharing facility

✅ **Meeting Scheduler**
- Book meetings in advance
- Calendar integration
- Automatic reminders

✅ **Credit System**
- Each 30-minute meeting = 20 credits
- Deducted from both teacher and parent
- Free credits for new users

**How to Use?**

1. Go to teacher's profile
2. Click "Schedule Video Meeting" button
3. Select time and date
4. Confirm
5. Join at scheduled time

**Benefits**

- No third-party app needed
- Completely safe and encrypted
- Meeting recording facility
- Chat during call

**Special Offer**

First 1000 users:
- 50 free credits bonus
- First meeting free
- Lifetime 10% discount

Try today!`,
    image: 'https://images.unsplash.com/photo-1588196749597-9ff075ee6b5b?w=800&q=80',
    author: {
      name: 'Talent Tutor Dev Team',
      nameEn: 'Talent Tutor Dev Team',
      avatar: '',
      role: 'টেকনিক্যাল টিম',
      roleEn: 'Technical Team',
    },
    date: new Date('2025-01-10'),
    views: 5234,
    likes: 892,
    comments: 134,
    featured: true,
    tags: ['আপডেট', 'ভিডিও কল', 'নতুন ফিচার'],
    tagsEn: ['Update', 'Video Call', 'New Feature'],
  },
  {
    id: 'blog-006',
    title: 'পরীক্ষার প্রস্তুতি: ১০টি কার্যকর টিপস',
    titleEn: 'Exam Preparation: 10 Effective Tips',
    category: 'education',
    categoryBn: 'শিক্ষা টিপস',
    categoryEn: 'Education Tips',
    excerpt: 'পরীক্ষায় ভালো ফলাফলের জন্য শুধু পড়াশোনা নয়, সঠিক কৌশলও প্রয়োজন। বিশেষজ্ঞদের পরামর্শ অনুযায়ী ১০টি কার্যকর টিপস জানুন।',
    excerptEn: 'Good exam results require not just study but also the right strategy. Learn 10 effective tips according to experts.',
    content: `পরীক্ষায় ভালো করার জন্য এই টিপসগুলো অনুসরণ করুন:

**১. সময় ব্যবস্থাপনা**
- প্রতিদিন একই সময়ে পড়ুন
- ৫০ মিনিট পড়ে ১০ মিনিট বিরতি
- রাত জাগা এড়িয়ে চলুন

**২. সিলেবাস বুঝুন**
- সম্পূর্ণ সিলেবাস দেখুন
- Important topics চিহ্নিত করুন
- টাইম ডিস্ট্রিবিউট করু��

**৩. নোট তৈরি করুন**
- নিজের ভাষায় লিখুন
- গুরুত্বপূর্ণ পয়েন্ট হাইলাইট করুন
- ডায়াগ্রাম/চার্ট ব্যবহার করুন

**৪. প্র্যাকটিস করুন**
- পুরাতন প্রশ্নপত্র সমাধান করুন
- Mock test দিন
- দুর্বল বিষয়ে বেশি সময় দিন

**৫. গ্রুপ স্টাডি**
- বন্ধুদের সাথে আলোচনা করুন
- একে অপরকে পড়ান
- সমস্যা শেয়ার করুন

**৬. স্বাস্থ্যকর খাবার**
- পুষ্টিকর খাবার খান
- পানি বেশি পান করুন
- জাঙ্ক ফুড এড়িয়ে চলুন

**৭. পর্যাপ্ত ঘুম**
- রাতে ৭-৮ ঘণ্টা ঘুমান
- পরীক্ষার আগের রাতে ভালো ঘুম
- ক্লান্ত অবস্থায় পড়বেন না

**৮. রিভিশন**
- নিয়মিত রিভিশন করুন
- শেষ সপ্তাহে দ্রুত রিভিশন
- Important formulas মুখস্থ করুন

**৯. পজিটিভ থাকুন**
- নিজের উপর বিশ্বাস রাখুন
- Stress কমাতে meditation করুন
- সফলতার কল্পনা করুন

**১০. শিক্ষকের সাহায্য নিন**
- সমস্যা হলে শিক্ষককে জিজ্ঞাসা করুন
- Talent Tutor এ অভিজ্ঞ শিক্ষক পাবেন
- ডাউট ক্লিয়ার করুন

মনে রাখবেন, কঠোর পরিশ্রম ও সঠিক কৌশলই সাফল্যের চাবিকাঠি!`,
    contentEn: `Follow these tips for good exam performance:

**1. Time Management**
- Study at the same time daily
- 50 minutes study, 10 minutes break
- Avoid staying up late

**2. Understand Syllabus**
- Review complete syllabus
- Identify important topics
- Distribute time

**3. Create Notes**
- Write in your own words
- Highlight important points
- Use diagrams/charts

**4. Practice**
- Solve old question papers
- Take mock tests
- Spend more time on weak subjects

**5. Group Study**
- Discuss with friends
- Teach each other
- Share problems

**6. Healthy Food**
- Eat nutritious food
- Drink plenty of water
- Avoid junk food

**7. Adequate Sleep**
- Sleep 7-8 hours at night
- Good sleep before exam
- Don't study when tired

**8. Revision**
- Revise regularly
- Quick revision in last week
- Memorize important formulas

**9. Stay Positive**
- Believe in yourself
- Meditate to reduce stress
- Visualize success

**10. Take Teacher's Help**
- Ask teacher when in doubt
- Find experienced teachers on Talent Tutor
- Clear doubts

Remember, hard work and right strategy are keys to success!`,
    image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&q=80',
    author: {
      name: 'প্রফেসর আহমেদ',
      nameEn: 'Professor Ahmed',
      avatar: '',
      role: 'শিক্ষা বিশেষজ্ঞ',
      roleEn: 'Education Expert',
    },
    date: new Date('2025-01-05'),
    views: 4521,
    likes: 734,
    comments: 98,
    featured: false,
    tags: ['পরীক্ষা', 'টিপস', 'পড়াশোনা'],
    tagsEn: ['Exam', 'Tips', 'Study'],
  },
];

export function getBlogPostById(id: string): BlogPost | undefined {
  return blogPosts.find(post => post.id === id);
}

export function getBlogPostsByCategory(category: string): BlogPost[] {
  if (category === 'all') return blogPosts;
  return blogPosts.filter(post => post.category === category);
}

export function getFeaturedPosts(): BlogPost[] {
  return blogPosts.filter(post => post.featured);
}

export function getPopularPosts(limit: number = 5): BlogPost[] {
  return [...blogPosts]
    .sort((a, b) => b.views - a.views)
    .slice(0, limit);
}

export function getLatestPosts(limit: number = 5): BlogPost[] {
  return [...blogPosts]
    .sort((a, b) => b.date.getTime() - a.date.getTime())
    .slice(0, limit);
}
