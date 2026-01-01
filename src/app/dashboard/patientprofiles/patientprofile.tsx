"use client";

import React, { useState } from 'react';
import {
    ArrowLeft, Phone, MessageSquare, AlertTriangle,
    Activity, Heart, Clipboard, User, Calendar, Clock, Plus, CheckCircle2, X, Save
} from 'lucide-react';
import { useParams, useRouter } from "next/navigation";


export default function PatientProfile() {
    const { id } = useParams<{ id: string }>();
    const router = useRouter();

    const [isNoteModalOpen, setIsNoteModalOpen] = useState(false);
    const [isEscalateModalOpen, setIsEscalateModalOpen] = useState(false);
    const [activeTab, setActiveTab] = useState('Overview');
    const [noteText, setNoteText] = useState("");

    // Sample data to match the screenshot
    const patient = {
        name: "Mohammed Hassan",
        status: "attention needed",
        mrn: "MRN-001236",
        email: "m.hassan@email.com",
        phone: "+971 55 456 7890",
        lastReading: "198",
        diabetesType: "Type2",
        totalReadings: "1",
        followUps: "0",
        gender: "Male",
        dob: "Nov 8, 1968",
        subscription: "active",
        lastActivity: "12 months ago",
        emergencyContact: "Aisha Hassan",
        emergencyPhone: "+971 55 098 7654"
    };
    const [formData, setFormData] = useState({
        type: "Call",
        outcome: "Attended",
        summary: "",
        medicalNotes: "",
        adviceGiven: "",
    });
    const [escalateFormData, setEscalateFormData] = useState({
        patient: "Mohammed Hassan",
        severity: "High",
        currentReading: "",
        reason: "",
    });

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleEscalateInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setEscalateFormData(prev => ({ ...prev, [name]: value }));
    };

    const tabs = ['Overview', 'Readings', 'Notes & Follow-ups', 'Communication', 'Alerts'];

    return (
        <div className="min-h-screen bg-gray-50 p-4 lg:p-8 font-sans relative">
            {/* Header Navigation */}
            <div className="flex items-center gap-2 mb-6 text-gray-900 cursor-pointer hover:text-blue-600 transition-colors group">
                <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                <h1 className="text-xl font-bold">Patient Profile</h1>
            </div>

            {/* Profile Top Bar */}
            <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm mb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-[#3b82f6] rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-inner">
                        M
                    </div>
                    <div>
                        <div className="flex items-center gap-3">
                            <h2 className="text-2xl font-bold text-gray-900">{patient.name}</h2>
                            <span className="bg-[#fff7ed] text-[#f97316] text-[10px] font-bold uppercase px-2 py-0.5 rounded border border-[#ffedd5]">
                                {patient.status}
                            </span>
                        </div>
                        <div className="flex flex-wrap gap-4 mt-1 text-gray-500 text-sm">
                            <span className="flex items-center gap-1.5"><Clipboard size={14} className="text-gray-400" /> {patient.mrn}</span>
                            <span className="flex items-center gap-1.5"><MessageSquare size={14} className="text-gray-400" /> {patient.email}</span>
                            <span className="flex items-center gap-1.5"><Phone size={14} className="text-gray-400" /> {patient.phone}</span>
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors">
                        <Phone size={16} /> Call
                    </button>
                    <button
                        onClick={() => router.push(`/dashboard/messages?patientId=${id}`)}
                        className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                        <MessageSquare size={16} /> Message
                    </button>

                    <button
                        onClick={() => setIsEscalateModalOpen(true)} // --- TRIGGER ESCALATE MODAL ---
                        className="flex items-center gap-2 px-4 py-2 bg-[#ef4444] text-white rounded-lg text-sm font-semibold hover:bg-red-600 shadow-sm transition-all active:scale-95"
                    >
                        <AlertTriangle size={16} /> Escalate
                    </button>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                {[
                    { label: 'Last Reading', value: `${patient.lastReading} mg/dL`, icon: <Activity size={14} />, color: 'text-red-600' },
                    { label: 'Diabetes Type', value: patient.diabetesType, icon: <Heart size={14} /> },
                    { label: 'Total Readings', value: patient.totalReadings, icon: <Activity size={14} /> },
                    { label: 'Follow-ups', value: patient.followUps, icon: <Clock size={14} /> },
                ].map((stat, i) => (
                    <div key={i} className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
                        <div className="flex items-center gap-2 text-gray-400 mb-2">
                            {stat.icon}
                            <span className="text-[10px] font-bold uppercase tracking-wider">{stat.label}</span>
                        </div>
                        <div className={`text-2xl font-bold ${stat.color || 'text-gray-900'}`}>{stat.value}</div>
                    </div>
                ))}
            </div>

            {/* Tab Navigation - Exact UI from Image */}
            <div className="flex gap-2 mb-6 bg-white p-1 w-fit rounded-lg border border-gray-100 shadow-sm">
                {tabs.map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`px-4 py-2 text-xs font-semibold rounded-md transition-all ${activeTab === tab
                            ? 'bg-[#f8fafc] text-gray-900 border border-gray-900'
                            : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                            }`}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {/* Dynamic Content Area */}
            <div className="min-h-[400px]">
                {activeTab === 'Overview' && (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
                        {/* Glucose Readings Chart */}
                        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                            <h3 className="text-base font-bold text-gray-900 mb-8">Glucose Readings (Last 30)</h3>
                            <div className="relative h-[250px] w-full mt-4">
                                <div className="absolute left-0 top-0 w-full h-full flex flex-col justify-between border-l border-gray-100">
                                    {[250, 200, 150, 100, 50].map(val => (
                                        <div key={val} className="w-full border-t border-gray-50 text-[10px] text-gray-300 relative h-0">
                                            <span className="absolute -left-8 -top-2">{val}</span>
                                        </div>
                                    ))}
                                </div>
                                {/* Lines */}
                                <div className="absolute top-[30%] w-full border-t border-dashed border-red-300">
                                    <span className="absolute right-0 -top-4 text-[10px] text-red-400 font-bold bg-white px-1">High</span>
                                </div>
                                <div className="absolute top-[75%] w-full border-t border-dashed border-orange-200">
                                    <span className="absolute right-0 -top-4 text-[10px] text-orange-400 font-bold bg-white px-1">Low</span>
                                </div>
                                {/* Data Point */}
                                <div className="absolute left-[80%] top-[35%] w-2 h-2 bg-white border-2 border-blue-600 rounded-full shadow-[0_0_8px_rgba(37,99,235,0.4)]"></div>
                                <div className="absolute bottom-[-25px] left-[80%] -translate-x-1/2 text-[10px] text-gray-400 font-medium">Jan 12</div>
                            </div>
                        </div>

                        {/* Information Grid */}
                        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                            <h3 className="text-base font-bold text-gray-900 mb-8">Patient Information</h3>
                            <div className="grid grid-cols-2 gap-y-10">
                                <div>
                                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">Gender</p>
                                    <p className="text-[15px] font-bold text-gray-900">Male</p>
                                </div>
                                <div>
                                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">Date of Birth</p>
                                    <p className="text-[15px] font-bold text-gray-900">Nov 8, 1968</p>
                                </div>
                                <div>
                                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">Subscription Status</p>
                                    <span className="bg-green-50 text-green-600 text-[10px] font-bold px-2.5 py-1 rounded-full border border-green-100">active</span>
                                </div>
                                <div>
                                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">Last Activity</p>
                                    <p className="text-[15px] font-bold text-gray-900">12 months ago</p>
                                </div>
                            </div>
                            <div className="mt-12 pt-8 border-t border-gray-50">
                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">Emergency Contact</p>
                                <p className="text-[15px] font-bold text-gray-900">Aisha Hassan</p>
                                <p className="text-sm text-gray-500 font-medium mt-1">+971 55 098 7654</p>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'Readings' && (
                    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
                        <h3 className="text-base font-bold text-gray-900 mb-6">Glucose Reading History</h3>
                        <div className="flex items-center justify-between p-4 bg-gray-50/50 border border-gray-100 rounded-xl">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 bg-red-50 text-red-500 rounded-lg flex items-center justify-center font-bold text-sm border border-red-100">198</div>
                                <div>
                                    <div className="flex items-center gap-2">
                                        <span className="font-bold text-gray-900">198 mg/dL</span>
                                        <span className="bg-red-50 text-red-500 text-[9px] font-bold uppercase px-1.5 py-0.5 rounded">High</span>
                                    </div>
                                    <p className="text-xs text-gray-500 font-medium">Random Reading</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="text-[11px] font-bold text-gray-900">Jan 12, 2025</p>
                                <p className="text-[10px] text-gray-400">7:00 PM</p>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'Notes & Follow-ups' && (
                    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 animate-in fade-in slide-in-from-bottom-2 duration-300 min-h-[400px] flex flex-col">
                        <div className="flex justify-between items-center mb-10">
                            <h3 className="text-base font-bold text-gray-900">Follow-up Notes</h3>
                            <button
                                onClick={() => setIsNoteModalOpen(true)} // --- TRIGGER MODAL ---
                                className="flex items-center gap-2 bg-[#3b82f6] text-white px-3 py-1.5 rounded-lg text-xs font-bold shadow-sm hover:bg-blue-600 transition-all active:scale-95"
                            >
                                <Plus size={14} /> Add Note
                            </button>
                        </div>
                        <div className="flex-1 flex flex-col items-center justify-center text-center">
                            <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center mb-4 border border-gray-100">
                                <Clipboard className="text-gray-300" size={24} />
                            </div>
                            <p className="text-sm font-bold text-gray-400">No follow-up notes yet</p>
                        </div>
                    </div>
                )}

                {activeTab === 'Communication' && (
                    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 animate-in fade-in slide-in-from-bottom-2 duration-300 min-h-[400px] flex flex-col">
                        <h3 className="text-base font-bold text-gray-900 mb-10">Communication History</h3>
                        <div className="flex-1 flex flex-col items-center justify-center text-center">
                            <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center mb-4 border border-gray-100">
                                <MessageSquare className="text-gray-300" size={24} />
                            </div>
                            <p className="text-sm font-bold text-gray-400">No messages yet</p>
                        </div>
                    </div>
                )}

                {activeTab === 'Alerts' && (
                    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 animate-in fade-in slide-in-from-bottom-2 duration-300 min-h-[400px]">
                        <h3 className="text-base font-bold text-gray-900 mb-6">Alert History</h3>
                        <div className="p-4 border border-gray-100 rounded-xl space-y-3">
                            <div className="flex gap-2 flex-wrap">
                                <span className="bg-[#fffbeb] text-[#d97706] text-[10px] font-bold px-2 py-0.5 rounded border border-[#fef3c7]">medium</span>
                                <span className="bg-gray-50 text-gray-600 text-[10px] font-bold px-2 py-0.5 rounded border border-gray-100">Consistent High</span>
                                <span className="bg-[#fffbeb] text-[#d97706] text-[10px] font-bold px-2 py-0.5 rounded border border-[#fef3c7]">pending</span>
                            </div>
                            <p className="text-sm font-bold text-gray-800">Multiple high readings detected over the past week</p>
                            <p className="text-[10px] font-medium text-gray-400">Dec 15, 2025 12:22 PM</p>
                        </div>
                    </div>
                )}
            </div>

            {/* --- ADD NOTE MODAL --- */}
            {isNoteModalOpen && (
                <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/60 backdrop-blur-[1.5px] animate-in fade-in duration-200">
                    <div className="bg-white rounded-xl shadow-2xl w-full max-w-xl mx-4 overflow-hidden animate-in zoom-in-95 duration-200">
                        {/* Header */}
                        <div className="flex items-center justify-between p-4 border-b border-gray-100">
                            <h2 className="text-[16px] font-bold text-gray-800">Add Follow-Up Note</h2>
                            <button onClick={() => setIsNoteModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                                <X size={20} />
                            </button>
                        </div>

                        {/* Form Body */}
                        <div className="p-5 space-y-4 max-h-[70vh] overflow-y-auto">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <label className="text-xs font-bold text-gray-700">Type</label>
                                    <select
                                        name="type"
                                        value={formData.type}
                                        onChange={handleInputChange}
                                        className="w-full p-2 text-sm border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 outline-none bg-white"
                                    >
                                        <option value="Call">Call</option>
                                        <option value="In-Person">In-Person</option>
                                        <option value="Message">Message</option>
                                    </select>
                                </div>
                                <div className="space-y-1">
                                    <label className="text-xs font-bold text-gray-700">Outcome</label>
                                    <select
                                        name="outcome"
                                        value={formData.outcome}
                                        onChange={handleInputChange}
                                        className="w-full p-2 text-sm border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 outline-none bg-white"
                                    >
                                        <option value="Attended">Attended</option>
                                        <option value="No Answer">No Answer</option>
                                        <option value="Left Message">Left Message</option>
                                    </select>
                                </div>
                            </div>

                            <div className="space-y-1">
                                <label className="text-xs font-bold text-gray-700">Summary</label>
                                <textarea
                                    name="summary"
                                    placeholder="Brief summary of the interaction..."
                                    value={formData.summary}
                                    onChange={handleInputChange}
                                    rows={3}
                                    className="w-full p-3 text-sm border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 outline-none resize-none"
                                />
                            </div>

                            <div className="space-y-1">
                                <label className="text-xs font-bold text-gray-700">Medical Notes</label>
                                <textarea
                                    name="medicalNotes"
                                    placeholder="Clinical observations and notes..."
                                    value={formData.medicalNotes}
                                    onChange={handleInputChange}
                                    rows={3}
                                    className="w-full p-3 text-sm border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 outline-none resize-none"
                                />
                            </div>

                            <div className="space-y-1">
                                <label className="text-xs font-bold text-gray-700">Advice Given</label>
                                <textarea
                                    name="adviceGiven"
                                    placeholder="Recommendations provided to the patient..."
                                    value={formData.adviceGiven}
                                    onChange={handleInputChange}
                                    rows={3}
                                    className="w-full p-3 text-sm border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 outline-none resize-none"
                                />
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="flex justify-end gap-2 p-4 border-t border-gray-100 bg-gray-50/50">
                            <button
                                onClick={() => setIsNoteModalOpen(false)}
                                className="px-4 py-1.5 text-sm font-semibold text-gray-600 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => {
                                    console.log("Saving Note:", formData);
                                    setIsNoteModalOpen(false);
                                }}
                                className="flex items-center gap-2 px-5 py-1.5 text-sm font-semibold text-white bg-[#3b82f6] rounded-md hover:bg-blue-600 shadow-sm transition-all active:scale-95"
                            >
                                <Save size={16} />
                                Save Note
                            </button>
                        </div>
                    </div>
                </div>
            )}
            {/* --- ESCALATE TO DOCTOR MODAL (EXACT UI FROM PICTURE) --- */}
            {isEscalateModalOpen && (
                <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/60 backdrop-blur-[1.5px] animate-in fade-in duration-200">
                    <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg mx-4 overflow-hidden animate-in zoom-in-95 duration-200">
                        {/* Modal Header */}
                        <div className="flex items-center justify-between p-4 border-b border-gray-100">
                            <div className="flex items-center gap-2">
                                <AlertTriangle size={18} className="text-[#ef4444]" />
                                <h2 className="text-[16px] font-bold text-gray-800">Escalate to Doctor</h2>
                            </div>
                            <button onClick={() => setIsEscalateModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                                <X size={20} />
                            </button>
                        </div>

                        {/* Modal Body */}
                        <div className="p-6 space-y-5 text-left">
                            {/* Patient Selection */}
                            <div className="space-y-1.5">
                                <label className="text-xs font-bold text-gray-700">Patient</label>
                                <select
                                    name="patient"
                                    value={escalateFormData.patient}
                                    onChange={handleEscalateInputChange}
                                    className="w-full p-2.5 text-sm border border-gray-300 rounded-md bg-white focus:ring-1 focus:ring-red-500 outline-none appearance-none cursor-pointer"
                                >
                                    <option value="Ahmed Al-Rashid">Ahmed Al-Rashid</option>
                                    <option value="Omar Al-Farsi">Omar Al-Farsi</option>
                                    <option value="Mohammed Hassan">Mohammed Hassan</option>
                                </select>
                            </div>

                            {/* Severity Selection */}
                            <div className="space-y-1.5">
                                <label className="text-xs font-bold text-gray-700">Severity</label>
                                <select
                                    name="severity"
                                    value={escalateFormData.severity}
                                    onChange={handleEscalateInputChange}
                                    className="w-full p-2.5 text-sm border border-gray-300 rounded-md bg-white focus:ring-1 focus:ring-red-500 outline-none appearance-none cursor-pointer"
                                >
                                    <option value="High">High</option>
                                    <option value="Critical">Critical</option>
                                    <option value="Moderate">Moderate</option>
                                </select>
                            </div>

                            {/* Current Reading */}
                            <div className="space-y-1.5">
                                <label className="text-xs font-bold text-gray-700">Current Reading (mg/dL)</label>
                                <input
                                    type="text"
                                    name="currentReading"
                                    placeholder="e.g., 250"
                                    value={escalateFormData.currentReading}
                                    onChange={handleEscalateInputChange}
                                    className="w-full p-2.5 text-sm border border-gray-300 rounded-md focus:ring-1 focus:ring-red-500 outline-none"
                                />
                            </div>

                            {/* Reason for Escalation */}
                            <div className="space-y-1.5">
                                <label className="text-xs font-bold text-gray-700">Reason for Escalation</label>
                                <textarea
                                    name="reason"
                                    placeholder="Describe the situation and why escalation is needed..."
                                    value={escalateFormData.reason}
                                    onChange={handleEscalateInputChange}
                                    rows={4}
                                    className="w-full p-3 text-sm border border-gray-300 rounded-md focus:ring-1 focus:ring-red-500 outline-none resize-none"
                                />
                            </div>
                        </div>

                        {/* Modal Footer */}
                        <div className="flex justify-end gap-2 p-4 border-t border-gray-100 bg-gray-50/50">
                            <button
                                onClick={() => setIsEscalateModalOpen(false)}
                                className="px-5 py-2 text-sm font-semibold text-gray-600 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => {
                                    console.log("Escalating:", escalateFormData);

                                    // reset form
                                    setEscalateFormData({
                                        patient: "Mohammed Hassan",
                                        severity: "High",
                                        currentReading: "",
                                        reason: "",
                                    });

                                    setIsEscalateModalOpen(false);
                                }}

                                className="px-6 py-2 text-sm font-semibold text-white bg-[#ef4444] rounded-md hover:bg-red-700 shadow-md transition-all active:scale-95"
                            >
                                Submit Escalation
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
