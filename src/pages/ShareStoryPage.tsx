import { useState } from 'react';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { ArrowLeft, Heart, Upload, Send, CheckCircle } from 'lucide-react';
import { motion } from 'motion/react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';

interface ShareStoryPageProps {
  language: 'bn' | 'en';
  setLanguage: (lang: 'bn' | 'en') => void;
  setPage: (page: string) => void;
  announcement?: { title: string; message: string; type: string } | null;
  onLogin?: (type: 'teacher' | 'guardian' | 'student' | 'admin' | 'donor', userData?: any) => void;
}

const content = {
  bn: {
    title: 'আপনার গল্প শেয়ার করুন',
    subtitle: 'আপনার সাফল্য বা অভিজ্ঞতার গল্প অন্যদের সাথে শেয়ার করুন',
    backToBlog: 'ব্লগে ফিরুন',
    storyTitle: 'গল্পের শিরোনাম',
    category: 'ক্যাটাগরি',
    selectCategory: 'ক্যাটাগরি নির্বাচন করুন',
    successStory: 'সাফল্যের গল্প',
    donorExperience: 'দাতার অভিজ্ঞতা',
    educationTips: 'শিক্ষা টিপস',
    yourName: 'আপনার নাম',
    yourEmail: 'আপনার ইমেইল',
    yourStory: 'আপনার গল্প',
    shortDescription: 'সংক্ষিপ্ত বর্ণনা',
    detailedStory: 'বিস্তারিত গল্প',
    uploadImage: 'ছবি আপলোড করুন (ঐচ্ছিক)',
    clickToUpload: 'ক্লিক করে ছবি আপলোড করুন',
    achievement: 'অর্জন/প্রভাব (ঐচ্ছিক)',
    submitStory: 'গল্প জমা দিন',
    successMessage: 'আপনার গল্প সফলভাবে জমা হয়েছে!',
    pendingApproval: 'এটি এডমিন অনুমোদনের পর ব্লগে প্রদর্শিত হবে।',
    guidelines: 'নির্দেশনা',
    guideline1: '• সত্য এবং সঠিক তথ্য প্রদান করুন',
    guideline2: '• অশ্লীল বা অপমানজনক ভাষা ব্যবহার করবেন না',
    guideline3: '• আপনার গল্পটি স্পষ্ট এবং বোধগম্য করে লিখুন',
    guideline4: '• অন্যদের অনুপ্রাণিত করতে পারে এমন বিষয় শেয়ার করুন',
  },
  en: {
    title: 'Share Your Story',
    subtitle: 'Share your success story or experience with others',
    backToBlog: 'Back to Blog',
    storyTitle: 'Story Title',
    category: 'Category',
    selectCategory: 'Select Category',
    successStory: 'Success Story',
    donorExperience: 'Donor Experience',
    educationTips: 'Education Tips',
    yourName: 'Your Name',
    yourEmail: 'Your Email',
    yourStory: 'Your Story',
    shortDescription: 'Short Description',
    detailedStory: 'Detailed Story',
    uploadImage: 'Upload Image (Optional)',
    clickToUpload: 'Click to upload image',
    achievement: 'Achievement/Impact (Optional)',
    submitStory: 'Submit Story',
    successMessage: 'Your story has been submitted successfully!',
    pendingApproval: 'It will appear on the blog after admin approval.',
    guidelines: 'Guidelines',
    guideline1: '• Provide true and accurate information',
    guideline2: '• Do not use offensive or abusive language',
    guideline3: '• Write your story clearly and comprehensibly',
    guideline4: '• Share content that can inspire others',
  },
};

