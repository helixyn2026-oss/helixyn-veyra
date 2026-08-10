"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LucideIcon } from "lucide-react";

export interface NavItem {
  name: string;
  href?: string;
  icon?: LucideIcon;
  isSettings?: boolean;
  isSeparator?: boolean;
}

export default function SidebarNavLinks({ items, activeColorClass, baseHref }: { items: NavItem[], activeColorClass: string, baseHref: string }) {
  const pathname = usePathname();

  const checkIsActive = (href?: string) => {
      if (!href) return false;
      if (href === baseHref) {
          return pathname === baseHref;
      }
      return pathname.startsWith(href);
  };

  return (
    <>
      {items.map((item, index) => {
        if (item.isSeparator) {
            return (
                <div key={`sep-${index}`} className="mt-4 mb-2 px-3 text-[10px] font-bold uppercase tracking-widest text-slate-600">
                    {item.name}
                </div>
            );
        }

        const Icon = item.icon!;
        const isActive = checkIsActive(item.href);

        return (
          <Link
            key={item.href!}
            href={item.href!}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg font-medium text-sm transition-all group ${item.isSettings ? 'mt-auto' : ''} ${
              isActive
                ? activeColorClass
                : "text-slate-400 hover:bg-slate-800 hover:text-white border border-transparent"
            }`}
          >
            <Icon size={18} className={`transition-transform ${item.isSettings ? "group-hover:rotate-45" : "group-hover:scale-110"} ${isActive ? "scale-110" : ""}`} />
            {item.name}
          </Link>
        );
      })}
    </>
  );
}
