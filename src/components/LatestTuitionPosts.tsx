import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { GradientButton } from './ui/gradient-button';
import { Card } from './ui/card';
import { MapPin, BookOpen, Users, ArrowRight, Sparkles, ChevronLeft, ChevronRight, TrendingUp, Zap } from 'lucide-react';
import { tuitionPosts as staticTuitionPosts } from '../utils/tuitionData';
import { Badge } from './ui/badge';
import { motion } from 'motion/react';
import { tuitionPostsAPI, TuitionPost, realtimeSync } from '../utils/databaseService';

interface LatestTuitionPostsProps {
  language: 'bn' | 'en';
  setPage: (page: string) => void;
}

const content = {
  bn: {
    title: 'জরুরি টিউশনি পোস্ট',
    subtitle: 'জরুরি টিউশন পোস্টগুলো দেখুন এবং দ্রুত আবেদন করুন',
    viewMore: 'আরও দেখুন',
    viewAll: 'সব টিউশন দেখুন',
    applicants: 'জন আবেদন করেছেন',
    budget: 'বাজেট:',
    urgent: 'জরুরি',
    sectionBadge: '⚡ জরুরি টিউশনি',
    loading: 'লোড হচ্ছে...',
    noUrgent: 'এই মুহূর্তে কোন জরুরি টিউশনি পোস্ট নেই',
    realtime: 'রিয়েল-টাইম আপডেট',
  },
  en: {
    title: 'Urgent Tuition Posts',
    subtitle: 'Browse urgent tuition posts and apply now',
    viewMore: 'View More',
    viewAll: 'View All Tuitions',
    applicants: 'applicants',
    budget: 'Budget:',
    urgent: 'Urgent',
    sectionBadge: '🎯 Job Opportunities',
  }
};

