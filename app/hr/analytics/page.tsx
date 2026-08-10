"use client";

import { useState } from "react";
import { BarChart, Users, Zap, TrendingUp, TrendingDown } from "lucide-react";

export default function AdminAnalytics() {
  const [timeRange, setTimeRange] = useState("30d");

  const stats = [
    { title: 'Total Employees', value: '1,248', trend: '+12%', up: true, icon: Users },
    { title: 'Active Onboardings', value: '34', trend: '+5%', up: true, icon: Zap },
    { title: 'Time to Productivity', value: '14 Days', trend: '-2 Days', up: true, icon: BarChart },
    { title: 'Voluntary Turnover', value: '2.4%', trend: '+0.4%', up: false, icon: TrendingDown },
  ];

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">System Analytics</h1>
          <p className="text-slate-400 text-sm mt-1">High-level metrics across the entire platform.</p>
        </div>
        <div className="flex gap-2 bg-slate-900 p-1 rounded-lg border border-slate-800">
          {['7d', '30d', '90d', '1y'].map(range => (
            <button 
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-3 py-1.5 rounded-md text-xs font-bold uppercase transition-all ${
                timeRange === range ? 'bg-slate-700 text-white' : 'text-slate-500 hover:text-slate-300 hover:bg-slate-800'
              }`}
            >
              {range}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
         {stats.map((stat, i) => (
           <div key={i} className="bg-slate-900/80 backdrop-blur-md border border-slate-800 rounded-2xl p-6 relative overflow-hidden group">
              <div className="flex items-center justify-between mb-4 relative z-10">
                 <div className="w-10 h-10 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-400 group-hover:text-white group-hover:border-slate-500 transition-all">
                    <stat.icon size={20} />
                 </div>
                 <div className={`flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-md ${stat.up ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-400'}`}>
                    {stat.up ? <TrendingUp size={12}/> : <TrendingDown size={12}/>}
                    {stat.trend}
                 </div>
              </div>
              <div className="relative z-10">
                 <h3 className="text-3xl font-extrabold text-white mb-1">{stat.value}</h3>
                 <p className="text-sm font-medium text-slate-500">{stat.title}</p>
              </div>
              {/* Subtle background glow on hover */}
              <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-slate-500/10 blur-[40px] rounded-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity"></div>
           </div>
         ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
         <div className="lg:col-span-2 bg-slate-900/80 backdrop-blur-md rounded-2xl border border-slate-800 p-6 flex flex-col justify-center items-center min-h-[400px]">
            {/* Placeholder for a real chart library like Recharts */}
            <BarChart size={48} className="text-slate-700 mb-4" />
            <p className="text-slate-500 font-medium">Headcount Growth Chart Visualization</p>
         </div>
         <div className="bg-slate-900/80 backdrop-blur-md rounded-2xl border border-slate-800 p-6 flex flex-col justify-center items-center min-h-[400px]">
            <div className="w-32 h-32 rounded-full border-8 border-slate-800 border-t-emerald-500 border-r-emerald-500 border-b-indigo-500 flex items-center justify-center mb-6">
               <span className="text-lg font-bold text-white">Dist.</span>
            </div>
            <p className="text-slate-500 font-medium">Department Distribution</p>
         </div>
      </div>
    </div>
  );
}
