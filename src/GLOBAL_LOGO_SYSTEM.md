# 🎨 গ্লোবাল লোগো সিস্টেম - Global Logo System

## 📋 সারসংক্ষেপ (Summary)

Talent Tutor প্ল্যাটফর্মের জন্য একটি সম্পূর্ণ গ্লোবাল লোগো সিস্টেম তৈরি করা হয়েছে যেখানে **একটি মাত্র ফাইল থেকে** সম্পূর্ণ অ্যাপ্লিকেশনের লোগো, রং, এবং ব্র্যান্ডিং নিয়ন্ত্রণ করা যাবে।

### ✅ সুবিধা (Benefits)

- ✨ **একটি জায়গা থেকে সব কন্ট্রোল**: লোগো আইকন, নাম, রং সব কিছু `/utils/brandConfig.ts` থেকে পরিবর্তন করুন
- 🌐 **Multi-language সাপোর্ট**: বাংলা এবং ইংরেজিতে স্বয়ংক্রিয়ভাবে পরিবর্তিত হয়
- 🎯 **Consistency নিশ্চিত**: সমস্ত components একই configuration ব্যবহার করে
- 🚀 **সহজ রক্ষণাবেক্ষণ**: একবার পরিবর্তন করলে সব জায়গায় আপডেট হয়
- 📱 **Responsive সাইজ**: xs থেকে 2xl পর্যন্ত preset সাইজ

---

## 📁 ফাইল স্ট্রাকচার (File Structure)

```
/utils/
  └── brandConfig.ts          # 🎯 মূল কনফিগারেশন ফাইল (এখানে পরিবর্তন করুন)

/components/
  ├── TalentTutorLogo.tsx     # ✅ আপডেট করা (brandConfig ব্যবহার করে)
  ├── Header.tsx              # ✅ আপডেট করা (language prop যুক্ত)
  └── Footer.tsx              # ✅ আপডেট করা (TalentTutorLogo ব্যবহার করে)
```

---

## 🔧 কীভাবে লোগো পরিবর্তন করবেন (How to Change Logo)

### 1️⃣ লোগো আইকন পরিবর্তন করুন

**ফাইল**: `/utils/brandConfig.ts`

```typescript
// বর্তমানে Sparkles আইকন ব্যবহৃত
export const LOGO_ICON: LucideIcon = Sparkles;

// অন্য আইকন ব্যবহার করতে চাইলে:
export const LOGO_ICON: LucideIcon = GraduationCap;  // শিক্ষার প্রতীক
// অথবা
export const LOGO_ICON: LucideIcon = BookHeart;      // বই এবং হৃদয়
// অথবা
export const LOGO_ICON: LucideIcon = Lightbulb;      // আইডিয়া/শিক্ষা
// অথবা
export const LOGO_ICON: LucideIcon = Award;          // পুরস্কার
// অথবা
export const LOGO_ICON: LucideIcon = Heart;          // দান/ভালোবাসা
```

**উপলব্ধ আইকন** (Available Icons):
- `Sparkles` - বর্তমান (তারকা/চকচকে)
- `GraduationCap` - শিক্ষার টুপি
- `BookHeart` - বই এবং হৃদয়
- `Lightbulb` - আইডিয়া/শিক্ষা
- `Award` - পুরস্কার/অর্জন
- `Heart` - দান/ভালোবাসা

---

### 2️⃣ ব্র্যান্ড নাম পরিবর্তন করুন

**ফাইল**: `/utils/brandConfig.ts`

```typescript
export const BRAND_NAME = {
  en: 'Talent Tutor',          // ইংরেজি নাম
  bn: 'ট্যালেন্ট টিউটর'       // বাংলা নাম
} as const;
```

**উদাহরণ** (Example):
```typescript
export const BRAND_NAME = {
  en: 'Study Bangladesh',      // নতুন নাম
  bn: 'স্টাডি বাংলাদেশ'        // নতুন বাংলা নাম
} as const;
```

---

### 3️⃣ ট্যাগলাইন পরিবর্তন করুন

**ফাইল**: `/utils/brandConfig.ts`

```typescript
export const BRAND_TAGLINE = {
  en: 'Bridge of Education & Charity',
  bn: 'শিক্ষা ও দানের সেতু'
} as const;
```

**উদাহরণ** (Example):
```typescript
export const BRAND_TAGLINE = {
  en: 'Learn, Teach, Grow Together',
  bn: 'একসাথে শিখি, শেখাই, বেড়ে উঠি'
} as const;
```

---

### 4️⃣ লোগো রং পরিবর্তন করুন

**ফাইল**: `/utils/brandConfig.ts`

