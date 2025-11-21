import { useState, useEffect, useRef } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';
import { Avatar } from './ui/avatar';
import { ScrollArea } from './ui/scroll-area';
import { Separator } from './ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { ListAvatar } from './ui/profile-avatar';
import {
  Send,
  Paperclip,
  Image as ImageIcon,
  File,
  Smile,
  MoreVertical,
  Phone,
  Video,
  Info,
  Search,
  Star,
  Archive,
  Trash2,
  Check,
  CheckCheck,
  Circle,
  Mic,
  X,
  ChevronLeft,
  Pin,
  Download,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { toast } from 'sonner@2.0.3';
import { notificationSound } from '../utils/notificationSound';

interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: Date;
  read: boolean;
  type: 'text' | 'image' | 'file' | 'audio';
  attachments?: {
    name: string;
    url: string;
    type: string;
    size: number;
  }[];
  replyTo?: {
    id: string;
    content: string;
    senderName: string;
  };
}

interface Conversation {
  id: string;
  otherUser: {
    id: string;
    name: string;
    photo: string;
    role: 'teacher' | 'guardian' | 'student';
    online: boolean;
    lastSeen?: Date;
  };
  lastMessage?: {
    content: string;
    timestamp: Date;
    read: boolean;
    senderId: string;
  };
  unreadCount: number;
  contractId: string;
  subject: string;
  isPinned: boolean;
  isArchived: boolean;
  typing?: boolean;
}

interface RealtimeMessengerProps {
  currentUserId: string;
  currentUserName: string;
  currentUserPhoto: string;
  currentUserRole: 'teacher' | 'guardian' | 'student';
  language: 'bn' | 'en';
  onStartVideoCall?: (conversationId: string) => void;
  onStartAudioCall?: (conversationId: string) => void;
}

const content = {
  bn: {
    messages: 'মেসেজ',
    search: 'খুঁজুন...',
    allConversations: 'সব কথোপকথন',
    unread: 'না পড়া',
    pinned: 'পিন করা',
    archived: 'আর্কাইভ',
    noConversations: 'কোনো মেসেজ নেই',
    noMessages: 'কোনো মেসেজ নেই',
    typeMessage: 'মেসেজ লিখুন...',
    send: 'পাঠান',
    online: 'অনলাইন',
    offline: 'অফলাইন',
    typing: 'টাইপ করছে...',
    today: 'আজ',
    yesterday: 'গতকাল',
    lastSeen: 'শেষ দেখা',
    selectConversation: 'একটি কথোপকথন নির্বাচন করুন',
    videoCall: 'ভিডিও কল',
    audioCall: 'অডিও কল',
    viewProfile: 'প্রোফাইল দেখুন',
    pinConversation: 'পিন করুন',
    unpinConversation: 'আনপিন করুন',
    archiveConversation: 'আর্কাইভ করুন',
    deleteConversation: 'মুছে ফেলুন',
    attachFile: 'ফাইল সংযুক্ত করুন',
    attachImage: 'ছবি সংযুক্ত করুন',
    recordAudio: 'অডিও রেকর্ড করুন',
    teacher: 'শিক্ষক',
    guardian: 'অভিভাবক',
    student: 'ছাত্র/ছাত্রী',
    you: 'আপনি',
    sent: 'পাঠানো হয়েছে',
    delivered: 'ডেলিভার হয়েছে',
    read: 'পড়া হয়েছে',
    replyTo: 'রিপ্লাই',
    download: 'ডাউনলোড',
    delete: 'মুছুন',
    contract: 'চুক্তি',
    subject: 'বিষয়',
  },
  en: {
    messages: 'Messages',
    search: 'Search...',
    allConversations: 'All Conversations',
    unread: 'Unread',
    pinned: 'Pinned',
    archived: 'Archived',
    noConversations: 'No conversations',
    noMessages: 'No messages yet',
    typeMessage: 'Type a message...',
    send: 'Send',
    online: 'Online',
    offline: 'Offline',
    typing: 'typing...',
    today: 'Today',
    yesterday: 'Yesterday',
    lastSeen: 'Last seen',
    selectConversation: 'Select a conversation',
    videoCall: 'Video Call',
    audioCall: 'Audio Call',
    viewProfile: 'View Profile',
    pinConversation: 'Pin Conversation',
    unpinConversation: 'Unpin Conversation',
    archiveConversation: 'Archive',
    deleteConversation: 'Delete',
    attachFile: 'Attach File',
    attachImage: 'Attach Image',
    recordAudio: 'Record Audio',
    teacher: 'Teacher',
    guardian: 'Guardian',
    student: 'Student',
    you: 'You',
    sent: 'Sent',
    delivered: 'Delivered',
    read: 'Read',
    replyTo: 'Reply to',
    download: 'Download',
    delete: 'Delete',
    contract: 'Contract',
    subject: 'Subject',
  },
};

