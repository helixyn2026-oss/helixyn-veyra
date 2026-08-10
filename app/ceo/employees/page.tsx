import React from 'react';
import { Search, Filter, MoreVertical, UserPlus, Download, UserCircle } from 'lucide-react';

const EMPLOYEES = [
  { id: 1, name: 'Alex Johnson', role: 'Senior Developer', department: 'Engineering', status: 'Active', avatar: 'AJ' },
  { id: 2, name: 'Sarah Williams', role: 'Product Manager', department: 'Product', status: 'Active', avatar: 'SW' },
  { id: 3, name: 'Michael Chen', role: 'UX Designer', department: 'Design', status: 'On Leave', avatar: 'MC' },
  { id: 4, name: 'Emily Davis', role: 'Marketing Lead', department: 'Marketing', status: 'Active', avatar: 'ED' },
  { id: 5, name: 'James Wilson', role: 'Sales Rep', department: 'Sales', status: 'Active', avatar: 'JW' },
];

export default function CEOEmployeesPage() {
  return (
    <div className="flex flex-col gap-8 max-w-6xl mx-auto pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Employee Directory</h1>
          <p className="text-slate-400 text-sm mt-1">Manage and view all personnel across the organization.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 bg-slate-900 border border-slate-700 hover:border-slate-500 text-white rounded-lg font-bold text-xs transition-all flex items-center gap-2">
            <Download size={14} /> Export CSV
          </button>
          <button className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-slate-900 rounded-lg font-bold text-xs transition-all flex items-center gap-2 shadow-[0_0_15px_rgba(16,185,129,0.3)]">
            <UserPlus size={14} /> Add Employee
          </button>
        </div>
      </div>

      {/* Controls */}
      <div className="bg-slate-900/80 backdrop-blur-md rounded-2xl border border-slate-800 p-4 flex flex-col md:flex-row gap-4 justify-between items-center shadow-xl">
        <div className="relative w-full md:w-96">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
          <input 
            type="text" 
            placeholder="Search employees by name, role, or department..." 
            className="w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm focus:outline-none focus:border-emerald-500/50 text-white"
          />
        </div>
        <button className="px-4 py-2.5 bg-slate-950 border border-slate-800 hover:border-slate-700 text-slate-300 rounded-xl font-bold text-xs transition-all flex items-center gap-2 w-full md:w-auto justify-center">
          <Filter size={14} /> Filters
        </button>
      </div>

      {/* Employee List */}
      <div className="bg-slate-900/80 backdrop-blur-md rounded-2xl border border-slate-800 shadow-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-950/50 border-b border-slate-800">
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Employee Name</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Role</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Department</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-right text-xs font-bold text-slate-400 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/50">
              {EMPLOYEES.map((emp) => (
                <tr key={emp.id} className="hover:bg-slate-800/20 transition-colors group">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-xs font-bold text-white shadow-inner">
                        {emp.avatar}
                      </div>
                      <div>
                        <div className="text-sm font-bold text-white group-hover:text-emerald-400 transition-colors">{emp.name}</div>
                        <div className="text-[11px] text-slate-500">{emp.role}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-slate-300">{emp.role}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-slate-400">{emp.department}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      emp.status === 'Active' 
                        ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20' 
                        : 'bg-amber-500/10 text-amber-500 border border-amber-500/20'
                    }`}>
                      {emp.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <button className="text-slate-500 hover:text-white transition-colors p-2 rounded-lg hover:bg-slate-800">
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
