"use client";

import { 
  LayoutDashboard, 
  CheckSquare,
  GraduationCap,
  BookOpen,
  MessageCircle,
  Settings, 
} from "lucide-react";
import SidebarNavLinks, { NavItem } from "./SidebarNavLinks";

export default function EmployeeNavLinks() {
  const items: NavItem[] = [
    { name: "My Dashboard", href: "/employee", icon: LayoutDashboard },
    { name: "My Tasks", href: "/employee/tasks", icon: CheckSquare },
    { name: "Training & Courses", href: "/employee/training", icon: GraduationCap },
    { name: "Company Wiki", href: "/employee/wiki", icon: BookOpen },
    
    { name: "Support", isSeparator: true },
    
    { name: "Messages", href: "/employee/messages", icon: MessageCircle },
    { name: "My Settings", href: "/employee/settings", icon: Settings, isSettings: true },
  ];

  return <SidebarNavLinks items={items} activeColorClass="bg-teal-500/10 border border-teal-500/20 text-teal-500 font-bold" baseHref="/employee" />;
}
