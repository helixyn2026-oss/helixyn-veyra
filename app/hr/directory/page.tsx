"use client";

import { useState, useEffect } from "react";
import { Search, Filter, MoreVertical, Mail, Phone, Download } from "lucide-react";
import { getUsers } from "@/app/actions/user";

export default function HRDirectory() {
  const [search, setSearch] = useState("");
  const [employees, setEmployees] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getUsers().then((data) => {
      setEmployees(data);
      setLoading(false);
    });
  }, []);

  const filteredEmployees = employees.filter(emp => 
    emp.name?.toLowerCase().includes(search.toLowerCase()) || 
    (emp.department?.name || '').toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Employee Directory</h1>
          <p className="text-slate-400 text-sm mt-1">Manage and view all personnel records.</p>
        </div>
        <button className="px-4 py-2 bg-slate-900 border border-slate-800 hover:border-orange-500/50 text-slate-300 rounded-lg text-sm font-bold flex items-center gap-2 transition-all">
          <Download size={16} /> Export CSV
        </button>
      </div>

      <div className="bg-slate-900/80 backdrop-blur-md rounded-2xl border border-slate-800 shadow-xl overflow-hidden">
        <div className="p-6 border-b border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-950/30">
          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="relative w-full md:w-64">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
              <input 
                type="text" 
                placeholder="Search employees..." 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm focus:outline-none focus:border-orange-500/50 text-white" 
              />
            </div>
            <button className="p-2 bg-slate-950 border border-slate-800 rounded-lg text-slate-400 hover:text-white transition-colors">
              <Filter size={16} />
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-950/50 border-b border-slate-800 text-xs uppercase tracking-wider text-slate-500 font-bold">
                <th className="p-4 pl-6">Employee</th>
                <th className="p-4">Department</th>
                <th className="p-4">Contact</th>
                <th className="p-4">Status</th>
                <th className="p-4 pr-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/50">
              {filteredEmployees.map(emp => (
                <tr key={emp.id} className="hover:bg-slate-950/30 transition-colors group">
                  <td className="p-4 pl-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center font-bold text-white uppercase">
                        {emp.name ? emp.name.split(' ').map((n: string) => n[0]).join('').substring(0, 2) : '?'}
                      </div>
                      <div>
                        <div className="text-sm font-bold text-white group-hover:text-orange-400 transition-colors">{emp.name}</div>
                        <div className="text-xs text-slate-500">{emp.title || emp.role}</div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="bg-slate-900 border border-slate-800 px-2.5 py-1 rounded-md text-xs font-semibold text-slate-300">
                      {emp.department?.name || 'Unassigned'}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex flex-col gap-1">
                      <a href={`mailto:${emp.email}`} className="text-xs text-slate-400 hover:text-orange-400 flex items-center gap-1.5 transition-colors">
                         <Mail size={12} /> {emp.email}
                      </a>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className={`px-2.5 py-1 rounded text-[10px] font-bold uppercase tracking-wider ${
                      emp.status === 'active' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                      emp.status === 'onboarding' ? 'bg-orange-500/10 text-orange-400 border border-orange-500/20' :
                      'bg-slate-500/10 text-slate-400 border border-slate-500/20'
                    }`}>
                      {emp.status}
                    </span>
                  </td>
                  <td className="p-4 pr-6 text-right">
                    <button className="p-2 text-slate-500 hover:text-white transition-colors">
                      <MoreVertical size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
