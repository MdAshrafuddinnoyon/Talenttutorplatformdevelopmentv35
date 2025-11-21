import { useState, useRef, useEffect } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { MessageCircle, X, Send, Bot, HelpCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

export function VisitorSupportChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: 'হ্যালো! Talent Tutor-এ স্বাগতম। আমি কিভাবে আপনাকে সাহায্য করতে পারি?',
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Auto-response system for visitors
  const getAutoResponse = (message: string): string => {
    const lowerMsg = message.toLowerCase();
    
    if (lowerMsg.includes('রেজিস্টার') || lowerMsg.includes('register') || lowerMsg.includes('নিবন্ধন')) {
      return `রেজিস্টার করতে:\n\n১. উপরের "নিবন্ধন" বাটনে ক্লিক করুন\n২. আপনার ধরন নির্বাচন করুন (শিক্ষক/অভিভাবক/ছাত্র)\n৩. সব তথ্য পূরণ করুন\n৪. ইমেইল যাচাই করুন\n\nরেজিস্ট্রেশন সম্পূর্ণ বিনামূল্যে!`;
    }
    
    if (lowerMsg.includes('ক্রেডিট') || lowerMsg.includes('credit') || lowerMsg.includes('খরচ')) {
      return `ক্রেডিট সিস্টেম:\n\n👨‍🏫 শিক্ষক: ৫০ ফ্রি ক্রেডিট\n👪 অভিভাবক: ১০০ ফ্রি ক্রেডিট\n\nপ্রতি আবেদনে ২ ক্রেডিট লাগে। আরো ক্রেডিট কিনতে পারবেন।`;
    }
    
    if (lowerMsg.includes('কিভাবে কাজ করে') || lowerMsg.includes('how it works')) {
      return `Talent Tutor কিভাবে কাজ করে:\n\n১. রেজিস্টার করুন (শিক্ষক/অভিভাবক)\n২. প্রোফাইল যাচাই করুন\n৩. শিক্ষক: টিউশন খুঁজুন ও আবেদন করুন\n৪. অভিভাবক: টিউশন পোস্ট করুন\n৫. AI ম্যাচিং সিস্টেম সেরা ম্যাচ খুঁজে দেয়\n৬. সরাসরি যোগাযোগ করুন`;
    }
    
    if (lowerMsg.includes('দান') || lowerMsg.includes('donate') || lowerMsg.includes('যাকাত')) {
      return `দান করার বিকল্প:\n\n💰 যাকাত/দান: অসহায় ছাত্রদের বৃত্তি\n📚 বই দান: পুরাতন বই দান করুন\n👕 ইউনিফর্ম: স্কুল পোশাক দান\n\n"দান করুন" পেজে যান এবং আপনার পছন্দের পদ্ধতি নির্বাচন করুন।`;
    }
    
    if (lowerMsg.includes('সাবস্ক্রিপশন') || lowerMsg.includes('subscription') || lowerMsg.includes('প্ল্যান')) {
      return `সাবস্ক্রিপশন প্ল্যান:\n\n🥉 Basic: ৫০০ টাকা/মাস\n🥈 Premium: ১,৫০০ টাকা/৩মাস\n🥇 Golden: ২,৫০০ টাকা/৬মাস\n\nসব প্ল্যানে বিশেষ সুবিধা আছে। "সাবস্ক্রিপশন" পেজ দেখুন।`;
    }
    
    if (lowerMsg.includes('যাচাই') || lowerMsg.includes('verify') || lowerMsg.includes('verification')) {
      return `শিক্ষক প্রোফাইল যাচাইকরণ প্রক্রিয়া:\n\n✓ জাতীয় পরিচয়পত্র (NID) - ছবি/কপি সহ\n✓ শিক্ষাগত সনদপত্র - SSC/HSC/স্নাতক/স্নাতকোত্তর\n✓ অভিজ্ঞতার সার্টিফিকেট (ঐচ্ছিক)\n✓ প্রোফাইল ছবি\n\nসব ডকুমেন্ট আমাদের টিম ম্যানুয়ালি যাচাই করে। যাচাইকরণ ২৪-৪৮ ঘন্টায় সম্পন্ন হয়। যাচাইকৃত প্রোফাইল বেশি বিশ্বাসযোগ্য এবং অভিভাবকদের কাছে অগ্রাধিকার পায়।`;
    }
    
    if (lowerMsg.includes('লাইব্রেরি') || lowerMsg.includes('library') || lowerMsg.includes('বই')) {
      return `ডিজিটাল লাইব্রেরি:\n\n📖 ২,৫০০+ দানকৃত বই\n🎓 সব ক্লাসের জন্য\n🆓 সম্পূর্ণ বিনামূল্যে\n\nঅসহায় ছাত্রদের জন্য বই সংগ্রহ করুন। "লাইব্রেরি" পেজে যান।`;
    }
    
    if (lowerMsg.includes('পেমেন্ট') || lowerMsg.includes('payment') || lowerMsg.includes('কিভাবে দিব')) {
      return `পেমেন্ট পদ্ধতি:\n\n💳 bKash, Nagad, Rocket\n🏦 ব্যাংক কার্ড (Visa/Mastercard)\n🔒 SSL সিকিউর পেমেন্ট\n\nসব পেমেন্ট এনক্রিপ্টেড এবং নিরাপদ।`;
    }
    
    if (lowerMsg.includes('যোগাযোগ') || lowerMsg.includes('contact') || lowerMsg.includes('সাহায্য')) {
      return `যোগাযোগ:\n\n📧 Email: info@talenttutor.com\n📱 Phone: +৮৮০ ১৭০০-০০০০০০\n⏰ সময়: সকাল ৯টা - রাত ৯টা\n\nঅথবা লগইন করে সরাসরি সাপোর্ট টিমের সাথে চ্যাট করুন।`;
    }
    
    return `ধন্যবাদ আপনার প্রশ্নের জন্য! নিচের বিষয়ে আমি সাহায্য করতে পারি:\n\n• রেজিস্ট্রেশন প্রক্রিয়া\n• ক্রেডিট সিস্টেম\n• কিভাবে কাজ করে\n• দান করার পদ্ধতি\n• সাবস্ক্রিপশন প্ল্যান\n• লাইব্রেরি\n• পেমেন্ট পদ্ধতি\n\nআরো তথ্যের জন্য আপনার প্রশ্ন টাইপ করুন অথবা লগইন করুন।`;
  };

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const newMessage: Message = {
      id: messages.length + 1,
      text: inputMessage,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages([...messages, newMessage]);
    setInputMessage('');
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      const responseMessage: Message = {
        id: messages.length + 2,
        text: getAutoResponse(inputMessage),
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, responseMessage]);
    }, 1000);
  };

  const quickReplies = [
    'কিভাবে রেজিস্টার করব?',
    'ক্রেডিট সিস্টেম কি?',
    'দান করতে চাই',
    'কিভাবে কাজ করে?',
  ];

  return (
    <>
      {/* Chat Toggle Button */}
      <motion.div
        className="fixed bottom-6 left-6 z-50"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 260, damping: 20 }}
      >
        <Button
          onClick={() => setIsOpen(!isOpen)}
          className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-2xl"
          size="icon"
        >
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
              >
                <X className="w-6 h-6" />
              </motion.div>
            ) : (
              <motion.div
                key="open"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
              >
                <HelpCircle className="w-6 h-6" />
              </motion.div>
            )}
          </AnimatePresence>
        </Button>
        
        {!isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute bottom-full mb-2 left-0 bg-white px-3 py-2 rounded-lg shadow-lg text-sm whitespace-nowrap"
          >
            কোনো প্রশ্ন? জিজ্ঞাসা করুন! 💬
          </motion.div>
        )}
      </motion.div>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed bottom-24 left-6 z-50 w-96 max-w-[calc(100vw-3rem)]"
          >
            <Card className="shadow-2xl border-0 overflow-hidden">
              {/* Header */}
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                      <Bot className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-white font-bold">সাহায্য বট</h3>
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                        <span className="text-xs text-blue-100">সবসময় অনলাইন</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-2 text-xs bg-white/10 rounded-lg p-2">
                  💡 লগইন করে সরাসরি সাপোর্ট টিমের সাথে চ্যাট করুন
                </div>
              </div>

              {/* Messages */}
              <div className="h-96 overflow-y-auto p-4 bg-gray-50 space-y-4">
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-[85%] ${message.sender === 'user' ? 'order-2' : 'order-1'}`}>
                      <div
                        className={`rounded-2xl px-4 py-2 ${
                          message.sender === 'user'
                            ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white'
                            : 'bg-white text-gray-900 shadow-md border border-gray-100'
                        }`}
                      >
                        {message.sender === 'bot' && (
                          <div className="flex items-center gap-2 mb-1 text-xs text-blue-600">
                            <Bot className="w-3 h-3" />
                            <span>AI সহায়ক</span>
                          </div>
                        )}
                        <p className="text-sm whitespace-pre-line">{message.text}</p>
                      </div>
                      <div className={`text-xs text-gray-500 mt-1 ${message.sender === 'user' ? 'text-right' : 'text-left'}`}>
                        {message.timestamp.toLocaleTimeString('bn-BD', { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </div>
                  </motion.div>
                ))}

                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex items-center gap-2 text-gray-500"
                  >
                    <div className="bg-white rounded-2xl px-4 py-3 shadow-md border border-gray-100">
                      <div className="flex gap-1">
                        <motion.span
                          className="w-2 h-2 bg-blue-400 rounded-full"
                          animate={{ y: [0, -5, 0] }}
                          transition={{ repeat: Infinity, duration: 0.6, delay: 0 }}
                        />
                        <motion.span
                          className="w-2 h-2 bg-blue-400 rounded-full"
                          animate={{ y: [0, -5, 0] }}
                          transition={{ repeat: Infinity, duration: 0.6, delay: 0.1 }}
                        />
                        <motion.span
                          className="w-2 h-2 bg-blue-400 rounded-full"
                          animate={{ y: [0, -5, 0] }}
                          transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }}
                        />
                      </div>
                    </div>
                  </motion.div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Quick Replies */}
              {messages.length <= 2 && (
                <div className="px-4 py-2 bg-white border-t border-gray-100">
                  <p className="text-xs text-gray-500 mb-2">দ্রুত প্রশ্ন:</p>
                  <div className="flex flex-wrap gap-2">
                    {quickReplies.map((reply) => (
                      <motion.button
                        key={reply}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setInputMessage(reply)}
                        className="text-xs bg-blue-50 hover:bg-blue-100 text-blue-700 px-3 py-1 rounded-full transition-colors border border-blue-200"
                      >
                        {reply}
                      </motion.button>
                    ))}
                  </div>
                </div>
              )}

              {/* Input */}
              <div className="p-4 bg-white border-t border-gray-200">
                <div className="flex gap-2">
                  <Input
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder="প্রশ্ন লিখুন..."
                    className="flex-1"
                  />
                  <Button
                    onClick={handleSendMessage}
                    className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                    size="icon"
                  >
                    <Send className="w-5 h-5" />
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
