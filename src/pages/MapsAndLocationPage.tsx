import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Badge } from '../components/ui/badge';
import { 
  MapPin, Users, Navigation, Sparkles, 
  TrendingUp, Award, Zap, LogIn
} from 'lucide-react';
import { PageHero } from '../components/PageHero';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';

interface MapsAndLocationPageProps {
  language: 'bn' | 'en';
  setPage: (page: string) => void;
  currentUser?: any;
  onLogout?: () => void;
}

const content = {
  bn: {
    title: 'মানচিত্র ও অবস্থান',
    subtitle: 'AI-পাওয়ারড লোকেশন সার্ভিসের মাধ্যমে আপনার কাছের সেরা শিক্ষক খুঁজুন',
    features: [
      'AI-পাওয়ারড শিক্ষক ম্যাচিং',
      'রিয়েল-টাইম লোকেশন ট্র্যাকিং',
      'দূরত্ব হিসাব',
      'ইন্টারঅ্যাক্টিভ ম্যাপ'
    ],
    tabs: {
      overview: 'বৈশিষ্ট্য',
      about: 'বিস্তারিত তথ্য'
    },
    accessInfo: {
      title: 'অভিভাবকদের জন্য বিশেষ বৈশিষ্ট্য',
      description: 'AI-পাওয়ারড মানচিত্র ভিত্তিক শিক্ষক খোঁজার সিস্টেম অভিভাবক ড্যাশবোর্ডে উপলব্ধ',
      benefits: [
        'আপনার অবস্থানের কাছাকাছি সেরা শিক্ষক খুঁজুন',
        'দূরত্ব এবং রেটিং অনুযায়ী ফিল্টার করুন',
        'রিয়েল-টাইম ম্যাপে শিক্ষকদের দেখুন',
        'এক ক্লিকে যোগাযোগ করুন'
      ],
      loginRequired: 'এই বৈশিষ্ট্য ব্যবহার করতে অভিভাবক হিসেবে লগইন করুন',
      loginButton: 'লগইন করুন',
      dashboardButton: 'অভিভাবক ড্যাশবোর্ডে যান'
    },
    about: {
      title: 'Google Maps Integration',
      subtitle: 'AI-পাওয়ারড লোকেশন সার্ভিস',
      features: [
        {
          icon: Sparkles,
          title: 'AI-Powered Matching',
          description: 'আমাদের কৃত্রিম বুদ্ধিমত্তা অ্যালগরিদম আপনার পছন্দ, দূরত্ব এবং রেটিং এর উপর ভিত্তি করে সেরা শিক্ষক খুঁজে দেয়'
        },
        {
          icon: Navigation,
          title: 'Real-time Location',
          description: 'আপনার বর্তমান অবস্থান ব্যবহার করে কাছাকাছি শিক্ষক খুঁজুন এবং দূরত্ব দেখুন'
        },
        {
          icon: TrendingUp,
          title: 'Smart Filtering',
          description: 'বিষয়, দূরত্ব এবং availability অনুসারে ফিল্টার করুন'
        },
        {
          icon: Award,
          title: 'Quality Ranking',
          description: 'রেটিং এবং দূরত্বের ভিত্তিতে weighted scoring system'
        }
      ],
      howItWorks: {
        title: 'কীভাবে কাজ করে',
        steps: [
          {
            number: '১',
            title: 'আপনার অবস্থান শেয়ার করুন',
            description: 'বর্তমান অবস্থান ব্যবহার করুন অথবা ম্যানুয়ালি নির্বাচন করুন'
          },
          {
            number: '২',
            title: 'পছন্দ সেট করুন',
            description: 'বিষয় এবং খোঁজার দূরত্ব নির্ধারণ করুন'
          },
          {
            number: '৩',
            title: 'AI ম্যাচিং',
            description: 'আমাদের AI আপনার জন্য সেরা শিক্ষকদের খুঁজে দেবে'
          },
          {
            number: '৪',
            title: 'যোগাযোগ করুন',
            description: 'শিক্ষকের প্রোফাইল দেখুন এবং সরাসরি যোগাযোগ করুন'
          }
        ]
      },
      apiInfo: {
        title: 'Google Maps API Features',
        features: [
          'Interactive Maps',
          'Geocoding & Reverse Geocoding',
          'Distance Calculation (Haversine Formula)',
          'Places Autocomplete',
          'Real-time Location Tracking',
          'Custom Markers & InfoWindows',
          'Route Planning',
          'Geofencing'
        ]
      }
    }
  },
  en: {
    title: 'Maps & Location',
    subtitle: 'Find the best teachers near you with AI-powered location services',
    features: [
      'AI-Powered Teacher Matching',
      'Real-time Location Tracking',
      'Distance Calculation',
      'Interactive Maps'
    ],
    tabs: {
      overview: 'Features',
      about: 'Details'
    },
    accessInfo: {
      title: 'Exclusive Feature for Guardians',
      description: 'AI-powered map-based teacher finder system is available in Guardian Dashboard',
      benefits: [
        'Find the best teachers near your location',
        'Filter by distance and ratings',
        'See teachers on real-time map',
        'Contact with one click'
      ],
      loginRequired: 'Please login as a guardian to use this feature',
      loginButton: 'Login',
      dashboardButton: 'Go to Guardian Dashboard'
    },
    about: {
      title: 'Google Maps Integration',
      subtitle: 'AI-Powered Location Services',
      features: [
        {
          icon: Sparkles,
          title: 'AI-Powered Matching',
          description: 'Our AI algorithm finds the best teachers based on your preferences, distance, and ratings'
        },
        {
          icon: Navigation,
          title: 'Real-time Location',
          description: 'Use your current location to find nearby teachers and see exact distances'
        },
        {
          icon: TrendingUp,
          title: 'Smart Filtering',
          description: 'Filter by subject, distance, and availability'
        },
        {
          icon: Award,
          title: 'Quality Ranking',
          description: 'Weighted scoring system based on ratings and distance'
        }
      ],
      howItWorks: {
        title: 'How It Works',
        steps: [
          {
            number: '1',
            title: 'Share Your Location',
            description: 'Use current location or select manually on the map'
          },
          {
            number: '2',
            title: 'Set Preferences',
            description: 'Choose subject and search radius'
          },
          {
            number: '3',
            title: 'AI Matching',
            description: 'Our AI finds the best teachers for you'
          },
          {
            number: '4',
            title: 'Connect',
            description: 'View profiles and contact teachers directly'
          }
        ]
      },
      apiInfo: {
        title: 'Google Maps API Features',
        features: [
          'Interactive Maps',
          'Geocoding & Reverse Geocoding',
          'Distance Calculation (Haversine Formula)',
          'Places Autocomplete',
          'Real-time Location Tracking',
          'Custom Markers & InfoWindows',
          'Route Planning',
          'Geofencing'
        ]
      }
    }
  }
};

