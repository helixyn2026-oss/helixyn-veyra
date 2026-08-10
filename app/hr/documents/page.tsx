"use client";

import { useState, useEffect } from "react";
import { FileText, Download, Upload, Search, Filter, CheckCircle, Clock } from "lucide-react";
import { getDocuments } from "@/app/actions/document";

export default function HRDocuments() {
  const [documents, setDocuments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDocuments().then(data => {
      setDocuments(data);
      setLoading(false);
    });
  }, []);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Document Vault</h1>
          <p className="text-slate-400 text-sm mt-1">Securely manage employee documents and compliance forms.</p>
        </div>
        <button className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-slate-900 rounded-lg text-sm font-bold flex items-center gap-2 transition-all shadow-[0_0_15px_rgba(249,115,22,0.3)]">
          <Upload size={16} /> Upload Document
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-2">
         {['All Documents', 'Pending Verification', 'Contracts', 'Policies'].map((stat, i) => (
           <div key={i} className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 flex items-center justify-between cursor-pointer hover:border-orange-500/50 transition-all group">
              <span className="text-sm font-bold text-slate-400 group-hover:text-white transition-colors">{stat}</span>
              <span className="text-lg font-extrabold text-orange-500">{Math.floor(Math.random() * 50) + 1}</span>
           </div>
         ))}
      </div>

      <div className="bg-slate-900/80 backdrop-blur-md rounded-2xl border border-slate-800 shadow-xl overflow-hidden">
        <div className="p-6 border-b border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-950/30">
          <div className="relative w-full md:w-64">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
            <input type="text" placeholder="Search documents..." className="w-full pl-9 pr-4 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm focus:outline-none focus:border-orange-500/50 text-white" />
          </div>
          <button className="p-2 bg-slate-950 border border-slate-800 rounded-lg text-slate-400 hover:text-white transition-colors">
            <Filter size={16} />
          </button>
        </div>

        <div className="p-4 grid grid-cols-1 gap-2">
           {documents.map(doc => (
             <div key={doc.id} className="p-4 border border-slate-800 bg-slate-950/50 hover:bg-slate-900 rounded-xl flex flex-col md:flex-row md:items-center justify-between gap-4 transition-all group">
                <div className="flex items-center gap-4">
                   <div className="w-12 h-12 bg-slate-900 border border-slate-800 text-slate-400 rounded-lg flex items-center justify-center group-hover:text-orange-500 group-hover:border-orange-500/30 transition-colors">
                      <FileText size={24} />
                   </div>
                   <div>
                      <h4 className="text-sm font-bold text-white mb-1 group-hover:text-orange-400 transition-colors">{doc.name}</h4>
                      <div className="text-xs text-slate-500 flex items-center gap-3">
                         <span className="bg-slate-800 px-2 py-0.5 rounded text-slate-300">{doc.type}</span>
                         <span>{doc.user?.name || 'All Employees'}</span>
                         <span>{new Date(doc.createdAt).toLocaleDateString()}</span>
                      </div>
                   </div>
                </div>
                
                <div className="flex items-center gap-4">
                   {doc.status === 'verified' && <span className="flex items-center gap-1.5 text-xs font-bold text-emerald-400"><CheckCircle size={14}/> Verified</span>}
                   {doc.status === 'pending' && <span className="flex items-center gap-1.5 text-xs font-bold text-orange-400"><Clock size={14}/> Pending</span>}
                   {doc.status === 'published' && <span className="flex items-center gap-1.5 text-xs font-bold text-indigo-400"><CheckCircle size={14}/> Published</span>}
                   
                   <button className="p-2 bg-slate-800 hover:bg-orange-500 hover:text-slate-900 text-slate-300 rounded-lg transition-colors">
                      <Download size={16} />
                   </button>
                </div>
             </div>
           ))}
        </div>
      </div>
    </div>
  );
}
