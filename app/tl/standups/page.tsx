"use client";

import { useState, useEffect } from "react";
import { MessageSquare, Calendar, CheckCircle, Plus, X, Loader2, AlertCircle } from "lucide-react";
import { getStandups, submitStandup } from "@/app/actions/standup";
import { getUsers } from "@/app/actions/user";

export default function TLStandups() {
  const [standups, setStandups] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const [form, setForm] = useState({
    userId: "",
    yesterday: "",
    today: "",
    blockers: ""
  });

  useEffect(() => {
    Promise.all([getStandups(), getUsers()]).then(([s, u]) => {
      setStandups(s);
      setUsers(u);
    });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.userId) { setError("Please select a team member"); return; }
    if (!form.yesterday.trim() || !form.today.trim()) { setError("Yesterday and Today fields are required"); return; }

    setIsSubmitting(true);
    setError("");

    try {
      const newStandup = await submitStandup(form);
      // Reload standups
      const updated = await getStandups();
      setStandups(updated);
      setForm({ userId: "", yesterday: "", today: "", blockers: "" });
      setSuccess(true);
      setShowForm(false);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err: any) {
      setError(err?.message || "Failed to submit standup");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Daily Standups</h1>
          <p className="text-slate-400 text-sm mt-1">Asynchronous standup reports from the squad.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 px-4 py-2 rounded-lg">
             <Calendar size={16} className="text-indigo-400" />
             <span className="text-sm font-bold text-white">{new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}</span>
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg text-sm font-bold transition-all shadow-[0_0_15px_rgba(99,102,241,0.3)]"
          >
            {showForm ? <><X size={16} /> Cancel</> : <><Plus size={16} /> Submit Report</>}
          </button>
        </div>
      </div>

      {success && (
        <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl flex items-center gap-3 text-emerald-400 text-sm">
          <CheckCircle size={16} />
          Standup submitted successfully!
        </div>
      )}

      {/* Submit Form */}
      {showForm && (
        <div className="bg-slate-900/80 backdrop-blur-md rounded-2xl border border-indigo-500/30 shadow-xl overflow-hidden">
          <div className="p-5 border-b border-slate-800 bg-slate-950/30 flex items-center gap-3">
            <MessageSquare size={18} className="text-indigo-400" />
            <h2 className="text-lg font-bold text-white tracking-wide">Submit Standup Report</h2>
          </div>
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            {error && (
              <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg flex items-center gap-2 text-red-400 text-sm">
                <AlertCircle size={14} /> {error}
              </div>
            )}

            <div>
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 block">Team Member <span className="text-indigo-400">*</span></label>
              <select
                value={form.userId}
                onChange={(e) => setForm({ ...form, userId: e.target.value })}
                className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-indigo-500/50 appearance-none"
              >
                <option value="">Select team member...</option>
                {users.map(u => (
                  <option key={u.id} value={u.id}>{u.name} ({u.role})</option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 block">Yesterday <span className="text-indigo-400">*</span></label>
                <textarea
                  value={form.yesterday}
                  onChange={(e) => setForm({ ...form, yesterday: e.target.value })}
                  placeholder="What did you complete yesterday?"
                  className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-indigo-500/50 resize-none h-28 placeholder-slate-600"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 block">Today <span className="text-indigo-400">*</span></label>
                <textarea
                  value={form.today}
                  onChange={(e) => setForm({ ...form, today: e.target.value })}
                  placeholder="What are you working on today?"
                  className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-indigo-500/50 resize-none h-28 placeholder-slate-600"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 block">Blockers</label>
                <textarea
                  value={form.blockers}
                  onChange={(e) => setForm({ ...form, blockers: e.target.value })}
                  placeholder="Any blockers? Leave empty if none."
                  className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-indigo-500/50 resize-none h-28 placeholder-slate-600"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button type="button" onClick={() => setShowForm(false)} className="px-6 py-2.5 text-sm font-bold text-slate-400 hover:text-white rounded-xl transition-colors">
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-2.5 bg-indigo-500 hover:bg-indigo-600 text-white rounded-xl font-bold text-sm transition-all flex items-center gap-2 disabled:opacity-50"
              >
                {isSubmitting ? <><Loader2 size={14} className="animate-spin" /> Submitting...</> : <><CheckCircle size={14} /> Submit Standup</>}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Standup List */}
      <div className="space-y-4">
         {standups.length === 0 ? (
           <div className="text-center py-16 bg-slate-900/80 rounded-2xl border border-slate-800">
             <MessageSquare size={40} className="text-slate-700 mx-auto mb-3" />
             <p className="text-slate-500 font-medium">No standups submitted today.</p>
             <button onClick={() => setShowForm(true)} className="mt-4 text-indigo-400 hover:text-indigo-300 text-sm font-bold">
               Submit the first one →
             </button>
           </div>
         ) : standups.map(report => (
            <div key={report.id} className="bg-slate-900/80 backdrop-blur-md rounded-2xl border border-slate-800 shadow-xl overflow-hidden p-6 relative">
               <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                     <div className="w-10 h-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center font-bold text-white uppercase">
                        {(report.user?.name || '?').split(' ').map((n: string) => n[0]).join('').substring(0, 2)}
                     </div>
                     <div>
                        <div className="text-sm font-bold text-white">{report.user?.name || 'Unknown'}</div>
                        <div className="text-xs text-slate-500">{new Date(report.createdAt).toLocaleTimeString()}</div>
                     </div>
                  </div>
                  <CheckCircle size={20} className="text-emerald-500" />
               </div>
               
               <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-800/50">
                     <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Yesterday</div>
                     <p className="text-sm text-slate-300">{report.yesterday}</p>
                  </div>
                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-800/50">
                     <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Today</div>
                     <p className="text-sm text-slate-300">{report.today}</p>
                  </div>
                  <div className={`p-4 rounded-xl border ${!report.blockers ? 'bg-slate-950 border-slate-800/50' : 'bg-red-500/5 border-red-500/20'}`}>
                     <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Blockers</div>
                     <p className={`text-sm ${!report.blockers ? 'text-slate-300' : 'text-red-400 font-medium'}`}>{report.blockers || 'None'}</p>
                  </div>
               </div>
               
               <div className="mt-4 pt-4 border-t border-slate-800/50 flex justify-end">
                  <button className="text-xs font-bold text-indigo-400 hover:text-indigo-300 flex items-center gap-1.5 transition-colors">
                     <MessageSquare size={14} /> Add Comment
                  </button>
               </div>
            </div>
         ))}
      </div>
    </div>
  );
}
