"use client";

import { useState } from "react";
import { Settings, Save, Shield, Bell, Briefcase } from "lucide-react";

export default function HRSettings() {
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      alert("HR Settings saved successfully!");
    }, 600);
  };

  return (
    <div className="flex flex-col gap-6 max-w-4xl mx-auto pb-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">HR Configuration</h1>
          <p className="text-slate-400 text-sm mt-1">Configure global HR workflows and automation.</p>
        </div>
        <button 
          onClick={handleSave}
          disabled={isSaving}
          className="px-6 py-2.5 bg-orange-500 hover:bg-orange-600 text-slate-900 rounded-lg font-bold text-sm transition-all flex items-center justify-center gap-2 disabled:opacity-50 shadow-[0_0_15px_rgba(249,115,22,0.3)]"
        >
          {isSaving ? 'Saving...' : <><Save size={16} /> Save Config</>}
        </button>
      </div>

      <div className="space-y-6">
         {/* Automation Config */}
         <div className="bg-slate-900/80 backdrop-blur-md rounded-2xl border border-slate-800 shadow-xl overflow-hidden">
            <div className="p-6 border-b border-slate-800 flex items-center gap-3 bg-slate-950/30">
               <Briefcase size={18} className="text-orange-500" />
               <h2 className="text-lg font-bold text-white">Onboarding Automation (n8n Webhooks)</h2>
            </div>
            <div className="p-6 space-y-4">
               <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 ml-1 uppercase tracking-wider">New Hire Trigger URL</label>
                  <input type="text" defaultValue="https://n8n.helixyn.com/webhook/new-hire" className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm focus:outline-none focus:border-orange-500/50 text-white font-mono" />
               </div>
               <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 ml-1 uppercase tracking-wider">CEO Approval Trigger URL</label>
                  <input type="text" defaultValue="https://n8n.helixyn.com/webhook/ceo-approval" className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm focus:outline-none focus:border-orange-500/50 text-white font-mono" />
               </div>
            </div>
         </div>

         {/* Access & Compliance */}
         <div className="bg-slate-900/80 backdrop-blur-md rounded-2xl border border-slate-800 shadow-xl overflow-hidden">
            <div className="p-6 border-b border-slate-800 flex items-center gap-3 bg-slate-950/30">
               <Shield size={18} className="text-orange-500" />
               <h2 className="text-lg font-bold text-white">Compliance Requirements</h2>
            </div>
            <div className="p-6">
               <div className="space-y-4">
                  {[
                    { title: 'Require W-4 before Onboarding', desc: 'Block access to engineering systems until W-4 is verified.' },
                    { title: 'Mandatory Security Training', desc: 'Auto-enroll all new hires in Security Awareness 101.' }
                  ].map((setting, i) => (
                    <div key={i} className="flex items-center justify-between p-4 bg-slate-950 border border-slate-800 rounded-xl">
                       <div>
                          <div className="text-sm font-bold text-white mb-1">{setting.title}</div>
                          <div className="text-xs text-slate-500 font-medium">{setting.desc}</div>
                       </div>
                       <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" defaultChecked className="sr-only peer" />
                          <div className="w-11 h-6 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500"></div>
                       </label>
                    </div>
                  ))}
               </div>
            </div>
         </div>
      </div>
    </div>
  );
}
