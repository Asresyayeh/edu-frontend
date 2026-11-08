import { NavLink, useNavigate } from "react-router-dom";

import {
  GraduationCap,
  LayoutDashboard,
  Users,
  BookOpen,
  TrendingUp,
  CalendarDays,
  MessageSquare,
  CreditCard,
  Settings,
  LogOut,
  X,
} from "lucide-react";

export default function ParentSidebar({ isOpen, onClose }) {
  const navigate = useNavigate();

  const menuItems = [
    {
      name: "Dashboard",
      path: "/parent/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "My Children",
      path: "/parent/children",
      icon: Users,
    },
    {
      name: "Courses",
      path: "/parent/courses",
      icon: BookOpen,
    },
    {
      name: "Learning Progress",
      path: "/parent/progress",
      icon: TrendingUp,
    },
    {
      name: "Schedule",
      path: "/parent/schedule",
      icon: CalendarDays,
    },
    {
      name: "Messages",
      path: "/parent/messages",
      icon: MessageSquare,
    },
    {
      name: "Payments",
      path: "/parent/payments",
      icon: CreditCard,
    },
    {
      name: "Settings",
      path: "/parent/settings",
      icon: Settings,
    },
  ];

  const handleLogout = () => {
    localStorage.removeItem("educonnect_user");
    localStorage.removeItem("token");
    navigate("/");
    onClose();
  };

  return (
    <>
      {/* Overlay */}
      <div
        onClick={onClose}
        className={`fixed inset-0 z-40 bg-black/50 transition-opacity duration-300 ${
          isOpen ? "visible opacity-100" : "invisible opacity-0"
        }`}
      />

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 z-50 flex h-screen w-64 flex-col bg-brand-800 text-white shadow-xl transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Logo */}
        <div className="flex h-20 items-center justify-between border-b border-white/10 px-6">
          <div className="flex items-center gap-2">
            <GraduationCap className="h-8 w-8 text-white" />

            <span className="text-xl font-bold">EduConnect ET</span>
          </div>

          <button
            onClick={onClose}
            className="rounded-lg p-2 hover:bg-white/10"
            aria-label="Close sidebar"
          >
            <X size={22} />
          </button>
        </div>

        {/* Parent Profile */}
        <div className="border-b border-white/10 px-6 py-5">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white/20">
              <Users size={22} />
            </div>

            <div>
              <p className="font-semibold">Parent Account</p>
              <p className="text-xs text-white/60">Parent Portal</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-2 overflow-y-auto px-4 py-6">
          <p className="mb-4 px-3 text-xs font-semibold uppercase tracking-wider text-white/50">
            Parent Menu
          </p>

          {menuItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition ${
                    isActive
                      ? "bg-white text-brand-800 shadow"
                      : "text-white/80 hover:bg-white/10 hover:text-white"
                  }`
                }
              >
                <Icon size={20} />
                {item.name}
              </NavLink>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="border-t border-white/10 p-4">
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-white/80 transition hover:bg-red-500 hover:text-white"
          >
            <LogOut size={20} />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
}
