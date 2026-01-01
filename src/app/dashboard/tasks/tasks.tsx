"use client";

import React, { useState } from 'react';
import { 
  Plus, Search, Filter, Clock, User, 
  PhoneCall, ClipboardCheck, X, Calendar, CheckCircle2 
} from 'lucide-react';
import { useRouter } from "next/navigation";

// Centralized initial data
const initialTasks = [
  {
    id: 1,
    title: "Follow up with Ahmed Al-Rashid",
    description: "Contact patient regarding critical glucose levels",
    priority: "urgent",
    status: "Overdue",
    patient: "Ahmed Al-Rashid",
    type: "Follow Up_call",
    isCompleted: false,
    assignee: "me"
  },
  {
    id: 2,
    title: "Check readings for Omar Al-Farsi",
    description: "Patient has not submitted readings - verify equipment status",
    priority: "high",
    status: "Overdue",
    patient: "Omar Al-Farsi",
    type: "Check Readings",
    isCompleted: false,
    assignee: "me"
  },
  {
    id: 3,
    title: "Monthly Documentation Review",
    description: "Ensure all patient records are signed off for the month.",
    priority: "low",
    status: "Done",
    patient: "General",
    type: "General",
    isCompleted: true,
    assignee: "me"
  }
];

const priorityColors: Record<string, string> = {
  urgent: "bg-red-100 text-red-600",
  high: "bg-orange-100 text-orange-600",
  medium: "bg-blue-100 text-blue-600",
  low: "bg-gray-100 text-gray-600",
};

