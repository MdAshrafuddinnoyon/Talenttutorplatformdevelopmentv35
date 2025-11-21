import { useState } from 'react';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Checkbox } from '../components/ui/checkbox';
import { Badge } from '../components/ui/badge';
import { Progress } from '../components/ui/progress';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../components/ui/dialog';
import { Heart, Book, DollarSign, Shirt, ArrowLeft, Package } from 'lucide-react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { DonorAuthDialog } from '../components/DonorAuthDialog';
import { PhysicalDonationForm } from '../components/PhysicalDonationForm';
import { PaymentGatewayDialog } from '../components/PaymentGatewayDialog';
import { ThankYouDialog } from '../components/ThankYouDialog';
import { toast } from 'sonner@2.0.3';

interface DonationPageProps {
  language: 'bn' | 'en';
  setLanguage: (lang: 'bn' | 'en') => void;
  setPage: (page: string) => void;
  announcement?: { title: string; message: string; type: string } | null;
  currentUser?: any;
  setCurrentUser?: (user: any) => void;
}

const content = {
  bn: {
    title: 'যাকাত ও দান করুন',
    subtitle: 'অসহায় শিক্ষার্থীদের সাহায্য করুন',
    backToHome: 'হোমে ফিরুন',
    myDonations: 'আমার দান সমূহ',
    donationType: 'দানের ধরন',
    money: 'অর্থ (বৃত্তি)',
    books: 'বই ও শিক্ষা উপকরণ',
    uniform: 'ইউনিফর্ম ও পোশাক',
    stationery: 'স্টেশনারি',
    amount: 'পরিমাণ',
    amountPlaceholder: 'টাকার পরিমাণ লিখুন',
    description: 'বিস্তারিত (ঐচ্ছিক)',
    descriptionPlaceholder: 'দান সম্পর্কে অতিরিক্ত তথ্য...',
    yourName: 'আপনার নাম',
    email: 'ইমেইল',
    phone: 'মোবাইল',
    anonymous: 'নাম গোপন রাখুন',
    anonymousNote: 'আপনার তথ্য গোপন রাখা হবে এবং রেজিস্ট্রেশন প্রয়োজন হবে না',
    proceedPayment: 'পেমেন্টে এগিয়ে যান',
    donateNow: 'দান করুন',
    totalDonated: 'মোট দান',
    booksCollected: 'সংগৃহীত বই',
    studentsHelped: 'উপকৃত ছাত্র',
    quickAmounts: 'দ্রুত নির্বাচন:',
  },
  en: {
    title: 'Donate Zakat & Charity',
    subtitle: 'Help underprivileged students',
    backToHome: 'Back to Home',
    myDonations: 'My Donations',
    donationType: 'Donation Type',
    money: 'Money (Scholarship)',
    books: 'Books & Materials',
    uniform: 'Uniform & Clothing',
    stationery: 'Stationery',
    amount: 'Amount',
    amountPlaceholder: 'Enter amount',
    description: 'Description (Optional)',
    descriptionPlaceholder: 'Additional information about donation...',
    yourName: 'Your Name',
    email: 'Email',
    phone: 'Phone',
    anonymous: 'Keep Anonymous',
    anonymousNote: 'Your information will be kept private and no registration required',
    proceedPayment: 'Proceed to Payment',
    donateNow: 'Donate Now',
    totalDonated: 'Total Donated',
    booksCollected: 'Books Collected',
    studentsHelped: 'Students Helped',
    quickAmounts: 'Quick Select:',
  }
};

