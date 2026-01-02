"use client";

import Messages from "./messages";
import AdminSidebar from "../dbcomponents/admin_sidebar";

export default function MessagesPage() {
  return (
    <div className="flex h-screen w-screen bg-slate-50 overflow-hidden">
      <AdminSidebar />

      {/* FULL WIDTH CHAT */}
      <main className="flex-1 overflow-hidden p-0">
        <Messages />
      </main>
    </div>
  );
}
