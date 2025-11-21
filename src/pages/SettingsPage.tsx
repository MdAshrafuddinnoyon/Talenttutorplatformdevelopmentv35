import { useState } from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { LanguageSwitcher } from '../components/LanguageSwitcher';
import { 
  Settings as SettingsIcon, 
  User, 
  Bell, 
  Lock, 
  CreditCard, 
  Globe, 
  Eye,
  Smartphone,
  Mail,
  Shield,
  Trash2,
  Download,
  Moon,
  Sun,
  Save,
  AlertCircle
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Card } from '../components/ui/card';
import { Switch } from '../components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from '../components/ui/dialog';
import { Separator } from '../components/ui/separator';
import { toast } from 'sonner@2.0.3';
import { motion } from 'motion/react';
import { settingsTranslations } from '../utils/translations';

interface SettingsPageProps {
  language: 'bn' | 'en';
  setLanguage: (lang: 'bn' | 'en') => void;
  setPage: (page: string) => void;
  onLogin?: (type: 'teacher' | 'guardian' | 'student' | 'admin' | 'donor', userData?: any) => void;
}

const content = {
  bn: {
    settings: 'সেটিংস',
    account: 'একাউন্ট',
    notifications: 'বিজ্ঞপ্তি',
    privacy: 'গোপনীয়তা',
    security: 'নিরাপত্তা',
    preferences: 'পছন্দসমূহ',
    
    // Account
    accountSettings: 'একাউন্ট সেটিংস',
    fullName: 'পূর্ণ নাম',
    email: 'ইমেইল',
    phone: 'ফোন',
    bio: 'বায়ো',
    profilePicture: 'প্রোফাইল ছবি',
    changePhoto: 'ছবি পরিবর্তন করুন',
    
    // Notifications
    notificationSettings: 'বিজ্ঞপ্তি সেটিংস',
    emailNotifications: 'ইমেইল বিজ্ঞপ্তি',
    pushNotifications: 'পুশ বিজ্ঞপ্তি',
    smsNotifications: 'এসএমএস বিজ্ঞপ্তি',
    jobAlerts: 'জব সতর্কতা',
    messageAlerts: 'বার্তা সতর্কতা',
    paymentAlerts: 'পেমেন্ট সতর্কতা',
    weeklyReport: 'সাপ্তাহিক রিপোর্ট',
    
    // Privacy
    privacySettings: 'গোপনীয়তা সেটিংস',
    profileVisibility: 'প্রোফাইল দৃশ্যমানতা',
    public: 'সর্বজনীন',
    private: 'ব্যক্তিগত',
    registered: 'নিবন্ধিত ইউজার',
    showEmail: 'ইমেইল দেখান',
    showPhone: 'ফোন দেখান',
    showLocation: 'অবস্থান দেখান',
    
    // Security
    securitySettings: 'নিরাপত্তা সেটিংস',
    changePassword: 'পাসওয়ার্ড পরিবর্তন',
    currentPassword: 'বর্তমান পাসওয়ার্ড',
    newPassword: 'নতুন পাসওয়ার্ড',
    confirmPassword: 'পাসওয়ার্ড নিশ্চিত করুন',
    twoFactorAuth: 'টু-ফ্যাক্টর প্রমাণীকরণ',
    enableTwoFactor: 'টু-ফ্যাক্টর সক্রিয় করুন',
    
    // Preferences
    preferencesSettings: 'পছন্দ সেটিংস',
    languagePreference: 'ভাষা',
    bengali: 'বাংলা',
    english: 'English',
    theme: 'থিম',
    light: 'লাইট',
    dark: 'ডার্ক',
    timezone: 'টাইমজোন',
    
    // Actions
    save: 'সংরক্ষণ করুন',
    cancel: 'বাতিল',
    update: 'আপডেট করুন',
    delete: 'ডিলিট',
    export: 'এক্সপোর্ট',
    
    // Data & Account
    dataAndAccount: 'ডেটা ও একাউন্ট',
    exportData: 'ডেটা এক্সপোর্ট করুন',
    exportDataDesc: 'আপনার সব ডেটা ডাউনলোড করুন',
    deleteAccount: 'একাউন্ট মুছুন',
    deleteAccountDesc: 'স্থায়ীভাবে একাউন্ট মুছে ফেলুন',
    deleteAccountConfirm: 'আপনি কি নিশ্চিত?',
    deleteAccountWarning: 'এই কাজটি পূর্বাবস্থায় ফেরানো যাবে না। আপনার সব ডেটা স্থায়ীভাবে মুছে যাবে।',
    
    // Messages
    settingsSaved: 'সেটিংস সংরক্ষিত হয়েছে!',
    passwordChanged: 'পাসওয়ার্ড সফলভাবে পরিবর্তন হয়েছে!',
    passwordMismatch: 'নতুন পাসওয়ার্ড মিলছে না!',
    accountDeleted: 'একাউন্ট মুছে ফেলা হয়েছে। আপনাকে মিস করব!',
    dataExported: 'আপনার ডেটা ডাউনলোড শুরু হয়েছে!',
  },
  en: {
    settings: 'Settings',
    account: 'Account',
    notifications: 'Notifications',
    privacy: 'Privacy',
    security: 'Security',
    preferences: 'Preferences',
    
    // Account
    accountSettings: 'Account Settings',
    fullName: 'Full Name',
    email: 'Email',
    phone: 'Phone',
    bio: 'Bio',
    profilePicture: 'Profile Picture',
    changePhoto: 'Change Photo',
    
    // Notifications
    notificationSettings: 'Notification Settings',
    emailNotifications: 'Email Notifications',
    pushNotifications: 'Push Notifications',
    smsNotifications: 'SMS Notifications',
    jobAlerts: 'Job Alerts',
    messageAlerts: 'Message Alerts',
    paymentAlerts: 'Payment Alerts',
    weeklyReport: 'Weekly Report',
    
    // Privacy
    privacySettings: 'Privacy Settings',
    profileVisibility: 'Profile Visibility',
    public: 'Public',
    private: 'Private',
    registered: 'Registered Users',
    showEmail: 'Show Email',
    showPhone: 'Show Phone',
    showLocation: 'Show Location',
    
    // Security
    securitySettings: 'Security Settings',
    changePassword: 'Change Password',
    currentPassword: 'Current Password',
    newPassword: 'New Password',
    confirmPassword: 'Confirm Password',
    twoFactorAuth: 'Two-Factor Authentication',
    enableTwoFactor: 'Enable Two-Factor',
    
    // Preferences
    preferencesSettings: 'Preferences Settings',
    languagePreference: 'Language',
    bengali: 'বাংলা',
    english: 'English',
    theme: 'Theme',
    light: 'Light',
    dark: 'Dark',
    timezone: 'Timezone',
    
    // Actions
    save: 'Save',
    cancel: 'Cancel',
    update: 'Update',
    delete: 'Delete',
    export: 'Export',
    
    // Data & Account
    dataAndAccount: 'Data & Account',
    exportData: 'Export Data',
    exportDataDesc: 'Download all your data',
    deleteAccount: 'Delete Account',
    deleteAccountDesc: 'Permanently delete your account',
    deleteAccountConfirm: 'Are you sure?',
    deleteAccountWarning: 'This action cannot be undone. All your data will be permanently deleted.',
    
    // Messages
    settingsSaved: 'Settings saved!',
    passwordChanged: 'Password changed successfully!',
    passwordMismatch: 'New passwords do not match!',
    accountDeleted: 'Account deleted. We will miss you!',
    dataExported: 'Your data download has started!',
  },
};

