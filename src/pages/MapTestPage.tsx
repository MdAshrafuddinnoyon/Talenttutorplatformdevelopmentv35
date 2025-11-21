import { useState } from 'react';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { EnhancedAITeacherFinderMap } from '../components/EnhancedAITeacherFinderMap';
import { MapErrorBoundary } from '../components/MapErrorBoundary';
import { ArrowLeft, RefreshCw } from 'lucide-react';

interface MapTestPageProps {
  language: 'bn' | 'en';
  setPage: (page: string) => void;
}

export function MapTestPage({ language, setPage }: MapTestPageProps) {
  const [showMap, setShowMap] = useState(true);
  const [resetKey, setResetKey] = useState(0);

  const content = {
    bn: {
      title: 'AI শিক্ষক ম্যাপ টেস্ট',
      description: 'এই পেজ দিয়ে Google Maps ফিচার টেস্ট করুন',
      toggleMap: 'ম্যাপ টগল করুন',
      resetMap: 'ম্যাপ রিসেট করুন',
      backToHome: 'হোমে ফিরে যান',
      mapStatus: 'ম্যাপ স্ট্যাটাস',
      visible: 'দৃশ্যমান',
      hidden: 'লুকানো',
      instructions: 'নির্দেশনা',
      instruction1: '"ম্যাপ টগল করুন" বাটন ক্লিক করে ম্যাপ on/off করুন',
      instruction2: 'কনসোল চেক করুন - কোনো লাল error থাকা উচিত নয়',
      instruction3: 'একাধিক বার toggle করে দেখুন - stable থাকা উচিত',
      instruction4: '"ম্যাপ রিসেট করুন" বাটনে ক্লিক করলে ম্যাপ সম্পূর্ণ নতুন হবে',
    },
    en: {
      title: 'AI Teacher Map Test',
      description: 'Test the Google Maps feature on this page',
      toggleMap: 'Toggle Map',
      resetMap: 'Reset Map',
      backToHome: 'Back to Home',
      mapStatus: 'Map Status',
      visible: 'Visible',
      hidden: 'Hidden',
      instructions: 'Instructions',
      instruction1: 'Click "Toggle Map" button to turn map on/off',
      instruction2: 'Check console - should have no red errors',
      instruction3: 'Toggle multiple times - should stay stable',
      instruction4: 'Click "Reset Map" to completely remount the map',
    }
  };

  const t = content[language];

  const handleToggle = () => {
    setShowMap(!showMap);
  };

  const handleReset = () => {
    setShowMap(false);
    setTimeout(() => {
      setResetKey(prev => prev + 1);
      setShowMap(true);
    }, 100);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-6">
          <Button
            variant="ghost"
            onClick={() => setPage('home')}
            className="mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            {t.backToHome}
          </Button>
          
          <h1 className={`text-3xl text-gray-900 mb-2 ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>
            {t.title}
          </h1>
          <p className={`text-gray-600 ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>
            {t.description}
          </p>
        </div>

        {/* Controls */}
        <Card className="p-6 mb-6">
          <div className="flex flex-wrap items-center gap-4 mb-4">
            <Button
              onClick={handleToggle}
              variant={showMap ? 'destructive' : 'default'}
              className="gap-2"
            >
              {t.toggleMap}
            </Button>
            
            <Button
              onClick={handleReset}
              variant="outline"
              className="gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              {t.resetMap}
            </Button>

            <div className={`ml-auto flex items-center gap-2 ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>
              <span className="text-gray-600">{t.mapStatus}:</span>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                showMap 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-gray-100 text-gray-800'
              }`}>
                {showMap ? t.visible : t.hidden}
              </span>
            </div>
          </div>

          {/* Instructions */}
          <div className={`bg-blue-50 border border-blue-200 rounded-lg p-4 ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>
            <h3 className="font-semibold text-blue-900 mb-2">{t.instructions}</h3>
            <ul className="space-y-1 text-sm text-blue-800">
              <li>1. {t.instruction1}</li>
              <li>2. {t.instruction2}</li>
              <li>3. {t.instruction3}</li>
              <li>4. {t.instruction4}</li>
            </ul>
          </div>
        </Card>

        {/* Map Container */}
        {showMap && (
          <div key={resetKey}>
            <MapErrorBoundary language={language}>
              <EnhancedAITeacherFinderMap
                language={language}
                onTeacherSelect={(teacher) => {
                  console.log('Teacher selected:', teacher);
                }}
              />
            </MapErrorBoundary>
          </div>
        )}

        {!showMap && (
          <Card className="p-12 text-center">
            <p className={`text-gray-500 ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>
              {language === 'bn' 
                ? 'ম্যাপ বন্ধ আছে। "ম্যাপ টগল করুন" বাটন ক্লিক করুন।'
                : 'Map is hidden. Click "Toggle Map" button to show.'}
            </p>
          </Card>
        )}

        {/* Debug Info */}
        <Card className="mt-6 p-4 bg-gray-50">
          <h3 className="font-semibold text-gray-900 mb-2">Debug Info</h3>
          <div className="text-sm text-gray-600 space-y-1 font-mono">
            <div>Map Visible: {showMap ? 'true' : 'false'}</div>
            <div>Reset Key: {resetKey}</div>
            <div>Language: {language}</div>
            <div>Google Maps API: {typeof window.google !== 'undefined' ? 'Loaded' : 'Not Loaded'}</div>
          </div>
        </Card>
      </div>
    </div>
  );
}
