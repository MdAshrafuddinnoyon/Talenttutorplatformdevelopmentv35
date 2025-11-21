import { useState, useEffect } from 'react';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Textarea } from '../components/ui/textarea';
import { Input } from '../components/ui/input';
import { Separator } from '../components/ui/separator';
import { 
  ArrowLeft, 
  Heart, 
  Eye, 
  MessageCircle, 
  Share2, 
  Calendar, 
  User, 
  Send,
  ThumbsUp,
  Clock,
  Tag,
  Bookmark,
  Facebook,
  Twitter,
  Linkedin,
  Copy,
  Check,
  BookOpen,
  Loader2,
  TrendingUp,
} from 'lucide-react';
import { motion } from 'motion/react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { getBlogPostById, blogPosts, type BlogPost } from '../utils/blogData';
import { toast } from 'sonner@2.0.3';
import { projectId, publicAnonKey } from '../utils/supabase/info';
import { copyToClipboard } from '../utils/clipboard';
import { UnifiedAuthDialog } from '../components/UnifiedAuthDialog';

interface BlogDetailPageProps {
  language: 'bn' | 'en';
  setLanguage: (lang: 'bn' | 'en') => void;
  setPage: (page: string) => void;
  blogId?: string;
  announcement?: { title: string; message: string; type: string } | null;
  onSelectBlog?: (blogId: string) => void;
  currentUser?: any;
  onLogin?: (userType: string, userData: any) => void;
}

