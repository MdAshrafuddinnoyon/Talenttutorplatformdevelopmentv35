import { useState, useEffect } from 'react';
import { MapPin, Navigation, Search, X } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { Badge } from './ui/badge';
import {
  divisions,
  getLocationsByParent,
  getLocationById,
  searchLocations,
  formatLocation,
  getLocationPath,
  type BDLocation
} from '../utils/bangladeshLocations';

interface BangladeshLocationSelectorProps {
  value?: {
    division?: string;
    district?: string;
    area?: string;
  };
  onChange?: (location: {
    division?: string;
    district?: string;
    area?: string;
    fullLocation?: BDLocation;
  }) => void;
  required?: boolean;
  showSearch?: boolean;
  showAreaLevel?: boolean;
  placeholder?: {
    division?: string;
    district?: string;
    area?: string;
  };
  language?: 'bn' | 'en';
  compact?: boolean;
}

export function BangladeshLocationSelector({
  value,
  onChange,
  required = false,
  showSearch = true,
  showAreaLevel = true,
  placeholder,
  language = 'bn',
  compact = false
}: BangladeshLocationSelectorProps) {
  const [selectedDivision, setSelectedDivision] = useState<string>(value?.division || '');
  const [selectedDistrict, setSelectedDistrict] = useState<string>(value?.district || '');
  const [selectedArea, setSelectedArea] = useState<string>(value?.area || '');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<BDLocation[]>([]);

  // Districts for selected division
  const [districts, setDistricts] = useState<BDLocation[]>([]);
  
  // Areas for selected district
  const [areas, setAreas] = useState<BDLocation[]>([]);

  // Update districts when division changes
  useEffect(() => {
    if (selectedDivision) {
      const divisionDistricts = getLocationsByParent(selectedDivision);
      setDistricts(divisionDistricts);
    } else {
      setDistricts([]);
    }
  }, [selectedDivision]);

  // Update areas when district changes
  useEffect(() => {
    if (selectedDistrict) {
      const districtAreas = getLocationsByParent(selectedDistrict);
      setAreas(districtAreas);
    } else {
      setAreas([]);
    }
  }, [selectedDistrict]);

  // Handle search
  useEffect(() => {
    if (searchQuery.trim()) {
      const results = searchLocations(searchQuery).slice(0, 10);
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  }, [searchQuery]);

  // Handle division change
  const handleDivisionChange = (divisionId: string) => {
    setSelectedDivision(divisionId);
    setSelectedDistrict('');
    setSelectedArea('');
    
    const division = getLocationById(divisionId);
    if (onChange) {
      onChange({
        division: divisionId,
        district: undefined,
        area: undefined,
        fullLocation: division
      });
    }
  };

  // Handle district change
  const handleDistrictChange = (districtId: string) => {
    setSelectedDistrict(districtId);
    setSelectedArea('');
    
    const district = getLocationById(districtId);
    if (onChange) {
      onChange({
        division: selectedDivision,
        district: districtId,
        area: undefined,
        fullLocation: district
      });
    }
  };

  // Handle area change
  const handleAreaChange = (areaId: string) => {
    setSelectedArea(areaId);
    
    const area = getLocationById(areaId);
    if (onChange) {
      onChange({
        division: selectedDivision,
        district: selectedDistrict,
        area: areaId,
        fullLocation: area
      });
    }
  };

  // Handle search result selection
  const handleSearchResultSelect = (location: BDLocation) => {
    const path = getLocationPath(location.id);
    
    // Find division, district, and area from path
    const division = path.find(l => l.type === 'division');
    const district = path.find(l => l.type === 'district');
    const area = path.find(l => l.type === 'area');
    
    if (division) setSelectedDivision(division.id);
    if (district) setSelectedDistrict(district.id);
    if (area) setSelectedArea(area.id);
    
    setSearchQuery('');
    setSearchResults([]);
    
    if (onChange) {
      onChange({
        division: division?.id,
        district: district?.id,
        area: area?.id,
        fullLocation: location
      });
    }
  };

  // Clear all selections
  const handleClear = () => {
    setSelectedDivision('');
    setSelectedDistrict('');
    setSelectedArea('');
    setSearchQuery('');
    setSearchResults([]);
    
    if (onChange) {
      onChange({
        division: undefined,
        district: undefined,
        area: undefined,
        fullLocation: undefined
      });
    }
  };

  // Get current location display text
  const getCurrentLocationText = () => {
    if (!selectedDivision) return language === 'bn' ? 'লোকেশন নির্বাচন করুন' : 'Select Location';
    
    const parts: string[] = [];
    if (selectedArea) {
      const area = getLocationById(selectedArea);
      if (area) parts.push(language === 'bn' ? area.nameBn : area.name);
    }
    if (selectedDistrict) {
      const district = getLocationById(selectedDistrict);
      if (district) parts.push(language === 'bn' ? district.nameBn : district.name);
    }
    if (selectedDivision) {
      const division = getLocationById(selectedDivision);
      if (division) parts.push(language === 'bn' ? division.nameBn : division.name);
    }
    
    return parts.join(', ');
  };

  if (compact) {
    return (
      <div className="space-y-3">
        <Label className="font-[Noto_Serif_Bengali]">
          {language === 'bn' ? 'লোকেশন' : 'Location'}
          {required && <span className="text-red-500 ml-1">*</span>}
        </Label>
        
        <div className="relative">
          <MapPin className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
          <Input
            placeholder={language === 'bn' ? 'খুঁজুন বা নির্বাচন করুন' : 'Search or select'}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-10 font-[Noto_Serif_Bengali]"
          />
          {(searchQuery || selectedDivision) && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-1 top-1 h-8 w-8"
              onClick={handleClear}
            >
              <X className="w-4 h-4" />
            </Button>
          )}
        </div>

        {/* Search Results Dropdown */}
        {searchResults.length > 0 && (
          <div className="absolute z-50 w-full mt-1 bg-white border rounded-lg shadow-lg max-h-64 overflow-y-auto">
            {searchResults.map((result) => (
              <button
                key={result.id}
                onClick={() => handleSearchResultSelect(result)}
                className="w-full text-left px-4 py-2 hover:bg-gray-50 border-b last:border-b-0 font-[Noto_Serif_Bengali]"
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm">
                    {language === 'bn' ? result.nameBn : result.name}
                  </span>
                  <Badge variant="secondary" className="text-xs">
                    {language === 'bn' 
                      ? result.type === 'division' ? 'বিভাগ' 
                        : result.type === 'district' ? 'জেলা' 
                        : 'এলাকা'
                      : result.type
                    }
                  </Badge>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  {formatLocation(result.id, language)}
                </p>
              </button>
            ))}
          </div>
        )}

        {/* Selected Location Display */}
        {selectedDivision && (
          <div className="flex items-center gap-2 text-sm text-gray-600 bg-emerald-50 px-3 py-2 rounded-md">
            <MapPin className="w-4 h-4 text-emerald-600" />
            <span className="font-[Noto_Serif_Bengali] flex-1">
              {getCurrentLocationText()}
            </span>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      {showSearch && (
        <div className="relative">
          <Label className="mb-2 font-[Noto_Serif_Bengali]">
            {language === 'bn' ? 'দ্রুত খুঁজুন' : 'Quick Search'}
          </Label>
          <div className="relative">
            <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
            <Input
              placeholder={language === 'bn' ? 'বিভাগ, জেলা বা এলাকা খুঁজুন...' : 'Search division, district or area...'}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 font-[Noto_Serif_Bengali]"
            />
          </div>

          {/* Search Results */}
          {searchResults.length > 0 && (
            <div className="absolute z-50 w-full mt-1 bg-white border rounded-lg shadow-lg max-h-64 overflow-y-auto">
              {searchResults.map((result) => (
                <button
                  key={result.id}
                  onClick={() => handleSearchResultSelect(result)}
                  className="w-full text-left px-4 py-3 hover:bg-gray-50 border-b last:border-b-0 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-[Noto_Serif_Bengali]">
                      {language === 'bn' ? result.nameBn : result.name}
                    </span>
                    <Badge variant="secondary" className="text-xs">
                      {language === 'bn' 
                        ? result.type === 'division' ? 'বিভাগ' 
                          : result.type === 'district' ? 'জেলা' 
                          : 'এলাকা'
                        : result.type
                      }
                    </Badge>
                  </div>
                  <p className="text-xs text-gray-500 mt-1 font-[Noto_Serif_Bengali]">
                    {formatLocation(result.id, language)}
                  </p>
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Cascading Dropdowns */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Division Selector */}
        <div className="space-y-2">
          <Label className="font-[Noto_Serif_Bengali]">
            {language === 'bn' ? 'বিভাগ' : 'Division'}
            {required && <span className="text-red-500 ml-1">*</span>}
          </Label>
          <Select value={selectedDivision} onValueChange={handleDivisionChange}>
            <SelectTrigger className="font-[Noto_Serif_Bengali]">
              <SelectValue placeholder={placeholder?.division || (language === 'bn' ? 'বিভাগ নির্বাচন করুন' : 'Select Division')} />
            </SelectTrigger>
            <SelectContent>
              {divisions.map((division) => (
                <SelectItem key={division.id} value={division.id} className="font-[Noto_Serif_Bengali]">
                  {language === 'bn' ? division.nameBn : division.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* District Selector */}
        <div className="space-y-2">
          <Label className="font-[Noto_Serif_Bengali]">
            {language === 'bn' ? 'জেলা' : 'District'}
            {required && <span className="text-red-500 ml-1">*</span>}
          </Label>
          <Select 
            value={selectedDistrict} 
            onValueChange={handleDistrictChange}
            disabled={!selectedDivision}
          >
            <SelectTrigger className="font-[Noto_Serif_Bengali]">
              <SelectValue placeholder={placeholder?.district || (language === 'bn' ? 'জেলা নির্বাচন করুন' : 'Select District')} />
            </SelectTrigger>
            <SelectContent>
              {districts.map((district) => (
                <SelectItem key={district.id} value={district.id} className="font-[Noto_Serif_Bengali]">
                  {language === 'bn' ? district.nameBn : district.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Area Selector */}
        {showAreaLevel && (
          <div className="space-y-2">
            <Label className="font-[Noto_Serif_Bengali]">
              {language === 'bn' ? 'এলাকা' : 'Area'}
              {selectedDistrict && areas.length === 0 && (
                <span className="text-xs text-gray-500 ml-2">
                  ({language === 'bn' ? 'ঐচ্ছিক' : 'Optional'})
                </span>
              )}
            </Label>
            <Select 
              value={selectedArea} 
              onValueChange={handleAreaChange}
              disabled={!selectedDistrict || areas.length === 0}
            >
              <SelectTrigger className="font-[Noto_Serif_Bengali]">
                <SelectValue placeholder={placeholder?.area || (language === 'bn' ? 'এলাকা নির্বাচন করুন' : 'Select Area')} />
              </SelectTrigger>
              <SelectContent>
                {areas.map((area) => (
                  <SelectItem key={area.id} value={area.id} className="font-[Noto_Serif_Bengali]">
                    {language === 'bn' ? area.nameBn : area.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {selectedDistrict && areas.length === 0 && (
              <p className="text-xs text-gray-500 font-[Noto_Serif_Bengali]">
                {language === 'bn' ? 'এই জেলার জন্য কোন এলাকা নেই' : 'No areas available for this district'}
              </p>
            )}
          </div>
        )}
      </div>

      {/* Selected Location Summary */}
      {(selectedDivision || selectedDistrict || selectedArea) && (
        <div className="flex items-center justify-between bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 rounded-lg p-3">
          <div className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-emerald-600" />
            <div>
              <p className="text-xs text-gray-500 font-[Noto_Serif_Bengali]">
                {language === 'bn' ? 'নির্বাচিত লোকেশন' : 'Selected Location'}
              </p>
              <p className="text-sm font-[Noto_Serif_Bengali]">
                {getCurrentLocationText()}
              </p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClear}
            className="font-[Noto_Serif_Bengali]"
          >
            <X className="w-4 h-4 mr-1" />
            {language === 'bn' ? 'মুছুন' : 'Clear'}
          </Button>
        </div>
      )}
    </div>
  );
}
