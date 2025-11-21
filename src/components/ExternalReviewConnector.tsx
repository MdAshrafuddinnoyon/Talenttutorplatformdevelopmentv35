import { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import {
  Globe2, Facebook, CheckCircle, XCircle, RefreshCw,
  Settings, Link2, ExternalLink, Star, TrendingUp, AlertCircle
} from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import { mockExternalConnections, type ExternalReviewConnection } from '../utils/reviewsData';

interface ExternalReviewConnectorProps {
  language: 'bn' | 'en';
}

const content = {
  bn: {
    title: 'বাহ্যিক রিভিউ সংযোগ',
    subtitle: 'Google এবং Facebook থেকে রিভিউ স্বয়ংক্রিয়ভাবে আনুন',
    google: {
      title: 'Google Business Reviews',
      description: 'Google My Business এর সাথে সংযুক্ত করুন',
      connected: 'সংযুক্ত',
      notConnected: 'সংযুক্ত নয়',
      connect: 'সংযোগ করুন',
      disconnect: 'সংযোগ বিচ্ছিন্ন করুন',
      sync: 'রিভিউ সিঙ্ক করুন',
      placeId: 'Google Place ID',
      placeIdPlaceholder: 'আপনার Google Place ID লিখুন',
      businessName: 'ব্যবসার নাম',
      totalReviews: 'মোট রিভিউ',
      averageRating: 'গড় রেটিং',
      lastSynced: 'শেষ সিঙ্ক',
      howToConnect: 'কীভাবে সংযুক্ত করবেন',
      steps: [
        'Google My Business এ লগইন করুন',
        'আপনার ব্যবসার Place ID খুঁজুন',
        'নিচের ফিল্ডে Place ID পেস্ট করুন',
        '"সংযোগ করুন" বাটনে ক্লিক করুন'
      ]
    },
    facebook: {
      title: 'Facebook Page Reviews',
      description: 'Facebook Page এর সাথে সংযুক্ত করুন',
      connected: 'সংযুক্ত',
      notConnected: 'সংযুক্ত নয়',
      connect: 'সংযোগ করুন',
      disconnect: 'সংযোগ বিচ্ছিন্ন করুন',
      sync: 'রিভিউ সিঙ্ক করুন',
      pageId: 'Facebook Page ID',
      pageIdPlaceholder: 'আপনার Facebook Page ID লিখুন',
      pageName: 'পেজের নাম',
      accessToken: 'Access Token',
      totalReviews: 'মোট রিভিউ',
      averageRating: 'গড় রেটিং',
      lastSynced: 'শেষ সিঙ্ক',
      howToConnect: 'কীভাবে সংযুক্ত করবেন',
      steps: [
        'Facebook Page Settings এ যান',
        'Page ID এবং Access Token জেনারেট করুন',
        'নিচের ফিল্ডে তথ্য পূরণ করুন',
        '"সংযোগ করুন" বাটনে ক্লিক করুন'
      ]
    },
    connectSuccess: 'সফলভাবে সংযুক্ত হয়েছে!',
    disconnectSuccess: 'সংযোগ বিচ্ছিন্ন হয়েছে',
    syncSuccess: 'রিভিউ সিঙ্ক সম্পন্ন হয়েছে',
    syncInProgress: 'সিঙ্ক হচ্ছে...',
    fillRequired: 'সব প্রয়োজনীয় ফিল্ড পূরণ করুন',
    autoSync: 'স্বয়ংক্রিয় সিঙ্ক',
    autoSyncDescription: 'প্রতি ঘণ্টায় নতুন রিভিউ স্বয়ংক্রিয়ভাবে আনা হবে',
    enabled: 'সক্রিয়',
    disabled: 'নিষ্ক্রিয়'
  },
  en: {
    title: 'External Review Connections',
    subtitle: 'Automatically import reviews from Google and Facebook',
    google: {
      title: 'Google Business Reviews',
      description: 'Connect with Google My Business',
      connected: 'Connected',
      notConnected: 'Not Connected',
      connect: 'Connect',
      disconnect: 'Disconnect',
      sync: 'Sync Reviews',
      placeId: 'Google Place ID',
      placeIdPlaceholder: 'Enter your Google Place ID',
      businessName: 'Business Name',
      totalReviews: 'Total Reviews',
      averageRating: 'Average Rating',
      lastSynced: 'Last Synced',
      howToConnect: 'How to Connect',
      steps: [
        'Log in to Google My Business',
        'Find your business Place ID',
        'Paste the Place ID in the field below',
        'Click "Connect" button'
      ]
    },
    facebook: {
      title: 'Facebook Page Reviews',
      description: 'Connect with Facebook Page',
      connected: 'Connected',
      notConnected: 'Not Connected',
      connect: 'Connect',
      disconnect: 'Disconnect',
      sync: 'Sync Reviews',
      pageId: 'Facebook Page ID',
      pageIdPlaceholder: 'Enter your Facebook Page ID',
      pageName: 'Page Name',
      accessToken: 'Access Token',
      totalReviews: 'Total Reviews',
      averageRating: 'Average Rating',
      lastSynced: 'Last Synced',
      howToConnect: 'How to Connect',
      steps: [
        'Go to Facebook Page Settings',
        'Generate Page ID and Access Token',
        'Fill in the fields below',
        'Click "Connect" button'
      ]
    },
    connectSuccess: 'Connected successfully!',
    disconnectSuccess: 'Disconnected',
    syncSuccess: 'Reviews synced successfully',
    syncInProgress: 'Syncing...',
    fillRequired: 'Please fill all required fields',
    autoSync: 'Auto Sync',
    autoSyncDescription: 'New reviews will be automatically imported every hour',
    enabled: 'Enabled',
    disabled: 'Disabled'
  }
};

export function ExternalReviewConnector({ language }: ExternalReviewConnectorProps) {
  const t = content[language];
  const [connections, setConnections] = useState<ExternalReviewConnection[]>(mockExternalConnections);
  
  // Google connection state
  const [googleDialogOpen, setGoogleDialogOpen] = useState(false);
  const [googlePlaceId, setGooglePlaceId] = useState('');
  const [isGoogleConnecting, setIsGoogleConnecting] = useState(false);
  const [isGoogleSyncing, setIsGoogleSyncing] = useState(false);
  
  // Facebook connection state
  const [facebookDialogOpen, setFacebookDialogOpen] = useState(false);
  const [facebookPageId, setFacebookPageId] = useState('');
  const [facebookAccessToken, setFacebookAccessToken] = useState('');
  const [isFacebookConnecting, setIsFacebookConnecting] = useState(false);
  const [isFacebookSyncing, setIsFacebookSyncing] = useState(false);

  const googleConnection = connections.find(c => c.source === 'google');
  const facebookConnection = connections.find(c => c.source === 'facebook');

  const handleGoogleConnect = async () => {
    if (!googlePlaceId.trim()) {
      toast.error(t.fillRequired);
      return;
    }

    setIsGoogleConnecting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Update connection
    setConnections(connections.map(c =>
      c.source === 'google'
        ? {
            ...c,
            connected: true,
            connectedAt: new Date(),
            googlePlaceId: googlePlaceId,
            googleBusinessName: 'Talent Tutor - টিউশন মার্কেটপ্লেস'
          }
        : c
    ));

    toast.success(t.connectSuccess);
    setIsGoogleConnecting(false);
    setGoogleDialogOpen(false);
    setGooglePlaceId('');
  };

  const handleGoogleDisconnect = () => {
    setConnections(connections.map(c =>
      c.source === 'google'
        ? { ...c, connected: false, googlePlaceId: undefined, googleBusinessName: undefined }
        : c
    ));
    toast.success(t.disconnectSuccess);
  };

  const handleGoogleSync = async () => {
    setIsGoogleSyncing(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setConnections(connections.map(c =>
      c.source === 'google'
        ? { ...c, lastSyncedAt: new Date(), totalReviews: c.totalReviews + Math.floor(Math.random() * 3) }
        : c
    ));

    toast.success(t.syncSuccess);
    setIsGoogleSyncing(false);
  };

  const handleFacebookConnect = async () => {
    if (!facebookPageId.trim() || !facebookAccessToken.trim()) {
      toast.error(t.fillRequired);
      return;
    }

    setIsFacebookConnecting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Update connection
    setConnections(connections.map(c =>
      c.source === 'facebook'
        ? {
            ...c,
            connected: true,
            connectedAt: new Date(),
            facebookPageId: facebookPageId,
            facebookPageName: 'Talent Tutor Bangladesh',
            facebookAccessToken: facebookAccessToken
          }
        : c
    ));

    toast.success(t.connectSuccess);
    setIsFacebookConnecting(false);
    setFacebookDialogOpen(false);
    setFacebookPageId('');
    setFacebookAccessToken('');
  };

  const handleFacebookDisconnect = () => {
    setConnections(connections.map(c =>
      c.source === 'facebook'
        ? {
            ...c,
            connected: false,
            facebookPageId: undefined,
            facebookPageName: undefined,
            facebookAccessToken: undefined
          }
        : c
    ));
    toast.success(t.disconnectSuccess);
  };

  const handleFacebookSync = async () => {
    setIsFacebookSyncing(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setConnections(connections.map(c =>
      c.source === 'facebook'
        ? { ...c, lastSyncedAt: new Date(), totalReviews: c.totalReviews + Math.floor(Math.random() * 5) }
        : c
    ));

    toast.success(t.syncSuccess);
    setIsFacebookSyncing(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className={`text-2xl text-gray-900 mb-2 ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>
          {t.title}
        </h2>
        <p className={`text-gray-600 ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>
          {t.subtitle}
        </p>
      </div>

      {/* Google Business Connection */}
      <Card className="p-6">
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-yellow-500 rounded-2xl flex items-center justify-center shadow-lg">
              <Globe2 className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className={`text-xl text-gray-900 mb-1 ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>
                {t.google.title}
              </h3>
              <p className={`text-gray-600 text-sm ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>
                {t.google.description}
              </p>
            </div>
          </div>
          
          {googleConnection?.connected ? (
            <Badge className="bg-green-100 text-green-800">
              <CheckCircle className="w-3 h-3 mr-1" />
              {t.google.connected}
            </Badge>
          ) : (
            <Badge variant="outline" className="bg-gray-100">
              <XCircle className="w-3 h-3 mr-1" />
              {t.google.notConnected}
            </Badge>
          )}
        </div>

        {googleConnection?.connected ? (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className={`text-sm text-gray-600 mb-1 ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>
                  {t.google.totalReviews}
                </p>
                <p className="text-2xl text-gray-900">{googleConnection.totalReviews}</p>
              </div>
              <div className="bg-yellow-50 p-4 rounded-lg">
                <p className={`text-sm text-gray-600 mb-1 ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>
                  {t.google.averageRating}
                </p>
                <div className="flex items-center gap-1">
                  <p className="text-2xl text-gray-900">{googleConnection.averageRating}</p>
                  <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                </div>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <p className={`text-sm text-gray-600 mb-1 ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>
                  {t.google.lastSynced}
                </p>
                <p className="text-sm text-gray-900">
                  {googleConnection.lastSyncedAt?.toLocaleString(language === 'bn' ? 'bn-BD' : 'en-US')}
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <Button
                onClick={handleGoogleSync}
                disabled={isGoogleSyncing}
                className="bg-blue-600 hover:bg-blue-700"
              >
                {isGoogleSyncing ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                    {t.syncInProgress}
                  </>
                ) : (
                  <>
                    <RefreshCw className="w-4 h-4 mr-2" />
                    {t.google.sync}
                  </>
                )}
              </Button>
              <Button
                variant="outline"
                onClick={handleGoogleDisconnect}
                className="text-red-600 border-red-200 hover:bg-red-50"
              >
                {t.google.disconnect}
              </Button>
              <Button
                variant="outline"
                onClick={() => window.open('https://business.google.com', '_blank')}
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                Google My Business
              </Button>
            </div>
          </div>
        ) : (
          <div>
            <Button onClick={() => setGoogleDialogOpen(true)} className="bg-gradient-to-r from-red-500 to-yellow-500 hover:from-red-600 hover:to-yellow-600">
              <Link2 className="w-4 h-4 mr-2" />
              {t.google.connect}
            </Button>
          </div>
        )}
      </Card>

      {/* Facebook Page Connection */}
      <Card className="p-6">
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl flex items-center justify-center shadow-lg">
              <Facebook className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className={`text-xl text-gray-900 mb-1 ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>
                {t.facebook.title}
              </h3>
              <p className={`text-gray-600 text-sm ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>
                {t.facebook.description}
              </p>
            </div>
          </div>
          
          {facebookConnection?.connected ? (
            <Badge className="bg-green-100 text-green-800">
              <CheckCircle className="w-3 h-3 mr-1" />
              {t.facebook.connected}
            </Badge>
          ) : (
            <Badge variant="outline" className="bg-gray-100">
              <XCircle className="w-3 h-3 mr-1" />
              {t.facebook.notConnected}
            </Badge>
          )}
        </div>

        {facebookConnection?.connected ? (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className={`text-sm text-gray-600 mb-1 ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>
                  {t.facebook.totalReviews}
                </p>
                <p className="text-2xl text-gray-900">{facebookConnection.totalReviews}</p>
              </div>
              <div className="bg-yellow-50 p-4 rounded-lg">
                <p className={`text-sm text-gray-600 mb-1 ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>
                  {t.facebook.averageRating}
                </p>
                <div className="flex items-center gap-1">
                  <p className="text-2xl text-gray-900">{facebookConnection.averageRating}</p>
                  <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                </div>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <p className={`text-sm text-gray-600 mb-1 ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>
                  {t.facebook.lastSynced}
                </p>
                <p className="text-sm text-gray-900">
                  {facebookConnection.lastSyncedAt?.toLocaleString(language === 'bn' ? 'bn-BD' : 'en-US')}
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <Button
                onClick={handleFacebookSync}
                disabled={isFacebookSyncing}
                className="bg-blue-600 hover:bg-blue-700"
              >
                {isFacebookSyncing ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                    {t.syncInProgress}
                  </>
                ) : (
                  <>
                    <RefreshCw className="w-4 h-4 mr-2" />
                    {t.facebook.sync}
                  </>
                )}
              </Button>
              <Button
                variant="outline"
                onClick={handleFacebookDisconnect}
                className="text-red-600 border-red-200 hover:bg-red-50"
              >
                {t.facebook.disconnect}
              </Button>
              <Button
                variant="outline"
                onClick={() => window.open('https://facebook.com/talenttutor', '_blank')}
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                Facebook Page
              </Button>
            </div>
          </div>
        ) : (
          <div>
            <Button onClick={() => setFacebookDialogOpen(true)} className="bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900">
              <Link2 className="w-4 h-4 mr-2" />
              {t.facebook.connect}
            </Button>
          </div>
        )}
      </Card>

      {/* Google Connection Dialog */}
      <Dialog open={googleDialogOpen} onOpenChange={setGoogleDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Globe2 className="w-5 h-5 text-red-600" />
              {t.google.connect}
            </DialogTitle>
            <DialogDescription>{t.google.howToConnect}</DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <ol className="space-y-2">
              {t.google.steps.map((step, idx) => (
                <li key={idx} className={`text-sm text-gray-700 flex items-start gap-2 ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>
                  <span className="bg-blue-100 text-blue-700 w-5 h-5 rounded-full flex items-center justify-center text-xs shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  {step}
                </li>
              ))}
            </ol>

            <div className="space-y-2">
              <Label htmlFor="google-place-id">{t.google.placeId} *</Label>
              <Input
                id="google-place-id"
                value={googlePlaceId}
                onChange={(e) => setGooglePlaceId(e.target.value)}
                placeholder={t.google.placeIdPlaceholder}
              />
            </div>
          </div>

          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={() => setGoogleDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleGoogleConnect}
              disabled={isGoogleConnecting || !googlePlaceId}
              className="bg-gradient-to-r from-red-500 to-yellow-500"
            >
              {isGoogleConnecting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                  Connecting...
                </>
              ) : (
                t.google.connect
              )}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Facebook Connection Dialog */}
      <Dialog open={facebookDialogOpen} onOpenChange={setFacebookDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Facebook className="w-5 h-5 text-blue-600" />
              {t.facebook.connect}
            </DialogTitle>
            <DialogDescription>{t.facebook.howToConnect}</DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <ol className="space-y-2">
              {t.facebook.steps.map((step, idx) => (
                <li key={idx} className={`text-sm text-gray-700 flex items-start gap-2 ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>
                  <span className="bg-blue-100 text-blue-700 w-5 h-5 rounded-full flex items-center justify-center text-xs shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  {step}
                </li>
              ))}
            </ol>

            <div className="space-y-2">
              <Label htmlFor="facebook-page-id">{t.facebook.pageId} *</Label>
              <Input
                id="facebook-page-id"
                value={facebookPageId}
                onChange={(e) => setFacebookPageId(e.target.value)}
                placeholder={t.facebook.pageIdPlaceholder}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="facebook-access-token">{t.facebook.accessToken} *</Label>
              <Input
                id="facebook-access-token"
                type="password"
                value={facebookAccessToken}
                onChange={(e) => setFacebookAccessToken(e.target.value)}
                placeholder="Enter access token"
              />
            </div>
          </div>

          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={() => setFacebookDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleFacebookConnect}
              disabled={isFacebookConnecting || !facebookPageId || !facebookAccessToken}
              className="bg-gradient-to-r from-blue-600 to-blue-800"
            >
              {isFacebookConnecting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                  Connecting...
                </>
              ) : (
                t.facebook.connect
              )}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