export function MapsAndLocationPage({ language, setPage, currentUser, onLogout }: MapsAndLocationPageProps) {
  const t = content[language];
  const isGuardian = currentUser?.userType === 'guardian';

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Header */}
      <Header
        language={language}
        setPage={setPage}
        currentUser={currentUser}
        onLogout={onLogout}
      />
      {/* Hero Section */}
      <PageHero
        title={t.title}
        subtitle={t.subtitle}
        language={language}
        backgroundGradient="from-blue-600 via-purple-600 to-pink-600"
      />

      {/* Features Banner */}
      <div className="container mx-auto px-4 -mt-8 relative z-10">
        <Card className="p-6 bg-white/90 backdrop-blur-md shadow-xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {t.features.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center mx-auto mb-2">
                  {index === 0 && <Sparkles className="w-6 h-6 text-white" />}
                  {index === 1 && <Navigation className="w-6 h-6 text-white" />}
                  {index === 2 && <TrendingUp className="w-6 h-6 text-white" />}
                  {index === 3 && <MapPin className="w-6 h-6 text-white" />}
                </div>
                <p className={`text-sm text-gray-700 ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>
                  {feature}
                </p>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2">
            <TabsTrigger value="overview">
              <Sparkles className="w-4 h-4 mr-2" />
              {t.tabs.overview}
            </TabsTrigger>
            <TabsTrigger value="about">
              <Zap className="w-4 h-4 mr-2" />
              {t.tabs.about}
            </TabsTrigger>
          </TabsList>

          {/* Overview - Access Info */}
          <TabsContent value="overview">
            <Card className="p-8 max-w-3xl mx-auto">
              <div className="text-center mb-8">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center mx-auto mb-6">
                  <MapPin className="w-10 h-10 text-white" />
                </div>
                <h3 className={`text-2xl text-gray-900 mb-4 ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>
                  {t.accessInfo.title}
                </h3>
                <p className={`text-lg text-gray-600 mb-6 ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>
                  {t.accessInfo.description}
                </p>
              </div>

              {/* Benefits List */}
              <div className="space-y-4 mb-8">
                {t.accessInfo.benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start gap-3 p-4 bg-emerald-50 rounded-lg">
                    <div className="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center shrink-0 mt-0.5">
                      <span className="text-white text-sm">{index + 1}</span>
                    </div>
                    <p className={`text-gray-700 ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>
                      {benefit}
                    </p>
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                {!currentUser && (
                  <Button
                    size="lg"
                    onClick={() => {
                      // Header এর UnifiedAuthDialog খুলবে
                      const loginButton = document.querySelector('[data-auth-trigger]') as HTMLButtonElement;
                      if (loginButton) loginButton.click();
                    }}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                  >
                    <LogIn className="w-5 h-5 mr-2" />
                    {t.accessInfo.loginButton}
                  </Button>
                )}
                {isGuardian && (
                  <Button
                    size="lg"
                    onClick={() => setPage('guardian-dashboard')}
                    className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700"
                  >
                    <MapPin className="w-5 h-5 mr-2" />
                    {t.accessInfo.dashboardButton}
                  </Button>
                )}
                {currentUser && !isGuardian && (
                  <div className="text-center p-4 bg-amber-50 border border-amber-200 rounded-lg">
                    <p className={`text-amber-800 ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>
                      {t.accessInfo.loginRequired}
                    </p>
                  </div>
                )}
              </div>
              
              {/* Preview Features */}
              <div className="mt-12 grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-3">
                    <Navigation className="w-6 h-6 text-blue-600" />
                  </div>
                  <h4 className={`text-sm text-gray-900 mb-1 ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>
                    {language === 'bn' ? 'রিয়েল-টাইম লোকেশন' : 'Real-time Location'}
                  </h4>
                  <p className={`text-xs text-gray-600 ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>
                    {language === 'bn' ? 'বর্তমান অবস্থান থেকে খুঁজুন' : 'Search from current location'}
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center mx-auto mb-3">
                    <Sparkles className="w-6 h-6 text-purple-600" />
                  </div>
                  <h4 className={`text-sm text-gray-900 mb-1 ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>
                    {language === 'bn' ? 'AI ম্যাচিং' : 'AI Matching'}
                  </h4>
                  <p className={`text-xs text-gray-600 ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>
                    {language === 'bn' ? 'স্মার্ট শিক্ষক ম্যাচিং' : 'Smart teacher matching'}
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-3">
                    <TrendingUp className="w-6 h-6 text-green-600" />
                  </div>
                  <h4 className={`text-sm text-gray-900 mb-1 ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>
                    {language === 'bn' ? 'দূরত্ব হিসাব' : 'Distance Calculation'}
                  </h4>
                  <p className={`text-xs text-gray-600 ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>
                    {language === 'bn' ? 'সঠিক দূরত্ব প্রদর্শন' : 'Accurate distance display'}
                  </p>
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* About & Info */}
          <TabsContent value="about">
            <div className="space-y-8">
              {/* Features Grid */}
              <div>
                <h3 className={`text-2xl text-gray-900 mb-6 text-center ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>
                  {t.about.subtitle}
                </h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {t.about.features.map((feature, index) => (
                    <Card key={index} className="p-6 text-center hover:shadow-xl transition-shadow">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center mx-auto mb-4">
                        <feature.icon className="w-8 h-8 text-white" />
                      </div>
                      <h4 className="text-lg text-gray-900 mb-2">{feature.title}</h4>
                      <p className={`text-sm text-gray-600 ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>
                        {feature.description}
                      </p>
                    </Card>
                  ))}
                </div>
              </div>

              {/* How It Works */}
              <Card className="p-8">
                <h3 className={`text-2xl text-gray-900 mb-6 text-center ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>
                  {t.about.howItWorks.title}
                </h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {t.about.howItWorks.steps.map((step, index) => (
                    <div key={index} className="relative">
                      <div className="text-center">
                        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center mx-auto mb-4 text-white text-2xl">
                          {step.number}
                        </div>
                        <h4 className={`text-lg text-gray-900 mb-2 ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>
                          {step.title}
                        </h4>
                        <p className={`text-sm text-gray-600 ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>
                          {step.description}
                        </p>
                      </div>
                      {index < 3 && (
                        <div className="hidden lg:block absolute top-8 left-full w-full h-0.5 bg-gradient-to-r from-emerald-500 to-teal-500 -translate-x-1/2" />
                      )}
                    </div>
                  ))}
                </div>
              </Card>

              {/* API Features */}
              <Card className="p-8 bg-gradient-to-br from-blue-50 to-purple-50">
                <h3 className="text-2xl text-gray-900 mb-6 text-center">
                  {t.about.apiInfo.title}
                </h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-3">
                  {t.about.apiInfo.features.map((feature, index) => (
                    <Badge
                      key={index}
                      className="bg-white text-gray-700 py-2 px-4 justify-center"
                      variant="outline"
                    >
                      <Zap className="w-3 h-3 mr-2 text-blue-600" />
                      {feature}
                    </Badge>
                  ))}
                </div>

                <div className="mt-8 p-4 bg-blue-100 border-2 border-blue-300 rounded-lg">
                  <p className="text-xs text-blue-700 text-center">
                    🔒 Google Maps JavaScript API • Places API • Geocoding API • Distance Matrix API
                  </p>
                  <p className="text-xs text-blue-600 text-center mt-2">
                    {language === 'bn' ? 'API Key নিরাপদে সংরক্ষিত' : 'API Key securely stored'}
                  </p>
                </div>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Footer */}
      <Footer language={language} setPage={setPage} />
    </div>
  );
}
