import {
  BookOpen,
  Users,
  CalendarDays,
  Wallet,
  ArrowRight,
  Clock,
  Plus,
  Star,
} from "lucide-react";

const statistics = [
  {
    title: "Total Courses",
    value: "06",
    icon: BookOpen,
    color: "bg-blue-100 text-blue-600",
  },
  {
    title: "Total Students",
    value: "124",
    icon: Users,
    color: "bg-green-100 text-green-600",
  },
  {
    title: "Upcoming Classes",
    value: "04",
    icon: CalendarDays,
    color: "bg-orange-100 text-orange-600",
  },
  {
    title: "Total Earnings",
    value: "12,500 ETB",
    icon: Wallet,
    color: "bg-purple-100 text-purple-600",
  },
];

const courses = [
  {
    title: "Full Stack Web Development",
    students: 35,
    lessons: 24,
    rating: 4.8,
  },
  {
    title: "React.js for Beginners",
    students: 28,
    lessons: 18,
    rating: 4.9,
  },
  {
    title: "Python Programming",
    students: 42,
    lessons: 30,
    rating: 4.7,
  },
];

const upcomingClasses = [
  {
    title: "React.js Advanced Concepts",
    time: "10:00 AM",
    students: 18,
    date: "Today",
  },
  {
    title: "Node.js and Express",
    time: "2:00 PM",
    students: 15,
    date: "Today",
  },
  {
    title: "Python Fundamentals",
    time: "9:00 AM",
    students: 22,
    date: "Tomorrow",
  },
];

function TutorDashboard() {
  const user = JSON.parse(localStorage.getItem("educonnect_user") || "null");

  const tutorName = user?.name || "Tutor";

  return (
    <div className="mx-auto max-w-7xl space-y-8">
      {/* Welcome */}
      <section className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 md:text-3xl">
            Welcome back, {tutorName}! 👋
          </h1>

          <p className="mt-2 text-slate-500">
            Here is what's happening with your teaching activities.
          </p>
        </div>

        <button className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700">
          <Plus size={19} />
          Create Course
        </button>
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
              <div className="flex items-center justify-between gap-2">
                <div>
                  <p className="text-sm text-slate-500">{item.title}</p>

                  <h2 className="mt-2 text-2xl font-bold text-slate-800">
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
            <h2 className="text-xl font-bold text-slate-800">My Courses</h2>

            <p className="mt-1 text-sm text-slate-500">
              Manage your published courses.
            </p>
          </div>

          <a
            href="/tutor/courses"
            className="flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-800"
          >
            View all <ArrowRight size={17} />
          </a>
        </div>

        <div className="space-y-5">
          {courses.map((course) => (
            <div
              key={course.title}
              className="flex flex-col justify-between gap-3 rounded-xl border border-slate-100 p-4 sm:flex-row sm:items-center"
            >
              <div>
                <h3 className="font-semibold text-slate-800">{course.title}</h3>

                <p className="mt-2 text-sm text-slate-500">
                  {course.students} Students · {course.lessons} Lessons
                </p>
              </div>

              <div className="flex items-center gap-2 text-sm font-semibold text-orange-500">
                <Star size={17} fill="currentColor" />
                {course.rating}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Upcoming Classes */}
      <section className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
        <div className="mb-6">
          <h2 className="text-xl font-bold text-slate-800">Upcoming Classes</h2>

          <p className="mt-1 text-sm text-slate-500">
            Your next scheduled teaching sessions.
          </p>
        </div>

        <div className="space-y-4">
          {upcomingClasses.map((lesson, index) => (
            <div
              key={index}
              className="flex flex-col justify-between gap-3 rounded-xl bg-slate-50 p-4 sm:flex-row sm:items-center"
            >
              <div>
                <h3 className="font-semibold text-slate-800">{lesson.title}</h3>

                <p className="mt-2 flex items-center gap-2 text-sm text-slate-500">
                  <CalendarDays size={15} />
                  {lesson.date}

                  <Clock size={15} className="ml-2" />
                  {lesson.time}
                </p>

                <p className="mt-2 flex items-center gap-2 text-sm text-slate-500">
                  <Users size={15} />
                  {lesson.students} students
                </p>
              </div>

              <button className="rounded-lg border border-blue-600 px-4 py-2 text-sm font-semibold text-blue-600 transition hover:bg-blue-600 hover:text-white">
                View Class
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default TutorDashboard;
