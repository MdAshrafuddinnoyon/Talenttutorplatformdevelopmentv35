import { useEffect, useState } from 'react';

/**
 * Silent Demo Users Auto-Initializer
 * 
 * This component displays helpful information about demo users
 * but does NOT auto-initialize to avoid rate limiting.
 * 
 * Users should manually run the server initialization endpoint
 * or the demo users will be created on first successful login attempt.
 */

export function DemoUsersAutoInit() {
  const [hasShownInfo, setHasShownInfo] = useState(false);

  useEffect(() => {
    // Only show info once per session
    if (!hasShownInfo) {
      const initialized = localStorage.getItem('demo_users_initialized');
      
      if (!initialized) {
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        console.log('📋 DEMO USERS INFORMATION');
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        console.log('');
        console.log('Demo users are NOT auto-initialized to avoid rate limiting.');
        console.log('');
        console.log('OPTIONS:');
        console.log('');
        console.log('1️⃣ MANUAL INITIALIZATION (Recommended):');
        console.log('   Run this in browser console:');
        console.log('   ');
        console.log('   fetch("https://wkdksiagjwrrocpqkbnh.supabase.co/functions/v1/make-server-5b21d3ea/init-demo-data", {');
        console.log('     method: "POST",');
        console.log('     headers: {');
        console.log('       "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndrZGtzaWFnandycm9jcHFrYm5oIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI1MTkwMzcsImV4cCI6MjA3ODA5NTAzN30.XJSvM3RJH0KlVkA0HmqZDwDQytdxu1pxJd1SVLgxS_Q"');
        console.log('     }');
        console.log('   }).then(r => r.json()).then(d => console.log(d));');
        console.log('');
        console.log('2️⃣ OR CREATE MANUALLY:');
        console.log('   Use the "Register" button and create accounts manually');
        console.log('');
        console.log('3️⃣ DEMO CREDENTIALS (if already created):');
        console.log('   Admin:    admin@talenttutor.com / Admin@2025');
        console.log('   Teacher:  teacher1@talenttutor.com / Teacher@2025');
        console.log('   Guardian: guardian1@talenttutor.com / Guardian@2025');
        console.log('   Student:  student1@talenttutor.com / Student@2025');
        console.log('   Donor:    zakatdonor1@talenttutor.com / Donor@2025');
        console.log('');
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      }
      
      setHasShownInfo(true);
    }
  }, [hasShownInfo]);

  // This component renders nothing - it only shows console info
  return null;
}
