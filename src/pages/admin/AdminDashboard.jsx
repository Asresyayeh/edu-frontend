import React from "react";
import {
  Users,
  GraduationCap,
  BookOpen,
  CreditCard,
  TrendingUp,
  TrendingDown,
  UserPlus,
  PlusCircle,
  ClipboardList,
  ArrowUpRight,
  MoreHorizontal,
  CalendarDays,
  Activity,
  ShieldCheck,
} from "lucide-react";

const stats = [
  {
    title: "Total Users",
    value: "2,450",
    change: "+12.5%",
    positive: true,
    icon: Users,
    gradient: "from-blue-500 to-indigo-600",
    shadow: "shadow-blue-200",
  },
  {
    title: "Total Tutors",
    value: "186",
    change: "+8.2%",
    positive: true,
    icon: GraduationCap,
    gradient: "from-purple-500 to-violet-600",
    shadow: "shadow-purple-200",
  },
  {
    title: "Total Courses",
    value: "324",
    change: "+15.3%",
    positive: true,
    icon: BookOpen,
    gradient: "from-emerald-500 to-green-600",
    shadow: "shadow-green-200",
  },
  {
    title: "Total Revenue",
    value: "ETB 485,200",
    change: "-2.4%",
    positive: false,
    icon: CreditCard,
    gradient: "from-orange-400 to-pink-500",
    shadow: "shadow-orange-200",
  },
];

const recentUsers = [
  {
    name: "Abebe Kebede",
    email: "abebe@example.com",
    role: "Student",
    status: "Active",
    initials: "AK",
    color: "bg-blue-100 text-blue-700",
  },
  {
    name: "Mekdes Alemu",
    email: "mekdes@example.com",
    role: "Tutor",
    status: "Active",
    initials: "MA",
    color: "bg-purple-100 text-purple-700",
  },
  {
    name: "Dawit Tadesse",
    email: "dawit@example.com",
    role: "Student",
    status: "Pending",
    initials: "DT",
    color: "bg-green-100 text-green-700",
  },
  {
    name: "Sara Bekele",
    email: "sara@example.com",
    role: "Parent",
    status: "Active",
    initials: "SB",
    color: "bg-pink-100 text-pink-700",
  },
];

const recentCourses = [
  {
    title: "Complete Web Development",
    tutor: "Mekdes Alemu",
    students: 245,
    price: "ETB 1,500",
    status: "Published",
  },
  {
    title: "UI/UX Design Fundamentals",
    tutor: "Dawit Tadesse",
    students: 128,
    price: "ETB 1,200",
    status: "Published",
  },
  {
    title: "Introduction to Python",
    tutor: "Abebe Girma",
    students: 86,
    price: "ETB 900",
    status: "Pending",
  },
];

const monthlyActivity = [
  { month: "Jan", height: "35%" },
  { month: "Feb", height: "48%" },
  { month: "Mar", height: "42%" },
  { month: "Apr", height: "65%" },
  { month: "May", height: "55%" },
  { month: "Jun", height: "75%" },
  { month: "Jul", height: "60%" },
  { month: "Aug", height: "85%" },
  { month: "Sep", height: "70%" },
  { month: "Oct", height: "92%" },
  { month: "Nov", height: "80%" },
  { month: "Dec", height: "100%" },
];

