import { useState, useRef, useEffect } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card } from './ui/card';
import { MessageCircle, X, Send, Bot, HelpCircle, User, Minimize2, Maximize2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot' | 'support';
  timestamp: Date;
}

interface DynamicChatWidgetProps {
  isAuthenticated?: boolean;
  userType?: string;
  userName?: string;
}

export function DynamicChatWidget({ 
  isAuthenticated = false,
  userType,
  userName 
}: DynamicChatWidgetProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const isVisitor = !isAuthenticated;
  
  const getColorScheme = () => {
    if (isVisitor) {
      return {
        gradient: 'from-blue-500 to-indigo-600',
        gradientHover: 'from-blue-600 to-indigo-700',
        userBubble: 'bg-blue-500',
        botBubble: 'bg-gray-100',
        quickReply: 'bg-blue-50 hover:bg-blue-100 text-blue-700 border-blue-200',
        icon: 'text-blue-500',
      };
    }
    
    const schemes = {
      teacher: {
        gradient: 'from-purple-500 to-violet-600',
        userBubble: 'bg-purple-500',
        icon: 'text-purple-500',
      },
      guardian: {
        gradient: 'from-teal-500 to-cyan-600',
        userBubble: 'bg-teal-500',
        icon: 'text-teal-500',
      },
      student: {
        gradient: 'from-green-500 to-emerald-600',
        userBubble: 'bg-green-500',
        icon: 'text-green-500',
      },
      donor: {
        gradient: 'from-orange-500 to-amber-600',
        userBubble: 'bg-orange-500',
        icon: 'text-orange-500',
      },
    };

    const scheme = schemes[userType as keyof typeof schemes] || {
      gradient: 'from-emerald-500 to-teal-600',
      userBubble: 'bg-emerald-500',
      icon: 'text-emerald-500',
    };

    return {
      ...scheme,
      gradientHover: scheme.gradient.replace('500', '600').replace('600', '700'),
      botBubble: 'bg-gray-100',
      quickReply: 'bg-gray-50 hover:bg-gray-100 text-gray-700 border-gray-200',
    };
  };
  
  const colorScheme = getColorScheme();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const welcomeMsg = isVisitor
        ? 'আসসালামু আলাইকুম! 👋 আমি কিভাবে আপনাকে সাহায্য করতে পারি?'
        : `হ্যালো ${userName || ''}! 👋 প্রশ্ন করুন।`;
      
      setMessages([{
        id: 1,
        text: welcomeMsg,
        sender: isVisitor ? 'bot' : 'support',
        timestamp: new Date(),
      }]);
    }
  }, [isOpen]);

  // Listen for global event to open chat
  useEffect(() => {
    const handleOpenChat = () => setIsOpen(true);
    window.addEventListener('open-support-chat', handleOpenChat);
    return () => window.removeEventListener('open-support-chat', handleOpenChat);
  }, []);

  const getVisitorAutoResponse = (message: string): string => {
    const lowerMsg = message.toLowerCase();
    
    const responses: Record<string, string> = {
      'রেজিস্টার|register|নিবন্ধন': '✅ রেজিস্টার করতে:\n\n১. "নিবন্ধন" বাটন ক্লিক করুন\n২. ধরন নির্বাচন করুন\n৩. ফর্ম পূরণ করুন\n\nবিনামূল্যে!',
      'ক্রেডিট|credit': '💳 ক্রেডিট:\n\n👨‍🏫 শিক্ষক: ৫০ ফ্রি\n👪 অভিভাবক: ১০০ ফ্রি\n\nপ্রতি আবেদনে ২ ক্রেডিট।',
      'কিভাবে|how it works': '📖 প্রক্রিয়া:\n\n১. রেজিস্টার করুন\n২. প্রোফাইল তৈরি করুন\n৩. টিউশন খুঁজুন/পোস্ট করুন\n৪. যোগাযোগ করুন',
      'দান|donate|যাকাত': '❤️ দান করুন:\n\n💰 যাকাত/দান\n📚 বই দান\n👕 পোশাক দান\n\n"দান করুন" পেজ দেখুন।',
      'সাবস্ক্রিপশন|subscription': '📦 প্ল্যান:\n\n🥉 Basic: ৫০০৳/মাস\n🥈 Premium: ১,৫০০৳/৩মাস\n🥇 Golden: ২,৫০০৳/৬মাস',
      'যোগাযোগ|contact': '📞 যোগাযোগ:\n\n📧 info@talenttutor.com\n📱 +৮৮০ ১৭০০-০০০০০০\n⏰ ৯AM-৯PM',
    };

    for (const [pattern, response] of Object.entries(responses)) {
      if (new RegExp(pattern, 'i').test(lowerMsg)) {
        return response;
      }
    }
    
    return '💡 বিষয়:\n• রেজিস্ট্রেশন\n• ক্রেডিট\n• দান\n• সাবস্ক্রিপশন\n• যোগাযোগ\n\nপ্রশ্ন লিখুন!';
  };

  const getUserAutoResponse = (message: string): string => {
    const lowerMsg = message.toLowerCase();
    
    if (lowerMsg.includes('ক্রেডিট') || lowerMsg.includes('credit')) {
      return '💳 ড্যাশবোর্ডে ক্রেডিট দেখুন। "ক্রেডিট কিনুন" বাটনে ক্লিক করুন।';
    }
    
    if (lowerMsg.includes('পেমেন্ট') || lowerMsg.includes('payment')) {
      return '💰 পেমেন্ট সমস্যা? সাপোর্ট টিম ২৪ ঘন্টায় সমাধান করবে।';
    }
    
    if (lowerMsg.includes('প্রোফাইল') || lowerMsg.includes('profile')) {
      return '👤 প্রোফাইল আইকন → সম্পাদনা করুন। সম্পূর্ণ প্রোফাইল = বেশি সুযোগ!';
    }
    
    return '✅ সাপোর্ট টিম শীঘ্রই উত্তর দেবে। জরুরি: info@talenttutor.com';
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
      const responseText = isVisitor 
        ? getVisitorAutoResponse(inputMessage)
        : getUserAutoResponse(inputMessage);
      
      const responseMessage: Message = {
        id: messages.length + 2,
        text: responseText,
        sender: isVisitor ? 'bot' : 'support',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, responseMessage]);
      
      if (isMinimized) {
        setUnreadCount(prev => prev + 1);
      }
    }, 800);
  };

  const quickReplies = isVisitor 
    ? ['কিভাবে রেজিস্টার করব?', 'ক্রেডিট কি?', 'দান করতে চাই', 'টিউশন খুঁজুন', 'শিক্ষক খুঁজুন', 'যোগাযোগ করুন']
    : ['ক্রেডিট কিনব', 'পেমেন্ট', 'সাহায্য', 'প্রোফাইল আপডেট', 'টিকেট তৈরি', 'নোটিফিকেশন'];

  const handleQuickReply = (reply: string) => {
    setInputMessage(reply);
    handleSendMessage();
  };

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
    if (isMinimized) {
      setUnreadCount(0);
    }
  };

  return (
    <>
      {/* Floating Chat Button */}
      <motion.div
        className={`fixed bottom-[5.5rem] lg:bottom-4 z-[100] ${isVisitor ? 'left-4' : 'right-4'}`}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 0.5 }}
      >
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          className={`relative w-12 h-12 rounded-full bg-gradient-to-br ${colorScheme.gradient} shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center text-white group`}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: -180, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 180, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <X className="w-5 h-5" />
              </motion.div>
            ) : (
              <motion.div
                key="open"
                initial={{ rotate: 180, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -180, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {isVisitor ? <HelpCircle className="w-5 h-5" /> : <MessageCircle className="w-5 h-5" />}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Unread Badge */}
          {unreadCount > 0 && !isOpen && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-xs text-white font-bold"
            >
              {unreadCount}
            </motion.div>
          )}

          {/* Pulse Effect */}
          {!isOpen && (
            <span className="absolute inset-0 rounded-full bg-gradient-to-br opacity-75 animate-ping" />
          )}
        </motion.button>

        {/* Tooltip */}
        {!isOpen && (
          <motion.div
            initial={{ opacity: 0, x: isVisitor ? -10 : 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1 }}
            className={`absolute top-1/2 -translate-y-1/2 ${isVisitor ? 'left-14' : 'right-14'} bg-gray-900 text-white px-3 py-1.5 rounded-lg text-xs whitespace-nowrap shadow-lg pointer-events-none`}
          >
            {isVisitor ? 'প্রশ্ন আছে? 💬' : 'সাহায্য? 💬'}
            <div className={`absolute top-1/2 -translate-y-1/2 ${isVisitor ? '-left-1' : '-right-1'} w-2 h-2 bg-gray-900 rotate-45`} />
          </motion.div>
        )}
      </motion.div>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className={`fixed bottom-28 lg:bottom-20 z-[99] ${isVisitor ? 'left-4' : 'right-4'} ${
              isMinimized ? 'w-64' : 'w-72 md:w-80'
            } max-w-[calc(100vw-2rem)]`}
          >
            <Card className="shadow-2xl border-0 overflow-hidden bg-white/95 backdrop-blur-sm">
              {/* Compact Header */}
              <div className={`bg-gradient-to-r ${colorScheme.gradient} text-white p-3`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                      {isVisitor ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
                    </div>
                    <div>
                      <h3 className="text-sm">{isVisitor ? 'সাহায্য বট' : 'সাপোর্ট'}</h3>
                      <div className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></span>
                        <span className="text-xs text-white/80">অনলাইন</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-1">
                    <Button
                      onClick={toggleMinimize}
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7 text-white hover:bg-white/20"
                    >
                      {isMinimized ? <Maximize2 className="w-3.5 h-3.5" /> : <Minimize2 className="w-3.5 h-3.5" />}
                    </Button>
                    <Button
                      onClick={() => setIsOpen(false)}
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7 text-white hover:bg-white/20"
                    >
                      <X className="w-3.5 h-3.5" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Messages Area */}
              <AnimatePresence>
                {!isMinimized && (
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: 'auto' }}
                    exit={{ height: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="h-64 md:h-72 overflow-y-auto p-3 space-y-2 bg-gradient-to-b from-gray-50/50 to-white">
                      {messages.map((message) => (
                        <motion.div
                          key={message.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                          <div className={`max-w-[85%] ${message.sender === 'user' ? 'order-1' : 'order-2'}`}>
                            {message.sender !== 'user' && (
                              <div className="flex items-center gap-1.5 mb-1">
                                <div className={`w-5 h-5 rounded-full ${colorScheme.botBubble} flex items-center justify-center`}>
                                  {isVisitor ? <Bot className="w-3 h-3 text-gray-600" /> : <User className="w-3 h-3 text-gray-600" />}
                                </div>
                                <span className="text-xs text-gray-500">
                                  {isVisitor ? 'AI বট' : 'সাপোর্ট'}
                                </span>
                              </div>
                            )}
                            <div
                              className={`rounded-2xl px-3 py-2 ${
                                message.sender === 'user'
                                  ? `${colorScheme.userBubble} text-white`
                                  : `${colorScheme.botBubble} text-gray-800`
                              } shadow-sm`}
                            >
                              <p className="text-xs leading-relaxed whitespace-pre-line font-[Noto_Serif_Bengali]">
                                {message.text}
                              </p>
                            </div>
                            <span className={`text-xs text-gray-400 mt-0.5 block ${message.sender === 'user' ? 'text-right' : 'text-left'}`}>
                              {message.timestamp.toLocaleTimeString('bn-BD', { hour: '2-digit', minute: '2-digit' })}
                            </span>
                          </div>
                        </motion.div>
                      ))}

                      {/* Typing Indicator */}
                      {isTyping && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="flex justify-start"
                        >
                          <div className={`${colorScheme.botBubble} rounded-2xl px-4 py-2.5 shadow-sm`}>
                            <div className="flex gap-1">
                              <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                              <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                              <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                            </div>
                          </div>
                        </motion.div>
                      )}

                      <div ref={messagesEndRef} />
                    </div>

                    {/* Quick Replies */}
                    {messages.length === 1 && (
                      <div className="px-3 pb-2 pt-1 bg-white border-t border-gray-100">
                        <p className="text-xs text-gray-500 mb-2 font-[Noto_Serif_Bengali]">দ্রুত উত্তর:</p>
                        <div className="flex flex-wrap gap-1.5">
                          {quickReplies.map((reply, idx) => (
                            <button
                              key={idx}
                              onClick={() => handleQuickReply(reply)}
                              className={`text-xs px-2.5 py-1.5 rounded-full border transition-all hover:scale-105 ${colorScheme.quickReply} font-[Noto_Serif_Bengali]`}
                            >
                              {reply}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Input Area */}
                    <div className="p-3 bg-white border-t border-gray-100">
                      <div className="flex gap-2">
                        <Input
                          value={inputMessage}
                          onChange={(e) => setInputMessage(e.target.value)}
                          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                          placeholder="মেসেজ লিখুন..."
                          className="flex-1 text-sm h-9 font-[Noto_Serif_Bengali] border-gray-200 focus:ring-2 focus:ring-offset-0"
                        />
                        <Button
                          onClick={handleSendMessage}
                          disabled={!inputMessage.trim()}
                          size="icon"
                          className={`h-9 w-9 bg-gradient-to-r ${colorScheme.gradient} hover:${colorScheme.gradientHover} disabled:opacity-50`}
                        >
                          <Send className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Minimized State */}
              {isMinimized && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="p-3 text-center bg-white"
                >
                  <p className="text-sm text-gray-600 font-[Noto_Serif_Bengali]">
                    চ্যাট মিনিমাইজড
                  </p>
                  {unreadCount > 0 && (
                    <p className="text-xs text-gray-500 mt-1">
                      {unreadCount} নতুন মেসেজ
                    </p>
                  )}
                </motion.div>
              )}
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
