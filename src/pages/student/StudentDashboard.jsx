import {
  BookOpen,
  Clock,
  Award,
  TrendingUp,
  Play,
  CalendarDays,
  CheckCircle,
  Bell,
  Search,
  ArrowRight,
  GraduationCap,
  Star,
} from "lucide-react";

const courses = [
  {
    id: 1,
    title: "Introduction to Web Development",
    instructor: "Abebe Kebede",
    category: "Development",
    progress: 75,
    lessons: "18/24 Lessons",
    color: "bg-blue-100",
    icon: "💻",
  },
  {
    id: 2,
    title: "UI/UX Design Fundamentals",
    instructor: "Meron Tadesse",
    category: "Design",
    progress: 45,
    lessons: "9/20 Lessons",
    color: "bg-purple-100",
    icon: "🎨",
  },
  {
    id: 3,
    title: "Database Management",
    instructor: "Dawit Alemu",
    category: "Technology",
    progress: 30,
    lessons: "6/20 Lessons",
    color: "bg-orange-100",
    icon: "🗄️",
  },
];

const activities = [
  {
    title: "Completed HTML Fundamentals",
    time: "Today, 9:30 AM",
    icon: CheckCircle,
  },
  {
    title: "Started UI/UX Design",
    time: "Yesterday",
    icon: BookOpen,
  },
  {
    title: "Earned a new achievement",
    time: "October 30",
    icon: Award,
  },
];

