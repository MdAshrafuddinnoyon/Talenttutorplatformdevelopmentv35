import { useEffect, useRef, useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { 
  MapPin, Navigation, Search, Loader2, CheckCircle, 
  AlertCircle, Crosshair, Home
} from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import {
  loadGoogleMapsScript,
  geocodeAddress,
  reverseGeocode,
  getCurrentLocation,
  DEFAULT_CENTER,
  DHAKA_AREAS,
  type Location
} from '../utils/googleMapsConfig';

interface GoogleMapLocationPickerProps {
  language: 'bn' | 'en';
  onLocationSelect?: (location: Location) => void;
  initialLocation?: Location;
  height?: string;
}

const content = {
  bn: {
    title: 'আপনার অবস্থান নির্বাচন করুন',
    searchPlaceholder: 'ঠিকানা খুঁজুন... (যেমন: ধানমন্ডি, ঢাকা)',
    currentLocation: 'বর্তমান অবস্থান',
    selectLocation: 'এই অবস্থান নির্বাচন করুন',
    loading: 'লোড হচ্ছে...',
    searchingLocation: 'খুঁজছি...',
    locationSelected: 'অবস্থান নির্বাচিত',
    errorLoadingMap: 'ম্যাপ লোড করতে সমস্যা হয়েছে',
    gettingLocation: 'অবস্থান নির্ণয় করা হচ্ছে...',
    popularAreas: 'জনপ্রিয় এলাকা',
    clickToSelect: 'ম্যাপে ক্লিক করে অবস্থান নির্বাচন করুন অথবা ম্যার্কার ড্র্যাগ করুন',
    selectedAddress: 'নির্বাচিত ঠিকানা',
    latitude: 'অক্ষাংশ',
    longitude: 'দ্রাঘিমাংশ'
  },
  en: {
    title: 'Select Your Location',
    searchPlaceholder: 'Search address... (e.g., Dhanmondi, Dhaka)',
    currentLocation: 'Current Location',
    selectLocation: 'Select This Location',
    loading: 'Loading...',
    searchingLocation: 'Searching...',
    locationSelected: 'Location Selected',
    errorLoadingMap: 'Failed to load map',
    gettingLocation: 'Getting location...',
    popularAreas: 'Popular Areas',
    clickToSelect: 'Click on map to select location or drag the marker',
    selectedAddress: 'Selected Address',
    latitude: 'Latitude',
    longitude: 'Longitude'
  }
};

export function GoogleMapLocationPicker({
  language,
  onLocationSelect,
  initialLocation,
  height = '400px'
}: GoogleMapLocationPickerProps) {
  const t = content[language];
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<google.maps.Map | null>(null);
  const markerRef = useRef<google.maps.Marker | null>(null);
  
  const [loading, setLoading] = useState(true);
  const [mapError, setMapError] = useState<string | null>(null);
  const [searching, setSearching] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(
    initialLocation || null
  );
  const [address, setAddress] = useState<string>('');

  // Initialize Google Maps
  useEffect(() => {
    initializeMap();
  }, []);

  const initializeMap = async () => {
    try {
      setLoading(true);
      await loadGoogleMapsScript();

      if (!mapRef.current) return;

      const center = initialLocation || DEFAULT_CENTER;

      // Create map
      const map = new google.maps.Map(mapRef.current, {
        center: { lat: center.lat, lng: center.lng },
        zoom: 13,
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: true,
        zoomControl: true,
        styles: [
          {
            featureType: 'poi',
            elementType: 'labels',
            stylers: [{ visibility: 'off' }]
          }
        ]
      });

      mapInstanceRef.current = map;

      // Create marker
      const marker = new google.maps.Marker({
        map: map,
        position: { lat: center.lat, lng: center.lng },
        draggable: true,
        animation: google.maps.Animation.DROP,
        icon: {
          url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" fill="#10b981" stroke="#059669"/>
              <circle cx="12" cy="10" r="3" fill="white" stroke="#059669"/>
            </svg>
          `),
          scaledSize: new google.maps.Size(40, 40),
          anchor: new google.maps.Point(20, 40)
        }
      });

      markerRef.current = marker;

      // Get initial address
      if (initialLocation) {
        const addr = await reverseGeocode(initialLocation.lat, initialLocation.lng);
        if (addr) setAddress(addr);
        setSelectedLocation(initialLocation);
      }

      // Click on map to select location
      map.addListener('click', async (e: google.maps.MapMouseEvent) => {
        if (!e.latLng) return;
        
        const lat = e.latLng.lat();
        const lng = e.latLng.lng();
        
        updateLocation(lat, lng);
      });

      // Drag marker to select location
      marker.addListener('dragend', async () => {
        const position = marker.getPosition();
        if (!position) return;
        
        updateLocation(position.lat(), position.lng());
      });

      setLoading(false);
    } catch (error) {
      console.error('Error initializing map:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      setMapError(errorMessage);
      toast.error(t.errorLoadingMap);
      setLoading(false);
    }
  };

  const updateLocation = async (lat: number, lng: number) => {
    const location: Location = { lat, lng };
    setSelectedLocation(location);

    // Update marker position
    if (markerRef.current) {
      markerRef.current.setPosition({ lat, lng });
      markerRef.current.setAnimation(google.maps.Animation.BOUNCE);
      setTimeout(() => {
        markerRef.current?.setAnimation(null);
      }, 700);
    }

    // Pan map to location
    if (mapInstanceRef.current) {
      mapInstanceRef.current.panTo({ lat, lng });
    }

    // Get address
    const addr = await reverseGeocode(lat, lng);
    if (addr) {
      setAddress(addr);
      location.address = addr;
    }

    // Callback
    if (onLocationSelect) {
      onLocationSelect(location);
    }
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;

    try {
      setSearching(true);
      const result = await geocodeAddress(searchQuery);

      if (result) {
        updateLocation(result.lat, result.lng);
        toast.success(t.locationSelected);
      } else {
        toast.error('অবস্থান খুঁজে পাওয়া যায়নি');
      }
    } catch (error) {
      console.error('Search error:', error);
      toast.error('খুঁজতে সমস্যা হয়েছে');
    } finally {
      setSearching(false);
    }
  };

  const handleCurrentLocation = async () => {
    try {
      toast.loading(t.gettingLocation);
      const location = await getCurrentLocation();
      updateLocation(location.lat, location.lng);
      toast.dismiss();
      toast.success(t.locationSelected);
    } catch (error) {
      toast.dismiss();
      
      // Show user-friendly error message
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      
      if (errorMessage.includes('denied') || errorMessage.includes('permission')) {
        toast.error(
          language === 'bn' 
            ? 'অবস্থান অ্যাক্সেস অনুমতি দিন। ব্রাউজার সেটিংস থেকে location permission চালু করুন।'
            : 'Please enable location permission in your browser settings',
          { duration: 5000 }
        );
      } else {
        toast.error(
          language === 'bn' 
            ? 'বর্তমান অবস্থান পাওয়া যায়নি। ম্যানুয়ালি অবস্থান নির্বাচন করুন।'
            : 'Could not get current location. Please select location manually.',
          { duration: 4000 }
        );
      }
      
      // Silently log - don't clutter console
      // Optionally fall back to default Dhaka location
      // updateLocation(DEFAULT_CENTER.lat, DEFAULT_CENTER.lng);
    }
  };

  const handleQuickSelect = async (area: typeof DHAKA_AREAS[0]) => {
    updateLocation(area.lat, area.lng);
    toast.success(`${area.name} নির্বাচিত হয়েছে`);
  };

  return (
    <Card className="p-6">
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h3 className={`text-xl text-gray-900 ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>
            {t.title}
          </h3>
          {selectedLocation && (
            <Badge className="bg-green-100 text-green-800">
              <CheckCircle className="w-3 h-3 mr-1" />
              {t.locationSelected}
            </Badge>
          )}
        </div>

        {/* Search Bar */}
        <div className="flex gap-2">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              placeholder={t.searchPlaceholder}
              className={`pl-10 ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}
            />
          </div>
          <Button
            onClick={handleSearch}
            disabled={searching || !searchQuery.trim()}
            className="bg-emerald-600 hover:bg-emerald-700"
          >
            {searching ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                {t.searchingLocation}
              </>
            ) : (
              <>
                <Search className="w-4 h-4 mr-2" />
                Search
              </>
            )}
          </Button>
          <Button
            onClick={handleCurrentLocation}
            variant="outline"
            className="border-blue-200 hover:bg-blue-50"
          >
            <Navigation className="w-4 h-4 mr-2 text-blue-600" />
            {t.currentLocation}
          </Button>
        </div>

        {/* Map Container */}
        <div className="relative rounded-lg overflow-hidden border-2 border-gray-200">
          {loading && (
            <div 
              className="absolute inset-0 flex items-center justify-center bg-gray-100 z-10"
              style={{ height }}
            >
              <div className="text-center">
                <Loader2 className="w-8 h-8 animate-spin text-emerald-600 mx-auto mb-2" />
                <p className={`text-gray-600 ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>
                  {t.loading}
                </p>
              </div>
            </div>
          )}
          {mapError && !loading && (
            <div 
              className="absolute inset-0 flex items-center justify-center bg-red-50 z-10"
              style={{ height }}
            >
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
          <div ref={mapRef} style={{ height }} />
        </div>

        {/* Info */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
          <div className="flex items-start gap-2">
            <AlertCircle className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
            <p className={`text-sm text-blue-800 ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>
              {t.clickToSelect}
            </p>
          </div>
        </div>

        {/* Popular Areas Quick Select */}
        <div>
          <p className={`text-sm text-gray-600 mb-2 ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>
            {t.popularAreas}:
          </p>
          <div className="flex flex-wrap gap-2">
            {DHAKA_AREAS.slice(0, 6).map((area) => (
              <Button
                key={area.nameEn}
                variant="outline"
                size="sm"
                onClick={() => handleQuickSelect(area)}
                className={`hover:bg-emerald-50 hover:border-emerald-300 ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}
              >
                <Home className="w-3 h-3 mr-1" />
                {area.name}
              </Button>
            ))}
          </div>
        </div>

        {/* Selected Location Info */}
        {selectedLocation && (
          <Card className="p-4 bg-emerald-50 border-emerald-200">
            <div className="space-y-2">
              <div className="flex items-start gap-2">
                <MapPin className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div className="flex-1">
                  <p className={`text-sm text-gray-600 mb-1 ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>
                    {t.selectedAddress}:
                  </p>
                  <p className="text-gray-900">{address || 'Loading address...'}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-emerald-200">
                <div>
                  <p className="text-xs text-gray-600">{t.latitude}:</p>
                  <p className="text-sm text-gray-900">{selectedLocation.lat.toFixed(6)}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-600">{t.longitude}:</p>
                  <p className="text-sm text-gray-900">{selectedLocation.lng.toFixed(6)}</p>
                </div>
              </div>
            </div>
          </Card>
        )}
      </div>
    </Card>
  );
}
