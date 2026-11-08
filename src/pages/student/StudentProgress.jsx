import { useState } from "react";
import {
  TrendingUp,
  BookOpen,
  Clock,
  Award,
  Target,
  CheckCircle,
  Flame,
  CalendarDays,
  Trophy,
  Star,
  BarChart3,
} from "lucide-react";

const courses = [
  {
    id: 1,
    title: "Full Stack Web Development",
    tutor: "Abebe Kebede",
    progress: 75,
    completed: 24,
    total: 32,
    color: "bg-blue-600",
    light: "bg-blue-100",
  },
  {
    id: 2,
    title: "UI/UX Design Fundamentals",
    tutor: "Meron Tadesse",
    progress: 45,
    completed: 11,
    total: 24,
    color: "bg-purple-600",
    light: "bg-purple-100",
  },
  {
    id: 3,
    title: "Python Programming",
    tutor: "Dawit Alemu",
    progress: 30,
    completed: 9,
    total: 30,
    color: "bg-green-600",
    light: "bg-green-100",
  },
  {
    id: 4,
    title: "Database Management",
    tutor: "Helen Bekele",
    progress: 100,
    completed: 20,
    total: 20,
    color: "bg-orange-500",
    light: "bg-orange-100",
  },
];

const weeklyActivity = [
  { day: "Mon", hours: 2 },
  { day: "Tue", hours: 3 },
  { day: "Wed", hours: 1.5 },
  { day: "Thu", hours: 4 },
  { day: "Fri", hours: 2.5 },
  { day: "Sat", hours: 3.5 },
  { day: "Sun", hours: 1 },
];

const achievements = [
  {
    title: "First Course Completed",
    description: "Completed your first online course.",
    icon: Trophy,
    color: "text-yellow-600",
    bg: "bg-yellow-100",
    unlocked: true,
  },
  {
    title: "7-Day Learning Streak",
    description: "Learned for seven consecutive days.",
    icon: Flame,
    color: "text-orange-600",
    bg: "bg-orange-100",
    unlocked: true,
  },
  {
    title: "Fast Learner",
    description: "Completed 10 lessons successfully.",
    icon: Target,
    color: "text-blue-600",
    bg: "bg-blue-100",
    unlocked: true,
  },
  {
    title: "Perfect Attendance",
    description: "Attended 20 scheduled lessons.",
    icon: Star,
    color: "text-purple-600",
    bg: "bg-purple-100",
    unlocked: false,
  },
];

