import { useEffect, useRef, useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Slider } from './ui/slider';
import { 
  MapPin, Star, Navigation, Search, Loader2, Filter,
  User, BookOpen, MapPinned, Sparkles, TrendingUp, AlertCircle
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

interface AITeacherFinderMapProps {
  language: 'bn' | 'en';
  onTeacherSelect?: (teacher: TeacherLocation) => void;
}

const content = {
  bn: {
    title: 'AI-পাওয়ারড শিক্ষক খুঁজুন',
    subtitle: 'আপনার কাছাকাছি সেরা শিক্ষক খুঁজে পান',
    searchRadius: 'খোঁজার দূরত্ব',
    km: 'কিমি',
    subject: 'বিষয়',
    allSubjects: 'সব বিষয়',
    findNearby: 'কাছাকাছি খুঁজুন',
    useCurrentLocation: 'বর্তমান অবস্থান ব্যবহার করুন',
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
    filterBySubject: 'বিষয় অনুযায়ী ফিল্টার করুন',
    mapView: 'ম্যাপ ভিউ',
    listView: 'লিস্ট ভিউ'
  },
  en: {
    title: 'AI-Powered Teacher Finder',
    subtitle: 'Find the best teachers near you',
    searchRadius: 'Search Radius',
    km: 'km',
    subject: 'Subject',
    allSubjects: 'All Subjects',
    findNearby: 'Find Nearby',
    useCurrentLocation: 'Use Current Location',
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
    mapView: 'Map View',
    listView: 'List View'
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

export function AITeacherFinderMap({ language, onTeacherSelect }: AITeacherFinderMapProps) {
  const t = content[language];
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<google.maps.Map | null>(null);
  const markersRef = useRef<google.maps.Marker[]>([]);
  const userMarkerRef = useRef<google.maps.Marker | null>(null);

  const [loading, setLoading] = useState(true);
  const [mapError, setMapError] = useState<string | null>(null);
  const [searching, setSearching] = useState(false);
  const [searchRadius, setSearchRadius] = useState([5]); // km
  const [selectedSubject, setSelectedSubject] = useState<string>('all');
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [foundTeachers, setFoundTeachers] = useState<TeacherLocation[]>([]);
  const [selectedTeacher, setSelectedTeacher] = useState<TeacherLocation | null>(null);

  useEffect(() => {
    initializeMap();
  }, []);

  const initializeMap = async () => {
    try {
      setLoading(true);
      
      // Load Google Maps script
      await loadGoogleMapsScript();

      if (!mapRef.current) {
        console.error('Map container ref is not available');
        setLoading(false);
        return;
      }

      const center = DEFAULT_CENTER;

      const map = new google.maps.Map(mapRef.current, {
        center: { lat: center.lat, lng: center.lng },
        zoom: 12,
        mapTypeControl: true,
        streetViewControl: false,
        fullscreenControl: true,
        styles: [
          {
            featureType: 'poi.business',
            stylers: [{ visibility: 'off' }]
          }
        ]
      });

      mapInstanceRef.current = map;
      
      // Show all teachers initially
      displayTeachers(mockTeacherLocations);
      
      setLoading(false);
      
      console.info('Google Maps initialized successfully');
    } catch (error) {
      console.error('Error initializing map:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      
      setMapError(errorMessage);
      
      toast.error(
        language === 'bn' 
          ? 'ম্যাপ লোড করতে সমস্যা হয়েছে। পেজ রিফ্রেশ করে আবার চেষ্টা করুন।'
          : 'Failed to load map. Please refresh the page.',
        { duration: 5000 }
      );
      
      setLoading(false);
    }
  };

  const displayTeachers = (teachers: TeacherLocation[]) => {
    if (!mapInstanceRef.current) return;

    // Clear existing markers
    markersRef.current.forEach(marker => marker.setMap(null));
    markersRef.current = [];

    // Create markers for teachers
    teachers.forEach((teacher, index) => {
      const marker = new google.maps.Marker({
        map: mapInstanceRef.current!,
        position: { lat: teacher.lat, lng: teacher.lng },
        title: teacher.teacherName,
        animation: google.maps.Animation.DROP,
        icon: {
          url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="8" r="4" fill="${teacher.availability ? '#10b981' : '#94a3b8'}" stroke="#fff"/>
              <path d="M12 14c-4 0-7 2-7 4v2h14v-2c0-2-3-4-7-4z" fill="${teacher.availability ? '#10b981' : '#94a3b8'}" stroke="#fff"/>
            </svg>
          `),
          scaledSize: new google.maps.Size(40, 40),
          anchor: new google.maps.Point(20, 40)
        },
        label: {
          text: `${index + 1}`,
          color: 'white',
          fontSize: '12px',
          fontWeight: 'bold'
        }
      });

      // Add click listener
      marker.addListener('click', () => {
        setSelectedTeacher(teacher);
        mapInstanceRef.current!.panTo({ lat: teacher.lat, lng: teacher.lng });
        mapInstanceRef.current!.setZoom(15);
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

  const handleFindNearby = async () => {
    try {
      setSearching(true);
      toast.loading(language === 'bn' ? 'শিক্ষক খুঁজছি...' : 'Searching for teachers...');

      // Get user location
      let location;
      try {
        location = await getCurrentLocation();
        setUserLocation(location);
      } catch (locationError: any) {
        // Handle location permission denied gracefully
        toast.dismiss();
        
        if (locationError.message?.includes('permission denied')) {
          toast.error(
            language === 'bn' 
              ? 'অবস্থান অনুমতি প্রয়োজন। ব্রাউজার সেটিংস থেকে অবস্থান চালু করুন।'
              : 'Location permission required. Please enable location access in browser settings.',
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
        
        // Use default location (Dhaka center)
        location = DEFAULT_CENTER;
        setUserLocation(location);
        setSearching(false);
        return;
      }

      // Add user location marker
      if (userMarkerRef.current) {
        userMarkerRef.current.setMap(null);
      }

      const userMarker = new google.maps.Marker({
        map: mapInstanceRef.current!,
        position: location,
        title: 'Your Location',
        icon: {
          url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10" fill="#3b82f6" stroke="#fff" stroke-width="3"/>
              <circle cx="12" cy="12" r="3" fill="#fff"/>
            </svg>
          `),
          scaledSize: new google.maps.Size(40, 40),
          anchor: new google.maps.Point(20, 20)
        }
      });

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

      toast.dismiss();
      toast.success(
        language === 'bn'
          ? `${matches.length} জন শিক্ষক পাওয়া গেছে!`
          : `${matches.length} teachers found!`,
        { icon: <Sparkles className="w-4 h-4" /> }
      );
      
      setSearching(false);
    } catch (error) {
      toast.dismiss();
      // Silently log error without showing in console
      toast.error(
        language === 'bn' 
          ? 'খুঁজতে সমস্যা হয়েছে'
          : 'Search failed'
      );
      setSearching(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-100 to-pink-100 px-4 py-2 rounded-full mb-4">
          <Sparkles className="w-5 h-5 text-purple-600" />
          <span className="text-purple-700">{t.aiMatching}</span>
        </div>
        <h2 className={`text-3xl text-gray-900 mb-2 ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>
          {t.title}
        </h2>
        <p className={`text-gray-600 ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>
          {t.subtitle}
        </p>
      </div>

      {/* Filters */}
      <Card className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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

          {/* Radius Slider */}
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

          {/* Search Button */}
          <div className="flex items-end">
            <Button
              onClick={handleFindNearby}
              disabled={searching}
              className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700"
            >
              {searching ? (
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
      </Card>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Map */}
        <Card className="lg:col-span-2 p-4">
          <div className="relative rounded-lg overflow-hidden border-2 border-gray-200">
            {loading && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-100 z-10 h-[500px]">
                <div className="text-center">
                  <Loader2 className="w-8 h-8 animate-spin text-emerald-600 mx-auto mb-2" />
                  <p className={`text-gray-600 ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>
                    {t.loading}
                  </p>
                </div>
              </div>
            )}
            {mapError && !loading && (
              <div className="absolute inset-0 flex items-center justify-center bg-red-50 z-10 h-[500px]">
                <div className="text-center max-w-md px-4">
                  <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-3" />
                  <h3 className={`text-red-800 mb-2 ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>
                    {language === 'bn' ? 'ম্যাপ লোড করতে ব্যর্থ' : 'Failed to Load Map'}
                  </h3>
                  <p className={`text-sm text-red-600 mb-4 ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>
                    {language === 'bn' 
                      ? 'Google Maps API লোড করতে সমস্যা হয়েছে। পেজ রিফ্রেশ করুন বা পরে আবার চেষ্টা করুন।'
                      : 'There was a problem loading Google Maps API. Please refresh the page or try again later.'}
                  </p>
                  <Button
                    onClick={() => window.location.reload()}
                    className="bg-red-600 hover:bg-red-700"
                  >
                    {language === 'bn' ? 'পেজ রিফ্রেশ করুন' : 'Refresh Page'}
                  </Button>
                </div>
              </div>
            )}
            <div ref={mapRef} className="h-[500px]" />
          </div>

          {/* Stats */}
          {foundTeachers.length > 0 && (
            <div className="mt-4 flex items-center gap-4">
              <Badge className="bg-emerald-100 text-emerald-800">
                <TrendingUp className="w-3 h-3 mr-1" />
                {foundTeachers.length} {t.teachersFound}
              </Badge>
              {selectedSubject !== 'all' && (
                <Badge variant="outline">
                  <BookOpen className="w-3 h-3 mr-1" />
                  {subjects.find(s => s.value === selectedSubject)?.[language === 'bn' ? 'bn' : 'en']}
                </Badge>
              )}
            </div>
          )}
        </Card>

        {/* Teacher List */}
        <Card className="p-4 max-h-[550px] overflow-y-auto">
          <h3 className={`text-lg text-gray-900 mb-4 ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>
            {t.nearestTeachers}
          </h3>

          <div className="space-y-3">
            {foundTeachers.length > 0 ? (
              foundTeachers.map((teacher, index) => {
                const distance = userLocation
                  ? calculateDistance(userLocation.lat, userLocation.lng, teacher.lat, teacher.lng)
                  : null;

                return (
                  <Card
                    key={teacher.teacherId}
                    className={`p-4 cursor-pointer transition-all hover:shadow-lg ${
                      selectedTeacher?.teacherId === teacher.teacherId
                        ? 'ring-2 ring-emerald-500 bg-emerald-50'
                        : ''
                    }`}
                    onClick={() => setSelectedTeacher(teacher)}
                  >
                    <div className="flex items-start gap-3">
                      <div className="relative">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-white">
                          <User className="w-6 h-6" />
                        </div>
                        {index === 0 && (
                          <div className="absolute -top-1 -right-1 w-5 h-5 bg-yellow-400 rounded-full flex items-center justify-center">
                            <Sparkles className="w-3 h-3 text-white" />
                          </div>
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <h4 className={`text-gray-900 truncate ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>
                            {teacher.teacherName}
                          </h4>
                          {index === 0 && (
                            <Badge className="bg-yellow-100 text-yellow-800 text-xs">
                              {t.bestMatch}
                            </Badge>
                          )}
                        </div>

                        <div className="flex items-center gap-1 mt-1">
                          <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm text-gray-700">{teacher.rating}</span>
                        </div>

                        <div className="flex flex-wrap gap-1 mt-2">
                          {teacher.subjects.map(subject => (
                            <Badge
                              key={subject}
                              variant="outline"
                              className="text-xs"
                            >
                              {subject}
                            </Badge>
                          ))}
                        </div>

                        {distance !== null && (
                          <div className="flex items-center gap-1 mt-2 text-xs text-gray-600">
                            <MapPin className="w-3 h-3" />
                            {formatDistance(distance, language)} {t.away}
                          </div>
                        )}

                        <div className="flex items-center gap-2 mt-3">
                          <Badge className={teacher.availability ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'}>
                            {teacher.availability ? t.available : 'Busy'}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </Card>
                );
              })
            ) : (
              <div className="text-center py-12">
                <MapPinned className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p className={`text-gray-500 ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>
                  {t.noTeachersFound}
                </p>
                <p className={`text-sm text-gray-400 mt-1 ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>
                  "{t.findNearby}" বাটনে ক্লিক করুন
                </p>
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}
