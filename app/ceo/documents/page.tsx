import React from 'react';
import { Search, Filter, Folder, FileText, Upload, MoreVertical, File, Lock, Unlock } from 'lucide-react';

const DOCUMENTS = [
  { id: 1, name: 'Employee Handbook 2026.pdf', type: 'PDF', size: '2.4 MB', updated: 'Oct 12, 2026', access: 'Public', icon: FileText },
  { id: 2, name: 'Q3 Financial Report.xlsx', type: 'Spreadsheet', size: '1.1 MB', updated: 'Oct 05, 2026', access: 'Executive', icon: File },
  { id: 3, name: 'Benefits Overview.pdf', type: 'PDF', size: '4.8 MB', updated: 'Sep 28, 2026', access: 'Public', icon: FileText },
  { id: 4, name: 'Board Presentation.pptx', type: 'Presentation', size: '12.5 MB', updated: 'Sep 15, 2026', access: 'Executive', icon: File },
];

const FOLDERS = [
  { id: 1, name: 'Company Policies', count: 12, color: 'text-blue-500' },
  { id: 2, name: 'Financials', count: 8, color: 'text-emerald-500' },
  { id: 3, name: 'Legal & Contracts', count: 45, color: 'text-amber-500' },
  { id: 4, name: 'HR Templates', count: 24, color: 'text-purple-500' },
];

export default function CEODocumentsPage() {
  return (
    <div className="flex flex-col gap-8 max-w-6xl mx-auto pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Document Vault</h1>
          <p className="text-slate-400 text-sm mt-1">Securely manage organization-wide files and contracts.</p>
        </div>
        <button className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-slate-900 rounded-lg font-bold text-xs transition-all flex items-center gap-2 shadow-[0_0_15px_rgba(16,185,129,0.3)]">
          <Upload size={14} /> Upload Document
        </button>
      </div>

      {/* Controls */}
      <div className="bg-slate-900/80 backdrop-blur-md rounded-2xl border border-slate-800 p-4 flex flex-col md:flex-row gap-4 justify-between items-center shadow-xl">
        <div className="relative w-full md:w-96">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
          <input 
            type="text" 
            placeholder="Search documents by name or type..." 
            className="w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm focus:outline-none focus:border-emerald-500/50 text-white"
          />
        </div>
        <button className="px-4 py-2.5 bg-slate-950 border border-slate-800 hover:border-slate-700 text-slate-300 rounded-xl font-bold text-xs transition-all flex items-center gap-2 w-full md:w-auto justify-center">
          <Filter size={14} /> Filters
        </button>
      </div>

      {/* Folders Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {FOLDERS.map(folder => (
          <div key={folder.id} className="bg-slate-900/80 backdrop-blur-md border border-slate-800 hover:border-emerald-500/50 rounded-2xl p-5 transition-all cursor-pointer group shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 bg-slate-950 rounded-xl ${folder.color} border border-slate-800 group-hover:scale-110 transition-transform`}>
                <Folder size={24} />
              </div>
              <MoreVertical size={16} className="text-slate-600 group-hover:text-slate-400" />
            </div>
            <h3 className="text-white font-bold text-sm group-hover:text-emerald-400 transition-colors">{folder.name}</h3>
            <p className="text-xs text-slate-500 mt-1">{folder.count} files</p>
          </div>
        ))}
      </div>

      {/* Recent Files */}
      <div className="bg-slate-900/80 backdrop-blur-md rounded-2xl border border-slate-800 shadow-xl overflow-hidden mt-2">
        <div className="p-6 border-b border-slate-800 bg-slate-950/30">
          <h2 className="text-lg font-bold text-white">Recent Documents</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-950/50 border-b border-slate-800">
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Name</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Access</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Size</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Last Updated</th>
                <th className="px-6 py-4 text-right text-xs font-bold text-slate-400 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/50">
              {DOCUMENTS.map((doc) => {
                const DocIcon = doc.icon;
                return (
                  <tr key={doc.id} className="hover:bg-slate-800/20 transition-colors group">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-slate-800/50 border border-slate-700/50 text-slate-400 group-hover:text-emerald-500 transition-colors">
                          <DocIcon size={16} />
                        </div>
                        <span className="text-sm font-bold text-white group-hover:text-emerald-400 transition-colors">{doc.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-1.5 text-xs font-medium">
                        {doc.access === 'Executive' ? (
                          <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-amber-500/10 text-amber-500 border border-amber-500/20">
                            <Lock size={12} /> Executive Only
                          </span>
                        ) : (
                          <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-800 text-slate-400 border border-slate-700">
                            <Unlock size={12} /> Public
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-400">
                      {doc.size}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-400">
                      {doc.updated}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <button className="text-slate-500 hover:text-white transition-colors p-2 rounded-lg hover:bg-slate-800">
                        <MoreVertical size={16} />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
