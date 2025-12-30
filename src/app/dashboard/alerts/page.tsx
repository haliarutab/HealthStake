"use client";

import Alerts from "../dbcomponents/alerts";
import AdminSidebar from "../dbcomponents/admin_sidebar";

export default function AlertsPage() {
  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      <AdminSidebar />

      <main className="flex-1 overflow-y-auto p-8">
        <div className="max-w-7xl mx-auto">
          <Alerts />
        </div>
      </main>
    </div>
  );
}