export default function StudentDashboard() {
  const student = JSON.parse(localStorage.getItem("educonnect_user") || "null");

  const studentName = student?.name || "Student";

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8">
      {/* Top Header */}
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">
            Student Dashboard
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Track your learning and achieve your goals.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button className="rounded-full border bg-white p-3 text-slate-600 hover:bg-slate-100">
            <Bell size={20} />
          </button>

          <div className="flex items-center gap-3 rounded-xl border bg-white p-2 pr-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-100 font-bold text-brand-700">
              {studentName.charAt(0).toUpperCase()}
            </div>

            <div>
              <p className="text-sm font-semibold text-slate-800">
                {studentName}
              </p>
              <p className="text-xs text-slate-500">Student Account</p>
            </div>
          </div>
        </div>
      </div>

      {/* Welcome Banner */}
      <div className="mb-8 overflow-hidden rounded-2xl bg-gradient-to-r from-brand-800 to-brand-600 p-6 text-white md:p-8">
        <div className="flex flex-wrap items-center justify-between gap-6">
          <div>
            <p className="mb-2 text-sm text-blue-100">Welcome back!</p>

            <h2 className="text-2xl font-bold md:text-3xl">
              Hello, {studentName} 👋
            </h2>

            <p className="mt-3 max-w-lg text-sm text-blue-100">
              Keep learning, stay consistent, and take another step toward
              achieving your goals.
            </p>

            <button className="mt-5 flex items-center gap-2 rounded-lg bg-white px-5 py-3 font-semibold text-brand-800 transition hover:bg-blue-50">
              Explore Courses
              <ArrowRight size={18} />
            </button>
          </div>

          <div className="hidden md:block">
            <GraduationCap size={110} strokeWidth={1.2} />
          </div>
        </div>
      </div>

      {/* Statistics */}
      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          {
            title: "Enrolled Courses",
            value: "06",
            icon: BookOpen,
            color: "text-blue-600",
            bg: "bg-blue-50",
          },
          {
            title: "Completed Lessons",
            value: "32",
            icon: CheckCircle,
            color: "text-green-600",
            bg: "bg-green-50",
          },
          {
            title: "Learning Hours",
            value: "48h",
            icon: Clock,
            color: "text-purple-600",
            bg: "bg-purple-50",
          },
          {
            title: "Certificates",
            value: "03",
            icon: Award,
            color: "text-orange-600",
            bg: "bg-orange-50",
          },
        ].map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.title}
              className="rounded-xl border border-slate-100 bg-white p-5 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-500">{stat.title}</p>

                  <h3 className="mt-2 text-3xl font-bold text-slate-800">
                    {stat.value}
                  </h3>
                </div>

                <div className={`rounded-xl p-3 ${stat.bg}`}>
                  <Icon className={stat.color} size={24} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        {/* Courses */}
        <div className="space-y-6 xl:col-span-2">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-slate-800">My Courses</h2>

              <p className="mt-1 text-sm text-slate-500">
                Continue where you left off.
              </p>
            </div>

            <button className="flex items-center gap-1 text-sm font-semibold text-brand-600 hover:underline">
              View All <ArrowRight size={16} />
            </button>
          </div>

          {courses.map((course) => (
            <div
              key={course.id}
              className="rounded-xl border border-slate-100 bg-white p-5 shadow-sm transition hover:shadow-md"
            >
              <div className="flex flex-wrap items-center gap-4">
                <div
                  className={`flex h-16 w-16 items-center justify-center rounded-xl text-3xl ${course.color}`}
                >
                  {course.icon}
                </div>

                <div className="min-w-0 flex-1">
                  <span className="text-xs font-semibold text-brand-600">
                    {course.category}
                  </span>

                  <h3 className="mt-1 font-bold text-slate-800">
                    {course.title}
                  </h3>

                  <p className="mt-1 text-sm text-slate-500">
                    Instructor: {course.instructor}
                  </p>
                </div>

                <button className="flex items-center gap-2 rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-700">
                  <Play size={16} />
                  Continue
                </button>
              </div>

              <div className="mt-5">
                <div className="mb-2 flex justify-between text-sm">
                  <span className="text-slate-500">Course Progress</span>

                  <span className="font-semibold text-slate-700">
                    {course.progress}%
                  </span>
                </div>

                <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                  <div
                    className="h-full rounded-full bg-brand-600"
                    style={{ width: `${course.progress}%` }}
                  />
                </div>

                <p className="mt-2 text-xs text-slate-400">{course.lessons}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Right Sidebar Content */}
        <div className="space-y-6">
          {/* Learning Progress */}
          <div className="rounded-xl border border-slate-100 bg-white p-5 shadow-sm">
            <h2 className="font-bold text-slate-800">Learning Progress</h2>

            <div className="my-6 flex justify-center">
              <div
                className="relative flex h-36 w-36 items-center justify-center rounded-full"
                style={{
                  background:
                    "conic-gradient(#2563eb 0% 68%, #e2e8f0 68% 100%)",
                }}
              >
                <div className="flex h-28 w-28 items-center justify-center rounded-full bg-white">
                  <div className="text-center">
                    <p className="text-3xl font-bold text-slate-800">68%</p>
                    <p className="text-xs text-slate-500">Completed</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-500">Weekly learning goal</span>

              <span className="font-bold text-brand-600">8 / 12 hrs</span>
            </div>

            <div className="mt-3 h-2 rounded-full bg-slate-100">
              <div className="h-full w-2/3 rounded-full bg-brand-600" />
            </div>

            <p className="mt-4 flex items-center gap-2 text-xs text-green-600">
              <TrendingUp size={15} />
              Keep up your learning progress!
            </p>
          </div>

          {/* Upcoming Classes */}
          <div className="rounded-xl border border-slate-100 bg-white p-5 shadow-sm">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="font-bold text-slate-800">Upcoming Classes</h2>

              <CalendarDays className="text-brand-600" size={20} />
            </div>

            <div className="space-y-4">
              <div className="rounded-lg bg-blue-50 p-4">
                <p className="text-xs font-semibold text-blue-600">
                  TODAY · 10:00 AM
                </p>

                <h3 className="mt-2 font-semibold text-slate-800">
                  React Fundamentals
                </h3>

                <p className="mt-1 text-xs text-slate-500">
                  Instructor: Abebe Kebede
                </p>
              </div>

              <div className="rounded-lg bg-purple-50 p-4">
                <p className="text-xs font-semibold text-purple-600">
                  TOMORROW · 2:00 PM
                </p>

                <h3 className="mt-2 font-semibold text-slate-800">
                  UI/UX Design
                </h3>

                <p className="mt-1 text-xs text-slate-500">
                  Instructor: Meron Tadesse
                </p>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="rounded-xl border border-slate-100 bg-white p-5 shadow-sm">
            <h2 className="mb-5 font-bold text-slate-800">Recent Activity</h2>

            <div className="space-y-5">
              {activities.map((activity, index) => {
                const Icon = activity.icon;

                return (
                  <div key={index} className="flex gap-3">
                    <div className="rounded-full bg-green-50 p-2">
                      <Icon size={18} className="text-green-600" />
                    </div>

                    <div>
                      <p className="text-sm font-semibold text-slate-700">
                        {activity.title}
                      </p>

                      <p className="mt-1 text-xs text-slate-400">
                        {activity.time}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-8 border-t border-slate-200 py-5 text-center text-sm text-slate-400">
        © 2026 EduConnect ET. All rights reserved.
      </div>
    </div>
  );
}
