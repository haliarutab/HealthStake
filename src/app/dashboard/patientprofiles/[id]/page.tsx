"use client";

import AdminSidebar from "../../dbcomponents/admin_sidebar";
import Escalations from "../../dbcomponents/escalation";
import PatientProfile from "../../dbcomponents/patientprofile";

export default function PatientProfilePage() {
  return (
    <div className="flex h-screen w-screen bg-slate-50 overflow-hidden">
      <AdminSidebar />
      <main className="flex-1 overflow-y-auto">
        <PatientProfile />
      </main>
    </div>
  );
}
