"use client";

import { useState, useEffect } from "react";
import { Search, MessageSquare, Phone, Video, MoreVertical, Send, Paperclip, Loader2 } from "lucide-react";
import { getMessages, sendMessage } from "@/app/actions/message";
import { getCurrentUser } from "@/app/actions/auth";
import Link from "next/link";

export default function EmployeeMessages() {
  const [message, setMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [chatHistory, setChatHistory] = useState<any[]>([]);
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchChat = async () => {
    try {
      const data = await getMessages('direct');
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

    // Poll for new messages every 3 seconds to simulate real-time chat
    const interval = setInterval(fetchChat, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleSend = async () => {
    if (!message.trim() || !user) return;
    setIsSending(true);
    
    try {
      await sendMessage({
        content: message,
        senderId: user.id,
        channel: 'direct'
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
           <Loader2 className="animate-spin text-teal-500" size={24} />
           Loading chat...
         </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="max-w-5xl mx-auto pb-12 flex flex-col items-center justify-center min-h-[60vh]">
        <div className="bg-slate-900/80 backdrop-blur-md rounded-2xl border border-slate-800 shadow-xl p-8 text-center">
          <p className="text-slate-400 mb-4">Please log in to view your messages.</p>
          <Link href="/login">
            <button className="px-5 py-2.5 bg-teal-500 hover:bg-teal-600 text-slate-950 rounded-lg font-bold text-xs transition-all">
              Go to Login
            </button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)] pb-6">
      <div className="mb-4">
        <h1 className="text-2xl font-bold text-white">Messages</h1>
      </div>

      <div className="flex-1 bg-slate-900/80 backdrop-blur-md rounded-2xl border border-slate-800 shadow-xl overflow-hidden flex flex-col md:flex-row">
         
         {/* Contacts Sidebar */}
         <div className="w-full md:w-80 border-r border-slate-800 flex flex-col bg-slate-950/30">
            <div className="p-4 border-b border-slate-800">
               <div className="relative">
                  <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                  <input type="text" placeholder="Search contacts..." className="w-full pl-9 pr-4 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs focus:outline-none focus:border-teal-500/50 text-white" />
               </div>
            </div>
            <div className="flex-1 overflow-y-auto custom-scrollbar p-2 space-y-1">
               <div className="p-3 bg-slate-800/50 rounded-xl flex items-center gap-3 cursor-pointer border border-slate-700">
                  <div className="relative">
                     <div className="w-10 h-10 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold text-sm">SJ</div>
                     <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-slate-900 rounded-full"></span>
                  </div>
                  <div className="flex-1 overflow-hidden">
                     <div className="flex items-center justify-between mb-0.5">
                        <div className="text-sm font-bold text-white truncate">Sarah Jenkins</div>
                        <div className="text-[10px] text-slate-500">Online</div>
                     </div>
                     <div className="text-xs text-slate-400 truncate">Workspace Direct Chat Channel</div>
                  </div>
               </div>
            </div>
         </div>
         
         {/* Chat Area */}
         <div className="flex-1 flex flex-col min-w-0">
            {/* Chat Header */}
            <div className="h-16 border-b border-slate-800 flex items-center justify-between px-6 bg-slate-950/30">
               <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold text-sm">SJ</div>
                  <div>
                     <div className="text-sm font-bold text-white">Sarah Jenkins</div>
                     <div className="text-xs text-emerald-400 font-medium">Workspace Direct Channel</div>
                  </div>
               </div>
               <div className="flex items-center gap-4 text-slate-400">
                  <button className="hover:text-teal-400 transition-colors"><Phone size={18} /></button>
                  <button className="hover:text-teal-400 transition-colors"><Video size={18} /></button>
                  <button className="hover:text-teal-400 transition-colors"><MoreVertical size={18} /></button>
               </div>
            </div>
            
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar bg-slate-950/10">
               {chatHistory.map(msg => {
                 const isSelf = msg.senderId === user.id;
                 return (
                  <div key={msg.id} className={`flex flex-col ${isSelf ? 'items-end' : 'items-start'}`}>
                     <div className="flex items-end gap-2 max-w-[80%]">
                        {!isSelf && (
                           <div className="w-8 h-8 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold text-xs shrink-0">
                             {msg.sender?.name ? msg.sender.name.split(' ').map((n: string) => n[0]).join('').substring(0, 2) : 'SJ'}
                           </div>
                        )}
                        <div className={`p-4 rounded-2xl ${isSelf ? 'bg-teal-600 text-white rounded-br-sm' : 'bg-slate-800 text-slate-200 rounded-bl-sm border border-slate-700'}`}>
                           <p className="text-sm leading-relaxed">{msg.content}</p>
                        </div>
                     </div>
                     <span className={`text-[10px] text-slate-500 font-medium mt-1 ${isSelf ? 'mr-2' : 'ml-10'}`}>
                       {new Date(msg.createdAt).toLocaleTimeString()}
                     </span>
                  </div>
                 );
               })}
               {isSending && (
                  <div className="flex flex-col items-end">
                     <div className="flex items-end gap-2 max-w-[80%]">
                        <div className="p-4 rounded-2xl bg-teal-600/50 text-white rounded-br-sm flex gap-1">
                           <span className="w-1.5 h-1.5 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                           <span className="w-1.5 h-1.5 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                           <span className="w-1.5 h-1.5 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                         </div>
                      </div>
                   </div>
                )}
             </div>
             
             {/* Input Area */}
             <div className="p-4 border-t border-slate-800 bg-slate-950/50">
                <div className="flex items-center gap-3">
                   <button className="p-2.5 text-slate-400 hover:text-white bg-slate-900 border border-slate-800 rounded-xl transition-colors">
                      <Paperclip size={18} />
                   </button>
                   <input 
                      type="text" 
                      placeholder="Type a message..." 
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                      className="flex-1 px-4 py-3 bg-slate-900 border border-slate-800 rounded-xl text-sm focus:outline-none focus:border-teal-500/50 text-white"
                   />
                   <button 
                      onClick={handleSend}
                      disabled={!message.trim() || isSending}
                      className="p-3 bg-teal-500 text-slate-950 hover:bg-teal-400 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl transition-colors font-bold shadow-[0_0_15px_rgba(20,184,166,0.3)]"
                   >
                      <Send size={18} />
                   </button>
                </div>
             </div>
          </div>
       </div>
    </div>
  );
}
