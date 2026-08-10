import { Briefcase, Activity, CheckCircle, Clock } from "lucide-react";
import { getProjects } from "@/app/actions/project";

export default async function CEOProjects() {
  const projects = await getProjects();

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Global Projects</h1>
          <p className="text-slate-400 text-sm mt-1">Executive overview of major company initiatives.</p>
        </div>
      </div>

      <div className="bg-slate-900/80 backdrop-blur-md rounded-2xl border border-slate-800 shadow-xl overflow-hidden">
         <div className="p-6 border-b border-slate-800 bg-slate-950/30 flex items-center gap-3">
            <Briefcase size={18} className="text-emerald-500" />
            <h2 className="text-lg font-bold text-white">Active Initiatives</h2>
         </div>
         
         <div className="divide-y divide-slate-800">
            {projects.map(proj => (
               <div key={proj.id} className="p-6 hover:bg-slate-950/30 transition-colors group">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                     <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                           <h3 className="text-lg font-bold text-white group-hover:text-emerald-400 transition-colors">{proj.name}</h3>
                           <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                             proj.status === 'on-track' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                             'bg-red-500/10 text-red-400 border border-red-500/20'
                           }`}>
                              {proj.status.replace('-', ' ')}
                           </span>
                        </div>
                        <div className="text-sm text-slate-400 font-medium flex items-center gap-4 mt-1">
                           <span>Team: {proj.teamName || 'Unassigned'}</span>
                           <span>Budget: ${proj.budget.toLocaleString()}</span>
                        </div>
                     </div>
                     
                     <div className="w-full md:w-64">
                        <div className="flex justify-between items-end mb-1.5">
                           <span className="text-xs font-bold text-slate-500">Progress</span>
                           <span className="text-sm font-bold text-white">{proj.progress}%</span>
                        </div>
                        <div className="h-2 w-full bg-slate-950 rounded-full overflow-hidden shadow-inner">
                           <div className={`h-full ${proj.status === 'on-track' ? 'bg-emerald-500' : 'bg-red-500'}`} style={{ width: `${proj.progress}%` }}></div>
                        </div>
                     </div>
                  </div>
               </div>
            ))}
         </div>
      </div>
    </div>
  );
}
