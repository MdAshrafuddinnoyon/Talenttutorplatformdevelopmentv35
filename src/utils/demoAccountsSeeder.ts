/**
 * Demo Accounts Seeder for Talent Tutor
 * Creates demo users for all roles with predefined credentials
 */

import { projectId, publicAnonKey } from './supabase/info';
import { API_BASE_URL, getApiHeaders } from './apiConfig';

const API_BASE = API_BASE_URL;

const getHeaders = () => ({
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${publicAnonKey}`
});

// ==================== DEMO USER CREDENTIALS ====================

export const DEMO_CREDENTIALS = {
  admin: {
    email: 'admin@talenttutor.com',
    phone: '01700000000',
    password: 'Admin@2025',
    name: 'সুপার এডমিন',
    nameEn: 'Super Admin'
  },
  teachers: [
    {
      email: 'teacher1@talenttutor.com',
      phone: '01711111111',
      password: 'Teacher@2025',
      name: 'মোঃ করিম উদ্দিন',
      nameEn: 'Md. Karim Uddin',
      subjects: ['গণিত', 'পদার্থবিজ্ঞান'],
      classes: ['৯ম', '১০ম', 'এসএসসি'],
      medium: ['বাংলা মাধ্যম'],
      experience: '৫ বছর',
      education: 'বিএসসি ইন ম্যাথমেটিক্স, ঢাকা বিশ্ববিদ্যালয়',
      location: { district: 'ঢাকা', area: 'ধানমন্ডি' },
      hourlyRate: 500
    },
    {
      email: 'teacher2@talenttutor.com',
      phone: '01711111112',
      password: 'Teacher@2025',
      name: 'ফাতিমা আক্তার',
      nameEn: 'Fatima Akter',
      subjects: ['ইংরেজি', 'বাংলা'],
      classes: ['৬ষ্ঠ', '৭ম', '৮ম'],
      medium: ['বাংলা মাধ্যম'],
      experience: '৩ বছর',
      education: 'এমএ ইন ইংলিশ, জাহাঙ্গীরনগর বিশ্ববিদ্যালয়',
      location: { district: 'ঢাকা', area: 'মিরপুর' },
      hourlyRate: 400
    },
    {
      email: 'teacher3@talenttutor.com',
      phone: '01711111113',
      password: 'Teacher@2025',
      name: 'রহিম মিয়া',
      nameEn: 'Rahim Mia',
      subjects: ['রসায়ন', 'জীববিজ্ঞান'],
      classes: ['৯ম', '১০ম', 'এইচএসসি'],
      medium: ['বাংলা মাধ্যম', 'ইংরেজি মাধ্যম'],
      experience: '৭ বছর',
      education: 'বিএসসি ইন কেমিস্ট্রি, চট্টগ্রাম বিশ্ববিদ্যালয়',
      location: { district: 'চট্টগ্রাম', area: 'নাসিরাবাদ' },
      hourlyRate: 600
    },
    {
      email: 'teacher4@talenttutor.com',
      phone: '01711111114',
      password: 'Teacher@2025',
      name: 'নাজমা বেগম',
      nameEn: 'Nazma Begum',
      subjects: ['আরবি', 'ইসলাম শিক্ষা'],
      classes: ['৫ম', '৬ষ্ঠ', '৭ম', '৮ম'],
      medium: ['বাংলা মাধ্যম'],
      experience: '৪ বছর',
      education: 'কামিল, আল-আজহার মাদ্রাসা',
      location: { district: 'ঢাকা', area: 'মোহাম্মদপুর' },
      hourlyRate: 350
    },
    {
      email: 'teacher5@talenttutor.com',
      phone: '01711111115',
      password: 'Teacher@2025',
      name: 'সাইফুল ইসলাম',
      nameEn: 'Saiful Islam',
      subjects: ['IELTS', 'Spoken English'],
      classes: ['প্রাপ্তবয়স্ক', 'সব ক্লাস'],
      medium: ['ইংরেজি মাধ্যম'],
      experience: '৬ বছর',
      education: 'MBA, নর্থ সাউথ বিশ্ববিদ্যালয়',
      location: { district: 'ঢাকা', area: 'গুলশান' },
      hourlyRate: 800
    }
  ],
  guardians: [
    {
      email: 'guardian1@talenttutor.com',
      phone: '01722222221',
      password: 'Guardian@2025',
      name: 'আব্দুল করিম',
      nameEn: 'Abdul Karim',
      relation: 'বাবা',
      occupation: 'ব্যবসায়ী',
      location: { district: 'ঢাকা', area: 'ধানমন্ডি' }
    },
    {
      email: 'guardian2@talenttutor.com',
      phone: '01722222222',
      password: 'Guardian@2025',
      name: 'সালমা খাতুন',
      nameEn: 'Salma Khatun',
      relation: 'মা',
      occupation: 'গৃহিণী',
      location: { district: 'ঢাকা', area: 'মিরপুর' }
    },
    {
      email: 'guardian3@talenttutor.com',
      phone: '01722222223',
      password: 'Guardian@2025',
      name: 'জাহিদ হাসান',
      nameEn: 'Zahid Hasan',
      relation: 'বাবা',
      occupation: 'সরকারি চাকুরিজীবী',
      location: { district: 'চট্টগ্রাম', area: 'আগ্রাবাদ' }
    },
    {
      email: 'guardian4@talenttutor.com',
      phone: '01722222224',
      password: 'Guardian@2025',
      name: 'রেহানা পারভীন',
      nameEn: 'Rehana Parvin',
      relation: 'মা',
      occupation: 'শিক্ষিকা',
      location: { district: 'রাজশাহী', area: 'রাজশাহী সদর' }
    },
    {
      email: 'guardian5@talenttutor.com',
      phone: '01722222225',
      password: 'Guardian@2025',
      name: 'মাহমুদুর রহমান',
      nameEn: 'Mahmudur Rahman',
      relation: 'বাবা',
      occupation: 'ব্যাংক কর্মকর্তা',
      location: { district: 'ঢাকা', area: 'বনানী' }
    }
  ],
  students: [
    {
      email: 'student1@talenttutor.com',
      phone: '01733333331',
      password: 'Student@2025',
      name: 'রিয়া খাতুন',
      nameEn: 'Riya Khatun',
      class: '১০ম শ্রেণী',
      school: 'সরকারি বালিকা উচ্চ বিদ্যালয়',
      location: { district: 'ঢাকা', area: 'ধানমন্ডি' }
    },
    {
      email: 'student2@talenttutor.com',
      phone: '01733333332',
      password: 'Student@2025',
      name: 'সাকিব হোসেন',
      nameEn: 'Sakib Hossain',
      class: '৯ম শ্রেণী',
      school: 'আদর্শ স্কুল অ্যান্ড কলেজ',
      location: { district: 'ঢাকা', area: 'মিরপুর' }
    },
    {
      email: 'student3@talenttutor.com',
      phone: '01733333333',
      password: 'Student@2025',
      name: 'আয়েশা সিদ্দিকা',
      nameEn: 'Ayesha Siddika',
      class: '৮ম শ্রেণী',
      school: 'মডেল স্কুল অ্যান্ড কলেজ',
      location: { district: 'চট্টগ্রাম', area: 'আগ্রাবাদ' }
    },
    {
      email: 'student4@talenttutor.com',
      phone: '01733333334',
      password: 'Student@2025',
      name: 'তানভীর আহমেদ',
      nameEn: 'Tanvir Ahmed',
      class: '৭ম শ্রেণী',
      school: 'সরকারি বালক উচ্চ বিদ্যালয়',
      location: { district: 'রাজশাহী', area: 'রাজশাহী সদর' }
    },
    {
      email: 'student5@talenttutor.com',
      phone: '01733333335',
      password: 'Student@2025',
      name: 'মারিয়া আক্তার',
      nameEn: 'Maria Akter',
      class: '৬ষ্ঠ শ্রেণী',
      school: 'আইডিয়াল স্কুল',
      location: { district: 'ঢাকা', area: 'বনানী' }
    }
  ],
  zakatDonors: [
    {
      email: 'zakatdonor1@talenttutor.com',
      phone: '01744444441',
      password: 'Donor@2025',
      name: 'হাজী আবদুস সালাম',
      nameEn: 'Haji Abdus Salam',
      donorType: 'zakat',
      occupation: 'ব্যবসায়ী',
      location: { district: 'ঢাকা', area: 'মতিঝিল' }
    },
    {
      email: 'zakatdonor2@talenttutor.com',
      phone: '01744444442',
      password: 'Donor@2025',
      name: 'আলহাজ্ব নূর মোহাম্মদ',
      nameEn: 'Alhaj Nur Mohammad',
      donorType: 'zakat',
      occupation: 'শিল্পপতি',
      location: { district: 'চট্টগ্রাম', area: 'নাসিরাবাদ' }
    },
    {
      email: 'zakatdonor3@talenttutor.com',
      phone: '01744444443',
      password: 'Donor@2025',
      name: 'রশিদ আহমেদ',
      nameEn: 'Rashid Ahmed',
      donorType: 'zakat',
      occupation: 'আমদানি-রপ্তানি ব্যবসায়ী',
      location: { district: 'ঢাকা', area: 'গুলশান' }
    },
    {
      email: 'zakatdonor4@talenttutor.com',
      phone: '01744444444',
      password: 'Donor@2025',
      name: 'ফরিদ উদ্দিন',
      nameEn: 'Farid Uddin',
      donorType: 'zakat',
      occupation: 'রিয়েল এস্টেট ব্যবসায়ী',
      location: { district: 'সিলেট', area: 'সিলেট সদর' }
    },
    {
      email: 'zakatdonor5@talenttutor.com',
      phone: '01744444445',
      password: 'Donor@2025',
      name: 'মকবুল হোসেন',
      nameEn: 'Mokbul Hossain',
      donorType: 'zakat',
      occupation: 'গার্মেন্টস ব্যবসায়ী',
      location: { district: 'ঢাকা', area: 'উত্তরা' }
    }
  ],
  materialDonors: [
    {
      email: 'materialdonor1@talenttutor.com',
      phone: '01755555551',
      password: 'Donor@2025',
      name: 'সাদিয়া রহমান',
      nameEn: 'Sadia Rahman',
      donorType: 'material',
      occupation: 'পাবলিশার',
      location: { district: 'ঢাকা', area: 'নিউমার্কেট' }
    },
    {
      email: 'materialdonor2@talenttutor.com',
      phone: '01755555552',
      password: 'Donor@2025',
      name: 'জাহিদুল ইসলাম',
      nameEn: 'Zahidul Islam',
      donorType: 'material',
      occupation: 'শিক্ষা উপকরণ ব্যবসায়ী',
      location: { district: 'ঢাকা', area: 'ফার্মগেট' }
    },
    {
      email: 'materialdonor3@talenttutor.com',
      phone: '01755555553',
      password: 'Donor@2025',
      name: 'তাহমিনা সুলতানা',
      nameEn: 'Tahmina Sultana',
      donorType: 'material',
      occupation: 'বুক ডিস্ট্রিবিউটর',
      location: { district: 'চট্টগ্রাম', area: 'চকবাজার' }
    },
    {
      email: 'materialdonor4@talenttutor.com',
      phone: '01755555554',
      password: 'Donor@2025',
      name: 'নাসির উদ্দিন',
      nameEn: 'Nasir Uddin',
      donorType: 'material',
      occupation: 'স্টেশনারি শপ মালিক',
      location: { district: 'রাজশাহী', area: 'রাজশাহী সদর' }
    },
    {
      email: 'materialdonor5@talenttutor.com',
      phone: '01755555555',
      password: 'Donor@2025',
      name: 'আনিসুর রহমান',
      nameEn: 'Anisur Rahman',
      donorType: 'material',
      occupation: 'কম্পিউটার ব্যবসায়ী',
      location: { district: 'ঢাকা', area: 'ইলেক্ট্রনিক্স মার্কেট' }
    }
  ]
};

// ==================== SEED FUNCTIONS ====================

/**
 * Create demo admin account
 */
export async function seedAdminAccount(): Promise<boolean> {
  try {
    const response = await fetch(`${API_BASE}/auth/register`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({
        ...DEMO_CREDENTIALS.admin,
        role: 'admin',
        status: 'active',
        isVerified: true,
        isProfileComplete: true
      })
    });

    if (!response.ok) {
      console.error('Failed to create admin account');
      return false;
    }

    console.log('✅ Admin account created successfully');
    return true;
  } catch (error) {
    console.error('Error creating admin account:', error);
    return false;
  }
}

/**
 * Create demo teacher accounts
 */
export async function seedTeacherAccounts(): Promise<boolean> {
  try {
    let successCount = 0;

    for (const teacher of DEMO_CREDENTIALS.teachers) {
      const response = await fetch(`${API_BASE}/auth/register`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify({
          ...teacher,
          role: 'teacher',
          status: 'active',
          credits: 50,
          isVerified: true,
          isProfileComplete: true,
          rating: 4.5 + Math.random() * 0.5,
          totalReviews: Math.floor(Math.random() * 50) + 10,
          bio: `অভিজ্ঞ শিক্ষক। ${teacher.experience} এর অভিজ্ঞতা সহ।`
        })
      });

      if (response.ok) {
        successCount++;
        console.log(`✅ Teacher ${teacher.nameEn} created`);
      }
    }

    console.log(`✅ ${successCount}/5 Teacher accounts created successfully`);
    return successCount === 5;
  } catch (error) {
    console.error('Error creating teacher accounts:', error);
    return false;
  }
}

/**
 * Create demo guardian accounts
 */
export async function seedGuardianAccounts(): Promise<boolean> {
  try {
    let successCount = 0;

    for (const guardian of DEMO_CREDENTIALS.guardians) {
      const response = await fetch(`${API_BASE}/auth/register`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify({
          ...guardian,
          role: 'guardian',
          status: 'active',
          credits: 100,
          isVerified: true,
          isProfileComplete: true
        })
      });

      if (response.ok) {
        successCount++;
        console.log(`✅ Guardian ${guardian.nameEn} created`);
      }
    }

    console.log(`✅ ${successCount}/5 Guardian accounts created successfully`);
    return successCount === 5;
  } catch (error) {
    console.error('Error creating guardian accounts:', error);
    return false;
  }
}

/**
 * Create demo student accounts
 */
export async function seedStudentAccounts(): Promise<boolean> {
  try {
    let successCount = 0;

    for (const student of DEMO_CREDENTIALS.students) {
      const response = await fetch(`${API_BASE}/auth/register`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify({
          ...student,
          role: 'student',
          status: 'active',
          isVerified: true,
          isProfileComplete: true
        })
      });

      if (response.ok) {
        successCount++;
        console.log(`✅ Student ${student.nameEn} created`);
      }
    }

    console.log(`✅ ${successCount}/5 Student accounts created successfully`);
    return successCount === 5;
  } catch (error) {
    console.error('Error creating student accounts:', error);
    return false;
  }
}

/**
 * Create demo zakat donor accounts
 */
export async function seedZakatDonorAccounts(): Promise<boolean> {
  try {
    let successCount = 0;

    for (const donor of DEMO_CREDENTIALS.zakatDonors) {
      const response = await fetch(`${API_BASE}/auth/register`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify({
          ...donor,
          role: 'donor',
          status: 'active',
          isVerified: true,
          isProfileComplete: true,
          totalDonations: 0,
          donationAmount: 0
        })
      });

      if (response.ok) {
        successCount++;
        console.log(`✅ Zakat Donor ${donor.nameEn} created`);
      }
    }

    console.log(`✅ ${successCount}/5 Zakat Donor accounts created successfully`);
    return successCount === 5;
  } catch (error) {
    console.error('Error creating zakat donor accounts:', error);
    return false;
  }
}

/**
 * Create demo material donor accounts
 */
export async function seedMaterialDonorAccounts(): Promise<boolean> {
  try {
    let successCount = 0;

    for (const donor of DEMO_CREDENTIALS.materialDonors) {
      const response = await fetch(`${API_BASE}/auth/register`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify({
          ...donor,
          role: 'donor',
          status: 'active',
          isVerified: true,
          isProfileComplete: true,
          totalDonations: 0
        })
      });

      if (response.ok) {
        successCount++;
        console.log(`✅ Material Donor ${donor.nameEn} created`);
      }
    }

    console.log(`✅ ${successCount}/5 Material Donor accounts created successfully`);
    return successCount === 5;
  } catch (error) {
    console.error('Error creating material donor accounts:', error);
    return false;
  }
}

/**
 * Seed all demo accounts
 */
export async function seedAllDemoAccounts(): Promise<void> {
  console.log('🌱 Starting demo accounts seeding...\n');

  console.log('1️⃣ Creating Admin account...');
  await seedAdminAccount();

  console.log('\n2️⃣ Creating Teacher accounts...');
  await seedTeacherAccounts();

  console.log('\n3️⃣ Creating Guardian accounts...');
  await seedGuardianAccounts();

  console.log('\n4️⃣ Creating Student accounts...');
  await seedStudentAccounts();

  console.log('\n5️⃣ Creating Zakat Donor accounts...');
  await seedZakatDonorAccounts();

  console.log('\n6️⃣ Creating Material Donor accounts...');
  await seedMaterialDonorAccounts();

  console.log('\n✅ All demo accounts seeded successfully!');
  console.log('\n📋 See DEMO_ACCOUNTS_CREDENTIALS.md for login information');
}

/**
 * Get credentials document text
 */
export function getCredentialsDocument(): string {
  return `# 🔐 Talent Tutor - Demo Account Credentials

## Overview
This document contains login credentials for all demo accounts in the Talent Tutor system.

---

## 👨‍💼 Admin Account (1)

| Name | Email | Phone | Password | Role |
|------|-------|-------|----------|------|
| ${DEMO_CREDENTIALS.admin.name} | ${DEMO_CREDENTIALS.admin.email} | ${DEMO_CREDENTIALS.admin.phone} | ${DEMO_CREDENTIALS.admin.password} | Admin |

---

## 👨‍🏫 Teacher Accounts (5)

| # | Name | Email | Phone | Password | Subjects | Experience |
|---|------|-------|-------|----------|----------|------------|
${DEMO_CREDENTIALS.teachers.map((t, i) => 
  `| ${i+1} | ${t.name} | ${t.email} | ${t.phone} | ${t.password} | ${t.subjects.join(', ')} | ${t.experience} |`
).join('\n')}

---

## 👨‍👩‍👧‍👦 Guardian Accounts (5)

| # | Name | Email | Phone | Password | Relation | Occupation |
|---|------|-------|-------|----------|----------|------------|
${DEMO_CREDENTIALS.guardians.map((g, i) => 
  `| ${i+1} | ${g.name} | ${g.email} | ${g.phone} | ${g.password} | ${g.relation} | ${g.occupation} |`
).join('\n')}

---

## 👨‍🎓 Student Accounts (5)

| # | Name | Email | Phone | Password | Class | School |
|---|------|-------|-------|----------|-------|--------|
${DEMO_CREDENTIALS.students.map((s, i) => 
  `| ${i+1} | ${s.name} | ${s.email} | ${s.phone} | ${s.password} | ${s.class} | ${s.school} |`
).join('\n')}

---

## 💰 Zakat Donor Accounts (5)

| # | Name | Email | Phone | Password | Occupation | Location |
|---|------|-------|-------|----------|------------|----------|
${DEMO_CREDENTIALS.zakatDonors.map((d, i) => 
  `| ${i+1} | ${d.name} | ${d.email} | ${d.phone} | ${d.password} | ${d.occupation} | ${d.location.area}, ${d.location.district} |`
).join('\n')}

---

## 📚 Material Donor Accounts (5)

| # | Name | Email | Phone | Password | Occupation | Location |
|---|------|-------|-------|----------|------------|----------|
${DEMO_CREDENTIALS.materialDonors.map((d, i) => 
  `| ${i+1} | ${d.name} | ${d.email} | ${d.phone} | ${d.password} | ${d.occupation} | ${d.location.area}, ${d.location.district} |`
).join('\n')}

---

## 🔑 Quick Login Format

### Via Email:
\`\`\`
Email: [email from table above]
Password: [password from table above]
\`\`\`

### Via Phone:
\`\`\`
Phone: [phone from table above]
Password: [password from table above]
\`\`\`

---

## 📊 Account Summary

- **Total Accounts:** 26
- **Admin:** 1
- **Teachers:** 5
- **Guardians:** 5
- **Students:** 5
- **Zakat Donors:** 5
- **Material Donors:** 5

---

## ⚠️ Security Notes

1. These are DEMO accounts for testing purposes only
2. Change passwords before production deployment
3. All accounts have initial credits:
   - Teachers: 50 credits
   - Guardians: 100 credits
   - Students: 0 credits
4. All accounts are verified and have complete profiles

---

## 🔗 Database Connection

- **Backend:** Supabase
- **API Base:** \`https://[project-id].supabase.co/functions/v1/make-server-c70f394b\`
- **Storage:** Key-Value Store

---

**Generated:** ${new Date().toLocaleString('bn-BD', { timeZone: 'Asia/Dhaka' })}
`;
}
