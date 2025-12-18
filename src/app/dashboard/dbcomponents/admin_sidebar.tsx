import { 
  LayoutDashboard, Users, Bell, CheckSquare, 
  MessageSquare, FileText, Activity 
} from "lucide-react";

export default function AdminSidebar({ activePage, setActivePage }: any) {
  const menuItems = [
    { name: 'Dashboard', icon: LayoutDashboard },
    { name: 'Patients', icon: Users },
    { name: 'Alerts', icon: Bell, badge: 3 },
    { name: 'Tasks', icon: CheckSquare },
    { name: 'Messages', icon: MessageSquare },
    { name: 'Reports', icon: FileText },
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
        {menuItems.map((item) => (
          <button
            key={item.name}
            onClick={() => setActivePage(item.name)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
              activePage === item.name 
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
          </button>
        ))}
      </nav>
    </aside>
  );
}