export function LatestTuitionPosts({ language, setPage }: LatestTuitionPostsProps) {
  const t = content[language];
  const [currentSlide, setCurrentSlide] = useState(0);
  const [urgentPosts, setUrgentPosts] = useState<TuitionPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Fetch urgent posts on mount and subscribe to real-time updates
  useEffect(() => {
    const fetchUrgentPosts = async () => {
      setIsLoading(true);
      try {
        const posts = await tuitionPostsAPI.getUrgent();
        if (posts && posts.length > 0) {
          setUrgentPosts(posts);
        } else {
          // Fallback to static data if no database posts
          const urgentStaticPosts = staticTuitionPosts.filter(p => p.urgent);
          setUrgentPosts(urgentStaticPosts as any);
        }
      } catch (error) {
        console.error('Error fetching urgent posts:', error);
        // Fallback to static data
        const urgentStaticPosts = staticTuitionPosts.filter(p => p.urgent);
        setUrgentPosts(urgentStaticPosts as any);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUrgentPosts();

    // Subscribe to real-time updates every 10 seconds
    realtimeSync.subscribe('tuition-posts', (posts: TuitionPost[]) => {
      const urgent = posts.filter(p => p.urgent && p.status === 'open');
      if (urgent.length > 0) {
        setUrgentPosts(urgent);
      }
    }, 10000);

    return () => {
      realtimeSync.unsubscribe('tuition-posts');
    };
  }, []);
  
  // Responsive items per slide
  const itemsPerSlide = 3; // Desktop: 3, will be handled by grid
  const maxSlides = Math.ceil(urgentPosts.length / itemsPerSlide);

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % maxSlides);
  };

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev - 1 + maxSlides) % maxSlides);
  };

  return (
    <section className="py-16 sm:py-20 lg:py-24 relative overflow-hidden">
      {/* Modern Background Pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9InJnYmEoMTYsIDE4NSwgMTI5LCAwLjA1KSIvPjwvc3ZnPg==')] opacity-100"></div>
      
      {/* Gradient Orbs */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full overflow-hidden pointer-events-none">
         <div className="absolute top-[20%] -right-[10%] w-[500px] h-[500px] bg-emerald-400/5 rounded-full blur-[100px]"></div>
         <div className="absolute top-[40%] -left-[10%] w-[400px] h-[400px] bg-teal-400/5 rounded-full blur-[100px]"></div>
      </div>
      
      <div className="container mx-auto px-3 sm:px-4 relative">
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 sm:mb-10"
        >
          <Badge className="mb-4 px-4 py-2 bg-gradient-to-r from-red-50 to-rose-50 text-red-700 border-2 border-red-200 shadow-lg hover:shadow-xl transition-all text-sm animate-pulse">
            <Zap className="w-4 h-4 mr-1.5 text-red-600" />
            <span className={language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}>{t.sectionBadge}</span>
            {!isLoading && urgentPosts.length > 0 && (
              <span className="ml-2 px-2 py-0.5 bg-red-600 text-white rounded-full text-xs">
                {urgentPosts.length}
              </span>
            )}
          </Badge>
          <h2 className={`text-2xl sm:text-3xl md:text-4xl text-gray-900 mb-3 max-w-3xl mx-auto leading-tight ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>
            {t.title}
          </h2>
          <p className={`text-sm sm:text-base md:text-lg text-gray-600 max-w-2xl mx-auto ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>
            {t.subtitle}
          </p>
        </motion.div>

        {/* Navigation Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex items-center justify-between mb-8"
        >
          <div className="hidden sm:flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={handlePrev}
              className="rounded-full hover:bg-emerald-50 hover:border-emerald-600"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={handleNext}
              className="rounded-full hover:bg-emerald-50 hover:border-emerald-600"
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>
          <Button 
            variant="ghost"
            onClick={() => setPage('browse-tuitions')}
            className={`text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 gap-2 group ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}
          >
            {t.viewMore}
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </motion.div>
        
        {/* Tuition Posts Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="tuition-posts-slider relative overflow-hidden mb-8"
        >
          {isLoading ? (
            <div className="flex justify-center items-center py-20">
              <div className="text-center">
                <div className="w-16 h-16 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className={`text-gray-600 ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>
                  {t.loading}
                </p>
              </div>
            </div>
          ) : urgentPosts.length === 0 ? (
            <div className="text-center py-20">
              <Zap className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <p className={`text-gray-600 ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>
                {t.noUrgent}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {urgentPosts.slice(currentSlide * itemsPerSlide, (currentSlide + 1) * itemsPerSlide).map((post) => (
              <motion.div 
                key={post.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
                className="h-full"
              >
                <Card 
                  className="group p-6 hover:shadow-2xl hover:shadow-emerald-100/50 transition-all duration-500 cursor-pointer border border-slate-100 hover:border-emerald-200 hover:-translate-y-1 bg-white relative overflow-hidden h-full rounded-2xl"
                  onClick={() => setPage('browse-tuitions')}
                >
                  {/* Decorative gradient - urgent style */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-red-100 to-rose-100 rounded-full blur-3xl opacity-20 group-hover:opacity-40 transition-opacity" />
                  <div className="absolute top-2 right-2">
                    <Zap className="w-5 h-5 text-red-500 animate-pulse" />
                  </div>
                  
                  <div className="relative flex flex-col h-full">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h4 className={`text-lg text-gray-900 mb-3 line-clamp-2 group-hover:text-emerald-700 transition-colors ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>
                          {post.title}
                        </h4>
                        <div className={`flex items-center gap-2 text-sm text-gray-600 mb-3 ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>
                          <MapPin className="w-4 h-4 text-emerald-600" />
                          <span>{post.location}</span>
                        </div>
                      </div>
                      {post.urgent && (
                        <Badge className={`bg-gradient-to-r from-red-500 to-rose-500 text-white shadow-md ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>
                          {t.urgent}
                        </Badge>
                      )}
                    </div>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.subjects.slice(0, 2).map((subject) => (
                        <Badge 
                          key={subject} 
                          variant="outline" 
                          className={`border-emerald-500 text-emerald-700 bg-emerald-50 ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}
                        >
                          {subject}
                        </Badge>
                      ))}
                      {post.subjects.length > 2 && (
                        <Badge variant="outline" className="border-gray-300 text-gray-600">
                          +{post.subjects.length - 2}
                        </Badge>
                      )}
                    </div>
                    
                    <div className="pt-4 border-t border-gray-100 mt-auto">
                      <div className="flex items-center justify-between text-sm mb-2">
                        <div className={`flex items-center gap-2 text-gray-600 ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>
                          <Users className="w-4 h-4 text-emerald-600" />
                          <span>{post.applicants} {t.applicants}</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className={`text-emerald-700 ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>
                          <span className="text-xs text-gray-500">{t.budget}</span>
                          <div className="text-base">
                            ৳{post.budget.min.toLocaleString()}-{post.budget.max.toLocaleString()}
                          </div>
                        </div>
                        <ArrowRight className="w-5 h-5 text-emerald-600 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                      </div>
                    </div>
                  </div>
                </Card>
                </motion.div>
              ))}
            </div>
          )}
          
          {/* Carousel Dots Indicator */}
          {!isLoading && urgentPosts.length > 0 && maxSlides > 1 && (
            <div className="flex justify-center gap-2 mt-8">
              {Array.from({ length: maxSlides }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    currentSlide === index 
                      ? 'w-8 bg-red-600' 
                      : 'w-2 bg-gray-300 hover:bg-gray-400'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          )}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center"
        >
          <GradientButton 
            variant="emerald"
            size="lg" 
            className={`px-10 shadow-xl ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}
            onClick={() => setPage('browse-tuitions')}
          >
            <Sparkles className="w-5 h-5" />
            {t.viewAll}
            <ArrowRight className="w-5 h-5" />
          </GradientButton>
        </motion.div>
      </div>
    </section>
  );
}
