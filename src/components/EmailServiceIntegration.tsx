import { useState, useEffect } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Alert, AlertDescription } from './ui/alert';
import { Switch } from './ui/switch';
import {
  Mail, Key, CheckCircle, XCircle, AlertCircle, Settings,
  Send, TestTube, Zap, Cloud, Database, RefreshCw
} from 'lucide-react';
import { motion } from 'motion/react';
import { toast } from 'sonner@2.0.3';

interface EmailServiceIntegrationProps {
  language: 'bn' | 'en';
}

const translations = {
  bn: {
    title: 'ইমেইল সার্ভিস ইন্টিগ্রেশন',
    sendgrid: 'SendGrid',
    awsSes: 'AWS SES',
    smtp: 'SMTP',
    apiKey: 'API কী',
    apiKeyPlaceholder: 'আপনার API কী লিখুন',
    fromEmail: 'প্রেরকের ইমেইল',
    fromName: 'প্রেরকের নাম',
    status: 'স্ট্যাটাস',
    connected: 'সংযুক্ত',
    notConnected: 'সংযুক্ত নয়',
    testConnection: 'সংযোগ পরীক্ষা করুন',
    saveConfiguration: 'কনফিগারেশন সংরক্ষণ করুন',
    sendTestEmail: 'টেস্ট ইমেইল পাঠান',
    testEmailAddress: 'টেস্ট ইমেইল ঠিকানা',
    configuration: 'কনফিগারেশন',
    testing: 'পরীক্ষা',
    success: 'সফল',
    error: 'ত্রুটি',
    smtpHost: 'SMTP হোস্ট',
    smtpPort: 'SMTP পোর্ট',
    smtpUsername: 'SMTP ইউজারনেম',
    smtpPassword: 'SMTP পাসওয়ার্ড',
    useTls: 'TLS ব্যবহার করুন',
    awsRegion: 'AWS অঞ্চল',
    awsAccessKey: 'AWS এক্সেস কী',
    awsSecretKey: 'AWS সিক্রেট কী',
    verifiedSender: 'যাচাইকৃত প্রেরক',
    setupInstructions: 'সেটআপ নির্দেশনা',
    sendgridInstructions: 'SendGrid API কী পেতে: Settings > API Keys > Create API Key এ যান। Full Access নির্বাচন করুন।',
    awsInstructions: 'AWS SES এর জন্য আপনার IAM credentials এবং verified sender email প্রয়োজন। AWS Console > SES এ যান।',
    smtpInstructions: 'আপনার ইমেইল প্রদানকারীর SMTP সেটিংস ব্যবহার করুন। Gmail, Outlook, বা অন্য কোনো SMTP সার্ভার ব্যবহার করতে পারেন।',
    testSuccess: 'টেস্ট ইমেইল সফলভাবে পাঠানো হয়েছে',
    testFailed: 'টেস্ট ইমেইল পাঠাতে ব্যর্থ হয়েছে',
    saveSuccess: 'কনফিগারেশন সংরক্ষিত হয়েছে',
    saveFailed: 'কনফিগারেশন সংরক্ষণ করতে ব্যর্থ হয়েছে',
    simulationMode: 'সিমুলেশন মোড',
    simulationModeDesc: 'বর্তমানে কোনো ইমেইল সার্ভিস সংযুক্ত নেই। ইমেইল পাঠানো সিমুলেট করা হবে।',
    enableEmailService: 'ইমেইল সার্ভিস সক্ষম করুন',
    emailServiceDisabled: 'ইমেইল সার্ভিস নিষ্ক্রিয়',
  },
  en: {
    title: 'Email Service Integration',
    sendgrid: 'SendGrid',
    awsSes: 'AWS SES',
    smtp: 'SMTP',
    apiKey: 'API Key',
    apiKeyPlaceholder: 'Enter your API key',
    fromEmail: 'From Email',
    fromName: 'From Name',
    status: 'Status',
    connected: 'Connected',
    notConnected: 'Not Connected',
    testConnection: 'Test Connection',
    saveConfiguration: 'Save Configuration',
    sendTestEmail: 'Send Test Email',
    testEmailAddress: 'Test Email Address',
    configuration: 'Configuration',
    testing: 'Testing',
    success: 'Success',
    error: 'Error',
    smtpHost: 'SMTP Host',
    smtpPort: 'SMTP Port',
    smtpUsername: 'SMTP Username',
    smtpPassword: 'SMTP Password',
    useTls: 'Use TLS',
    awsRegion: 'AWS Region',
    awsAccessKey: 'AWS Access Key',
    awsSecretKey: 'AWS Secret Key',
    verifiedSender: 'Verified Sender',
    setupInstructions: 'Setup Instructions',
    sendgridInstructions: 'To get SendGrid API Key: Go to Settings > API Keys > Create API Key. Select Full Access.',
    awsInstructions: 'For AWS SES, you need your IAM credentials and verified sender email. Go to AWS Console > SES.',
    smtpInstructions: 'Use your email provider\'s SMTP settings. You can use Gmail, Outlook, or any other SMTP server.',
    testSuccess: 'Test email sent successfully',
    testFailed: 'Failed to send test email',
    saveSuccess: 'Configuration saved',
    saveFailed: 'Failed to save configuration',
    simulationMode: 'Simulation Mode',
    simulationModeDesc: 'No email service is currently connected. Email sending will be simulated.',
    enableEmailService: 'Enable Email Service',
    emailServiceDisabled: 'Email Service Disabled',
  }
};

