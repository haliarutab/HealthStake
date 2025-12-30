"use client";

import React, { useState, useRef, useEffect } from 'react';
import { 
  Search, 
  MoreVertical, 
  Send, 
  Paperclip, 
  Smile, 
  Phone, 
  Video, 
  CheckCheck,
  MessageSquare 
} from 'lucide-react';

interface Message {
  id: number;
  text: string;
  sender: 'me' | 'patient';
  time: string;
}

interface Chat {
  id: number;
  name: string;
  role: string;
  date: string;
  lastMsg: string;
}

export default function Messages() {
  const [messageText, setMessageText] = useState("");
  const [selectedChatId, setSelectedChatId] = useState<number | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const [chatList] = useState<Chat[]>([
    { id: 0, name: "Ahmed Al-Rashid", role: "Patient", date: "Dec 16", lastMsg: "hello" },
    { id: 1, name: "Sara Smith", role: "Patient", date: "Dec 15", lastMsg: "Waiting for results" },
  ]);

  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: "Hello Ahmed, how are you feeling today?", sender: 'me', time: "12:24 PM" },
    { id: 2, text: "I'm feeling much better, thank you!", sender: 'patient', time: "1:47 PM" },
  ]);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, selectedChatId]);

  const handleSendMessage = () => {
    if (!messageText.trim()) return;

    const newMessage: Message = {
      id: Date.now(),
      text: messageText,
      sender: 'me',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages([...messages, newMessage]);
    setMessageText("");
  };

  const activeChat = chatList.find(chat => chat.id === selectedChatId);

  return (
    /**
     * RESET CONTAINER: 
     * w-full h-full ensures it stretches to the admin sidebar boundaries.
     * If your admin panel has a top navbar, change h-screen to h-[calc(100vh-64px)] 
     */
    <div className="flex w-full h-screen bg-white overflow-hidden absolute inset-0 lg:relative">
      
      {/* --- SIDEBAR (Left) --- */}
      <div className="w-[320px] flex flex-col border-r border-slate-200 shrink-0 bg-white">
        <div className="p-4 pt-6 space-y-4">
          <h1 className="text-xl font-bold text-slate-900">Messages</h1>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input 
              type="text" 
              placeholder="Search conversations..." 
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-md text-sm outline-none focus:ring-1 focus:ring-blue-500/20"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {chatList.map((chat) => (
            <button 
              key={chat.id}
              onClick={() => setSelectedChatId(chat.id)}
              className={`w-full px-4 py-4 flex gap-3 transition-colors text-left border-b border-slate-50 border-l-[3px] ${
                selectedChatId === chat.id 
                  ? 'bg-blue-50/30 border-l-blue-600' 
                  : 'bg-white border-l-transparent hover:bg-slate-50'
              }`}
            >
              <div className="shrink-0">
                <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-semibold text-sm">
                  {chat.name.charAt(0)}
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start">
                  <h3 className="font-bold text-slate-900 text-[14px] truncate">{chat.name}</h3>
                  <span className="text-[11px] text-slate-400 font-medium">{chat.date}</span>
                </div>
                <p className="text-[13px] text-slate-500 truncate mt-0.5">{chat.lastMsg}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* --- CHAT AREA (Right) --- */}
      <div className="flex-1 flex flex-col bg-[#fcfcfd]">
        {selectedChatId !== null && activeChat ? (
          <>
            {/* Header */}
            <div className="px-6 py-3 border-b border-slate-200 flex justify-between items-center bg-white">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-sm">
                  {activeChat.name.charAt(0)}
                </div>
                <div>
                  <h2 className="text-[15px] font-bold text-slate-900 leading-tight">{activeChat.name}</h2>
                  <p className="text-[12px] text-green-500 font-medium">Online</p>
                </div>
              </div>
              <div className="flex items-center gap-5 text-slate-500">
                <button className="hover:text-blue-600 transition-colors"><Phone size={18} /></button>
                <button className="hover:text-blue-600 transition-colors"><Video size={20} /></button>
                <button className="hover:text-blue-600 transition-colors"><MoreVertical size={20} /></button>
              </div>
            </div>

            {/* Messages */}
            <div 
              ref={scrollRef}
              className="flex-1 overflow-y-auto p-6 space-y-4 bg-[#f8fafc]/50"
            >
              <div className="flex justify-center mb-6">
                <span className="px-3 py-1 bg-white border border-slate-100 text-[11px] font-medium text-slate-400 rounded-full shadow-sm">
                  Today
                </span>
              </div>
              
              {messages.map((msg) => (
                <div 
                  key={msg.id} 
                  className={`flex flex-col ${msg.sender === 'me' ? 'items-end' : 'items-start'} space-y-1`}
                >
                  <div className={`max-w-[80%] lg:max-w-[60%] px-4 py-2.5 text-[14px] shadow-sm ${
                    msg.sender === 'me' 
                      ? 'bg-blue-600 text-white rounded-2xl rounded-tr-none' 
                      : 'bg-white text-slate-700 border border-slate-100 rounded-2xl rounded-tl-none'
                  }`}>
                    {msg.text}
                  </div>
                  <div className="flex items-center gap-1.5 px-1">
                    <span className="text-[10px] text-slate-400 font-medium">{msg.time}</span>
                    {msg.sender === 'me' && <CheckCheck size={14} className="text-blue-500" />}
                  </div>
                </div>
              ))}
            </div>

            {/* Input */}
            <div className="px-6 py-4 bg-white border-t border-slate-200">
              <div className="flex items-center gap-3 bg-slate-50 p-1.5 rounded-lg border border-slate-200">
                <button className="p-2 text-slate-400 hover:text-blue-600 transition-colors">
                  <Paperclip size={20} />
                </button>
                <input 
                  type="text" 
                  placeholder="Write a message..." 
                  value={messageText}
                  onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                  onChange={(e) => setMessageText(e.target.value)}
                  className="flex-1 bg-transparent border-none outline-none text-[14px] py-2 text-slate-700 placeholder:text-slate-400"
                />
                <button className="p-2 text-slate-400 hover:text-blue-600 transition-colors">
                  <Smile size={20} />
                </button>
                <button 
                  onClick={handleSendMessage}
                  className="bg-blue-600 text-white p-2.5 rounded-md hover:bg-blue-700 transition-all shadow-md active:scale-95"
                >
                  <Send size={18} fill="currentColor" strokeWidth={0} />
                </button>
              </div>
            </div>
          </>
        ) : (
          /* Empty State */
          <div className="flex-1 flex flex-col items-center justify-center text-center p-8 bg-white">
            <div className="w-20 h-20 bg-blue-50 rounded-3xl flex items-center justify-center mb-5 border border-blue-100/50">
               <MessageSquare className="text-blue-400" size={36} />
            </div>
            <h2 className="text-xl font-bold text-slate-900">Your Inbox</h2>
            <p className="text-slate-500 text-sm max-w-[240px] mt-2 leading-relaxed">
              Select a patient from the left sidebar to view medical history and start a consultation.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}