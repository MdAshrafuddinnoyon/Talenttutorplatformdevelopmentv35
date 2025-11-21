import { useState, useEffect, useRef } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';
import { ScrollArea } from './ui/scroll-area';
import { Avatar } from './ui/avatar';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Separator } from './ui/separator';
import {
  MessageSquare,
  Send,
  Paperclip,
  Phone,
  Video,
  MoreVertical,
  Search,
  Check,
  CheckCheck,
  Clock,
  AlertCircle,
  FileText,
  Download,
  X,
  Edit2,
  Trash2,
  Image as ImageIcon,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { toast } from 'sonner@2.0.3';
import { projectId, publicAnonKey } from '../utils/supabase/info';
import { getApiUrl, getApiHeaders } from '../utils/apiConfig';

interface Message {
  id: string;
  chatRoomId: string;
  contractId: string;
  senderId: string;
  senderName: string;
  senderRole: string;
  message: string;
  attachments?: any[];
  type: 'user' | 'system';
  timestamp: string;
  read: boolean;
  readBy: string[];
  edited?: boolean;
  editedAt?: string | null;
  deleted?: boolean;
}

interface ChatRoom {
  id: string;
  contractId: string;
  participants: Array<{
    id: string;
    name: string;
    role: string;
  }>;
  createdAt: string;
  lastActivity: string;
  unreadCount: Record<string, number>;
  lastMessage?: Message | null;
  totalMessages?: number;
}

interface Contract {
  id: string;
  teacherId: string;
  teacherName: string;
  guardianId: string;
  guardianName: string;
  tuitionId: string;
  tuitionTitle: string;
  agreedRate?: string;
  startDate: string;
  duration?: string;
  status: string;
  chatRoomId: string;
  messageCount: number;
}

interface ContractMessagingSystemProps {
  userId: string;
  userName: string;
  userRole: 'teacher' | 'guardian';
  language?: 'bn' | 'en';
}

const content = {
  bn: {
    messages: 'বার্তা',
    noContracts: 'কোন কন্ট্র্যাক্ট নেই',
    noContractsDesc: 'নিয়োগ পাওয়ার পর এখানে আপনার চ্যাট দেখা যাবে',
    selectChat: 'একটি চ্যাট নির্বাচন করুন',
    selectChatDesc: 'কথোপকথন শুরু করতে বাম দিক থেকে একটি চ্যাট নির্বাচন করুন',
    typeMessage: 'বার্তা লিখুন...',
    send: 'পাঠান',
    search: 'খুঁজুন...',
    contract: 'কন্ট্র্যাক্ট',
    active: 'সক্রিয়',
    completed: 'সম্পন্ন',
    viewContract: 'কন্ট্র্যাক্ট দেখুন',
    attachment: 'ফাইল সংযুক্ত করুন',
    audioCall: 'অডিও কল',
    videoCall: 'ভিডিও কল',
    today: 'আজ',
    yesterday: 'গতকাল',
    edited: 'সম্পাদিত',
    deleted: 'মুছে ফেলা হয়েছে',
    you: 'আপনি',
    online: 'অনলাইন',
    offline: 'অফলাইন',
    typing: 'লিখছেন...',
    loadingMessages: 'বার্তা লোড হচ্ছে...',
    loadingContracts: 'কন্ট্র্যাক্ট লোড হচ্ছে...',
    sendingMessage: 'পাঠানো হচ্ছে...',
    messageSent: 'বার্তা পাঠানো হয়েছে',
    messageFailed: 'বার্তা পাঠাতে ব্যর্থ',
    noMessages: 'কোন বার্তা নেই',
    startConversation: 'কথোপকথন শুরু করুন',
    contractDetails: 'কন্ট্র্যাক্ট বিবরণ',
    tuition: 'টিউশন',
    rate: 'রেট',
    duration: 'সময়কাল',
    startDate: 'শুরুর তারিখ',
    status: 'অবস্থা',
    messageCount: 'মোট বার্তা',
  },
  en: {
    messages: 'Messages',
    noContracts: 'No Contracts',
    noContractsDesc: 'Your chats will appear here after getting hired',
    selectChat: 'Select a Chat',
    selectChatDesc: 'Select a chat from the left to start conversation',
    typeMessage: 'Type a message...',
    send: 'Send',
    search: 'Search...',
    contract: 'Contract',
    active: 'Active',
    completed: 'Completed',
    viewContract: 'View Contract',
    attachment: 'Attach File',
    audioCall: 'Audio Call',
    videoCall: 'Video Call',
    today: 'Today',
    yesterday: 'Yesterday',
    edited: 'Edited',
    deleted: 'Deleted',
    you: 'You',
    online: 'Online',
    offline: 'Offline',
    typing: 'Typing...',
    loadingMessages: 'Loading messages...',
    loadingContracts: 'Loading contracts...',
    sendingMessage: 'Sending...',
    messageSent: 'Message sent',
    messageFailed: 'Failed to send',
    noMessages: 'No messages',
    startConversation: 'Start conversation',
    contractDetails: 'Contract Details',
    tuition: 'Tuition',
    rate: 'Rate',
    duration: 'Duration',
    startDate: 'Start Date',
    status: 'Status',
    messageCount: 'Total Messages',
  },
};

export function ContractMessagingSystem({
  userId,
  userName,
  userRole,
  language = 'bn',
}: ContractMessagingSystemProps) {
  const t = content[language];
  
  const [chatRooms, setChatRooms] = useState<ChatRoom[]>([]);
  const [selectedChatRoom, setSelectedChatRoom] = useState<ChatRoom | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [contractDetailsOpen, setContractDetailsOpen] = useState(false);
  const [selectedContract, setSelectedContract] = useState<Contract | null>(null);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messageInputRef = useRef<HTMLTextAreaElement>(null);

  // Scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Load chat rooms
  useEffect(() => {
    loadChatRooms();
  }, [userId]);

  // Load messages when chat room is selected
  useEffect(() => {
    if (selectedChatRoom) {
      loadMessages(selectedChatRoom.id);
      markMessagesAsRead(selectedChatRoom.id);
    }
  }, [selectedChatRoom]);

  // Scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const loadChatRooms = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        getApiUrl(`chatrooms/${userId}`),
        {
          headers: getApiHeaders(),
        }
      );

      if (!response.ok) {
        console.warn('Chat rooms endpoint returned:', response.status);
        setChatRooms([]);
        setLoading(false);
        return;
      }

      const data = await response.json();
      if (data.success) {
        setChatRooms(data.chatRooms || []);
      } else {
        setChatRooms([]);
      }
    } catch (error) {
      // Silently handle error - chat rooms may not be available yet
      setChatRooms([]);
    } finally {
      setLoading(false);
    }
  };

  const loadMessages = async (chatRoomId: string) => {
    try {
      const response = await fetch(
        getApiUrl(`messages/${chatRoomId}?limit=100`),
        {
          headers: getApiHeaders(),
        }
      );

      if (!response.ok) {
        console.warn('Messages endpoint returned:', response.status);
        setMessages([]);
        return;
      }

      const data = await response.json();
      if (data.success) {
        setMessages(data.messages || []);
      } else {
        setMessages([]);
      }
    } catch (error) {
      console.warn('Messages not available:', error);
      setMessages([]);
    }
  };

  const markMessagesAsRead = async (chatRoomId: string) => {
    try {
      await fetch(
        getApiUrl('messages/read'),
        {
          method: 'POST',
          headers: getApiHeaders(),
          body: JSON.stringify({ chatRoomId, userId }),
        }
      );
      
      // Refresh chat rooms to update unread count
      loadChatRooms();
    } catch (error) {
      console.error('Error marking messages as read:', error);
    }
  };

  const sendMessage = async () => {
    if (!newMessage.trim() || !selectedChatRoom) return;

    try {
      setSending(true);
      const response = await fetch(
        getApiUrl('messages/send'),
        {
          method: 'POST',
          headers: getApiHeaders(),
          body: JSON.stringify({
            chatRoomId: selectedChatRoom.id,
            senderId: userId,
            senderName: userName,
            senderRole: userRole,
            message: newMessage,
          }),
        }
      );

      const data = await response.json();
      if (data.success) {
        setMessages([...messages, data.message]);
        setNewMessage('');
        toast.success(t.messageSent);
        
        // Refresh chat rooms to update last message
        loadChatRooms();
      } else {
        toast.error(data.error || t.messageFailed);
      }
    } catch (error) {
      console.error('Error sending message:', error);
      toast.error(t.messageFailed);
    } finally {
      setSending(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const loadContractDetails = async (contractId: string) => {
    try {
      const response = await fetch(
        getApiUrl(`contracts/details/${contractId}`),
        {
          headers: getApiHeaders(),
        }
      );

      const data = await response.json();
      if (data.success) {
        setSelectedContract(data.contract);
        setContractDetailsOpen(true);
      }
    } catch (error) {
      console.error('Error loading contract:', error);
      toast.error('কন্ট্র্যাক্ট লোড করতে ব্যর্থ');
    }
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (days === 0) {
      return date.toLocaleTimeString('bn-BD', { hour: '2-digit', minute: '2-digit' });
    } else if (days === 1) {
      return t.yesterday;
    } else {
      return date.toLocaleDateString('bn-BD', { day: 'numeric', month: 'short' });
    }
  };

  const formatMessageTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('bn-BD', { hour: '2-digit', minute: '2-digit' });
  };

  const getOtherParticipant = (room: ChatRoom) => {
    return room.participants.find(p => p.id !== userId);
  };

  const filteredChatRooms = chatRooms.filter(room => {
    const other = getOtherParticipant(room);
    return other?.name.toLowerCase().includes(searchTerm.toLowerCase());
  });

  if (loading) {
    return (
      <Card className="p-8 text-center">
        <div className="flex items-center justify-center gap-2">
          <div className="w-5 h-5 border-2 border-emerald-600 border-t-transparent rounded-full animate-spin" />
          <p className="text-gray-600">{t.loadingContracts}</p>
        </div>
      </Card>
    );
  }

  return (
    <div className="h-[calc(100vh-250px)] flex gap-4">
      {/* Chat List Sidebar */}
      <Card className="w-1/3 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="p-4 border-b">
          <h3 className="text-lg font-semibold mb-3">{t.messages}</h3>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder={t.search}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Chat List */}
        <ScrollArea className="flex-1">
          {filteredChatRooms.length === 0 ? (
            <div className="p-8 text-center">
              <MessageSquare className="w-12 h-12 mx-auto mb-3 text-gray-300" />
              <p className="text-gray-600 font-medium">{t.noContracts}</p>
              <p className="text-sm text-gray-400 mt-1">{t.noContractsDesc}</p>
            </div>
          ) : (
            <div className="p-2 space-y-1">
              {filteredChatRooms.map((room) => {
                const other = getOtherParticipant(room);
                const unread = room.unreadCount[userId] || 0;
                const isActive = selectedChatRoom?.id === room.id;

                return (
                  <motion.button
                    key={room.id}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    onClick={() => setSelectedChatRoom(room)}
                    className={`w-full p-3 rounded-lg text-left transition-colors ${
                      isActive
                        ? 'bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200'
                        : 'hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <Avatar className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-white flex-shrink-0">
                        {other?.name.charAt(0)}
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <p className="font-medium text-gray-900 truncate">{other?.name}</p>
                          {room.lastMessage && (
                            <span className="text-xs text-gray-500 flex-shrink-0 ml-2">
                              {formatTime(room.lastMessage.timestamp)}
                            </span>
                          )}
                        </div>
                        {room.lastMessage && (
                          <p className="text-sm text-gray-600 truncate">
                            {room.lastMessage.type === 'system' ? '🤖 ' : ''}
                            {room.lastMessage.message}
                          </p>
                        )}
                        {unread > 0 && (
                          <Badge className="mt-1 bg-emerald-600">{unread}</Badge>
                        )}
                      </div>
                    </div>
                  </motion.button>
                );
              })}
            </div>
          )}
        </ScrollArea>
      </Card>

      {/* Chat Window */}
      <Card className="flex-1 flex flex-col overflow-hidden">
        {!selectedChatRoom ? (
          <div className="flex-1 flex items-center justify-center p-8 text-center">
            <div>
              <MessageSquare className="w-16 h-16 mx-auto mb-4 text-gray-300" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{t.selectChat}</h3>
              <p className="text-gray-600">{t.selectChatDesc}</p>
            </div>
          </div>
        ) : (
          <>
            {/* Chat Header */}
            <div className="p-4 border-b flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-white">
                  {getOtherParticipant(selectedChatRoom)?.name.charAt(0)}
                </Avatar>
                <div>
                  <h3 className="font-semibold">{getOtherParticipant(selectedChatRoom)?.name}</h3>
                  <p className="text-xs text-gray-500">
                    {getOtherParticipant(selectedChatRoom)?.role === 'teacher' ? '👨‍🏫 শিক্ষক' : '👪 অভিভাবক'}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => loadContractDetails(selectedChatRoom.contractId)}
                >
                  <FileText className="w-5 h-5" />
                </Button>
                <Button variant="ghost" size="icon">
                  <Phone className="w-5 h-5" />
                </Button>
                <Button variant="ghost" size="icon">
                  <Video className="w-5 h-5" />
                </Button>
                <Button variant="ghost" size="icon">
                  <MoreVertical className="w-5 h-5" />
                </Button>
              </div>
            </div>

            {/* Messages */}
            <ScrollArea className="flex-1 p-4">
              {messages.length === 0 ? (
                <div className="flex items-center justify-center h-full">
                  <div className="text-center">
                    <MessageSquare className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                    <p className="text-gray-600">{t.noMessages}</p>
                    <p className="text-sm text-gray-400 mt-1">{t.startConversation}</p>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  {messages.map((message) => {
                    const isOwn = message.senderId === userId;
                    const isSystem = message.type === 'system';

                    if (isSystem) {
                      return (
                        <div key={message.id} className="flex justify-center">
                          <div className="bg-blue-50 border border-blue-200 rounded-lg px-4 py-2 max-w-md text-center">
                            <p className="text-sm text-blue-900 whitespace-pre-line">{message.message}</p>
                            <p className="text-xs text-blue-600 mt-1">{formatMessageTime(message.timestamp)}</p>
                          </div>
                        </div>
                      );
                    }

                    return (
                      <motion.div
                        key={message.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`flex ${isOwn ? 'justify-end' : 'justify-start'}`}
                      >
                        <div className={`max-w-[70%] ${isOwn ? 'order-2' : 'order-1'}`}>
                          {!isOwn && (
                            <p className="text-xs text-gray-500 mb-1 ml-1">{message.senderName}</p>
                          )}
                          <div
                            className={`rounded-lg px-4 py-2 ${
                              isOwn
                                ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white'
                                : 'bg-gray-100 text-gray-900'
                            }`}
                          >
                            <p className="text-sm whitespace-pre-line">{message.message}</p>
                            <div className="flex items-center gap-2 mt-1">
                              <span className={`text-xs ${isOwn ? 'text-emerald-100' : 'text-gray-500'}`}>
                                {formatMessageTime(message.timestamp)}
                              </span>
                              {message.edited && (
                                <span className={`text-xs ${isOwn ? 'text-emerald-100' : 'text-gray-500'}`}>
                                  • {t.edited}
                                </span>
                              )}
                              {isOwn && (
                                <div className="ml-auto">
                                  {message.read ? (
                                    <CheckCheck className="w-3 h-3 text-emerald-100" />
                                  ) : (
                                    <Check className="w-3 h-3 text-emerald-100" />
                                  )}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                  <div ref={messagesEndRef} />
                </div>
              )}
            </ScrollArea>

            {/* Message Input */}
            <div className="p-4 border-t">
              <div className="flex items-end gap-2">
                <Button variant="ghost" size="icon" className="flex-shrink-0">
                  <Paperclip className="w-5 h-5" />
                </Button>
                <Textarea
                  ref={messageInputRef}
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder={t.typeMessage}
                  className="flex-1 min-h-[44px] max-h-[120px] resize-none"
                  rows={1}
                />
                <Button
                  onClick={sendMessage}
                  disabled={!newMessage.trim() || sending}
                  className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 flex-shrink-0"
                  size="icon"
                >
                  {sending ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <Send className="w-5 h-5" />
                  )}
                </Button>
              </div>
            </div>
          </>
        )}
      </Card>

      {/* Contract Details Dialog */}
      <Dialog open={contractDetailsOpen} onOpenChange={setContractDetailsOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>{t.contractDetails}</DialogTitle>
            <DialogDescription>
              {language === 'bn' ? 'কন্ট্র্যাক্ট এর বিস্তারিত তথ্য' : 'Contract details'}
            </DialogDescription>
          </DialogHeader>
          {selectedContract && (
            <div className="space-y-4">
              <div>
                <Label className="text-xs text-gray-500">{t.tuition}</Label>
                <p className="font-medium">{selectedContract.tuitionTitle}</p>
              </div>
              <Separator />
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-xs text-gray-500">শিক্ষক</Label>
                  <p className="font-medium">{selectedContract.teacherName}</p>
                </div>
                <div>
                  <Label className="text-xs text-gray-500">অভিভাবক</Label>
                  <p className="font-medium">{selectedContract.guardianName}</p>
                </div>
              </div>
              <Separator />
              {selectedContract.agreedRate && (
                <div>
                  <Label className="text-xs text-gray-500">{t.rate}</Label>
                  <p className="font-medium">{selectedContract.agreedRate}</p>
                </div>
              )}
              {selectedContract.duration && (
                <div>
                  <Label className="text-xs text-gray-500">{t.duration}</Label>
                  <p className="font-medium">{selectedContract.duration}</p>
                </div>
              )}
              <div>
                <Label className="text-xs text-gray-500">{t.startDate}</Label>
                <p className="font-medium">
                  {new Date(selectedContract.startDate).toLocaleDateString('bn-BD', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  })}
                </p>
              </div>
              <div>
                <Label className="text-xs text-gray-500">{t.status}</Label>
                <Badge className={selectedContract.status === 'active' ? 'bg-green-600' : 'bg-gray-600'}>
                  {selectedContract.status === 'active' ? t.active : t.completed}
                </Badge>
              </div>
              <div>
                <Label className="text-xs text-gray-500">{t.messageCount}</Label>
                <p className="font-medium">{selectedContract.messageCount}</p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
