import { useState } from 'react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Badge } from '../components/ui/badge';
import { 
  ArrowLeft, 
  Search, 
  Book,
  BookOpen,
  Award,
  Globe2,
  Languages,
  Code,
  Heart,
  Palette,
  Zap,
  GraduationCap,
  Calculator,
  Beaker,
  Microscope,
  Music,
  Computer,
  FileText,
  TrendingUp,
  Users,
  Sparkles,
  Filter,
} from 'lucide-react';
import { motion } from 'motion/react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { subjectCategories, getSubjectsByCategory, searchSubjects, getSubjectsWithMediums, getSubjectsByMedium, type Subject } from '../utils/subjectsData';
import { mediums } from '../utils/mediumData';

interface AllSubjectsPageProps {
  language: 'bn' | 'en';
  setLanguage: (lang: 'bn' | 'en') => void;
  setPage: (page: string) => void;
  announcement?: { title: string; message: string; type: string } | null;
  onLogin?: (type: 'teacher' | 'guardian' | 'student' | 'admin' | 'donor') => void;
  currentUser?: any;
  onLogout?: () => void;
}

const content = {
  bn: {
    title: 'সকল বিষয়',
    subtitle: 'আপনার পছন্দের বিষয় খুঁজে নিন এবং যোগ্য শিক্ষক পান',
    backToHome: 'হোমে ফিরুন',
    search: 'বিষয় খুঁজুন...',
    allCategories: 'সকল ক্যাটাগরি',
    subjectsFound: 'টি বিষয় পাওয়া গেছে',
    findTeachers: 'শিক্ষক খুঁজুন',
    popular: 'জনপ্রিয়',
    totalSubjects: '২০০+ বিষয়',
    categories: '১০+ ক্যাটাগরি',
    teachers: '১,০০০+ শিক্ষক',
    noResults: 'কোনো বিষয় পাওয়া যায়নি',
    tryDifferent: 'ভিন্ন অনুসন্ধান চেষ্টা করুন',
    medium: 'মিডিয়াম',
    allMediums: 'সকল মিডিয়াম',
  },
  en: {
    title: 'All Subjects',
    subtitle: 'Find your preferred subject and get qualified teachers',
    backToHome: 'Back to Home',
    search: 'Search subjects...',
    allCategories: 'All Categories',
    subjectsFound: 'subjects found',
    findTeachers: 'Find Teachers',
    popular: 'Popular',
    totalSubjects: '200+ Subjects',
    categories: '10+ Categories',
    teachers: '1,000+ Teachers',
    noResults: 'No subjects found',
    tryDifferent: 'Try different search',
    medium: 'Medium',
    allMediums: 'All Mediums',
  },
};

const iconMap: { [key: string]: any } = {
  Book,
  BookOpen,
  Award,
  Globe2,
  Languages,
  Code,
  Heart,
  Palette,
  Zap,
  GraduationCap,
  Calculator,
  Beaker,
  Microscope,
  Music,
  Computer,
  FileText,
  TrendingUp,
  Users,
};

