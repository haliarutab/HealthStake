import { 
  LayoutDashboard, Users, Bell, CheckSquare, 
  MessageSquare, FileText, Activity 
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AdminSidebar() {
  const pathname = usePathname();
const menuItems = [
  { name: 'Dashboard', icon: LayoutDashboard, href: '/dashboard' },
  { name: 'Patients', icon: Users, href: '/dashboard/patients' },
  { name: 'Alerts', icon: Bell, href: '/dashboard/alerts', badge: 3 },
  { name: 'Tasks', icon: CheckSquare, href: '/dashboard/tasks' },
  { name: 'Messages', icon: MessageSquare, href: '/dashboard/messages' },
  { name: 'Reports', icon: FileText, href: '/dashboard/reports' },
];


  return (
    <aside className="w-64 bg-white border-r flex flex-col h-screen">
      <div className="p-6 flex items-center gap-3">
        <div className="bg-blue-600 p-2 rounded-lg text-white">
          <Activity size={24} />
        </div>
        <span className="font-bold text-slate-800">Nursing Portal</span>
      </div>

      <nav className="flex-1 px-4 space-y-1">
       {menuItems.map((item) => {
  const isActive = pathname === item.href;

  return (
    <Link
      key={item.name}
      href={item.href}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
        isActive
          ? 'bg-blue-50 text-blue-600 font-bold'
          : 'text-slate-500 hover:bg-slate-50'
      }`}
    >
      <item.icon size={20} />
      <span>{item.name}</span>

      {item.badge && (
        <span className="ml-auto bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded">
          {item.badge}
        </span>
      )}
    </Link>
  );
})}

      </nav>
    </aside>
  );
}