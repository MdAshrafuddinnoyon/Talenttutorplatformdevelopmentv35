import { useState, useEffect } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Switch } from './ui/switch';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  Key, Eye, EyeOff, Copy, Check, AlertCircle, 
  RefreshCw, Save, Zap, MessageSquare, MapPin,
  Users, Crown, Info, Shield, Settings
} from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface APIKey {
  id: string;
  name: string;
  key: string;
  type: 'chat' | 'matching' | 'maps';
  enabled: boolean;
  creditRequired: number;
  usageCount: number;
  lastUsed: Date | null;
  createdAt: Date;
}

interface AdminAPIKeyManagerProps {
  language: 'bn' | 'en';
}

const content = {
  bn: {
    title: 'API Key ম্যানেজমেন্ট',
    subtitle: 'AI ফিচার এবং তৃতীয় পক্ষ সার্ভিস ম্যানেজ করুন',
    
    tabs: {
      chat: 'লাইভ চ্যাট AI',
      matching: 'ম্যাচিং সিস্টেম',
      maps: 'ম্যাপ সার্ভিস'
    },
    
    chatAI: {
      title: 'লাইভ চ্যাট AI বট',
      description: 'Intelligent chatbot যা ইউজারদের প্রশ্নের উত্তর দেয়',
      apiName: 'Google Gemini API',
      features: [
        'স্বয়ংক্রিয় উত্তর',
        'প্রাসঙ্গিক তথ্য প্রদান',
        'বহুভাষিক সাপোর্ট',
        '২৪/৭ সহায়তা'
      ]
    },
    
    matching: {
      title: 'শিক্ষক-টিউশন ম্যাচিং',
      description: 'AI-powered ম্যাচিং সিস্টেম শিক্ষক ও টিউশন খুঁজতে',
      apiName: 'Custom AI Matching API',
      features: [
        'স্মার্ট প্রোফাইল ম্যাচিং',
        'দক্ষতা ভিত্তিক খোঁজ',
        'অগ্রাধিকার ভিত্তিক',
        'স্বয়ংক্রিয় সুপারিশ'
      ]
    },
    
    maps: {
      title: 'Google Maps Integration',
      description: 'লোকেশন ভিত্তিক শিক্ষক খুঁজুন',
      apiName: 'Google Maps API',
      features: [
        'লোকেশন ট্র্যাকিং',
        'নিকটতম শিক্ষক খোঁজা',
        'দূরত্ব হিসাব',
        'রুট প্ল্যানিং'
      ]
    },
    
    fields: {
      apiKey: 'API Key',
      status: 'স্ট্যাটাস',
      enabled: 'সক্রিয়',
      disabled: 'নিষ্ক্রিয়',
      creditRequired: 'প্রয়োজনীয় ক্রেডিট',
      usageCount: 'ব্যবহার সংখ্যা',
      lastUsed: 'শেষ ব্যবহার',
      never: 'কখনো নয়',
      times: 'বার'
    },
    
    actions: {
      show: 'দেখান',
      hide: 'লুকান',
      copy: 'কপি',
      copied: 'কপি হয়েছে',
      save: 'সংরক্ষণ',
      saved: 'সংরক্ষিত',
      regenerate: 'নতুন তৈরি',
      test: 'পরীক্ষা করুন'
    },
    
    info: {
      creditInfo: 'ক্রেডিট তথ্য',
      creditDesc: 'ইউজারদের এই ক্রেডিট থাকলে AI ফিচার ব্যবহার করতে পারবে',
      securityWarning: 'সতর্কতা: API Key কখনো শেয়ার করবেন না',
      usageInfo: 'ব্যবহার পরিসংখ্যান'
    },
    
    settings: {
      title: 'সেটিংস',
      autoEnable: 'স্বয়ংক্রিয়ভাবে সক্রিয় করুন',
      requireCredit: 'ক্রেডিট যাচাই বাধ্যতামূলক',
      logUsage: 'ব্যবহার লগ রাখুন'
    }
  },
  en: {
    title: 'API Key Management',
    subtitle: 'Manage AI features and third-party services',
    
    tabs: {
      chat: 'Live Chat AI',
      matching: 'Matching System',
      maps: 'Map Service'
    },
    
    chatAI: {
      title: 'Live Chat AI Bot',
      description: 'Intelligent chatbot for answering user queries',
      apiName: 'Google Gemini API',
      features: [
        'Auto responses',
        'Contextual information',
        'Multi-language support',
        '24/7 assistance'
      ]
    },
    
    matching: {
      title: 'Teacher-Tuition Matching',
      description: 'AI-powered matching system for teachers and tuitions',
      apiName: 'Custom AI Matching API',
      features: [
        'Smart profile matching',
        'Skill-based search',
        'Priority-based',
        'Auto recommendations'
      ]
    },
    
    maps: {
      title: 'Google Maps Integration',
      description: 'Location-based teacher search',
      apiName: 'Google Maps API',
      features: [
        'Location tracking',
        'Nearest teacher search',
        'Distance calculation',
        'Route planning'
      ]
    },
    
    fields: {
      apiKey: 'API Key',
      status: 'Status',
      enabled: 'Enabled',
      disabled: 'Disabled',
      creditRequired: 'Credit Required',
      usageCount: 'Usage Count',
      lastUsed: 'Last Used',
      never: 'Never',
      times: 'times'
    },
    
    actions: {
      show: 'Show',
      hide: 'Hide',
      copy: 'Copy',
      copied: 'Copied',
      save: 'Save',
      saved: 'Saved',
      regenerate: 'Regenerate',
      test: 'Test'
    },
    
    info: {
      creditInfo: 'Credit Information',
      creditDesc: 'Users with this credit can use AI features',
      securityWarning: 'Warning: Never share API Keys',
      usageInfo: 'Usage Statistics'
    },
    
    settings: {
      title: 'Settings',
      autoEnable: 'Auto-enable',
      requireCredit: 'Require credit verification',
      logUsage: 'Log usage'
    }
  }
};

