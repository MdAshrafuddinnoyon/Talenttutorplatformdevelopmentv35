import { useEffect, useRef, useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Slider } from './ui/slider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  MapPin, Star, Navigation, Search, Loader2, Filter,
  User, BookOpen, MapPinned, Sparkles, TrendingUp, AlertCircle,
  List, Map as MapIcon, SlidersHorizontal, X, Check, Heart
} from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import { ListAvatar } from './ui/profile-avatar';
import {
  loadGoogleMapsScript,
  getCurrentLocation,
  findBestMatches,
  calculateDistance,
  formatDistance,
  DEFAULT_CENTER,
  mockTeacherLocations,
  type TeacherLocation
} from '../utils/googleMapsConfig';
import { motion, AnimatePresence } from 'motion/react';
import { SafeMapContainer, SafeMapContainerHandle } from './SafeMapContainer';

interface EnhancedAITeacherFinderMapProps {
  language: 'bn' | 'en';
  onTeacherSelect?: (teacher: TeacherLocation) => void;
}

const content = {
  bn: {
    title: 'AI-পাওয়ারড শিক্ষক খুঁজুন',
    subtitle: 'স্মার্ট ম্যাচিং দিয়ে আপনার কাছাকাছি সেরা শিক্ষক খুঁজে পান',
    searchRadius: 'খোঁজার দূরত্ব',
    km: 'কিমি',
    subject: 'বিষয়',
    allSubjects: 'সব বিষয়',
    findNearby: 'কাছাকাছি খুঁজুন',
    useCurrentLocation: 'বর্তমান অবস্থান',
    loading: 'লোড হচ্ছে...',
    searching: 'খুঁজছি...',
    teachersFound: 'শিক্ষক পাওয়া গেছে',
    noTeachersFound: 'কোনো শিক্ষক পাওয়া যায়নি',
    rating: 'রেটিং',
    available: 'উপলব্ধ',
    away: 'দূরে',
    viewProfile: 'প্রোফাইল দেখুন',
    contact: 'যোগাযোগ',
    aiMatching: 'AI ম্যাচিং',
    bestMatch: 'সেরা ম্যাচ',
    nearestTeachers: 'নিকটতম শিক্ষকগণ',
    filterBySubject: 'বিষয় অনুযায়ী ফিল্টার',
    mapView: 'ম্যাপ',
    listView: 'লিস্ট',
    filters: 'ফিল্টার',
    sortBy: 'সাজান',
    distance: 'দূরত্ব',
    matchScore: 'ম্যাচ স্কোর',
    showFilters: 'ফিল্টার দেখান',
    hideFilters: 'ফিল্টার লুকান',
    clearFilters: 'ফিল্টার মুছুন',
    minRating: 'সর্বনিম্ন রেটিং',
    experience: 'অভিজ্ঞতা',
    yearsExp: 'বছর অভিজ্ঞতা',
    priceRange: 'মূল্য পরিসীমা',
    perMonth: '/মাস',
    results: 'ফলাফল',
    saving: 'সেভ করুন',
    saved: 'সেভ হয়েছে',
  },
  en: {
    title: 'AI-Powered Teacher Finder',
    subtitle: 'Find the best teachers near you with smart matching',
    searchRadius: 'Search Radius',
    km: 'km',
    subject: 'Subject',
    allSubjects: 'All Subjects',
    findNearby: 'Find Nearby',
    useCurrentLocation: 'Current Location',
    loading: 'Loading...',
    searching: 'Searching...',
    teachersFound: 'Teachers Found',
    noTeachersFound: 'No teachers found',
    rating: 'Rating',
    available: 'Available',
    away: 'away',
    viewProfile: 'View Profile',
    contact: 'Contact',
    aiMatching: 'AI Matching',
    bestMatch: 'Best Match',
    nearestTeachers: 'Nearest Teachers',
    filterBySubject: 'Filter by Subject',
    mapView: 'Map',
    listView: 'List',
    filters: 'Filters',
    sortBy: 'Sort By',
    distance: 'Distance',
    matchScore: 'Match Score',
    showFilters: 'Show Filters',
    hideFilters: 'Hide Filters',
    clearFilters: 'Clear Filters',
    minRating: 'Min Rating',
    experience: 'Experience',
    yearsExp: 'years exp',
    priceRange: 'Price Range',
    perMonth: '/month',
    results: 'Results',
    saving: 'Save',
    saved: 'Saved',
  }
};

