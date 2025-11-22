import { motion } from 'motion/react';
import { 
  Bot, 
  Cpu
} from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Teacher } from '../utils/teachersData';

interface AIMatchmakerProps {
  teachers: Teacher[];
  onMatchFound: (matches: Teacher[]) => void;
  language: 'bn' | 'en';
}

export function AIMatchmaker({ language }: AIMatchmakerProps) {
  const t = {
    bn: {
      title: "AI স্মার্ট অ্যাসিস্ট্যান্ট",
      subtitle: "আপনার জন্য সেরা শিক্ষক খুঁজে পেতে সাহায্য করছি",
      startBtn: "AI এর সাহায্য নিন",
    },
    en: {
      title: "AI Smart Assistant",
      subtitle: "Helping you find the perfect teacher",
      startBtn: "Ask AI Assistant",
    }
  };

  const currentContent = t[language];

  const handleOpenGlobalChat = () => {
    // Dispatch event to open the global DynamicChatWidget
    window.dispatchEvent(new Event('open-support-chat'));
  };

  return (
    <motion.div 
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="w-full"
    >
      <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-600 text-white shadow-xl shadow-emerald-200/50 cursor-pointer group rounded-3xl"
        onClick={handleOpenGlobalChat}
      >
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-10 group-hover:opacity-20 transition-opacity duration-500 mix-blend-overlay"></div>
        <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10 blur-3xl group-hover:bg-white/20 transition-all duration-500"></div>
        
        <div className="relative p-5 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-5 sm:gap-0">
          <div className="flex items-center gap-4 sm:gap-5 w-full sm:w-auto">
            <div className="h-12 w-12 sm:h-14 sm:w-14 rounded-2xl bg-white/10 backdrop-blur-md flex flex-shrink-0 items-center justify-center shadow-inner border border-white/20 group-hover:scale-110 transition-transform duration-300">
              <Cpu className="h-6 w-6 sm:h-7 sm:w-7 text-emerald-100 animate-pulse" />
            </div>
            <div>
              <h3 className={`text-lg sm:text-2xl font-bold text-white flex items-center gap-2 ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>
                {currentContent.title}
                <Badge variant="secondary" className="bg-white/20 text-white border-0 hover:bg-white/30 text-[10px] sm:text-xs backdrop-blur-sm">Beta</Badge>
              </h3>
              <p className={`text-emerald-50 text-sm sm:text-base mt-0.5 sm:mt-1 ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>{currentContent.subtitle}</p>
            </div>
          </div>
          <Button 
            size="lg" 
            className="w-full sm:w-auto bg-white text-emerald-700 hover:bg-emerald-50 font-semibold shadow-lg group-hover:scale-105 transition-transform rounded-full px-6 sm:px-8"
            onClick={(e) => {
              e.stopPropagation();
              handleOpenGlobalChat();
            }}
          >
            {currentContent.startBtn}
            <Bot className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </Card>
    </motion.div>
  );
}
