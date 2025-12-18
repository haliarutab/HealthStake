import { TrendingUp, Clock, AlertTriangle, Activity, Phone, MessageSquare, ChevronRight ,Bell } from "lucide-react";

export default function DashboardContent() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold text-slate-800">Good afternoon, Halia</h2>
        <p className="text-slate-400 mt-1">Thursday, December 18, 2025</p>
      </div>

      {/* Top Stat Cards */}
      <div className="grid grid-cols-4 gap-6">
        <StatCard title="High Glucose" value="3" icon={TrendingUp} color="border-red-500" iconBg="bg-red-500" />
        <StatCard title="Missing Readings" value="6" icon={Clock} color="border-orange-500" iconBg="bg-orange-500" />
        <StatCard title="Critical Patients" value="1" icon={AlertTriangle} color="border-purple-500" iconBg="bg-purple-500" />
        <StatCard title="Pending Alerts" value="3" icon={Activity} color="border-blue-500" iconBg="bg-blue-500" />
      </div>

      <div className="grid grid-cols-3 gap-8">
        {/* Left Column: Patients Requiring Attention */}
        <div className="col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
          <div className="flex items-center gap-2 mb-6">
            <AlertTriangle className="text-slate-400" size={20} />
            <h3 className="font-bold text-slate-800">Patients Requiring Attention</h3>
            <span className="bg-slate-100 text-slate-500 text-xs px-2 py-0.5 rounded-md">3</span>
          </div>
          
          <div className="space-y-4">
            <PatientRow name="Ahmed Al-Rashid" glucose="245 mg/dL" status="critical" statusColor="bg-red-100 text-red-600" />
            <PatientRow name="Mohammed Hassan" glucose="198 mg/dL" status="attention needed" statusColor="bg-orange-100 text-orange-600" />
            <PatientRow name="Omar Al-Farsi" glucose="220 mg/dL" status="attention needed" statusColor="bg-orange-100 text-orange-600" />
          </div>
        </div>

        {/* Right Column: Recent Alerts */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <Bell className="text-slate-400" size={20} />
              <h3 className="font-bold text-slate-800">Recent Alerts</h3>
            </div>
            <button className="text-blue-500 text-xs font-semibold flex items-center gap-1">
              View All <ChevronRight size={14} />
            </button>
          </div>
          <div className="space-y-4">
            <AlertItem name="Omar Al-Farsi" type="high" desc="No glucose readings submitted..." time="Dec 15, 12:22 PM" />
            <AlertItem name="Mohammed Hassan" type="medium" desc="Multiple high readings detected..." time="Dec 15, 12:22 PM" />
          </div>
        </div>
      </div>
    </div>
  );
}

// Sub-components for cleaner code
function StatCard({ title, value, icon: Icon, color, iconBg }: any) {
  return (
    <div className={`bg-white p-6 rounded-2xl shadow-sm border-b-4 ${color} flex justify-between items-start`}>
      <div>
        <p className="text-slate-400 text-sm font-medium">{title}</p>
        <h4 className="text-3xl font-bold text-slate-800 mt-2">{value}</h4>
      </div>
      <div className={`${iconBg} p-2.5 rounded-xl text-white`}>
        <Icon size={20} />
      </div>
    </div>
  );
}

function PatientRow({ name, glucose, status, statusColor }: any) {
  return (
    <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold">
          {name.charAt(0)}
        </div>
        <div>
          <div className="flex items-center gap-2">
            <p className="font-bold text-slate-800">{name}</p>
            <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded ${statusColor}`}>
              {status}
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-0.5 flex items-center gap-1">
            <Activity size={12} /> {glucose} <span className="mx-1">•</span> 11 months ago
          </p>
        </div>
      </div>
      <div className="flex gap-2">
        <button className="p-2 text-slate-400 hover:bg-white rounded-lg transition-colors"><Phone size={18} /></button>
        <button className="p-2 text-slate-400 hover:bg-white rounded-lg transition-colors"><MessageSquare size={18} /></button>
      </div>
    </div>
  );
}

function AlertItem({ name, type, desc, time }: any) {
  return (
    <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-2">
      <div className="flex items-center justify-between">
        <p className="font-bold text-sm text-slate-800">{name}</p>
        <span className={`text-[10px] px-1.5 py-0.5 rounded font-bold uppercase ${type === 'high' ? 'bg-red-100 text-red-600' : 'bg-orange-100 text-orange-600'}`}>
          {type}
        </span>
      </div>
      <p className="text-xs text-slate-500 line-clamp-1">{desc}</p>
      <p className="text-[10px] text-slate-400">{time}</p>
    </div>
  );
}