export function EmailServiceIntegration({ language = 'bn' }: EmailServiceIntegrationProps) {
  const t = translations[language];
  const [activeService, setActiveService] = useState<'sendgrid' | 'aws-ses' | 'smtp' | null>(null);
  const [enabled, setEnabled] = useState(false);

  // SendGrid config
  const [sendgridConfig, setSendgridConfig] = useState({
    apiKey: '',
    fromEmail: '',
    fromName: 'Talent Tutor',
  });

  // AWS SES config
  const [awsConfig, setAwsConfig] = useState({
    region: 'us-east-1',
    accessKey: '',
    secretKey: '',
    fromEmail: '',
    fromName: 'Talent Tutor',
  });

  // SMTP config
  const [smtpConfig, setSmtpConfig] = useState({
    host: '',
    port: '587',
    username: '',
    password: '',
    useTls: true,
    fromEmail: '',
    fromName: 'Talent Tutor',
  });

  const [testEmail, setTestEmail] = useState('');
  const [testing, setTesting] = useState(false);

  const testSendGridConnection = async () => {
    if (!sendgridConfig.apiKey || !sendgridConfig.fromEmail) {
      toast.error(language === 'bn' ? 'সব ফিল্ড পূরণ করুন' : 'Please fill all fields');
      return;
    }

    setTesting(true);
    try {
      // In production, this would call your backend to test SendGrid
      await new Promise(resolve => setTimeout(resolve, 1500));
      toast.success(t.testSuccess);
    } catch (error) {
      toast.error(t.testFailed);
    } finally {
      setTesting(false);
    }
  };

  const testAWSConnection = async () => {
    if (!awsConfig.accessKey || !awsConfig.secretKey || !awsConfig.fromEmail) {
      toast.error(language === 'bn' ? 'সব ফিল্ড পূরণ করুন' : 'Please fill all fields');
      return;
    }

    setTesting(true);
    try {
      // In production, this would call your backend to test AWS SES
      await new Promise(resolve => setTimeout(resolve, 1500));
      toast.success(t.testSuccess);
    } catch (error) {
      toast.error(t.testFailed);
    } finally {
      setTesting(false);
    }
  };

  const testSMTPConnection = async () => {
    if (!smtpConfig.host || !smtpConfig.username || !smtpConfig.password) {
      toast.error(language === 'bn' ? 'সব ফিল্ড পূরণ করুন' : 'Please fill all fields');
      return;
    }

    setTesting(true);
    try {
      // In production, this would call your backend to test SMTP
      await new Promise(resolve => setTimeout(resolve, 1500));
      toast.success(t.testSuccess);
    } catch (error) {
      toast.error(t.testFailed);
    } finally {
      setTesting(false);
    }
  };

  const sendTestEmail = async () => {
    if (!testEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(testEmail)) {
      toast.error(language === 'bn' ? 'সঠিক ইমেইল লিখুন' : 'Please enter a valid email');
      return;
    }

    setTesting(true);
    try {
      // In production, this would send a real test email
      await new Promise(resolve => setTimeout(resolve, 2000));
      toast.success(`${t.testSuccess}: ${testEmail}`);
      setTestEmail('');
    } catch (error) {
      toast.error(t.testFailed);
    } finally {
      setTesting(false);
    }
  };

  const saveConfiguration = async () => {
    try {
      // In production, save to backend securely
      localStorage.setItem('emailServiceConfig', JSON.stringify({
        activeService,
        enabled,
        sendgrid: sendgridConfig,
        aws: awsConfig,
        smtp: smtpConfig,
      }));
      toast.success(t.saveSuccess);
    } catch (error) {
      toast.error(t.saveFailed);
    }
  };

  useEffect(() => {
    // Load saved configuration
    try {
      const saved = localStorage.getItem('emailServiceConfig');
      if (saved) {
        const config = JSON.parse(saved);
        setActiveService(config.activeService);
        setEnabled(config.enabled);
        if (config.sendgrid) setSendgridConfig(config.sendgrid);
        if (config.aws) setAwsConfig(config.aws);
        if (config.smtp) setSmtpConfig(config.smtp);
      }
    } catch (error) {
      console.error('Failed to load email config:', error);
    }
  }, []);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="flex items-center gap-2">
            <Zap className="h-6 w-6 text-purple-600" />
            {t.title}
          </h2>
        </div>
        <div className="flex items-center gap-3">
          <Label htmlFor="enable-email">{t.enableEmailService}</Label>
          <Switch
            id="enable-email"
            checked={enabled}
            onCheckedChange={setEnabled}
          />
        </div>
      </div>

      {/* Simulation Mode Warning */}
      {!enabled && (
        <Alert className="bg-orange-50 border-orange-200">
          <AlertCircle className="h-4 w-4 text-orange-600" />
          <AlertDescription className="text-orange-800">
            <strong>{t.simulationMode}:</strong> {t.simulationModeDesc}
          </AlertDescription>
        </Alert>
      )}

      {enabled && (
        <>
          {/* Service Selection */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Card
                className={`p-6 cursor-pointer transition-all ${
                  activeService === 'sendgrid'
                    ? 'border-purple-600 bg-purple-50'
                    : 'hover:border-purple-300'
                }`}
                onClick={() => setActiveService('sendgrid')}
              >
                <div className="flex items-center justify-between mb-3">
                  <Mail className="h-8 w-8 text-purple-600" />
                  {activeService === 'sendgrid' && (
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  )}
                </div>
                <h3 className="mb-1">{t.sendgrid}</h3>
                <p className="text-sm text-muted-foreground">
                  {language === 'bn' ? 'সহজ এবং নির্ভরযোগ্য' : 'Easy and reliable'}
                </p>
              </Card>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Card
                className={`p-6 cursor-pointer transition-all ${
                  activeService === 'aws-ses'
                    ? 'border-purple-600 bg-purple-50'
                    : 'hover:border-purple-300'
                }`}
                onClick={() => setActiveService('aws-ses')}
              >
                <div className="flex items-center justify-between mb-3">
                  <Cloud className="h-8 w-8 text-orange-600" />
                  {activeService === 'aws-ses' && (
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  )}
                </div>
                <h3 className="mb-1">{t.awsSes}</h3>
                <p className="text-sm text-muted-foreground">
                  {language === 'bn' ? 'স্কেলেবল এবং সাশ্রয়ী' : 'Scalable and cost-effective'}
                </p>
              </Card>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Card
                className={`p-6 cursor-pointer transition-all ${
                  activeService === 'smtp'
                    ? 'border-purple-600 bg-purple-50'
                    : 'hover:border-purple-300'
                }`}
                onClick={() => setActiveService('smtp')}
              >
                <div className="flex items-center justify-between mb-3">
                  <Database className="h-8 w-8 text-blue-600" />
                  {activeService === 'smtp' && (
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  )}
                </div>
                <h3 className="mb-1">{t.smtp}</h3>
                <p className="text-sm text-muted-foreground">
                  {language === 'bn' ? 'যেকোনো SMTP সার্ভার' : 'Any SMTP server'}
                </p>
              </Card>
            </motion.div>
          </div>

          {/* Configuration Forms */}
          {activeService && (
            <Card className="p-6">
              <Tabs defaultValue="config">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="config">{t.configuration}</TabsTrigger>
                  <TabsTrigger value="test">{t.testing}</TabsTrigger>
                </TabsList>

                <TabsContent value="config" className="space-y-6 mt-6">
                  {/* SendGrid Configuration */}
                  {activeService === 'sendgrid' && (
                    <>
                      <Alert>
                        <Settings className="h-4 w-4" />
                        <AlertDescription>
                          <strong>{t.setupInstructions}:</strong> {t.sendgridInstructions}
                        </AlertDescription>
                      </Alert>

                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="sg-apikey">{t.apiKey}</Label>
                          <Input
                            id="sg-apikey"
                            type="password"
                            value={sendgridConfig.apiKey}
                            onChange={(e) => setSendgridConfig({ ...sendgridConfig, apiKey: e.target.value })}
                            placeholder={t.apiKeyPlaceholder}
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="sg-email">{t.fromEmail}</Label>
                            <Input
                              id="sg-email"
                              type="email"
                              value={sendgridConfig.fromEmail}
                              onChange={(e) => setSendgridConfig({ ...sendgridConfig, fromEmail: e.target.value })}
                              placeholder="newsletter@talenttutor.com"
                            />
                          </div>

                          <div>
                            <Label htmlFor="sg-name">{t.fromName}</Label>
                            <Input
                              id="sg-name"
                              value={sendgridConfig.fromName}
                              onChange={(e) => setSendgridConfig({ ...sendgridConfig, fromName: e.target.value })}
                              placeholder="Talent Tutor"
                            />
                          </div>
                        </div>

                        <div className="flex gap-2">
                          <Button onClick={testSendGridConnection} disabled={testing}>
                            {testing ? (
                              <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                            ) : (
                              <TestTube className="h-4 w-4 mr-2" />
                            )}
                            {t.testConnection}
                          </Button>
                          <Button onClick={saveConfiguration} variant="default">
                            <Settings className="h-4 w-4 mr-2" />
                            {t.saveConfiguration}
                          </Button>
                        </div>
                      </div>
                    </>
                  )}

                  {/* AWS SES Configuration */}
                  {activeService === 'aws-ses' && (
                    <>
                      <Alert>
                        <Settings className="h-4 w-4" />
                        <AlertDescription>
                          <strong>{t.setupInstructions}:</strong> {t.awsInstructions}
                        </AlertDescription>
                      </Alert>

                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="aws-region">{t.awsRegion}</Label>
                          <Input
                            id="aws-region"
                            value={awsConfig.region}
                            onChange={(e) => setAwsConfig({ ...awsConfig, region: e.target.value })}
                            placeholder="us-east-1"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="aws-access">{t.awsAccessKey}</Label>
                            <Input
                              id="aws-access"
                              type="password"
                              value={awsConfig.accessKey}
                              onChange={(e) => setAwsConfig({ ...awsConfig, accessKey: e.target.value })}
                              placeholder="AKIA..."
                            />
                          </div>

                          <div>
                            <Label htmlFor="aws-secret">{t.awsSecretKey}</Label>
                            <Input
                              id="aws-secret"
                              type="password"
                              value={awsConfig.secretKey}
                              onChange={(e) => setAwsConfig({ ...awsConfig, secretKey: e.target.value })}
                              placeholder="Secret Key"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="aws-email">{t.fromEmail}</Label>
                            <Input
                              id="aws-email"
                              type="email"
                              value={awsConfig.fromEmail}
                              onChange={(e) => setAwsConfig({ ...awsConfig, fromEmail: e.target.value })}
                              placeholder="newsletter@talenttutor.com"
                            />
                          </div>

                          <div>
                            <Label htmlFor="aws-name">{t.fromName}</Label>
                            <Input
                              id="aws-name"
                              value={awsConfig.fromName}
                              onChange={(e) => setAwsConfig({ ...awsConfig, fromName: e.target.value })}
                              placeholder="Talent Tutor"
                            />
                          </div>
                        </div>

                        <div className="flex gap-2">
                          <Button onClick={testAWSConnection} disabled={testing}>
                            {testing ? (
                              <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                            ) : (
                              <TestTube className="h-4 w-4 mr-2" />
                            )}
                            {t.testConnection}
                          </Button>
                          <Button onClick={saveConfiguration} variant="default">
                            <Settings className="h-4 w-4 mr-2" />
                            {t.saveConfiguration}
                          </Button>
                        </div>
                      </div>
                    </>
                  )}

                  {/* SMTP Configuration */}
                  {activeService === 'smtp' && (
                    <>
                      <Alert>
                        <Settings className="h-4 w-4" />
                        <AlertDescription>
                          <strong>{t.setupInstructions}:</strong> {t.smtpInstructions}
                        </AlertDescription>
                      </Alert>

                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="smtp-host">{t.smtpHost}</Label>
                            <Input
                              id="smtp-host"
                              value={smtpConfig.host}
                              onChange={(e) => setSmtpConfig({ ...smtpConfig, host: e.target.value })}
                              placeholder="smtp.gmail.com"
                            />
                          </div>

                          <div>
                            <Label htmlFor="smtp-port">{t.smtpPort}</Label>
                            <Input
                              id="smtp-port"
                              value={smtpConfig.port}
                              onChange={(e) => setSmtpConfig({ ...smtpConfig, port: e.target.value })}
                              placeholder="587"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="smtp-username">{t.smtpUsername}</Label>
                            <Input
                              id="smtp-username"
                              value={smtpConfig.username}
                              onChange={(e) => setSmtpConfig({ ...smtpConfig, username: e.target.value })}
                              placeholder="your@email.com"
                            />
                          </div>

                          <div>
                            <Label htmlFor="smtp-password">{t.smtpPassword}</Label>
                            <Input
                              id="smtp-password"
                              type="password"
                              value={smtpConfig.password}
                              onChange={(e) => setSmtpConfig({ ...smtpConfig, password: e.target.value })}
                              placeholder="App Password"
                            />
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <Switch
                            id="smtp-tls"
                            checked={smtpConfig.useTls}
                            onCheckedChange={(checked) => setSmtpConfig({ ...smtpConfig, useTls: checked })}
                          />
                          <Label htmlFor="smtp-tls">{t.useTls}</Label>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="smtp-email">{t.fromEmail}</Label>
                            <Input
                              id="smtp-email"
                              type="email"
                              value={smtpConfig.fromEmail}
                              onChange={(e) => setSmtpConfig({ ...smtpConfig, fromEmail: e.target.value })}
                              placeholder="newsletter@talenttutor.com"
                            />
                          </div>

                          <div>
                            <Label htmlFor="smtp-name">{t.fromName}</Label>
                            <Input
                              id="smtp-name"
                              value={smtpConfig.fromName}
                              onChange={(e) => setSmtpConfig({ ...smtpConfig, fromName: e.target.value })}
                              placeholder="Talent Tutor"
                            />
                          </div>
                        </div>

                        <div className="flex gap-2">
                          <Button onClick={testSMTPConnection} disabled={testing}>
                            {testing ? (
                              <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                            ) : (
                              <TestTube className="h-4 w-4 mr-2" />
                            )}
                            {t.testConnection}
                          </Button>
                          <Button onClick={saveConfiguration} variant="default">
                            <Settings className="h-4 w-4 mr-2" />
                            {t.saveConfiguration}
                          </Button>
                        </div>
                      </div>
                    </>
                  )}
                </TabsContent>

                <TabsContent value="test" className="space-y-6 mt-6">
                  <div>
                    <h3 className="mb-4">{t.sendTestEmail}</h3>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="test-email">{t.testEmailAddress}</Label>
                        <Input
                          id="test-email"
                          type="email"
                          value={testEmail}
                          onChange={(e) => setTestEmail(e.target.value)}
                          placeholder="test@example.com"
                        />
                      </div>

                      <Button onClick={sendTestEmail} disabled={testing} className="w-full">
                        {testing ? (
                          <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                        ) : (
                          <Send className="h-4 w-4 mr-2" />
                        )}
                        {t.sendTestEmail}
                      </Button>
                    </div>
                  </div>

                  <Alert className="bg-blue-50 border-blue-200">
                    <AlertCircle className="h-4 w-4 text-blue-600" />
                    <AlertDescription className="text-blue-800">
                      {language === 'bn' 
                        ? 'টেস্ট ইমেইল পাঠানোর মাধ্যমে আপনার কনফিগারেশন যাচাই করুন। ইমেইল পেতে কয়েক মিনিট সময় লাগতে পারে।'
                        : 'Verify your configuration by sending a test email. It may take a few minutes to receive the email.'
                      }
                    </AlertDescription>
                  </Alert>
                </TabsContent>
              </Tabs>
            </Card>
          )}
        </>
      )}
    </div>
  );
}
