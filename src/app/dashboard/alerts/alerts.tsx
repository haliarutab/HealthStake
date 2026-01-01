"use client";

import React, { useState } from 'react';
import { 
  Search, Filter, ExternalLink, MessageSquare, 
  Check, X, Clock, TrendingUp, CheckCircle,
  Phone, Video, ShieldAlert, ArrowUpRight, FileText, 
  Activity, User, Calendar, Heart
} from 'lucide-react';

interface AlertItemType {
  id: number;
  patient: string;
  mrn: string;
  severity: 'high' | 'medium' | 'low';
  type: string;
  description: string;
  date: string;
  timeAgo: string;
  icon: any;
  iconColor: string;
  iconBg: string;
  isHandled: boolean;
  reading?: string | null;
  diabetes?: string;
  gender?: string;
  dob?: string;
  phone?: string;
  emergency?: string;
  emergencyPhone?: string;
}

export default function Alerts() {
  // Main Page States
  const [activeTab, setActiveTab] = useState('Pending');
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSeverity, setSelectedSeverity] = useState("All Severity");

  // Sidebar States
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState<AlertItemType | null>(null);
  const [activeSidebarTab, setActiveSidebarTab] = useState('Readings');

  const pendingAlerts: AlertItemType[] = [
    { 
      id: 1, 
      patient: "Omar Al-Farsi", 
      mrn: "MRN-001238", 
      severity: "high", 
      type: "Missing Reading", 
      description: "No glucose readings submitted in the last 4 days", 
      date: "Dec 15, 2025 12:22 PM", 
      timeAgo: "15 days ago", 
      icon: Clock, 
      iconColor: "text-orange-500", 
      iconBg: "bg-orange-50", 
      isHandled: false, 
      reading: "220 mg/dL", 
      diabetes: "Type2",
      gender: "Male",
      dob: "September 12, 1958",
      phone: "+971 52 567 8901",
      emergency: "Layla Al-Farsi",
      emergencyPhone: "+971 52 109 8765"
    },
    { 
      id: 2, 
      patient: "Mohammed Hassan", 
      mrn: "MRN-001236", 
      severity: "medium", 
      type: "Consistent High", 
      description: "Multiple high readings detected over the past week", 
      reading: "198 mg/dL", 
      date: "Dec 15, 2025 12:22 PM", 
      timeAgo: "15 days ago", 
      icon: TrendingUp, 
      iconColor: "text-yellow-600", 
      iconBg: "bg-yellow-50", 
      isHandled: false, 
      diabetes: "Type2" 
    },
    { 
      id: 3, 
      patient: "Omar Al-Farsi", 
      mrn: "MRN-001238", 
      severity: "high", 
      type: "High Glucose", 
      description: "Last reading of 220 mg/dL above normal threshold", 
      reading: "220 mg/dL", 
      date: "Dec 15, 2025 12:22 PM", 
      timeAgo: "15 days ago", 
      icon: TrendingUp, 
      iconColor: "text-orange-500", 
      iconBg: "bg-orange-50", 
      isHandled: false, 
      diabetes: "Type2" 
    }
  ];

  const handledAlerts: AlertItemType[] = [
    { id: 101, patient: "Ahmed Al-Rashid", mrn: "MRN-001234", severity: "low", type: "Check-up Follow-up", description: "Follow-up call completed regarding medication adjustment.", date: "Dec 17, 2025 09:00 AM", timeAgo: "1 day ago", icon: CheckCircle, iconColor: "text-green-500", iconBg: "bg-green-50", isHandled: true, reading: "110 mg/dL", diabetes: "Type2" }
  ];

  // Filtering Logic
  const filteredData = () => {
    let baseData = activeTab === 'All' ? [...pendingAlerts, ...handledAlerts] : activeTab === 'Pending' ? pendingAlerts : handledAlerts;
    if (selectedSeverity !== "All Severity") baseData = baseData.filter(a => a.severity === selectedSeverity.toLowerCase());
    if (searchQuery.trim() !== "") {
      baseData = baseData.filter(a => a.patient.toLowerCase().includes(searchQuery.toLowerCase()) || a.type.toLowerCase().includes(searchQuery.toLowerCase()));
    }
    return baseData;
  };

  const handleOpenProfile = (alert: AlertItemType) => {
    setSelectedPatient(alert);
    setIsSidebarOpen(true);
    setActiveSidebarTab('Readings'); // Reset to first tab
  };

  const displayData = filteredData();

  return (
    <div className="relative min-h-screen">
      {/* Main Content Area */}
      <div className={`space-y-6 transition-all duration-300 ${isSidebarOpen ? 'pr-[400px]' : ''}`}>
        <div className="text-left">
          <h1 className="text-3xl font-bold text-slate-900">Alerts</h1>
          <p className="text-slate-500 mt-1">{pendingAlerts.length} pending alerts</p>
        </div>

        {/* Search and Filters */}
        <div className="flex gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Search alerts by name..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-100 transition-all" 
            />
          </div>
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={18} />
            <select 
              value={selectedSeverity}
              onChange={(e) => setSelectedSeverity(e.target.value)}
              className="pl-10 pr-10 py-2.5 bg-white border border-slate-200 rounded-lg appearance-none text-slate-700 outline-none focus:ring-2 focus:ring-blue-100 cursor-pointer transition-all"
            >
              <option>All Severity</option>
              <option>High</option>
              <option>Medium</option>
              <option>Low</option>
            </select>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex gap-2 p-1 bg-slate-100 w-fit rounded-lg">
          {['Pending', 'Handled', 'All'].map((tab) => (
            <button 
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-1.5 rounded-md text-sm font-semibold transition-all ${activeTab === tab ? 'bg-white shadow-sm text-blue-600' : 'text-slate-500 hover:text-slate-700'}`}
            >
              {tab} {tab === 'Pending' && <span className="ml-1 bg-red-100 text-red-600 px-1.5 py-0.5 rounded text-[10px]">{pendingAlerts.length}</span>}
            </button>
          ))}
        </div>

        {/* Alerts Cards List */}
        <div className="space-y-4">
          {displayData.map((alert) => (
            <div key={alert.id} className="bg-white border border-slate-100 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between">
                <div className="flex gap-4 text-left">
                  <div className={`${alert.iconBg} ${alert.iconColor} p-3 rounded-lg self-start`}><alert.icon size={22} /></div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-slate-800">{alert.patient}</h3>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${alert.severity === 'high' ? 'bg-orange-100 text-orange-600' : alert.severity === 'medium' ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-600'}`}>{alert.severity}</span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded uppercase bg-slate-100 text-slate-600">{alert.type}</span>
                    </div>
                    <p className="text-slate-600 text-sm">{alert.description}</p>
                    <div className="flex items-center gap-2 text-[11px] text-slate-400 mt-2">
                      <span>{alert.date}</span><span>•</span><span>{alert.timeAgo}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={() => handleOpenProfile(alert)} className="p-2 text-slate-400 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors border border-transparent hover:border-blue-100">
                    <ExternalLink size={18} />
                  </button>
                  <button className="p-2 text-slate-400 hover:bg-slate-50 rounded-lg transition-colors"><MessageSquare size={18} /></button>
                  {!alert.isHandled && (
                    <button className="flex items-center gap-2 px-4 py-1.5 border border-green-200 text-green-600 text-sm font-semibold rounded-lg hover:bg-green-50 transition-colors">
                      <Check size={16} /> Handle
                    </button>
                  )}
                  <button className="p-2 text-slate-400 hover:text-red-500 rounded-lg transition-colors"><X size={18} /></button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* --- PATIENT PROFILE SIDEBAR --- */}
      {isSidebarOpen && (
        <>
          <div className="fixed inset-0 bg-slate-900/20 backdrop-blur-[2px] z-40" onClick={() => setIsSidebarOpen(false)} />
          <aside className="fixed right-0 top-0 h-full w-[400px] bg-white shadow-2xl z-50 flex flex-col animate-in slide-in-from-right duration-300">
            {/* Sidebar Header */}
            <div className="p-6 flex items-center justify-between border-b">
              <div className="flex items-center gap-4 text-left">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg">{selectedPatient?.patient.charAt(0)}</div>
                <div>
                  <h2 className="text-lg font-bold text-slate-900 leading-none mb-1.5">{selectedPatient?.patient}</h2>
                  <div className="flex items-center gap-2">
                    <span className="bg-orange-100 text-orange-600 text-[10px] font-bold px-2 py-0.5 rounded uppercase">Attention Needed</span>
                    <span className="text-slate-400 text-[11px] font-semibold uppercase tracking-wider">MRN: {selectedPatient?.mrn}</span>
                  </div>
                </div>
              </div>
              <button onClick={() => setIsSidebarOpen(false)} className="text-slate-300 hover:text-slate-500"><X size={22}/></button>
            </div>

            {/* Sidebar Body */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {/* Quick Actions */}
              <div className="grid grid-cols-4 gap-2.5">
                <ActionButton icon={<MessageSquare size={18}/>} label="Chat" />
                <ActionButton icon={<Phone size={18}/>} label="Call" />
                <ActionButton icon={<Video size={18}/>} label="Video" />
                <ActionButton icon={<ShieldAlert size={18}/>} label="Escalate" />
              </div>

              {/* Vitals Summary */}
              <div className="grid grid-cols-2 gap-4 text-left">
                <div className="bg-slate-50/50 p-4 rounded-2xl border border-slate-100">
                  <p className="text-[10px] font-bold text-slate-400 uppercase flex items-center gap-1.5 mb-1"><TrendingUp size={12}/> Last Reading</p>
                  <p className="text-2xl font-bold text-red-500">{selectedPatient?.reading}</p>
                  <p className="text-[10px] text-slate-400 font-medium mt-1">12 months ago</p>
                </div>
                <div className="bg-slate-50/50 p-4 rounded-2xl border border-slate-100">
                  <p className="text-[10px] font-bold text-slate-400 uppercase flex items-center gap-1.5 mb-1"><Clock size={12}/> Diabetes Type</p>
                  <p className="text-[19px] font-bold text-slate-800">{selectedPatient?.diabetes || "Type2"}</p>
                </div>
              </div>

              {/* Sidebar Internal Tabs */}
              <div className="bg-slate-50 p-1 rounded-xl flex gap-1">
                {['Readings', 'Alerts', 'Info'].map(t => (
                  <button 
                    key={t} 
                    onClick={() => setActiveSidebarTab(t)}
                    className={`flex-1 py-2 text-[11px] font-bold rounded-lg transition-all ${activeSidebarTab === t ? 'bg-white shadow-sm text-blue-600' : 'text-slate-400'}`}
                  >
                    {t}
                  </button>
                ))}
              </div>

              {/* Dynamic Tab Content */}
              <div className="space-y-4">
                {activeSidebarTab === 'Readings' && (
                  /* Readings Chart */
                  <div className="relative border border-slate-100 rounded-2xl p-6 bg-white h-52">
                    <div className="absolute inset-x-6 inset-y-8 flex flex-col justify-between pointer-events-none">
                      {[250, 200, 150, 100, 50].map((val, idx) => (
                        <div key={val} className="flex items-center gap-3 w-full">
                          <span className="text-[9px] font-bold text-slate-300 w-5">{val}</span>
                          <div className={`flex-1 border-t ${idx === 1 ? 'border-red-400' : idx === 3 ? 'border-orange-300' : 'border-slate-100'} border-dashed`} />
                        </div>
                      ))}
                    </div>
                    <div className="absolute top-[32%] left-[62%] w-2.5 h-2.5 bg-blue-500 rounded-full border-2 border-white shadow-[0_0_0_5px_rgba(59,130,246,0.1)]" />
                    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 text-[10px] text-slate-400 font-bold">Jan 10</div>
                  </div>
                )}

                {activeSidebarTab === 'Alerts' && (
                  /* Alerts Tab Content */
                  <div className="space-y-3">
                    <div className="p-4 bg-slate-50/50 rounded-xl border border-slate-100 text-left">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[9px] font-bold px-2 py-0.5 rounded uppercase bg-orange-100 text-orange-600">missing reading</span>
                        <span className="text-[10px] text-slate-400 font-medium">Dec 15, 12:22 PM</span>
                      </div>
                      <p className="text-xs text-slate-600 leading-snug">No glucose readings submitted in the last 4 days</p>
                    </div>
                    <div className="p-4 bg-slate-50/50 rounded-xl border border-slate-100 text-left">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[9px] font-bold px-2 py-0.5 rounded uppercase bg-orange-100 text-orange-600">high glucose</span>
                        <span className="text-[10px] text-slate-400 font-medium">Dec 15, 12:22 PM</span>
                      </div>
                      <p className="text-xs text-slate-600 leading-snug">Last reading of 220 mg/dL above normal threshold</p>
                    </div>
                  </div>
                )}

                {activeSidebarTab === 'Info' && (
                  /* Info Tab Content */
                  <div className="space-y-2">
                    <InfoRow icon={<User size={14}/>} label="Gender" value={selectedPatient?.gender || "Male"} />
                    <InfoRow icon={<Calendar size={14}/>} label="Date of Birth" value={selectedPatient?.dob || "September 12, 1958"} />
                    <InfoRow icon={<Phone size={14}/>} label="Phone" value={selectedPatient?.phone || "+971 52 567 8901"} />
                    <InfoRow 
                      icon={<Heart size={14}/>} 
                      label="Emergency Contact" 
                      value={selectedPatient?.emergency || "Layla Al-Farsi"} 
                      subValue={selectedPatient?.emergencyPhone || "+971 52 109 8765"} 
                    />
                  </div>
                )}
              </div>

              <button className="w-full py-3.5 border border-slate-200 rounded-xl text-slate-600 font-bold text-sm flex items-center justify-center gap-2 hover:bg-slate-50 transition-colors mt-auto">
                <FileText size={17} className="text-slate-400"/> View Full Profile <ArrowUpRight size={17} className="text-slate-400"/>
              </button>
            </div>
          </aside>
        </>
      )}
    </div>
  );
}

// Sidebar Sub-components
function ActionButton({ icon, label }: any) {
  return (
    <button className="flex flex-col items-center justify-center p-3 rounded-xl border border-slate-100 hover:bg-slate-50 transition-all gap-1.5 group">
      <div className="text-slate-400 group-hover:text-blue-600 transition-colors">{icon}</div>
      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-tight">{label}</span>
    </button>
  );
}

function InfoRow({ icon, label, value, subValue }: any) {
  return (
    <div className="p-4 bg-slate-50/50 rounded-xl border border-slate-100 flex gap-4 text-left">
      <div className="text-slate-400 mt-1">{icon}</div>
      <div>
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tight mb-0.5">{label}</p>
        <p className="text-sm font-bold text-slate-800">{value}</p>
        {subValue && <p className="text-[11px] text-slate-500 mt-0.5">{subValue}</p>}
      </div>
    </div>
  );
}