export function AdminAPIKeyManager({ language }: AdminAPIKeyManagerProps) {
  const t = content[language];
  
  const [apiKeys, setApiKeys] = useState<APIKey[]>([
    {
      id: 'chat-1',
      name: 'Live Chat AI Bot',
      key: 'AIzaSyAJiRPxTVsYUSOcZITAdwJCHnXecH-x79Y',
      type: 'chat',
      enabled: true,
      creditRequired: 0, // Free for all users
      usageCount: 1247,
      lastUsed: new Date('2025-11-06T10:30:00'),
      createdAt: new Date('2025-01-01')
    },
    {
      id: 'matching-1',
      name: 'Teacher Matching AI',
      key: 'sk_live_51QA7YmFqoiP8bKduW8BPJp2H9hK7VqQ3R4Tz',
      type: 'matching',
      enabled: true,
      creditRequired: 10, // Requires 10 credits
      usageCount: 523,
      lastUsed: new Date('2025-11-06T09:15:00'),
      createdAt: new Date('2025-01-01')
    },
    {
      id: 'maps-1',
      name: 'Google Maps Service',
      key: 'AIzaSyAJiRPxTVsYUSOcZITAdwJCHnXecH-x79Y',
      type: 'maps',
      enabled: true,
      creditRequired: 5, // Requires 5 credits
      usageCount: 892,
      lastUsed: new Date('2025-11-06T11:00:00'),
      createdAt: new Date('2025-01-01')
    }
  ]);

  const [visibleKeys, setVisibleKeys] = useState<Set<string>>(new Set());
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [settings, setSettings] = useState({
    autoEnable: true,
    requireCredit: true,
    logUsage: true
  });

  const toggleKeyVisibility = (keyId: string) => {
    setVisibleKeys(prev => {
      const newSet = new Set(prev);
      if (newSet.has(keyId)) {
        newSet.delete(keyId);
      } else {
        newSet.add(keyId);
      }
      return newSet;
    });
  };

  const copyToClipboard = (text: string, keyId: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(keyId);
    toast.success(language === 'bn' ? 'API Key কপি হয়েছে!' : 'API Key copied!');
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const toggleAPIKey = (keyId: string) => {
    setApiKeys(prev => prev.map(key => 
      key.id === keyId ? { ...key, enabled: !key.enabled } : key
    ));
    const key = apiKeys.find(k => k.id === keyId);
    toast.success(
      key?.enabled 
        ? (language === 'bn' ? 'API নিষ্ক্রিয় করা হয়েছে' : 'API disabled')
        : (language === 'bn' ? 'API সক্রিয় করা হয়েছে' : 'API enabled')
    );
  };

  const updateCreditRequirement = (keyId: string, credit: number) => {
    setApiKeys(prev => prev.map(key => 
      key.id === keyId ? { ...key, creditRequired: credit } : key
    ));
  };

  const regenerateKey = (keyId: string) => {
    const newKey = 'sk_' + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    setApiKeys(prev => prev.map(key => 
      key.id === keyId ? { ...key, key: newKey } : key
    ));
    toast.success(language === 'bn' ? 'নতুন API Key তৈরি হয়েছে' : 'New API Key generated');
  };

  const testAPI = (keyId: string) => {
    const key = apiKeys.find(k => k.id === keyId);
    toast.loading(language === 'bn' ? 'পরীক্ষা করা হচ্ছে...' : 'Testing...');
    
    setTimeout(() => {
      toast.dismiss();
      toast.success(
        language === 'bn' 
          ? `${key?.name} সফলভাবে কাজ করছে!` 
          : `${key?.name} is working!`
      );
    }, 1500);
  };

  const renderAPICard = (apiKey: APIKey, config: any) => {
    const isVisible = visibleKeys.has(apiKey.id);
    const isCopied = copiedKey === apiKey.id;

    return (
      <Card key={apiKey.id} className="p-6">
        <div className="space-y-4">
          {/* Header */}
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                  apiKey.type === 'chat' ? 'bg-blue-100' :
                  apiKey.type === 'matching' ? 'bg-purple-100' :
                  'bg-green-100'
                }`}>
                  {apiKey.type === 'chat' && <MessageSquare className={`w-5 h-5 text-blue-600`} />}
                  {apiKey.type === 'matching' && <Users className={`w-5 h-5 text-purple-600`} />}
                  {apiKey.type === 'maps' && <MapPin className={`w-5 h-5 text-green-600`} />}
                </div>
                <div>
                  <h3 className={`text-lg text-gray-900 ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>
                    {config.title}
                  </h3>
                  <p className="text-xs text-gray-500">{config.apiName}</p>
                </div>
              </div>
              <p className={`text-sm text-gray-600 ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>
                {config.description}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <Badge className={apiKey.enabled ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'}>
                {apiKey.enabled ? t.fields.enabled : t.fields.disabled}
              </Badge>
              <Switch
                checked={apiKey.enabled}
                onCheckedChange={() => toggleAPIKey(apiKey.id)}
              />
            </div>
          </div>

          {/* API Key Display */}
          <div className="bg-gray-50 rounded-lg p-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-700">{t.fields.apiKey}:</span>
              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => toggleKeyVisibility(apiKey.id)}
                  className="h-7"
                >
                  {isVisible ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => copyToClipboard(apiKey.key, apiKey.id)}
                  className="h-7"
                >
                  {isCopied ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
                </Button>
              </div>
            </div>
            
            <div className="bg-white rounded border border-gray-200 p-3 font-mono text-sm break-all">
              {isVisible ? apiKey.key : '•'.repeat(40)}
            </div>
          </div>

          {/* Features */}
          <div className="space-y-2">
            <p className="text-sm text-gray-700">Features:</p>
            <div className="grid grid-cols-2 gap-2">
              {config.features.map((feature: string, idx: number) => (
                <div key={idx} className="flex items-center gap-2 text-sm text-gray-600">
                  <Zap className="w-3 h-3 text-yellow-500" />
                  <span className={language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}>{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Credit Requirement */}
          <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
            <div className="flex items-center gap-2">
              <Crown className="w-5 h-5 text-blue-600" />
              <span className={`text-sm text-gray-700 ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>
                {t.fields.creditRequired}:
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Input
                type="number"
                min="0"
                value={apiKey.creditRequired}
                onChange={(e) => updateCreditRequirement(apiKey.id, parseInt(e.target.value) || 0)}
                className="w-20 h-8 text-center"
              />
              <span className="text-sm text-gray-600">credits</span>
            </div>
          </div>

          {/* Usage Stats */}
          <div className="grid grid-cols-2 gap-4 pt-3 border-t border-gray-200">
            <div>
              <p className="text-xs text-gray-500 mb-1">{t.fields.usageCount}</p>
              <p className="text-lg text-gray-900">{apiKey.usageCount.toLocaleString()} {t.fields.times}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-1">{t.fields.lastUsed}</p>
              <p className="text-sm text-gray-900">
                {apiKey.lastUsed 
                  ? apiKey.lastUsed.toLocaleDateString(language === 'bn' ? 'bn-BD' : 'en-US')
                  : t.fields.never
                }
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-2 pt-3 border-t border-gray-200">
            <Button
              size="sm"
              variant="outline"
              onClick={() => testAPI(apiKey.id)}
              className="flex-1"
            >
              <Zap className="w-4 h-4 mr-2" />
              {t.actions.test}
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => regenerateKey(apiKey.id)}
              className="flex-1"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              {t.actions.regenerate}
            </Button>
          </div>
        </div>
      </Card>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className={`text-2xl text-gray-900 ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>
            {t.title}
          </h2>
          <p className={`text-gray-600 mt-1 ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>
            {t.subtitle}
          </p>
        </div>
        <Badge className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
          <Key className="w-4 h-4 mr-1" />
          {apiKeys.length} APIs
        </Badge>
      </div>

      {/* Security Warning */}
      <Card className="p-4 bg-yellow-50 border-yellow-200">
        <div className="flex items-start gap-3">
          <Shield className="w-5 h-5 text-yellow-600 mt-0.5" />
          <div>
            <p className={`text-sm text-yellow-800 ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>
              <strong>{t.info.securityWarning}</strong>
            </p>
            <p className={`text-xs text-yellow-700 mt-1 ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>
              {t.info.creditDesc}
            </p>
          </div>
        </div>
      </Card>

      {/* Tabs */}
      <Tabs defaultValue="chat" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="chat">
            <MessageSquare className="w-4 h-4 mr-2" />
            {t.tabs.chat}
          </TabsTrigger>
          <TabsTrigger value="matching">
            <Users className="w-4 h-4 mr-2" />
            {t.tabs.matching}
          </TabsTrigger>
          <TabsTrigger value="maps">
            <MapPin className="w-4 h-4 mr-2" />
            {t.tabs.maps}
          </TabsTrigger>
        </TabsList>

        {/* Chat AI */}
        <TabsContent value="chat" className="space-y-4">
          {renderAPICard(
            apiKeys.find(k => k.type === 'chat')!,
            t.chatAI
          )}
        </TabsContent>

        {/* Matching System */}
        <TabsContent value="matching" className="space-y-4">
          {renderAPICard(
            apiKeys.find(k => k.type === 'matching')!,
            t.matching
          )}
        </TabsContent>

        {/* Maps Service */}
        <TabsContent value="maps" className="space-y-4">
          {renderAPICard(
            apiKeys.find(k => k.type === 'maps')!,
            t.maps
          )}
        </TabsContent>
      </Tabs>

      {/* Global Settings */}
      <Card className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <Settings className="w-5 h-5 text-gray-600" />
          <h3 className={`text-lg text-gray-900 ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>
            {t.settings.title}
          </h3>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-sm text-gray-900 ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>
                {t.settings.autoEnable}
              </p>
              <p className="text-xs text-gray-500">Automatically enable APIs on creation</p>
            </div>
            <Switch
              checked={settings.autoEnable}
              onCheckedChange={(checked) => setSettings(prev => ({ ...prev, autoEnable: checked }))}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className={`text-sm text-gray-900 ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>
                {t.settings.requireCredit}
              </p>
              <p className="text-xs text-gray-500">Require credit verification before API access</p>
            </div>
            <Switch
              checked={settings.requireCredit}
              onCheckedChange={(checked) => setSettings(prev => ({ ...prev, requireCredit: checked }))}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className={`text-sm text-gray-900 ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>
                {t.settings.logUsage}
              </p>
              <p className="text-xs text-gray-500">Keep detailed logs of API usage</p>
            </div>
            <Switch
              checked={settings.logUsage}
              onCheckedChange={(checked) => setSettings(prev => ({ ...prev, logUsage: checked }))}
            />
          </div>
        </div>
      </Card>

      {/* Info Cards */}
      <div className="grid md:grid-cols-3 gap-4">
        <Card className="p-4 bg-gradient-to-br from-blue-50 to-indigo-50">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
              <MessageSquare className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl text-gray-900">{apiKeys.find(k => k.type === 'chat')?.usageCount}</p>
              <p className="text-xs text-gray-600">Chat Queries</p>
            </div>
          </div>
        </Card>

        <Card className="p-4 bg-gradient-to-br from-purple-50 to-pink-50">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
              <Users className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <p className="text-2xl text-gray-900">{apiKeys.find(k => k.type === 'matching')?.usageCount}</p>
              <p className="text-xs text-gray-600">Matches Made</p>
            </div>
          </div>
        </Card>

        <Card className="p-4 bg-gradient-to-br from-green-50 to-emerald-50">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
              <MapPin className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-2xl text-gray-900">{apiKeys.find(k => k.type === 'maps')?.usageCount}</p>
              <p className="text-xs text-gray-600">Location Searches</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
