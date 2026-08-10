import { Metadata } from "next";
import Link from "next/link";
import { Mail, Lock, Eye, CheckCircle, ShieldCheck, Zap, User, UserCheck, Crown, Shield } from "lucide-react";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import { loginUser, loginAsRole } from "@/app/actions/auth";

export const metadata: Metadata = {
  title: "Login | Helixyn ELMS",
  description: "Sign in to Helixyn Employee Lifecycle Management System",
};

export const dynamic = 'force-dynamic';

export default async function LoginPage() {
  // Query all users for quick login switcher during testing
  let allUsers: any[] = [];
  try {
    allUsers = await prisma.user.findMany({
      orderBy: { role: 'asc' }
    });
  } catch (e) {
    console.warn("Database connection string invalid or offline. Displaying empty quick login selector.");
  }

  // Server actions for form submissions
  async function handleLogin(formData: FormData) {
    'use server';
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    try {
      const user = await loginUser(email, password);
      redirect(`/${user.role === 'admin' ? 'hr' : user.role}`);
    } catch (e: any) {
      // For development, redirect to /login with error or just handle role fallback
      redirect(`/login?error=${encodeURIComponent(e.message)}`);
    }
  }

  async function handleQuickLogin(formData: FormData) {
    'use server';
    const role = formData.get('role') as string;
    const userId = formData.get('userId') as string;
    const user = await loginAsRole(role, userId);
    redirect(`/${user.role === 'admin' ? 'hr' : user.role}`);
  }

  return (
    <div className="flex min-h-screen bg-slate-950 font-sans text-slate-300">
      {/* Left Pane - Brand / Information */}
      <div className="hidden lg:flex w-[45%] flex-col p-12 relative overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 border-r border-slate-800/50">
        
        {/* Subtle animated background elements */}
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-orange-500/10 blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-indigo-500/10 blur-[120px] pointer-events-none"></div>

        <div className="relative z-10 flex flex-col h-full justify-between max-w-lg mx-auto">
          <div>
            <div className="flex items-center gap-2 mb-10 text-orange-500 font-bold text-sm tracking-wide uppercase">
              <span className="p-1.5 bg-orange-500/10 rounded-md border border-orange-500/20">
                <Zap size={16} />
              </span>
              Next-Gen Operations
            </div>
            
            <h1 className="text-4xl font-extrabold mb-4 leading-tight tracking-tight text-white">
              Smarter Workflows. <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">
                Seamless Lifecycle.
              </span>
            </h1>
            
            <p className="text-slate-400 text-lg mb-16 leading-relaxed font-light font-medium">
              Elevate your workforce management with AI-powered onboarding, intelligent task routing, and real-time analytics.
            </p>
          </div>

          {/* Unique graphical abstraction */}
          <div className="relative w-full aspect-square max-w-[360px] mx-auto border border-slate-800 rounded-2xl flex items-center justify-center mb-10 bg-slate-900/50 backdrop-blur-sm shadow-2xl shadow-black/50 overflow-hidden group">
            
            {/* Grid pattern overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>

            <div className="w-3/5 h-3/5 rounded-full border border-orange-500/30 flex items-center justify-center relative">
               <div className="absolute inset-0 border border-orange-500/20 rounded-full animate-[spin_10s_linear_infinite]"></div>
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-orange-600 to-orange-400 shadow-[0_0_40px_rgba(249,115,22,0.4)] flex items-center justify-center text-white font-bold text-xl z-20 rotate-12 group-hover:rotate-0 transition-all duration-500">
                AI
              </div>
            </div>
            
            {/* Connecting Nodes */}
            <div className="absolute top-[15%] left-[10%] bg-slate-800/80 backdrop-blur-md p-3 rounded-lg border border-slate-700 flex flex-col items-center gap-2 z-10 w-28 transform -rotate-6 shadow-xl">
              <span className="text-xs font-medium text-slate-300 flex items-center gap-1.5"><CheckCircle size={14} className="text-indigo-400"/> HR Sync</span>
            </div>
            <div className="absolute top-[45%] right-[5%] bg-slate-800/80 backdrop-blur-md p-3 rounded-lg border border-slate-700 flex flex-col items-center gap-2 z-10 w-28 transform rotate-3 shadow-xl">
               <span className="text-xs font-medium text-slate-300 flex items-center gap-1.5"><CheckCircle size={14} className="text-purple-400"/> Automated</span>
            </div>
            <div className="absolute bottom-[15%] left-[20%] bg-slate-800/80 backdrop-blur-md p-3 rounded-lg border border-slate-700 flex flex-col items-center gap-2 z-10 w-28 transform -rotate-3 shadow-xl">
               <span className="text-xs font-medium text-slate-300 flex items-center gap-1.5"><CheckCircle size={14} className="text-orange-400"/> Onboarding</span>
            </div>
          </div>

          <div className="flex items-center justify-between gap-4 text-xs font-medium text-slate-500">
            <div className="flex items-center gap-1.5"><ShieldCheck size={16} className="text-slate-400"/> Enterprise Grade</div>
            <div className="flex items-center gap-1.5"><ShieldCheck size={16} className="text-slate-400"/> ISO 27001 Certified</div>
          </div>
        </div>
      </div>

      {/* Right Pane - Form & Developer Switcher */}
      <div className="w-full lg:w-[55%] flex flex-col items-center justify-center p-8 bg-slate-950 relative overflow-y-auto">
        <div className="w-full max-w-md relative z-10 py-12">
          {/* Logo block */}
          <div className="flex flex-col items-center justify-center mb-12">
            <div className="w-14 h-14 bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-xl flex items-center justify-center text-orange-500 mb-4 shadow-lg">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
            </div>
            <h2 className="text-2xl font-bold text-white tracking-tight">Helixyn</h2>
          </div>

          <div className="mb-10 text-center lg:text-left">
            <h1 className="text-3xl font-bold text-white mb-3 tracking-tight">Welcome back</h1>
            <p className="text-slate-400 font-medium text-sm">Sign in to continue to your enterprise workspace</p>
          </div>

          <form action={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 ml-1 uppercase tracking-wider">Email Address</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500 group-focus-within:text-orange-500 transition-colors">
                  <Mail size={18} />
                </div>
                <input 
                  type="email" 
                  name="email"
                  placeholder="name@helixyn.com" 
                  className="w-full pl-11 pr-4 py-3.5 bg-slate-900/50 border border-slate-800 rounded-xl text-white focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500 transition-all font-medium placeholder-slate-600"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-400 ml-1 uppercase tracking-wider">Password</label>
                <Link href="#" className="text-xs font-semibold text-orange-500 hover:text-orange-400 transition-colors">
                  Forgot password?
                </Link>
              </div>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500 group-focus-within:text-orange-500 transition-colors">
                  <Lock size={18} />
                </div>
                <input 
                  type="password" 
                  name="password"
                  placeholder="••••••••" 
                  className="w-full pl-11 pr-12 py-3.5 bg-slate-900/50 border border-slate-800 rounded-xl text-white focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500 transition-all font-medium font-mono tracking-widest placeholder-slate-600"
                  required
                />
              </div>
            </div>

            <div className="text-center pt-4">
              <button 
                type="submit" 
                className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3.5 px-4 rounded-xl shadow-[0_0_20px_rgba(249,115,22,0.3)] hover:shadow-[0_0_25px_rgba(249,115,22,0.5)] transition-all flex items-center justify-center gap-2 group"
              >
                Sign In to ELMS
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-1 transition-transform"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
              </button>
            </div>
          </form>

          {/* Developer Quick-Login Workspace Switcher */}
          <div className="mt-12 bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-inner">
            <h3 className="text-sm font-bold text-white flex items-center gap-2 mb-4">
              <Zap size={16} className="text-orange-500" />
              Developer Quick-Login Switcher
            </h3>
            
            <div className="grid grid-cols-2 gap-2 mb-4">
              {['hr', 'ceo', 'tl', 'employee'].map(role => (
                <form key={role} action={handleQuickLogin}>
                  <input type="hidden" name="role" value={role} />
                  <button 
                    type="submit" 
                    className="w-full py-2 px-3 bg-slate-950 border border-slate-800 hover:border-orange-500/30 rounded-xl text-xs font-bold text-slate-300 hover:text-white transition-all flex items-center justify-center gap-1.5"
                  >
                    {role === 'hr' && <UserCheck size={12} className="text-indigo-500" />}
                    {role === 'ceo' && <Crown size={12} className="text-emerald-500" />}
                    {role === 'tl' && <User size={12} className="text-indigo-500" />}
                    {role === 'employee' && <User size={12} className="text-teal-500" />}
                    Log in as {role.toUpperCase()}
                  </button>
                </form>
              ))}
            </div>

            {/* Created Employees List */}
            {allUsers.filter(u => u.role === 'employee').length > 0 && (
              <div className="border-t border-slate-800 pt-4">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block mb-2">Simulate Employee Login</span>
                <div className="flex flex-col gap-2 max-h-40 overflow-y-auto custom-scrollbar">
                  {allUsers.filter(u => u.role === 'employee').map(emp => (
                    <form key={emp.id} action={handleQuickLogin} className="w-full">
                      <input type="hidden" name="role" value="employee" />
                      <input type="hidden" name="userId" value={emp.id} />
                      <button 
                        type="submit" 
                        className="w-full py-2 px-3 bg-slate-950/60 hover:bg-slate-950 border border-slate-850 hover:border-teal-500/30 rounded-xl text-xs font-medium text-slate-400 hover:text-teal-400 transition-all flex items-center justify-between"
                      >
                        <span className="truncate">{emp.name} ({emp.status.toLowerCase().replace('_', ' ')})</span>
                        {emp.companyEmail ? (
                          <span className="text-[9px] bg-slate-900 border border-slate-800 text-teal-400 px-1.5 py-0.5 rounded font-mono">
                            {emp.companyEmail}
                          </span>
                        ) : (
                          <span className="text-[9px] bg-slate-900 border border-slate-800 text-slate-500 px-1.5 py-0.5 rounded">
                            No credentials yet
                          </span>
                        )}
                      </button>
                    </form>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
