import { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { 
  Bot, 
  Send, 
  Sparkles, 
  X, 
  RefreshCw,
  MapPin,
  BookOpen
} from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar';
import { Teacher } from '../utils/teachersData';

interface AIMatchmakerProps {
  teachers: Teacher[];
  onMatchFound: (matches: Teacher[]) => void;
  language: 'bn' | 'en';
}

type Message = {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  options?: string[];
  type?: 'text' | 'options' | 'results';
  matches?: Teacher[];
};

type UserPreferences = {
  subject?: string;
  grade?: string;
  medium?: string;
  gender?: string;
  maxRate?: number;
  location?: string;
};

export function AIMatchmaker({ teachers, onMatchFound, language }: AIMatchmakerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [step, setStep] = useState(0);
  const [preferences, setPreferences] = useState<UserPreferences>({});
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const t = {
    bn: {
      title: "AI স্মার্ট ম্যাচমেকার",
      subtitle: "আপনার জন্য সেরা শিক্ষক খুঁজে পেতে সাহায্য করছি",
      startBtn: "AI এর সাহায্য নিন",
      placeholder: "লিখুন...",
      typing: "টাইপ করছে...",
      restart: "নতুন করে শুরু করুন",
      close: "বন্ধ করুন",
      minimized: "AI সাহায্য",
      results: "আমি আপনার জন্য এই সেরা শিক্ষকগুলো খুঁজে পেয়েছি:",
      viewProfile: "প্রোফাইল দেখুন",
      noResults: "দুঃখিত, আপনার চাহিদামত কোনো শিক্ষক পাওয়া যায়নি। আপনি কি ফিল্টারগুলো পরিবর্তন করতে চান?",
      steps: [
        {
          question: "আসসালামু আলাইকুম! আমি ট্যালেন্ট টিউটর AI। আমি আপনাকে সেরা শিক্ষক খুঁজে পেতে সাহায্য করতে পারি। আপনি কোন বিষয়ের জন্য শিক্ষক খুঁজছেন?",
          options: ["গণিত (Math)", "ইংরেজি (English)", "পদার্থবিজ্ঞান (Physics)", "রসায়ন (Chemistry)", "জীববিজ্ঞান (Biology)", "ICT"]
        },
        {
          question: "ধন্যবাদ। ছাত্র/ছাত্রী কোন ক্লাসে বা লেভেলে পড়ে?",
          options: ["Class 6-8", "Class 9-10 (SSC)", "Class 11-12 (HSC)", "University Admission", "English Medium (O/A Level)"]
        },
        {
          question: "আপনার পছন্দের এলাকা কোথায়? (যেমন: মিরপুর, উত্তরা, ধানমন্ডি)",
          options: ["মিরপুর", "উত্তরা", "ধানমন্ডি", "গুলশান", "মোহাম্মদপুর", "ফার্মগেট", "অনলাইন ক্লাস"]
        },
        {
          question: "আপনার বাজেট রেঞ্জ (ঘণ্টা প্রতি) কেমন?",
          options: ["৩০০-৫০০ টাকা", "৫০০-৮০০ টাকা", "৮০০-১০০০ টাকা", "১০০০+ টাকা", "যেকোনো"]
        }
      ]
    },
    en: {
      title: "AI Smart Matchmaker",
      subtitle: "Helping you find the perfect teacher",
      startBtn: "Ask AI Assistant",
      placeholder: "Type here...",
      typing: "Typing...",
      restart: "Start Over",
      close: "Close",
      minimized: "AI Help",
      results: "I found these top teachers for you:",
      viewProfile: "View Profile",
      noResults: "Sorry, I couldn't find any teachers matching your criteria. Would you like to adjust your filters?",
      steps: [
        {
          question: "Hello! I'm Talent Tutor AI. I can help you find the best teacher. What subject do you need help with?",
          options: ["Math", "English", "Physics", "Chemistry", "Biology", "ICT"]
        },
        {
          question: "Great. What class or level is the student in?",
          options: ["Class 6-8", "Class 9-10 (SSC)", "Class 11-12 (HSC)", "University Admission", "English Medium (O/A Level)"]
        },
        {
          question: "What is your preferred location?",
          options: ["Mirpur", "Uttara", "Dhanmondi", "Gulshan", "Mohammadpur", "Farmgate", "Online Class"]
        },
        {
          question: "What is your hourly budget range?",
          options: ["300-500 BDT", "500-800 BDT", "800-1000 BDT", "1000+ BDT", "Any"]
        }
      ]
    }
  };

  const currentContent = t[language];

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      // Initial greeting
      addBotMessage(currentContent.steps[0].question, currentContent.steps[0].options);
    }
  }, [isOpen, language]);

  useEffect(() => {
    // Scroll to bottom when messages change
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping]);

  const addBotMessage = (text: string, options?: string[], matches?: Teacher[]) => {
    setIsTyping(true);
    setTimeout(() => {
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        sender: 'bot',
        text,
        options,
        matches,
        type: matches ? 'results' : (options ? 'options' : 'text')
      }]);
      setIsTyping(false);
    }, 1000);
  };

  const addUserMessage = (text: string) => {
    setMessages(prev => [...prev, {
      id: Date.now().toString(),
      sender: 'user',
      text
    }]);
  };

  const handleOptionClick = (option: string) => {
    addUserMessage(option);
    processStep(option);
  };

  const handleSend = () => {
    if (!inputText.trim()) return;
    addUserMessage(inputText);
    processStep(inputText);
    setInputText('');
  };

  const processStep = (answer: string) => {
    const nextStep = step + 1;
    setStep(nextStep);

    // Update preferences based on step
    const newPreferences = { ...preferences };
    if (step === 0) newPreferences.subject = answer;
    else if (step === 1) newPreferences.grade = answer;
    else if (step === 2) newPreferences.location = answer;
    else if (step === 3) newPreferences.maxRate = parseBudget(answer);
    
    setPreferences(newPreferences);

    if (nextStep < currentContent.steps.length) {
      // Ask next question
      addBotMessage(currentContent.steps[nextStep].question, currentContent.steps[nextStep].options);
    } else {
      // Final step: Find matches
      findMatches(newPreferences);
    }
  };

  const parseBudget = (budgetStr: string): number => {
    if (budgetStr.includes('300-500')) return 500;
    if (budgetStr.includes('500-800')) return 800;
    if (budgetStr.includes('800-1000')) return 1000;
    if (budgetStr.includes('1000+')) return 2000;
    return 5000; // Any
  };

  const findMatches = (prefs: UserPreferences) => {
    // Simulate intelligent matching logic
    const scoredTeachers = teachers.map(teacher => {
      let score = 0;
      
      // Match Subject (fuzzy match)
      const subjectMatch = teacher.subjects.some(s => 
        s.toLowerCase().includes(prefs.subject?.toLowerCase() || '') ||
        (prefs.subject?.toLowerCase() || '').includes(s.toLowerCase())
      );
      if (subjectMatch) score += 5;

      // Match Location
      if (prefs.location === "Online Class" || prefs.location === "অনলাইন ক্লাস") {
         score += 3; 
      } else if (teacher.location.toLowerCase().includes(prefs.location?.toLowerCase() || '')) {
        score += 4;
      }

      // Match Budget
      if (teacher.hourlyRate.min <= (prefs.maxRate || 5000)) {
        score += 2;
      }

      // Bonus for verification and rating
      if (teacher.verified) score += 2;
      if (teacher.rating >= 4.5) score += 2;

      return { ...teacher, score };
    });

    const bestMatches = scoredTeachers
      .filter(t => t.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 3);

    if (bestMatches.length > 0) {
      addBotMessage(currentContent.results, undefined, bestMatches);
      onMatchFound(bestMatches);
    } else {
      addBotMessage(currentContent.noResults, ["Try Again"]);
      // Reset logic slightly to allow retry
      setStep(-1); // Will increment to 0 on next click
    }
  };

  const handleRestart = () => {
    setMessages([]);
    setStep(0);
    setPreferences({});
    addBotMessage(currentContent.steps[0].question, currentContent.steps[0].options);
    onMatchFound([]); // Reset parent filter
  };

  if (!isOpen) {
    return (
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="w-full"
      >
        <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-violet-600/90 to-indigo-600/90 text-white shadow-xl cursor-pointer group"
          onClick={() => setIsOpen(true)}
        >
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-10 group-hover:opacity-20 transition-opacity duration-500"></div>
          <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10 blur-3xl group-hover:bg-white/20 transition-all duration-500"></div>
          
          <div className="relative p-6 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-inner border border-white/30">
                <Sparkles className="h-6 w-6 text-yellow-300 animate-pulse" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  {currentContent.title}
                  <Badge variant="secondary" className="bg-white/20 text-white border-0 hover:bg-white/30 text-xs">New</Badge>
                </h3>
                <p className="text-indigo-100 text-sm mt-1">{currentContent.subtitle}</p>
              </div>
            </div>
            <Button 
              size="lg" 
              variant="secondary" 
              className="bg-white text-indigo-600 hover:bg-indigo-50 font-semibold shadow-lg group-hover:scale-105 transition-transform"
            >
              {currentContent.startBtn}
              <Bot className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </Card>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ height: 100, opacity: 0 }}
      animate={{ height: 'auto', opacity: 1 }}
      className="w-full mb-6"
    >
      <Card className="border-0 shadow-2xl bg-white/80 backdrop-blur-md overflow-hidden flex flex-col h-[80vh] md:h-[500px] ring-1 ring-indigo-100">
        {/* Header */}
        <div className="bg-gradient-to-r from-violet-600 to-indigo-600 p-4 flex items-center justify-between text-white shrink-0">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center border border-white/30">
                <Bot className="h-6 w-6 text-white" />
              </div>
              <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-400 border-2 border-indigo-600"></div>
            </div>
            <div>
              <h3 className="font-bold">{currentContent.title}</h3>
              <p className="text-xs text-indigo-100 flex items-center gap-1">
                <span className="animate-pulse w-1.5 h-1.5 rounded-full bg-green-400 inline-block"></span>
                Online
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={handleRestart} className="text-white hover:bg-white/20 h-8 w-8" title={currentContent.restart}>
              <RefreshCw className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="text-white hover:bg-white/20 h-8 w-8" title={currentContent.close}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Chat Area - Using standard div for scrolling */}
        <div className="flex-1 overflow-y-auto bg-slate-50/50 p-4 space-y-4">
          {messages.map((msg) => (
            <motion.div 
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-[85%] md:max-w-[75%] ${msg.sender === 'user' ? 'order-2' : 'order-1'}`}>
                {/* Avatar */}
                {msg.sender === 'bot' && (
                  <div className="h-6 w-6 rounded-full bg-indigo-100 flex items-center justify-center mb-1">
                     <Bot className="h-3 w-3 text-indigo-600" />
                  </div>
                )}
                
                {/* Bubble */}
                <div 
                  className={`p-3.5 rounded-2xl shadow-sm text-sm leading-relaxed ${
                    msg.sender === 'user' 
                      ? 'bg-indigo-600 text-white rounded-tr-none' 
                      : 'bg-white border border-gray-100 text-gray-700 rounded-tl-none'
                  }`}
                >
                  {msg.text}
                </div>

                {/* Options */}
                {msg.type === 'options' && msg.options && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {msg.options.map((option, idx) => (
                      <Button
                        key={idx}
                        variant="outline"
                        size="sm"
                        onClick={() => handleOptionClick(option)}
                        className="bg-white hover:bg-indigo-50 hover:text-indigo-600 hover:border-indigo-200 transition-all duration-200 rounded-full text-xs"
                      >
                        {option}
                      </Button>
                    ))}
                  </div>
                )}

                {/* Results */}
                {msg.type === 'results' && msg.matches && (
                  <div className="mt-4 space-y-3 w-full min-w-[280px]">
                    {msg.matches.map((teacher) => (
                      <Card key={teacher.id} className="p-3 hover:shadow-md transition-shadow border-l-4 border-l-indigo-500 overflow-hidden">
                         <div className="flex gap-3">
                           <Avatar className="h-12 w-12 border-2 border-white shadow-sm">
                             <AvatarImage src={teacher.photo} />
                             <AvatarFallback>{teacher.name.slice(0,2)}</AvatarFallback>
                           </Avatar>
                           <div className="flex-1 min-w-0">
                             <div className="flex justify-between items-start">
                                <h4 className="font-bold text-gray-900 truncate">{teacher.name}</h4>
                                <div className="flex items-center text-yellow-500 text-xs font-bold">
                                  <Sparkles className="h-3 w-3 mr-1" />
                                  98% Match
                                </div>
                             </div>
                             <div className="text-xs text-gray-500 mt-1 flex items-center gap-2">
                                <span className="flex items-center"><BookOpen className="h-3 w-3 mr-1"/> {teacher.subjects[0]}</span>
                                <span className="flex items-center"><MapPin className="h-3 w-3 mr-1"/> {teacher.location.split(',')[0]}</span>
                             </div>
                             <div className="mt-2 flex justify-between items-center">
                                <span className="font-semibold text-indigo-600 text-sm">৳{teacher.hourlyRate.min}/hr</span>
                                <Button size="sm" variant="default" className="h-7 text-xs bg-indigo-600 hover:bg-indigo-700">
                                  {currentContent.viewProfile}
                                </Button>
                             </div>
                           </div>
                         </div>
                      </Card>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
          
          {isTyping && (
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }}
              className="flex justify-start"
            >
               <div className="bg-white border border-gray-100 p-3 rounded-2xl rounded-tl-none shadow-sm">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></span>
                    <span className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
                    <span className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></span>
                  </div>
               </div>
            </motion.div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-3 bg-white border-t border-gray-100 shrink-0">
          <form 
            onSubmit={(e) => { e.preventDefault(); handleSend(); }}
            className="flex items-center gap-2"
          >
            <Input
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder={currentContent.placeholder}
              className="flex-1 bg-gray-50 border-gray-200 focus-visible:ring-indigo-500"
              disabled={isTyping || (messages.length > 0 && messages[messages.length - 1].type === 'results')}
            />
            <Button 
              type="submit" 
              size="icon" 
              className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-full h-10 w-10 shadow-lg shadow-indigo-200 disabled:opacity-50"
              disabled={!inputText.trim() || isTyping}
            >
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </div>
      </Card>
    </motion.div>
  );
}