export function SettingsPage({ language, setLanguage: setLang, setPage, onLogin }: SettingsPageProps) {
  const t = settingsTranslations[language];
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  
  // Notification Settings
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(false);
  const [jobAlerts, setJobAlerts] = useState(true);
  const [messageAlerts, setMessageAlerts] = useState(true);
  const [paymentAlerts, setPaymentAlerts] = useState(true);
  const [weeklyReport, setWeeklyReport] = useState(true);

  // Privacy Settings
  const [profileVisibility, setProfileVisibility] = useState<'public' | 'private' | 'registered'>('public');
  const [showEmail, setShowEmail] = useState(false);
  const [showPhone, setShowPhone] = useState(true);
  const [showLocation, setShowLocation] = useState(true);

  // Security
  const [twoFactorAuth, setTwoFactorAuth] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSaveNotifications = () => {
    toast.success(t.settingsSaved);
  };

  const handleSavePrivacy = () => {
    toast.success(t.settingsSaved);
  };

  const handleChangePassword = () => {
    if (newPassword !== confirmPassword) {
      toast.error(t.passwordMismatch);
      return;
    }
    toast.success(t.passwordChanged);
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  const handleDeleteAccount = () => {
    toast.error(t.accountDeleted);
    setTimeout(() => setPage('home'), 2000);
  };

  const handleExportData = () => {
    toast.success(t.dataExported);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50">
      <Header language={language} setLanguage={setLang} setPage={setPage} announcement={null} onLogin={onLogin} />

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl text-gray-900 mb-2 flex items-center gap-3">
            <SettingsIcon className="w-10 h-10 text-blue-600" />
            {t.settings}
          </h1>
          <p className="text-gray-600">{language === 'bn' ? 'আপনার একাউন্ট এবং পছন্দ পরিচালনা করুন' : 'Manage your account and preferences'}</p>
        </div>

        {/* Settings Tabs */}
        <Tabs defaultValue="account" className="space-y-6">
          <TabsList className="grid grid-cols-2 md:grid-cols-5 gap-2 bg-white p-2 rounded-xl shadow-lg">
            <TabsTrigger value="account" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-emerald-600 data-[state=active]:to-teal-600 data-[state=active]:text-white">
              <User className="w-4 h-4 mr-2" />
              {t.account}
            </TabsTrigger>
            <TabsTrigger value="notifications" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-emerald-600 data-[state=active]:to-teal-600 data-[state=active]:text-white">
              <Bell className="w-4 h-4 mr-2" />
              {t.notifications}
            </TabsTrigger>
            <TabsTrigger value="privacy" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-emerald-600 data-[state=active]:to-teal-600 data-[state=active]:text-white">
              <Eye className="w-4 h-4 mr-2" />
              {t.privacy}
            </TabsTrigger>
            <TabsTrigger value="security" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-emerald-600 data-[state=active]:to-teal-600 data-[state=active]:text-white">
              <Lock className="w-4 h-4 mr-2" />
              {t.security}
            </TabsTrigger>
            <TabsTrigger value="preferences" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-emerald-600 data-[state=active]:to-teal-600 data-[state=active]:text-white">
              <Globe className="w-4 h-4 mr-2" />
              {t.preferences}
            </TabsTrigger>
          </TabsList>

          {/* Account Tab */}
          <TabsContent value="account">
            <Card className="p-6">
              <h2 className="text-2xl text-gray-900 mb-6">{t.accountSettings}</h2>
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label>{t.fullName}</Label>
                    <Input defaultValue="মোঃ রহিম উদ্দিন" />
                  </div>
                  <div>
                    <Label>{t.email}</Label>
                    <Input type="email" defaultValue="rahim@example.com" />
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label>{t.phone}</Label>
                    <Input defaultValue="+880 1712345678" />
                  </div>
                  <div>
                    <Label>{t.profilePicture}</Label>
                    <Button variant="outline" className="w-full">
                      <Upload className="w-4 h-4 mr-2" />
                      {t.changePhoto}
                    </Button>
                  </div>
                </div>
                <Button className="bg-gradient-to-r from-emerald-600 to-teal-600">
                  <Save className="w-4 h-4 mr-2" />
                  {t.save}
                </Button>
              </div>
            </Card>
          </TabsContent>

          {/* Notifications Tab */}
          <TabsContent value="notifications">
            <Card className="p-6">
              <h2 className="text-2xl text-gray-900 mb-6">{t.notificationSettings}</h2>
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base">{t.emailNotifications}</Label>
                    <p className="text-sm text-gray-500">{language === 'bn' ? 'ইমেইলে বিজ্ঞপ্তি পান' : 'Receive notifications via email'}</p>
                  </div>
                  <Switch checked={emailNotifications} onCheckedChange={setEmailNotifications} />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base">{t.pushNotifications}</Label>
                    <p className="text-sm text-gray-500">{language === 'bn' ? 'ব্রাউজারে পুশ বিজ্ঞপ্তি' : 'Browser push notifications'}</p>
                  </div>
                  <Switch checked={pushNotifications} onCheckedChange={setPushNotifications} />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base">{t.smsNotifications}</Label>
                    <p className="text-sm text-gray-500">{language === 'bn' ? 'এসএমএসে বিজ্ঞপ্তি' : 'SMS notifications'}</p>
                  </div>
                  <Switch checked={smsNotifications} onCheckedChange={setSmsNotifications} />
                </div>
                <Separator />
                <h3 className="text-lg text-gray-900 mt-6">{language === 'bn' ? 'নির্দিষ্ট বিজ্ঞপ্তি' : 'Specific Notifications'}</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label>{t.jobAlerts}</Label>
                    <Switch checked={jobAlerts} onCheckedChange={setJobAlerts} />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label>{t.messageAlerts}</Label>
                    <Switch checked={messageAlerts} onCheckedChange={setMessageAlerts} />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label>{t.paymentAlerts}</Label>
                    <Switch checked={paymentAlerts} onCheckedChange={setPaymentAlerts} />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label>{t.weeklyReport}</Label>
                    <Switch checked={weeklyReport} onCheckedChange={setWeeklyReport} />
                  </div>
                </div>
                <Button onClick={handleSaveNotifications} className="bg-gradient-to-r from-emerald-600 to-teal-600">
                  <Save className="w-4 h-4 mr-2" />
                  {t.save}
                </Button>
              </div>
            </Card>
          </TabsContent>

          {/* Privacy Tab */}
          <TabsContent value="privacy">
            <Card className="p-6">
              <h2 className="text-2xl text-gray-900 mb-6">{t.privacySettings}</h2>
              <div className="space-y-6">
                <div>
                  <Label className="text-base mb-2 block">{t.profileVisibility}</Label>
                  <Select value={profileVisibility} onValueChange={(v: any) => setProfileVisibility(v)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="public">{t.public}</SelectItem>
                      <SelectItem value="private">{t.private}</SelectItem>
                      <SelectItem value="registered">{t.registered}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Separator />
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label>{t.showEmail}</Label>
                    <Switch checked={showEmail} onCheckedChange={setShowEmail} />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label>{t.showPhone}</Label>
                    <Switch checked={showPhone} onCheckedChange={setShowPhone} />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label>{t.showLocation}</Label>
                    <Switch checked={showLocation} onCheckedChange={setShowLocation} />
                  </div>
                </div>
                <Button onClick={handleSavePrivacy} className="bg-gradient-to-r from-emerald-600 to-teal-600">
                  <Save className="w-4 h-4 mr-2" />
                  {t.save}
                </Button>
              </div>
            </Card>
          </TabsContent>

          {/* Security Tab */}
          <TabsContent value="security">
            <Card className="p-6">
              <h2 className="text-2xl text-gray-900 mb-6">{t.securitySettings}</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg text-gray-900 mb-4">{t.changePassword}</h3>
                  <div className="space-y-4">
                    <div>
                      <Label>{t.currentPassword}</Label>
                      <Input 
                        type="password" 
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                      />
                    </div>
                    <div>
                      <Label>{t.newPassword}</Label>
                      <Input 
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                      />
                    </div>
                    <div>
                      <Label>{t.confirmPassword}</Label>
                      <Input 
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                      />
                    </div>
                    <Button onClick={handleChangePassword} className="bg-gradient-to-r from-emerald-600 to-teal-600">
                      {t.update}
                    </Button>
                  </div>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base">{t.twoFactorAuth}</Label>
                    <p className="text-sm text-gray-500">{language === 'bn' ? 'অতিরিক্ত নিরাপত্তার জন্য সক্রিয় করুন' : 'Enable for extra security'}</p>
                  </div>
                  <Switch checked={twoFactorAuth} onCheckedChange={setTwoFactorAuth} />
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* Preferences Tab */}
          <TabsContent value="preferences">
            <Card className="p-6">
              <h2 className="text-2xl text-gray-900 mb-6">{t.preferencesSettings}</h2>
              <div className="space-y-6">
                <div>
                  <Label className="text-base mb-4 block">{t.languagePreference}</Label>
                  <LanguageSwitcher language={language} setLanguage={setLang} variant="settings" />
                  <p className="text-sm text-gray-500 mt-3">
                    {language === 'bn' 
                      ? 'সম্পূর্ণ ওয়েবসাইটে ভাষা পরিবর্তন করতে উপরে একটি ভাষা নির্বাচন করুন।'
                      : 'Select a language above to change the entire website language.'}
                  </p>
                </div>
                <div>
                  <Label className="text-base mb-2 block">{t.theme}</Label>
                  <Select value={theme} onValueChange={(v: any) => setTheme(v)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">
                        <div className="flex items-center gap-2">
                          <Sun className="w-4 h-4" />
                          {t.light}
                        </div>
                      </SelectItem>
                      <SelectItem value="dark">
                        <div className="flex items-center gap-2">
                          <Moon className="w-4 h-4" />
                          {t.dark}
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-base mb-2 block">{t.timezone}</Label>
                  <Select defaultValue="dhaka">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="dhaka">Asia/Dhaka (GMT+6)</SelectItem>
                      <SelectItem value="kolkata">Asia/Kolkata (GMT+5:30)</SelectItem>
                      <SelectItem value="dubai">Asia/Dubai (GMT+4)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Separator />

                <div>
                  <h3 className="text-lg text-gray-900 mb-4">{t.dataAndAccount}</h3>
                  <div className="space-y-4">
                    <Button onClick={handleExportData} variant="outline" className="w-full justify-start">
                      <Download className="w-4 h-4 mr-2" />
                      <div className="text-left flex-1">
                        <p className="font-medium">{t.exportData}</p>
                        <p className="text-xs text-gray-500">{t.exportDataDesc}</p>
                      </div>
                    </Button>

                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" className="w-full justify-start border-red-200 hover:bg-red-50">
                          <Trash2 className="w-4 h-4 mr-2 text-red-600" />
                          <div className="text-left flex-1">
                            <p className="font-medium text-red-600">{t.deleteAccount}</p>
                            <p className="text-xs text-gray-500">{t.deleteAccountDesc}</p>
                          </div>
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle className="flex items-center gap-2 text-red-600">
                            <AlertCircle className="w-5 h-5" />
                            {t.deleteAccountConfirm}
                          </DialogTitle>
                          <DialogDescription>
                            {t.deleteAccountWarning}
                          </DialogDescription>
                        </DialogHeader>
                        <DialogFooter>
                          <Button variant="outline">{t.cancel}</Button>
                          <Button 
                            onClick={handleDeleteAccount}
                            className="bg-red-600 hover:bg-red-700"
                          >
                            {t.delete}
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      <Footer language={language} setPage={setPage} />
    </div>
  );
}

const Upload = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="17 8 12 3 7 8" />
    <line x1="12" y1="3" x2="12" y2="15" />
  </svg>
);
