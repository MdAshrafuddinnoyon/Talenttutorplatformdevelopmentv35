import React, { useEffect, useRef, useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { MapPin, Search, Navigation } from 'lucide-react';
import { projectId, publicAnonKey } from '../utils/supabase/info';

export interface LocationData {
  address: string;
  street?: string;
  apartment?: string;
  city?: string;
  state?: string;
  postalCode?: string;
  country?: string;
  lat?: number;
  lng?: number;
}

interface ModernLocationPickerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onLocationSelect: (location: LocationData) => void;
  initialLocation?: LocationData;
  title?: string;
  description?: string;
  language?: 'bn' | 'en';
}

const content = {
  en: {
    title: 'Select Location',
    description: 'Search and select your location on the map',
    address: 'Address',
    addressPlaceholder: 'Enter your address',
    apartment: 'Apt, Suite, etc',
    apartmentPlaceholder: 'Apartment number (optional)',
    city: 'City',
    cityPlaceholder: 'City',
    state: 'State/Division',
    statePlaceholder: 'State or Division',
    postalCode: 'Postal Code',
    postalCodePlaceholder: 'Postal code',
    country: 'Country',
    countryPlaceholder: 'Country',
    currentLocation: 'Use Current Location',
    confirm: 'Confirm Location',
    cancel: 'Cancel',
    searching: 'Getting your location...',
  },
  bn: {
    title: 'অবস্থান নির্বাচন করুন',
    description: 'মানচিত্রে আপনার অবস্থান খুঁজুন এবং নির্বাচন করুন',
    address: 'ঠিকানা',
    addressPlaceholder: 'আপনার ঠিকানা লিখুন',
    apartment: 'অ্যাপার্টমেন্ট, স্যুট ইত্যাদি',
    apartmentPlaceholder: 'অ্যাপার্টমেন্ট নম্বর (ঐচ্ছিক)',
    city: 'শহর',
    cityPlaceholder: 'শহর',
    state: 'বিভাগ',
    statePlaceholder: 'বিভাগ',
    postalCode: 'পোস্টাল কোড',
    postalCodePlaceholder: 'পোস্টাল কোড',
    country: 'দেশ',
    countryPlaceholder: 'দেশ',
    currentLocation: 'বর্তমান অবস্থান ব্যবহার করুন',
    confirm: 'অবস্থান নিশ্চিত করুন',
    cancel: 'বাতিল করুন',
    searching: 'আপনার অবস্থান খুঁজে পাওয়া যাচ্ছে...',
  },
};

