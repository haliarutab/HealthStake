"use client";

import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  AlertTriangle, 
  User, 
  Activity, 
  Calendar, 
  MoreVertical,
  ChevronRight,
  Plus
} from 'lucide-react';

interface Escalation {
  id: number;
  patientName: string;
  severity: 'High' | 'Critical' | 'Moderate';
  reading: string;
  reason: string;
  status: 'Pending' | 'Reviewed' | 'Resolved';
  timestamp: string;
}

export default function Escalations() {
  const [activeTab, setActiveTab] = useState('Pending');

  const escalations: Escalation[] = [
    {
      id: 1,
      patientName: "Ahmed Al-Rashid",
      severity: "High",
      reading: "250 mg/dL",
      reason: "Patient's glucose levels have remained consistently above 240 mg/dL for the last 48 hours despite medication adjustments.",
      status: "Pending",
      timestamp: "Dec 30, 2025 03:00 PM"
    }
  ];

  const severityColors = {
    Critical: "bg-red-100 text-red-600 border-red-200",
    High: "bg-orange-100 text-orange-600 border-orange-200",
    Moderate: "bg-blue-100 text-blue-600 border-blue-200"
  };

  return (
    <div className="-mx-4 lg:-mx-8 -mt-6 w-[calc(100%+2rem)] lg:w-[calc(100%+4rem)] bg-[#f8fafc] min-h-screen p-8 font-sans">
      
      {/* --- Header Section --- */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Escalations</h1>
          <p className="text-slate-500 text-sm font-medium">0 pending escalations</p>
        </div>
        <button className="flex items-center gap-2 bg-[#ef4444] hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-all shadow-md active:scale-95 font-bold text-sm">
          <Plus size={18} />
          New Escalation
        </button>
      </div>

      {/* --- Search & Filter Bar --- */}
      <div className="flex gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="Search escalations..." 
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 shadow-sm text-sm"
          />
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg cursor-pointer hover:bg-slate-50 shadow-sm">
          <Filter size={18} className="text-slate-500" />
          <span className="text-sm font-bold text-slate-700">Filter</span>
        </div>
      </div>

      {/* --- Tab Navigation --- */}
      <div className="flex gap-2 mb-8 bg-white p-1 w-fit rounded-lg border border-slate-200 shadow-sm">
        {['Pending', 'Reviewed', 'Resolved', 'All'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 text-xs font-bold rounded-md transition-all flex items-center gap-2 ${
              activeTab === tab 
              ? 'bg-[#f8fafc] text-slate-900 border border-slate-900' 
              : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            {tab}
            {tab === 'Pending' && <span className="bg-red-100 text-red-600 px-1.5 py-0.5 rounded-full text-[10px]">0</span>}
          </button>
        ))}
      </div>

      {/* --- Escalations List --- */}
      <div className="space-y-4">
        {escalations.length > 0 ? (
          escalations.map((item) => (
            <div key={item.id} className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm hover:border-blue-300 transition-colors group relative">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-red-50 text-red-500 rounded-full flex items-center justify-center border border-red-100">
                    <AlertTriangle size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-lg">{item.patientName}</h3>
                    <div className="flex gap-2 mt-1">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase border ${severityColors[item.severity]}`}>
                        {item.severity}
                      </span>
                      <span className="bg-slate-100 text-slate-600 px-2 py-0.5 rounded text-[10px] font-bold uppercase border border-slate-200">
                        {item.status}
                      </span>
                    </div>
                  </div>
                </div>
                <button className="text-slate-400 hover:text-slate-600 p-1">
                  <MoreVertical size={20} />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-4">
                <div className="flex items-center gap-3">
                  <Activity size={18} className="text-slate-400" />
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Current Reading</p>
                    <p className="text-sm font-bold text-slate-900">{item.reading}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar size={18} className="text-slate-400" />
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Timestamp</p>
                    <p className="text-sm font-bold text-slate-900">{item.timestamp}</p>
                  </div>
                </div>
              </div>

              <div className="bg-slate-50 p-4 rounded-lg border border-slate-100">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Reason for Escalation</p>
                <p className="text-sm text-slate-700 leading-relaxed font-medium">
                  {item.reason}
                </p>
              </div>

              <div className="mt-4 pt-4 border-t border-slate-100 flex justify-end">
                <button className="flex items-center gap-1 text-blue-600 font-bold text-sm hover:underline">
                  View Case Details <ChevronRight size={16} />
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="bg-white border-2 border-dashed border-slate-200 rounded-2xl py-24 flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4">
              <AlertTriangle size={32} className="text-slate-300" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">No pending escalations</h3>
            <p className="text-slate-400 text-sm max-w-xs mt-1">
              All clinical escalations have been reviewed or resolved.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}