export function AllSubjectsPage({ 
  language, 
  setLanguage, 
  setPage, 
  announcement,
  onLogin,
  currentUser,
  onLogout
}: AllSubjectsPageProps) {
  const t = content[language];
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedMedium, setSelectedMedium] = useState<string>('all');

  // Get filtered subjects
  const getFilteredSubjects = () => {
    let subjects: Subject[] = getSubjectsWithMediums();
    
    // Search filter
    if (searchQuery) {
      const searchResults = searchSubjects(searchQuery, language);
      subjects = subjects.filter(s => 
        searchResults.some(sr => sr.id === s.id)
      );
    }
    
    // Category filter
    if (selectedCategory !== 'all') {
      subjects = subjects.filter(s => s.category === selectedCategory);
    }
    
    // Medium filter
    if (selectedMedium !== 'all') {
      subjects = subjects.filter(s => 
        s.mediums && s.mediums.includes(selectedMedium)
      );
    }
    
    return subjects;
  };

  const filteredSubjects = getFilteredSubjects();

  const handleSubjectClick = (subject: Subject) => {
    // Store selected subject and navigate to find teachers with filter
    localStorage.setItem('selectedSubject', language === 'bn' ? subject.name_bn : subject.name_en);
    setPage('find-teachers');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-teal-50">
      <Header
        language={language}
        setLanguage={setLanguage}
        setPage={setPage}
        announcement={announcement}
        onLogin={onLogin}
        currentUser={currentUser}
        onLogout={onLogout}
      />

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-teal-600 via-emerald-600 to-cyan-600 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl">
            <Button
              variant="ghost"
              onClick={() => setPage('home')}
              className="text-white hover:bg-white/20 mb-4"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              {t.backToHome}
            </Button>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h1 className="text-white mb-2">{t.title}</h1>
              <p className="text-xl text-white/90 mb-6">{t.subtitle}</p>

              {/* Stats */}
              <div className="flex flex-wrap gap-6 mb-6">
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                  <BookOpen className="w-5 h-5" />
                  <span>{t.totalSubjects}</span>
                </div>
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                  <Filter className="w-5 h-5" />
                  <span>{t.categories}</span>
                </div>
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                  <Users className="w-5 h-5" />
                  <span>{t.teachers}</span>
                </div>
              </div>

              {/* Search Bar */}
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  type="text"
                  placeholder={t.search}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 h-12 bg-white/95 backdrop-blur-sm border-0 shadow-lg text-gray-900 placeholder:text-gray-500"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Category Filter */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-4">
            <Filter className="w-5 h-5 text-gray-600" />
            <h2 className={`text-xl text-gray-900 ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>{t.allCategories}</h2>
          </div>
          
          <div className="flex flex-wrap gap-3">
            <Button
              variant={selectedCategory === 'all' ? 'default' : 'outline'}
              onClick={() => {
                setSelectedCategory('all');
                setSearchQuery('');
              }}
              className={`${selectedCategory === 'all' ? 'bg-[#10B981] hover:bg-[#059669]' : ''} ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}
            >
              {t.allCategories}
            </Button>
            
            {subjectCategories.map((category) => {
              const Icon = iconMap[category.icon] || Book;
              return (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? 'default' : 'outline'}
                  onClick={() => {
                    setSelectedCategory(category.id);
                    setSearchQuery('');
                  }}
                  className={`${selectedCategory === category.id ? 'bg-[#10B981] hover:bg-[#059669]' : ''} ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}
                >
                  <Icon className="w-4 h-4 mr-2" />
                  {language === 'bn' ? category.name_bn : category.name_en}
                </Button>
              );
            })}
          </div>
        </div>

        {/* Medium Filter */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Globe2 className="w-5 h-5 text-gray-600" />
            <h2 className={`text-xl text-gray-900 ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>
              {language === 'bn' ? 'মিডিয়াম' : 'Medium'}
            </h2>
          </div>
          
          <div className="flex flex-wrap gap-3">
            <Button
              variant={selectedMedium === 'all' ? 'default' : 'outline'}
              onClick={() => setSelectedMedium('all')}
              className={`${selectedMedium === 'all' ? 'bg-teal-600 hover:bg-teal-700' : ''} ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}
            >
              {language === 'bn' ? 'সকল মিডিয়াম' : 'All Mediums'}
            </Button>
            
            {mediums.map((medium) => (
              <Button
                key={medium.id}
                variant={selectedMedium === medium.id ? 'default' : 'outline'}
                onClick={() => setSelectedMedium(medium.id)}
                className={`${selectedMedium === medium.id ? 'bg-teal-600 hover:bg-teal-700' : ''} ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}
              >
                <span className="mr-2">{medium.icon}</span>
                {language === 'bn' ? medium.name.bn : medium.name.en}
              </Button>
            ))}
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            {filteredSubjects.length} {t.subjectsFound}
          </p>
        </div>

        {/* Categories Grid */}
        {!searchQuery && selectedCategory === 'all' ? (
          <div className="space-y-12">
            {subjectCategories.map((category, idx) => {
              const Icon = iconMap[category.icon] || Book;
              const categorySubjects = getSubjectsByCategory(category.id);
              
              return (
                <motion.div
                  key={category.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <Card className="overflow-hidden border-2">
                    <div className={`bg-gradient-to-r ${category.color} p-6 text-white`}>
                      <div className="flex items-center gap-3 mb-2">
                        <Icon className="w-8 h-8" />
                        <h3 className="text-2xl">
                          {language === 'bn' ? category.name_bn : category.name_en}
                        </h3>
                      </div>
                      <p className="text-white/90">
                        {language === 'bn' ? category.description_bn : category.description_en}
                      </p>
                    </div>
                    
                    <CardContent className="p-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                        {categorySubjects.map((subject) => (
                          <motion.div
                            key={subject.id}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <Card
                              className="cursor-pointer hover:shadow-lg transition-all border hover:border-[#10B981] group"
                              onClick={() => handleSubjectClick(subject)}
                            >
                              <CardContent className="p-4">
                                <div className="flex items-start justify-between mb-2">
                                  <p className="text-gray-900 group-hover:text-[#10B981] transition-colors">
                                    {language === 'bn' ? subject.name_bn : subject.name_en}
                                  </p>
                                  {subject.popular && (
                                    <Badge variant="secondary" className="bg-amber-100 text-amber-700 text-xs">
                                      <Sparkles className="w-3 h-3 mr-1" />
                                      {t.popular}
                                    </Badge>
                                  )}
                                </div>
                                {subject.description_bn && (
                                  <p className="text-sm text-gray-500">
                                    {language === 'bn' ? subject.description_bn : subject.description_en}
                                  </p>
                                )}
                              </CardContent>
                            </Card>
                          </motion.div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        ) : (
          // Search Results or Single Category View
          <div>
            {filteredSubjects.length === 0 ? (
              <Card className="p-12 text-center">
                <Search className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                <h3 className="text-xl text-gray-900 mb-2">{t.noResults}</h3>
                <p className="text-gray-600 mb-4">{t.tryDifferent}</p>
                <Button onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                }}>
                  {t.allCategories}
                </Button>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {filteredSubjects.map((subject, idx) => (
                  <motion.div
                    key={subject.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Card
                      className="cursor-pointer hover:shadow-lg transition-all border hover:border-[#10B981] group h-full"
                      onClick={() => handleSubjectClick(subject)}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between mb-2">
                          <p className="text-gray-900 group-hover:text-[#10B981] transition-colors">
                            {language === 'bn' ? subject.name_bn : subject.name_en}
                          </p>
                          {subject.popular && (
                            <Badge variant="secondary" className="bg-amber-100 text-amber-700 text-xs">
                              <Sparkles className="w-3 h-3 mr-1" />
                              {t.popular}
                            </Badge>
                          )}
                        </div>
                        {subject.description_bn && (
                          <p className="text-sm text-gray-500 mb-3">
                            {language === 'bn' ? subject.description_bn : subject.description_en}
                          </p>
                        )}
                        <Button
                          size="sm"
                          variant="outline"
                          className="w-full group-hover:bg-[#10B981] group-hover:text-white group-hover:border-[#10B981] transition-colors"
                        >
                          {t.findTeachers}
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      <Footer language={language} setPage={setPage} />
    </div>
  );
}
