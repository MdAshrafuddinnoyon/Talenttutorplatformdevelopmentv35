import { useState, useEffect } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { GradientButton } from './ui/gradient-button';
import { Badge } from './ui/badge';
import { ChevronLeft, ChevronRight, Calendar, Eye, Heart, ArrowRight, BookOpen, TrendingUp } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { blogPosts, getFeaturedPosts, getLatestPosts } from '../utils/blogData';
import { projectId, publicAnonKey } from '../utils/supabase/info';

interface BlogStoriesSectionProps {
  language: 'bn' | 'en';
  setPage?: (page: string) => void;
}

const content = {
  bn: {
    sectionTitle: 'সাফল্যের গল্প ও ব্লগ',
    sectionSubtitle: 'আমাদের প্ল্যাটফর্মের মাধ্যমে যারা সফল হয়েছেন তাদের অনুপ্রেরণামূলক গল্প এবং শিক্ষামূলক ব্লগ পড়ুন',
    successStories: 'সাফল্যের গল্প',
    blog: 'ব্লগ',
    readMore: 'বিস্তারিত পড়ুন',
    viewAll: 'সব দেখুন',
    minutes: 'মিনিট পড়া',
    views: 'দর্শক',
    previous: 'পূর্ববর্তী',
    next: 'পরবর্তী',
  },
  en: {
    sectionTitle: 'Success Stories & Blog',
    sectionSubtitle: 'Read inspiring success stories and educational blogs from our platform',
    successStories: 'Success Stories',
    blog: 'Blog',
    readMore: 'Read More',
    viewAll: 'View All',
    minutes: 'min read',
    views: 'views',
    previous: 'Previous',
    next: 'Next',
  },
};

const API_BASE = `https://${projectId}.supabase.co/functions/v1/server/make-server-5b21d3ea`;

interface CMSPost {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  status: string;
  type: string;
  author: string;
  categories: string[];
  tags: string[];
  featuredImage: string;
  publishDate: string;
  views: number;
  likes: number;
  comments: number;
  featured: boolean;
  slug: string;
}