export function DonationPage({ language, setLanguage, setPage, announcement, currentUser, setCurrentUser }: DonationPageProps) {
  const t = content[language];
  
  // Donation Type State
  const [donationType, setDonationType] = useState('money');
  
  // Form Data States
  const [donationAmount, setDonationAmount] = useState('');
  const [donorName, setDonorName] = useState('');
  const [donorEmail, setDonorEmail] = useState('');
  const [donorPhone, setDonorPhone] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [donationDescription, setDonationDescription] = useState('');
  
  // Dialog States
  const [isDonorAuthOpen, setIsDonorAuthOpen] = useState(false);
  const [showPhysicalForm, setShowPhysicalForm] = useState(false);
  const [showPaymentGateway, setShowPaymentGateway] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);
  const [transactionData, setTransactionData] = useState<any>(null);
  
  const isPhysicalDonation = donationType === 'books' || donationType === 'uniform' || donationType === 'stationery';

  const handleDonorLogin = (data: any) => {
    setCurrentUser?.(data);
    toast.success(language === 'bn' ? 'সফলভাবে লগইন হয়েছে!' : 'Successfully logged in!');
    setIsDonorAuthOpen(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // For physical donations, show the dedicated form
    if (isPhysicalDonation) {
      if (!currentUser) {
        toast.info(language === 'bn' ? 'দান করতে আপনাকে রেজিস্ট্রেশন করতে হবে' : 'Please register to donate');
        setIsDonorAuthOpen(true);
        return;
      }
      setShowPhysicalForm(true);
      return;
    }
    
    // For money donation
    if (!donationAmount || Number(donationAmount) <= 0) {
      toast.error(language === 'bn' ? 'সঠিক পরিমাণ লিখুন' : 'Enter valid amount');
      return;
    }
    
    // If not anonymous, require name and phone
    if (!isAnonymous) {
      if (!donorName || !donorPhone) {
        toast.error(language === 'bn' ? 'নাম ও মোবাইল নম্বর দিন' : 'Enter name and phone');
        return;
      }
      
      // If not logged in, show login dialog
      if (!currentUser) {
        toast.info(language === 'bn' ? 'অনুগ্রহ করে লগইন করুন অথবা নাম গোপন রাখুন চেক করুন' : 'Please login or check anonymous');
        setIsDonorAuthOpen(true);
        return;
      }
    }
    
    // Show payment gateway
    setShowPaymentGateway(true);
  };

  const handlePaymentSuccess = (txnData: any) => {
    setTransactionData(txnData);
    setShowPaymentGateway(false);
    setShowThankYou(true);
    
    // Reset form
    setDonationAmount('');
    setDonorName('');
    setDonorEmail('');
    setDonorPhone('');
    setDonationDescription('');
    setIsAnonymous(false);
  };

  const handlePhysicalDonationSuccess = () => {
    setShowPhysicalForm(false);
    toast.success(language === 'bn' ? 'আপনার দান সফলভাবে জমা হয়েছে!' : 'Your donation submitted successfully!');
  };
  
  const handlePhysicalDonationLoginRequired = () => {
    setShowPhysicalForm(false);
    setIsDonorAuthOpen(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50">
      <Header language={language} setLanguage={setLanguage} setPage={setPage} announcement={announcement} />

      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-between mb-6">
            <Button 
              variant="outline" 
              onClick={() => setPage('home')}
              className="gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              {t.backToHome}
            </Button>
            {currentUser && currentUser.role === 'donor' && (
              <Button 
                variant="outline" 
                onClick={() => setPage('donor-dashboard')}
                className="gap-2 bg-gradient-to-r from-rose-50 to-pink-50 border-rose-200 text-rose-700 hover:bg-rose-100"
              >
                <Heart className="w-4 h-4" />
                {t.myDonations}
              </Button>
            )}
          </div>
          <div className="inline-flex items-center gap-2 bg-white px-6 py-3 rounded-full shadow-md mb-6">
            <Heart className="w-5 h-5 text-rose-600" />
            <span className="text-rose-700">
              {language === 'bn' ? 'মানবতার সেবায়' : 'In Service of Humanity'}
            </span>
          </div>
          <h1 className="text-gray-900 mb-4">{t.title}</h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">{t.subtitle}</p>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Card className="p-8 text-center bg-gradient-to-br from-emerald-50 to-white border-2 border-emerald-200 hover:shadow-xl transition-all">
            <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
              <DollarSign className="w-8 h-8 text-white" />
            </div>
            <div className="text-3xl text-gray-900 mb-2">৳ ১২,৫০,০০০</div>
            <p className="text-gray-600">{t.totalDonated}</p>
          </Card>
          <Card className="p-8 text-center bg-gradient-to-br from-teal-50 to-white border-2 border-teal-200 hover:shadow-xl transition-all">
            <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
              <Book className="w-8 h-8 text-white" />
            </div>
            <div className="text-3xl text-gray-900 mb-2">২,৫৪০</div>
            <p className="text-gray-600">{t.booksCollected}</p>
          </Card>
          <Card className="p-8 text-center bg-gradient-to-br from-cyan-50 to-white border-2 border-cyan-200 hover:shadow-xl transition-all">
            <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
              <Heart className="w-8 h-8 text-white" />
            </div>
            <div className="text-3xl text-gray-900 mb-2">৩৫০</div>
            <p className="text-gray-600">{t.studentsHelped}</p>
          </Card>
        </div>

        {/* Donation Form */}
        <div className="max-w-3xl mx-auto">
          <Card className="p-8 shadow-xl border-2 border-gray-100">
            <h2 className="text-gray-900 mb-6">{t.donateNow}</h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Donation Type Selector */}
              <div>
                <Label className="text-lg mb-3 block">{t.donationType}</Label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <Button
                    type="button"
                    variant={donationType === 'money' ? 'default' : 'outline'}
                    className={`h-auto py-6 flex-col gap-2 ${
                      donationType === 'money' ? 'bg-gradient-to-br from-emerald-600 to-teal-600' : ''
                    }`}
                    onClick={() => setDonationType('money')}
                  >
                    <DollarSign className="w-8 h-8" />
                    <span className="text-sm">{t.money}</span>
                  </Button>
                  <Button
                    type="button"
                    variant={donationType === 'books' ? 'default' : 'outline'}
                    className={`h-auto py-6 flex-col gap-2 ${
                      donationType === 'books' ? 'bg-gradient-to-br from-emerald-600 to-teal-600' : ''
                    }`}
                    onClick={() => setDonationType('books')}
                  >
                    <Book className="w-8 h-8" />
                    <span className="text-sm">{t.books}</span>
                  </Button>
                  <Button
                    type="button"
                    variant={donationType === 'uniform' ? 'default' : 'outline'}
                    className={`h-auto py-6 flex-col gap-2 ${
                      donationType === 'uniform' ? 'bg-gradient-to-br from-emerald-600 to-teal-600' : ''
                    }`}
                    onClick={() => setDonationType('uniform')}
                  >
                    <Shirt className="w-8 h-8" />
                    <span className="text-sm">{t.uniform}</span>
                  </Button>
                  <Button
                    type="button"
                    variant={donationType === 'stationery' ? 'default' : 'outline'}
                    className={`h-auto py-6 flex-col gap-2 ${
                      donationType === 'stationery' ? 'bg-gradient-to-br from-emerald-600 to-teal-600' : ''
                    }`}
                    onClick={() => setDonationType('stationery')}
                  >
                    <Package className="w-8 h-8" />
                    <span className="text-sm">{t.stationery}</span>
                  </Button>
                </div>
              </div>

              {/* Money Donation Fields */}
              {donationType === 'money' && (
                <>
                  {/* Amount */}
                  <div>
                    <Label>{t.amount} (টাকা) *</Label>
                    <Input 
                      type="number" 
                      placeholder={t.amountPlaceholder}
                      required 
                      className="text-lg py-6"
                      value={donationAmount}
                      onChange={(e) => setDonationAmount(e.target.value)}
                      min="1"
                    />
                    <div className="flex flex-wrap gap-2 mt-3">
                      <span className="text-sm text-gray-600 self-center mr-2">{t.quickAmounts}</span>
                      {[500, 1000, 2000, 5000, 10000].map((amt) => (
                        <Button 
                          key={amt} 
                          type="button" 
                          variant="outline" 
                          size="sm"
                          onClick={() => setDonationAmount(amt.toString())}
                          className="hover:bg-emerald-50"
                        >
                          ৳ {amt.toLocaleString('bn-BD')}
                        </Button>
                      ))}
                    </div>
                  </div>

                  {/* Description */}
                  <div>
                    <Label>{t.description}</Label>
                    <Textarea 
                      placeholder={t.descriptionPlaceholder}
                      rows={3}
                      value={donationDescription}
                      onChange={(e) => setDonationDescription(e.target.value)}
                    />
                  </div>

                  {/* Anonymous Checkbox */}
                  <div className="flex items-start gap-3 p-4 bg-amber-50 border-2 border-amber-200 rounded-lg">
                    <Checkbox 
                      id="anonymous" 
                      checked={isAnonymous}
                      onCheckedChange={(checked) => setIsAnonymous(checked as boolean)}
                      className="mt-1"
                    />
                    <div className="flex-1">
                      <label htmlFor="anonymous" className="text-gray-900 cursor-pointer flex items-center gap-2">
                        ✨ <strong>{t.anonymous}</strong>
                      </label>
                      <p className="text-xs text-gray-600 mt-1">{t.anonymousNote}</p>
                    </div>
                  </div>

                  {/* Donor Information - Only if NOT anonymous */}
                  {!isAnonymous && (
                    <div className="space-y-4 p-4 bg-gray-50 rounded-lg border-2 border-gray-200">
                      <p className="text-sm text-gray-700">
                        {language === 'bn' ? '📝 দাতার তথ্য' : '📝 Donor Information'}
                      </p>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <Label>{t.yourName} *</Label>
                          <Input 
                            placeholder={language === 'bn' ? 'পূর্ণ নাম' : 'Full Name'}
                            required={!isAnonymous}
                            value={donorName}
                            onChange={(e) => setDonorName(e.target.value)}
                          />
                        </div>
                        <div>
                          <Label>{t.phone} *</Label>
                          <Input 
                            type="tel" 
                            placeholder="01700000000" 
                            required={!isAnonymous}
                            value={donorPhone}
                            onChange={(e) => setDonorPhone(e.target.value)}
                          />
                        </div>
                      </div>
                      <div>
                        <Label>{t.email}</Label>
                        <Input 
                          type="email" 
                          placeholder="email@example.com"
                          value={donorEmail}
                          onChange={(e) => setDonorEmail(e.target.value)}
                        />
                      </div>
                    </div>
                  )}
                </>
              )}

              {/* Physical Donation Note */}
              {isPhysicalDonation && (
                <div className="p-4 bg-blue-50 border-2 border-blue-200 rounded-lg">
                  <p className="text-sm text-blue-800">
                    {language === 'bn' 
                      ? '📸 পরবর্তী ধাপে আপনি আইটেমের বিস্তারিত তথ্য ও ছবি আপলোড করতে পারবেন।'
                      : '📸 In the next step, you can provide item details and upload photos.'}
                  </p>
                </div>
              )}

              {/* Submit Button */}
              <Button 
                type="submit" 
                className="w-full btn-primary py-6 text-lg shadow-lg" 
                size="lg"
              >
                {donationType === 'money' ? t.proceedPayment : t.donateNow}
              </Button>
            </form>
          </Card>
        </div>
      </div>

      <Footer language={language} setPage={setPage} />

      {/* Donor Authentication Dialog */}
      <DonorAuthDialog
        open={isDonorAuthOpen}
        onOpenChange={setIsDonorAuthOpen}
        language={language}
        onSuccess={handleDonorLogin}
      />

      {/* Physical Donation Form Dialog */}
      {showPhysicalForm && (
        <Dialog open={showPhysicalForm} onOpenChange={setShowPhysicalForm}>
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {language === 'bn' 
                  ? donationType === 'books' 
                    ? 'বই ও শিক্ষা উপকরণ দান' 
                    : donationType === 'uniform'
                    ? 'ইউনিফর্ম ও পোশাক দান'
                    : 'স্টেশনারি দান'
                  : donationType === 'books' 
                    ? 'Donate Books & Education Materials' 
                    : donationType === 'uniform'
                    ? 'Donate Uniforms & Clothes'
                    : 'Donate Stationery'
                }
              </DialogTitle>
              <DialogDescription>
                {language === 'bn' 
                  ? 'আপনার দানের তথ্য পূরণ করুন' 
                  : 'Fill in your donation details'
                }
              </DialogDescription>
            </DialogHeader>
            <PhysicalDonationForm
              language={language}
              donationType={donationType as 'books' | 'uniform' | 'stationery'}
              currentUser={currentUser}
              onSuccess={handlePhysicalDonationSuccess}
              onLoginRequired={handlePhysicalDonationLoginRequired}
            />
          </DialogContent>
        </Dialog>
      )}

      {/* Payment Gateway Dialog */}
      <PaymentGatewayDialog
        open={showPaymentGateway}
        onOpenChange={setShowPaymentGateway}
        amount={Number(donationAmount)}
        donorName={isAnonymous ? 'Anonymous' : donorName}
        donationType={t.money}
        onPaymentSuccess={handlePaymentSuccess}
        language={language}
      />

      {/* Thank You Dialog */}
      {transactionData && (
        <ThankYouDialog
          open={showThankYou}
          onOpenChange={setShowThankYou}
          transactionData={transactionData}
          language={language}
          onGoHome={() => {
            setShowThankYou(false);
            setPage('home');
          }}
        />
      )}
    </div>
  );
}
