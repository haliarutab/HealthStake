"use client";

import React from 'react';
import { 
  Users, Activity, Bell, TrendingUp, 
  Calendar, Wand2 
} from "lucide-react";
import { 
  PieChart, Pie, Cell, ResponsiveContainer, 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip 
} from 'recharts';

// EXACT COLORS FROM YOUR IMAGE
const COLORS = {
  stable: '#10b981',   // Emerald Green
  attention: '#f59e0b', // Amber/Orange
  critical: '#ef4444',  // Red
};

const statusData = [
  { name: 'Stable', value: 50, color: COLORS.stable },
  { name: 'Attention Needed', value: 25, color: COLORS.attention },
  { name: 'Critical', value: 15, color: COLORS.critical },
];

const highRiskPatients = [
  { id: 1, name: 'Ahmed Al-Rashid', reading: '245 mg/dL', status: 'critical', initial: 'A', bgColor: 'bg-[#ef4444]' },
  { id: 2, name: 'Mohammed Hassan', reading: '198 mg/dL', status: 'attention needed', initial: 'M', bgColor: 'bg-[#f59e0b]' },
  { id: 3, name: 'Omar Al-Farsi', reading: '220 mg/dL', status: 'attention needed', initial: 'O', bgColor: 'bg-[#f59e0b]' },
];

export default function ReportsDashboard() {
  return (
    <div className="p-8 bg-[#f8fafc] min-h-screen font-sans text-slate-600">
      {/* Header Section */}
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Reports</h1>
          <p className="text-sm text-slate-400 font-medium">Analytics and insights for patient monitoring</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm shadow-sm text-slate-700 font-medium hover:bg-slate-50">
            <Calendar size={16} />
            Last 7 Days
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-[#2563eb] text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors shadow-md shadow-blue-100">
            <Wand2 size={16} />
            Generate AI Report
          </button>
        </div>
      </div>

      {/* Stats Cards Row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <StatCard icon={<Users className="text-blue-500" size={20}/>} label="Total Patients" value="6" color="bg-blue-50" />
        <StatCard icon={<Activity className="text-emerald-500" size={20}/>} label="Total Readings" value="0" color="bg-emerald-50" />
        <StatCard icon={<Bell className="text-amber-500" size={20}/>} label="Total Alerts" value="0" color="bg-amber-50" />
        <StatCard icon={<TrendingUp className="text-purple-500" size={20}/>} label="Avg. Reading" value="0 mg/dL" color="bg-purple-50" />
      </div>

      {/* Distribution Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Patient Status Distribution - The Broken Donut */}
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
          <h3 className="text-sm font-bold text-slate-800 mb-6">Patient Status Distribution</h3>
          <div className="h-[250px] flex flex-col items-center justify-center relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%" cy="50%"
                  innerRadius={65}
                  outerRadius={85}
                  paddingAngle={8}
                  dataKey="value"
                  startAngle={90}
                  endAngle={450}
                  stroke="none"
                   cornerRadius={1}
                >
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="flex gap-6 mt-4">
              {statusData.map((item) => (
                <div key={item.name} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-[2px]" style={{ backgroundColor: item.color }} />
                  <span className="text-[11px] font-bold" style={{ color: item.color }}>{item.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Glucose Reading Distribution - The Grid View */}
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
          <h3 className="text-sm font-bold text-slate-800 mb-6">Glucose Reading Distribution</h3>
          <div className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={[{n:'Low (<70)'}, {n:'Normal'}, {n:'High (>180)'}]}>
                <CartesianGrid strokeDasharray="3 3" vertical={true} horizontal={true} stroke="#f1f5f9" />
                <XAxis 
                  dataKey="n" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{fontSize: 10, fill: '#94a3b8', fontWeight: 500}} 
                  dy={10} 
                />
                <YAxis 
                  domain={[0, 4]}
                  ticks={[0, 1, 2, 3, 4]}
                  axisLine={false} 
                  tickLine={false} 
                  tick={{fontSize: 10, fill: '#94a3b8', fontWeight: 500}} 
                />
                <Line type="monotone" dataKey="v" stroke="#cbd5e1" strokeWidth={1} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Alerts and Summary Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm min-h-[220px]">
          <h3 className="text-sm font-bold text-slate-800 mb-4">Alerts by Type</h3>
          <div className="w-full h-full border border-dashed border-slate-200 rounded-xl bg-slate-50/50" />
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
          <h3 className="text-sm font-bold text-slate-800 mb-4">Follow-up Summary</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center bg-slate-50 p-4 rounded-xl">
              <span className="text-sm font-bold text-slate-400">Total Follow-ups</span>
              <span className="text-2xl font-bold text-slate-900 leading-none">0</span>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-green-50/50 p-4 rounded-xl border border-green-100">
                <p className="text-[11px] font-bold text-green-600 mb-1">Attended</p>
                <p className="text-2xl font-bold text-green-700 leading-none">0</p>
              </div>
              <div className="bg-red-50/50 p-4 rounded-xl border border-red-100">
                <p className="text-[11px] font-bold text-red-600 mb-1">Not Attended</p>
                <p className="text-2xl font-bold text-red-700 leading-none">0</p>
              </div>
            </div>
            <div className="bg-blue-50/50 p-4 rounded-xl border border-blue-100">
              <p className="text-[11px] font-bold text-blue-600 mb-1">Alert Resolution Rate</p>
              <p className="text-2xl font-bold text-blue-700 leading-none">0%</p>
            </div>
          </div>
        </div>
      </div>

      {/* High Risk Patients List - Exact Styling */}
      <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
        <h3 className="text-sm font-bold text-slate-800 mb-6 uppercase tracking-wider">High Risk Patients</h3>
        <div className="space-y-3">
          {highRiskPatients.map((patient) => (
            <div key={patient.id} className="flex items-center justify-between p-4 bg-white border border-slate-50 rounded-2xl hover:bg-slate-50 transition-colors">
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-full ${patient.bgColor} flex items-center justify-center text-white font-bold text-base shadow-sm`}>
                  {patient.initial}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 leading-none mb-1.5">{patient.name}</h4>
                  <p className="text-xs text-slate-400 font-medium">Last reading: {patient.reading}</p>
                </div>
              </div>
              <span className={`px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-tight shadow-sm
                ${patient.status === 'critical' 
                  ? 'bg-red-50 text-red-500 border border-red-100' 
                  : 'bg-amber-50 text-amber-600 border border-amber-100'}`}>
                {patient.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon, label, value, color }: { icon: React.ReactNode, label: string, value: string, color: string }) {
  return (
    <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
      <div className={`${color} p-3 rounded-2xl shrink-0`}>
        {icon}
      </div>
      <div>
        <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-1">{label}</p>
        <p className="text-xl font-bold text-slate-900 leading-none">{value}</p>
      </div>
    </div>
  );
}