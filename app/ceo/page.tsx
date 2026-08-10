import { prisma } from '@/lib/db';
import { Users, Briefcase, Zap, TrendingUp, Activity, DollarSign, ArrowUpRight, ArrowDownRight, UserPlus, Clock } from "lucide-react";

export default async function CEODashboard() {
  const activeEmployees = await prisma.user.findMany({
    where: { 
      role: 'employee'
    },
    orderBy: { createdAt: 'desc' },
    take: 5
  });

  const kpis = [
    { title: "Total Headcount", value: activeEmployees.length.toString(), trend: "+12% this month", up: true, icon: Users, color: "emerald" },
    { title: "Active Projects", value: "24", trend: "+3 this quarter", up: true, icon: Briefcase, color: "indigo" },
    { title: "Monthly Burn Rate", value: "$124.5k", trend: "-2.4% vs last month", up: false, icon: DollarSign, color: "amber" },
    { title: "Overall Org Health", value: "92%", trend: "+1.2% this week", up: true, icon: Activity, color: "blue" },
  ];

  return (
    <div className="flex flex-col gap-8 pb-12 max-w-7xl mx-auto">
      {/* Header section */}
      <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white flex items-center gap-3">
            Executive Overview
          </h1>
          <p className="text-slate-400 text-sm mt-2">Real-time insights into organization health and personnel growth.</p>
        </div>
        <div className="flex gap-3">
            <button className="px-4 py-2 bg-slate-900 border border-slate-700 hover:border-slate-500 text-white rounded-lg font-bold text-xs transition-all flex items-center gap-2">
                <Clock size={14} /> Last 30 Days
            </button>
            <button className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-slate-900 rounded-lg font-bold text-xs transition-all flex items-center gap-2 shadow-[0_0_15px_rgba(16,185,129,0.3)]">
                <TrendingUp size={14} /> Generate Report
            </button>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {kpis.map((kpi, i) => {
          const Icon = kpi.icon;
          const colorStyles = {
            emerald: "bg-emerald-500/10 border-emerald-500/20 text-emerald-500",
            indigo: "bg-indigo-500/10 border-indigo-500/20 text-indigo-500",
            amber: "bg-amber-500/10 border-amber-500/20 text-amber-500",
            blue: "bg-blue-500/10 border-blue-500/20 text-blue-500",
          }[kpi.color];

          return (
            <div key={i} className="bg-slate-900/80 backdrop-blur-md border border-slate-800 hover:border-slate-600 rounded-2xl p-6 shadow-xl transition-all group relative overflow-hidden">
                <div className={`absolute top-0 right-0 w-24 h-24 bg-${kpi.color}-500/5 blur-[30px] rounded-full pointer-events-none group-hover:bg-${kpi.color}-500/10 transition-colors`}></div>
                
                <div className="flex items-start justify-between mb-4">
                    <div className={`p-3 rounded-xl border ${colorStyles} shadow-inner`}>
                        <Icon size={20} />
                    </div>
                    <span className={`flex items-center gap-1 text-xs font-bold ${kpi.up ? 'text-emerald-400' : 'text-rose-400'}`}>
                        {kpi.up ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                    </span>
                </div>
                
                <div>
                    <h3 className="text-3xl font-extrabold text-white mb-1 group-hover:scale-[1.02] origin-left transition-transform">{kpi.value}</h3>
                    <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">{kpi.title}</div>
                    <div className="text-[11px] text-slate-500 font-medium">{kpi.trend}</div>
                </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Chart Area (Mocked) */}
          <div className="lg:col-span-2 bg-slate-900/80 backdrop-blur-md rounded-2xl border border-slate-800 shadow-xl overflow-hidden p-6 flex flex-col min-h-[400px]">
             <div className="flex items-center justify-between mb-8">
                <div>
                    <h2 className="text-lg font-bold text-white">Headcount Growth</h2>
                    <p className="text-xs text-slate-400 mt-1">Net employee growth over the past 6 months</p>
                </div>
                <select className="bg-slate-950 border border-slate-800 text-xs text-slate-300 rounded-lg px-3 py-1.5 focus:outline-none focus:border-emerald-500">
                    <option>Last 6 Months</option>
                    <option>This Year</option>
                </select>
             </div>
             
             {/* Simple CSS Bar Chart Mock */}
             <div className="flex-1 flex items-end justify-between gap-2 px-2 mt-auto">
                 {[45, 60, 40, 80, 65, 100].map((height, i) => (
                    <div key={i} className="flex flex-col items-center gap-3 w-full group cursor-pointer">
                        <div className="w-full relative flex items-end justify-center h-[200px]">
                            <div 
                                className="w-full max-w-[40px] bg-slate-800 group-hover:bg-emerald-500/80 border border-slate-700 group-hover:border-emerald-400 rounded-t-md transition-all relative overflow-hidden"
                                style={{ height: `${height}%` }}
                            >
                                <div className="absolute top-0 inset-x-0 h-1 bg-white/20"></div>
                            </div>
                        </div>
                        <span className="text-[10px] font-bold text-slate-500 uppercase">
                            {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'][i]}
                        </span>
                    </div>
                 ))}
             </div>
          </div>

          {/* Recent Hires */}
          <div className="bg-slate-900/80 backdrop-blur-md rounded-2xl border border-slate-800 shadow-xl overflow-hidden flex flex-col">
            <div className="p-6 border-b border-slate-800 flex items-center justify-between bg-slate-950/30">
                <div className="flex items-center gap-3">
                    <UserPlus size={18} className="text-emerald-500" />
                    <h2 className="text-lg font-bold text-white">Recent Hires</h2>
                </div>
                <span className="text-[10px] font-bold bg-slate-800 text-slate-300 px-2 py-1 rounded-md">{activeEmployees.length} Total</span>
            </div>
            
            <div className="p-4 flex-1 overflow-y-auto custom-scrollbar">
            {activeEmployees.length > 0 ? (
                <div className="space-y-2">
                {activeEmployees.map((emp, idx) => (
                    <div key={emp.id} className="p-3 rounded-xl hover:bg-slate-800/50 transition-colors flex items-center justify-between border border-transparent hover:border-slate-700/50 group cursor-pointer">
                    <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-white shadow-inner text-sm ${idx === 0 ? 'bg-emerald-500' : 'bg-slate-800 border border-slate-700'}`}>
                            {emp.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()}
                        </div>
                        <div>
                        <h3 className="font-bold text-sm text-slate-200 group-hover:text-emerald-400 transition-colors">{emp.name}</h3>
                        <p className="text-[11px] text-slate-400">{emp.title || 'Employee'}</p>
                        </div>
                    </div>
                    <span className={`px-2 py-1 rounded-md text-[9px] font-bold uppercase tracking-widest ${
                        emp.status === 'ACTIVE' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                        'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20'
                    }`}>
                        {emp.status}
                    </span>
                    </div>
                ))}
                </div>
            ) : (
                <div className="text-center py-12 h-full flex flex-col items-center justify-center">
                <div className="w-16 h-16 bg-slate-900 border border-slate-800 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-600">
                    <Zap size={24} />
                </div>
                <h3 className="text-sm font-bold text-slate-300 mb-1">No New Hires</h3>
                <p className="text-xs text-slate-500 max-w-[200px]">Candidates will appear here once they complete onboarding.</p>
                </div>
            )}
            </div>
            
            <div className="p-4 border-t border-slate-800 bg-slate-950/30">
                <button className="w-full py-2.5 rounded-lg text-xs font-bold text-slate-400 hover:text-white hover:bg-slate-800 transition-colors">
                    View All Personnel
                </button>
            </div>
          </div>
      </div>
    </div>
  );
}
