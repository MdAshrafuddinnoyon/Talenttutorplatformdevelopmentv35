import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from './ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Switch } from './ui/switch';
import { ScrollArea } from './ui/scroll-area';
import { Checkbox } from './ui/checkbox';
import {
  PlusCircle, Edit, Trash2, Eye, Search, Filter, Image as ImageIcon,
  FileText, Calendar, Tag as TagIcon, FolderOpen, User, Clock,
  Save, Send, Upload, X, Star, MessageSquare, Heart, BarChart3,
  RefreshCw, Download, Layout, Code, Loader2, CheckCircle, AlertCircle
} from 'lucide-react';
import { motion } from 'motion/react';
import { toast } from 'sonner@2.0.3';
import { projectId, publicAnonKey } from '../utils/supabase/info';

interface Post {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  status: 'draft' | 'published' | 'scheduled' | 'trash';
  type: 'post' | 'page' | 'video';
  author: string;
  authorId: number;
  category: string;
  categories: string[];
  tags: string[];
  featuredImage: string;
  publishDate: string;
  modifiedDate: string;
  createdAt: string;
  views: number;
  likes: number;
  comments: number;
  seoTitle: string;
  seoDescription: string;
  seoKeywords: string;
  featured: boolean;
  allowComments: boolean;
  slug: string;
  revisions: number;
}

interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  count: number;
}

interface Tag {
  id: string;
  name: string;
  slug: string;
  count: number;
}

const API_BASE = `https://${projectId}.supabase.co/functions/v1/server/make-server-5b21d3ea`;

// Helper function for safe API calls with timeout
const safeFetch = async (url: string, options: RequestInit = {}, timeout = 5000) => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);
  
  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal
    });
    clearTimeout(timeoutId);
    return response;
  } catch (error) {
    clearTimeout(timeoutId);
    throw error;
  }
};