export default function StudentProgress() {
  const [period, setPeriod] = useState("This Week");

  const totalLessons = courses.reduce((sum, course) => sum + course.total, 0);

  const completedLessons = courses.reduce(
    (sum, course) => sum + course.completed,
    0,
  );

  const overallProgress = Math.round((completedLessons / totalLessons) * 100);

  const totalHours = weeklyActivity.reduce((sum, day) => sum + day.hours, 0);

  const stats = [
    {
      title: "Overall Progress",
      value: `${overallProgress}%`,
      subtitle: "Across all courses",
      icon: TrendingUp,
      color: "text-blue-600",
      bg: "bg-blue-100",
    },
    {
      title: "Completed Lessons",
      value: completedLessons,
      subtitle: `Out of ${totalLessons} lessons`,
      icon: CheckCircle,
      color: "text-green-600",
      bg: "bg-green-100",
    },
    {
      title: "Learning Hours",
      value: "24",
      subtitle: "Total learning time",
      icon: Clock,
      color: "text-purple-600",
      bg: "bg-purple-100",
    },
    {
      title: "Achievements",
      value: achievements.filter((item) => item.unlocked).length,
      subtitle: "Badges unlocked",
      icon: Award,
      color: "text-orange-600",
      bg: "bg-orange-100",
    },
  ];

  return (
    <div className="space-y-7">
      {/* Heading */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">
            My Learning Progress
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Track your performance and celebrate your learning achievements.
          </p>
        </div>

        <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2">
          <CalendarDays size={18} className="text-slate-500" />
          <select
            value={period}
            onChange={(e) => setPeriod(e.target.value)}
            className="bg-transparent text-sm font-medium text-slate-700 outline-none"
          >
            <option>This Week</option>
            <option>This Month</option>
            <option>This Year</option>
          </select>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.title}
              className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <div className={`rounded-xl p-3 ${stat.bg}`}>
                  <Icon size={22} className={stat.color} />
                </div>
                <TrendingUp size={18} className="text-green-500" />
              </div>

              <h3 className="mt-5 text-sm text-slate-500">{stat.title}</h3>
              <p className="mt-1 text-2xl font-bold text-slate-800">
                {stat.value}
              </p>
              <p className="mt-1 text-xs text-slate-400">{stat.subtitle}</p>
            </div>
          );
        })}
      </div>

      {/* Overall Progress and Activity */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <div className="rounded-2xl border border-slate-100 bg-white p-6 xl:col-span-1">
          <h2 className="font-bold text-slate-800">Overall Completion</h2>
          <p className="mt-1 text-sm text-slate-500">
            Your progress across enrolled courses.
          </p>

          <div className="flex justify-center py-8">
            <div
              className="relative flex h-48 w-48 items-center justify-center rounded-full"
              style={{
                background: `conic-gradient(#2563eb ${overallProgress}%, #e2e8f0 0)`,
              }}
            >
              <div className="flex h-36 w-36 flex-col items-center justify-center rounded-full bg-white">
                <span className="text-4xl font-bold text-slate-800">
                  {overallProgress}%
                </span>
                <span className="mt-1 text-xs text-slate-500">Completed</span>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between border-t border-slate-100 pt-4 text-sm">
            <span className="text-slate-500">Completed lessons</span>
            <span className="font-semibold text-slate-800">
              {completedLessons}
            </span>
          </div>
          <div className="mt-3 flex items-center justify-between text-sm">
            <span className="text-slate-500">Remaining lessons</span>
            <span className="font-semibold text-slate-800">
              {totalLessons - completedLessons}
            </span>
          </div>
        </div>

        {/* Weekly Activity */}
        <div className="rounded-2xl border border-slate-100 bg-white p-6 xl:col-span-2">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="font-bold text-slate-800">
                Weekly Learning Activity
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Time spent learning each day.
              </p>
            </div>
            <span className="rounded-lg bg-blue-50 px-3 py-2 text-sm font-semibold text-blue-600">
              {totalHours} hours
            </span>
          </div>

          <div className="mt-8 flex h-52 items-end justify-around gap-3">
            {weeklyActivity.map((day) => (
              <div
                key={day.day}
                className="flex h-full flex-1 flex-col items-center justify-end gap-3"
              >
                <span className="text-xs font-medium text-slate-500">
                  {day.hours}h
                </span>

                <div className="flex h-36 w-full max-w-12 items-end overflow-hidden rounded-t-lg bg-slate-100">
                  <div
                    className="w-full rounded-t-lg bg-blue-600 transition-all"
                    style={{ height: `${(day.hours / 5) * 100}%` }}
                  />
                </div>

                <span className="text-xs text-slate-500">{day.day}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Course Progress */}
      <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="font-bold text-slate-800">Course Progress</h2>
            <p className="mt-1 text-sm text-slate-500">
              Monitor your progress in each enrolled course.
            </p>
          </div>
          <BookOpen className="text-blue-600" size={23} />
        </div>

        <div className="space-y-6">
          {courses.map((course) => (
            <div key={course.id}>
              <div className="mb-2 flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
                <div>
                  <h3 className="text-sm font-semibold text-slate-800">
                    {course.title}
                  </h3>
                  <p className="mt-1 text-xs text-slate-500">
                    Tutor: {course.tutor}
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-xs text-slate-500">
                    {course.completed}/{course.total} lessons
                  </span>
                  <span className="text-sm font-bold text-slate-700">
                    {course.progress}%
                  </span>
                </div>
              </div>

              <div className="h-2.5 overflow-hidden rounded-full bg-slate-100">
                <div
                  className={`h-full rounded-full transition-all ${course.color}`}
                  style={{ width: `${course.progress}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Achievements */}
      <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
        <div className="mb-6">
          <h2 className="font-bold text-slate-800">My Achievements</h2>
          <p className="mt-1 text-sm text-slate-500">
            Rewards you have earned through your learning journey.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {achievements.map((achievement) => {
            const Icon = achievement.icon;

            return (
              <div
                key={achievement.title}
                className={`rounded-xl border p-4 ${
                  achievement.unlocked
                    ? "border-slate-100 bg-white"
                    : "border-dashed border-slate-200 bg-slate-50 opacity-60"
                }`}
              >
                <div
                  className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl ${achievement.bg}`}
                >
                  <Icon size={24} className={achievement.color} />
                </div>

                <h3 className="text-sm font-bold text-slate-800">
                  {achievement.title}
                </h3>
                <p className="mt-2 text-xs leading-5 text-slate-500">
                  {achievement.description}
                </p>

                <div className="mt-4">
                  {achievement.unlocked ? (
                    <span className="text-xs font-semibold text-green-600">
                      ✓ Unlocked
                    </span>
                  ) : (
                    <span className="text-xs font-semibold text-slate-400">
                      Locked
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
