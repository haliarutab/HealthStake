"use client";

import {
  TrendingUp, Clock, AlertTriangle, Activity,
  Phone, MessageSquare, ChevronRight, Bell, CheckCircle2
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
export default function DashboardContent() {
  //I do hard code username for now 
  // const [userName, setUserName] = useState("");

  // useEffect(() => {
  //   const user = localStorage.getItem("user");
  //   if (user) {
  //     setUserName(JSON.parse(user).name);
  //   }
  // }, []);
    const userName = "Halia";
  const hour = new Date().getHours();
  const greeting =
    hour < 12 ? "Good morning" :
    hour < 18 ? "Good afternoon" :
    "Good evening";
   const today = new Date();

  const formattedDate = today.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  return (
    
    <div className="space-y-8">
      {/* Header */}
      <div>
     <h2 className="text-3xl font-bold text-slate-800">
      {greeting}, {userName || "User"}
    </h2>
   <p className="text-slate-400 mt-1">{formattedDate}</p>

      </div>

      {/* Top Stat Cards */}
      <div className="grid grid-cols-4 gap-6">
        <StatCard title="High Glucose" value="3" icon={TrendingUp} color="border-red-500" iconBg="bg-red-500" />
        <StatCard title="Missing Readings" value="6" icon={Clock} color="border-orange-500" iconBg="bg-orange-500" />
        <StatCard title="Critical Patients" value="1" icon={AlertTriangle} color="border-purple-500" iconBg="bg-purple-500" />
        <StatCard title="Pending Alerts" value="3" icon={Activity} color="border-blue-500" iconBg="bg-blue-500" />
      </div>

      {/* Middle Row */}
      <div className="grid grid-cols-3 gap-8">
        <div className="col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
          <SectionHeader icon={AlertTriangle} title="Patients Requiring Attention" count={3} />
          <div className="space-y-4">
            <PatientRow name="Ahmed Al-Rashid" glucose="245 mg/dL" status="critical" color="red" />
            <PatientRow name="Mohammed Hassan" glucose="198 mg/dL" status="attention needed" color="orange" />
            <PatientRow name="Omar Al-Farsi" glucose="220 mg/dL" status="attention needed" color="orange" />
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
          <SectionHeader icon={Bell} title="Recent Alerts" showViewAll />
          <div className="space-y-4">
            <AlertItem name="Omar Al-Farsi" type="high" desc="No glucose readings submitted..." time="12:22 PM" />
            <AlertItem name="Mohammed Hassan" type="medium" desc="Multiple high readings detected..." time="12:22 PM" />
          </div>
        </div>
      </div>

      {/* BOTTOM SECTIONS: High Glucose & My Tasks */}
      <div className="grid grid-cols-3 gap-8 pb-10">
        <div className="col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
          <SectionHeader icon={TrendingUp} title="High Glucose Patients" count={3} />
          <div className="space-y-4">
            <PatientRow name="Ahmed Al-Rashid" glucose="245 mg/dL" status="critical" color="red" />
            <PatientRow name="Mohammed Hassan" glucose="198 mg/dL" status="attention needed" color="orange" />
            <PatientRow name="Omar Al-Farsi" glucose="220 mg/dL" status="attention needed" color="orange" />
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
          <SectionHeader
            icon={CheckCircle2}
            title="My Tasks"
            count={4}
            showViewAll
            viewLink="/dashboard/tasks"
          />

          <div className="space-y-4">
            <TaskItem title="Check readings for Omar" patient="Omar Al-Farsi" priority="high" />
            <TaskItem title="Weekly review - Mohammed" patient="Mohammed Hassan" priority="medium" />
            <TaskItem title="Update patient records" patient="All Patients" priority="low" />
          </div>
        </div>
      </div>
    </div>
  );
}

// --- HELPER COMPONENTS ---

function SectionHeader({
  icon: Icon,
  title,
  count,
  showViewAll,
  viewLink = "/dashboard/alerts",
}: any) {
  return (
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center gap-2">
        <Icon className="text-slate-400" size={20} />
        <h3 className="font-bold text-slate-800">{title}</h3>
        {count && (
          <span className="bg-slate-100 text-slate-500 text-xs px-2 py-0.5 rounded-md">
            {count}
          </span>
        )}
      </div>

      {showViewAll && (
        <Link
          href={viewLink}
          className="text-blue-500 text-xs font-semibold flex items-center gap-1 hover:underline"
        >
          View All <ChevronRight size={14} />
        </Link>
      )}
    </div>
  );
}


function StatCard({ title, value, icon: Icon, color, iconBg }: any) {
  return (
    <div className={`bg-white p-6 rounded-2xl shadow-sm border-b-4 ${color} flex justify-between items-start`}>
      <div>
        <p className="text-slate-400 text-sm font-medium">{title}</p>
        <h4 className="text-3xl font-bold text-slate-800 mt-2">{value}</h4>
      </div>
      <div className={`${iconBg} p-2.5 rounded-xl text-white`}><Icon size={20} /></div>
    </div>
  );
}

function PatientRow({ name, glucose, status, color }: any) {
  const colors: any = {
    red: "bg-red-100 text-red-600",
    orange: "bg-orange-100 text-orange-600"
  };
  return (
    <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold">{name.charAt(0)}</div>
        <div>
          <div className="flex items-center gap-2">
            <p className="font-bold text-slate-800">{name}</p>
            <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded ${colors[color]}`}>{status}</span>
          </div>
          <p className="text-xs text-slate-400 mt-0.5 flex items-center gap-1"><Activity size={12} /> {glucose} • 11 months ago</p>
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
        <span className={`text-[10px] px-1.5 py-0.5 rounded font-bold uppercase ${type === 'high' ? 'bg-red-100 text-red-600' : 'bg-orange-100 text-orange-600'}`}>{type}</span>
      </div>
      <p className="text-xs text-slate-500 line-clamp-1">{desc}</p>
      <p className="text-[10px] text-slate-400">Dec 15, {time}</p>
    </div>
  );
}

function TaskItem({ title, patient, priority }: any) {
  const prioStyles: any = {
    high: "bg-red-100 text-red-600",
    medium: "bg-blue-100 text-blue-600",
    low: "bg-slate-100 text-slate-500"
  };
  return (
    <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-1">
      <div className="flex items-center justify-between">
        <p className="font-bold text-sm text-slate-800">{title}</p>
        <span className={`text-[10px] px-1.5 py-0.5 rounded font-bold uppercase ${prioStyles[priority]}`}>{priority}</span>
      </div>
      <p className="text-xs text-slate-500">{patient}</p>
      <p className="text-[10px] text-red-500 font-medium flex items-center gap-1"><Clock size={10} /> Overdue</p>
    </div>
  );
}