const AdminDashboard = () => {
  return (
    <div className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8">
      {/* Welcome Header */}
      <div className="relative mb-8 overflow-hidden rounded-2xl bg-gradient-to-r from-blue-700 via-indigo-700 to-violet-700 p-6 text-white shadow-xl sm:p-8">
        <div className="relative z-10">
          <div className="mb-3 flex items-center gap-2">
            <ShieldCheck size={20} />
            <span className="text-sm font-medium text-blue-100">
              EduConnect ET Administration
            </span>
          </div>

          <h1 className="text-2xl font-bold sm:text-3xl">
            Welcome Back, Admin!
          </h1>

          <p className="mt-2 max-w-xl text-sm text-blue-100 sm:text-base">
            Manage your learning platform, monitor activities, and keep
            everything running smoothly.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <button className="rounded-lg bg-white px-5 py-2.5 text-sm font-semibold text-indigo-700 shadow transition hover:bg-blue-50">
              View Reports
            </button>

            <button className="rounded-lg border border-white/40 bg-white/10 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-white/20">
              Manage Platform
            </button>
          </div>
        </div>

        <div className="absolute -right-10 -top-20 h-64 w-64 rounded-full bg-white/10" />
        <div className="absolute -bottom-28 right-32 h-64 w-64 rounded-full bg-white/10" />
      </div>

      {/* Page Heading */}
      <div className="mb-6 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
        <div>
          <h2 className="text-xl font-bold text-slate-800">
            Dashboard Overview
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Here's an overview of your platform performance.
          </p>
        </div>

        <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-600 shadow-sm">
          <CalendarDays size={18} className="text-indigo-600" />
          November 2026
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.title}
              className={`group relative overflow-hidden rounded-2xl bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg ${stat.shadow}`}
            >
              <div className="flex items-center justify-between">
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${stat.gradient} text-white shadow-lg`}
                >
                  <Icon size={23} />
                </div>

                <span
                  className={`flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold ${
                    stat.positive
                      ? "bg-green-50 text-green-600"
                      : "bg-red-50 text-red-600"
                  }`}
                >
                  {stat.positive ? (
                    <TrendingUp size={14} />
                  ) : (
                    <TrendingDown size={14} />
                  )}
                  {stat.change}
                </span>
              </div>

              <p className="mt-5 text-sm font-medium text-slate-500">
                {stat.title}
              </p>

              <h3 className="mt-1 text-2xl font-bold text-slate-800">
                {stat.value}
              </h3>

              <p className="mt-2 text-xs text-slate-400">
                Compared to last month
              </p>

              <div
                className={`absolute -bottom-8 -right-8 h-24 w-24 rounded-full bg-gradient-to-br ${stat.gradient} opacity-[0.06] transition-transform group-hover:scale-150`}
              />
            </div>
          );
        })}
      </div>

      {/* Activity and Quick Actions */}
      <div className="mt-8 grid grid-cols-1 gap-6 xl:grid-cols-3">
        {/* Activity Chart */}
        <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm xl:col-span-2">
          <div className="mb-6 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
            <div>
              <h2 className="text-lg font-bold text-slate-800">
                Platform Activity
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Monthly platform activity overview
              </p>
            </div>

            <select className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-600 outline-none focus:border-indigo-500">
              <option>This Year</option>
              <option>Last Year</option>
            </select>
          </div>

          <div className="flex h-64 items-end justify-between gap-2 border-b border-slate-100 px-1 pb-2">
            {monthlyActivity.map((item) => (
              <div
                key={item.month}
                className="flex h-full flex-1 flex-col items-center justify-end gap-2"
              >
                <div
                  style={{ height: item.height }}
                  className="w-full max-w-8 rounded-t-lg bg-gradient-to-t from-blue-600 to-indigo-400 transition-all duration-300 hover:from-indigo-700 hover:to-violet-500"
                />

                <span className="text-[10px] text-slate-400 sm:text-xs">
                  {item.month}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-5 flex items-center gap-2 text-sm text-slate-500">
            <span className="h-3 w-3 rounded-full bg-indigo-500" />
            Platform activity
            <span className="ml-auto text-xs text-slate-400">
              Illustrative data
            </span>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-bold text-slate-800">Quick Actions</h2>
          <p className="mt-1 text-sm text-slate-500">
            Frequently used management tools
          </p>

          <div className="mt-6 space-y-3">
            <button className="flex w-full items-center gap-3 rounded-xl border border-blue-100 bg-blue-50 p-4 text-left transition hover:border-blue-300 hover:bg-blue-100">
              <div className="rounded-lg bg-blue-600 p-2.5 text-white">
                <UserPlus size={20} />
              </div>
              <div className="flex-1">
                <p className="font-semibold text-slate-800">Manage Users</p>
                <p className="text-xs text-slate-500">View and manage users</p>
              </div>
              <ArrowUpRight size={18} className="text-blue-600" />
            </button>

            <button className="flex w-full items-center gap-3 rounded-xl border border-purple-100 bg-purple-50 p-4 text-left transition hover:border-purple-300 hover:bg-purple-100">
              <div className="rounded-lg bg-purple-600 p-2.5 text-white">
                <PlusCircle size={20} />
              </div>
              <div className="flex-1">
                <p className="font-semibold text-slate-800">Add Category</p>
                <p className="text-xs text-slate-500">
                  Create a course category
                </p>
              </div>
              <ArrowUpRight size={18} className="text-purple-600" />
            </button>

            <button className="flex w-full items-center gap-3 rounded-xl border border-green-100 bg-green-50 p-4 text-left transition hover:border-green-300 hover:bg-green-100">
              <div className="rounded-lg bg-green-600 p-2.5 text-white">
                <BookOpen size={20} />
              </div>
              <div className="flex-1">
                <p className="font-semibold text-slate-800">Manage Courses</p>
                <p className="text-xs text-slate-500">
                  Review and manage courses
                </p>
              </div>
              <ArrowUpRight size={18} className="text-green-600" />
            </button>

            <button className="flex w-full items-center gap-3 rounded-xl border border-orange-100 bg-orange-50 p-4 text-left transition hover:border-orange-300 hover:bg-orange-100">
              <div className="rounded-lg bg-orange-500 p-2.5 text-white">
                <ClipboardList size={20} />
              </div>
              <div className="flex-1">
                <p className="font-semibold text-slate-800">View Reports</p>
                <p className="text-xs text-slate-500">
                  Monitor platform performance
                </p>
              </div>
              <ArrowUpRight size={18} className="text-orange-600" />
            </button>
          </div>
        </div>
      </div>

      {/* Recent Users */}
      <div className="mt-8 rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-800">Recent Users</h2>
            <p className="mt-1 text-sm text-slate-500">
              Recently registered platform users
            </p>
          </div>

          <button className="text-sm font-semibold text-indigo-600 transition hover:text-indigo-800">
            View All
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[650px] text-left">
            <thead>
              <tr className="border-b border-slate-100 text-xs uppercase tracking-wider text-slate-400">
                <th className="pb-4 font-semibold">User</th>
                <th className="pb-4 font-semibold">Role</th>
                <th className="pb-4 font-semibold">Status</th>
                <th className="pb-4 text-right font-semibold">Action</th>
              </tr>
            </thead>

            <tbody>
              {recentUsers.map((user) => (
                <tr
                  key={user.email}
                  className="border-b border-slate-50 transition hover:bg-slate-50 last:border-0"
                >
                  <td className="py-4">
                    <div className="flex items-center gap-3">
                      <div
                        className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold ${user.color}`}
                      >
                        {user.initials}
                      </div>

                      <div>
                        <p className="font-semibold text-slate-800">
                          {user.name}
                        </p>
                        <p className="text-xs text-slate-500">{user.email}</p>
                      </div>
                    </div>
                  </td>

                  <td className="py-4">
                    <span className="rounded-lg bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
                      {user.role}
                    </span>
                  </td>

                  <td className="py-4">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        user.status === "Active"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {user.status}
                    </span>
                  </td>

                  <td className="py-4 text-right">
                    <button
                      aria-label={`More actions for ${user.name}`}
                      className="rounded-lg p-2 text-slate-400 transition hover:bg-indigo-50 hover:text-indigo-600"
                    >
                      <MoreHorizontal size={20} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Recent Courses */}
      <div className="mt-8 rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-800">Recent Courses</h2>
            <p className="mt-1 text-sm text-slate-500">
              Latest courses added to EduConnect ET
            </p>
          </div>

          <button className="text-sm font-semibold text-indigo-600 transition hover:text-indigo-800">
            View All
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[650px] text-left">
            <thead>
              <tr className="border-b border-slate-100 text-xs uppercase tracking-wider text-slate-400">
                <th className="pb-4 font-semibold">Course</th>
                <th className="pb-4 font-semibold">Tutor</th>
                <th className="pb-4 font-semibold">Students</th>
                <th className="pb-4 font-semibold">Price</th>
                <th className="pb-4 font-semibold">Status</th>
              </tr>
            </thead>

            <tbody>
              {recentCourses.map((course) => (
                <tr
                  key={course.title}
                  className="border-b border-slate-50 transition hover:bg-slate-50 last:border-0"
                >
                  <td className="py-4 font-semibold text-slate-800">
                    {course.title}
                  </td>

                  <td className="py-4 text-sm text-slate-600">
                    {course.tutor}
                  </td>

                  <td className="py-4 text-sm text-slate-600">
                    {course.students}
                  </td>

                  <td className="py-4 text-sm font-semibold text-slate-700">
                    {course.price}
                  </td>

                  <td className="py-4">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        course.status === "Published"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {course.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-8 flex flex-col items-center justify-between gap-2 border-t border-slate-200 pt-5 text-xs text-slate-400 sm:flex-row">
        <p>© 2026 EduConnect ET. All rights reserved.</p>
        <p className="flex items-center gap-1">
          <Activity size={14} className="text-green-500" />
          Admin Control Panel
        </p>
      </div>
    </div>
  );
};

export default AdminDashboard;
