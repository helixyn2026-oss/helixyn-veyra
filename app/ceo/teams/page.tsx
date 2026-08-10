"use client";

import { useState } from "react";
import { Users, MoreVertical, Shield, Cpu, LayoutDashboard } from "lucide-react";

export default function CEOTeams() {
  const [teams] = useState([
    { id: 1, name: 'Core Platform', leader: 'Sarah Jenkins', members: 12, health: 'Excellent' },
    { id: 2, name: 'Enterprise Integrations', leader: 'Michael Chen', members: 8, health: 'Good' },
    { id: 3, name: 'Internal Analytics', leader: 'David OConnor', members: 5, health: 'Needs Attention' },
  ]);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Team Structures</h1>
          <p className="text-slate-400 text-sm mt-1">High-level view of all active squads and their leadership.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
         {teams.map(team => (
            <div key={team.id} className="bg-slate-900/80 backdrop-blur-md border border-slate-800 hover:border-emerald-500/50 rounded-2xl p-6 transition-colors group relative overflow-hidden">
               <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 blur-[40px] rounded-full pointer-events-none group-hover:bg-emerald-500/10 transition-colors"></div>
               
               <div className="flex items-start justify-between mb-6 relative z-10">
                  <div className="flex items-center gap-3">
                     <div className="w-12 h-12 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center text-emerald-500 shadow-inner">
                        <LayoutDashboard size={24} />
                     </div>
                     <div>
                        <h3 className="text-base font-bold text-white group-hover:text-emerald-400 transition-colors">{team.name}</h3>
                        <div className="text-xs text-slate-500 flex items-center gap-1.5"><Users size={12}/> {team.members} Members</div>
                     </div>
                  </div>
                  <button className="text-slate-500 hover:text-white transition-colors"><MoreVertical size={16}/></button>
               </div>
               
               <div className="space-y-4 relative z-10">
                  <div className="flex items-center justify-between p-3 bg-slate-950 border border-slate-800/50 rounded-xl">
                     <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Team Leader</span>
                     <span className="text-sm font-semibold text-white">{team.leader}</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-slate-950 border border-slate-800/50 rounded-xl">
                     <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Squad Health</span>
                     <span className={`text-xs font-bold px-2 py-1 rounded ${
                       team.health === 'Excellent' ? 'bg-emerald-500/10 text-emerald-400' :
                       team.health === 'Good' ? 'bg-indigo-500/10 text-indigo-400' :
                       'bg-red-500/10 text-red-400'
                     }`}>
                       {team.health}
                     </span>
                  </div>
               </div>
            </div>
         ))}
      </div>
    </div>
  );
}