export function ShareStoryPage({ language, setLanguage, setPage, announcement, onLogin }: ShareStoryPageProps) {
  const t = content[language];
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    name: '',
    email: '',
    excerpt: '',
    content: '',
    achievement: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would normally send the data to the admin dashboard
    setSubmitted(true);
    setTimeout(() => {
      setPage('blog');
    }, 3000);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center">
        <Header language={language} setLanguage={setLanguage} setPage={setPage} announcement={announcement} onLogin={onLogin} />
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center"
        >
          <Card className="p-12 max-w-md mx-4">
            <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-12 h-12 text-white" />
            </div>
            <h2 className="text-2xl text-gray-900 mb-3">{t.successMessage}</h2>
            <p className="text-gray-600 mb-6">{t.pendingApproval}</p>
            <Button
              onClick={() => setPage('blog')}
              className="bg-gradient-to-r from-emerald-600 to-teal-600"
            >
              {t.backToBlog}
            </Button>
          </Card>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <Header language={language} setLanguage={setLanguage} setPage={setPage} announcement={announcement} onLogin={onLogin} />

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Heart className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl text-gray-900 mb-3">{t.title}</h1>
            <p className="text-xl text-gray-600">{t.subtitle}</p>
          </motion.div>

          {/* Guidelines */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="p-6 mb-8 bg-gradient-to-r from-blue-50 to-cyan-50">
              <h3 className="text-lg text-gray-900 mb-3">{t.guidelines}</h3>
              <div className="space-y-2 text-gray-700">
                <p>{t.guideline1}</p>
                <p>{t.guideline2}</p>
                <p>{t.guideline3}</p>
                <p>{t.guideline4}</p>
              </div>
            </Card>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Title */}
                <div>
                  <Label>{t.storyTitle} *</Label>
                  <Input
                    placeholder="উদাহরণ: আমার জীবন পরিবর্তনের গল্প"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                  />
                </div>

                {/* Category */}
                <div>
                  <Label>{t.category} *</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) => setFormData({ ...formData, category: value })}
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder={t.selectCategory} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="success">{t.successStory}</SelectItem>
                      <SelectItem value="donor">{t.donorExperience}</SelectItem>
                      <SelectItem value="education">{t.educationTips}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Name and Email */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label>{t.yourName} *</Label>
                    <Input
                      placeholder="আপনার পু���ো নাম"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <Label>{t.yourEmail} *</Label>
                    <Input
                      type="email"
                      placeholder="example@email.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                    />
                  </div>
                </div>

                {/* Short Description */}
                <div>
                  <Label>{t.shortDescription} *</Label>
                  <Textarea
                    placeholder="সংক্ষেপে আপনার গল্পের মূল বিষয়বস্তু লিখুন (১৫০-২০০ শব্দ)"
                    rows={3}
                    value={formData.excerpt}
                    onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                    required
                  />
                </div>

                {/* Detailed Story */}
                <div>
                  <Label>{t.detailedStory} *</Label>
                  <Textarea
                    placeholder="বিস্তারিত গল্প লিখুন..."
                    rows={10}
                    value={formData.content}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    required
                  />
                </div>

                {/* Achievement */}
                <div>
                  <Label>{t.achievement}</Label>
                  <Input
                    placeholder="উদাহরণ: ক্লাসে প্রথম স্থান, CGPA 5.00"
                    value={formData.achievement}
                    onChange={(e) => setFormData({ ...formData, achievement: e.target.value })}
                  />
                </div>

                {/* Image Upload */}
                <div>
                  <Label>{t.uploadImage}</Label>
                  <div className="border-2 border-dashed rounded-lg p-8 text-center hover:bg-gray-50 cursor-pointer transition-colors">
                    <Upload className="w-12 h-12 mx-auto text-gray-400 mb-2" />
                    <p className="text-gray-600 text-sm">{t.clickToUpload}</p>
                    <p className="text-gray-500 text-xs mt-1">JPG, PNG বা GIF (সর্বোচ্চ 5MB)</p>
                  </div>
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700"
                  size="lg"
                >
                  <Send className="w-5 h-5 mr-2" />
                  {t.submitStory}
                </Button>

                <p className="text-sm text-gray-500 text-center">
                  * চিহ্নিত ফিল্ডগুলো বাধ্যতামূলক
                </p>
              </form>
            </Card>
          </motion.div>
        </div>
      </div>

      <Footer language={language} setPage={setPage} />
    </div>
  );
}
