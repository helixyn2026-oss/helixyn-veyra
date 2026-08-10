import { 
  Users,
  Search,
  Filter,
  CheckCircle,
  FolderGit2
} from "lucide-react";
import { prisma } from '@/lib/db';
import { assignProjectAndProvisionGitHub } from "@/app/actions/workflow";

export default async function TLDashboard() {
  const pendingConfigs = await prisma.user.findMany({
    where: { status: 'ONBOARDING', role: 'employee' },
    orderBy: { createdAt: 'desc' }
  });

  const availableProjects = await prisma.project.findMany({
    orderBy: { name: 'asc' }
  });

  return (
    <div className="flex flex-col gap-6 pb-12">
      {/* Header section */}
      <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            Team Management
          </h1>
          <p className="text-slate-400 text-sm mt-1">Configure project access and GitHub provisioning for new squad members.</p>
        </div>
      </div>

      <div className="bg-slate-900/80 backdrop-blur-md rounded-2xl border border-slate-800 shadow-xl overflow-hidden mt-2">
        <div className="p-6 border-b border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-950/30">
          <div className="flex items-center gap-3">
             <div className="bg-indigo-500/10 border border-indigo-500/20 text-indigo-500 p-2 rounded-lg">
                <Users size={20} />
             </div>
             <div>
               <h2 className="text-lg font-bold text-white tracking-wide">Pending Access Provisioning</h2>
               <p className="text-xs text-slate-500 font-medium mt-0.5">New employees awaiting GitHub and project assignments</p>
             </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
              <input 
                type="text" 
                placeholder="Search team..." 
                className="pl-9 pr-4 py-2.5 bg-slate-950 border border-slate-800 rounded-lg text-xs focus:outline-none focus:border-indigo-500/50 text-white w-56 md:w-64 placeholder-slate-600 shadow-inner"
              />
            </div>
            <button className="p-2.5 bg-slate-900 border border-slate-800 rounded-lg text-slate-400 hover:text-white hover:border-slate-700 transition-colors shadow-inner">
               <Filter size={16} />
            </button>
          </div>
        </div>

        <div className="p-6 grid grid-cols-1 gap-4">
          {pendingConfigs.map(config => (
            <div key={config.id} className="bg-slate-950/50 border border-slate-800 hover:border-indigo-500/30 rounded-xl p-5 flex flex-col lg:flex-row lg:items-center justify-between gap-6 transition-all group">
               <div className="flex items-center gap-5">
                 <div className="w-12 h-12 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center font-bold text-white text-lg shadow-inner uppercase">
                   {config.name.charAt(0)}
                 </div>
                 <div>
                   <h3 className="text-base font-bold text-white flex items-center gap-2 mb-1">
                      {config.name}
                      <span className="bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 px-2 py-0.5 rounded text-[10px] font-bold">
                        Requires GitHub Provisioning
                      </span>
                   </h3>
                   <div className="flex items-center gap-3 text-xs text-slate-400 font-medium">
                     <span className="flex items-center gap-1.5 text-emerald-500"><CheckCircle size={12} /> Accepted Offer</span>
                     <span className="w-1 h-1 bg-slate-700 rounded-full"></span>
                     <span>{config.companyEmail}</span>
                     <span className="w-1 h-1 bg-slate-700 rounded-full"></span>
                     <span>{config.title}</span>
                   </div>
                 </div>
               </div>

               <div className="flex flex-col sm:flex-row items-center gap-3">
                 <form className="flex items-center gap-3 w-full sm:w-auto" action={async (formData) => {
                    'use server';
                    const projectId = formData.get('projectId') as string;
                    if (projectId) {
                      await assignProjectAndProvisionGitHub(config.id, projectId);
                    }
                 }}>
                    <select 
                      name="projectId" 
                      required 
                      className="bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-sm text-white focus:outline-none focus:border-indigo-500 min-w-[200px]"
                      defaultValue=""
                    >
                      <option value="" disabled>Select Project...</option>
                      {availableProjects.map(proj => (
                        <option key={proj.id} value={proj.id}>{proj.name}</option>
                      ))}
                    </select>
                    <button type="submit" className="px-5 py-2.5 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg font-bold text-xs transition-all flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(99,102,241,0.3)] whitespace-nowrap">
                      <FolderGit2 size={16} /> Assign & Provision GitHub
                    </button>
                 </form>
               </div>
            </div>
          ))}

          {pendingConfigs.length === 0 && (
             <div className="text-center py-12">
               <div className="w-16 h-16 bg-slate-900 border border-slate-800 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-600">
                  <CheckCircle size={24} />
               </div>
               <h3 className="text-lg font-bold text-slate-300 mb-1">No Pending Provisioning</h3>
               <p className="text-sm text-slate-500">All team members have been assigned to projects and provisioned.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
