import { useState } from "react";
import { Outlet } from "react-router-dom";

import { Menu, Bell, Search } from "lucide-react";

import ParentSidebar from "./ParentSidebar";

export default function ParentDashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Sidebar */}
      <ParentSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Main Content */}
      <div className="min-h-screen">
        {/* Header */}
        <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-slate-200 bg-white px-5 md:px-8">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="rounded-lg p-2 text-slate-600 transition hover:bg-slate-100"
              aria-label="Open sidebar"
            >
              <Menu size={25} />
            </button>

            <div>
              <h1 className="text-lg font-bold text-slate-800">
                Parent Dashboard
              </h1>

              <p className="hidden text-xs text-slate-500 sm:block">
                Monitor your children's learning journey
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button className="hidden rounded-lg p-2 text-slate-500 hover:bg-slate-100 md:block">
              <Search size={21} />
            </button>

            <button className="relative rounded-lg p-2 text-slate-500 hover:bg-slate-100">
              <Bell size={22} />

              <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500" />
            </button>

            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-100 font-bold text-brand-700">
              P
            </div>
          </div>
        </header>

        {/* Nested Pages */}
        <main className="p-5 md:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
