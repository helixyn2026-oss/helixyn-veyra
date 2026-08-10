"use client";

import { useState } from "react";
import { Save, Users, Target, Shield } from "lucide-react";

export default function TLSettings() {
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      alert("Squad Settings saved!");
    }, 600);
  };

  return (
    <div className="flex flex-col gap-6 max-w-4xl mx-auto pb-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Squad Settings</h1>
          <p className="text-slate-400 text-sm mt-1">Configure project rituals and squad permissions.</p>
        </div>
        <button 
          onClick={handleSave}
          disabled={isSaving}
          className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg font-bold text-sm transition-all flex items-center justify-center gap-2 disabled:opacity-50 shadow-[0_0_15px_rgba(79,70,229,0.3)]"
        >
          {isSaving ? 'Saving...' : <><Save size={16} /> Save Changes</>}
        </button>
      </div>

      <div className="space-y-6">
         {/* Rituals Config */}
         <div className="bg-slate-900/80 backdrop-blur-md rounded-2xl border border-slate-800 shadow-xl overflow-hidden">
            <div className="p-6 border-b border-slate-800 flex items-center gap-3 bg-slate-950/30">
               <Target size={18} className="text-indigo-500" />
               <h2 className="text-lg font-bold text-white">Sprint Rituals</h2>
            </div>
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
               <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 ml-1 uppercase tracking-wider">Sprint Duration</label>
                  <select className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-sm focus:outline-none focus:border-indigo-500/50 text-white appearance-none">
                     <option>1 Week</option>
                     <option selected>2 Weeks</option>
                     <option>3 Weeks</option>
                     <option>4 Weeks</option>
                  </select>
               </div>
               <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 ml-1 uppercase tracking-wider">Standup Deadline (Daily)</label>
                  <input type="time" defaultValue="10:00" className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-sm focus:outline-none focus:border-indigo-500/50 text-white [&::-webkit-calendar-picker-indicator]:filter [&::-webkit-calendar-picker-indicator]:invert" />
               </div>
            </div>
         </div>

         {/* Access */}
         <div className="bg-slate-900/80 backdrop-blur-md rounded-2xl border border-slate-800 shadow-xl overflow-hidden">
            <div className="p-6 border-b border-slate-800 flex items-center gap-3 bg-slate-950/30">
               <Shield size={18} className="text-indigo-500" />
               <h2 className="text-lg font-bold text-white">Default Repository Access</h2>
            </div>
            <div className="p-6">
               <div className="space-y-4">
                  {[
                    { title: 'helixyn-core-ui', desc: 'Main frontend monorepo.' },
                    { title: 'helixyn-api-gateway', desc: 'Backend microservices gateway.' },
                    { title: 'helixyn-docs', desc: 'Internal documentation.' }
                  ].map((repo, i) => (
                    <div key={i} className="flex items-center justify-between p-4 bg-slate-950 border border-slate-800 rounded-xl">
                       <div>
                          <div className="text-sm font-bold text-white mb-1">{repo.title}</div>
                          <div className="text-xs text-slate-500 font-medium">{repo.desc}</div>
                       </div>
                       <select className="px-3 py-1.5 bg-slate-800 border border-slate-700 rounded-lg text-xs font-bold text-white focus:outline-none focus:border-indigo-500/50">
                          <option>Read</option>
                          <option selected>Write</option>
                          <option>Admin</option>
                       </select>
                    </div>
                  ))}
               </div>
            </div>
         </div>
      </div>
    </div>
  );
}
