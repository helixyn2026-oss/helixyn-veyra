"use client";

import { useState, useEffect } from "react";
import { Send, Search, Bell, Users, MessageSquare, Loader2 } from "lucide-react";
import { getMessages, sendMessage } from "@/app/actions/message";
import { getCurrentUser } from "@/app/actions/auth";
import Link from "next/link";

export default function HRMessages() {
  const [activeChannel, setActiveChannel] = useState("all-hands");
  const [message, setMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [chatHistory, setChatHistory] = useState<any[]>([]);
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchChat = async () => {
    try {
      const data = await getMessages(activeChannel);
      setChatHistory(data);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    async function loadUserAndChat() {
      try {
        const loggedInUser = await getCurrentUser();
        setUser(loggedInUser);
        if (loggedInUser) {
          await fetchChat();
        }
      } catch (e) {
        console.error(e);
      } finally {
        setIsLoading(false);
      }
    }
    loadUserAndChat();
  }, [activeChannel]);

  // Poll for new messages
  useEffect(() => {
    const interval = setInterval(fetchChat, 3000);
    return () => clearInterval(interval);
  }, [activeChannel]);

  const handleSend = async () => {
    if (!message.trim() || !user) return;
    setIsSending(true);

    try {
      await sendMessage({
        content: message,
        senderId: user.id,
        channel: activeChannel
      });
      setMessage("");
      await fetchChat();
    } catch (e) {
      console.error(e);
      alert("Failed to send message");
    } finally {
      setIsSending(false);
    }
  };

  if (isLoading && !user) {
    return (
      <div className="max-w-5xl mx-auto pb-12 flex justify-center mt-20">
         <div className="flex items-center gap-3 text-white">
           <Loader2 className="animate-spin text-orange-500" size={24} />
           Loading communications...
         </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="max-w-5xl mx-auto pb-12 flex flex-col items-center justify-center min-h-[60vh]">
        <div className="bg-slate-900/80 backdrop-blur-md rounded-2xl border border-slate-800 shadow-xl p-8 text-center">
          <p className="text-slate-400 mb-4">Please log in to view or broadcast communications.</p>
          <Link href="/login">
            <button className="px-5 py-2.5 bg-orange-500 hover:bg-orange-600 text-slate-950 rounded-lg font-bold text-xs transition-all">
              Go to Login
            </button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)]">
      <div className="mb-4 flex items-end justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Internal Communications</h1>
          <p className="text-slate-400 text-sm mt-1">Broadcast announcements and message employees.</p>
        </div>
      </div>

      <div className="flex-1 bg-slate-900/80 backdrop-blur-md rounded-2xl border border-slate-800 shadow-xl overflow-hidden flex flex-col md:flex-row">
         <div className="w-full md:w-64 border-r border-slate-800 bg-slate-950/30 flex flex-col">
            <div className="p-4 border-b border-slate-800">
               <div className="w-full py-2 bg-orange-500/10 border border-orange-500/20 text-orange-400 font-bold text-xs rounded-lg flex items-center justify-center gap-2">
                  <Bell size={14} /> Active Broadcaster
               </div>
            </div>
            <div className="flex-1 p-3 space-y-1">
               <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest px-2 mb-2">Channels</div>
               {[
                 { id: 'all-hands', name: 'All Hands', icon: Users },
                 { id: 'hr-updates', name: 'HR Updates', icon: Bell },
                 { id: 'onboarding', name: 'Onboarding Help', icon: MessageSquare }
               ].map(ch => (
                 <button 
                   key={ch.id}
                   onClick={() => setActiveChannel(ch.id)}
                   className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${activeChannel === ch.id ? 'bg-orange-500/10 text-orange-500 border border-orange-500/20' : 'text-slate-400 hover:bg-slate-800 hover:text-white border border-transparent'}`}
                 >
                   <ch.icon size={16} /> {ch.name}
                 </button>
               ))}
            </div>
         </div>
         
         <div className="flex-1 flex flex-col">
            <div className="p-4 border-b border-slate-800 bg-slate-950/30 flex items-center justify-between">
               <h3 className="text-lg font-bold text-white capitalize">{activeChannel.replace('-', ' ')}</h3>
            </div>
            
            <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar bg-slate-950/10">
               {chatHistory.map(msg => {
                 const isSelf = msg.senderId === user.id;
                 return (
                  <div key={msg.id} className={`flex gap-4 max-w-2xl ${isSelf ? 'ml-auto flex-row-reverse' : ''}`}>
                     <div className="w-10 h-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center font-bold text-white shrink-0 uppercase">
                       {msg.sender?.name ? msg.sender.name.split(' ').map((n: string) => n[0]).join('').substring(0, 2) : 'HR'}
                     </div>
                     <div>
                        <div className={`flex items-center gap-2 mb-1 ${isSelf ? 'justify-end' : ''}`}>
                           <span className="text-sm font-bold text-white">{msg.sender?.name || 'HR Department'}</span>
                           <span className="text-[10px] text-slate-500">{new Date(msg.createdAt).toLocaleTimeString()}</span>
                        </div>
                        <div className={`p-4 rounded-2xl text-sm leading-relaxed ${isSelf ? 'bg-orange-500 text-slate-950 rounded-tr-sm' : 'bg-slate-800 border border-slate-700 text-slate-300 rounded-tl-sm'}`}>
                          {msg.content}
                        </div>
                     </div>
                  </div>
                 );
               })}
            </div>
            
            <div className="p-4 border-t border-slate-800 bg-slate-950/50">
               <div className="relative">
                  <input 
                    type="text" 
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                    placeholder={`Message #${activeChannel.replace('-', ' ')}...`} 
                    className="w-full pl-4 pr-12 py-3 bg-slate-900 border border-slate-800 rounded-xl text-sm focus:outline-none focus:border-orange-500/50 text-white" 
                  />
                  <button 
                    onClick={handleSend}
                    disabled={!message.trim() || isSending}
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-orange-500 text-slate-900 rounded-lg hover:bg-orange-400 disabled:opacity-50 transition-colors"
                  >
                     <Send size={16} />
                  </button>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
}
