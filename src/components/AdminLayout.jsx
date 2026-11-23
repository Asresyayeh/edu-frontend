import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Menu } from "lucide-react";
import AdminSidebar from "./AdminSidebar";

function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Sidebar */}
      <AdminSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Main Content */}
      <div className="min-h-screen">
        {/* Header - Always Visible */}
        <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b border-slate-200 bg-white px-5 shadow-sm">
          <button
            onClick={() => setSidebarOpen(true)}
            className="rounded-lg p-2 text-slate-700 transition hover:bg-blue-50 hover:text-blue-600"
            aria-label="Open admin menu"
          >
            <Menu size={24} />
          </button>

          <h1 className="text-lg font-bold text-blue-600">EduConnect ET</h1>
        </header>

        {/* Page Content */}
        <main className="min-w-0">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;
