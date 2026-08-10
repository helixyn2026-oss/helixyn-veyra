"use client";

import { useState, useEffect } from "react";
import { CheckCircle, Circle, Play, Filter, Search, Clock, AlertCircle } from "lucide-react";
import { getTasks, updateTaskStatus } from "@/app/actions/task";
import { getCurrentUser } from "@/app/actions/auth";
import Link from "next/link";

export default function EmployeeTasks() {
  const [activeTab, setActiveTab] = useState("all");
  const [tasks, setTasks] = useState<any[]>([]);
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const loggedInUser = await getCurrentUser();
        setUser(loggedInUser);
        if (loggedInUser) {
          const userTasks = await getTasks(loggedInUser.id);
          setTasks(userTasks);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setIsLoading(false);
      }
    }
    loadData();
  }, []);

  const handleUpdateStatus = async (id: string, newStatus: string) => {
    setIsLoading(true);
    try {
      await updateTaskStatus(id, newStatus);
      setTasks(tasks.map(t => t.id === id ? { ...t, status: newStatus } : t));
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredTasks = tasks.filter(t => {
    if (activeTab === "pending") return t.status !== "done";
    if (activeTab === "completed") return t.status === "done";
    return true;
  });

  if (isLoading && !user) {
    return (
      <div className="max-w-4xl mx-auto pb-12 flex justify-center mt-20">
         <div className="flex items-center gap-3 text-white">
           <div className="w-8 h-8 border-4 border-teal-500 border-t-transparent rounded-full animate-spin"></div>
           Loading tasks...
         </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="max-w-4xl mx-auto pb-12 flex flex-col items-center justify-center min-h-[60vh]">
        <div className="bg-slate-900/80 backdrop-blur-md rounded-2xl border border-slate-800 shadow-xl p-8 text-center">
          <p className="text-slate-400 mb-4">Please log in to view your tasks.</p>
          <Link href="/login">
            <button className="px-5 py-2.5 bg-teal-500 hover:bg-teal-600 text-slate-950 rounded-lg font-bold text-xs transition-all">
              Go to Login
            </button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">My Tasks</h1>
          <p className="text-slate-400 text-sm mt-1">Manage your onboarding checklist and daily assignments.</p>
        </div>
      </div>

      <div className="bg-slate-900/80 backdrop-blur-md rounded-2xl border border-slate-800 shadow-xl overflow-hidden relative">
        {isLoading && (
           <div className="absolute inset-0 bg-slate-950/50 backdrop-blur-sm z-50 flex items-center justify-center">
             <div className="w-8 h-8 border-4 border-teal-500 border-t-transparent rounded-full animate-spin"></div>
           </div>
        )}
        
        <div className="p-6 border-b border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-950/30">
          <div className="flex gap-2 bg-slate-950 p-1 rounded-lg border border-slate-800 w-full md:w-auto overflow-x-auto">
            {['all', 'pending', 'completed'].map(tab => (
              <button 
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-md text-sm font-bold capitalize whitespace-nowrap transition-all ${
                  activeTab === tab ? 'bg-slate-800 text-teal-400' : 'text-slate-500 hover:text-slate-300 hover:bg-slate-900'
                }`}
              >
                {tab} Tasks
              </button>
            ))}
          </div>
          
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
              <input type="text" placeholder="Search tasks..." className="pl-9 pr-4 py-2.5 bg-slate-950 border border-slate-800 rounded-lg text-xs focus:outline-none focus:border-teal-500/50 text-white w-full md:w-56" />
            </div>
            <button className="p-2.5 bg-slate-900 border border-slate-800 rounded-lg text-slate-400 hover:text-white hover:border-slate-700 transition-colors">
               <Filter size={16} />
            </button>
          </div>
        </div>

        <div className="p-4 grid grid-cols-1 gap-2">
          {filteredTasks.length === 0 ? (
            <div className="text-center py-12">
               <CheckCircle size={32} className="mx-auto text-slate-600 mb-3" />
               <p className="text-slate-400">No tasks found for this view.</p>
            </div>
          ) : (
            filteredTasks.map((task) => (
              <div key={task.id} className="flex flex-col md:flex-row md:items-center justify-between p-4 rounded-xl border border-transparent hover:border-slate-800 hover:bg-slate-950/50 transition-all gap-4">
                  <div className="flex items-start md:items-center gap-4">
                     <button 
                       onClick={() => handleUpdateStatus(task.id, task.status === 'done' ? 'todo' : 'done')}
                       className="mt-1 md:mt-0"
                     >
                       {task.status === 'done' ? (
                         <CheckCircle size={20} className="text-emerald-500" />
                       ) : task.status === 'in-progress' ? (
                         <Play size={20} className="text-teal-500 fill-teal-500/20" />
                       ) : (
                         <Circle size={20} className="text-slate-600 hover:text-teal-500 transition-colors" />
                       )}
                     </button>
                     <div>
                        <div className={`text-sm font-bold mb-1 ${task.status === 'done' ? 'text-slate-500 line-through' : 'text-slate-200'}`}>
                           {task.title}
                        </div>
                        <div className="text-xs text-slate-500 font-medium flex items-center gap-3">
                           <span className="bg-slate-950 border border-slate-850 px-2 py-0.5 rounded text-[10px] font-bold text-slate-400 uppercase">{task.category}</span>
                           <span className="flex items-center gap-1"><Clock size={12}/> Due Tomorrow</span>
                           {task.priority === 'high' && (
                             <span className="bg-red-500/10 border border-red-500/20 text-red-400 px-1.5 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider">High Priority</span>
                           )}
                        </div>
                     </div>
                  </div>
                  
                  <div className="flex items-center gap-2 justify-end w-full md:w-auto">
                     {task.status !== 'done' && (
                        <button 
                          onClick={() => handleUpdateStatus(task.id, task.status === 'in-progress' ? 'done' : 'in-progress')}
                          className="px-4 py-2 bg-slate-950 border border-slate-850 hover:border-teal-500 text-teal-400 rounded-lg font-bold text-xs transition-colors shrink-0"
                        >
                           {task.status === 'in-progress' ? 'Complete' : 'Start Task'}
                        </button>
                     )}
                  </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