const content = {
  bn: {
    backToBlog: 'ব্লগে ফিরুন',
    share: 'শেয়ার করুন',
    leaveComment: 'মন্তব্য করুন',
    yourName: 'আপনার নাম',
    yourEmail: 'আপনার ইমেইল',
    yourComment: 'আপনার মন্তব্য',
    submitComment: 'মন্তব্য জমা দিন',
    comments: 'মন্তব্য',
    relatedPosts: 'সম্পর্কিত পোস্ট',
    readMore: 'আরও পড়ুন',
    views: 'দর্শক',
    likes: 'লাইক',
    loginToComment: 'মন্তব্য করতে লগইন করুন',
    loginRequired: 'মন্তব্য করার জন্য আপনাকে লগইন করতে হবে',
    login: 'লগইন করুন',
    tags: 'ট্যাগ',
    by: 'লিখেছেন',
    publishedOn: 'প্রকাশিত',
    readingTime: 'পড়ার সময়',
    minutes: 'মিনিট',
    likeThisPost: 'পোস্ট লাইক করুন',
    savePost: 'সংরক্ষণ করুন',
    copyLink: 'লিংক কপি করুন',
    linkCopied: 'লিংক কপি হয়েছে',
    relatedArticles: 'সম্পর্কিত নিবন্ধ',
    postNotFound: 'পোস্ট পাওয়া যায়নি',
    goBack: 'ফিরে যান',
    tableOfContents: 'সূচিপত্র',
    shareThisPost: 'এই পোস্ট শেয়ার করুন',
    aboutAuthor: 'লেখক সম্পর্কে',
  },
  en: {
    backToBlog: 'Back to Blog',
    share: 'Share',
    leaveComment: 'Leave a Comment',
    yourName: 'Your Name',
    yourEmail: 'Your Email',
    yourComment: 'Your Comment',
    submitComment: 'Submit Comment',
    comments: 'Comments',
    relatedPosts: 'Related Posts',
    readMore: 'Read More',
    views: 'Views',
    likes: 'Likes',
    loginToComment: 'Login to Comment',
    loginRequired: 'You must be logged in to comment',
    login: 'Login',
    tags: 'Tags',
    by: 'By',
    publishedOn: 'Published on',
    readingTime: 'Reading Time',
    minutes: 'minutes',
    likeThisPost: 'Like this post',
    savePost: 'Save Post',
    copyLink: 'Copy Link',
    linkCopied: 'Link Copied',
    relatedArticles: 'Related Articles',
    postNotFound: 'Post not found',
    goBack: 'Go Back',
    tableOfContents: 'Table of Contents',
    shareThisPost: 'Share this Post',
    aboutAuthor: 'About the Author',
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
  seoTitle: string;
  seoDescription: string;
}

export function BlogDetailPage({ language, setLanguage, setPage, blogId, announcement, onSelectBlog, currentUser, onLogin }: BlogDetailPageProps) {
  const t = content[language];
  const [post, setPost] = useState<BlogPost | null>(null);
  const [cmsPost, setCmsPost] = useState<CMSPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);
  const [commentName, setCommentName] = useState('');
  const [commentEmail, setCommentEmail] = useState('');
  const [commentText, setCommentText] = useState('');
  const [localLikes, setLocalLikes] = useState(0);
  const [localComments, setLocalComments] = useState<any[]>([]);
  const [showAuthDialog, setShowAuthDialog] = useState(false);

  useEffect(() => {
    if (blogId) {
      fetchPost();
    }
  }, [blogId]);

  const fetchPost = async () => {
    setLoading(true);
    
    // First try to get from static posts
    const staticPost = getBlogPostById(blogId || '');
    
    if (staticPost) {
      setPost(staticPost);
      setLocalLikes(staticPost.likes);
      setLoading(false);
      return;
    }

    // Try to fetch from CMS
    try {
      // Use AbortController for timeout
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000);
      
      const response = await fetch(`${API_BASE}/cms/posts/${blogId}`, {
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`,
          'Content-Type': 'application/json'
        },
        signal: controller.signal
      });
      
      clearTimeout(timeoutId);
      
      if (response.ok) {
        const data = await response.json();
        
        if (data.success && data.post) {
          setCmsPost(data.post);
          setLocalLikes(data.post.likes || 0);
          
          // Increment view count (fire and forget, no need to await)
          fetch(`${API_BASE}/cms/posts/${blogId}/view`, {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${publicAnonKey}`,
              'Content-Type': 'application/json'
            }
          }).catch(() => {
            // Silently ignore view count errors
          });
        }
      }
    } catch (error) {
      // Silently handle errors - CMS is optional, static content is available
      if ((error as Error).name !== 'AbortError') {
        console.info('CMS post not available, using static content');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLike = () => {
    if (!liked) {
      setLiked(true);
      setLocalLikes(prev => prev + 1);
      toast.success('পোস্ট লাইক করা হয়েছে!');
    }
  };

  const handleSave = () => {
    setSaved(!saved);
    toast.success(saved ? 'সংরক্ষণ থেকে সরানো হয়েছে' : 'পোস্ট সংরক্ষণ করা হয়েছে!');
  };

  const handleCopyLink = async () => {
    const success = await copyToClipboard(window.location.href);
    if (success) {
      setLinkCopied(true);
      toast.success(t.linkCopied);
      setTimeout(() => setLinkCopied(false), 2000);
    } else {
      toast.error(language === 'bn' ? 'লিংক কপি করতে ব্যর্থ' : 'Failed to copy link');
    }
  };

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check if user is logged in
    if (!currentUser) {
      toast.error(t.loginRequired);
      setShowAuthDialog(true);
      return;
    }

    if (!commentText) {
      toast.error(language === 'bn' ? 'মন্তব্য প্রয়োজন' : 'Comment required');
      return;
    }

    const newComment = {
      id: Date.now(),
      name: currentUser.name || currentUser.email || 'User',
      email: currentUser.email || '',
      text: commentText,
      date: new Date(),
    };

    setLocalComments([...localComments, newComment]);
    setCommentText('');
    toast.success(language === 'bn' ? 'মন্তব্য জমা হয়েছে!' : 'Comment submitted!');
  };

  const handleBlogClick = (id: string) => {
    setPage(`blog-detail-${id}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const formatDate = (date: Date | string) => {
    const d = typeof date === 'string' ? new Date(date) : date;
    if (language === 'bn') {
      return d.toLocaleDateString('bn-BD', { year: 'numeric', month: 'long', day: 'numeric' });
    }
    return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  const calculateReadingTime = (content: string) => {
    const wordsPerMinute = 200;
    const words = content.split(' ').length;
    return Math.ceil(words / wordsPerMinute);
  };

  // Combine CMS post with static structure
  const displayPost = cmsPost ? {
    id: cmsPost.id,
    title: cmsPost.title,
    titleEn: cmsPost.title,
    content: cmsPost.content,
    contentEn: cmsPost.content,
    excerpt: cmsPost.excerpt,
    excerptEn: cmsPost.excerpt,
    category: cmsPost.categories[0] || 'update',
    categoryBn: cmsPost.categories[0] || 'আপডেট',
    categoryEn: cmsPost.categories[0] || 'Update',
    author: { name: cmsPost.author, nameEn: cmsPost.author, role: 'লেখক', roleEn: 'Author', avatar: '' },
    date: new Date(cmsPost.publishDate),
    readTime: calculateReadingTime(cmsPost.content),
    image: cmsPost.featuredImage || 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200',
    views: cmsPost.views,
    likes: cmsPost.likes,
    comments: cmsPost.comments,
    tags: cmsPost.tags,
    featured: cmsPost.featured
  } : post;

  // Get related posts
  const relatedPosts = blogPosts
    .filter(p => p.id !== displayPost?.id && p.category === displayPost?.category)
    .slice(0, 3);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
        <Header
          language={language}
          setLanguage={setLanguage}
          setPage={setPage}
          announcement={announcement}
          onLogin={onLogin}
        />
        <div className="container mx-auto px-4 py-20">
          <div className="flex flex-col items-center justify-center">
            <Loader2 className="w-12 h-12 animate-spin text-emerald-600 mb-4" />
            <p className="text-gray-600">পোস্ট লোড হচ্ছে...</p>
          </div>
        </div>
        <Footer language={language} setPage={setPage} />
      </div>
    );
  }

  if (!displayPost) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
        <Header
          language={language}
          setLanguage={setLanguage}
          setPage={setPage}
          announcement={announcement}
          onLogin={onLogin}
        />
        <div className="container mx-auto px-4 py-20">
          <div className="text-center">
            <BookOpen className="w-20 h-20 mx-auto text-gray-400 mb-4" />
            <h2 className="text-2xl mb-4">{t.postNotFound}</h2>
            <Button onClick={() => setPage('blog')}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              {t.backToBlog}
            </Button>
          </div>
        </div>
        <Footer language={language} setPage={setPage} />
      </div>
    );
  }

  const postContent = language === 'bn' ? displayPost.content : displayPost.contentEn;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Header
        language={language}
        setLanguage={setLanguage}
        setPage={setPage}
        announcement={announcement}
        onLogin={onLogin}
      />

      {/* WordPress-style Breadcrumb */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <button onClick={() => setPage('home')} className="hover:text-emerald-600">
              হোম
            </button>
            <span>/</span>
            <button onClick={() => setPage('blog')} className="hover:text-emerald-600">
              ব্লগ
            </button>
            <span>/</span>
            <span className="text-gray-900">
              {language === 'bn' ? displayPost.title : displayPost.titleEn}
            </span>
          </div>
        </div>
      </div>

      {/* Main Content - WordPress Style */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-12 gap-8 max-w-7xl mx-auto">
          
          {/* Main Article - WordPress Style */}
          <article className="lg:col-span-8">
            <Card className="overflow-hidden bg-white">
              {/* Featured Image */}
              <div className="relative h-[400px] overflow-hidden">
                <img
                  src={displayPost.image}
                  alt={language === 'bn' ? displayPost.title : displayPost.titleEn}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4">
                  <Badge className="bg-emerald-600 text-white px-4 py-2 text-sm">
                    {language === 'bn' ? displayPost.categoryBn : displayPost.categoryEn}
                  </Badge>
                </div>
              </div>

              <div className="p-8 md:p-12">
                {/* Post Meta */}
                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-6">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    <span>
                      {t.by} <span className="font-medium text-gray-900">
                        {language === 'bn' ? displayPost.author.name : displayPost.author.nameEn}
                      </span>
                    </span>
                  </div>
                  <span>•</span>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>{formatDate(displayPost.date)}</span>
                  </div>
                  <span>•</span>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>{displayPost.readTime} {t.minutes}</span>
                  </div>
                  <span>•</span>
                  <div className="flex items-center gap-2">
                    <Eye className="w-4 h-4" />
                    <span>{displayPost.views.toLocaleString()} {t.views}</span>
                  </div>
                </div>

                {/* Post Title */}
                <h1 className="text-3xl md:text-4xl lg:text-5xl mb-6 text-gray-900">
                  {language === 'bn' ? displayPost.title : displayPost.titleEn}
                </h1>

                {/* Excerpt */}
                <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                  {language === 'bn' ? displayPost.excerpt : displayPost.excerptEn}
                </p>

                <Separator className="mb-8" />

                {/* Social Share Bar - WordPress Style */}
                <div className="flex items-center gap-4 mb-8 pb-8 border-b">
                  <Button
                    variant={liked ? "default" : "outline"}
                    size="sm"
                    onClick={handleLike}
                    className={liked ? "bg-red-500 hover:bg-red-600 text-white" : ""}
                  >
                    <Heart className={`w-4 h-4 mr-2 ${liked ? 'fill-current' : ''}`} />
                    {localLikes}
                  </Button>
                  
                  <Button variant="outline" size="sm" onClick={handleSave}>
                    <Bookmark className={`w-4 h-4 mr-2 ${saved ? 'fill-current' : ''}`} />
                    {t.savePost}
                  </Button>

                  <Button variant="outline" size="sm" onClick={handleCopyLink}>
                    {linkCopied ? (
                      <>
                        <Check className="w-4 h-4 mr-2" />
                        {t.linkCopied}
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4 mr-2" />
                        {t.copyLink}
                      </>
                    )}
                  </Button>

                  <div className="ml-auto flex items-center gap-2">
                    <span className="text-sm text-gray-600">{t.share}:</span>
                    <Button variant="ghost" size="sm" className="text-[#10B981] hover:bg-green-50">
                      <Facebook className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="text-[#10B981] hover:bg-green-50">
                      <Twitter className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="text-[#10B981] hover:bg-green-50">
                      <Linkedin className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                {/* Post Content - WordPress Typography */}
                <div 
                  className="prose prose-lg max-w-none mb-12"
                  style={{
                    fontSize: '18px',
                    lineHeight: '1.8',
                    color: '#374151'
                  }}
                >
                  <div dangerouslySetInnerHTML={{ __html: postContent }} />
                </div>

                {/* Tags Section */}
                {displayPost.tags && displayPost.tags.length > 0 && (
                  <div className="mb-8 pb-8 border-b">
                    <div className="flex items-center gap-3 flex-wrap">
                      <Tag className="w-5 h-5 text-gray-500" />
                      <span className="text-sm text-gray-600">{t.tags}:</span>
                      {displayPost.tags.map((tag, index) => (
                        <Badge key={index} variant="secondary" className="cursor-pointer hover:bg-emerald-100">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {/* Author Box - WordPress Style */}
                <Card className="bg-gradient-to-br from-emerald-50 to-blue-50 p-6 mb-8">
                  <div className="flex items-start gap-4">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-emerald-500 to-blue-500 flex items-center justify-center text-white text-2xl flex-shrink-0">
                      {(language === 'bn' ? displayPost.author.name : displayPost.author.nameEn).charAt(0)}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl mb-2">
                        {t.aboutAuthor}
                      </h3>
                      <p className="text-lg mb-2">
                        {language === 'bn' ? displayPost.author.name : displayPost.author.nameEn}
                      </p>
                      <p className="text-sm text-gray-600">
                        {language === 'bn' ? displayPost.author.role : displayPost.author.roleEn}
                      </p>
                    </div>
                  </div>
                </Card>

                {/* Comments Section */}
                <div className="mt-12">
                  <h3 className="text-2xl mb-6">
                    {t.comments} ({displayPost.comments + localComments.length})
                  </h3>

                  {/* Comment Form */}
                  <Card className="p-6 mb-8 bg-gray-50">
                    <h4 className="text-lg mb-4">{t.leaveComment}</h4>
                    {currentUser ? (
                      <form onSubmit={handleSubmitComment} className="space-y-4">
                        <Textarea
                          placeholder={t.yourComment}
                          rows={4}
                          value={commentText}
                          onChange={(e) => setCommentText(e.target.value)}
                        />
                        <Button type="submit" className="bg-emerald-600 hover:bg-emerald-700">
                          <Send className="w-4 h-4 mr-2" />
                          {t.submitComment}
                        </Button>
                      </form>
                    ) : (
                      <div className="text-center py-8">
                        <MessageCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-600 mb-4">{t.loginRequired}</p>
                        <Button 
                          onClick={() => setShowAuthDialog(true)}
                          className="bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700"
                        >
                          {t.login}
                        </Button>
                      </div>
                    )}
                  </Card>

                  {/* Comments List */}
                  <div className="space-y-6">
                    {localComments.map((comment) => (
                      <Card key={comment.id} className="p-6">
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-teal-500 to-rose-500 flex items-center justify-center text-white flex-shrink-0">
                            {comment.name.charAt(0)}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <span className="font-medium">{comment.name}</span>
                              <span className="text-sm text-gray-500">•</span>
                              <span className="text-sm text-gray-500">{formatDate(comment.date)}</span>
                            </div>
                            <p className="text-gray-700">{comment.text}</p>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          </article>

          {/* Sidebar - WordPress Style */}
          <aside className="lg:col-span-4 space-y-6">
            
            {/* Author Card */}
            <Card className="p-6 sticky top-4">
              <div className="text-center mb-6">
                <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-emerald-500 to-blue-500 flex items-center justify-center text-white text-3xl mb-4">
                  {(language === 'bn' ? displayPost.author.name : displayPost.author.nameEn).charAt(0)}
                </div>
                <h3 className="text-xl mb-1">
                  {language === 'bn' ? displayPost.author.name : displayPost.author.nameEn}
                </h3>
                <p className="text-sm text-gray-600">
                  {language === 'bn' ? displayPost.author.role : displayPost.author.roleEn}
                </p>
              </div>
              
              <Separator className="mb-6" />

              {/* Post Stats */}
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <div className="text-2xl text-emerald-600 mb-1">{displayPost.views.toLocaleString()}</div>
                  <div className="text-xs text-gray-600">{t.views}</div>
                </div>
                <div>
                  <div className="text-2xl text-red-600 mb-1">{localLikes}</div>
                  <div className="text-xs text-gray-600">{t.likes}</div>
                </div>
              </div>
            </Card>

            {/* Related Posts */}
            {relatedPosts.length > 0 && (
              <Card className="p-6">
                <h3 className="text-xl mb-4 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-emerald-600" />
                  {t.relatedArticles}
                </h3>
                <div className="space-y-4">
                  {relatedPosts.map((relatedPost) => (
                    <div
                      key={relatedPost.id}
                      className="group cursor-pointer"
                      onClick={() => handleBlogClick(relatedPost.id)}
                    >
                      <div className="flex gap-3">
                        <img
                          src={relatedPost.image}
                          alt={language === 'bn' ? relatedPost.title : relatedPost.titleEn}
                          className="w-20 h-20 object-cover rounded"
                        />
                        <div className="flex-1">
                          <h4 className="text-sm line-clamp-2 group-hover:text-emerald-600 transition-colors mb-1">
                            {language === 'bn' ? relatedPost.title : relatedPost.titleEn}
                          </h4>
                          <div className="flex items-center gap-2 text-xs text-gray-500">
                            <Calendar className="w-3 h-3" />
                            {formatDate(relatedPost.date)}
                          </div>
                        </div>
                      </div>
                      {relatedPost !== relatedPosts[relatedPosts.length - 1] && (
                        <Separator className="mt-4" />
                      )}
                    </div>
                  ))}
                </div>
              </Card>
            )}

            {/* Popular Tags */}
            <Card className="p-6">
              <h3 className="text-xl mb-4">{t.tags}</h3>
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline" className="cursor-pointer hover:bg-emerald-100">শিক্ষা</Badge>
                <Badge variant="outline" className="cursor-pointer hover:bg-emerald-100">টিউটরিং</Badge>
                <Badge variant="outline" className="cursor-pointer hover:bg-emerald-100">সাফল্য</Badge>
                <Badge variant="outline" className="cursor-pointer hover:bg-emerald-100">দান</Badge>
                <Badge variant="outline" className="cursor-pointer hover:bg-emerald-100">শিক্ষক</Badge>
                <Badge variant="outline" className="cursor-pointer hover:bg-emerald-100">গাইড</Badge>
              </div>
            </Card>
          </aside>
        </div>
      </div>

      {/* Footer */}
      <Footer language={language} setPage={setPage} />

      {/* Auth Dialog */}
      <UnifiedAuthDialog
        open={showAuthDialog}
        onOpenChange={setShowAuthDialog}
        language={language}
        onLogin={(userType, userData) => {
          onLogin?.(userType, userData);
          setShowAuthDialog(false);
        }}
        initialMode="register"
      />
    </div>
  );
}
