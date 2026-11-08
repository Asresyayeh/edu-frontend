import { useState } from "react";
import {
  Users,
  BookOpen,
  CalendarDays,
  Award,
  TrendingUp,
  Clock,
  ArrowRight,
  GraduationCap,
} from "lucide-react";

export default function ParentDashboard() {
  const [selectedChild, setSelectedChild] = useState("all");

  const children = [
    {
      id: 1,
      name: "Abel Asres",
      grade: "Grade 9",
      initials: "AA",
    },
    {
      id: 2,
      name: "Sara Asres",
      grade: "Grade 7",
      initials: "SA",
    },
  ];

  const courses = [
    {
      id: 1,
      child: "Abel Asres",
      name: "Mathematics",
      tutor: "Abebe Kebede",
      progress: 85,
      color: "bg-blue-500",
    },
    {
      id: 2,
      child: "Abel Asres",
      name: "Physics",
      tutor: "Meron Tadesse",
      progress: 65,
      color: "bg-purple-500",
    },
    {
      id: 3,
      child: "Sara Asres",
      name: "English Language",
      tutor: "Dawit Alemu",
      progress: 90,
      color: "bg-green-500",
    },
    {
      id: 4,
      child: "Sara Asres",
      name: "Biology",
      tutor: "Helen Bekele",
      progress: 45,
      color: "bg-orange-500",
    },
  ];

  const upcomingLessons = [
    {
      id: 1,
      subject: "Mathematics",
      child: "Abel Asres",
      tutor: "Abebe Kebede",
      date: "Today",
      time: "2:00 PM",
    },
    {
      id: 2,
      subject: "English Language",
      child: "Sara Asres",
      tutor: "Dawit Alemu",
      date: "Tomorrow",
      time: "10:00 AM",
    },
    {
      id: 3,
      subject: "Physics",
      child: "Abel Asres",
      tutor: "Meron Tadesse",
      date: "Wednesday",
      time: "3:00 PM",
    },
  ];

  const activities = [
    {
      id: 1,
      title: "Completed Mathematics lesson",
      child: "Abel Asres",
      time: "2 hours ago",
    },
    {
      id: 2,
      title: "Submitted English assignment",
      child: "Sara Asres",
      time: "Yesterday",
    },
    {
      id: 3,
      title: "Completed Biology quiz",
      child: "Sara Asres",
      time: "Yesterday",
    },
  ];

  const filteredCourses =
    selectedChild === "all"
      ? courses
      : courses.filter((course) => course.child === selectedChild);

  const stats = [
    {
      title: "My Children",
      value: "02",
      icon: Users,
      color: "bg-blue-100 text-blue-600",
    },
    {
      title: "Enrolled Courses",
      value: selectedChild === "all" ? "04" : "02",
      icon: BookOpen,
      color: "bg-purple-100 text-purple-600",
    },
    {
      title: "Upcoming Lessons",
      value: "03",
      icon: CalendarDays,
      color: "bg-orange-100 text-orange-600",
    },
    {
      title: "Completed Courses",
      value: "02",
      icon: Award,
      color: "bg-green-100 text-green-600",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome */}
      <section>
        <h2 className="text-2xl font-bold text-slate-800">
          Welcome back, Parent!
        </h2>

        <p className="mt-2 text-slate-500">
          Keep track of your children's education and learning progress.
        </p>
      </section>

      {/* Statistics */}
      <section className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.title}
              className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-500">{stat.title}</p>

                  <h3 className="mt-2 text-3xl font-bold text-slate-800">
                    {stat.value}
                  </h3>
                </div>

                <div className={`rounded-xl p-3 ${stat.color}`}>
                  <Icon size={25} />
                </div>
              </div>
            </div>
          );
        })}
      </section>

      {/* Children */}
      <section>
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h3 className="text-xl font-bold text-slate-800">My Children</h3>

            <p className="mt-1 text-sm text-slate-500">
              Overview of your children's learning activities.
            </p>
          </div>

          <button className="flex items-center gap-2 font-semibold text-brand-600 hover:underline">
            View All <ArrowRight size={17} />
          </button>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {children.map((child) => (
            <div
              key={child.id}
              className="flex items-center justify-between rounded-2xl border border-slate-100 bg-white p-5 shadow-sm"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-100 text-lg font-bold text-brand-700">
                  {child.initials}
                </div>

                <div>
                  <h4 className="font-bold text-slate-800">{child.name}</h4>

                  <p className="mt-1 text-sm text-slate-500">{child.grade}</p>
                </div>
              </div>

              <button
                onClick={() => setSelectedChild(child.name)}
                className="rounded-lg bg-brand-50 px-4 py-2 text-sm font-semibold text-brand-700 hover:bg-brand-100"
              >
                View Progress
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Course Progress */}
      <section className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h3 className="text-xl font-bold text-slate-800">
              Learning Progress
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              Track course completion for each child.
            </p>
          </div>

          <select
            value={selectedChild}
            onChange={(e) => setSelectedChild(e.target.value)}
            className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm outline-none focus:border-brand-600"
          >
            <option value="all">All Children</option>

            {children.map((child) => (
              <option key={child.id} value={child.name}>
                {child.name}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-6">
          {filteredCourses.map((course) => (
            <div key={course.id}>
              <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                <div>
                  <h4 className="font-semibold text-slate-800">
                    {course.name}
                  </h4>

                  <p className="text-sm text-slate-500">
                    {course.child} · Tutor: {course.tutor}
                  </p>
                </div>

                <span className="font-semibold text-slate-700">
                  {course.progress}%
                </span>
              </div>

              <div className="h-2.5 overflow-hidden rounded-full bg-slate-100">
                <div
                  className={`h-full rounded-full ${course.color}`}
                  style={{ width: `${course.progress}%` }}
                />
              </div>
            </div>
          ))}

          {filteredCourses.length === 0 && (
            <p className="text-sm text-slate-500">
              No courses found for this child.
            </p>
          )}
        </div>
      </section>

      {/* Upcoming Lessons and Activity */}
      <section className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        {/* Upcoming Lessons */}
        <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
          <div className="mb-6 flex items-center justify-between">
            <h3 className="text-xl font-bold text-slate-800">
              Upcoming Lessons
            </h3>

            <CalendarDays className="text-brand-600" />
          </div>

          <div className="space-y-5">
            {upcomingLessons.map((lesson) => (
              <div
                key={lesson.id}
                className="flex gap-4 border-b border-slate-100 pb-4 last:border-0 last:pb-0"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                  <BookOpen size={22} />
                </div>

                <div className="flex-1">
                  <h4 className="font-semibold text-slate-800">
                    {lesson.subject}
                  </h4>

                  <p className="text-sm text-slate-500">
                    {lesson.child} · {lesson.tutor}
                  </p>

                  <p className="mt-2 flex items-center gap-2 text-xs text-slate-500">
                    <Clock size={14} />
                    {lesson.date} · {lesson.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
          <div className="mb-6 flex items-center justify-between">
            <h3 className="text-xl font-bold text-slate-800">
              Recent Activity
            </h3>

            <TrendingUp className="text-green-600" />
          </div>

          <div className="space-y-5">
            {activities.map((activity) => (
              <div
                key={activity.id}
                className="flex gap-4 border-b border-slate-100 pb-4 last:border-0 last:pb-0"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-green-50 text-green-600">
                  <GraduationCap size={22} />
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-slate-800">
                    {activity.title}
                  </h4>

                  <p className="mt-1 text-sm text-slate-500">
                    {activity.child}
                  </p>

                  <p className="mt-1 text-xs text-slate-400">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
