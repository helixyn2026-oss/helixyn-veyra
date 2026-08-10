import { Metadata } from "next";
import Link from "next/link";
import { 
  LogOut,
  Bell,
  Search,
  User,
  Coffee
} from "lucide-react";
import { getCurrentUser } from "@/app/actions/auth";
import NotificationBell from "@/app/components/NotificationBell";
import EmployeeNavLinks from "@/app/components/EmployeeNavLinks";

export const metadata: Metadata = {
  title: "Employee Portal | Helixyn ELMS",
  description: "Employee workspace for Helixyn",
};

export default async function EmployeeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();
  const userName = user?.name || "John Doe";
  const userEmail = user?.companyEmail || user?.email || "j.doe@helixyn.com";
  const userTitle = user?.title || "Frontend Developer";
  const userInitials = userName.split(' ').map((n: string) => n[0]).join('').substring(0, 2).toUpperCase();

  return (
    <div className="flex h-screen bg-slate-950 font-sans text-slate-300 overflow-hidden">
      {/* Sidebar */}
      <aside className="w-[260px] bg-slate-900 border-r border-slate-800 flex flex-col h-full shrink-0 transition-all duration-300 relative z-20">
        {/* Brand */}
        <div className="h-16 flex items-center px-6 border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-3 w-full">
            <div className="w-8 h-8 bg-gradient-to-br from-teal-500 to-teal-600 rounded-lg flex items-center justify-center shrink-0 text-white shadow-lg shadow-teal-500/20">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-sm tracking-wide text-white">Helixyn</span>
              <span className="text-[10px] text-teal-400 font-bold uppercase tracking-widest">Workspace</span>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto py-6 px-4 flex flex-col gap-1.5 custom-scrollbar">
          <div className="mb-4 px-2 relative">
             <Search size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
             <input type="text" placeholder="Search..." className="w-full bg-slate-950 border border-slate-800 rounded-md py-1.5 pl-9 pr-3 text-xs focus:outline-none focus:border-teal-500/50 text-white placeholder-slate-600" />
          </div>

          <EmployeeNavLinks />
        </div>

        {/* User profile */}
        <div className="p-4 border-t border-slate-800 shrink-0 bg-slate-900/50">
          <Link href="/login" className="flex items-center gap-3 w-full text-left p-2 rounded-lg hover:bg-slate-800 transition-colors border border-transparent hover:border-slate-700">
            <div className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center font-bold text-xs text-white">
              {userInitials}
            </div>
            <div className="flex-1 overflow-hidden">
              <div className="text-sm font-bold text-white truncate">{userName}</div>
              <div className="text-[11px] text-slate-500 truncate font-medium">{userTitle}</div>
            </div>
            <LogOut size={16} className="text-slate-500 hover:text-teal-500 transition-colors" />
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden bg-slate-950 relative">
        
        {/* Subtle background glow */}
        <div className="absolute top-0 left-1/4 w-[50%] h-[300px] bg-teal-500/5 blur-[150px] rounded-full pointer-events-none"></div>

        {/* Top Header */}
        <header className="h-16 bg-slate-900/50 backdrop-blur-md border-b border-slate-800 flex items-center justify-between px-8 shrink-0 z-10 sticky top-0">
          <div className="flex items-center gap-4">
            <h2 className="text-lg font-bold text-white">Employee Workspace</h2>
            <span className="bg-slate-800 border border-slate-700 text-teal-400 p-1 rounded text-xs">
              <Coffee size={14} className="text-teal-500" />
            </span>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="text-[11px] text-slate-500 font-semibold uppercase tracking-wider hidden md:block">
              Role: Onboardee
            </div>
            
            <div className="flex items-center gap-3 border-l border-slate-800 pl-6">
              <NotificationBell userId={user?.id} role="employee" />
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 overflow-auto p-8 relative z-0">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}
