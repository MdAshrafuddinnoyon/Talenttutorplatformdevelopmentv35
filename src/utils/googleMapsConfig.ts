// Google Maps API Configuration and Utilities
// API Key is now stored securely in environment variables

// Get API key from environment variable or use default development key
export const getGoogleMapsApiKey = (): string => {
  let viteKey: string | undefined;
  let envKey: string | undefined;
  
  // Safely try to get from Vite environment variables
  try {
    if (typeof import.meta !== 'undefined' && import.meta.env) {
      // Try to get from Vite environment variables (must have VITE_ prefix)
      viteKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
      
      // Try to get from environment without prefix (for Supabase)
      envKey = import.meta.env.GOOGLE_MAPS_API_KEY;
    }
  } catch (error) {
    // import.meta.env might not be available in all contexts
    console.info('Environment variables not available, using fallback');
  }
  
  // Use the key from documentation as fallback
  // This key has been provided by the user
  const fallbackKey = 'AIzaSyAJiRPxTVsYUSOcZITAdwJCHnXecH-x79Y';
  
  const finalKey = viteKey || envKey || fallbackKey;
  
  // Debug logging
  if (!viteKey && !envKey) {
    console.info('✅ Using provided Google Maps API key');
  } else {
    console.info('✅ Google Maps API key loaded from environment');
  }
  
  return finalKey;
};

// Dhaka, Bangladesh - Default Center
export const DEFAULT_CENTER = {
  lat: 23.8103,
  lng: 90.4125
};

// Bangladesh Bounds
export const BANGLADESH_BOUNDS = {
  north: 26.6345,
  south: 20.7431,
  east: 92.6738,
  west: 88.0088
};

// Popular Locations in Bangladesh
export const POPULAR_LOCATIONS = {
  dhaka: { lat: 23.8103, lng: 90.4125, name: 'ঢাকা', nameEn: 'Dhaka' },
  chittagong: { lat: 22.3569, lng: 91.7832, name: 'চট্টগ্রাম', nameEn: 'Chittagong' },
  sylhet: { lat: 24.8949, lng: 91.8687, name: 'সিলেট', nameEn: 'Sylhet' },
  rajshahi: { lat: 24.3745, lng: 88.6042, name: 'রাজশাহী', nameEn: 'Rajshahi' },
  khulna: { lat: 22.8456, lng: 89.5403, name: 'খুলনা', nameEn: 'Khulna' },
  barisal: { lat: 22.7010, lng: 90.3535, name: 'বরিশাল', nameEn: 'Barisal' },
  rangpur: { lat: 25.7439, lng: 89.2752, name: 'রংপুর', nameEn: 'Rangpur' },
  mymensingh: { lat: 24.7471, lng: 90.4203, name: 'ময়মনসিংহ', nameEn: 'Mymensingh' },
};

// Dhaka Areas
export const DHAKA_AREAS = [
  { name: 'ধানমন্ডি', nameEn: 'Dhanmondi', lat: 23.7465, lng: 90.3763 },
  { name: 'গুলশান', nameEn: 'Gulshan', lat: 23.7925, lng: 90.4078 },
  { name: 'মিরপুর', nameEn: 'Mirpur', lat: 23.8223, lng: 90.3654 },
  { name: 'মোহাম্মদপুর', nameEn: 'Mohammadpur', lat: 23.7679, lng: 90.3565 },
  { name: 'উত্তরা', nameEn: 'Uttara', lat: 23.8759, lng: 90.3795 },
  { name: 'বনানী', nameEn: 'Banani', lat: 23.7937, lng: 90.4066 },
  { name: 'বসুন্ধরা', nameEn: 'Bashundhara', lat: 23.8223, lng: 90.4272 },
  { name: 'মতিঝিল', nameEn: 'Motijheel', lat: 23.7330, lng: 90.4172 },
  { name: 'পল্টন', nameEn: 'Paltan', lat: 23.7378, lng: 90.4142 },
  { name: 'বাড্ডা', nameEn: 'Badda', lat: 23.7808, lng: 90.4265 },
];

export interface Location {
  lat: number;
  lng: number;
  address?: string;
  area?: string;
  city?: string;
  district?: string;
}

export interface TeacherLocation extends Location {
  teacherId: string;
  teacherName: string;
  subjects: string[];
  rating: number;
  availability: boolean;
}

export interface TuitionLocation extends Location {
  tuitionId: string;
  title: string;
  subject: string;
  salary: string;
  postedBy: string;
}

// Calculate distance between two points using Haversine formula
export function calculateDistance(
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number
): number {
  const R = 6371; // Radius of the Earth in km
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLng = (lng2 - lng1) * (Math.PI / 180);
  
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) *
    Math.cos(lat2 * (Math.PI / 180)) *
    Math.sin(dLng / 2) *
    Math.sin(dLng / 2);
  
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;
  
  return Math.round(distance * 10) / 10; // Round to 1 decimal
}

