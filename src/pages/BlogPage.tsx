import { useState, useEffect } from 'react';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Input } from '../components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { 
  ArrowLeft, 
  Heart, 
  Eye, 
  MessageCircle, 
  Search, 
  Calendar, 
  User, 
  Award,
  BookOpen,
  TrendingUp,
  Star,
  Quote,
  LayoutDashboard,
  Tag,
  Clock,
  ArrowRight,
  ThumbsUp,
} from 'lucide-react';
import { motion } from 'motion/react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { LoadMoreButton } from '../components/LoadMoreButton';
import { blogPosts, getFeaturedPosts, getLatestPosts, getPopularPosts, type BlogPost } from '../utils/blogData';
import { projectId, publicAnonKey } from '../utils/supabase/info';
import { Loader2 } from 'lucide-react';
import { blogAPI } from '../utils/databaseService';

interface BlogPageProps {
  language: 'bn' | 'en';
  setLanguage: (lang: 'bn' | 'en') => void;
  setPage: (page: string) => void;
  announcement?: { title: string; message: string; type: string } | null;
  onSelectBlog?: (blogId: string) => void;
  onLogin?: (type: 'teacher' | 'guardian' | 'student' | 'admin' | 'donor', userData?: any) => void;
}

const content = {
  bn: {
    title: 'সাফল্যের গল্প ও ব্লগ',
    subtitle: 'দান ও সহায়তার মাধ্যমে পরিবর্তিত জীবনের গল্প',
    backToHome: 'হোমে ফিরুন',
    successStories: 'সাফল্যের গল্প',
    educationTips: 'শিক্ষা টিপস',
    donorStories: 'দাতাদের অভিজ্ঞতা',
    platformUpdates: 'প্ল্যাটফর্ম আপডেট',
    all: 'সব',
    readMore: 'সম্পূর্ণ পড়ুন',
    views: 'দর্শক',
    comments: 'মন্তব্য',
    likes: 'লাইক',
    search: 'খুঁজুন...',
    featuredStory: 'বৈশিষ্ট্যযুক্ত গল্প',
    latestPosts: 'সাম্প্রতিক পোস্ট',
    popularPosts: 'জনপ্রিয় পোস্ট',
    categories: 'ক্যাটাগরি',
    by: 'লিখেছেন',
    readingTime: 'পড়ার সময়',
    minutes: 'মিনিট',
    tags: 'ট্যাগ',
  },
  en: {
    title: 'Success Stories & Blog',
    subtitle: 'Stories of lives changed through donations and support',
    backToHome: 'Back to Home',
    successStories: 'Success Stories',
    educationTips: 'Education Tips',
    donorStories: 'Donor Stories',
    platformUpdates: 'Platform Updates',
    all: 'All',
    readMore: 'Read More',
    views: 'Views',
    comments: 'Comments',
    likes: 'Likes',
    search: 'Search...',
    featuredStory: 'Featured Story',
    latestPosts: 'Latest Posts',
    popularPosts: 'Popular Posts',
    categories: 'Categories',
    by: 'By',
    readingTime: 'Reading Time',
    minutes: 'minutes',
    tags: 'Tags',
  },
};

import { API_BASE_URL } from '../utils/apiConfig';

const API_BASE = API_BASE_URL;

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

