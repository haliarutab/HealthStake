"use client";

import { useState } from "react";
import Patients from "./dbcomponents/patients";
import Alerts from "./dbcomponents/alerts";
import Tasks from "./dbcomponents/tasks";
import Messages from "./dbcomponents/messages";
import Reports from "./dbcomponents/reports";
import DashboardContent from "./dbcomponents/dashboard";
import AdminSidebar from "./dbcomponents/admin_sidebar";

export default function Page() {
  const [activePage, setActivePage] = useState("Dashboard");

  // Define the mapping here. The key matches the sidebar name.
  const componentsMap: { [key: string]: React.ReactNode } = {
    Dashboard: <DashboardContent />,
    Patients: <Patients />,
    Alerts: <Alerts />,
    Tasks: <Tasks />,
    Messages: <Messages />,
    Reports: <Reports />,
  };

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      {/* Sidebar handles the state change */}
      <AdminSidebar activePage={activePage} setActivePage={setActivePage} />

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto p-8">
        <div className="max-w-7xl mx-auto">
          {/* We simply call the key from the map based on state */}
          {componentsMap[activePage] || <DashboardContent />}
        </div>
      </main>
    </div>
  );
}