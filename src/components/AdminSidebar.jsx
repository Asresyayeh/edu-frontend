import { NavLink } from "react-router-dom";

import {
  GraduationCap,
  LayoutDashboard,
  Users,
  BookOpen,
  Layers,
  ClipboardList,
  CreditCard,
  MessageSquare,
  BarChart3,
  Settings,
  LogOut,
  X,
  ShieldCheck,
} from "lucide-react";

const menuItems = [
  {
    name: "Dashboard",
    path: "/admin/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "User Management",
    path: "/admin/users",
    icon: Users,
  },
  {
    name: "Course Management",
    path: "/admin/courses",
    icon: BookOpen,
  },
  {
    name: "Categories",
    path: "/admin/categories",
    icon: Layers,
  },
  {
    name: "Enrollments",
    path: "/admin/enrollments",
    icon: ClipboardList,
  },
  {
    name: "Payments",
    path: "/admin/payments",
    icon: CreditCard,
  },
  {
    name: "Messages",
    path: "/admin/messages",
    icon: MessageSquare,
  },
  {
    name: "Reports & Analytics",
    path: "/admin/reports",
    icon: BarChart3,
  },
  {
    name: "Settings",
    path: "/admin/settings",
    icon: Settings,
  },
];

function AdminSidebar({ isOpen, onClose }) {
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("educonnect_user");

    window.location.href = "/";
  };

  return (
    <>
      {/* Background Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 z-50 flex h-screen w-64 flex-col
        border-r border-slate-200 bg-white transition-transform duration-300
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0`}
      >
        {/* Logo */}
        <div className="flex h-20 items-center justify-between border-b px-6">
          <div className="flex items-center gap-2">
            <div className="rounded-xl bg-blue-600 p-2 text-white">
              <GraduationCap size={25} />
            </div>

            <span className="text-xl font-bold text-slate-800">
              EduConnect <span className="text-blue-600">ET</span>
            </span>
          </div>

          <button
            onClick={onClose}
            className="lg:hidden"
            aria-label="Close sidebar"
          >
            <X size={22} />
          </button>
        </div>

        {/* Admin Profile */}
        <div className="border-b px-5 py-4">
          <div className="flex items-center gap-3">
            <div className="rounded-full bg-blue-100 p-2.5 text-blue-600">
              <ShieldCheck size={22} />
            </div>

            <div>
              <p className="text-sm font-semibold text-slate-800">
                Administrator
              </p>

              <p className="text-xs text-slate-500">System Admin</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto px-4 py-6">
          <p className="mb-4 px-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
            Admin Menu
          </p>

          <nav className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;

              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={onClose}
                  end={item.path === "/admin/dashboard"}
                  className={({ isActive }) =>
                    `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition ${
                      isActive
                        ? "bg-blue-600 text-white shadow-md shadow-blue-200"
                        : "text-slate-600 hover:bg-blue-50 hover:text-blue-600"
                    }`
                  }
                >
                  <Icon size={19} />
                  {item.name}
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* Logout */}
        <div className="border-t p-4">
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-red-500 hover:bg-red-50"
          >
            <LogOut size={19} />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
}

export default AdminSidebar;
