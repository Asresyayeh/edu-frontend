import { useMemo, useState } from "react";
import {
  TrendingUp,
  TrendingDown,
  BookOpen,
  Clock,
  Award,
  Target,
  Search,
  ChevronDown,
  CheckCircle,
  CalendarDays,
  GraduationCap,
  Star,
  Activity,
} from "lucide-react";

const initialProgress = [
  {
    id: 1,
    child: "Abel Asres",
    grade: "Grade 9",
    course: "Mathematics",
    tutor: "Abebe Kebede",
    progress: 85,
    completedLessons: 17,
    totalLessons: 20,
    score: 92,
    hours: 24,
    trend: 8,
    color: "bg-blue-500",
    light: "bg-blue-50",
    text: "text-blue-600",
    lastActivity: "Today",
  },
  {
    id: 2,
    child: "Abel Asres",
    grade: "Grade 9",
    course: "Physics",
    tutor: "Meron Tadesse",
    progress: 65,
    completedLessons: 13,
    totalLessons: 20,
    score: 78,
    hours: 18,
    trend: 5,
    color: "bg-purple-500",
    light: "bg-purple-50",
    text: "text-purple-600",
    lastActivity: "Yesterday",
  },
  {
    id: 3,
    child: "Sara Asres",
    grade: "Grade 7",
    course: "English Language",
    tutor: "Hana Mohammed",
    progress: 90,
    completedLessons: 18,
    totalLessons: 20,
    score: 95,
    hours: 21,
    trend: 12,
    color: "bg-emerald-500",
    light: "bg-emerald-50",
    text: "text-emerald-600",
    lastActivity: "Today",
  },
  {
    id: 4,
    child: "Sara Asres",
    grade: "Grade 7",
    course: "Biology",
    tutor: "Dawit Alemu",
    progress: 45,
    completedLessons: 9,
    totalLessons: 20,
    score: 68,
    hours: 12,
    trend: -2,
    color: "bg-orange-500",
    light: "bg-orange-50",
    text: "text-orange-600",
    lastActivity: "2 days ago",
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
    title: "Consistent Learner",
    description: "Completed learning activities 5 days in a row",
    icon: Star,
    color: "text-yellow-600",
    bg: "bg-yellow-50",
    child: "Abel Asres",
  },
  {
    title: "Top Performer",
    description: "Scored above 90% in an assessment",
    icon: Award,
    color: "text-purple-600",
    bg: "bg-purple-50",
    child: "Sara Asres",
  },
  {
    title: "Course Progress",
    description: "Completed 80% of a course",
    icon: Target,
    color: "text-emerald-600",
    bg: "bg-emerald-50",
    child: "Abel Asres",
  },
];

