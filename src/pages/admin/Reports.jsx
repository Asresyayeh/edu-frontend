import { useMemo, useState } from "react";
import {
  BarChart3,
  Users,
  BookOpen,
  GraduationCap,
  DollarSign,
  TrendingUp,
  TrendingDown,
  Download,
  CalendarDays,
  ArrowUpRight,
  ArrowDownRight,
  Activity,
  CreditCard,
  CheckCircle,
  Clock,
} from "lucide-react";

const monthlyData = [
  { month: "Jan", enrollments: 45, revenue: 12000 },
  { month: "Feb", enrollments: 62, revenue: 18000 },
  { month: "Mar", enrollments: 55, revenue: 15000 },
  { month: "Apr", enrollments: 78, revenue: 24000 },
  { month: "May", enrollments: 90, revenue: 28000 },
  { month: "Jun", enrollments: 72, revenue: 22000 },
  { month: "Jul", enrollments: 105, revenue: 35000 },
  { month: "Aug", enrollments: 115, revenue: 39000 },
  { month: "Sep", enrollments: 98, revenue: 32000 },
  { month: "Oct", enrollments: 130, revenue: 45000 },
  { month: "Nov", enrollments: 145, revenue: 52000 },
  { month: "Dec", enrollments: 160, revenue: 58000 },
];

const userDistribution = [
  { role: "Students", count: 1250, color: "bg-blue-500" },
  { role: "Tutors", count: 85, color: "bg-purple-500" },
  { role: "Parents", count: 320, color: "bg-amber-500" },
  { role: "Admins", count: 8, color: "bg-green-500" },
];

const popularCourses = [
  {
    id: 1,
    title: "Full Stack Web Development",
    category: "Web Development",
    enrollments: 320,
    revenue: 96000,
    completion: 85,
  },
  {
    id: 2,
    title: "Python Programming",
    category: "Programming",
    enrollments: 275,
    revenue: 68750,
    completion: 78,
  },
  {
    id: 3,
    title: "UI/UX Design",
    category: "Design",
    enrollments: 210,
    revenue: 42000,
    completion: 90,
  },
  {
    id: 4,
    title: "Mathematics",
    category: "Mathematics",
    enrollments: 185,
    revenue: 37000,
    completion: 72,
  },
  {
    id: 5,
    title: "Digital Marketing",
    category: "Business",
    enrollments: 150,
    revenue: 30000,
    completion: 68,
  },
];

const activities = [
  {
    id: 1,
    title: "New student registration",
    description: "Abebe Kebede joined EduConnect ET",
    time: "10 minutes ago",
    icon: Users,
    color: "bg-blue-100 text-blue-600",
  },
  {
    id: 2,
    title: "New course published",
    description: "Full Stack Web Development",
    time: "1 hour ago",
    icon: BookOpen,
    color: "bg-purple-100 text-purple-600",
  },
  {
    id: 3,
    title: "Payment completed",
    description: "ETB 1,500 payment received",
    time: "3 hours ago",
    icon: CreditCard,
    color: "bg-green-100 text-green-600",
  },
  {
    id: 4,
    title: "New enrollment",
    description: "A student enrolled in Python Programming",
    time: "5 hours ago",
    icon: GraduationCap,
    color: "bg-amber-100 text-amber-600",
  },
];

const formatETB = (amount) => `ETB ${Number(amount).toLocaleString("en-US")}`;

