"use client";
import Link from "next/link";

import React, { useState, useRef, useEffect } from 'react';
import {
  Search,
  Filter,
  Download,
  UserPlus,
  Phone,
  MessageSquare,
  MoreVertical,
  TrendingUp,
  Clock,
  AlertTriangle,
  Check
} from 'lucide-react';

interface Patient {
  id: string;
  name: string;
  mrn: string;
  status: 'Critical' | 'Stable' | 'Attention Needed';
  lastReading: string;
  diabetesType: string;
  lastActivity: string;
}

export default function Patients() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("All Patients");
  const [searchQuery, setSearchQuery] = useState("");
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const [menuOpenId, setMenuOpenId] = useState<string | null>(null);
  const actionMenuRef = useRef<HTMLDivElement | null>(null);
  // Initial Data
  const allPatients: Patient[] = [
    { id: '1', name: 'Ahmed Al-Rashid', mrn: 'MRN-001234', status: 'Critical', lastReading: '245', diabetesType: 'Type2', lastActivity: '12 months ago' },
    { id: '2', name: 'Sarah Johnson', mrn: 'MRN-001235', status: 'Stable', lastReading: '165', diabetesType: 'Type1', lastActivity: '12 months ago' },
    { id: '3', name: 'Mohammed Hassan', mrn: 'MRN-001236', status: 'Attention Needed', lastReading: '198', diabetesType: 'Type2', lastActivity: '12 months ago' },
    { id: '4', name: 'Emily Chen', mrn: 'MRN-001237', status: 'Stable', lastReading: '142', diabetesType: 'Gestational', lastActivity: '12 months ago' },
    { id: '5', name: 'Omar Al-Farsi', mrn: 'MRN-001238', status: 'Attention Needed', lastReading: '220', diabetesType: 'Type2', lastActivity: '12 months ago' },
    { id: '6', name: 'Lisa Martinez', mrn: 'MRN-001239', status: 'Stable', lastReading: '95', diabetesType: 'Type1', lastActivity: '12 months ago' },
  ];

  // Combined Search and Category Filtering Logic
  const filteredPatients = allPatients.filter(patient => {
    const matchesSearch =
      patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patient.mrn.toLowerCase().includes(searchQuery.toLowerCase());

    let matchesCategory = true;
    if (selectedFilter === "Critical") matchesCategory = patient.status === "Critical";
    else if (selectedFilter === "Attention Needed") matchesCategory = patient.status === "Attention Needed";
    else if (selectedFilter === "Stable") matchesCategory = patient.status === "Stable";
    else if (selectedFilter === "High Glucose") matchesCategory = parseInt(patient.lastReading) > 180;
    else if (selectedFilter === "Missing Readings") matchesCategory = patient.lastActivity === "12 months ago";

    return matchesSearch && matchesCategory;
  });

  // Handle clicking outside dropdown
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
      // NEW: Close action menu if clicking outside
      if (actionMenuRef.current && !actionMenuRef.current.contains(event.target as Node)) {
        setMenuOpenId(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filterOptions = ["All Patients", "Critical", "Attention Needed", "Stable", "High Glucose", "Low Glucose", "Missing Readings"];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Patients</h1>
          <p className="text-sm text-slate-500">{filteredPatients.length} patients found</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors">
            <Download size={16} /> Export
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 rounded-lg text-sm font-medium text-white hover:bg-blue-700 transition-colors shadow-sm">
            <UserPlus size={16} /> Add Patient
          </button>
        </div>
      </div>

      {/* Search & Filter Dropdown */}
      <div className="flex gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input
            type="text"
            placeholder="Search patients by name, MRN, or email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-100 transition-all text-sm"
          />
        </div>

        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center justify-between min-w-[180px] gap-2 px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-slate-700 hover:bg-slate-50 transition-all"
          >
            <div className="flex items-center gap-2">
              <Filter size={18} className="text-slate-400" />
              <span className="text-sm font-medium">{selectedFilter}</span>
            </div>
            <svg
              className={`w-4 h-4 text-slate-400 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`}
              fill="none" viewBox="0 0 24 24" stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-full min-w-[200px] bg-white border border-slate-100 rounded-xl shadow-xl z-50 py-2">
              {filterOptions.map((option) => (
                <button
                  key={option}
                  onClick={() => {
                    setSelectedFilter(option);
                    setIsDropdownOpen(false);
                  }}
                  className="w-full flex items-center justify-between px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 transition-colors text-left"
                >
                  <span className={selectedFilter === option ? "font-semibold text-slate-900" : ""}>{option}</span>
                  {selectedFilter === option && <Check size={14} className="text-slate-800" />}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Pill Filters */}
      <div className="flex gap-3">
        <button
          onClick={() => setSelectedFilter("All Patients")}
          className={`px-4 py-1.5 text-[11px] font-bold rounded-lg uppercase transition-all ${selectedFilter === "All Patients" ? "bg-blue-600 text-white shadow-lg shadow-blue-100" : "bg-white border border-slate-200 text-slate-700"}`}
        >
          All
        </button>
        <FilterButton icon={<TrendingUp size={14} />} label="High Glucose" active={selectedFilter === "High Glucose"} onClick={() => setSelectedFilter("High Glucose")} />
        <FilterButton icon={<Clock size={14} />} label="Missing Readings" active={selectedFilter === "Missing Readings"} onClick={() => setSelectedFilter("Missing Readings")} />
        <FilterButton icon={<AlertTriangle size={14} />} label="Critical" active={selectedFilter === "Critical"} onClick={() => setSelectedFilter("Critical")} />
      </div>

      {/* Table */}
      <div className="bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-50 text-slate-400 text-[10px] font-bold uppercase tracking-widest">
              <th className="px-6 py-4">Patient</th>
              <th className="px-6 py-4 text-center">Status</th>
              <th className="px-6 py-4 text-center">Last Reading</th>
              <th className="px-6 py-4 text-center">Diabetes Type</th>
              <th className="px-6 py-4 text-center">Last Activity</th>
              <th className="px-6 py-4 text-right pr-10">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {filteredPatients.map((p) => (
              <tr key={p.id} className="hover:bg-slate-50/50 transition-colors group">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-xs">
                      {p.name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-800 leading-none mb-1">{p.name}</p>
                      <p className="text-[11px] text-slate-400">{p.mrn}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-center">
                  <span className={`text-[10px] font-bold px-2.5 py-1 rounded-md uppercase ${p.status === 'Critical' ? 'bg-red-50 text-red-500' :
                      p.status === 'Attention Needed' ? 'bg-orange-50 text-orange-400' : 'bg-green-50 text-green-500'
                    }`}>
                    {p.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-center">
                  <span className={`text-sm font-bold ${p.status === 'Critical' ? 'text-red-500' :
                      p.status === 'Attention Needed' ? 'text-red-400' : 'text-green-600'
                    }`}>
                    {p.lastReading} <span className="text-slate-400 font-normal ml-0.5">mg/dL</span>
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-slate-600 text-center">{p.diabetesType}</td>
                <td className="px-6 py-4 text-sm text-slate-500 text-center">{p.lastActivity}</td>

                {/* Updated Actions Cell */}
                <td className="px-6 py-4 text-right pr-6">
                  <div className="flex items-center justify-end gap-5 text-slate-500 relative">
                    <button className="hover:text-blue-600 transition-colors" title="Call">
                      <Phone size={19} strokeWidth={1.5} />
                    </button>
                    <button className="hover:text-blue-600 transition-colors" title="Message">
                      <MessageSquare size={19} strokeWidth={1.5} />
                    </button>

                    {/* Action Dropdown Container */}
                    <div className="relative" ref={menuOpenId === p.id ? actionMenuRef : null}>
                      <button
                        onClick={() => setMenuOpenId(menuOpenId === p.id ? null : p.id)}
                        className="hover:text-slate-800 transition-colors"
                        title="More"
                      >
                        <MoreVertical size={19} strokeWidth={1.5} />
                      </button>

                      {menuOpenId === p.id && (
                        <div className="absolute right-0 mt-2 w-48 bg-white border border-slate-100 rounded-xl shadow-xl z-[60] py-2 text-left">
                          <button className="w-full px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 transition-colors text-left">View Profile</button>
                          <button className="w-full px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 transition-colors text-left">Edit Patient</button>
                          <button className="w-full px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 transition-colors text-left">View Readings</button>
                          <div className="border-t border-slate-50 my-1"></div>
                          <button className="w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors text-left">Escalate to Doctor</button>
                        </div>
                      )}
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredPatients.length === 0 && (
          <div className="py-20 text-center text-slate-400 text-sm">No patients found.</div>
        )}
      </div>
    </div>
  );
}

function FilterButton({ icon, label, active, onClick }: any) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${active ? "bg-blue-600 text-white border-blue-600 shadow-md" : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50"}`}
    >
      <span className={active ? "text-white" : "text-slate-400"}>{icon}</span>
      {label}
    </button>
  );
}