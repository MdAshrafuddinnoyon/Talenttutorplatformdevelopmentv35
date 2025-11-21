import { useState, useRef, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { CardAvatar, MessageAvatar } from './ui/profile-avatar';
import { Badge } from './ui/badge';
import { ScrollArea } from './ui/scroll-area';
import { Send, Paperclip, Smile, MoreVertical, Phone, Video, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { type ChatMessage, type Conversation } from '../utils/upworkFeatures';

interface ChatDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  conversation: Conversation | null;
  language: 'bn' | 'en';
  currentUserId: string;
  onSendMessage: (message: string) => void;
  onScheduleVideo?: () => void;
}

const content = {
  bn: {
    typeMessage: 'মেসেজ লিখুন...',
    send: 'পাঠান',
    online: 'অনলাইন',
    offline: 'অফলাইন',
    videoCall: 'ভিডিও কল',
    voiceCall: 'ভয়েস কল',
    today: 'আজ',
    yesterday: 'গতকাল',
    typing: 'টাইপ করছে...',
    chatWith: 'চ্যাট করুন',
  },
  en: {
    typeMessage: 'Type a message...',
    send: 'Send',
    online: 'Online',
    offline: 'Offline',
    videoCall: 'Video Call',
    voiceCall: 'Voice Call',
    today: 'Today',
    yesterday: 'Yesterday',
    typing: 'typing...',
    chatWith: 'Chat with',
  },
};

export function ChatDialog({
  open,
  onOpenChange,
  conversation,
  language,
  currentUserId,
  onSendMessage,
  onScheduleVideo,
}: ChatDialogProps) {
  const t = content[language];
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Mock messages for demonstration
  useEffect(() => {
    if (conversation) {
      setMessages([
        {
          id: 'msg-1',
          conversationId: conversation.id,
          senderId: conversation.participants[1].id,
          senderName: conversation.participants[1].name,
          senderAvatar: conversation.participants[1].avatar,
          senderType: conversation.participants[1].type,
          message: 'আসসালামু আলাইকুম! আপনার প্রোফাইল দেখে আমি খুবই impressed।',
          timestamp: new Date('2025-01-28T09:00:00'),
          read: true,
        },
        {
          id: 'msg-2',
          conversationId: conversation.id,
          senderId: currentUserId,
          senderName: 'You',
          senderAvatar: '',
          senderType: conversation.participants[0].type,
          message: 'ওয়ালাইকুম আসসালাম। ধন্যবাদ! আমি কিভাবে সাহায্য করতে পারি?',
          timestamp: new Date('2025-01-28T09:05:00'),
          read: true,
        },
        {
          id: 'msg-3',
          conversationId: conversation.id,
          senderId: conversation.participants[1].id,
          senderName: conversation.participants[1].name,
          senderAvatar: conversation.participants[1].avatar,
          senderType: conversation.participants[1].type,
          message: 'আমার ছেলের জন্য গণিতের একজন শিক্ষক দরকার। সে ক্লাস ৯ এ পড়ে।',
          timestamp: new Date('2025-01-28T09:10:00'),
          read: true,
        },
        {
          id: 'msg-4',
          conversationId: conversation.id,
          senderId: currentUserId,
          senderName: 'You',
          senderAvatar: '',
          senderType: conversation.participants[0].type,
          message: 'অবশ্যই! আমি ক্লাস ৯-১০ এর গণিতে বিশেষজ্ঞ। আগামীকাল কি একটা ডেমো ক্লাস arrange করা যায়?',
          timestamp: new Date('2025-01-28T09:15:00'),
          read: true,
        },
        conversation.lastMessage,
      ]);
    }
  }, [conversation, currentUserId]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = () => {
    if (message.trim()) {
      onSendMessage(message);
      const newMessage: ChatMessage = {
        id: `msg-${Date.now()}`,
        conversationId: conversation!.id,
        senderId: currentUserId,
        senderName: 'You',
        senderAvatar: '',
        senderType: conversation!.participants[0].type,
        message: message,
        timestamp: new Date(),
        read: false,
      };
      setMessages([...messages, newMessage]);
      setMessage('');
    }
  };

  if (!conversation) return null;

  const otherParticipant = conversation.participants.find(p => p.id !== currentUserId) || conversation.participants[0];

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString(language === 'bn' ? 'bn-BD' : 'en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl h-[600px] p-0 flex flex-col">
        <DialogHeader className="sr-only">
          <DialogTitle>{t.chatWith} {otherParticipant.name}</DialogTitle>
          <DialogDescription>
            {otherParticipant.online ? t.online : t.offline}
          </DialogDescription>
        </DialogHeader>
        
        {/* Visual Header */}
        <div className="px-6 py-4 border-b bg-gradient-to-r from-teal-50 to-cyan-50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <CardAvatar 
                src={otherParticipant.avatar}
                alt={otherParticipant.name}
                fallback={otherParticipant.name[0]}
                online={otherParticipant.online}
              />
              <div>
                <h2 className="text-lg font-semibold">{otherParticipant.name}</h2>
                <p className="text-sm text-gray-500">
                  {otherParticipant.online ? t.online : t.offline}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {onScheduleVideo && (
                <Button variant="ghost" size="icon" onClick={onScheduleVideo} title={t.videoCall}>
                  <Video className="w-5 h-5 text-teal-600" />
                </Button>
              )}
              <Button variant="ghost" size="icon" title={t.voiceCall}>
                <Phone className="w-5 h-5 text-teal-600" />
              </Button>
              <Button variant="ghost" size="icon">
                <MoreVertical className="w-5 h-5 text-gray-600" />
              </Button>
            </div>
          </div>
        </div>

        {/* Messages */}
        <ScrollArea className="flex-1 px-6 py-4">
          <div ref={scrollRef}>
            <AnimatePresence>
              {messages.map((msg) => {
                const isOwnMessage = msg.senderId === currentUserId;
                return (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex gap-3 mb-4 ${isOwnMessage ? 'flex-row-reverse' : ''}`}
                >
                  {!isOwnMessage && (
                    <MessageAvatar 
                      src={msg.senderAvatar}
                      alt={msg.senderName}
                      fallback={msg.senderName[0]}
                    />
                  )}
                  <div className={`flex flex-col max-w-[70%] ${isOwnMessage ? 'items-end' : 'items-start'}`}>
                    <div
                      className={`px-4 py-2 rounded-2xl ${
                        isOwnMessage
                          ? 'bg-gradient-to-r from-teal-600 to-cyan-600 text-white'
                          : 'bg-gray-100 text-gray-900'
                      }`}
                    >
                      <p className="text-sm leading-relaxed">{msg.message}</p>
                    </div>
                    <span className="text-xs text-gray-500 mt-1 px-2">{formatTime(msg.timestamp)}</span>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
          </div>
        </ScrollArea>

        {/* Input */}
        <div className="px-6 py-4 border-t bg-white">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="shrink-0">
              <Paperclip className="w-5 h-5 text-gray-600" />
            </Button>
            <Button variant="ghost" size="icon" className="shrink-0">
              <Smile className="w-5 h-5 text-gray-600" />
            </Button>
            <Input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
              placeholder={t.typeMessage}
              className="flex-1"
            />
            <Button
              onClick={handleSend}
              disabled={!message.trim()}
              className="bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700"
            >
              <Send className="w-4 h-4 mr-2" />
              {t.send}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
