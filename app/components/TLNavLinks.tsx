"use client";

import { 
  LayoutDashboard, 
  ClipboardList,
  MessageCircle,
  Settings, 
} from "lucide-react";
import SidebarNavLinks, { NavItem } from "./SidebarNavLinks";

export default function TLNavLinks() {
  const items: NavItem[] = [
    { name: "My Team", href: "/tl", icon: LayoutDashboard },
    { name: "Project Sprints", href: "/tl/sprints", icon: ClipboardList },
    { name: "Standups", href: "/tl/standups", icon: MessageCircle },
    { name: "Squad Settings", href: "/tl/settings", icon: Settings, isSettings: true },
  ];

  return <SidebarNavLinks items={items} activeColorClass="bg-indigo-500/10 border border-indigo-500/20 text-indigo-500 font-bold" baseHref="/tl" />;
}