export function BlogStoriesSection({ language, setPage }: BlogStoriesSectionProps) {
  const t = content[language];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [cmsPosts, setCMSPosts] = useState<CMSPost[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch CMS posts on mount
  useEffect(() => {
    fetchCMSPosts();
  }, []);

  const fetchCMSPosts = async () => {
    try {
      // Use AbortController for timeout
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000);
      
      const response = await fetch(`${API_BASE}/cms/posts`, {
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`,
          'Content-Type': 'application/json'
        },
        signal: controller.signal
      });
      
      clearTimeout(timeoutId);
      
      if (!response.ok) {
        console.info('CMS posts endpoint not available, using static content');
        setLoading(false);
        return;
      }
      
      const data = await response.json();
      if (data.success) {
        // Filter only published and featured posts
        const publishedPosts = (data.posts || []).filter((p: CMSPost) => 
          p.status === 'published' && p.featured
        );
        setCMSPosts(publishedPosts);
      }
    } catch (error) {
      // Silently handle errors - CMS is optional, static content is primary
      if ((error as Error).name === 'AbortError') {
        console.info('CMS request timeout, using static content');
      } else {
        console.info('CMS posts not available, using static content only');
      }
      // Don't show error to user, just use static content
    } finally {
      setLoading(false);
    }
  };

  // Combine static featured posts and CMS featured posts
  const staticFeaturedPosts = getFeaturedPosts();
  const combinedPosts = [
    ...staticFeaturedPosts.map(post => ({
      id: post.id,
      title: language === 'bn' ? post.title : post.titleEn,
      excerpt: language === 'bn' ? post.excerpt : post.excerptEn,
      category: language === 'bn' ? post.categoryBn : post.categoryEn,
      image: post.image,
      date: post.date.toLocaleDateString(language === 'bn' ? 'bn-BD' : 'en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
      readTime: Math.ceil(post.content.split(' ').length / 200),
      views: post.views,
      featured: post.featured,
    })),
    ...cmsPosts.map(post => ({
      id: post.id,
      title: post.title,
      excerpt: post.excerpt,
      category: post.categories[0] || 'ব্লগ',
      image: post.featuredImage || 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800',
      date: new Date(post.publishDate).toLocaleDateString(language === 'bn' ? 'bn-BD' : 'en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
      readTime: Math.ceil(post.content.split(' ').length / 200),
      views: post.views,
      featured: post.featured,
    }))
  ];

  const allItems = combinedPosts.slice(0, 6); // Show max 6 items
  const itemsPerPage = 3;
  const totalPages = Math.ceil(allItems.length / itemsPerPage);

  useEffect(() => {
    if (!isAutoPlaying || totalPages === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % totalPages);
    }, 5000); // Auto-slide every 5 seconds

    return () => clearInterval(interval);
  }, [isAutoPlaying, totalPages]);

  const handlePrevious = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev - 1 + totalPages) % totalPages);
  };

  const handleNext = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev + 1) % totalPages);
  };

  const currentItems = allItems.slice(
    currentIndex * itemsPerPage,
    (currentIndex + 1) * itemsPerPage
  );

  const handleCardClick = (id: string) => {
    setPage?.(`blog-detail-${id}`);
  };

  if (loading || allItems.length === 0) {
    return null;
  }

  return (
    <section className="py-10 sm:py-14 lg:py-18 bg-gradient-to-br from-blue-50 via-teal-50 to-pink-50 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-teal-500 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-3 sm:px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block"
          >
            <Badge className="bg-gradient-to-r from-blue-600 to-teal-600 text-white mb-3 px-4 py-1.5 text-sm">
              <BookOpen className="w-3.5 h-3.5 mr-1.5" />
              {t.successStories} & {t.blog}
            </Badge>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-2xl sm:text-3xl md:text-4xl text-gray-900 mb-3"
          >
            {t.sectionTitle}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-sm sm:text-base md:text-lg text-gray-600 max-w-3xl mx-auto"
          >
            {t.sectionSubtitle}
          </motion.p>
        </div>

        {/* Stories/Blog Cards Container */}
        <div className="relative">
          {/* Navigation Buttons */}
          <div className="absolute -left-4 md:-left-16 top-1/2 -translate-y-1/2 z-20">
            <Button
              onClick={handlePrevious}
              size="lg"
              className="w-12 h-12 rounded-full bg-white shadow-xl hover:shadow-2xl border-2 border-[#10B981] hover:border-[#059669] transition-all"
              variant="outline"
            >
              <ChevronLeft className="w-6 h-6 text-[#10B981]" />
            </Button>
          </div>
          <div className="absolute -right-4 md:-right-16 top-1/2 -translate-y-1/2 z-20">
            <Button
              onClick={handleNext}
              size="lg"
              className="w-12 h-12 rounded-full bg-white shadow-xl hover:shadow-2xl border-2 border-[#10B981] hover:border-[#059669] transition-all"
              variant="outline"
            >
              <ChevronRight className="w-6 h-6 text-[#10B981]" />
            </Button>
          </div>

          {/* Cards Grid - Only Slide Animation */}
          <div className="overflow-hidden">
            <motion.div
              key={currentIndex}
              initial={{ x: 300 }}
              animate={{ x: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="grid md:grid-cols-3 gap-8"
            >
              {currentItems.map((item, idx) => (
                <Card 
                  key={item.id}
                  onClick={() => handleCardClick(item.id)}
                  className="overflow-hidden hover:shadow-2xl transition-all duration-300 group cursor-pointer border-2 border-transparent hover:border-[#10B981] h-full flex flex-col"
                >
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4">
                      <Badge className={item.featured ? 'bg-gradient-to-r from-rose-500 to-rose-600' : 'bg-gradient-to-r from-[#10B981] to-[#059669]'}>
                        {item.category}
                      </Badge>
                    </div>
                    {item.featured && (
                      <div className="absolute top-4 right-4">
                        <Badge className="bg-yellow-500">
                          <TrendingUp className="w-3 h-3 mr-1" />
                          Featured
                        </Badge>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-6 flex-1 flex flex-col">
                    <h3 className="text-gray-900 mb-3 line-clamp-2 group-hover:text-[#10B981] transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 mb-4 line-clamp-3 flex-1">
                      {item.excerpt}
                    </p>

                    {/* Meta Info */}
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {item.date}
                        </div>
                        <div className="flex items-center gap-1">
                          <Eye className="w-4 h-4" />
                          {item.views}
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-[#10B981] hover:text-[#059669] hover:bg-green-50"
                      >
                        {t.readMore}
                        <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </motion.div>
          </div>

          {/* Pagination Dots */}
          <div className="flex items-center justify-center gap-2 mt-12">
            {Array.from({ length: totalPages }).map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setCurrentIndex(idx);
                  setIsAutoPlaying(false);
                }}
                className={`h-2 rounded-full transition-all ${
                  idx === currentIndex
                    ? 'w-8 bg-gradient-to-r from-emerald-600 to-teal-600'
                    : 'w-2 bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Button
            onClick={() => setPage?.('blog')}
            size="lg"
            className="px-8 btn-primary"
          >
            <BookOpen className="w-5 h-5 mr-2" />
            {t.viewAll}
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </div>
    </section>
  );
}
