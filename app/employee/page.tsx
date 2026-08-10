import { 
  CheckCircle, 
  Circle, 
  Play, 
  BookOpen, 
  Award,
  Users,
  Target,
  Code,
  Key,
  Mail
} from "lucide-react";
import { getTasks } from "@/app/actions/task";
import { TaskItem } from "./TaskItem";
import { getCurrentUser } from "@/app/actions/auth";
import Link from "next/link";

export default async function EmployeeDashboard() {
  const user = await getCurrentUser();
  
  if (!user) {
    return (
      <div className="max-w-4xl mx-auto pb-12 flex flex-col items-center justify-center min-h-[60vh]">
        <div className="bg-slate-900/80 backdrop-blur-md rounded-2xl border border-slate-800 shadow-xl p-8 text-center">
          <p className="text-slate-400 mb-4">Please log in to view your dashboard.</p>
          <Link href="/login">
            <button className="px-5 py-2.5 bg-teal-500 hover:bg-teal-600 text-slate-950 rounded-lg font-bold text-xs transition-all">
              Go to Login
            </button>
          </Link>
        </div>
      </div>
    );
  }

  // Get tasks specifically assigned to the logged-in employee
  const tasks = await getTasks(user.id);

  const completedCount = tasks.filter(t => t.status === 'done').length;
  const progressPercent = tasks.length > 0 ? Math.round((completedCount / tasks.length) * 100) : 0;

  return (
    <div className="flex flex-col gap-8 pb-12">
      {/* Welcome & Progress Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
         <div className="lg:col-span-2 bg-slate-900/80 backdrop-blur-md rounded-2xl border border-slate-800 shadow-xl p-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500/10 blur-[80px] rounded-full pointer-events-none"></div>
            <div className="relative z-10 flex flex-col h-full justify-between">
               <div>
                  <h1 className="text-2xl font-bold text-white mb-2">Hello, {user.name}! 👋</h1>
                  <p className="text-slate-400 max-w-lg leading-relaxed">
                    We're thrilled to have you join the <strong>Helixyn</strong> team as our new <strong>{user.title}</strong>. Your onboarding checklist is ready below to help you get started.
                  </p>
               </div>
               
               <div className="mt-8">
                  <div className="flex justify-between items-end mb-2">
                     <span className="text-sm font-bold text-slate-300">Onboarding Progress</span>
                     <span className="text-2xl font-extrabold text-teal-400">{progressPercent}%</span>
                  </div>
                  <div className="h-3 w-full bg-slate-950 rounded-full overflow-hidden shadow-inner border border-slate-800">
                     <div 
                       className="h-full bg-gradient-to-r from-teal-600 to-teal-400 transition-all duration-1000 ease-out relative"
                       style={{ width: `${progressPercent}%` }}
                     >
                       <div className="absolute inset-0 bg-white/20 w-full h-full" style={{ animation: 'shimmer 2s infinite' }}></div>
                     </div>
                  </div>
                  <div className="mt-3 text-xs text-slate-500 font-medium">
                     {completedCount} of {tasks.length} tasks completed
                  </div>
               </div>
            </div>
         </div>

         <div className="bg-slate-900/80 backdrop-blur-md rounded-2xl border border-slate-800 shadow-xl p-6">
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-6">Your Team Details</h3>
            
            <div className="space-y-6">
               <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-indigo-500/10 text-indigo-400 flex items-center justify-center border border-indigo-500/20">
                     <Target size={18} />
                  </div>
                  <div>
                     <div className="text-xs text-slate-500 font-medium mb-0.5">Team Leader</div>
                     <div className="text-sm font-bold text-white">{user.teamName || "Awaiting Assignment"}</div>
                  </div>
               </div>
               <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center border border-emerald-500/20">
                     <Users size={18} />
                  </div>
                  <div>
                     <div className="text-xs text-slate-500 font-medium mb-0.5">Department</div>
                     <div className="text-sm font-bold text-white">{user.department?.name || "Unassigned"}</div>
                  </div>
               </div>
               <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center border border-emerald-500/20">
                     <BookOpen size={18} />
                  </div>
                  <div>
                     <div className="text-xs text-slate-500 font-medium mb-0.5">Status</div>
                     <div className="text-sm font-bold text-emerald-400 capitalize">{user.status.toLowerCase().replace('_', ' ')}</div>
                  </div>
               </div>
            </div>
         </div>
      </div>

      {/* Dynamic Provisioned Credentials (if status is ACTIVE) */}
      {(user.githubId || user.projectCreds || user.companyEmail) && (
        <div className="bg-slate-900/80 backdrop-blur-md rounded-2xl border border-slate-800 shadow-xl p-6">
          <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">Your Tool Credentials</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {user.companyEmail && (
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800/50 flex items-center gap-3">
                <Mail className="text-teal-500 shrink-0" size={20} />
                <div className="min-w-0">
                  <div className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mb-0.5">Company Email</div>
                  <div className="text-xs font-semibold text-white truncate">{user.companyEmail}</div>
                </div>
              </div>
            )}
            {user.githubId && (
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800/50 flex items-center gap-3">
                <Code className="text-slate-300 shrink-0" size={20} />
                <div className="min-w-0">
                  <div className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mb-0.5">GitHub Username</div>
                  <div className="text-xs font-semibold text-white truncate">{user.githubId}</div>
                </div>
              </div>
            )}
            {user.projectCreds && (
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800/50 flex items-center gap-3">
                <Key className="text-emerald-500 shrink-0" size={20} />
                <div className="min-w-0">
                  <div className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mb-0.5">Project Board Link</div>
                  <a href={user.projectCreds} target="_blank" rel="noopener noreferrer" className="text-xs font-semibold text-teal-400 hover:text-teal-300 underline truncate block">
                    Access Project Tools
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Task List Section */}
      <div className="bg-slate-900/80 backdrop-blur-md rounded-2xl border border-slate-800 shadow-xl overflow-hidden">
         <div className="p-6 border-b border-slate-800 bg-slate-950/30 flex items-center justify-between">
            <h2 className="text-lg font-bold text-white tracking-wide">Your Action Items</h2>
            <button className="text-xs font-bold text-teal-500 hover:text-teal-400 transition-colors">View All Tasks</button>
         </div>
         <div className="p-2 space-y-2">
            {tasks.map((task) => (
               <TaskItem key={task.id} task={task} />
            ))}

            {tasks.length === 0 && (
              <p className="text-sm text-slate-500 text-center py-8">No tasks assigned yet.</p>
            )}
         </div>
      </div>
      
      {/* Quick Links */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
         {['Company Wiki', 'Benefits Portal', 'IT Support', 'Submit Feedback'].map(link => (
            <div key={link} className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex items-center justify-between cursor-pointer hover:border-teal-500/50 hover:bg-slate-800 transition-all group">
               <span className="text-sm font-bold text-slate-300 group-hover:text-white transition-colors">{link}</span>
               <Award size={16} className="text-slate-600 group-hover:text-teal-500 transition-colors" />
            </div>
         ))}
      </div>
    </div>
  );
}