export default function ParentProgress() {
  const [selectedChild, setSelectedChild] = useState("All Children");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredProgress = useMemo(() => {
    return initialProgress.filter((item) => {
      const matchesChild =
        selectedChild === "All Children" || item.child === selectedChild;

      const matchesSearch =
        item.course.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.tutor.toLowerCase().includes(searchTerm.toLowerCase());

      return matchesChild && matchesSearch;
    });
  }, [selectedChild, searchTerm]);

  const averageProgress = filteredProgress.length
    ? Math.round(
        filteredProgress.reduce((sum, item) => sum + item.progress, 0) /
          filteredProgress.length,
      )
    : 0;

  const averageScore = filteredProgress.length
    ? Math.round(
        filteredProgress.reduce((sum, item) => sum + item.score, 0) /
          filteredProgress.length,
      )
    : 0;

  const totalHours = filteredProgress.reduce(
    (sum, item) => sum + item.hours,
    0,
  );

  const completedLessons = filteredProgress.reduce(
    (sum, item) => sum + item.completedLessons,
    0,
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Learning Progress
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Track your children's academic performance and learning journey.
          </p>
        </div>

        <div className="relative">
          <select
            value={selectedChild}
            onChange={(e) => setSelectedChild(e.target.value)}
            className="w-full appearance-none rounded-xl border border-gray-200 bg-white py-3 pl-4 pr-10 text-sm font-medium text-gray-700 outline-none focus:border-brand-600 sm:w-48"
          >
            <option>All Children</option>
            <option>Abel Asres</option>
            <option>Sara Asres</option>
          </select>
          <ChevronDown
            size={16}
            className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
          />
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Average Progress"
          value={`${averageProgress}%`}
          subtitle="Overall course completion"
          icon={TrendingUp}
          color="text-blue-600"
          bg="bg-blue-50"
        />
        <StatCard
          title="Average Score"
          value={`${averageScore}%`}
          subtitle="Across all assessments"
          icon={Award}
          color="text-purple-600"
          bg="bg-purple-50"
        />
        <StatCard
          title="Learning Hours"
          value={`${totalHours}h`}
          subtitle="Total recorded learning time"
          icon={Clock}
          color="text-emerald-600"
          bg="bg-emerald-50"
        />
        <StatCard
          title="Lessons Completed"
          value={completedLessons}
          subtitle="Successfully completed lessons"
          icon={BookOpen}
          color="text-orange-600"
          bg="bg-orange-50"
        />
      </div>

      {/* Course Progress */}
      <section className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-6">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-lg font-bold text-gray-900">
              Course Performance
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Progress and assessment scores for each course.
            </p>
          </div>

          <div className="relative">
            <Search
              size={17}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              placeholder="Search courses..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-xl border border-gray-200 py-2.5 pl-10 pr-4 text-sm outline-none focus:border-brand-600 sm:w-56"
            />
          </div>
        </div>

        <div className="space-y-6">
          {filteredProgress.map((course) => (
            <div
              key={course.id}
              className="rounded-xl border border-gray-100 p-4 transition hover:border-gray-200"
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-xl ${course.light} ${course.text}`}
                  >
                    <BookOpen size={22} />
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-900">
                      {course.course}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {course.child} · {course.grade}
                    </p>
                    <p className="mt-1 text-xs text-gray-400">
                      Tutor: {course.tutor}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-5">
                  <div>
                    <p className="text-xs text-gray-400">Score</p>
                    <p className="font-bold text-gray-900">{course.score}%</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">Study hours</p>
                    <p className="font-bold text-gray-900">{course.hours}h</p>
                  </div>
                  <div
                    className={`flex items-center gap-1 text-sm font-semibold ${
                      course.trend >= 0 ? "text-emerald-600" : "text-red-500"
                    }`}
                  >
                    {course.trend >= 0 ? (
                      <TrendingUp size={16} />
                    ) : (
                      <TrendingDown size={16} />
                    )}
                    {Math.abs(course.trend)}%
                  </div>
                </div>
              </div>

              <div className="mt-5">
                <div className="mb-2 flex justify-between text-sm">
                  <span className="text-gray-500">Course completion</span>
                  <span className="font-semibold text-gray-800">
                    {course.progress}%
                  </span>
                </div>

                <div className="h-2.5 overflow-hidden rounded-full bg-gray-100">
                  <div
                    className={`h-full rounded-full transition-all ${course.color}`}
                    style={{ width: `${course.progress}%` }}
                  />
                </div>

                <div className="mt-2 flex flex-wrap items-center justify-between gap-2 text-xs text-gray-400">
                  <span>
                    {course.completedLessons} of {course.totalLessons} lessons
                    completed
                  </span>
                  <span>Last activity: {course.lastActivity}</span>
                </div>
              </div>
            </div>
          ))}

          {filteredProgress.length === 0 && (
            <div className="py-12 text-center">
              <BookOpen className="mx-auto mb-3 text-gray-300" size={36} />
              <p className="font-medium text-gray-700">No courses found</p>
              <p className="mt-1 text-sm text-gray-400">
                Try changing your search or child filter.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Weekly Activity */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <section className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-6 xl:col-span-2">
          <div className="mb-6">
            <h2 className="text-lg font-bold text-gray-900">
              Weekly Learning Activity
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Sample learning hours recorded throughout the week.
            </p>
          </div>

          <div className="flex h-52 items-end justify-between gap-3">
            {weeklyActivity.map((item) => (
              <div
                key={item.day}
                className="flex flex-1 flex-col items-center gap-2"
              >
                <span className="text-xs font-medium text-gray-500">
                  {item.hours}h
                </span>
                <div className="flex h-36 w-full items-end justify-center rounded-t-lg bg-gray-50">
                  <div
                    className="w-full max-w-10 rounded-t-lg bg-brand-600 transition-all"
                    style={{ height: `${(item.hours / 5) * 100}%` }}
                  />
                </div>
                <span className="text-xs text-gray-500">{item.day}</span>
              </div>
            ))}
          </div>

          <div className="mt-5 flex items-center gap-2 rounded-xl bg-blue-50 p-3 text-sm text-blue-700">
            <Activity size={18} />
            <span>Learning activity is based on demo data for this week.</span>
          </div>
        </section>

        {/* Learning Summary */}
        <section className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-6">
          <h2 className="text-lg font-bold text-gray-900">Learning Summary</h2>
          <p className="mt-1 text-sm text-gray-500">
            Current academic overview
          </p>

          <div className="mt-6 space-y-5">
            <SummaryItem
              icon={GraduationCap}
              label="Active Courses"
              value={filteredProgress.length}
            />
            <SummaryItem
              icon={CheckCircle}
              label="Completed Lessons"
              value={completedLessons}
            />
            <SummaryItem
              icon={CalendarDays}
              label="Learning Hours"
              value={`${totalHours} hours`}
            />
            <SummaryItem
              icon={Award}
              label="Average Score"
              value={`${averageScore}%`}
            />
          </div>
        </section>
      </div>

      {/* Achievements */}
      <section className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-6">
        <div className="mb-5">
          <h2 className="text-lg font-bold text-gray-900">
            Achievements & Milestones
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Recognizing your children's learning accomplishments.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {achievements
            .filter(
              (item) =>
                selectedChild === "All Children" ||
                item.child === selectedChild,
            )
            .map((item, index) => {
              const Icon = item.icon;

              return (
                <div
                  key={index}
                  className="flex items-start gap-4 rounded-xl border border-gray-100 p-4"
                >
                  <div
                    className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${item.bg} ${item.color}`}
                  >
                    <Icon size={22} />
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-900">
                      {item.title}
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                      {item.description}
                    </p>
                    <p className="mt-2 text-xs font-medium text-brand-600">
                      {item.child}
                    </p>
                  </div>
                </div>
              );
            })}
        </div>
      </section>
    </div>
  );
}

function StatCard({ title, value, subtitle, icon: Icon, color, bg }) {
  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <h3 className="mt-2 text-2xl font-bold text-gray-900">{value}</h3>
        </div>

        <div
          className={`flex h-12 w-12 items-center justify-center rounded-xl ${bg} ${color}`}
        >
          <Icon size={23} />
        </div>
      </div>
      <p className="mt-3 text-xs text-gray-400">{subtitle}</p>
    </div>
  );
}

function SummaryItem({ icon: Icon, label, value }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-50 text-brand-600">
          <Icon size={19} />
        </div>
        <span className="text-sm text-gray-600">{label}</span>
      </div>
      <span className="font-bold text-gray-900">{value}</span>
    </div>
  );
}
