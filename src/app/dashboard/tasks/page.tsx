"use client";

import Tasks from "./tasks";
import AdminSidebar from "../dbcomponents/admin_sidebar";

export default function TasksPage() {
  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      <AdminSidebar />

    <main className="flex-1 overflow-y-auto px-8 py-6">
  <div className="max-w-full">
          <Tasks />
        </div>
      </main>
    </div>
  );
}