export function RealtimeMessenger({
  currentUserId,
  currentUserName,
  currentUserPhoto,
  currentUserRole,
  language,
  onStartVideoCall,
  onStartAudioCall,
}: RealtimeMessengerProps) {
  const t = content[language];
  
  // State
  const [conversations, setConversations] = useState<Conversation[]>([
    {
      id: '1',
      otherUser: {
        id: 'teacher-1',
        name: 'মোঃ করিম উদ্দিন',
        photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80',
        role: 'teacher',
        online: true,
      },
      lastMessage: {
        content: 'আগামীকাল ক্লাস সকাল ১০টায় হবে',
        timestamp: new Date(Date.now() - 1000 * 60 * 5),
        read: false,
        senderId: 'teacher-1',
      },
      unreadCount: 2,
      contractId: 'contract-1',
      subject: 'গণিত',
      isPinned: true,
      isArchived: false,
      typing: false,
    },
    {
      id: '2',
      otherUser: {
        id: 'guardian-1',
        name: 'রহিমা খাতুন',
        photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80',
        role: 'guardian',
        online: false,
        lastSeen: new Date(Date.now() - 1000 * 60 * 30),
      },
      lastMessage: {
        content: 'ধন্যবাদ স্যার',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
        read: true,
        senderId: currentUserId,
      },
      unreadCount: 0,
      contractId: 'contract-2',
      subject: 'ইংরেজি',
      isPinned: false,
      isArchived: false,
    },
  ]);
  
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [messageInput, setMessageInput] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [isTyping, setIsTyping] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [replyingTo, setReplyingTo] = useState<Message | null>(null);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const typingTimeoutRef = useRef<NodeJS.Timeout>();

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Simulate real-time message reception
  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate incoming message (in real app, this would be Supabase realtime)
      if (selectedConversation && Math.random() > 0.95) {
        handleReceiveMessage({
          id: Date.now().toString(),
          senderId: selectedConversation.otherUser.id,
          receiverId: currentUserId,
          content: 'নমস্কার! কেমন আছেন?',
          timestamp: new Date(),
          read: false,
          type: 'text',
        });
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [selectedConversation]);

  // Load messages when conversation selected
  useEffect(() => {
    if (selectedConversation) {
      loadMessages(selectedConversation.id);
    }
  }, [selectedConversation]);

  const loadMessages = (conversationId: string) => {
    // Mock messages - in real app, fetch from Supabase
    const mockMessages: Message[] = [
      {
        id: '1',
        senderId: selectedConversation?.otherUser.id || '',
        receiverId: currentUserId,
        content: 'আসসালামু আলাইকুম! আপনার ছেলে/মেয়ে কেমন পড়াশোনা করছে?',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24),
        read: true,
        type: 'text',
      },
      {
        id: '2',
        senderId: currentUserId,
        receiverId: selectedConversation?.otherUser.id || '',
        content: 'ওয়ালাইকুম আসসালাম। আলহামদুলিল্লাহ ভালো করছে।',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 23),
        read: true,
        type: 'text',
      },
      {
        id: '3',
        senderId: selectedConversation?.otherUser.id || '',
        receiverId: currentUserId,
        content: 'আগামীকাল ক্লাস সকাল ১০টায় হবে',
        timestamp: new Date(Date.now() - 1000 * 60 * 5),
        read: false,
        type: 'text',
      },
    ];
    setMessages(mockMessages);
  };

  const handleSendMessage = () => {
    if (!messageInput.trim() || !selectedConversation) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      senderId: currentUserId,
      receiverId: selectedConversation.otherUser.id,
      content: messageInput,
      timestamp: new Date(),
      read: false,
      type: 'text',
      replyTo: replyingTo ? {
        id: replyingTo.id,
        content: replyingTo.content,
        senderName: replyingTo.senderId === currentUserId ? t.you : selectedConversation.otherUser.name,
      } : undefined,
    };

    setMessages([...messages, newMessage]);
    setMessageInput('');
    setReplyingTo(null);

    // Update conversation last message
    setConversations(prev =>
      prev.map(conv =>
        conv.id === selectedConversation.id
          ? {
              ...conv,
              lastMessage: {
                content: messageInput,
                timestamp: new Date(),
                read: false,
                senderId: currentUserId,
              },
            }
          : conv
      )
    );

    // Play send sound
    notificationSound.playTypingSound();

    // In real app: Send to Supabase
    // await supabase.from('messages').insert(newMessage)
  };

  const handleReceiveMessage = (message: Message) => {
    setMessages(prev => [...prev, message]);
    
    // Play notification sound
    notificationSound.playMessageSound();

    // Update conversation
    setConversations(prev =>
      prev.map(conv =>
        conv.otherUser.id === message.senderId
          ? {
              ...conv,
              lastMessage: {
                content: message.content,
                timestamp: message.timestamp,
                read: false,
                senderId: message.senderId,
              },
              unreadCount: conv.unreadCount + 1,
            }
          : conv
      )
    );

    // Show browser notification
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification('নতুন মেসেজ', {
        body: message.content,
        icon: selectedConversation?.otherUser.photo,
      });
    }
  };

  const handleTyping = (text: string) => {
    setMessageInput(text);

    // Clear existing timeout
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    // Set typing indicator
    setIsTyping(true);

    // In real app: Send typing indicator to Supabase
    // await supabase.from('typing_indicators').upsert({ user_id: currentUserId, conversation_id: selectedConversation.id })

    // Clear typing after 3 seconds
    typingTimeoutRef.current = setTimeout(() => {
      setIsTyping(false);
    }, 3000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const getTimeLabel = (date: Date) => {
    const now = new Date();
    const diffInDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));

    if (diffInDays === 0) return t.today;
    if (diffInDays === 1) return t.yesterday;
    return date.toLocaleDateString('bn-BD');
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('bn-BD', { hour: '2-digit', minute: '2-digit' });
  };

  const filterConversations = () => {
    let filtered = conversations;

    // Filter by tab
    if (activeTab === 'unread') {
      filtered = filtered.filter(c => c.unreadCount > 0);
    } else if (activeTab === 'pinned') {
      filtered = filtered.filter(c => c.isPinned);
    } else if (activeTab === 'archived') {
      filtered = filtered.filter(c => c.isArchived);
    } else {
      filtered = filtered.filter(c => !c.isArchived);
    }

    // Filter by search
    if (searchQuery) {
      filtered = filtered.filter(c =>
        c.otherUser.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.subject.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Sort: pinned first, then by last message time
    return filtered.sort((a, b) => {
      if (a.isPinned && !b.isPinned) return -1;
      if (!a.isPinned && b.isPinned) return 1;
      const aTime = a.lastMessage?.timestamp.getTime() || 0;
      const bTime = b.lastMessage?.timestamp.getTime() || 0;
      return bTime - aTime;
    });
  };

  const togglePin = (conversationId: string) => {
    setConversations(prev =>
      prev.map(c =>
        c.id === conversationId ? { ...c, isPinned: !c.isPinned } : c
      )
    );
    toast.success(language === 'bn' ? 'পিন আপডেট হয়েছে' : 'Pin updated');
  };

  const toggleArchive = (conversationId: string) => {
    setConversations(prev =>
      prev.map(c =>
        c.id === conversationId ? { ...c, isArchived: !c.isArchived } : c
      )
    );
    toast.success(language === 'bn' ? 'আর্কাইভ আপডেট হয়েছে' : 'Archive updated');
  };

  const filteredConversations = filterConversations();

  return (
    <div className="flex h-[calc(100vh-200px)] bg-white rounded-lg shadow-lg overflow-hidden">
      {/* Conversations List */}
      <div className="w-full md:w-96 border-r flex flex-col">
        {/* Header */}
        <div className="p-4 border-b bg-gradient-to-r from-purple-50 to-pink-50">
          <h2 className="text-xl mb-3">{t.messages}</h2>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder={t.search}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
          <TabsList className="grid w-full grid-cols-4 rounded-none">
            <TabsTrigger value="all" className="text-xs">
              {t.allConversations.split(' ')[0]}
            </TabsTrigger>
            <TabsTrigger value="unread" className="text-xs">
              {t.unread}
              {conversations.filter(c => c.unreadCount > 0).length > 0 && (
                <Badge variant="destructive" className="ml-1 h-4 px-1 text-xs">
                  {conversations.filter(c => c.unreadCount > 0).length}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="pinned" className="text-xs">
              <Pin className="w-3 h-3" />
            </TabsTrigger>
            <TabsTrigger value="archived" className="text-xs">
              <Archive className="w-3 h-3" />
            </TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="flex-1 m-0 overflow-hidden">
            <ScrollArea className="h-full">
              {filteredConversations.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-64 text-gray-400">
                  <MessageIcon className="w-12 h-12 mb-3 opacity-30" />
                  <p>{t.noConversations}</p>
                </div>
              ) : (
                <div className="divide-y">
                  <AnimatePresence>
                    {filteredConversations.map(conversation => (
                      <motion.div
                        key={conversation.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        onClick={() => setSelectedConversation(conversation)}
                        className={`p-4 cursor-pointer hover:bg-gray-50 transition-colors ${
                          selectedConversation?.id === conversation.id ? 'bg-purple-50' : ''
                        } ${conversation.unreadCount > 0 ? 'bg-blue-50/30' : ''}`}
                      >
                        <div className="flex items-start gap-3">
                          <div className="relative">
                            <ListAvatar 
                              src={conversation.otherUser.photo}
                              alt={conversation.otherUser.name}
                              fallback={conversation.otherUser.name.charAt(0)}
                              size="md"
                            />
                            {conversation.otherUser.online && (
                              <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-2 mb-1">
                              <div className="flex items-center gap-2">
                                <h4 className={`text-sm ${conversation.unreadCount > 0 ? 'font-semibold' : ''}`}>
                                  {conversation.otherUser.name}
                                </h4>
                                {conversation.isPinned && (
                                  <Pin className="w-3 h-3 text-purple-600" />
                                )}
                              </div>
                              {conversation.lastMessage && (
                                <span className="text-xs text-gray-500 shrink-0">
                                  {formatTime(conversation.lastMessage.timestamp)}
                                </span>
                              )}
                            </div>
                            <div className="flex items-center gap-2 mb-1">
                              <Badge variant="outline" className="text-xs">
                                {conversation.subject}
                              </Badge>
                            </div>
                            {conversation.typing ? (
                              <p className="text-sm text-purple-600 italic">{t.typing}</p>
                            ) : conversation.lastMessage ? (
                              <div className="flex items-center justify-between">
                                <p className={`text-sm truncate ${conversation.unreadCount > 0 ? 'font-medium' : 'text-gray-600'}`}>
                                  {conversation.lastMessage.senderId === currentUserId && t.you + ': '}
                                  {conversation.lastMessage.content}
                                </p>
                                {conversation.unreadCount > 0 && (
                                  <Badge variant="destructive" className="ml-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                                    {conversation.unreadCount}
                                  </Badge>
                                )}
                              </div>
                            ) : null}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              )}
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {selectedConversation ? (
          <>
            {/* Chat Header */}
            <div className="p-4 border-b flex items-center justify-between bg-gradient-to-r from-purple-50 to-pink-50">
              <div className="flex items-center gap-3">
                <Button
                  variant="ghost"
                  size="sm"
                  className="md:hidden"
                  onClick={() => setSelectedConversation(null)}
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <div className="relative">
                  <ListAvatar 
                    src={selectedConversation.otherUser.photo}
                    alt={selectedConversation.otherUser.name}
                    fallback={selectedConversation.otherUser.name.charAt(0)}
                  />
                  {selectedConversation.otherUser.online && (
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
                  )}
                </div>
                <div>
                  <h3 className="font-semibold">{selectedConversation.otherUser.name}</h3>
                  <p className="text-xs text-gray-600">
                    {selectedConversation.otherUser.online
                      ? t.online
                      : `${t.lastSeen} ${selectedConversation.otherUser.lastSeen ? formatTime(selectedConversation.otherUser.lastSeen) : ''}`
                    }
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {onStartAudioCall && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onStartAudioCall(selectedConversation.id)}
                  >
                    <Phone className="w-4 h-4" />
                  </Button>
                )}
                {onStartVideoCall && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onStartVideoCall(selectedConversation.id)}
                  >
                    <Video className="w-4 h-4" />
                  </Button>
                )}
                <Button variant="ghost" size="sm" onClick={() => togglePin(selectedConversation.id)}>
                  <Pin className={`w-4 h-4 ${selectedConversation.isPinned ? 'text-purple-600' : ''}`} />
                </Button>
                <Button variant="ghost" size="sm">
                  <MoreVertical className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Messages */}
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                <AnimatePresence>
                  {messages.map((message) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className={`flex ${message.senderId === currentUserId ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`max-w-[70%] ${message.senderId === currentUserId ? 'items-end' : 'items-start'} flex flex-col gap-1`}>
                        {message.replyTo && (
                          <div className="text-xs bg-gray-100 p-2 rounded mb-1 border-l-2 border-purple-500">
                            <p className="text-gray-600 mb-1">{t.replyTo} {message.replyTo.senderName}</p>
                            <p className="text-gray-800">{message.replyTo.content}</p>
                          </div>
                        )}
                        <div
                          className={`rounded-2xl px-4 py-2 ${
                            message.senderId === currentUserId
                              ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white'
                              : 'bg-gray-100 text-gray-900'
                          }`}
                        >
                          <p className="text-sm">{message.content}</p>
                        </div>
                        <div className="flex items-center gap-2 px-2">
                          <span className="text-xs text-gray-500">{formatTime(message.timestamp)}</span>
                          {message.senderId === currentUserId && (
                            <span>
                              {message.read ? (
                                <CheckCheck className="w-3 h-3 text-blue-500" />
                              ) : (
                                <Check className="w-3 h-3 text-gray-400" />
                              )}
                            </span>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
                <div ref={messagesEndRef} />
              </div>
              {selectedConversation.typing && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex items-center gap-2 text-gray-500 text-sm mt-2"
                >
                  <div className="flex gap-1">
                    <Circle className="w-2 h-2 animate-bounce" style={{ animationDelay: '0ms' }} />
                    <Circle className="w-2 h-2 animate-bounce" style={{ animationDelay: '150ms' }} />
                    <Circle className="w-2 h-2 animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                  <span>{selectedConversation.otherUser.name} {t.typing}</span>
                </motion.div>
              )}
            </ScrollArea>

            {/* Input Area */}
            <div className="p-4 border-t bg-gray-50">
              {replyingTo && (
                <div className="mb-2 p-2 bg-white rounded border-l-2 border-purple-500 flex items-start justify-between">
                  <div className="flex-1">
                    <p className="text-xs text-gray-600 mb-1">{t.replyTo}</p>
                    <p className="text-sm">{replyingTo.content}</p>
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => setReplyingTo(null)}>
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              )}
              <div className="flex items-end gap-2">
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm">
                    <Paperclip className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <ImageIcon className="w-4 h-4" />
                  </Button>
                </div>
                <Textarea
                  ref={inputRef}
                  value={messageInput}
                  onChange={(e) => handleTyping(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder={t.typeMessage}
                  className="flex-1 min-h-[44px] max-h-32 resize-none"
                  rows={1}
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={!messageInput.trim()}
                  className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-400">
            <div className="text-center">
              <Send className="w-16 h-16 mx-auto mb-4 opacity-30" />
              <p className="text-lg">{t.selectConversation}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
