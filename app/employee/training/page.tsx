"use client";

import { useState } from "react";
import { PlayCircle, Clock, CheckCircle, Video, Lock } from "lucide-react";

export default function EmployeeTraining() {
  const [courses, setCourses] = useState([
    { id: 1, title: 'Welcome to Helixyn', duration: '15m', status: 'completed' },
    { id: 2, title: 'Security Awareness 101', duration: '45m', status: 'in-progress', progress: 60 },
    { id: 3, title: 'Engineering Onboarding', duration: '1h 30m', status: 'locked' },
    { id: 4, title: 'Agile Workflow at Helixyn', duration: '40m', status: 'locked' }
  ]);

  const [isLoading, setIsLoading] = useState(false);

  const startCourse = (id: number) => {
    setIsLoading(true);
    setTimeout(() => {
      setCourses(courses.map(c => c.id === id ? { ...c, status: 'in-progress', progress: 0 } : c));
      setIsLoading(false);
    }, 800);
  };

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Training & Courses</h1>
        <p className="text-slate-400 text-sm mt-1">Complete your required onboarding modules.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Main Viewer */}
          <div className="bg-slate-900/80 backdrop-blur-md rounded-2xl border border-slate-800 shadow-xl overflow-hidden relative">
             {isLoading && (
               <div className="absolute inset-0 bg-slate-950/70 z-50 flex flex-col items-center justify-center">
                 <div className="w-8 h-8 border-4 border-teal-500 border-t-transparent rounded-full animate-spin mb-4"></div>
                 <span className="text-sm font-bold text-teal-400">Loading Module...</span>
               </div>
             )}
             
             <div className="aspect-video bg-black flex items-center justify-center relative group">
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent"></div>
                <div className="w-16 h-16 bg-teal-500/20 text-teal-500 rounded-full flex items-center justify-center border border-teal-500/40 cursor-pointer group-hover:scale-110 group-hover:bg-teal-500 group-hover:text-slate-900 transition-all z-10">
                   <PlayCircle size={32} />
                </div>
                <div className="absolute bottom-4 left-4 z-10">
                   <span className="bg-slate-900/80 text-white px-2 py-1 rounded text-xs font-bold flex items-center gap-1.5 backdrop-blur-sm">
                      <Video size={12}/> Security Awareness 101 - Part 2
                   </span>
                </div>
             </div>
             <div className="p-6 bg-slate-950/50">
                <h3 className="text-lg font-bold text-white mb-2">Security Awareness 101</h3>
                <p className="text-sm text-slate-400">Learn the best practices for maintaining data security and protecting Helixyn assets. This module is mandatory for all new hires.</p>
             </div>
          </div>
        </div>

        {/* Course List */}
        <div className="bg-slate-900/80 backdrop-blur-md rounded-2xl border border-slate-800 shadow-xl overflow-hidden flex flex-col h-[500px]">
           <div className="p-5 border-b border-slate-800 bg-slate-950/30">
             <h2 className="text-base font-bold text-white">Course Syllabus</h2>
           </div>
           <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar">
              {courses.map(course => (
                 <div key={course.id} className={`p-4 rounded-xl border transition-all ${course.status === 'in-progress' ? 'bg-slate-950 border-teal-500/50' : course.status === 'locked' ? 'bg-slate-950/30 border-slate-800/50 opacity-60' : 'bg-slate-900 border-slate-800'}`}>
                    <div className="flex items-start justify-between gap-4">
                       <div>
                          <div className={`text-sm font-bold mb-1 ${course.status === 'completed' ? 'text-slate-500' : 'text-slate-200'}`}>
                             {course.title}
                          </div>
                          <div className="text-xs text-slate-500 font-medium flex items-center gap-1.5">
                             <Clock size={12}/> {course.duration}
                          </div>
                       </div>
                       
                       {course.status === 'completed' && <CheckCircle size={18} className="text-emerald-500" />}
                       {course.status === 'locked' && <Lock size={16} className="text-slate-600" />}
                       {course.status === 'in-progress' && (
                         <div className="text-xs font-bold text-teal-400">{course.progress}%</div>
                       )}
                    </div>
                    
                    {course.status === 'in-progress' && (
                       <div className="mt-4 h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                          <div className="h-full bg-teal-500" style={{ width: `${course.progress}%` }}></div>
                       </div>
                    )}
                    
                    {course.status !== 'completed' && course.status !== 'in-progress' && (
                       <button 
                         onClick={() => startCourse(course.id)}
                         disabled={course.status === 'locked'}
                         className={`mt-4 w-full py-2 rounded-lg text-xs font-bold transition-all ${course.status === 'locked' ? 'bg-slate-900 text-slate-600 cursor-not-allowed' : 'bg-slate-800 hover:bg-teal-500 hover:text-slate-900 text-slate-300'}`}
                       >
                         {course.status === 'locked' ? 'Locked' : 'Start Module'}
                       </button>
                    )}
                 </div>
              ))}
           </div>
        </div>
      </div>
    </div>
  );
}