```typescript
export const BRAND_COLORS = {
  primary: {
    from: 'emerald-500',   // শুরুর রং
    via: 'teal-500',       // মাঝের রং
    to: 'cyan-500',        // শেষের রং
  },
  // অন্যান্য রং...
} as const;
```

**উদাহরণ - নীল থিম** (Example - Blue Theme):
```typescript
export const BRAND_COLORS = {
  primary: {
    from: 'blue-500',      // #3b82f6
    via: 'indigo-500',     // #6366f1
    to: 'violet-500',      // #8b5cf6
  },
  // ...
} as const;
```

**উদাহরণ - লাল থিম** (Example - Red Theme):
```typescript
export const BRAND_COLORS = {
  primary: {
    from: 'red-500',       // #ef4444
    via: 'rose-500',       // #f43f5e
    to: 'pink-500',        // #ec4899
  },
  // ...
} as const;
```

---

## 🎨 ব্যবহার উদাহরণ (Usage Examples)

### Component-এ লোগো যুক্ত করুন

```tsx
import { TalentTutorLogo } from './components/TalentTutorLogo';

function MyComponent() {
  const [language, setLanguage] = useState<'bn' | 'en'>('bn');
  
  return (
    <div>
      {/* ছোট লোগো - শুধু আইকন */}
      <TalentTutorLogo 
        size="sm"
        showText={false}
      />
      
      {/* মাঝারি লোগো - আইকন + টেক্সট */}
      <TalentTutorLogo 
        size="md"
        showText={true}
        language={language}
      />
      
      {/* বড় লোগো - আইকন + টেক্সট + ট্যাগলাইন */}
      <TalentTutorLogo 
        size="lg"
        showText={true}
        showSubtitle={true}
        language={language}
      />
      
      {/* ক্লিকযোগ্য লোগো */}
      <TalentTutorLogo 
        size="md"
        showText={true}
        onClick={() => navigate('/')}
        language={language}
      />
    </div>
  );
}
```

---

## 📐 উপলব্ধ সাইজ (Available Sizes)

| Size | Container | Icon | Text | Best Use |
|------|-----------|------|------|----------|
| `xs` | 6x6 (24px) | 3x3 | text-sm | Favicon, very small spaces |
| `sm` | 8x8 (32px) | 4x4 | text-lg | Mobile header, compact UI |
| `md` | 10x10 (40px) | 5x5 | text-xl | **Default**, header, navbar |
| `lg` | 12x12 (48px) | 6x6 | text-2xl | Footer, landing page |
| `xl` | 16x16 (64px) | 8x8 | text-3xl | Hero section, splash screen |
| `2xl` | 20x20 (80px) | 10x10 | text-4xl | Marketing materials |

---

## 🌍 Language Support

লোগো স্বয়ংক্রিয়ভাবে ভাষা অনুযায়ী পরিবর্তিত হয়:

### বাংলায় (In Bengali):
```tsx
<TalentTutorLogo language="bn" showText={true} showSubtitle={true} />
```
**প্রদর্শিত হবে**:
- নাম: ট্যালেন্ট টিউটর
- ট্যাগলাইন: শিক্ষা ও দানের সেতু

### ইংরেজিতে (In English):
```tsx
<TalentTutorLogo language="en" showText={true} showSubtitle={true} />
```
**প্রদর্শিত হবে**:
- Name: Talent Tutor
- Tagline: Bridge of Education & Charity

---

## 🔄 Helper Functions

`brandConfig.ts` থেকে সরাসরি helper functions ব্যবহার করুন:

```typescript
import {
  getBrandName,
  getBrandTagline,
  getBrandDescription,
  getFontClass,
  getLogoContainerClasses,
  getLogoIconClasses,
  getLogoTextClasses,
  getLogoSubtitleClasses
} from '../utils/brandConfig';

// Get brand name
const name = getBrandName('bn');  // "ট্যালেন্ট টিউটর"
const nameEn = getBrandName('en'); // "Talent Tutor"

// Get tagline
const tagline = getBrandTagline('bn');  // "শিক্ষা ও দানের সেতু"

// Get CSS classes
const containerClasses = getLogoContainerClasses('md', true);
const iconClasses = getLogoIconClasses('md');
const textClasses = getLogoTextClasses('md', 'bn');
```

---

## ✅ যেসব জায়গায় লোগো আপডেট হয়েছে

1. ✅ **Header Component** (`/components/Header.tsx`)
   - Desktop navigation
   - Mobile menu
   - সব পেজে দৃশ্যমান

2. ✅ **Footer Component** (`/components/Footer.tsx`)
   - Footer branding section
   - Language-aware

3. ✅ **TalentTutorLogo Component** (`/components/TalentTutorLogo.tsx`)
   - Reusable logo component
   - Centralized configuration

4. ✅ **সব Profile পেজ**
   - TeacherProfile
   - GuardianProfile
   - StudentProfile
   - AdminProfile
   - DonorProfile

