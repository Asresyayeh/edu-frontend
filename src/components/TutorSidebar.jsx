import { NavLink, useNavigate } from "react-router-dom";
import {
  GraduationCap,
  LayoutDashboard,
  BookOpen,
  Users,
  CalendarDays,
  ClipboardList,
  MessageSquare,
  Wallet,
  Settings,
  LogOut,
  X,
} from "lucide-react";

const menuItems = [
  { name: "Dashboard", path: "/tutor/dashboard", icon: LayoutDashboard },
  { name: "My Courses", path: "/tutor/courses", icon: BookOpen },
  { name: "My Students", path: "/tutor/students", icon: Users },
  { name: "My Schedule", path: "/tutor/schedule", icon: CalendarDays },
  { name: "Assignments", path: "/tutor/assignments", icon: ClipboardList },
  { name: "Messages", path: "/tutor/messages", icon: MessageSquare },
  { name: "Earnings", path: "/tutor/earnings", icon: Wallet },
  { name: "Settings", path: "/tutor/settings", icon: Settings },
];

function TutorSidebar({ isOpen, onClose }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("educonnect_user");
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-40 bg-black/50" onClick={onClose} />
      )}

      <aside
        className={`fixed left-0 top-0 z-50 flex h-screen w-64 flex-col
        border-r border-slate-200 bg-white transition-transform duration-300
        ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
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

          <button onClick={onClose}>
            <X size={22} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-6">
          <p className="mb-4 px-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
            Tutor Menu
          </p>

          <nav className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;

              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={onClose}
                  end={item.path === "/tutor/dashboard"}
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

export default TutorSidebar;
