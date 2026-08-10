"use client";

import { useState, useEffect } from "react";
import { Search, Plus, MoreVertical, Users, Briefcase } from "lucide-react";
import { getDepartments } from "@/app/actions/department";

export default function AdminDepartments() {
  const [departments, setDepartments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDepartments().then((data) => {
      setDepartments(data);
      setLoading(false);
    });
  }, []);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Departments</h1>
          <p className="text-slate-400 text-sm mt-1">Manage organizational units and department heads.</p>
        </div>
        <button className="px-4 py-2 bg-slate-100 hover:bg-white text-slate-900 rounded-lg text-sm font-bold flex items-center gap-2 transition-all shadow-[0_0_15px_rgba(255,255,255,0.2)]">
          <Plus size={16} /> Add Department
        </button>
      </div>

      <div className="bg-slate-900/80 backdrop-blur-md rounded-2xl border border-slate-800 shadow-xl overflow-hidden">
        <div className="p-6 border-b border-slate-800 flex items-center justify-between bg-slate-950/30">
          <div className="relative w-full md:w-64">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
            <input type="text" placeholder="Search departments..." className="w-full pl-9 pr-4 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm focus:outline-none focus:border-slate-500/50 text-white" />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-950/50 border-b border-slate-800 text-xs uppercase tracking-wider text-slate-500 font-bold">
                <th className="p-4 pl-6">Department Name</th>
                <th className="p-4">Department Head</th>
                <th className="p-4">Headcount</th>
                <th className="p-4">Annual Budget</th>
                <th className="p-4 pr-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/50">
              {departments.map(dept => (
                <tr key={dept.id} className="hover:bg-slate-950/30 transition-colors group">
                  <td className="p-4 pl-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-400 group-hover:text-white transition-colors">
                        <Briefcase size={18} />
                      </div>
                      <span className="text-sm font-bold text-white">{dept.name}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="text-sm text-slate-300 font-medium">{dept.headName}</div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-1.5 text-sm text-slate-400">
                       <Users size={14} /> {dept.users?.length || 0}
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="font-mono text-sm text-slate-300">{dept.budget}</span>
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
