import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Menu, Bell } from "lucide-react";

import TutorSidebar from "./TutorSidebar";

function TutorDashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50">
      <TutorSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="min-h-screen">
        {/* Header */}
        <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-slate-200 bg-white px-5 md:px-8">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="rounded-lg p-2 text-slate-600 transition hover:bg-blue-50 hover:text-blue-600"
            >
              <Menu size={25} />
            </button>

            <div>
              <h2 className="font-bold text-slate-800">Tutor Dashboard</h2>

              <p className="text-xs text-slate-400">
                Manage your teaching activities
              </p>
            </div>
          </div>

          <button className="relative rounded-full p-2 text-slate-600 hover:bg-slate-100">
            <Bell size={22} />
            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500" />
          </button>
        </header>
        <main className="p-5 md:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default TutorDashboardLayout;
