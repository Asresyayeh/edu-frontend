import {
  BookOpen,
  CalendarDays,
  Award,
  Clock,
  ArrowRight,
  PlayCircle,
} from "lucide-react";

const statistics = [
  {
    title: "Enrolled Courses",
    value: "05",
    icon: BookOpen,
    color: "bg-blue-100 text-blue-600",
  },
  {
    title: "Completed Courses",
    value: "02",
    icon: Award,
    color: "bg-green-100 text-green-600",
  },
  {
    title: "Upcoming Lessons",
    value: "03",
    icon: CalendarDays,
    color: "bg-orange-100 text-orange-600",
  },
  {
    title: "Learning Hours",
    value: "24",
    icon: Clock,
    color: "bg-purple-100 text-purple-600",
  },
];

const courses = [
  {
    title: "Full Stack Web Development",
    tutor: "Abebe Kebede",
    progress: 75,
    color: "bg-blue-600",
  },
  {
    title: "UI/UX Design Fundamentals",
    tutor: "Meron Tadesse",
    progress: 45,
    color: "bg-purple-600",
  },
  {
    title: "Python Programming",
    tutor: "Dawit Alemu",
    progress: 30,
    color: "bg-orange-500",
  },
];

function StudentDashboard() {
  return (
    <div className="mx-auto max-w-7xl space-y-8">
      {/* Welcome */}
      <section>
        <h1 className="text-2xl font-bold text-slate-800 md:text-3xl">
          Welcome back, Student! 👋
        </h1>
        <p className="mt-2 text-slate-500">
          Continue your learning journey with EduConnect ET.
        </p>
      </section>

      {/* Statistics */}
      <section className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {statistics.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.title}
              className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-500">{item.title}</p>
                  <h2 className="mt-2 text-3xl font-bold text-slate-800">
                    {item.value}
                  </h2>
                </div>

                <div className={`rounded-xl p-3 ${item.color}`}>
                  <Icon size={25} />
                </div>
              </div>
            </div>
          );
        })}
      </section>

      {/* Courses */}
      <section className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-slate-800">My Learning</h2>
            <p className="mt-1 text-sm text-slate-500">
              Continue where you left off.
            </p>
          </div>

          <a
            href="/student/courses"
            className="flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-800"
          >
            View all <ArrowRight size={17} />
          </a>
        </div>

        <div className="space-y-6">
          {courses.map((course) => (
            <div key={course.title}>
              <div className="mb-2 flex flex-col justify-between gap-2 sm:flex-row">
                <div>
                  <h3 className="font-semibold text-slate-800">
                    {course.title}
                  </h3>
                  <p className="mt-1 text-sm text-slate-400">
                    Tutor: {course.tutor}
                  </p>
                </div>

                <span className="text-sm font-semibold text-slate-600">
                  {course.progress}%
                </span>
              </div>

              <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                <div
                  className={`h-full rounded-full ${course.color}`}
                  style={{ width: `${course.progress}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Upcoming Lesson */}
      <section className="rounded-2xl bg-gradient-to-r from-blue-700 to-indigo-600 p-6 text-white shadow-lg">
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
          <div>
            <p className="text-sm text-blue-100">Your next lesson</p>
            <h2 className="mt-2 text-xl font-bold">
              React.js Advanced Concepts
            </h2>
            <p className="mt-2 text-sm text-blue-100">
              Today • 2:00 PM • With Abebe Kebede
            </p>
          </div>

          <button className="flex items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 font-semibold text-blue-700 hover:bg-blue-50">
            <PlayCircle size={19} />
            Join Lesson
          </button>
        </div>
      </section>
    </div>
  );
}

export default StudentDashboard;