export function ModernLocationPicker({
  open,
  onOpenChange,
  onLocationSelect,
  initialLocation,
  title,
  description,
  language = 'bn',
}: ModernLocationPickerProps) {
  const t = content[language];
  const [locationData, setLocationData] = useState<LocationData>(
    initialLocation || {
      address: '',
      street: '',
      apartment: '',
      city: '',
      state: '',
      postalCode: '',
      country: 'Bangladesh',
      lat: undefined,
      lng: undefined,
    }
  );
  const [isLoading, setIsLoading] = useState(false);
  const [apiKeyLoading, setApiKeyLoading] = useState(false);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const autocompleteRef = useRef<any>(null);
  const mapRef = useRef<any>(null);
  const markerRef = useRef<any>(null);

  // Fetch Google Maps API Key and Load Google Maps script
  useEffect(() => {
    if (!open) return;

    const loadGoogleMaps = async () => {
      try {
        setApiKeyLoading(true);

        // Check if already loaded
        if (document.querySelector(`script[src*="maps.googleapis.com"]`)) {
          if ((window as any).google) {
            initializeMap();
          }
          setApiKeyLoading(false);
          return;
        }

        // Fetch API key from server
        const response = await fetch(
          `https://${projectId}.supabase.co/functions/v1/make-server-5b21d3ea/config/google-maps-api-key`,
          {
            headers: {
              'Authorization': `Bearer ${publicAnonKey}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error('Failed to fetch Google Maps API key');
        }

        const data = await response.json();
        const apiKey = data.apiKey;

        if (!apiKey) {
          throw new Error('API key not available');
        }

        // Load Google Maps script
        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places&callback=initMap`;
        script.async = true;
        script.defer = true;

        (window as any).initMap = () => {
          initializeMap();
          setApiKeyLoading(false);
        };

        document.head.appendChild(script);

        script.onerror = () => {
          console.error('Failed to load Google Maps script');
          setApiKeyLoading(false);
        };
      } catch (error) {
        console.error('Error loading Google Maps:', error);
        setApiKeyLoading(false);
      }
    };

    loadGoogleMaps();

    return () => {
      (window as any).initMap = undefined;
    };
  }, [open]);

  const initializeMap = () => {
    if (!mapContainerRef.current) return;

    const { google } = window as any;
    if (!google) return;

    // Initialize map
    const mapOptions = {
      center: { lat: 23.8103, lng: 90.4125 }, // Dhaka center
      zoom: 13,
      mapTypeControl: false,
      streetViewControl: false,
      fullscreenControl: true,
    };

    mapRef.current = new google.maps.Map(mapContainerRef.current, mapOptions);

    // Initialize marker
    markerRef.current = new google.maps.Marker({
      map: mapRef.current,
      draggable: true,
      animation: google.maps.Animation.DROP,
    });

    // Handle marker drag
    markerRef.current.addListener('dragend', () => {
      const position = markerRef.current.getPosition();
      reverseGeocode(position.lat(), position.lng());
    });

    // Initialize autocomplete
    const input = document.getElementById('location-address-input') as HTMLInputElement;
    if (input) {
      autocompleteRef.current = new google.maps.places.Autocomplete(input, {
        fields: ['address_components', 'geometry', 'name', 'formatted_address'],
        types: ['address'],
        componentRestrictions: { country: 'bd' }, // Restrict to Bangladesh
      });

      autocompleteRef.current.addListener('place_changed', handlePlaceSelect);
    }

    // Set initial location if provided
    if (initialLocation?.lat && initialLocation?.lng) {
      const position = { lat: initialLocation.lat, lng: initialLocation.lng };
      mapRef.current.setCenter(position);
      markerRef.current.setPosition(position);
    }
  };

  const handlePlaceSelect = () => {
    const { google } = window as any;
    if (!google || !autocompleteRef.current) return;

    const place = autocompleteRef.current.getPlace();

    if (!place.geometry) {
      console.error('No geometry for selected place');
      return;
    }

    // Update map
    if (place.geometry.viewport) {
      mapRef.current.fitBounds(place.geometry.viewport);
    } else {
      mapRef.current.setCenter(place.geometry.location);
      mapRef.current.setZoom(17);
    }

    markerRef.current.setPosition(place.geometry.location);

    // Parse address components
    parseAddressComponents(place);
  };

  const parseAddressComponents = (place: any) => {
    const components = place.address_components || [];
    const newLocationData: LocationData = {
      address: place.formatted_address || '',
      street: '',
      apartment: locationData.apartment || '',
      city: '',
      state: '',
      postalCode: '',
      country: 'Bangladesh',
      lat: place.geometry.location.lat(),
      lng: place.geometry.location.lng(),
    };

    for (const component of components) {
      const types = component.types;

      if (types.includes('street_number')) {
        newLocationData.street = component.short_name + ' ' + (newLocationData.street || '');
      } else if (types.includes('route')) {
        newLocationData.street = (newLocationData.street || '') + component.long_name;
      } else if (types.includes('locality')) {
        newLocationData.city = component.long_name;
      } else if (types.includes('administrative_area_level_1')) {
        newLocationData.state = component.long_name;
      } else if (types.includes('postal_code')) {
        newLocationData.postalCode = component.short_name;
      } else if (types.includes('country')) {
        newLocationData.country = component.long_name;
      }
    }

    setLocationData(newLocationData);
  };

  const reverseGeocode = async (lat: number, lng: number) => {
    const { google } = window as any;
    if (!google) return;

    const geocoder = new google.maps.Geocoder();
    
    geocoder.geocode({ location: { lat, lng } }, (results: any, status: any) => {
      if (status === 'OK' && results[0]) {
        parseAddressComponents(results[0]);
      }
    });
  };

  const handleCurrentLocation = () => {
    setIsLoading(true);

    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser');
      setIsLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        
        if (mapRef.current && markerRef.current) {
          const pos = { lat: latitude, lng: longitude };
          mapRef.current.setCenter(pos);
          mapRef.current.setZoom(17);
          markerRef.current.setPosition(pos);
          
          reverseGeocode(latitude, longitude);
        }
        
        setIsLoading(false);
      },
      (error) => {
        console.error('Error getting location:', error);
        alert('Unable to get your location. Please select manually.');
        setIsLoading(false);
      }
    );
  };

  const handleConfirm = () => {
    onLocationSelect(locationData);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            {title || t.title}
          </DialogTitle>
          <DialogDescription>
            {description || t.description}
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Panel - Form */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="location-address-input">
                {t.address} <span className="text-red-500">*</span>
              </Label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  id="location-address-input"
                  placeholder={t.addressPlaceholder}
                  value={locationData.address}
                  onChange={(e) =>
                    setLocationData({ ...locationData, address: e.target.value })
                  }
                  className="pl-10"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="apartment">{t.apartment}</Label>
              <Input
                id="apartment"
                placeholder={t.apartmentPlaceholder}
                value={locationData.apartment}
                onChange={(e) =>
                  setLocationData({ ...locationData, apartment: e.target.value })
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="city">{t.city}</Label>
              <Input
                id="city"
                placeholder={t.cityPlaceholder}
                value={locationData.city}
                onChange={(e) =>
                  setLocationData({ ...locationData, city: e.target.value })
                }
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="state">{t.state}</Label>
                <Input
                  id="state"
                  placeholder={t.statePlaceholder}
                  value={locationData.state}
                  onChange={(e) =>
                    setLocationData({ ...locationData, state: e.target.value })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="postalCode">{t.postalCode}</Label>
                <Input
                  id="postalCode"
                  placeholder={t.postalCodePlaceholder}
                  value={locationData.postalCode}
                  onChange={(e) =>
                    setLocationData({ ...locationData, postalCode: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="country">{t.country}</Label>
              <Input
                id="country"
                placeholder={t.countryPlaceholder}
                value={locationData.country}
                onChange={(e) =>
                  setLocationData({ ...locationData, country: e.target.value })
                }
              />
            </div>

            <Button
              type="button"
              variant="outline"
              className="w-full"
              onClick={handleCurrentLocation}
              disabled={isLoading}
            >
              <Navigation className="h-4 w-4 mr-2" />
              {isLoading ? t.searching : t.currentLocation}
            </Button>
          </div>

          {/* Right Panel - Map */}
          <div className="space-y-4">
            <div
              ref={mapContainerRef}
              className="w-full h-[400px] rounded-lg border-2 border-gray-200"
              style={{ minHeight: '400px' }}
            />
            
            <p className="text-sm text-gray-500 text-center">
              {language === 'bn' 
                ? 'মানচিত্রে ক্লিক করুন বা মার্কার টেনে আনুন'
                : 'Click on map or drag marker to select location'}
            </p>
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-4 border-t">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            {t.cancel}
          </Button>
          <Button onClick={handleConfirm} disabled={!locationData.address}>
            <MapPin className="h-4 w-4 mr-2" />
            {t.confirm}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
