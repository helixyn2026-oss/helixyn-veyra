"use client";

import { useState } from "react";
import { BookOpen, Search, Folder, ChevronRight, FileText } from "lucide-react";

export default function EmployeeWiki() {
  const [searchQuery, setSearchQuery] = useState("");
  
  const categories = [
    { name: 'Engineering', count: 24, icon: Folder },
    { name: 'HR & Benefits', count: 12, icon: Folder },
    { name: 'Company Policies', count: 8, icon: Folder },
    { name: 'Design Assets', count: 15, icon: Folder }
  ];
  
  const recentArticles = [
    { id: 1, title: 'Helixyn API Documentation', category: 'Engineering', date: '2 days ago' },
    { id: 2, title: '2026 Remote Work Policy', category: 'Company Policies', date: '1 week ago' },
    { id: 3, title: 'Healthcare Benefits Overview', category: 'HR & Benefits', date: '2 weeks ago' },
  ];

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Company Wiki</h1>
          <p className="text-slate-400 text-sm mt-1">Search the knowledge base for documentation and policies.</p>
        </div>
      </div>

      {/* Search Hero */}
      <div className="bg-slate-900/80 backdrop-blur-md rounded-2xl border border-slate-800 shadow-xl overflow-hidden relative p-12 flex flex-col items-center justify-center text-center">
         <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500/10 blur-[80px] rounded-full pointer-events-none"></div>
         <BookOpen size={48} className="text-teal-500/50 mb-6" />
         <h2 className="text-2xl font-bold text-white mb-6 z-10">How can we help you?</h2>
         <div className="relative w-full max-w-2xl z-10">
            <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
            <input 
               type="text" 
               placeholder="Search articles, guides, and policies..." 
               value={searchQuery}
               onChange={(e) => setSearchQuery(e.target.value)}
               className="w-full pl-12 pr-4 py-4 bg-slate-950 border border-slate-700 rounded-xl text-sm focus:outline-none focus:border-teal-500/50 focus:ring-2 focus:ring-teal-500/20 text-white shadow-inner transition-all" 
            />
         </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         {/* Categories */}
         <div className="md:col-span-1 space-y-4">
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider pl-1">Categories</h3>
            <div className="flex flex-col gap-2">
               {categories.map((cat, i) => (
                  <button key={i} className="bg-slate-900/80 hover:bg-slate-800 border border-slate-800 hover:border-teal-500/30 rounded-xl p-4 flex items-center justify-between transition-all group">
                     <div className="flex items-center gap-3">
                        <cat.icon size={18} className="text-slate-500 group-hover:text-teal-400 transition-colors" />
                        <span className="text-sm font-bold text-slate-300 group-hover:text-white transition-colors">{cat.name}</span>
                     </div>
                     <span className="text-xs font-bold bg-slate-950 text-slate-500 px-2 py-1 rounded-md">{cat.count}</span>
                  </button>
               ))}
            </div>
         </div>
         
         {/* Recent Articles */}
         <div className="md:col-span-2 space-y-4">
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider pl-1">Recently Updated</h3>
            <div className="bg-slate-900/80 rounded-2xl border border-slate-800 overflow-hidden shadow-xl">
               {recentArticles.map((article, i) => (
                  <div key={article.id} className={`p-4 flex items-center justify-between hover:bg-slate-950/50 transition-colors cursor-pointer group ${i !== recentArticles.length -1 ? 'border-b border-slate-800' : ''}`}>
                     <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-center text-slate-400 group-hover:text-teal-400 group-hover:border-teal-500/30 transition-colors">
                           <FileText size={18} />
                        </div>
                        <div>
                           <div className="text-sm font-bold text-slate-200 group-hover:text-white transition-colors mb-1">{article.title}</div>
                           <div className="text-xs text-slate-500 font-medium">{article.category} • Updated {article.date}</div>
                        </div>
                     </div>
                     <ChevronRight size={16} className="text-slate-600 group-hover:text-teal-500 transition-colors" />
                  </div>
               ))}
            </div>
         </div>
      </div>
    </div>
  );
}