export function BlogPage({ language, setLanguage, setPage, announcement, onSelectBlog, onLogin }: BlogPageProps) {
  const t = content[language];
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [cmsPosts, setCMSPosts] = useState<CMSPost[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Pagination states
  const [displayCount, setDisplayCount] = useState(9);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const ITEMS_PER_PAGE = 9;

  // Handle Load More
  const handleLoadMore = () => {
    setIsLoadingMore(true);
    setTimeout(() => {
      setDisplayCount(prev => prev + ITEMS_PER_PAGE);
      setIsLoadingMore(false);
    }, 800);
  };

  // Fetch CMS posts on mount
  useEffect(() => {
    const fetchCMSPosts = async () => {
      setLoading(true);
      try {
        // Try fetching from new database service first
        const dbPosts = await blogAPI.getPublished();
        if (dbPosts && dbPosts.length > 0) {
          const formattedPosts = dbPosts.map((post: any) => ({
            id: post.id,
            title: post.title || post.titleEn || '',
            content: post.content || '',
            excerpt: post.excerpt || '',
            status: post.status || 'published',
            type: post.category || 'story',
            author: post.author?.name || 'Admin',
            categories: [post.category || 'story'],
            tags: post.tags || [],
            featuredImage: post.coverImage || '',
            publishDate: post.publishedAt || post.createdAt,
            views: post.views || 0,
            likes: post.likes || 0,
            comments: post.comments || 0,
            featured: false,
            slug: post.slug || post.id
          }));
          setCMSPosts(formattedPosts);
          setLoading(false);
          return;
        }
      } catch (error) {
        console.error('Error fetching from new database:', error);
      }

      // Fallback to old API
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
          // Filter only published posts
          const publishedPosts = (data.posts || []).filter((p: CMSPost) => p.status === 'published');
          setCMSPosts(publishedPosts);
        }
      } catch (error: any) {
        // Silently handle errors - CMS is optional, static content is primary
        if (error.name === 'AbortError') {
          console.info('CMS request timeout, using static content');
        } else {
          console.info('CMS posts not available, using static content only');
        }
        // Don't show error to user, just use static content
      } finally {
        setLoading(false);
      }
    };

    fetchCMSPosts();
  }, []);

  // Combine static and CMS posts
  const allPosts = [...blogPosts, ...cmsPosts.map(post => ({
    id: post.id,
    title: post.title,
    titleEn: post.title,
    excerpt: post.excerpt,
    excerptEn: post.excerpt,
    content: post.content,
    contentEn: post.content,
    category: post.categories[0] || 'update',
    categoryBn: post.categories[0] || 'আপডেট',
    categoryEn: post.categories[0] || 'Update',
    author: post.author,
    authorEn: post.author,
    date: new Date(post.publishDate),
    readTime: Math.ceil(post.content.split(' ').length / 200),
    image: post.featuredImage || 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800',
    views: post.views,
    likes: post.likes,
    comments: post.comments,
    featured: post.featured,
    tags: post.tags
  }))];

  const featuredPosts = allPosts.filter(p => p.featured).slice(0, 3);
  const latestPosts = allPosts.sort((a, b) => b.date.getTime() - a.date.getTime()).slice(0, 6);
  const popularPosts = allPosts.sort((a, b) => b.views - a.views).slice(0, 5);

  const filteredPosts = allPosts.filter((post) => {
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    const title = language === 'bn' ? post.title : post.titleEn;
    const excerpt = language === 'bn' ? post.excerpt : post.excerptEn;
    const matchesSearch = title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const categories = [
    { id: 'all', labelBn: 'সব', labelEn: 'All', icon: LayoutDashboard },
    { id: 'success', labelBn: 'সাফল্যের গল্প', labelEn: 'Success Stories', icon: Award },
    { id: 'education', labelBn: 'শিক্ষা টিপস', labelEn: 'Education Tips', icon: BookOpen },
    { id: 'donor', labelBn: 'দাতাদের অভিজ্ঞতা', labelEn: 'Donor Stories', icon: Heart },
    { id: 'update', labelBn: 'প্ল্যাটফর্ম আপডেট', labelEn: 'Platform Updates', icon: TrendingUp },
  ];

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'success':
        return 'from-emerald-500 to-teal-500';
      case 'donor':
        return 'from-rose-500 to-pink-500';
      case 'education':
        return 'from-blue-500 to-cyan-500';
      case 'update':
        return 'from-teal-500 to-emerald-500';
      default:
        return 'from-gray-500 to-gray-600';
    }
  };

  const formatDate = (date: Date) => {
    if (language === 'bn') {
      return date.toLocaleDateString('bn-BD', { year: 'numeric', month: 'long', day: 'numeric' });
    }
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  const calculateReadingTime = (content: string) => {
    const wordsPerMinute = 200;
    const words = content.split(' ').length;
    return Math.ceil(words / wordsPerMinute);
  };

  const handleBlogClick = (blogId: string) => {
    setPage(`blog-detail-${blogId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Header */}
      <Header
        language={language}
        setLanguage={setLanguage}
        setPage={setPage}
        announcement={announcement}
        onLogin={onLogin}
      />

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 text-white py-12">
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
              <p className="text-xl text-green-50 mb-6">{t.subtitle}</p>

              {/* Stats */}
              <div className="flex flex-wrap gap-6 mb-6">
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                  <BookOpen className="w-5 h-5" />
                  <span>{filteredPosts.length}+ ব্লগ পোস্ট</span>
                </div>
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                  <TrendingUp className="w-5 h-5" />
                  <span>{getFeaturedPosts(allPosts).length}+ বৈশিষ্ট্যযুক্ত</span>
                </div>
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                  <Award className="w-5 h-5" />
                  <span>সাফল্যের গল্প</span>
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

      {/* Category Filters - Below Hero */}
      <div className="bg-white border-b sticky top-[73px] z-40 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => {
              const Icon = cat.icon;
              return (
                <Button
                  key={cat.id}
                  variant={selectedCategory === cat.id ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedCategory(cat.id)}
                  className={selectedCategory === cat.id ? 'bg-[#10B981] text-white hover:bg-[#059669]' : 'border-green-200 text-[#059669] hover:bg-green-50'}
                >
                  <Icon className="w-4 h-4 mr-2" />
                  {language === 'bn' ? cat.labelBn : cat.labelEn}
                </Button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-7xl mx-auto">
          
          {/* Loading State */}
          {loading && (
            <div className="flex flex-col items-center justify-center py-20">
              <Loader2 className="w-12 h-12 animate-spin text-emerald-600 mb-4" />
              <p className="text-gray-600">কন্টেন্ট লোড হচ্ছে...</p>
            </div>
          )}

          {!loading && (
            <>
          
          {/* Featured Posts */}
          {selectedCategory === 'all' && featuredPosts.length > 0 && (
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-16"
            >
              <div className="flex items-center gap-3 mb-8">
                <Star className="w-6 h-6 text-yellow-500" />
                <h2 className="text-3xl">{t.featuredStory}</h2>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                {featuredPosts.slice(0, 2).map((post) => (
                  <Card
                    key={post.id}
                    className="overflow-hidden hover:shadow-2xl transition-all duration-300 cursor-pointer group"
                    onClick={() => handleBlogClick(post.id)}
                  >
                    <div className="relative h-64 overflow-hidden">
                      <img
                        src={post.image}
                        alt={language === 'bn' ? post.title : post.titleEn}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className={`absolute top-4 left-4 px-4 py-2 rounded-full bg-gradient-to-r ${getCategoryColor(post.category)} text-white`}>
                        {language === 'bn' ? post.categoryBn : post.categoryEn}
                      </div>
                      <Badge className="absolute top-4 right-4 bg-yellow-500 text-white">
                        <Star className="w-3 h-3 mr-1" />
                        {t.featuredStory}
                      </Badge>
                    </div>
                    <div className="p-6">
                      <h3 className="mb-3 line-clamp-2 group-hover:text-[#10B981] transition-colors">
                        {language === 'bn' ? post.title : post.titleEn}
                      </h3>
                      <p className="text-gray-600 mb-4 line-clamp-3">
                        {language === 'bn' ? post.excerpt : post.excerptEn}
                      </p>
                      
                      <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-1">
                            <Eye className="w-4 h-4" />
                            {post.views.toLocaleString()}
                          </div>
                          <div className="flex items-center gap-1">
                            <ThumbsUp className="w-4 h-4" />
                            {post.likes.toLocaleString()}
                          </div>
                          <div className="flex items-center gap-1">
                            <MessageCircle className="w-4 h-4" />
                            {post.comments}
                          </div>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {calculateReadingTime(language === 'bn' ? post.content : post.contentEn)} {t.minutes}
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4 text-gray-400" />
                          <span className="text-sm text-gray-600">
                            {typeof post.author === 'string' 
                              ? post.author 
                              : (language === 'bn' ? post.author.name : post.author.nameEn)}
                          </span>
                        </div>
                        <Button variant="ghost" className="group-hover:bg-green-50 group-hover:text-[#10B981]">
                          {t.readMore}
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </motion.section>
          )}

          {/* All Blog Posts Grid */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-3xl mb-8">
              {selectedCategory === 'all' ? (language === 'bn' ? 'সকল পোস্ট' : 'All Posts') : (
                categories.find(c => c.id === selectedCategory) ? 
                  (language === 'bn' ? categories.find(c => c.id === selectedCategory)!.labelBn : categories.find(c => c.id === selectedCategory)!.labelEn) : 
                  ''
              )}
              <span className="text-gray-500 text-lg ml-2">({filteredPosts.length})</span>
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPosts.slice(0, displayCount).map((post) => (
                <Card
                  key={post.id}
                  className="overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer group flex flex-col"
                  onClick={() => handleBlogClick(post.id)}
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={post.image}
                      alt={language === 'bn' ? post.title : post.titleEn}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className={`absolute top-3 left-3 px-3 py-1 rounded-full bg-gradient-to-r ${getCategoryColor(post.category)} text-white text-sm`}>
                      {language === 'bn' ? post.categoryBn : post.categoryEn}
                    </div>
                  </div>
                  
                  <div className="p-5 flex-1 flex flex-col">
                    <div className="flex items-center gap-3 text-xs text-gray-500 mb-3">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {formatDate(post.date)}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {calculateReadingTime(language === 'bn' ? post.content : post.contentEn)} {t.minutes}
                      </div>
                    </div>

                    <h3 className="mb-2 line-clamp-2 group-hover:text-[#10B981] transition-colors">
                      {language === 'bn' ? post.title : post.titleEn}
                    </h3>
                    
                    <p className="text-sm text-gray-600 mb-4 line-clamp-2 flex-1">
                      {language === 'bn' ? post.excerpt : post.excerptEn}
                    </p>

                    <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1">
                          <Eye className="w-3 h-3" />
                          {post.views.toLocaleString()}
                        </div>
                        <div className="flex items-center gap-1">
                          <ThumbsUp className="w-3 h-3" />
                          {post.likes}
                        </div>
                        <div className="flex items-center gap-1">
                          <MessageCircle className="w-3 h-3" />
                          {post.comments}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                      <span className="text-xs text-gray-600">
                        {typeof post.author === 'string' 
                          ? post.author 
                          : (language === 'bn' ? post.author.name : post.author.nameEn)}
                      </span>
                      <Button variant="ghost" size="sm" className="group-hover:bg-green-50 group-hover:text-[#10B981] p-1 h-auto">
                        <ArrowRight className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* Load More Button */}
            {filteredPosts.length > displayCount && (
              <LoadMoreButton
                onClick={handleLoadMore}
                loading={isLoadingMore}
                hasMore={filteredPosts.length > displayCount}
                language={language}
                totalShown={Math.min(displayCount, filteredPosts.length)}
                totalAvailable={filteredPosts.length}
              />
            )}

            {filteredPosts.length === 0 && (
              <div className="text-center py-16">
                <BookOpen className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                <p className="text-xl text-gray-600">
                  {language === 'bn' ? 'কোনো পোস্ট পাওয়া যায়নি' : 'No posts found'}
                </p>
              </div>
            )}
          </motion.section>
          </>
          )}
        </div>
      </div>

      {/* Footer */}
      <Footer language={language} setPage={setPage} />
    </div>
  );
}