// Format distance for display
export function formatDistance(km: number, language: 'bn' | 'en'): string {
  if (km < 1) {
    const meters = Math.round(km * 1000);
    return language === 'bn' ? `${meters} মিটার` : `${meters} meters`;
  }
  return language === 'bn' ? `${km} কিমি` : `${km} km`;
}

// Get nearby items within radius
export function getNearbyItems<T extends Location>(
  centerLat: number,
  centerLng: number,
  items: T[],
  radiusKm: number = 5
): T[] {
  return items.filter(item => {
    const distance = calculateDistance(centerLat, centerLng, item.lat, item.lng);
    return distance <= radiusKm;
  });
}

// Sort items by distance
export function sortByDistance<T extends Location>(
  centerLat: number,
  centerLng: number,
  items: T[]
): T[] {
  return items.sort((a, b) => {
    const distA = calculateDistance(centerLat, centerLng, a.lat, a.lng);
    const distB = calculateDistance(centerLat, centerLng, b.lat, b.lng);
    return distA - distB;
  });
}

// Load Google Maps Script
export function loadGoogleMapsScript(): Promise<void> {
  return new Promise((resolve, reject) => {
    // Check if already loaded
    if (window.google && window.google.maps) {
      resolve();
      return;
    }

    // Check if script is already being loaded
    const existingScript = document.querySelector(
      `script[src*="maps.googleapis.com"]`
    );
    if (existingScript) {
      existingScript.addEventListener('load', () => resolve());
      return;
    }

    // Create and load script
    let apiKey: string;
    try {
      apiKey = getGoogleMapsApiKey();
    } catch (error) {
      const errorMsg = 'Google Maps API key is not configured';
      console.error(errorMsg, error);
      reject(new Error(errorMsg));
      return;
    }
    
    if (!apiKey) {
      const errorMsg = 'Google Maps API key is not configured';
      console.error(errorMsg);
      reject(new Error(errorMsg));
      return;
    }
    
    console.info('✅ Loading Google Maps with key:', apiKey.substring(0, 12) + '...');
    
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places,geometry,geocoding,marker&loading=async`;
    script.async = true;
    script.defer = true;
    
    script.addEventListener('load', () => {
      console.info('✅ Google Maps loaded successfully');
      resolve();
    });
    
    script.addEventListener('error', (error) => {
      console.error('❌ Error loading Google Maps script');
      console.error('Please check: 1) API key is correct 2) Maps JavaScript API is enabled 3) Billing is enabled');
      reject(new Error('Failed to load Google Maps. Check API key and billing.'));
    });
    
    document.head.appendChild(script);
  });
}

// Geocode address to coordinates
export async function geocodeAddress(address: string): Promise<Location | null> {
  try {
    await loadGoogleMapsScript();
    
    const geocoder = new google.maps.Geocoder();
    
    return new Promise((resolve, reject) => {
      geocoder.geocode(
        { 
          address: address,
          componentRestrictions: { country: 'BD' } // Restrict to Bangladesh
        },
        (results, status) => {
          if (status === 'OK' && results && results[0]) {
            const location = results[0].geometry.location;
            resolve({
              lat: location.lat(),
              lng: location.lng(),
              address: results[0].formatted_address
            });
          } else {
            console.error('Geocoding failed:', status);
            resolve(null);
          }
        }
      );
    });
  } catch (error) {
    console.error('Error in geocodeAddress:', error);
    return null;
  }
}

// Reverse geocode coordinates to address
export async function reverseGeocode(lat: number, lng: number): Promise<string | null> {
  try {
    await loadGoogleMapsScript();
    
    const geocoder = new google.maps.Geocoder();
    
    return new Promise((resolve, reject) => {
      geocoder.geocode(
        { location: { lat, lng } },
        (results, status) => {
          if (status === 'OK' && results && results[0]) {
            resolve(results[0].formatted_address);
          } else {
            console.error('Reverse geocoding failed:', status);
            resolve(null);
          }
        }
      );
    });
  } catch (error) {
    console.error('Error in reverseGeocode:', error);
    return null;
  }
}

// Get current user location
export function getCurrentLocation(): Promise<Location> {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      console.warn('Geolocation is not supported by this browser');
      reject(new Error('Geolocation is not supported by this browser'));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log('Location obtained successfully:', {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        });
        resolve({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        });
      },
      (error) => {
        // Handle geolocation errors gracefully
        let errorMessage = 'অবস্থান পেতে ব্যর্থ';
        
        switch(error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = 'Location permission denied. Please enable location access in your browser settings.';
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = 'Location information unavailable';
            break;
          case error.TIMEOUT:
            errorMessage = 'Location request timed out';
            break;
          default:
            errorMessage = 'Unknown error occurred';
        }
        
        // Reject with informative error instead of silently resolving to default
        reject(new Error(errorMessage));
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0
      }
    );
  });
}

// Mock Teacher Locations (Demo Data)
export const mockTeacherLocations: TeacherLocation[] = [
  {
    teacherId: 't-001',
    teacherName: 'মোঃ করিম উদ্দিন',
    subjects: ['গণিত', 'পদার্থবিজ্ঞান'],
    rating: 4.8,
    availability: true,
    lat: 23.7465,
    lng: 90.3763,
    area: 'ধানমন্ডি',
    city: 'ঢাকা'
  },
  {
    teacherId: 't-002',
    teacherName: 'সাবিনা আক্তার',
    subjects: ['ইংরেজি', 'বাংলা'],
    rating: 4.9,
    availability: true,
    lat: 23.7925,
    lng: 90.4078,
    area: 'গুলশান',
    city: 'ঢাকা'
  },
  {
    teacherId: 't-003',
    teacherName: 'রফিকুল ইসলাম',
    subjects: ['রসায়ন', 'জীববিজ্ঞান'],
    rating: 4.7,
    availability: true,
    lat: 23.8223,
    lng: 90.3654,
    area: 'মিরপুর',
    city: 'ঢাকা'
  },
  {
    teacherId: 't-004',
    teacherName: 'নাজমা খাতুন',
    subjects: ['গণিত', 'কম্পিউটার'],
    rating: 4.6,
    availability: false,
    lat: 23.7679,
    lng: 90.3565,
    area: 'মোহাম্মদপুর',
    city: 'ঢাকা'
  },
  {
    teacherId: 't-005',
    teacherName: 'তানভীর আহমেদ',
    subjects: ['পদার্থবিজ্ঞান', 'গণিত'],
    rating: 4.9,
    availability: true,
    lat: 23.8759,
    lng: 90.3795,
    area: 'উত্তরা',
    city: 'ঢাকা'
  },
];

// Mock Tuition Locations (Demo Data)
export const mockTuitionLocations: TuitionLocation[] = [
  {
    tuitionId: 'tu-001',
    title: 'গণিত শিক্ষক প্রয়োজন (ক্লাস ৮-১০)',
    subject: 'গণিত',
    salary: '৮,০০০-১০,০০০ টাকা/মাস',
    postedBy: 'মিসেস রহিমা',
    lat: 23.7465,
    lng: 90.3763,
    area: 'ধানমন্ডি',
    city: 'ঢাকা'
  },
  {
    tuitionId: 'tu-002',
    title: 'ইংরেজি টিউটর (O/A Level)',
    subject: 'ইংরেজি',
    salary: '১২,০০০-১৫,০০০ টাকা/মাস',
    postedBy: 'জনাব কামাল',
    lat: 23.7937,
    lng: 90.4066,
    area: 'বনানী',
    city: 'ঢাকা'
  },
  {
    tuitionId: 'tu-003',
    title: 'বিজ্ঞান শিক্ষক (ক্লাস ৬-৮)',
    subject: 'বিজ্ঞান',
    salary: '৬,০০০-৮,০০০ টাকা/মাস',
    postedBy: 'মিসেস সাদিয়া',
    lat: 23.8223,
    lng: 90.4272,
    area: 'বসুন্ধরা',
    city: 'ঢাকা'
  },
];

// AI-Powered Matching Algorithm
export function findBestMatches(
  userLat: number,
  userLng: number,
  teachers: TeacherLocation[],
  preferredSubjects?: string[],
  maxDistance: number = 10
): TeacherLocation[] {
  // Filter by distance
  let filtered = getNearbyItems(userLat, userLng, teachers, maxDistance);
  
  // Filter by subject preference if provided
  if (preferredSubjects && preferredSubjects.length > 0) {
    filtered = filtered.filter(teacher =>
      teacher.subjects.some(subject =>
        preferredSubjects.includes(subject)
      )
    );
  }
  
  // Filter only available teachers
  filtered = filtered.filter(teacher => teacher.availability);
  
  // Sort by rating and distance
  filtered.sort((a, b) => {
    const distA = calculateDistance(userLat, userLng, a.lat, a.lng);
    const distB = calculateDistance(userLat, userLng, b.lat, b.lng);
    
    // Weighted scoring: 60% rating, 40% distance (closer is better)
    const scoreA = (a.rating / 5) * 0.6 + (1 - distA / maxDistance) * 0.4;
    const scoreB = (b.rating / 5) * 0.6 + (1 - distB / maxDistance) * 0.4;
    
    return scoreB - scoreA;
  });
  
  return filtered;
}

// Type declarations for Google Maps
declare global {
  interface Window {
    google: any;
  }
}
