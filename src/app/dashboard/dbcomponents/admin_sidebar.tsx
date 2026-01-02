"use client";

import { useState } from "react";
import { 
  LayoutDashboard, Users, Bell, CheckSquare, 
  MessageSquare, FileText, Activity, ChevronLeft, ChevronRight 
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AdminSidebar() {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const menuItems = [
    { name: 'Dashboard', icon: LayoutDashboard, href: '/dashboard' },
    { name: 'Patients', icon: Users, href: '/dashboard/patients' },
    { name: 'Alerts', icon: Bell, href: '/dashboard/alerts', badge: 3 },
    { name: 'Tasks', icon: CheckSquare, href: '/dashboard/tasks' },
    { name: 'Messages', icon: MessageSquare, href: '/dashboard/messages' },
    { name: 'Reports', icon: FileText, href: '/dashboard/reports' },
  ];

  return (
    <aside className={`relative h-screen bg-white border-r flex flex-col transition-all duration-300 ${isCollapsed ? 'w-20' : 'w-64'}`}>
      
      {/* Logo Section */}
      <div className={`p-6 flex items-center gap-3 ${isCollapsed ? 'justify-center' : ''}`}>
        <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-2 rounded-xl text-white shadow-lg shadow-blue-200">
          <Activity size={24} />
        </div>
        {!isCollapsed && (
          <div className="flex flex-col">
            <span className="font-bold text-slate-800 leading-none">Nursing Portal</span>
            <span className="text-xs text-slate-400 mt-1">Healthcare Management</span>
          </div>
        )}
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 px-4 space-y-1">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`group relative flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                isActive
                  ? 'bg-blue-50 text-blue-600 font-bold'
                  : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800'
              } ${isCollapsed ? 'justify-center px-0' : ''}`}
            >
              <item.icon size={22} className={isActive ? 'text-blue-600' : 'text-slate-400 group-hover:text-slate-600'} />
              
              {!isCollapsed && (
                <>
                  <span className="flex-1">{item.name}</span>
                  {item.badge && (
                    <span className="bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full ring-2 ring-white">
                      {item.badge}
                    </span>
                  )}
                </>
              )}

              {/* Tooltip for Collapsed Mode */}
              {isCollapsed && (
                <div className="absolute left-full ml-4 px-2 py-1 bg-slate-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50">
                  {item.name}
                </div>
              )}
            </Link>
          );
        })}
      </nav>

      {/* User Profile Section */}
      <div className={`p-4 border-t border-slate-100 flex items-center gap-3 ${isCollapsed ? 'justify-center' : ''}`}>
        <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold shrink-0">
          H
        </div>
        {!isCollapsed && (
          <div className="flex flex-col overflow-hidden">
            <span className="font-semibold text-slate-800 truncate">Halia Rutab</span>
            <span className="text-xs text-slate-500">Nurse</span>
          </div>
        )}
      </div>

      {/* Toggle Button */}
     <button 
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="absolute -right-4 bottom-8 w-8 h-8 bg-white border border-slate-200 rounded-full flex items-center justify-center text-slate-400 hover:text-blue-600 shadow-sm transition-colors z-50"
        >
          {isCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </button>
    </aside>
  );
}