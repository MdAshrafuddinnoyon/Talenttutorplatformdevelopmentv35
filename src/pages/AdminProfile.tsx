import { useState } from 'react';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Badge } from '../components/ui/badge';
import { ProfilePageAvatar } from '../components/ui/profile-avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import {
  ArrowLeft,
  Edit,
  Save,
  Phone,
  Mail,
  Shield,
  Upload,
  CheckCircle,
  Settings,
  Key,
  Bell,
  Lock,
  User,
  Calendar,
  Activity,
} from 'lucide-react';

interface AdminProfileProps {
  language: 'bn' | 'en';
  setPage: (page: string) => void;
}

export function AdminProfile({ language, setPage }: AdminProfileProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: 'Admin User',
    email: 'admin@talenttutor.com',
    phone: '+৮৮০ ১৭০০-০০০০০০',
    role: 'Super Admin',
    joinedDate: '০১/০১/২০২৪',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80',
  });

  const adminActivities = [
    { id: 1, action: 'শিক্ষক যাচাই করেছেন', user: 'মোঃ করিম উদ্দিন', time: '৫ মিনিট আগে' },
    { id: 2, action: 'ঘোষণা পাঠিয়েছেন', recipient: 'সকল ইউজার', time: '১ ঘন্টা আগে' },
    { id: 3, action: 'ব্লগ পোস্ট করেছেন', title: 'নতুন ফিচার', time: '৩ ঘন্টা আগে' },
    { id: 4, action: 'পেমেন্ট যাচাই করেছেন', amount: '৳ ১,৫০০', time: '৫ ঘন্টা আগে' },
  ];

  const permissions = [
    { name: 'ইউজার ম্যানেজমেন্ট', enabled: true },
    { name: 'পেমেন্ট যাচাই', enabled: true },
    { name: 'শিক্ষক যাচাইকরণ', enabled: true },
    { name: 'দান ম্যানেজমেন্ট', enabled: true },
    { name: 'ঘোষণা পাঠানো', enabled: true },
    { name: 'ব্লগ পোস্ট', enabled: true },
    { name: 'রিপোর্ট দেখা', enabled: true },
    { name: 'সিস্টেম সেটিংস', enabled: true },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-gradient-to-r from-[#10B981] to-[#059669] text-white border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Button variant="ghost" className="text-white hover:bg-white/20" onClick={() => setPage('admin-dashboard')}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              ড্যাশবোর্ডে ফিরুন
            </Button>
            <div className="flex items-center gap-2">
              {isEditing ? (
                <Button onClick={() => setIsEditing(false)} className="bg-white text-[#059669] hover:bg-gray-100">
                  <Save className="w-4 h-4 mr-2" />
                  পরিবর্তন সংরক্ষণ
                </Button>
              ) : (
                <Button onClick={() => setIsEditing(true)} variant="outline" className="text-white border-white hover:bg-white hover:text-[#059669]">
                  <Edit className="w-4 h-4 mr-2" />
                  প্রোফাইল এডিট
                </Button>
              )}
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <Card className="p-6">
              <div className="text-center">
                <div className="mb-4">
                  <ProfilePageAvatar 
                    src={profile.avatar}
                    alt={profile.name}
                    fallback="AD"
                    editable={isEditing}
                    onEditClick={() => {/* Handle image upload */}}
                    className="ring-teal-200"
                  />
                </div>
                <h2 className="text-2xl text-gray-900 mb-1">{profile.name}</h2>
                <Badge className="bg-[#10B981] mb-4">
                  <Shield className="w-3 h-3 mr-1" />
                  {profile.role}
                </Badge>
                <div className="flex items-center justify-center gap-2 text-gray-600 text-sm">
                  <Calendar className="w-4 h-4" />
                  যোগদান: {profile.joinedDate}
                </div>
              </div>

              {/* Quick Stats */}
              <div className="space-y-3 mt-6">
                <div className="p-3 bg-green-50 rounded-lg">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">মোট ইউজার</span>
                    <span className="text-xl text-blue-700">১,২৫০</span>
                  </div>
                </div>
                <div className="p-3 bg-green-50 rounded-lg">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">যাচাই বাকি</span>
                    <span className="text-xl text-green-700">১৫</span>
                  </div>
                </div>
                <div className="p-3 bg-teal-50 rounded-lg">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">মোট আয়</span>
                    <span className="text-xl text-teal-700">৳ ৫.৮L</span>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-gray-900 mb-4 flex items-center gap-2">
                <Key className="w-5 h-5" />
                অনুমতিসমূহ
              </h3>
              <div className="space-y-2">
                {permissions.map((permission, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">{permission.name}</span>
                    <CheckCircle className={`w-4 h-4 ${permission.enabled ? 'text-green-600' : 'text-gray-300'}`} />
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="personal">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="personal">ব্যক্তিগত</TabsTrigger>
                <TabsTrigger value="activity">কার্যক্রম</TabsTrigger>
                <TabsTrigger value="security">নিরাপত্তা</TabsTrigger>
              </TabsList>

              <TabsContent value="personal" className="space-y-6 mt-6">
                <Card className="p-6">
                  <h3 className="text-xl text-gray-900 mb-4">প্রোফাইল তথ্য</h3>
                  <div className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label>পূর্ণ নাম</Label>
                        <Input value={profile.name} disabled={!isEditing} />
                      </div>
                      <div>
                        <Label>ভূমিকা</Label>
                        <Input value={profile.role} disabled />
                      </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label>ইমেইল</Label>
                        <Input value={profile.email} disabled={!isEditing} />
                      </div>
                      <div>
                        <Label>ফোন</Label>
                        <Input value={profile.phone} disabled={!isEditing} />
                      </div>
                    </div>
                  </div>
                </Card>

                <Card className="p-6">
                  <h3 className="text-xl text-gray-900 mb-4">যোগাযোগ তথ্য</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <Mail className="w-5 h-5 text-gray-600" />
                      <div>
                        <p className="text-sm text-gray-600">ইমেইল</p>
                        <p className="text-gray-900">{profile.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <Phone className="w-5 h-5 text-gray-600" />
                      <div>
                        <p className="text-sm text-gray-600">ফোন</p>
                        <p className="text-gray-900">{profile.phone}</p>
                      </div>
                    </div>
                  </div>
                </Card>

                <Card className="p-6">
                  <h3 className="text-xl text-gray-900 mb-4">নোটিফিকেশন সেটিংস</h3>
                  <div className="space-y-3">
                    {[
                      'নতুন ইউজার রেজিস্ট্রেশন',
                      'পেমেন্ট নোটিফিকেশন',
                      'যাচাইকরণ অনুরোধ',
                      'সিস্টেম আপডেট',
                      'রিপোর্ট জেনারেশন',
                    ].map((notification, i) => (
                      <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <Bell className="w-4 h-4 text-gray-600" />
                          <span className="text-gray-900">{notification}</span>
                        </div>
                        <input type="checkbox" defaultChecked className="w-5 h-5" />
                      </div>
                    ))}
                  </div>
                </Card>
              </TabsContent>

              <TabsContent value="activity" className="space-y-6 mt-6">
                <Card className="p-6">
                  <h3 className="text-xl text-gray-900 mb-4 flex items-center gap-2">
                    <Activity className="w-5 h-5" />
                    সাম্প্রতিক কার্যক্রম
                  </h3>
                  <div className="space-y-4">
                    {adminActivities.map((activity) => (
                      <div key={activity.id} className="flex items-start gap-4 p-4 border rounded-lg">
                        <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <CheckCircle className="w-5 h-5 text-[#10B981]" />
                        </div>
                        <div className="flex-1">
                          <p className="text-gray-900 mb-1">{activity.action}</p>
                          <p className="text-sm text-gray-600">
                            {activity.user || activity.recipient || activity.title || activity.amount}
                          </p>
                          <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>

                <Card className="p-6 bg-gradient-to-r from-green-50 to-emerald-50">
                  <h3>আজকের পরিসংখ্যান</h3>
                  <div className="grid md:grid-cols-4 gap-4">
                    <div className="text-center p-4 bg-white rounded-lg">
                      <div className="text-2xl text-blue-700 mb-1">২৫</div>
                      <p className="text-xs text-gray-600">নতুন ইউজার</p>
                    </div>
                    <div className="text-center p-4 bg-white rounded-lg">
                      <div className="text-2xl text-green-700 mb-1">৮</div>
                      <p className="text-xs text-gray-600">যাচাইকৃত</p>
                    </div>
                    <div className="text-center p-4 bg-white rounded-lg">
                      <div className="text-2xl text-teal-700 mb-1">৳ ৪৫K</div>
                      <p className="text-xs text-gray-600 font-[Noto_Serif_Bengali]">আয়</p>
                    </div>
                    <div className="text-center p-4 bg-white rounded-lg">
                      <div className="text-2xl text-rose-700 mb-1">৳ ১২K</div>
                      <p className="text-xs text-gray-600 font-[Noto_Serif_Bengali]">দান</p>
                    </div>
                  </div>
                </Card>
              </TabsContent>

              <TabsContent value="security" className="space-y-6 mt-6">
                <Card className="p-6">
                  <h3 className="text-xl text-gray-900 mb-4 flex items-center gap-2">
                    <Lock className="w-5 h-5" />
                    পাসওয়ার্ড পরিবর্তন
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <Label>বর্তমান পাসওয়ার্ড</Label>
                      <Input type="password" placeholder="••••••••" />
                    </div>
                    <div>
                      <Label>নতুন পাসওয়ার্ড</Label>
                      <Input type="password" placeholder="••••••••" />
                    </div>
                    <div>
                      <Label>পাসওয়ার্ড নিশ্চিত করুন</Label>
                      <Input type="password" placeholder="••••••••" />
                    </div>
                    <Button className="btn-primary">পাসওয়ার্ড আপডেট করুন</Button>
                  </div>
                </Card>

                <Card className="p-6">
                  <h3 className="text-xl text-gray-900 mb-4">লগইন হিস্টরি</h3>
                  <div className="space-y-3">
                    {[
                      { device: 'Chrome on Windows', location: 'ঢাকা, বাংলাদেশ', time: 'এখন' },
                      { device: 'Safari on iPhone', location: 'ঢাকা, বাংলাদেশ', time: '২ ঘন্টা আগে' },
                      { device: 'Firefox on Mac', location: 'চট্টগ্রাম, বাংলাদেশ', time: '১ দিন আগে' },
                    ].map((login, i) => (
                      <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <p className="text-gray-900">{login.device}</p>
                          <p className="text-sm text-gray-600">{login.location}</p>
                        </div>
                        <span className="text-sm text-gray-500">{login.time}</span>
                      </div>
                    ))}
                  </div>
                </Card>

                <Card className="p-6 bg-red-50 border-red-200">
                  <h3 className="text-xl text-red-900 mb-4">বিপজ্জনক জোন</h3>
                  <p className="text-red-700 mb-4">
                    এই অ্যাকশনগুলো সতর্কতার সাথে ব্যবহার করুন। এগুলো অপরিবর্তনীয় হতে পারে।
                  </p>
                  <div className="space-y-2">
                    <Button variant="outline" className="w-full text-red-600 border-red-300 hover:bg-red-100">
                      সব সেশন লগআউট করুন
                    </Button>
                    <Button variant="outline" className="w-full text-red-600 border-red-300 hover:bg-red-100">
                      টু-ফ্যাক্টর অথেন্টিকেশন সক্রিয় করুন
                    </Button>
                  </div>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}
