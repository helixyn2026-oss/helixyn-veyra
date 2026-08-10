"use client";

import { useState, useEffect } from "react";
import { Bell, CheckCircle, Info, AlertCircle } from "lucide-react";
import { getNotifications, markNotificationRead, markAllNotificationsRead } from "@/app/actions/workflow";

interface Notification {
  id: string;
  title: string;
  message: string;
  read: boolean;
  role: string | null;
  userId: string | null;
  createdAt: Date;
}

export default function NotificationBell({ userId, role }: { userId?: string; role?: string }) {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const fetchNotifications = async () => {
    try {
      const data = await getNotifications(userId, role);
      setNotifications(data as any[]);
    } catch (e) {
      console.error("Failed to load notifications", e);
    }
  };

  useEffect(() => {
    fetchNotifications();
    // Poll every 5 seconds to simulate real-time updates for the workflow
    const timer = setInterval(fetchNotifications, 5000);
    return () => clearInterval(timer);
  }, [userId, role]);

  const unreadCount = notifications.filter(n => !n.read).length;

  const handleMarkRead = async (id: string) => {
    try {
      await markNotificationRead(id);
      setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
    } catch (e) {
      console.error(e);
    }
  };

  const handleMarkAllRead = async () => {
    try {
      await markAllNotificationsRead(userId, role);
      setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="relative z-50">
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className="p-2 border border-slate-800 rounded-xl bg-slate-900/50 hover:bg-slate-800 text-slate-400 hover:text-white transition-colors relative shadow-inner"
      >
        <Bell size={18} />
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 w-4 h-4 bg-orange-500 rounded-full flex items-center justify-center text-[9px] font-bold text-white shadow-lg shadow-orange-500/20 translate-x-1/3 -translate-y-1/3 animate-pulse">
            {unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0" onClick={() => setIsOpen(false)}></div>
          <div className="absolute right-0 mt-2 w-80 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-4 flex flex-col gap-3 relative z-50">
            <div className="flex items-center justify-between border-b border-slate-850 pb-2">
              <span className="font-bold text-sm text-white">Notifications</span>
              {unreadCount > 0 && (
                <button onClick={handleMarkAllRead} className="text-[10px] font-bold text-orange-400 hover:text-orange-300 transition-colors">
                  Mark all as read
                </button>
              )}
            </div>

            <div className="max-h-60 overflow-y-auto flex flex-col gap-2 custom-scrollbar">
              {notifications.map(notif => (
                <div 
                  key={notif.id} 
                  onClick={() => handleMarkRead(notif.id)}
                  className={`p-3 rounded-xl border transition-all cursor-pointer flex gap-3 ${
                    notif.read 
                      ? 'bg-transparent border-transparent hover:bg-slate-850/50' 
                      : 'bg-slate-850 border-slate-800 hover:border-orange-500/20'
                  }`}
                >
                  <div className={`mt-0.5 shrink-0 ${notif.read ? 'text-slate-500' : 'text-orange-500'}`}>
                    <Info size={14} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-bold text-white truncate mb-0.5">{notif.title}</div>
                    <div className="text-[10px] text-slate-400 leading-normal">{notif.message}</div>
                    <div className="text-[9px] text-slate-500 font-medium mt-1">
                      {new Date(notif.createdAt).toLocaleTimeString()}
                    </div>
                  </div>
                  {!notif.read && (
                    <div className="w-1.5 h-1.5 rounded-full bg-orange-500 mt-1.5 shrink-0 shadow-lg shadow-orange-500/50"></div>
                  )}
                </div>
              ))}

              {notifications.length === 0 && (
                <div className="text-center py-6 text-xs text-slate-500 font-medium">
                  No notifications.
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