---

## 🚀 দ্রুত পরিবর্তন গাইড (Quick Change Guide)

### শুধু লোগো আইকন পরিবর্তন করতে:

1. Open `/utils/brandConfig.ts`
2. Line 17 এ যান
3. `Sparkles` এর জায়গায় অন্য আইকন লিখুন (যেমন: `GraduationCap`)
4. Save করুন
5. ✨ সম্পূর্ণ অ্যাপে আপডেট হয়ে যাবে!

### শুধু রং পরিবর্তন করতে:

1. Open `/utils/brandConfig.ts`
2. Line 44-50 এ যান (BRAND_COLORS)
3. `emerald-500`, `teal-500`, `cyan-500` পরিবর্তন করুন
4. Save করুন
5. ✨ সম্পূর্ণ অ্যাপে নতুন রং প্রয়োগ হবে!

### শুধু নাম পরিবর্তন করতে:

1. Open `/utils/brandConfig.ts`
2. Line 23-26 এ যান (BRAND_NAME)
3. `en` এবং `bn` নাম পরিবর্তন করুন
4. Save করুন
5. ✨ সব জায়গায় নতুন নাম দেখাবে!

---

## 🎯 Best Practices

1. **সবসময় `brandConfig.ts` ব্যবহার করুন**
   - কখনো hardcode করবেন না
   - Component-এ সরাসরি "Talent Tutor" লিখবেন না

2. **Language prop পাস করুন**
   ```tsx
   <TalentTutorLogo language={currentLanguage} />
   ```

3. **Appropriate সাইজ ব্যবহার করুন**
   - Header: `md`
   - Footer: `lg`
   - Hero: `xl` or `2xl`
   - Mobile: `sm`

4. **Consistent রাখুন**
   - সব জায়গায় একই configuration ব্যবহার করুন

---

## 📝 কাস্টম লোগো Image ব্যবহার করতে চান?

যদি custom image/SVG ফাইল লোগো হিসেবে ব্যবহার করতে চান:

1. Image ফাইল `/public` ফোল্ডারে রাখুন (যেমন: `/public/logo.svg`)

2. `brandConfig.ts` এ নতুন option যুক্ত করুন:
```typescript
export const LOGO_IMAGE = {
  src: '/logo.svg',
  alt: 'Talent Tutor Logo'
} as const;
```

3. `TalentTutorLogo.tsx` component আপডেট করুন:
```tsx
{LOGO_IMAGE ? (
  <img src={LOGO_IMAGE.src} alt={LOGO_IMAGE.alt} className={...} />
) : (
  <LogoIconComponent className={...} />
)}
```

---

## 🐛 সমস্যা সমাধান (Troubleshooting)

### লোগো পরিবর্তন হচ্ছে না?

1. Browser cache clear করুন (Ctrl + Shift + R)
2. Dev server restart করুন
3. TypeScript errors চেক করুন

### রং সঠিকভাবে প্রয়োগ হচ্ছে না?

1. Tailwind JIT mode enabled আছে কিনা চেক করুন
2. Color class names সঠিক আছে কিনা verify করুন
3. `globals.css` এ custom CSS override করছে কিনা চেক করুন

### Language পরিবর্তন হচ্ছে না?

1. `language` prop সঠিকভাবে pass করা হচ্ছে কিনা চেক করুন
2. Parent component থেকে language state পাচ্ছে কিনা verify করুন

---

## 📞 সহায়তা (Support)

কোনো সমস্যা হলে বা প্রশ্ন থাকলে:
- GitHub Issues: টিকেট তৈরি করুন
- Email: support@talenttutor.com
- Documentation: এই ফাইলটি আবার পড়ুন

---

## ✅ সম্পন্ন কাজ (Completed Tasks)

- [x] Global brand configuration file তৈরি
- [x] TalentTutorLogo component আপডেট
- [x] Header component আপডেট
- [x] Footer component আপডেট
- [x] Multi-language support যুক্ত
- [x] Helper functions তৈরি
- [x] Size presets কনফিগার
- [x] Documentation তৈরি

---

## 🎉 উপসংহার (Conclusion)

এখন আপনি `/utils/brandConfig.ts` ফাইল থেকে সম্পূর্ণ Talent Tutor ব্র্যান্ডিং নিয়ন্ত্রণ করতে পারবেন। একবার পরিবর্তন করলেই পুরো অ্যাপ্লিকেশনে আপডেট হয়ে যাবে!

**মনে রাখবেন**: লোগো হলো আপনার ব্র্যান্ডের মুখ। এটি সব জায়গায় consistent এবং professional রাখুন।

---

**Last Updated**: November 8, 2025
**Version**: 1.0.0
**Status**: ✅ Production Ready
