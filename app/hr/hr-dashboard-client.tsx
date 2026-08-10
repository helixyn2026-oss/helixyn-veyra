'use client';

import { 
  FileText,
  PlusCircle
} from "lucide-react";
import { useState } from "react";
import { createOfferDraft, signAndSendOffer } from "@/app/actions/workflow";

export default function HRDashboardClient({ drafts }: { drafts: any[] }) {
  const [candidateName, setCandidateName] = useState("");
  const [candidateEmail, setCandidateEmail] = useState("");
  const [role, setRole] = useState("");
  const [salaryBand, setSalaryBand] = useState("");
  const [joiningDate, setJoiningDate] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);

  return (
    <div className="flex flex-col gap-6 pb-12">
      {/* Header section */}
      <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            HR Onboarding Operations
          </h1>
          <p className="text-slate-400 text-sm mt-1">Draft offer letters and manage candidate statuses.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-2">
        {/* Left Column: Form */}
        <div className="bg-slate-900/80 backdrop-blur-md rounded-2xl border border-slate-800 shadow-xl overflow-hidden h-fit">
          <div className="p-5 border-b border-slate-800 bg-slate-950/30 flex items-center gap-3">
            <PlusCircle size={18} className="text-orange-500" />
            <h2 className="text-lg font-bold text-white tracking-wide">Draft New Offer</h2>
          </div>
          <div className="p-5">
            <form action={async (formData) => {
              setIsSubmitting(true);
              try {
                await createOfferDraft({
                  candidateName: formData.get('candidateName') as string,
                  candidateEmail: formData.get('candidateEmail') as string,
                  role: formData.get('role') as string,
                  salaryBand: formData.get('salaryBand') as string,
                  joiningDate: formData.get('joiningDate') as string,
                });
                // Reset form state on success
                setCandidateName("");
                setCandidateEmail("");
                setRole("");
                setSalaryBand("");
                setJoiningDate("");
              } finally {
                setIsSubmitting(false);
              }
            }} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Candidate Name</label>
                <input required name="candidateName" type="text" value={candidateName} onChange={e => setCandidateName(e.target.value)} className="bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-sm text-white focus:outline-none focus:border-orange-500" placeholder="Jane Doe" />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Email Address</label>
                <input required name="candidateEmail" type="email" value={candidateEmail} onChange={e => setCandidateEmail(e.target.value)} className="bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-sm text-white focus:outline-none focus:border-orange-500" placeholder="jane@example.com" />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Role</label>
                <input required name="role" type="text" value={role} onChange={e => setRole(e.target.value)} className="bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-sm text-white focus:outline-none focus:border-orange-500" placeholder="Senior Engineer" />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Salary Band</label>
                <input required name="salaryBand" type="text" value={salaryBand} onChange={e => setSalaryBand(e.target.value)} className="bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-sm text-white focus:outline-none focus:border-orange-500" placeholder="$120k - $140k" />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Joining Date</label>
                <input required name="joiningDate" type="date" value={joiningDate} onChange={e => setJoiningDate(e.target.value)} className="bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-sm text-slate-300 focus:outline-none focus:border-orange-500" />
              </div>
              <button disabled={isSubmitting} type="submit" className="mt-2 w-full py-3 bg-orange-500 hover:bg-orange-600 disabled:opacity-50 text-white rounded-xl font-bold text-sm transition-all shadow-[0_0_15px_rgba(249,115,22,0.3)]">
                {isSubmitting ? "Drafting..." : "Draft Offer & Generate Signature OTP"}
              </button>
            </form>
          </div>
        </div>

        {/* Right Column: Real-time Template Preview */}
        <div className="bg-slate-900/80 backdrop-blur-md rounded-2xl border border-slate-800 shadow-xl overflow-hidden h-fit">
          <div className="p-5 border-b border-slate-800 bg-slate-950/30 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <FileText size={18} className="text-indigo-500" />
              <h2 className="text-lg font-bold text-white tracking-wide">Live Offer Preview</h2>
            </div>
            <span className="text-xs font-bold bg-indigo-500/10 text-indigo-500 px-2 py-1 rounded">FIXED TEMPLATE</span>
          </div>
          <div className="p-8 bg-white text-slate-800 font-serif min-h-[300px] leading-relaxed relative">
            {/* Watermark */}
            <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none">
              <span className="text-8xl font-black rotate-[-30deg]">Helixyn</span>
            </div>
            
            <h1 className="text-xl font-bold text-center text-slate-900 mb-6 uppercase tracking-widest border-b pb-4">Offer of Employment</h1>
            
            <p className="mb-4">
              Dear <strong>{candidateName || "[Candidate Name]"}</strong>,
            </p>
            
            <p className="mb-4">
              We are delighted to offer you employment at Helixyn in the position of <strong>{role || "[Role]"}</strong>. Your anticipated start date is <strong>{joiningDate || "[Joining Date]"}</strong>, and your starting compensation is set at the <strong>{salaryBand || "[Salary Band]"}</strong> band.
            </p>
            
            <p className="mb-6">
              Your onboarding checklist is ready inside the ELMS system, and access to all corporate tools (GitHub, Slack, Jira) will be automatically provisioned upon your review and signature.
            </p>
            
            <p className="mb-2">Sincerely,</p>
            <p className="font-bold text-slate-900 italic">Helixyn Executive Management Team</p>
          </div>
        </div>
      </div>

      {/* Bottom Row: List of Drafts */}
      <div className="bg-slate-900/80 backdrop-blur-md rounded-2xl border border-slate-800 shadow-xl overflow-hidden mt-2">
        <div className="p-5 border-b border-slate-800 bg-slate-950/30 flex items-center gap-3">
          <FileText size={18} className="text-slate-400" />
          <h2 className="text-lg font-bold text-white tracking-wide">Recent Offer Drafts</h2>
        </div>
        <div className="p-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {drafts.map(draft => (
            <div key={draft.id} className="bg-slate-950/50 border border-slate-800 rounded-xl p-5 flex flex-col justify-between gap-4 transition-all hover:border-slate-700">
              <div className="flex flex-col gap-1">
                <h3 className="text-base font-bold text-white flex items-center justify-between gap-2">
                  {draft.candidateName}
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-widest ${
                    draft.status === 'PENDING_SIGNATURE' ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20' :
                    draft.status === 'APPROVED' ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20' :
                    draft.status === 'ACCEPTED' ? 'bg-indigo-500/10 text-indigo-500 border border-indigo-500/20' :
                    'bg-red-500/10 text-red-500 border border-red-500/20'
                  }`}>
                    {draft.status}
                  </span>
                </h3>
                <div className="text-xs text-slate-400 font-medium truncate mt-1">
                  {draft.candidateEmail}
                </div>
                <div className="text-xs text-slate-400 font-medium">
                  {draft.role} • {draft.salaryBand}
                </div>
              </div>
              <div className="flex flex-col gap-2 mt-2">
                <div className="text-xs text-slate-500">
                  Drafted: {new Date(draft.createdAt).toLocaleDateString()}
                </div>
                
                {draft.status === 'PENDING_SIGNATURE' && (
                  <form action={async (formData) => {
                    const otp = formData.get('otp') as string;
                    if (otp) {
                      await signAndSendOffer(draft.id, otp);
                    }
                  }} className="flex items-center gap-2 mt-2 border-t border-slate-800 pt-3">
                    <input 
                      required 
                      type="text" 
                      name="otp"
                      placeholder="Enter 6-digit OTP" 
                      className="bg-slate-900 border border-slate-700 rounded p-2 text-xs text-white focus:outline-none focus:border-emerald-500 w-full font-mono tracking-widest"
                      maxLength={6}
                    />
                    <button type="submit" className="bg-emerald-500 hover:bg-emerald-600 text-white rounded px-3 py-2 text-xs font-bold whitespace-nowrap">
                      Sign & Send
                    </button>
                  </form>
                )}
              </div>
            </div>
          ))}
          
          {drafts.length === 0 && (
            <div className="text-center py-8 col-span-full">
                <div className="w-12 h-12 bg-slate-900 border border-slate-800 rounded-full flex items-center justify-center mx-auto mb-3 text-slate-600">
                  <FileText size={20} />
                </div>
                <h3 className="text-base font-bold text-slate-300 mb-1">No Drafts Yet</h3>
                <p className="text-xs text-slate-500">Create your first offer letter draft above.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
