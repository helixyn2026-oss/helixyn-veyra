import { prisma } from '@/lib/db';
import { acceptOffer } from '@/app/actions/workflow';
import { CheckCircle, AlertCircle, Building2, Briefcase, Mail } from 'lucide-react';
import { redirect } from 'next/navigation';

export default async function AcceptOfferPage({ params }: { params: Promise<{ token: string }> }) {
  const resolvedParams = await params;
  const token = resolvedParams.token;
  
  const draft = await prisma.offerDraft.findUnique({
    where: { acceptanceToken: token }
  });

  if (!draft) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 max-w-md w-full text-center shadow-2xl">
          <AlertCircle size={48} className="text-red-500 mx-auto mb-4" />
          <h1 className="text-xl font-bold text-white mb-2">Invalid Offer Link</h1>
          <p className="text-slate-400 text-sm">This offer link is invalid or has expired. Please contact HR for assistance.</p>
        </div>
      </div>
    );
  }

  if (draft.status === 'ACCEPTED') {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 max-w-md w-full text-center shadow-2xl">
          <CheckCircle size={48} className="text-emerald-500 mx-auto mb-4" />
          <h1 className="text-xl font-bold text-white mb-2">Offer Accepted!</h1>
          <p className="text-slate-400 text-sm mb-6">You have already accepted this offer. Your onboarding credentials have been sent to your personal email.</p>
          <a href="/login" className="inline-block px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-xl font-bold text-sm transition-all shadow-[0_0_15px_rgba(249,115,22,0.3)]">
            Go to Login
          </a>
        </div>
      </div>
    );
  }

  if (draft.status !== 'APPROVED') {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 max-w-md w-full text-center shadow-2xl">
          <AlertCircle size={48} className="text-emerald-500 mx-auto mb-4" />
          <h1 className="text-xl font-bold text-white mb-2">Offer Not Ready</h1>
          <p className="text-slate-400 text-sm">This offer is currently {draft.status.toLowerCase()}. It cannot be accepted at this time.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
      <div className="bg-slate-900/80 backdrop-blur-md rounded-3xl border border-slate-800 shadow-2xl max-w-2xl w-full overflow-hidden">
        <div className="p-8 border-b border-slate-800 bg-gradient-to-br from-slate-900 to-slate-950 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/10 rounded-full blur-[80px] pointer-events-none"></div>
          <Building2 size={40} className="text-orange-500 mx-auto mb-4 relative z-10" />
          <h1 className="text-3xl font-extrabold text-white mb-2 relative z-10">Welcome to Helixyn</h1>
          <p className="text-slate-400 text-sm max-w-md mx-auto relative z-10">
            We are thrilled to extend this offer of employment to you, {draft.candidateName}.
          </p>
        </div>

        <div className="p-8">
          <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 mb-8">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">Offer Details</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-slate-900 rounded-lg text-slate-400">
                  <Briefcase size={16} />
                </div>
                <div>
                  <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Role</div>
                  <div className="text-sm font-semibold text-white">{draft.role}</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="p-2 bg-slate-900 rounded-lg text-slate-400">
                  <Mail size={16} />
                </div>
                <div>
                  <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Personal Email</div>
                  <div className="text-sm font-semibold text-white">{draft.candidateEmail}</div>
                </div>
              </div>
            </div>
          </div>

          <form action={async () => {
            'use server';
            await acceptOffer(token);
            redirect(`/accept-offer/${token}`);
          }}>
            <button type="submit" className="w-full py-4 bg-gradient-to-r from-orange-500 to-emerald-500 hover:from-orange-600 hover:to-emerald-600 text-white rounded-xl font-extrabold text-base transition-all shadow-[0_0_20px_rgba(249,115,22,0.3)] hover:shadow-[0_0_30px_rgba(249,115,22,0.5)] flex items-center justify-center gap-2">
              <CheckCircle size={20} /> I Accept the Offer
            </button>
          </form>
          <p className="text-center text-xs text-slate-500 mt-4">
            By clicking accept, you acknowledge our terms of employment and initiate the creation of your corporate profile. Your login credentials will be emailed to you immediately.
          </p>
        </div>
      </div>
    </div>
  );
}