export function DynamicCMS() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [saving, setSaving] = useState(false);
  
  const [activeTab, setActiveTab] = useState('all-posts');
  const [filterStatus, setFilterStatus] = useState<'all' | 'published' | 'draft' | 'scheduled' | 'trash'>('all');
  const [filterType, setFilterType] = useState<'all' | 'post' | 'page' | 'video'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPosts, setSelectedPosts] = useState<string[]>([]);
  
  // Dialogs
  const [postDialog, setPostDialog] = useState(false);
  const [categoryDialog, setCategoryDialog] = useState(false);
  const [tagDialog, setTagDialog] = useState(false);
  
  // Current editing item
  const [currentPost, setCurrentPost] = useState<Post | null>(null);
  const [currentCategory, setCurrentCategory] = useState<Category | null>(null);
  const [currentTag, setCurrentTag] = useState<Tag | null>(null);
  
  // Editor state
  const [editorMode, setEditorMode] = useState<'visual' | 'html'>('visual');
  
  // New category/tag input
  const [newCategoryName, setNewCategoryName] = useState('');
  const [newTagName, setNewTagName] = useState('');

  // Fetch data on mount
  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    setLoading(true);
    await Promise.all([
      fetchPosts(),
      fetchCategories(),
      fetchTags()
    ]);
    setLoading(false);
  };

  const fetchPosts = async () => {
    try {
      const response = await safeFetch(`${API_BASE}/cms/posts`, {
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (!response.ok) {
        console.info('CMS posts endpoint not available');
        setPosts([]);
        return;
      }
      
      const data = await response.json();
      if (data.success && Array.isArray(data.posts)) {
        setPosts(data.posts);
        console.log('✅ Fetched posts:', data.posts.length);
      } else {
        setPosts([]);
      }
    } catch (error) {
      // Silently handle errors
      if ((error as Error).name !== 'AbortError') {
        console.info('CMS posts endpoint not available');
      }
      setPosts([]);
      // Don't show error toast, this is expected on first load
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await safeFetch(`${API_BASE}/cms/categories`, {
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (!response.ok) {
        setCategories([]);
        return;
      }
      
      const data = await response.json();
      if (data.success && Array.isArray(data.categories)) {
        setCategories(data.categories);
      } else {
        setCategories([]);
      }
    } catch (error) {
      // Silently handle errors
      if ((error as Error).name !== 'AbortError') {
        console.info('CMS categories endpoint not available');
      }
      setCategories([]);
    }
  };

  const fetchTags = async () => {
    try {
      const response = await safeFetch(`${API_BASE}/cms/tags`, {
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (!response.ok) {
        setTags([]);
        return;
      }
      
      const data = await response.json();
      if (data.success && Array.isArray(data.tags)) {
        setTags(data.tags);
      } else {
        setTags([]);
      }
    } catch (error) {
      // Silently handle errors
      if ((error as Error).name !== 'AbortError') {
        console.info('CMS tags endpoint not available');
      }
      setTags([]);
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchAllData();
    setRefreshing(false);
    toast.success('ডেটা রিফ্রেশ হয়েছে!');
  };

  // Filter posts
  const filteredPosts = posts.filter(post => {
    const statusMatch = filterStatus === 'all' || post.status === filterStatus;
    const typeMatch = filterType === 'all' || post.type === filterType;
    const searchMatch = searchQuery === '' || 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return statusMatch && typeMatch && searchMatch;
  });

  // Create new post
  const handleNewPost = () => {
    const now = new Date().toISOString();
    setCurrentPost({
      id: '',
      title: '',
      content: '',
      excerpt: '',
      status: 'draft',
      type: 'post',
      author: 'Admin',
      authorId: 1,
      category: categories.length > 0 ? categories[0].name : '',
      categories: [],
      tags: [],
      featuredImage: '',
      publishDate: now,
      modifiedDate: now,
      createdAt: now,
      views: 0,
      likes: 0,
      comments: 0,
      seoTitle: '',
      seoDescription: '',
      seoKeywords: '',
      featured: false,
      allowComments: true,
      slug: '',
      revisions: 0
    });
    setPostDialog(true);
  };

  // Edit post
  const handleEditPost = (post: Post) => {
    setCurrentPost({ ...post });
    setPostDialog(true);
  };

  // Save post
  const handleSavePost = async () => {
    if (!currentPost) return;

    // Validation
    if (!currentPost.title.trim()) {
      toast.error('পোস্ট শিরোনাম প্রয়োজন!');
      return;
    }
    if (!currentPost.content.trim()) {
      toast.error('পোস্ট কন্টেন্ট প্রয়োজন!');
      return;
    }

    setSaving(true);

    try {
      // Generate slug if not exists
      if (!currentPost.slug) {
        currentPost.slug = currentPost.title
          .toLowerCase()
          .replace(/[^a-z0-9\s-]/g, '')
          .replace(/\s+/g, '-')
          .substring(0, 100);
      }

      // Generate SEO title if not exists
      if (!currentPost.seoTitle) {
        currentPost.seoTitle = `${currentPost.title} | Talent Tutor`;
      }

      // Generate excerpt if not exists
      if (!currentPost.excerpt) {
        const plainText = currentPost.content.replace(/<[^>]+>/g, '');
        currentPost.excerpt = plainText.substring(0, 160) + '...';
      }

      // Set category if categories array is not empty
      if (currentPost.categories.length > 0) {
        currentPost.category = currentPost.categories[0];
      }

      const isNew = !currentPost.id;
      const url = isNew 
        ? `${API_BASE}/cms/posts`
        : `${API_BASE}/cms/posts/${currentPost.id}`;
      
      const method = isNew ? 'POST' : 'PUT';

      const postData = {
        ...currentPost,
        modifiedDate: new Date().toISOString(),
        revisions: (currentPost.revisions || 0) + 1
      };

      if (isNew) {
        postData.id = `${Date.now()}`;
        postData.createdAt = new Date().toISOString();
        postData.publishDate = new Date().toISOString();
      }

      console.log(`📤 ${method} post:`, postData);

      const response = await fetch(url, {
        method,
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(postData)
      });

      const data = await response.json();
      console.log('📥 Response:', data);

      if (data.success) {
        toast.success(isNew ? 'পোস্ট তৈরি হয়েছে!' : 'পোস্ট আপডেট হয়েছে!');
        setPostDialog(false);
        await fetchPosts(); // Refresh posts list
      } else {
        throw new Error(data.error || 'Unknown error');
      }
    } catch (error) {
      console.error('❌ Save post error:', error);
      toast.error('পোস্ট সেভ করতে ব্যর্থ হয়েছে!');
    } finally {
      setSaving(false);
    }
  };

  // Delete post
  const handleDeletePost = async (postId: string) => {
    if (!confirm('আপনি কি এই পোস্ট মুছে ফেলতে চান?')) return;

    try {
      const response = await fetch(`${API_BASE}/cms/posts/${postId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`,
          'Content-Type': 'application/json'
        }
      });

      const data = await response.json();

      if (data.success) {
        toast.success('পোস্ট মুছে ফেলা হয়েছে!');
        await fetchPosts();
      } else {
        throw new Error(data.error || 'Unknown error');
      }
    } catch (error) {
      console.error('❌ Delete post error:', error);
      toast.error('পোস্ট মুছতে ব্যর্থ হয়েছে!');
    }
  };

  // Move to trash
  const handleTrashPost = async (post: Post) => {
    try {
      const response = await fetch(`${API_BASE}/cms/posts/${post.id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...post,
          status: 'trash',
          modifiedDate: new Date().toISOString()
        })
      });

      const data = await response.json();

      if (data.success) {
        toast.success('পোস্ট ট্র্যাশে সরানো হয়েছে!');
        await fetchPosts();
      }
    } catch (error) {
      console.error('❌ Trash post error:', error);
      toast.error('ট্র্যাশ করতে ব্যর্থ হয়েছে!');
    }
  };

  // Publish post
  const handlePublishPost = async (post: Post) => {
    try {
      const response = await fetch(`${API_BASE}/cms/posts/${post.id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...post,
          status: 'published',
          publishDate: new Date().toISOString(),
          modifiedDate: new Date().toISOString()
        })
      });

      const data = await response.json();

      if (data.success) {
        toast.success('পোস্ট প্রকাশিত হয়েছে!');
        await fetchPosts();
      }
    } catch (error) {
      console.error('❌ Publish post error:', error);
      toast.error('প্রকাশ করতে ব্যর্থ হয়েছে!');
    }
  };

  // Create category
  const handleCreateCategory = async () => {
    if (!newCategoryName.trim()) {
      toast.error('ক্যাটাগরি নাম প্রয়োজন!');
      return;
    }

    try {
      const categoryData = {
        id: `${Date.now()}`,
        name: newCategoryName.trim(),
        slug: newCategoryName.toLowerCase().replace(/\s+/g, '-'),
        description: '',
        count: 0
      };

      const response = await fetch(`${API_BASE}/cms/categories`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(categoryData)
      });

      const data = await response.json();

      if (data.success) {
        toast.success('ক্যাটাগরি তৈরি হয়েছে!');
        setNewCategoryName('');
        await fetchCategories();
      }
    } catch (error) {
      console.error('❌ Create category error:', error);
      toast.error('ক্যাটাগরি তৈরি করতে ব্যর্থ হয়েছে!');
    }
  };

  // Create tag
  const handleCreateTag = async () => {
    if (!newTagName.trim()) {
      toast.error('ট্যাগ নাম প্রয়োজন!');
      return;
    }

    try {
      const tagData = {
        id: `${Date.now()}`,
        name: newTagName.trim(),
        slug: newTagName.toLowerCase().replace(/\s+/g, '-'),
        count: 0
      };

      const response = await fetch(`${API_BASE}/cms/tags`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(tagData)
      });

      const data = await response.json();

      if (data.success) {
        toast.success('ট্যাগ তৈরি হয়েছে!');
        setNewTagName('');
        await fetchTags();
      }
    } catch (error) {
      console.error('❌ Create tag error:', error);
      toast.error('ট্যাগ তৈরি করতে ব্যর্থ হয়েছে!');
    }
  };

  // Toggle category selection
  const toggleCategory = (categoryName: string) => {
    if (!currentPost) return;
    
    const categories = currentPost.categories.includes(categoryName)
      ? currentPost.categories.filter(c => c !== categoryName)
      : [...currentPost.categories, categoryName];
    
    setCurrentPost({
      ...currentPost,
      categories,
      category: categories.length > 0 ? categories[0] : ''
    });
  };

  // Toggle tag selection
  const toggleTag = (tagName: string) => {
    if (!currentPost) return;
    
    const tags = currentPost.tags.includes(tagName)
      ? currentPost.tags.filter(t => t !== tagName)
      : [...currentPost.tags, tagName];
    
    setCurrentPost({
      ...currentPost,
      tags
    });
  };

  // Stats
  const stats = {
    total: posts.length,
    published: posts.filter(p => p.status === 'published').length,
    draft: posts.filter(p => p.status === 'draft').length,
    trash: posts.filter(p => p.status === 'trash').length,
    featured: posts.filter(p => p.featured).length
  };

  // Loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <Loader2 className="w-8 h-8 animate-spin text-purple-600" />
        <span className="ml-3 text-lg text-gray-600">লোড হচ্ছে...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
              <FileText className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-sm text-gray-600">মোট পোস্ট</p>
              <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-sm text-gray-600">প্রকাশিত</p>
              <p className="text-2xl font-bold text-green-600">{stats.published}</p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-yellow-500 rounded-lg flex items-center justify-center">
              <Edit className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-sm text-gray-600">খসড়া</p>
              <p className="text-2xl font-bold text-yellow-600">{stats.draft}</p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center">
              <Star className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-sm text-gray-600">ফিচারড</p>
              <p className="text-2xl font-bold text-purple-600">{stats.featured}</p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-red-500 rounded-lg flex items-center justify-center">
              <Trash2 className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-sm text-gray-600">ট্র্যাশ</p>
              <p className="text-2xl font-bold text-red-600">{stats.trash}</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Toolbar */}
      <Card className="p-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3 flex-1">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="পোস্ট খুঁজুন..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            <Select value={filterStatus} onValueChange={(value: any) => setFilterStatus(value)}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="font-[Noto_Serif_Bengali]">
                <SelectItem value="all">সব</SelectItem>
                <SelectItem value="published">প্রকাশিত</SelectItem>
                <SelectItem value="draft">খসড়া</SelectItem>
                <SelectItem value="trash">ট্র্যাশ</SelectItem>
              </SelectContent>
            </Select>

            <Select value={filterType} onValueChange={(value: any) => setFilterType(value)}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">সব ধরন</SelectItem>
                <SelectItem value="post">পোস্ট</SelectItem>
                <SelectItem value="page">পেজ</SelectItem>
                <SelectItem value="video">ভিডিও</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={handleRefresh}
              disabled={refreshing}
            >
              <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
            </Button>

            <Button onClick={handleNewPost} className="bg-emerald-600 hover:bg-emerald-700">
              <PlusCircle className="w-4 h-4 mr-2" />
              নতুন পোস্ট তৈরি করুন
            </Button>
          </div>
        </div>
      </Card>

      {/* Posts Table */}
      <Card>
        <ScrollArea className="h-[600px]">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">
                  <Checkbox />
                </TableHead>
                <TableHead>শিরোনাম</TableHead>
                <TableHead>ক্যাটাগরি</TableHead>
                <TableHead>ট্যাগ</TableHead>
                <TableHead>স্ট্যাটাস</TableHead>
                <TableHead>তারিখ</TableHead>
                <TableHead>ভিউ</TableHead>
                <TableHead className="text-right">অ্যাকশন</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPosts.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-8 text-gray-500">
                    কোন পোস্ট পাওয়া যায়নি
                  </TableCell>
                </TableRow>
              ) : (
                filteredPosts.map((post) => (
                  <TableRow key={post.id}>
                    <TableCell>
                      <Checkbox />
                    </TableCell>
                    <TableCell>
                      <div className="flex items-start gap-3">
                        {post.featuredImage && (
                          <img 
                            src={post.featuredImage} 
                            alt={post.title}
                            className="w-16 h-16 object-cover rounded"
                          />
                        )}
                        <div>
                          <p className="font-medium text-gray-900">{post.title}</p>
                          <p className="text-sm text-gray-500 line-clamp-1">{post.excerpt}</p>
                          {post.featured && (
                            <Badge className="mt-1 bg-purple-500">
                              <Star className="w-3 h-3 mr-1" />
                              ফিচারড
                            </Badge>
                          )}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{post.category || 'N/A'}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {post.tags.slice(0, 2).map(tag => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                        {post.tags.length > 2 && (
                          <Badge variant="secondary" className="text-xs">
                            +{post.tags.length - 2}
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge 
                        className={
                          post.status === 'published' ? 'bg-green-500' :
                          post.status === 'draft' ? 'bg-yellow-500' :
                          post.status === 'trash' ? 'bg-red-500' :
                          'bg-blue-500'
                        }
                      >
                        {post.status === 'published' ? 'প্রকাশিত' :
                         post.status === 'draft' ? 'খসড়া' :
                         post.status === 'trash' ? 'ট্র্যাশ' :
                         'নির্ধারিত'}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm text-gray-600">
                      {new Date(post.publishDate).toLocaleDateString('bn-BD')}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1 text-sm text-gray-600">
                        <Eye className="w-4 h-4" />
                        {post.views}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleEditPost(post)}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        {post.status === 'draft' && (
                          <Button
                            size="sm"
                            variant="ghost"
                            className="text-green-600"
                            onClick={() => handlePublishPost(post)}
                          >
                            <Send className="w-4 h-4" />
                          </Button>
                        )}
                        {post.status !== 'trash' && (
                          <Button
                            size="sm"
                            variant="ghost"
                            className="text-orange-600"
                            onClick={() => handleTrashPost(post)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        )}
                        {post.status === 'trash' && (
                          <Button
                            size="sm"
                            variant="ghost"
                            className="text-red-600"
                            onClick={() => handleDeletePost(post.id)}
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </ScrollArea>
      </Card>

      {/* Post Dialog - Full Screen */}
      <Dialog open={postDialog} onOpenChange={setPostDialog}>
        <DialogContent className="max-w-[98vw] w-full max-h-[98vh] h-full overflow-y-auto p-8">
          <DialogHeader>
            <DialogTitle>
              {currentPost?.id ? 'পোস্ট সম্পাদনা করুন' : 'নতুন পোস্ট তৈরি করুন'}
            </DialogTitle>
            <DialogDescription>
              সব তথ্য পূরণ করুন এবং সেভ করুন
            </DialogDescription>
          </DialogHeader>

          {currentPost && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Main Content - 2 columns */}
              <div className="lg:col-span-2 space-y-4">
                {/* Title */}
                <div>
                  <Label>পোস্ট শিরোনাম *</Label>
                  <Input
                    value={currentPost.title}
                    onChange={(e) => setCurrentPost({ ...currentPost, title: e.target.value })}
                    placeholder="আপনার পোস্টের শিরোনাম লিখুন"
                    className="text-lg"
                  />
                </div>

                {/* Content Editor */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <Label>পোস্ট কন্টেন্ট *</Label>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant={editorMode === 'visual' ? 'default' : 'outline'}
                        onClick={() => setEditorMode('visual')}
                      >
                        <Layout className="w-4 h-4 mr-1" />
                        Visual
                      </Button>
                      <Button
                        size="sm"
                        variant={editorMode === 'html' ? 'default' : 'outline'}
                        onClick={() => setEditorMode('html')}
                      >
                        <Code className="w-4 h-4 mr-1" />
                        HTML
                      </Button>
                    </div>
                  </div>
                  <Textarea
                    value={currentPost.content}
                    onChange={(e) => setCurrentPost({ ...currentPost, content: e.target.value })}
                    placeholder="আপনার পোস্টের সম্পূর্ণ কন্টেন্ট লিখুন..."
                    rows={15}
                    className="font-mono"
                  />
                </div>

                {/* Excerpt */}
                <div>
                  <Label>সংক্ষিপ্ত বিবরণ (Excerpt)</Label>
                  <Textarea
                    value={currentPost.excerpt}
                    onChange={(e) => setCurrentPost({ ...currentPost, excerpt: e.target.value })}
                    placeholder="পোস্টের সংক্ষিপ্ত বিবরণ (ঐচ্ছিক)"
                    rows={3}
                  />
                </div>

                {/* SEO Settings */}
                <Card className="p-4 bg-blue-50">
                  <h3 className="font-medium mb-3 flex items-center gap-2">
                    <BarChart3 className="w-5 h-5" />
                    SEO সেটিংস
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <Label>SEO শিরোনাম</Label>
                      <Input
                        value={currentPost.seoTitle}
                        onChange={(e) => setCurrentPost({ ...currentPost, seoTitle: e.target.value })}
                        placeholder="SEO-friendly শিরোনাম (ঐচ্ছিক)"
                      />
                    </div>
                    <div>
                      <Label>SEO বিবরণ</Label>
                      <Textarea
                        value={currentPost.seoDescription}
                        onChange={(e) => setCurrentPost({ ...currentPost, seoDescription: e.target.value })}
                        placeholder="SEO meta description (ঐচ্ছিক)"
                        rows={2}
                      />
                    </div>
                    <div>
                      <Label>SEO Keywords</Label>
                      <Input
                        value={currentPost.seoKeywords}
                        onChange={(e) => setCurrentPost({ ...currentPost, seoKeywords: e.target.value })}
                        placeholder="keyword1, keyword2, keyword3"
                      />
                    </div>
                  </div>
                </Card>
              </div>

              {/* Sidebar - 1 column */}
              <div className="space-y-4">
                {/* Status & Publish */}
                <Card className="p-4">
                  <h3 className="font-medium mb-3">প্রকাশনা</h3>
                  <div className="space-y-3">
                    <div>
                      <Label>স্ট্যাটাস</Label>
                      <Select 
                        value={currentPost.status} 
                        onValueChange={(value: any) => setCurrentPost({ ...currentPost, status: value })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="draft">খসড়া</SelectItem>
                          <SelectItem value="published">প্রকাশিত</SelectItem>
                          <SelectItem value="scheduled">নির্ধারিত</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label>পোস্ট টাইপ</Label>
                      <Select 
                        value={currentPost.type} 
                        onValueChange={(value: any) => setCurrentPost({ ...currentPost, type: value })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="post">পোস্ট</SelectItem>
                          <SelectItem value="page">পেজ</SelectItem>
                          <SelectItem value="video">ভিডিও</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="flex items-center gap-2">
                      <Checkbox
                        checked={currentPost.featured}
                        onCheckedChange={(checked) => setCurrentPost({ ...currentPost, featured: !!checked })}
                      />
                      <Label className="flex items-center gap-2">
                        <Star className="w-4 h-4 text-yellow-500" />
                        ফিচারড পোস্ট
                      </Label>
                    </div>

                    <div className="flex items-center gap-2">
                      <Checkbox
                        checked={currentPost.allowComments}
                        onCheckedChange={(checked) => setCurrentPost({ ...currentPost, allowComments: !!checked })}
                      />
                      <Label>কমেন্ট অনুমতি দিন</Label>
                    </div>
                  </div>
                </Card>

                {/* Featured Image */}
                <Card className="p-4">
                  <h3 className="font-medium mb-3 flex items-center gap-2">
                    <ImageIcon className="w-5 h-5" />
                    ফিচারড ইমেজ
                  </h3>
                  <div className="space-y-3">
                    <Input
                      value={currentPost.featuredImage}
                      onChange={(e) => setCurrentPost({ ...currentPost, featuredImage: e.target.value })}
                      placeholder="Image URL"
                    />
                    {currentPost.featuredImage && (
                      <img 
                        src={currentPost.featuredImage} 
                        alt="Preview"
                        className="w-full h-40 object-cover rounded"
                      />
                    )}
                  </div>
                </Card>

                {/* Categories */}
                <Card className="p-4">
                  <h3 className="font-medium mb-3 flex items-center gap-2">
                    <FolderOpen className="w-5 h-5" />
                    ক্যাটাগরি
                  </h3>
                  <ScrollArea className="h-32 mb-3">
                    <div className="space-y-2">
                      {categories.length === 0 ? (
                        <p className="text-sm text-gray-500">কোন ক্যাটাগরি নেই</p>
                      ) : (
                        categories.map(cat => (
                          <div key={cat.id} className="flex items-center gap-2">
                            <Checkbox
                              checked={currentPost.categories.includes(cat.name)}
                              onCheckedChange={() => toggleCategory(cat.name)}
                            />
                            <Label className="text-sm">{cat.name}</Label>
                          </div>
                        ))
                      )}
                    </div>
                  </ScrollArea>
                  <div className="flex gap-2">
                    <Input
                      placeholder="নতুন ক্যাটাগরি"
                      value={newCategoryName}
                      onChange={(e) => setNewCategoryName(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleCreateCategory()}
                    />
                    <Button size="sm" onClick={handleCreateCategory}>
                      <PlusCircle className="w-4 h-4" />
                    </Button>
                  </div>
                </Card>

                {/* Tags */}
                <Card className="p-4">
                  <h3 className="font-medium mb-3 flex items-center gap-2">
                    <TagIcon className="w-5 h-5" />
                    ট্যাগ
                  </h3>
                  <ScrollArea className="h-32 mb-3">
                    <div className="space-y-2">
                      {tags.length === 0 ? (
                        <p className="text-sm text-gray-500">কোন ট্যাগ নেই</p>
                      ) : (
                        tags.map(tag => (
                          <div key={tag.id} className="flex items-center gap-2">
                            <Checkbox
                              checked={currentPost.tags.includes(tag.name)}
                              onCheckedChange={() => toggleTag(tag.name)}
                            />
                            <Label className="text-sm">{tag.name}</Label>
                          </div>
                        ))
                      )}
                    </div>
                  </ScrollArea>
                  <div className="flex gap-2">
                    <Input
                      placeholder="নতুন ট্যাগ"
                      value={newTagName}
                      onChange={(e) => setNewTagName(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleCreateTag()}
                    />
                    <Button size="sm" onClick={handleCreateTag}>
                      <PlusCircle className="w-4 h-4" />
                    </Button>
                  </div>
                </Card>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setPostDialog(false)}>
              বাতিল
            </Button>
            <Button onClick={handleSavePost} disabled={saving} className="bg-emerald-600 hover:bg-emerald-700">
              {saving ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  সেভ হচ্ছে...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  সেভ করুন
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
