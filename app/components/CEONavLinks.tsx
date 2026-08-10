"use client";

import { 
  LayoutDashboard, 
  Users, 
  Network,
  Briefcase, 
  FileText,
  Settings 
} from "lucide-react";
import SidebarNavLinks, { NavItem } from "./SidebarNavLinks";

export default function CEONavLinks() {
  const items: NavItem[] = [
    { name: "Dashboard", href: "/ceo", icon: LayoutDashboard },
    { name: "Employees", href: "/ceo/employees", icon: Users },
    { name: "Teams", href: "/ceo/teams", icon: Network },
    { name: "Projects", href: "/ceo/projects", icon: Briefcase },
    { name: "Documents", href: "/ceo/documents", icon: FileText },
    { name: "Settings", href: "/ceo/settings", icon: Settings, isSettings: true },
  ];

  return <SidebarNavLinks items={items} activeColorClass="bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 font-bold" baseHref="/ceo" />;
}