export default function Tasks() {
  const [taskList, setTaskList] = useState(initialTasks);
  const [activeTab, setActiveTab] = useState('Pending');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();
  // --- LOGIC: Toggle Completion ---
  const toggleTaskCompletion = (id: number) => {
    setTaskList(prev => prev.map(task => 
      task.id === id ? { ...task, isCompleted: !task.isCompleted, status: !task.isCompleted ? "Completed" : "Overdue" } : task
    ));
  };

  // --- LOGIC: Form Submission ---
  const handleCreateTask = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const newTask = {
      id: Date.now(),
      title: formData.get('title') as string,
      description: formData.get('description') as string,
      priority: formData.get('priority') as string,
      status: "Overdue",
      patient: (formData.get('patient') as string) || "General",
      type: formData.get('type') as string,
      isCompleted: false,
      assignee: "me"
    };

    setTaskList([newTask, ...taskList]);
    setIsModalOpen(false);
  };

  // --- LOGIC: Filter Tabs ---
  const filteredTasks = taskList.filter(task => {
    if (activeTab === 'Pending') return !task.isCompleted;
    if (activeTab === 'Completed') return task.isCompleted;
    if (activeTab === 'My Tasks') return task.assignee === 'me' && !task.isCompleted;
    return true; // 'All' tab
  });

  return (
    <div className="
      -mx-4 lg:-mx-8 
      -mt-6
      w-[calc(100%+2rem)] lg:w-[calc(100%+4rem)] 
      bg-gray-50 min-h-screen font-sans relative
      p-8
    ">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Tasks</h1>
          <p className="text-gray-500 text-sm">{filteredTasks.length} {activeTab.toLowerCase()} tasks</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-[#3b82f6] hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors shadow-sm"
        >
          <Plus size={18} />
          <span className="font-medium">Create Task</span>
        </button>
      </div>

      {/* Search and Filter Bar */}
      <div className="flex gap-3 mb-6 max-w-full">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder="Search tasks..." 
            className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white shadow-sm text-sm"
          />
        </div>
        <div className="flex items-center gap-2 px-3 py-2 border border-gray-200 rounded-lg bg-white cursor-pointer hover:bg-gray-50 shadow-sm min-w-[140px]">
          <Filter size={18} className="text-gray-500" />
          <select className="bg-transparent text-sm font-medium focus:outline-none cursor-pointer w-full">
            <option>All Priority</option>
            <option>Urgent</option>
            <option>High</option>
          </select>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-6 bg-gray-100/50 p-1 w-fit rounded-lg border border-gray-200">
        {['Pending', 'My Tasks', 'Completed', 'All'].map((tab) => (
          <button 
            key={tab} 
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-1.5 text-xs font-semibold rounded-md transition-all ${
              activeTab === tab 
              ? 'bg-white text-blue-600 shadow-sm ring-1 ring-gray-200' 
              : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Task List */}
      <div className="space-y-4">
        {filteredTasks.length > 0 ? filteredTasks.map((task) => (
          <div key={task.id} className={`bg-white border border-gray-200 rounded-xl p-5 shadow-sm flex gap-4 transition-all hover:border-blue-200 ${task.isCompleted ? 'bg-gray-50/50' : ''}`}>
            <div className="pt-1">
              <input 
                type="checkbox" 
                checked={task.isCompleted}
                onChange={() => toggleTaskCompletion(task.id)}
                className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer" 
              />
            </div>
            
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-1">
                <h3 className={`font-bold text-[15px] text-gray-900 ${task.isCompleted ? 'line-through text-gray-400' : ''}`}>
                  {task.title}
                </h3>
                {!task.isCompleted && (
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${priorityColors[task.priority as keyof typeof priorityColors]}`}>
                    {task.priority}
                  </span>
                )}
                <span className={`flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${
                  task.isCompleted 
                  ? 'bg-green-50 text-green-600 border-green-100' 
                  : 'bg-red-50 text-red-500 border-red-100'
                }`}>
                  {task.isCompleted ? <CheckCircle2 size={12} /> : <Clock size={12} />}
                  {task.status}
                </span>
              </div>
              
              <p className={`text-[13px] leading-relaxed mb-3 ${task.isCompleted ? 'text-gray-300' : 'text-gray-500'}`}>
                {task.description}
              </p>
              
              <div className="flex items-center gap-6 text-[11px] text-gray-400 font-medium">
                <div className="flex items-center gap-1.5"><User size={14} className="text-gray-300" /><span>{task.patient}</span></div>
                <div className="flex items-center gap-1.5">
                  {task.type.toLowerCase().includes('call') ? <PhoneCall size={14} className="text-gray-300" /> : <ClipboardCheck size={14} className="text-gray-300" />}
                  <span>{task.type}</span>
                </div>
                {task.isCompleted && (
                   <div className="flex items-center gap-1.5 text-green-500">
                     <CheckCircle2 size={14} />
                     <span>Completed Dec 18</span>
                   </div>
                )}
              </div>
            </div>
            <div className="flex items-start">
              <button
  onClick={() =>
    router.push(`/dashboard/patientprofiles/${task.patient}`)
  }
  className="text-xs text-gray-400 hover:text-blue-600 font-semibold transition-colors"
>
  View Patient
</button>

            </div>
          </div>
        )) : (
          <div className="text-center py-24 text-gray-400 border-2 border-dashed border-gray-200 rounded-2xl bg-white">
            <div className="flex flex-col items-center gap-2">
              <ClipboardCheck size={40} className="text-gray-200" />
              <p className="font-medium text-sm">No tasks found in {activeTab}</p>
            </div>
          </div>
        )}
      </div>

      {/* CREATE TASK MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-[2px]">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg mx-4 overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="flex items-center justify-between p-5 border-b border-gray-100">
              <h2 className="text-lg font-bold text-gray-800">Create New Task</h2>
              <button onClick={() => setIsModalOpen(false)} className="p-1 rounded-full hover:bg-gray-100 text-gray-400 transition-colors"><X size={20} /></button>
            </div>

            <form className="p-6 space-y-4" onSubmit={handleCreateTask}>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Title</label>
                <input name="title" required type="text" placeholder="e.g. Follow up on labs" className="w-full px-4 py-2.5 border border-gray-200 rounded-xl outline-none text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Description</label>
                <textarea name="description" placeholder="Provide details about this task..." rows={3} className="w-full px-4 py-2.5 border border-gray-200 rounded-xl outline-none text-sm resize-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Priority</label>
                  <select name="priority" className="w-full px-4 py-2.5 border border-gray-200 rounded-xl bg-white text-sm outline-none focus:border-blue-500">
                    <option value="medium">Medium</option>
                    <option value="urgent">Urgent</option>
                    <option value="high">High</option>
                    <option value="low">Low</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Type</label>
                  <select name="type" className="w-full px-4 py-2.5 border border-gray-200 rounded-xl bg-white text-sm outline-none focus:border-blue-500">
                    <option value="General">General</option>
                    <option value="Follow Up Call">Follow Up Call</option>
                    <option value="Check Readings">Check Readings</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Due Date</label>
                <div className="relative">
                  <input name="date" type="date" required className="w-full px-4 py-2.5 border border-gray-200 rounded-xl outline-none text-sm appearance-none focus:border-blue-500 transition-all" />
                  <Calendar className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Patient (Optional)</label>
                <select name="patient" className="w-full px-4 py-2.5 border border-gray-200 rounded-xl bg-white text-sm text-gray-600 outline-none focus:border-blue-500">
                  <option value="">Select patient</option>
                  <option value="Ahmed Al-Rashid">Ahmed Al-Rashid</option>
                  <option value="Omar Al-Farsi">Omar Al-Farsi</option>
                </select>
              </div>
              <div className="flex justify-end gap-3 pt-4">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-5 py-2.5 text-gray-600 font-bold rounded-xl text-sm hover:bg-gray-100 transition-all">Cancel</button>
                <button type="submit" className="px-6 py-2.5 bg-[#3b82f6] hover:bg-blue-600 text-white font-bold rounded-xl text-sm shadow-md transition-all active:scale-[0.98]">Create Task</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}