const subjects = [
  { value: 'all', bn: 'সব বিষয়', en: 'All Subjects' },
  { value: 'গণিত', bn: 'গণিত', en: 'Mathematics' },
  { value: 'ইংরেজি', bn: 'ইংরেজি', en: 'English' },
  { value: 'বাংলা', bn: 'বাংলা', en: 'Bangla' },
  { value: 'পদার্থবিজ্ঞান', bn: 'পদার্থবিজ্ঞান', en: 'Physics' },
  { value: 'রসায়ন', bn: 'রসায়ন', en: 'Chemistry' },
  { value: 'জীববিজ্ঞান', bn: 'জীববিজ্ঞান', en: 'Biology' },
  { value: 'কম্পিউটার', bn: 'কম্পিউটার', en: 'Computer' },
];

export function EnhancedAITeacherFinderMap({ language, onTeacherSelect }: EnhancedAITeacherFinderMapProps) {
  const t = content[language];
  const safeContainerRef = useRef<SafeMapContainerHandle>(null);
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapInstanceRef = useRef<google.maps.Map | null>(null);
  const markersRef = useRef<google.maps.Marker[]>([]);
  const userMarkerRef = useRef<google.maps.Marker | null>(null);
  const infoWindowRef = useRef<google.maps.InfoWindow | null>(null);
  const isMountedRef = useRef(true);
  const isCleaningUpRef = useRef(false);

  const [loading, setLoading] = useState(true);
  const [mapError, setMapError] = useState<string | null>(null);
  const [searching, setSearching] = useState(false);
  const [view, setView] = useState<'map' | 'list'>('map');
  const [showFilters, setShowFilters] = useState(false);
  
  // Search parameters
  const [searchRadius, setSearchRadius] = useState([5]); // km
  const [selectedSubject, setSelectedSubject] = useState<string>('all');
  const [minRating, setMinRating] = useState([3.0]);
  const [minExperience, setMinExperience] = useState([0]);
  const [sortBy, setSortBy] = useState<'distance' | 'rating' | 'match'>('match');
  
  // State
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [foundTeachers, setFoundTeachers] = useState<TeacherLocation[]>([]);
  const [filteredTeachers, setFilteredTeachers] = useState<TeacherLocation[]>([]);
  const [selectedTeacher, setSelectedTeacher] = useState<TeacherLocation | null>(null);
  const [savedTeachers, setSavedTeachers] = useState<Set<number>>(new Set());

  useEffect(() => {
    isMountedRef.current = true;
    isCleaningUpRef.current = false;
    
    // Map will be initialized when container is ready via handleMapContainerReady
    
    // Cleanup function with MAXIMUM safety
    return () => {
      // STEP 1: Set cleanup flags IMMEDIATELY to stop all operations
      isMountedRef.current = false;
      isCleaningUpRef.current = true;
      
      // STEP 2: Close InfoWindow SYNCHRONOUSLY before anything else
      // This is THE critical step to prevent removeChild errors
      if (infoWindowRef.current) {
        try {
          infoWindowRef.current.close();
          infoWindowRef.current.setContent('');
          infoWindowRef.current = null;
        } catch (e) {
          // Silent
        }
      }
      
      // STEP 2.5: Cleanup safe container
      if (safeContainerRef.current) {
        try {
          safeContainerRef.current.cleanup();
        } catch (e) {
          // Silent
        }
      }
      
      // STEP 3: Use requestAnimationFrame for smoother cleanup timing
      // This gives browser time to finish any pending renders
      requestAnimationFrame(() => {
        try {
          // Clean up all event listeners on markers
          if (markersRef.current && Array.isArray(markersRef.current)) {
            markersRef.current.forEach(marker => {
              try {
                if (marker) {
                  if (window.google?.maps?.event) {
                    google.maps.event.clearInstanceListeners(marker);
                  }
                  if (typeof marker.setMap === 'function') {
                    marker.setMap(null);
                  }
                }
              } catch (e) {
                // Silent
              }
            });
            markersRef.current = [];
          }
          
          // Clean up user marker
          if (userMarkerRef.current) {
            try {
              if (window.google?.maps?.event) {
                google.maps.event.clearInstanceListeners(userMarkerRef.current);
              }
              if (typeof userMarkerRef.current.setMap === 'function') {
                userMarkerRef.current.setMap(null);
              }
            } catch (e) {
              // Silent
            }
            userMarkerRef.current = null;
          }
          
          // Clean up map instance
          if (mapInstanceRef.current) {
            try {
              if (window.google?.maps?.event) {
                google.maps.event.clearInstanceListeners(mapInstanceRef.current);
              }
            } catch (e) {
              // Silent
            }
            mapInstanceRef.current = null;
          }
          
          // STEP 4: Clean up global function
          // SafeMapContainer handles DOM cleanup automatically
          try {
            delete (window as any).selectTeacher;
          } catch (e) {
            // Silent
          }
        } catch (error) {
          // Silent - cleanup complete
        }
      });
    };
  }, []);

  // Apply filters and sorting whenever parameters change
  useEffect(() => {
    // Only apply filters if component is still mounted
    if (isMountedRef.current && !isCleaningUpRef.current && foundTeachers.length > 0) {
      applyFiltersAndSort();
    }
  }, [foundTeachers, minRating, minExperience, sortBy, selectedSubject]);

  const handleMapContainerReady = (container: HTMLDivElement) => {
    mapContainerRef.current = container;
    if (isMountedRef.current && !isCleaningUpRef.current) {
      initializeMap();
    }
  };

  const initializeMap = async () => {
    // Check if component is still mounted
    if (!isMountedRef.current || isCleaningUpRef.current) return;
    
    try {
      if (isMountedRef.current) setLoading(true);
      
      await loadGoogleMapsScript();

      // Check again after async operation
      if (!isMountedRef.current || isCleaningUpRef.current) return;

      if (!mapContainerRef.current) {
        console.error('Map container ref is not available');
        if (isMountedRef.current) setLoading(false);
        return;
      }

      const center = DEFAULT_CENTER;

      const map = new google.maps.Map(mapContainerRef.current, {
        center: { lat: center.lat, lng: center.lng },
        zoom: 12,
        mapTypeControl: true,
        streetViewControl: false,
        fullscreenControl: true,
        zoomControl: true,
        styles: [
          {
            featureType: 'poi.business',
            stylers: [{ visibility: 'off' }]
          }
        ]
      });

      // Check if still mounted before storing ref
      if (!isMountedRef.current || isCleaningUpRef.current) {
        // Clean up the map we just created
        try {
          google.maps.event.clearInstanceListeners(map);
        } catch (e) {}
        return;
      }

      mapInstanceRef.current = map;
      
      // Initialize info window with options to prevent DOM errors
      infoWindowRef.current = new google.maps.InfoWindow({
        disableAutoPan: false,
        pixelOffset: new google.maps.Size(0, -30)
      });
      
      // Show all teachers initially (only if still mounted)
      if (isMountedRef.current && !isCleaningUpRef.current) {
        displayTeachers(mockTeacherLocations);
        setFoundTeachers(mockTeacherLocations);
      }
      
      if (isMountedRef.current) setLoading(false);
      
      console.info('Enhanced Google Maps initialized successfully');
    } catch (error: any) {
      console.error('Error initializing map:', error);
      if (isMountedRef.current) {
        setMapError(error?.message || 'Failed to load map');
        setLoading(false);
      }
    }
  };

  const displayTeachers = (teachers: TeacherLocation[]) => {
    // Don't display if component is unmounted or cleaning up
    if (!isMountedRef.current || isCleaningUpRef.current) return;
    if (!mapInstanceRef.current) return;

    // Clear existing markers safely
    if (markersRef.current && markersRef.current.length > 0) {
      markersRef.current.forEach(marker => {
        try {
          if (marker && marker.setMap) {
            // Clear listeners before removing
            if (window.google && window.google.maps && window.google.maps.event) {
              google.maps.event.clearInstanceListeners(marker);
            }
            marker.setMap(null);
          }
        } catch (e) {
          // Ignore errors during marker cleanup
        }
      });
      markersRef.current = [];
    }

    // Add markers for each teacher
    teachers.forEach(teacher => {
      // Check if still mounted before creating marker
      if (!isMountedRef.current || isCleaningUpRef.current) return;
      
      const markerColor = teacher.matchScore && teacher.matchScore > 80 ? '#10b981' : '#6366f1';
      
      const marker = new google.maps.Marker({
        map: mapInstanceRef.current!,
        position: { lat: teacher.lat, lng: teacher.lng },
        title: teacher.name,
        animation: google.maps.Animation.DROP,
        icon: {
          path: google.maps.SymbolPath.CIRCLE,
          scale: 12,
          fillColor: markerColor,
          fillOpacity: 0.9,
          strokeColor: '#ffffff',
          strokeWeight: 2
        }
      });

      // Add click listener to show info window
      marker.addListener('click', () => {
        // Check if still mounted when clicked
        if (isMountedRef.current && !isCleaningUpRef.current) {
          showTeacherInfo(teacher, marker);
        }
      });

      markersRef.current.push(marker);
    });

    // Fit bounds to show all markers
    if (teachers.length > 0) {
      const bounds = new google.maps.LatLngBounds();
      teachers.forEach(teacher => {
        bounds.extend({ lat: teacher.lat, lng: teacher.lng });
      });
      
      if (userLocation) {
        bounds.extend(userLocation);
      }
      
      mapInstanceRef.current!.fitBounds(bounds);
    }
  };

  const showTeacherInfo = (teacher: TeacherLocation, marker: google.maps.Marker) => {
    // Don't show info if component is cleaning up or unmounted
    if (!isMountedRef.current || isCleaningUpRef.current) return;
    if (!infoWindowRef.current || !mapInstanceRef.current) return;

    try {
      const content = `
        <div style="padding: 12px; max-width: 250px;">
          <h3 style="margin: 0 0 8px 0; font-size: 16px; font-weight: 600; color: #111827;">
            ${teacher.name}
          </h3>
          <div style="margin-bottom: 8px;">
            <div style="display: flex; align-items: center; gap: 4px; margin-bottom: 4px;">
              <span style="color: #f59e0b; font-size: 14px;">★</span>
              <span style="font-size: 14px; color: #6b7280;">${teacher.rating.toFixed(1)} (${teacher.reviews} reviews)</span>
            </div>
            <div style="font-size: 13px; color: #6b7280; margin-bottom: 4px;">
              📚 ${teacher.subjects.join(', ')}
            </div>
            ${teacher.distance ? `
              <div style="font-size: 13px; color: #6b7280;">
                📍 ${formatDistance(teacher.distance)}
              </div>
            ` : ''}
            ${teacher.matchScore ? `
              <div style="margin-top: 6px; padding: 4px 8px; background: #dbeafe; border-radius: 4px; display: inline-block;">
                <span style="font-size: 12px; color: #1e40af; font-weight: 600;">
                  ${teacher.matchScore}% Match
                </span>
              </div>
            ` : ''}
          </div>
          <button 
            onclick="window.selectTeacher(${teacher.id})"
            style="width: 100%; padding: 8px; background: #10b981; color: white; border: none; border-radius: 6px; font-size: 14px; font-weight: 500; cursor: pointer; margin-top: 8px;"
          >
            ${language === 'bn' ? 'প্রোফাইল দেখুন' : 'View Profile'}
          </button>
        </div>
      `;

      infoWindowRef.current.setContent(content);
      infoWindowRef.current.open(mapInstanceRef.current, marker);
      
      if (isMountedRef.current) {
        setSelectedTeacher(teacher);
      }
    } catch (error) {
      // Silently ignore InfoWindow errors during cleanup
      console.debug('InfoWindow error (safe to ignore during cleanup):', error);
    }
  };

  // Global function for info window button
  (window as any).selectTeacher = (teacherId: number) => {
    const teacher = foundTeachers.find(t => t.id === teacherId);
    if (teacher && onTeacherSelect) {
      onTeacherSelect(teacher);
    }
  };

  const handleFindNearby = async () => {
    try {
      setSearching(true);
      toast.loading(language === 'bn' ? 'শিক্ষক খুঁজছি...' : 'Searching for teachers...', { id: 'search' });

      // Get user location
      let location;
      try {
        location = await getCurrentLocation();
        setUserLocation(location);
      } catch (locationError: any) {
        toast.dismiss('search');
        
        if (locationError.message?.includes('permission denied')) {
          toast.error(
            language === 'bn' 
              ? 'অবস্থান অনুমতি প্রয়োজন। ব্রাউজার সেটিংস থেকে অবস্থান চালু করুন।'
              : 'Location permission required. Please enable location access.',
            { duration: 5000 }
          );
        } else {
          toast.error(
            language === 'bn'
              ? 'অবস্থান পেতে ব্যর্থ। ডিফল্ট অবস্থান ব্যবহার করা হচ্ছে।'
              : 'Failed to get location. Using default location.',
            { duration: 3000 }
          );
        }
        
        location = DEFAULT_CENTER;
        setUserLocation(location);
        setSearching(false);
        return;
      }

      // Add user location marker
      if (userMarkerRef.current) {
        try {
          userMarkerRef.current.setMap(null);
        } catch (e) {
          // Ignore errors during cleanup
        }
      }

      const userMarker = new google.maps.Marker({
        map: mapInstanceRef.current!,
        position: location,
        title: language === 'bn' ? 'আপনার অবস্থান' : 'Your Location',
        animation: google.maps.Animation.BOUNCE,
        icon: {
          url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10" fill="#3b82f6" stroke="#fff" stroke-width="3"/>
              <circle cx="12" cy="12" r="3" fill="#fff"/>
              <circle cx="12" cy="12" r="8" fill="none" stroke="#3b82f6" stroke-width="1" opacity="0.3"/>
            </svg>
          `),
          scaledSize: new google.maps.Size(48, 48),
          anchor: new google.maps.Point(24, 24)
        }
      });

      // Stop bouncing after 2 seconds
      setTimeout(() => {
        userMarker.setAnimation(null);
      }, 2000);

      userMarkerRef.current = userMarker;

      // Find best matches using AI algorithm
      const preferredSubjects = selectedSubject === 'all' ? undefined : [selectedSubject];
      const matches = findBestMatches(
        location.lat,
        location.lng,
        mockTeacherLocations,
        preferredSubjects,
        searchRadius[0]
      );

      setFoundTeachers(matches);
      displayTeachers(matches);

      toast.dismiss('search');
      toast.success(
        language === 'bn'
          ? `${matches.length} জন শিক্ষক পাওয়া গেছে!`
          : `${matches.length} teachers found!`,
        { icon: <Sparkles className="w-4 h-4" /> }
      );
      
      setSearching(false);
    } catch (error) {
      toast.dismiss('search');
      toast.error(
        language === 'bn' 
          ? 'খুঁজতে সমস্যা হয়েছে'
          : 'Search failed'
      );
      setSearching(false);
    }
  };

  const applyFiltersAndSort = () => {
    let filtered = [...foundTeachers];

    // Apply rating filter
    filtered = filtered.filter(t => t.rating >= minRating[0]);

    // Apply experience filter (if available in data)
    // filtered = filtered.filter(t => t.experience >= minExperience[0]);

    // Apply subject filter
    if (selectedSubject !== 'all') {
      filtered = filtered.filter(t => t.subjects.includes(selectedSubject));
    }

    // Sort
    filtered.sort((a, b) => {
      if (sortBy === 'distance') {
        return (a.distance || 0) - (b.distance || 0);
      } else if (sortBy === 'rating') {
        return b.rating - a.rating;
      } else {
        return (b.matchScore || 0) - (a.matchScore || 0);
      }
    });

    setFilteredTeachers(filtered);
    displayTeachers(filtered);
  };

  const clearFilters = () => {
    setSelectedSubject('all');
    setMinRating([3.0]);
    setMinExperience([0]);
    setSortBy('match');
    setFilteredTeachers(foundTeachers);
    displayTeachers(foundTeachers);
  };

  const toggleSaveTeacher = (teacherId: number) => {
    setSavedTeachers(prev => {
      const newSet = new Set(prev);
      if (newSet.has(teacherId)) {
        newSet.delete(teacherId);
        toast.success(language === 'bn' ? 'সেভ থেকে সরানো হয়েছে' : 'Removed from saved');
      } else {
        newSet.add(teacherId);
        toast.success(language === 'bn' ? 'সেভ করা হয়েছে' : 'Saved successfully');
      }
      return newSet;
    });
  };

  const teachersToDisplay = filteredTeachers.length > 0 ? filteredTeachers : foundTeachers;

  if (mapError) {
    return (
      <Card className="p-8 bg-red-50 border-red-200">
        <div className="text-center">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h3 className="text-lg text-gray-900 mb-2">
            {language === 'bn' ? 'ম্যাপ লোড করতে সমস্যা' : 'Map Loading Error'}
          </h3>
          <p className="text-gray-600 mb-4">{mapError}</p>
          <Button onClick={() => window.location.reload()}>
            {language === 'bn' ? 'আবার চেষ্টা করুন' : 'Try Again'}
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-100 to-pink-100 px-4 py-2 rounded-full mb-4"
        >
          <Sparkles className="w-5 h-5 text-purple-600" />
          <span className="text-purple-700 font-medium">{t.aiMatching}</span>
        </motion.div>
        <h2 className={`text-3xl text-gray-900 mb-2 ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>
          {t.title}
        </h2>
        <p className={`text-gray-600 ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>
          {t.subtitle}
        </p>
      </div>

      {/* Main Controls */}
      <Card className="p-6">
        <div className="space-y-4">
          {/* Primary Search Controls */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Subject Filter */}
            <div>
              <label className={`text-sm text-gray-700 mb-2 block ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>
                {t.subject}
              </label>
              <Select value={selectedSubject} onValueChange={setSelectedSubject}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {subjects.map(sub => (
                    <SelectItem key={sub.value} value={sub.value}>
                      {language === 'bn' ? sub.bn : sub.en}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Search Radius */}
            <div>
              <label className={`text-sm text-gray-700 mb-2 block ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>
                {t.searchRadius}: {searchRadius[0]} {t.km}
              </label>
              <Slider
                value={searchRadius}
                onValueChange={setSearchRadius}
                min={1}
                max={20}
                step={1}
                className="mt-2"
              />
            </div>

            {/* Sort By */}
            <div>
              <label className={`text-sm text-gray-700 mb-2 block ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>
                {t.sortBy}
              </label>
              <Select value={sortBy} onValueChange={(val: any) => setSortBy(val)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="match">{t.matchScore}</SelectItem>
                  <SelectItem value="distance">{t.distance}</SelectItem>
                  <SelectItem value="rating">{t.rating}</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Search Button */}
            <div className="flex items-end">
              <Button
                onClick={handleFindNearby}
                disabled={searching || loading}
                className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700"
              >
                {searching || loading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    {t.searching}
                  </>
                ) : (
                  <>
                    <Navigation className="w-4 h-4 mr-2" />
                    {t.findNearby}
                  </>
                )}
              </Button>
            </div>
          </div>

          {/* Advanced Filters Toggle */}
          <div className="flex items-center justify-between pt-2 border-t">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowFilters(!showFilters)}
            >
              <SlidersHorizontal className="w-4 h-4 mr-2" />
              {showFilters ? t.hideFilters : t.showFilters}
            </Button>

            {filteredTeachers.length !== foundTeachers.length && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearFilters}
              >
                <X className="w-4 h-4 mr-2" />
                {t.clearFilters}
              </Button>
            )}
          </div>

          {/* Advanced Filters */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="space-y-4 pt-4 border-t overflow-hidden"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Min Rating */}
                  <div>
                    <label className={`text-sm text-gray-700 mb-2 block ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>
                      {t.minRating}: {minRating[0].toFixed(1)} ⭐
                    </label>
                    <Slider
                      value={minRating}
                      onValueChange={setMinRating}
                      min={0}
                      max={5}
                      step={0.5}
                      className="mt-2"
                    />
                  </div>

                  {/* Min Experience */}
                  <div>
                    <label className={`text-sm text-gray-700 mb-2 block ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>
                      {t.experience}: {minExperience[0]}+ {t.yearsExp}
                    </label>
                    <Slider
                      value={minExperience}
                      onValueChange={setMinExperience}
                      min={0}
                      max={20}
                      step={1}
                      className="mt-2"
                    />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </Card>

      {/* View Toggle & Results Count */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Badge className="bg-emerald-100 text-emerald-800">
            {teachersToDisplay.length} {t.results}
          </Badge>
          {filteredTeachers.length !== foundTeachers.length && (
            <Badge variant="outline">
              {language === 'bn' ? 'ফিল্টার করা' : 'Filtered'}
            </Badge>
          )}
        </div>

        <Tabs value={view} onValueChange={(v: any) => setView(v)} className="w-auto">
          <TabsList>
            <TabsTrigger value="map">
              <MapIcon className="w-4 h-4 mr-2" />
              {t.mapView}
            </TabsTrigger>
            <TabsTrigger value="list">
              <List className="w-4 h-4 mr-2" />
              {t.listView}
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Map View */}
      {view === 'map' && (
        <Card className="overflow-hidden" key="map-card">
          <div className="relative w-full h-[600px] bg-gray-100">
            <SafeMapContainer
              ref={safeContainerRef}
              className="w-full h-full"
              onContainerReady={handleMapContainerReady}
            />
            {loading && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-100 z-10">
                <div className="text-center">
                  <Loader2 className="w-8 h-8 animate-spin text-emerald-600 mx-auto mb-2" />
                  <p className="text-gray-600">{t.loading}</p>
                </div>
              </div>
            )}
            {mapError && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-50 z-10">
                <div className="text-center p-6">
                  <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
                  <p className="text-gray-700 mb-2">{mapError}</p>
                  <Button 
                    onClick={() => {
                      setMapError(null);
                      setLoading(true);
                      initializeMap();
                    }}
                    variant="outline"
                  >
                    {language === 'bn' ? 'আবার চেষ্টা করুন' : 'Try Again'}
                  </Button>
                </div>
              </div>
            )}
          </div>
        </Card>
      )}

      {/* List View */}
      {view === 'list' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {teachersToDisplay.map((teacher, index) => (
            <motion.div
              key={teacher.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card className="p-4 hover:shadow-lg transition-shadow">
                <div className="flex items-start gap-3 mb-3">
                  <ListAvatar
                    src={teacher.avatar}
                    name={teacher.name}
                    size="md"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 truncate">{teacher.name}</h3>
                    <div className="flex items-center gap-1 text-sm text-gray-600">
                      <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                      <span>{teacher.rating.toFixed(1)}</span>
                      <span className="text-gray-400">({teacher.reviews})</span>
                    </div>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => toggleSaveTeacher(teacher.id)}
                    className={savedTeachers.has(teacher.id) ? 'text-red-500' : ''}
                  >
                    <Heart className={`w-4 h-4 ${savedTeachers.has(teacher.id) ? 'fill-current' : ''}`} />
                  </Button>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2 text-gray-600">
                    <BookOpen className="w-4 h-4" />
                    <span className="truncate">{teacher.subjects.join(', ')}</span>
                  </div>
                  {teacher.distance && (
                    <div className="flex items-center gap-2 text-gray-600">
                      <MapPin className="w-4 h-4" />
                      <span>{formatDistance(teacher.distance)}</span>
                    </div>
                  )}
                  {teacher.matchScore && (
                    <div>
                      <Badge className="bg-blue-100 text-blue-800">
                        <TrendingUp className="w-3 h-3 mr-1" />
                        {teacher.matchScore}% {t.bestMatch}
                      </Badge>
                    </div>
                  )}
                </div>

                <div className="mt-4 flex gap-2">
                  <Button
                    size="sm"
                    className="flex-1 bg-emerald-600 hover:bg-emerald-700"
                    onClick={() => onTeacherSelect && onTeacherSelect(teacher)}
                  >
                    {t.viewProfile}
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      setView('map');
                      const marker = markersRef.current.find(m => m.getTitle() === teacher.name);
                      if (marker) {
                        google.maps.event.trigger(marker, 'click');
                      }
                    }}
                  >
                    <MapPin className="w-4 h-4" />
                  </Button>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      )}

      {/* No Results */}
      {teachersToDisplay.length === 0 && !loading && (
        <Card className="p-12">
          <div className="text-center">
            <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className={`text-lg text-gray-900 mb-2 ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>
              {t.noTeachersFound}
            </h3>
            <p className={`text-gray-600 mb-4 ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>
              {language === 'bn' 
                ? 'অন্য ফিল্টার বা বৃহত্তর দূরত্ব দিয়ে চেষ্টা করুন'
                : 'Try different filters or larger search radius'}
            </p>
            <Button variant="outline" onClick={clearFilters}>
              {t.clearFilters}
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
}
