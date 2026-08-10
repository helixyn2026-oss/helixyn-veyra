"use client";

import { CheckCircle, Circle, Play } from "lucide-react";
import { useRouter } from "next/navigation";
import { updateTaskStatus } from "@/app/actions/task";
import { useState } from "react";

export function TaskItem({ task }: { task: any }) {
  const router = useRouter();
  const [isUpdating, setIsUpdating] = useState(false);

  const handleUpdate = async () => {
    setIsUpdating(true);
    try {
      const newStatus = task.status === 'todo' || task.status === 'pending' ? 'in-progress' : 'done';
      await updateTaskStatus(task.id, newStatus);
      router.refresh();
    } catch (e) {
      console.error(e);
      alert("Failed to update task");
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div 
      className={`flex items-center justify-between p-4 rounded-xl border border-transparent hover:border-slate-800 transition-all cursor-pointer group ${task.status === 'in-progress' ? 'bg-slate-800/30' : 'hover:bg-slate-950/50'}`}
    >
      <div className="flex items-center gap-4">
         {task.status === 'done' && <CheckCircle size={20} className="text-emerald-500 shrink-0" />}
         {task.status === 'in-progress' && <Play size={20} className="text-teal-500 shrink-0 fill-teal-500/20" />}
         {(task.status === 'todo' || task.status === 'pending') && <Circle size={20} className="text-slate-600 shrink-0" />}
         {task.status === 'review' && <Circle size={20} className="text-emerald-500 shrink-0" />}
         
         <div>
            <div className={`text-sm font-bold mb-1 ${task.status === 'done' ? 'text-slate-500 line-through' : 'text-slate-200'}`}>
               {task.title}
            </div>
            <div className="text-xs text-slate-500 font-medium flex items-center gap-2">
               <span className="bg-slate-950 px-2 py-0.5 rounded border border-slate-800">{task.category}</span>
               {task.status === 'in-progress' && <span className="text-teal-400">In Progress</span>}
            </div>
         </div>
      </div>
      
      {task.status !== 'done' && (
         <button 
           onClick={handleUpdate}
           disabled={isUpdating}
           className="px-4 py-2 bg-slate-900 hover:bg-teal-500 hover:text-slate-900 border border-slate-700 hover:border-teal-500 text-slate-300 rounded-lg font-bold text-xs transition-all opacity-0 group-hover:opacity-100 lg:opacity-100 disabled:opacity-50"
         >
            {isUpdating ? '...' : task.status === 'in-progress' ? 'Finish' : 'Start'}
         </button>
      )}
    </div>
  );
}
