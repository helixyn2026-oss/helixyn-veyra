"use client";

import { useState } from "react";
import { Users, Search, Activity, MoreVertical, Battery } from "lucide-react";

export default function TLRoster() {
  const [members] = useState([
    { id: 1, name: 'John Doe', role: 'Frontend Developer', sprintPoints: 34, status: 'active', health: 95 },
    { id: 2, name: 'Alex Rivera', role: 'Senior Engineer', sprintPoints: 55, status: 'active', health: 80 },
    { id: 3, name: 'Marcus Chen', role: 'Backend Developer', sprintPoints: 42, status: 'pto', health: 100 },
    { id: 4, name: 'Chloe Kim', role: 'UI Designer', sprintPoints: 28, status: 'active', health: 65 },
  ]);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Team Roster</h1>
          <p className="text-slate-400 text-sm mt-1">Monitor your squad's capacity and health metrics.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-2">
         {/* Squad Health Card */}
         <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-6 flex flex-col justify-between">
            <div className="flex items-center justify-between mb-4">
               <span className="text-sm font-bold text-slate-400">Avg Squad Health</span>
               <Activity size={18} className="text-indigo-400" />
            </div>
            <div className="flex items-end gap-3">
               <span className="text-3xl font-extrabold text-white">85%</span>
               <span className="text-sm font-bold text-emerald-400 mb-1">+5% from last sprint</span>
            </div>
         </div>
         {/* Velocity Card */}
         <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-6 flex flex-col justify-between">
            <div className="flex items-center justify-between mb-4">
               <span className="text-sm font-bold text-slate-400">Current Velocity</span>
               <Users size={18} className="text-indigo-400" />
            </div>
            <div className="flex items-end gap-3">
               <span className="text-3xl font-extrabold text-white">159</span>
               <span className="text-sm font-bold text-slate-500 mb-1">Story Points</span>
            </div>
         </div>
      </div>

      <div className="bg-slate-900/80 backdrop-blur-md rounded-2xl border border-slate-800 shadow-xl overflow-hidden">
        <div className="p-6 border-b border-slate-800 flex items-center justify-between bg-slate-950/30">
          <div className="relative w-full md:w-64">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
            <input type="text" placeholder="Search team members..." className="w-full pl-9 pr-4 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm focus:outline-none focus:border-indigo-500/50 text-white" />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-950/50 border-b border-slate-800 text-xs uppercase tracking-wider text-slate-500 font-bold">
                <th className="p-4 pl-6">Member</th>
                <th className="p-4">Capacity (Points)</th>
                <th className="p-4">Workload Health</th>
                <th className="p-4">Status</th>
                <th className="p-4 pr-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/50">
              {members.map(member => (
                <tr key={member.id} className="hover:bg-slate-950/30 transition-colors group">
                  <td className="p-4 pl-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center font-bold text-white">
                        {member.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <div className="text-sm font-bold text-white group-hover:text-indigo-400 transition-colors">{member.name}</div>
                        <div className="text-xs text-slate-500">{member.role}</div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="text-sm font-bold text-white">{member.sprintPoints}</span> <span className="text-xs text-slate-500">pts</span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                       <Battery size={16} className={member.health > 80 ? 'text-emerald-500' : member.health > 50 ? 'text-emerald-500' : 'text-red-500'} />
                       <span className="text-sm font-bold text-slate-300">{member.health}%</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className={`px-2.5 py-1 rounded text-[10px] font-bold uppercase tracking-wider ${
                      member.status === 'active' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                      'bg-slate-500/10 text-slate-400 border border-slate-500/20'
                    }`}>
                      {member.status === 'pto' ? 'On PTO' : 'Active'}
                    </span>
                  </td>
                  <td className="p-4 pr-6 text-right">
                    <button className="p-2 text-slate-500 hover:text-white transition-colors">
                      <MoreVertical size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
