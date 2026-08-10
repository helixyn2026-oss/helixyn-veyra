import { Plus, GripVertical, CheckCircle } from "lucide-react";
import { getTasks } from "@/app/actions/task";

export default async function TLSprints() {
  const columns = [
    { id: 'todo', title: 'To Do', color: 'bg-slate-600' },
    { id: 'in-progress', title: 'In Progress', color: 'bg-indigo-500' },
    { id: 'review', title: 'Code Review', color: 'bg-emerald-500' },
    { id: 'done', title: 'Done', color: 'bg-emerald-500' }
  ];

  const tasks = await getTasks();

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)]">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6 shrink-0">
        <div>
          <h1 className="text-2xl font-bold text-white">Sprint 42 Board</h1>
          <p className="text-slate-400 text-sm mt-1">Manage current sprint deliverables and tickets.</p>
        </div>
        <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-sm font-bold flex items-center gap-2 transition-all shadow-[0_0_15px_rgba(79,70,229,0.3)]">
          <Plus size={16} /> New Ticket
        </button>
      </div>

      <div className="flex-1 flex gap-6 overflow-x-auto custom-scrollbar pb-4">
         {columns.map(col => (
           <div key={col.id} className="min-w-[300px] w-[300px] flex flex-col bg-slate-900/50 rounded-2xl border border-slate-800">
              <div className="p-4 border-b border-slate-800 flex items-center justify-between shrink-0">
                 <div className="flex items-center gap-2">
                    <span className={`w-2.5 h-2.5 rounded-full ${col.color}`}></span>
                    <h3 className="text-sm font-bold text-white">{col.title}</h3>
                 </div>
                 <span className="text-xs font-bold text-slate-500 bg-slate-950 px-2 py-1 rounded-md">
                    {tasks.filter(t => t.status === col.id).length}
                 </span>
              </div>
              
              <div className="flex-1 p-3 space-y-3 overflow-y-auto custom-scrollbar">
                 {tasks.filter(t => t.status === col.id).map(task => (
                    <div key={task.id} className="bg-slate-950 border border-slate-800 hover:border-indigo-500/50 rounded-xl p-4 cursor-grab active:cursor-grabbing transition-colors group relative">
                       <GripVertical size={14} className="absolute left-1.5 top-1/2 -translate-y-1/2 text-slate-700 opacity-0 group-hover:opacity-100 transition-opacity" />
                       <div className="text-xs font-bold text-slate-500 mb-1">{task.title.split(':')[0] || 'TASK'}</div>
                       <div className="text-sm font-semibold text-slate-200 mb-4">{task.title.split(':')[1]?.trim() || task.title}</div>
                       
                       <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                             <div className="w-6 h-6 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center font-bold text-white text-[10px] uppercase" title={task.assignee?.name || 'Unassigned'}>
                               {(task.assignee?.name || '?').split(' ').map((n: string) => n[0]).join('').substring(0,2)}
                             </div>
                          </div>
                          <span className="bg-slate-900 border border-slate-700 text-slate-300 px-2.5 py-1 rounded-md text-xs font-bold uppercase tracking-wider">
                             {task.category}
                          </span>
                       </div>
                       
                       {col.id === 'done' && (
                         <div className="absolute top-4 right-4 text-emerald-500">
                           <CheckCircle size={16} />
                         </div>
                       )}
                    </div>
                 ))}
              </div>
           </div>
         ))}
      </div>
    </div>
  );
}
