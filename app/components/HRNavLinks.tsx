"use client";

import { 
  LayoutDashboard, 
  Users, 
  FileText, 
  Settings, 
  MessageCircle,
} from "lucide-react";
import SidebarNavLinks, { NavItem } from "./SidebarNavLinks";

export default function HRNavLinks() {
  const items: NavItem[] = [
    { name: "HR Dashboard", href: "/hr", icon: LayoutDashboard },
    { name: "Employee Directory", href: "/hr/directory", icon: Users },
    { name: "Document Vault", href: "/hr/documents", icon: FileText },
    { name: "HR Channels", href: "/hr/messages", icon: MessageCircle },
    
    { name: "System Administration", isSeparator: true },
    
    { name: "Departments", href: "/hr/departments", icon: LayoutDashboard },
    { name: "Analytics", href: "/hr/analytics", icon: FileText },
    { name: "Audit Log", href: "/hr/audit", icon: Settings },
    
    { name: "HR Settings", href: "/hr/settings", icon: Settings, isSettings: true },
  ];

  return <SidebarNavLinks items={items} activeColorClass="bg-orange-500/10 border border-orange-500/20 text-orange-500 font-bold" baseHref="/hr" />;
}
