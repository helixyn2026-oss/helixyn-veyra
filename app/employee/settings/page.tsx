"use client";

import { useState } from "react";
import { User, Mail, Phone, Lock, Bell, Shield, Save } from "lucide-react";

export default function EmployeeSettings() {
  const [isSaving, setIsSaving] = useState(false);
  
  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      alert("Settings saved successfully!");
    }, 800);
  };

  return (
    <div className="flex flex-col gap-6 max-w-4xl mx-auto pb-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">My Settings</h1>
          <p className="text-slate-400 text-sm mt-1">Manage your profile, notifications, and security preferences.</p>
        </div>
        <button 
          onClick={handleSave}
          disabled={isSaving}
          className="px-6 py-2.5 bg-teal-500 hover:bg-teal-400 text-slate-900 rounded-lg font-bold text-sm transition-all flex items-center justify-center gap-2 disabled:opacity-50 shadow-[0_0_15px_rgba(20,184,166,0.3)]"
        >
          {isSaving ? 'Saving...' : <><Save size={16} /> Save Changes</>}
        </button>
      </div>

      <div className="grid grid-cols-1 gap-8">
         
         {/* Profile Information */}
         <div className="bg-slate-900/80 backdrop-blur-md rounded-2xl border border-slate-800 shadow-xl overflow-hidden">
            <div className="p-6 border-b border-slate-800 flex items-center gap-3 bg-slate-950/30">
               <User size={18} className="text-teal-500" />
               <h2 className="text-lg font-bold text-white">Profile Information</h2>
            </div>
            <div className="p-8">
               <div className="flex flex-col md:flex-row gap-8 items-start">
                  <div className="w-24 h-24 rounded-full bg-slate-800 border-2 border-slate-700 flex flex-col items-center justify-center shrink-0 relative overflow-hidden group cursor-pointer">
                     <span className="text-2xl font-bold text-slate-400 group-hover:opacity-0 transition-opacity">JD</span>
                     <div className="absolute inset-0 bg-slate-900/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <span className="text-xs font-bold text-teal-400">Upload</span>
                     </div>
                  </div>
                  
                  <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                     <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-400 ml-1 uppercase tracking-wider">Full Name</label>
                        <input type="text" defaultValue="John Doe" className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm focus:outline-none focus:border-teal-500/50 text-white" />
                     </div>
                     <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-400 ml-1 uppercase tracking-wider">Title / Designation</label>
                        <input type="text" defaultValue="Frontend Developer" disabled className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-slate-500 cursor-not-allowed opacity-70" />
                     </div>
                     <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-400 ml-1 uppercase tracking-wider">Work Email</label>
                        <div className="relative">
                           <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-600" />
                           <input type="email" defaultValue="john.doe@helixyn.com" disabled className="w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-slate-500 cursor-not-allowed opacity-70" />
                        </div>
                     </div>
                     <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-400 ml-1 uppercase tracking-wider">Phone Number</label>
                        <div className="relative">
                           <Phone size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-600" />
                           <input type="tel" defaultValue="+1 (555) 123-4567" className="w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm focus:outline-none focus:border-teal-500/50 text-white" />
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>

         {/* Notifications */}
         <div className="bg-slate-900/80 backdrop-blur-md rounded-2xl border border-slate-800 shadow-xl overflow-hidden">
            <div className="p-6 border-b border-slate-800 flex items-center gap-3 bg-slate-950/30">
               <Bell size={18} className="text-teal-500" />
               <h2 className="text-lg font-bold text-white">Notification Preferences</h2>
            </div>
            <div className="p-6">
               <div className="space-y-4">
                  {[
                    { title: 'Email Notifications', desc: 'Receive daily digests and important updates via email.' },
                    { title: 'Slack Mentions', desc: 'Forward direct mentions from the platform to Slack.' },
                    { title: 'Task Reminders', desc: 'Get notified when an assigned task is approaching its due date.' }
                  ].map((setting, i) => (
                    <div key={i} className="flex items-center justify-between p-4 bg-slate-950 border border-slate-800 rounded-xl">
                       <div>
                          <div className="text-sm font-bold text-white mb-1">{setting.title}</div>
                          <div className="text-xs text-slate-500 font-medium">{setting.desc}</div>
                       </div>
                       <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" defaultChecked className="sr-only peer" />
                          <div className="w-11 h-6 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-500"></div>
                       </label>
                    </div>
                  ))}
               </div>
            </div>
         </div>

         {/* Security */}
         <div className="bg-slate-900/80 backdrop-blur-md rounded-2xl border border-slate-800 shadow-xl overflow-hidden">
            <div className="p-6 border-b border-slate-800 flex items-center gap-3 bg-slate-950/30">
               <Shield size={18} className="text-teal-500" />
               <h2 className="text-lg font-bold text-white">Security & Access</h2>
            </div>
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
               <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl flex items-center justify-between">
                  <div className="flex items-center gap-3">
                     <Lock size={18} className="text-slate-500" />
                     <div>
                        <div className="text-sm font-bold text-white mb-0.5">Change Password</div>
                        <div className="text-xs text-slate-500">Last changed 5 days ago</div>
                     </div>
                  </div>
                  <button className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded text-xs font-bold transition-colors">Update</button>
               </div>
               
               <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl flex items-center justify-between">
                  <div className="flex items-center gap-3">
                     <Shield size={18} className="text-slate-500" />
                     <div>
                        <div className="text-sm font-bold text-white mb-0.5">Two-Factor Auth</div>
                        <div className="text-xs text-emerald-500 font-bold">Enabled</div>
                     </div>
                  </div>
                  <button className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded text-xs font-bold transition-colors">Configure</button>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
}