function ReportsPage() {
  const [period, setPeriod] = useState("This Year");

  const filteredData = useMemo(() => {
    if (period === "Last 6 Months") return monthlyData.slice(6);
    if (period === "Last 3 Months") return monthlyData.slice(9);
    return monthlyData;
  }, [period]);

  const totalEnrollments = filteredData.reduce(
    (sum, item) => sum + item.enrollments,
    0,
  );

  const totalRevenue = filteredData.reduce(
    (sum, item) => sum + item.revenue,
    0,
  );

  const totalUsers = userDistribution.reduce(
    (sum, item) => sum + item.count,
    0,
  );

  const totalPopularEnrollments = popularCourses.reduce(
    (sum, course) => sum + course.enrollments,
    0,
  );

  const exportCSV = () => {
    const rows = [
      ["EduConnect ET - Reports and Analytics"],
      ["Period", period],
      [],
      ["Month", "Enrollments", "Revenue (ETB)"],
      ...filteredData.map((item) => [
        item.month,
        item.enrollments,
        item.revenue,
      ]),
      [],
      ["Course", "Category", "Enrollments", "Revenue (ETB)", "Completion (%)"],
      ...popularCourses.map((course) => [
        course.title,
        course.category,
        course.enrollments,
        course.revenue,
        course.completion,
      ]),
    ];

    const csv = rows
      .map((row) =>
        row
          .map((cell) => `"${String(cell ?? "").replace(/"/g, '""')}"`)
          .join(","),
      )
      .join("\n");

    const blob = new Blob(["\uFEFF" + csv], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = `educonnect-report-${period.toLowerCase().replaceAll(" ", "-")}.csv`;

    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  };

  const maxEnrollments = Math.max(
    ...filteredData.map((item) => item.enrollments),
  );

  const maxRevenue = Math.max(...filteredData.map((item) => item.revenue));

  return (
    <div className="min-h-screen space-y-6 bg-slate-50 p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <div className="flex items-center gap-2">
            <BarChart3 className="text-blue-600" size={26} />
            <h1 className="text-2xl font-bold text-slate-800">
              Reports & Analytics
            </h1>
          </div>
          <p className="mt-2 text-sm text-slate-500">
            Monitor platform performance and analyze business growth.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3">
            <CalendarDays size={18} className="text-slate-400" />
            <select
              value={period}
              onChange={(e) => setPeriod(e.target.value)}
              className="bg-transparent py-2.5 text-sm font-medium text-slate-700 outline-none"
            >
              <option>This Year</option>
              <option>Last 6 Months</option>
              <option>Last 3 Months</option>
            </select>
          </div>

          <button
            onClick={exportCSV}
            className="flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
          >
            <Download size={18} />
            Export Report
          </button>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          {
            title: "Total Users",
            value: totalUsers.toLocaleString(),
            change: "+12.5%",
            icon: Users,
            color: "bg-blue-100 text-blue-600",
            positive: true,
            description: "Platform users",
          },
          {
            title: "Total Enrollments",
            value: totalEnrollments.toLocaleString(),
            change: "+18.2%",
            icon: GraduationCap,
            color: "bg-purple-100 text-purple-600",
            positive: true,
            description: period,
          },
          {
            title: "Total Revenue",
            value: formatETB(totalRevenue),
            change: "+15.8%",
            icon: DollarSign,
            color: "bg-green-100 text-green-600",
            positive: true,
            description: period,
          },
          {
            title: "Total Courses",
            value: popularCourses.length,
            change: "+8.4%",
            icon: BookOpen,
            color: "bg-amber-100 text-amber-600",
            positive: true,
            description: "Sample course records",
          },
        ].map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.title}
              className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <div className={`rounded-xl p-3 ${stat.color}`}>
                  <Icon size={24} />
                </div>
                <span className="flex items-center gap-1 rounded-full bg-green-50 px-2.5 py-1 text-xs font-semibold text-green-600">
                  <TrendingUp size={13} />
                  {stat.change}
                </span>
              </div>

              <p className="mt-4 text-sm text-slate-500">{stat.title}</p>
              <h2 className="mt-1 break-words text-2xl font-bold text-slate-800">
                {stat.value}
              </h2>
              <p className="mt-2 text-xs text-slate-400">{stat.description}</p>
            </div>
          );
        })}
      </div>

      {/* Enrollment Chart */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm xl:col-span-2">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-lg font-bold text-slate-800">
                Enrollment Overview
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Monthly student enrollment performance
              </p>
            </div>

            <span className="rounded-lg bg-blue-50 px-3 py-2 text-sm font-semibold text-blue-600">
              {totalEnrollments.toLocaleString()} Enrollments
            </span>
          </div>

          <div className="mt-8 flex h-64 items-end gap-2 overflow-x-auto border-b border-slate-100 pb-2 sm:gap-4">
            {filteredData.map((item) => (
              <div
                key={item.month}
                className="flex min-w-0 flex-1 flex-col items-center justify-end gap-2"
              >
                <span className="text-[10px] font-semibold text-slate-500 sm:text-xs">
                  {item.enrollments}
                </span>

                <div
                  className="w-full max-w-12 rounded-t-lg bg-gradient-to-t from-blue-600 to-cyan-400 transition-all hover:opacity-80"
                  style={{
                    height: `${(item.enrollments / maxEnrollments) * 180}px`,
                  }}
                  title={`${item.enrollments} enrollments`}
                />

                <span className="text-xs text-slate-500">{item.month}</span>
              </div>
            ))}
          </div>

          <div className="mt-4 flex items-center gap-2 text-xs text-slate-500">
            <span className="h-3 w-3 rounded-sm bg-blue-500" />
            Monthly enrollments
          </div>
        </div>

        {/* User Distribution */}
        <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
          <h2 className="text-lg font-bold text-slate-800">
            User Distribution
          </h2>
          <p className="mt-1 text-sm text-slate-500">Users by account type</p>

          <div
            className="mx-auto mt-7 flex h-44 w-44 items-center justify-center rounded-full"
            style={{
              background: `conic-gradient(
                #3b82f6 0% 75.2%,
                #a855f7 75.2% 80.3%,
                #f59e0b 80.3% 99.6%,
                #22c55e 99.6% 100%
              )`,
            }}
          >
            <div className="flex h-28 w-28 flex-col items-center justify-center rounded-full bg-white">
              <span className="text-2xl font-bold text-slate-800">
                {totalUsers.toLocaleString()}
              </span>
              <span className="text-xs text-slate-400">Total Users</span>
            </div>
          </div>

          <div className="mt-7 space-y-4">
            {userDistribution.map((item) => (
              <div key={item.role}>
                <div className="mb-2 flex justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <span className={`h-3 w-3 rounded-full ${item.color}`} />
                    <span className="text-slate-600">{item.role}</span>
                  </div>
                  <span className="font-semibold text-slate-800">
                    {item.count.toLocaleString()}
                  </span>
                </div>

                <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                  <div
                    className={`h-full rounded-full ${item.color}`}
                    style={{
                      width: `${(item.count / totalUsers) * 100}%`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Revenue Chart */}
      <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-bold text-slate-800">
              Revenue Analytics
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Monthly revenue generated from course payments
            </p>
          </div>

          <div className="rounded-xl bg-green-50 px-4 py-2">
            <p className="text-xs text-green-600">Total Revenue</p>
            <p className="text-lg font-bold text-green-700">
              {formatETB(totalRevenue)}
            </p>
          </div>
        </div>

        <div className="mt-8 flex h-56 items-end gap-2 overflow-x-auto border-b border-slate-100 pb-2 sm:gap-4">
          {filteredData.map((item) => (
            <div
              key={item.month}
              className="flex min-w-0 flex-1 flex-col items-center justify-end gap-2"
            >
              <span className="text-[10px] font-semibold text-slate-500 sm:text-xs">
                {(item.revenue / 1000).toFixed(0)}k
              </span>

              <div
                className="w-full max-w-12 rounded-t-lg bg-gradient-to-t from-emerald-600 to-green-400 transition-all hover:opacity-80"
                style={{
                  height: `${(item.revenue / maxRevenue) * 150}px`,
                }}
                title={formatETB(item.revenue)}
              />

              <span className="text-xs text-slate-500">{item.month}</span>
            </div>
          ))}
        </div>

        <p className="mt-4 text-xs text-slate-400">
          Revenue values are illustrative sample data.
        </p>
      </div>

      {/* Popular Courses */}
      <div className="rounded-2xl border border-slate-100 bg-white shadow-sm">
        <div className="border-b border-slate-100 p-5">
          <h2 className="text-lg font-bold text-slate-800">
            Course Performance
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Most popular courses based on enrollment
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px] text-left">
            <thead className="bg-slate-50 text-xs uppercase text-slate-500">
              <tr>
                <th className="px-5 py-4">Course</th>
                <th className="px-5 py-4">Category</th>
                <th className="px-5 py-4">Enrollments</th>
                <th className="px-5 py-4">Revenue</th>
                <th className="px-5 py-4">Completion Rate</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {popularCourses.map((course) => (
                <tr key={course.id} className="hover:bg-slate-50">
                  <td className="px-5 py-4">
                    <p className="font-semibold text-slate-800">
                      {course.title}
                    </p>
                  </td>
                  <td className="px-5 py-4 text-sm text-slate-500">
                    {course.category}
                  </td>
                  <td className="px-5 py-4 text-sm font-semibold text-slate-700">
                    {course.enrollments}
                  </td>
                  <td className="px-5 py-4 text-sm font-semibold text-green-600">
                    {formatETB(course.revenue)}
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="h-2 w-24 overflow-hidden rounded-full bg-slate-100">
                        <div
                          className="h-full rounded-full bg-blue-500"
                          style={{ width: `${course.completion}%` }}
                        />
                      </div>
                      <span className="text-xs font-semibold text-slate-600">
                        {course.completion}%
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
        <div className="mb-5 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-800">
              Recent Platform Activity
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Latest activity across the platform
            </p>
          </div>
          <Activity className="text-blue-600" size={23} />
        </div>

        <div className="space-y-5">
          {activities.map((activity, index) => {
            const Icon = activity.icon;

            return (
              <div key={activity.id} className="flex items-start gap-4">
                <div className={`rounded-xl p-3 ${activity.color}`}>
                  <Icon size={20} />
                </div>

                <div className="min-w-0 flex-1">
                  <h3 className="font-semibold text-slate-800">
                    {activity.title}
                  </h3>
                  <p className="mt-1 text-sm text-slate-500">
                    {activity.description}
                  </p>
                  <p className="mt-1 text-xs text-slate-400">{activity.time}</p>
                </div>

                {index === 0 && (
                  <span className="rounded-full bg-blue-50 px-2 py-1 text-xs font-semibold text-blue-600">
                    New
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default ReportsPage;
