import { prisma } from '@/lib/db';
import { Shield, Clock, Search, Activity, User, FileText } from 'lucide-react';

export default async function AuditLogPage() {
  const logs = await prisma.auditLog.findMany({
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div className="flex flex-col gap-6 pb-12">
      {/* Header section */}
      <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            System Audit Log
          </h1>
          <p className="text-slate-400 text-sm mt-1">Immutable record of critical state transitions and access provisioning.</p>
        </div>
      </div>

      <div className="bg-slate-900/80 backdrop-blur-md rounded-2xl border border-slate-800 shadow-xl overflow-hidden mt-2">
        <div className="p-6 border-b border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-950/30">
          <div className="flex items-center gap-3">
             <div className="bg-red-500/10 border border-red-500/20 text-red-500 p-2 rounded-lg">
                <Shield size={20} />
             </div>
             <div>
               <h2 className="text-lg font-bold text-white tracking-wide">Security & Transition Logs</h2>
               <p className="text-xs text-slate-500 font-medium mt-0.5">Chronological record of onboarding actions</p>
             </div>
          </div>
          
          <div className="relative">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
            <input 
              type="text" 
              placeholder="Search logs..." 
              className="pl-9 pr-4 py-2.5 bg-slate-950 border border-slate-800 rounded-lg text-xs focus:outline-none focus:border-red-500/50 text-white w-56 md:w-64 placeholder-slate-600 shadow-inner"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-slate-950/50 text-slate-400 text-[11px] uppercase font-bold tracking-widest">
              <tr>
                <th className="px-6 py-4">Timestamp</th>
                <th className="px-6 py-4">Action</th>
                <th className="px-6 py-4">Actor</th>
                <th className="px-6 py-4 w-full">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/50">
              {logs.map((log) => (
                <tr key={log.id} className="hover:bg-slate-800/50 transition-colors group">
                  <td className="px-6 py-4 text-slate-400 text-xs font-medium flex items-center gap-2">
                    <Clock size={12} className="text-slate-500" />
                    {new Date(log.createdAt).toLocaleString()}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold border uppercase tracking-widest ${
                      log.action.includes('REJECTED') ? 'bg-red-500/10 border-red-500/20 text-red-400' :
                      log.action.includes('APPROVED') || log.action.includes('ACCEPTED') ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' :
                      log.action.includes('PROVISIONED') || log.action.includes('ISSUED') ? 'bg-indigo-500/10 border-indigo-500/20 text-indigo-400' :
                      'bg-slate-800 border-slate-700 text-slate-300'
                    }`}>
                      {log.action}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                     <div className="flex items-center gap-2 text-slate-300 text-xs font-bold">
                       <User size={12} className="text-slate-500" />
                       {log.actor}
                     </div>
                  </td>
                  <td className="px-6 py-4 text-slate-400 text-xs whitespace-normal min-w-[300px]">
                     <div className="flex items-start gap-2">
                       <FileText size={12} className="text-slate-500 shrink-0 mt-0.5" />
                       {log.details}
                     </div>
                  </td>
                </tr>
              ))}
              {logs.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center text-slate-500">
                    <Activity size={24} className="mx-auto mb-2 text-slate-600" />
                    No audit logs recorded yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
