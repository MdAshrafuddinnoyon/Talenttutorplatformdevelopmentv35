import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { 
  Heart, 
  MapPin, 
  DollarSign, 
  BookOpen, 
  Calendar,
  Trash2,
  ExternalLink,
  Filter,
  Search
} from 'lucide-react';
import { getTuitionPostById } from '../utils/tuitionData';
import { toast } from 'sonner@2.0.3';
import { Input } from './ui/input';

interface TeacherSavedJobsProps {
  language: 'bn' | 'en';
  currentUser: any;
  onViewJob: (jobId: string) => void;
}

export function TeacherSavedJobs({ language, currentUser, onViewJob }: TeacherSavedJobsProps) {
  const [savedJobs, setSavedJobs] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'recent' | 'urgent'>('all');

  const t = {
    bn: {
      title: 'সংরক্ষিত টিউশন',
      noSavedJobs: 'কোন সংরক্ষিত টিউশন নেই',
      noSavedJobsDesc: 'আপনি যে টিউশনগুলো সংরক্ষণ করবেন সেগুলো এখানে দেখাবে',
      remove: 'মুছে ফেলুন',
      view: 'বিস্তারিত দেখুন',
      apply: 'আবেদন করুন',
      perMonth: '/মাস',
      savedOn: 'সংরক্ষণ করা হয়েছে',
      search: 'খুঁজুন...',
      all: 'সব',
      recent: 'সাম্প্রতিক',
      urgent: 'জরুরি',
    },
    en: {
      title: 'Saved Tuitions',
      noSavedJobs: 'No saved tuitions',
      noSavedJobsDesc: 'Tuitions you save will appear here',
      remove: 'Remove',
      view: 'View Details',
      apply: 'Apply Now',
      perMonth: '/month',
      savedOn: 'Saved on',
      search: 'Search...',
      all: 'All',
      recent: 'Recent',
      urgent: 'Urgent',
    },
  };

  const content = t[language];

  useEffect(() => {
    loadSavedJobs();
  }, [currentUser]);

  const loadSavedJobs = () => {
    if (!currentUser) return;

    const savedJobsKey = `saved_jobs_${currentUser.id}`;
    const savedJobIds = JSON.parse(localStorage.getItem(savedJobsKey) || '[]');

    const jobs = savedJobIds
      .map((jobId: string) => {
        const post = getTuitionPostById(jobId);
        if (post) {
          return {
            id: post.id,
            title: post.title,
            location: post.location,
            salary: `${post.budget.min}-${post.budget.max}`,
            subjects: post.subjects,
            studentClass: post.studentClass,
            guardianName: post.parent.name,
            guardianAvatar: post.parent.avatar,
            postedDate: post.postedDate,
            urgent: post.urgent,
            featured: post.featured,
          };
        }
        return null;
      })
      .filter((job: any) => job !== null);

    setSavedJobs(jobs);
  };

  const handleRemove = (jobId: string) => {
    const savedJobsKey = `saved_jobs_${currentUser.id}`;
    const savedJobIds = JSON.parse(localStorage.getItem(savedJobsKey) || '[]');
    const filtered = savedJobIds.filter((id: string) => id !== jobId);
    localStorage.setItem(savedJobsKey, JSON.stringify(filtered));
    
    loadSavedJobs();
    toast.success(language === 'bn' ? 'সংরক্ষিত তালিকা থেকে মুছে ফেলা হয়েছে' : 'Removed from saved jobs');
  };

  const handleViewJob = (jobId: string) => {
    localStorage.setItem('selectedJobId', jobId);
    onViewJob(jobId);
  };

  const filteredJobs = savedJobs.filter((job) => {
    // Search filter
    if (searchQuery) {
      const searchLower = searchQuery.toLowerCase();
      const matchesSearch = 
        job.title.toLowerCase().includes(searchLower) ||
        job.location.toLowerCase().includes(searchLower) ||
        job.subjects.some((s: string) => s.toLowerCase().includes(searchLower));
      
      if (!matchesSearch) return false;
    }

    // Type filter
    if (filterType === 'urgent') {
      return job.urgent;
    } else if (filterType === 'recent') {
      const daysSince = Math.floor(
        (new Date().getTime() - new Date(job.postedDate).getTime()) / (1000 * 60 * 60 * 24)
      );
      return daysSince <= 7;
    }

    return true;
  });

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-red-500 fill-red-500" />
            {content.title}
            <Badge variant="secondary">{savedJobs.length}</Badge>
          </CardTitle>
        </div>

        {savedJobs.length > 0 && (
          <div className="flex flex-col sm:flex-row gap-3 mt-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <Input
                placeholder={content.search}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>

            {/* Filter */}
            <div className="flex gap-2">
              <Button
                size="sm"
                variant={filterType === 'all' ? 'default' : 'outline'}
                onClick={() => setFilterType('all')}
              >
                {content.all}
              </Button>
              <Button
                size="sm"
                variant={filterType === 'recent' ? 'default' : 'outline'}
                onClick={() => setFilterType('recent')}
              >
                {content.recent}
              </Button>
              <Button
                size="sm"
                variant={filterType === 'urgent' ? 'default' : 'outline'}
                onClick={() => setFilterType('urgent')}
              >
                {content.urgent}
              </Button>
            </div>
          </div>
        )}
      </CardHeader>

      <CardContent>
        {filteredJobs.length === 0 ? (
          <div className="text-center py-12">
            <Heart className="w-16 h-16 mx-auto mb-4 text-gray-300" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {content.noSavedJobs}
            </h3>
            <p className="text-gray-600">{content.noSavedJobsDesc}</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredJobs.map((job) => (
              <Card key={job.id} className="border-2 hover:border-blue-300 transition-colors">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 space-y-3">
                      {/* Title and Badges */}
                      <div>
                        <div className="flex items-start gap-2 mb-2">
                          <h3 className="text-lg font-semibold text-gray-900">
                            {job.title}
                          </h3>
                          {job.urgent && (
                            <Badge className="bg-red-100 text-red-700 border-red-300">
                              জরুরি
                            </Badge>
                          )}
                          {job.featured && (
                            <Badge className="bg-yellow-100 text-yellow-700 border-yellow-300">
                              ফিচারড
                            </Badge>
                          )}
                        </div>
                      </div>

                      {/* Info Grid */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                        <div className="flex items-center gap-2 text-gray-700">
                          <MapPin className="w-4 h-4 text-blue-600" />
                          <span>{job.location}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-700">
                          <DollarSign className="w-4 h-4 text-green-600" />
                          <span className="font-semibold">৳{job.salary}{content.perMonth}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-700">
                          <BookOpen className="w-4 h-4 text-purple-600" />
                          <span>{job.subjects.join(', ')}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-700">
                          <Calendar className="w-4 h-4 text-orange-600" />
                          <span>{job.studentClass}</span>
                        </div>
                      </div>

                      {/* Guardian Info */}
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <span>অভিভাবক:</span>
                        <span className="font-medium">{job.guardianName}</span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col gap-2">
                      <Button
                        size="sm"
                        variant="default"
                        onClick={() => handleViewJob(job.id)}
                        className="gap-2"
                      >
                        <ExternalLink className="w-4 h-4" />
                        {content.view}
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleRemove(job.id)}
                        className="gap-2 text-red-600 hover:bg-red-50 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                        {content.remove}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
