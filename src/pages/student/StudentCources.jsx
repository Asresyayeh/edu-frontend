import { useMemo, useState } from "react";
import {
  BookOpen,
  Search,
  Clock,
  Users,
  PlayCircle,
  CheckCircle,
  Filter,
  ArrowRight,
} from "lucide-react";

export default function StudentCourses() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const courses = [
    {
      id: 1,
      title: "Full Stack Web Development",
      category: "Programming",
      tutor: "Abebe Kebede",
      lessons: 32,
      duration: "12 weeks",
      progress: 75,
      students: 120,
      image:
        "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800",
      status: "In Progress",
    },
    {
      id: 2,
      title: "UI/UX Design Fundamentals",
      category: "Design",
      tutor: "Meron Tadesse",
      lessons: 24,
      duration: "8 weeks",
      progress: 45,
      students: 85,
      image:
        "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=800",
      status: "In Progress",
    },
    {
      id: 3,
      title: "Python Programming",
      category: "Programming",
      tutor: "Dawit Alemu",
      lessons: 28,
      duration: "10 weeks",
      progress: 30,
      students: 150,
      image:
        "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=800",
      status: "In Progress",
    },
    {
      id: 4,
      title: "Database Management",
      category: "Computer Science",
      tutor: "Helen Bekele",
      lessons: 20,
      duration: "6 weeks",
      progress: 100,
      students: 95,
      image: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=800",
      status: "Completed",
    },
    {
      id: 5,
      title: "Digital Marketing",
      category: "Marketing",
      tutor: "Samuel Tesfaye",
      lessons: 18,
      duration: "5 weeks",
      progress: 0,
      students: 75,
      image:
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800",
      status: "Not Started",
    },
  ];

  const filteredCourses = useMemo(() => {
    return courses.filter((course) => {
      const matchesSearch =
        course.title.toLowerCase().includes(search.toLowerCase()) ||
        course.tutor.toLowerCase().includes(search.toLowerCase()) ||
        course.category.toLowerCase().includes(search.toLowerCase());

      const matchesFilter = filter === "All" || course.status === filter;

      return matchesSearch && matchesFilter;
    });
  }, [search, filter]);

  const totalCourses = courses.length;
  const completedCourses = courses.filter(
    (course) => course.status === "Completed",
  ).length;
  const inProgressCourses = courses.filter(
    (course) => course.status === "In Progress",
  ).length;

  return (
    <div className="space-y-8">
      {/* Page Heading */}
      <div>
        <h1 className="text-2xl font-bold text-slate-800">My Courses</h1>
        <p className="mt-2 text-slate-500">
          Manage your enrolled courses and track your learning progress.
        </p>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
        <StatCard
          title="Total Courses"
          value={totalCourses}
          icon={BookOpen}
          color="bg-blue-100 text-blue-600"
        />
        <StatCard
          title="In Progress"
          value={inProgressCourses}
          icon={Clock}
          color="bg-orange-100 text-orange-600"
        />
        <StatCard
          title="Completed"
          value={completedCourses}
          icon={CheckCircle}
          color="bg-green-100 text-green-600"
        />
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col justify-between gap-4 rounded-2xl border border-slate-100 bg-white p-5 shadow-sm md:flex-row">
        <div className="flex items-center gap-3 rounded-xl border border-slate-200 px-4 py-3 md:w-96">
          <Search size={20} className="text-slate-400" />
          <input
            type="text"
            placeholder="Search courses or tutors..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full text-sm outline-none"
          />
        </div>

        <div className="flex items-center gap-3">
          <Filter size={19} className="text-slate-500" />
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-500"
          >
            <option value="All">All Courses</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
            <option value="Not Started">Not Started</option>
          </select>
        </div>
      </div>

      {/* Courses Grid */}
      <div>
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-800">Enrolled Courses</h2>
          <span className="text-sm text-slate-500">
            {filteredCourses.length} courses found
          </span>
        </div>

        {filteredCourses.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
            {filteredCourses.map((course) => (
              <div
                key={course.id}
                className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >
                {/* Course Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="h-full w-full object-cover transition duration-300 hover:scale-105"
                  />

                  <span
                    className={`absolute right-3 top-3 rounded-full px-3 py-1 text-xs font-semibold ${
                      course.status === "Completed"
                        ? "bg-green-100 text-green-700"
                        : course.status === "In Progress"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-slate-100 text-slate-700"
                    }`}
                  >
                    {course.status}
                  </span>
                </div>

                {/* Course Information */}
                <div className="p-5">
                  <p className="text-xs font-semibold uppercase tracking-wide text-blue-600">
                    {course.category}
                  </p>

                  <h3 className="mt-2 min-h-12 text-lg font-bold text-slate-800">
                    {course.title}
                  </h3>

                  <p className="mt-2 text-sm text-slate-500">
                    Tutor: {course.tutor}
                  </p>

                  {/* Course Details */}
                  <div className="mt-4 flex items-center justify-between border-y border-slate-100 py-3 text-xs text-slate-500">
                    <span className="flex items-center gap-1">
                      <BookOpen size={15} />
                      {course.lessons} Lessons
                    </span>

                    <span className="flex items-center gap-1">
                      <Clock size={15} />
                      {course.duration}
                    </span>
                  </div>

                  <div className="mt-4 flex items-center gap-1 text-xs text-slate-500">
                    <Users size={15} />
                    {course.students} Students
                  </div>

                  {/* Progress */}
                  <div className="mt-5">
                    <div className="mb-2 flex justify-between text-sm">
                      <span className="font-medium text-slate-600">
                        Your Progress
                      </span>
                      <span className="font-bold text-slate-800">
                        {course.progress}%
                      </span>
                    </div>

                    <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                      <div
                        className={`h-full rounded-full ${
                          course.progress === 100
                            ? "bg-green-500"
                            : "bg-blue-600"
                        }`}
                        style={{
                          width: `${course.progress}%`,
                        }}
                      />
                    </div>
                  </div>

                  {/* Action */}
                  <button
                    onClick={() => alert(`Opening ${course.title}...`)}
                    className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
                  >
                    <PlayCircle size={18} />
                    {course.status === "Completed"
                      ? "Review Course"
                      : "Continue Learning"}
                    <ArrowRight size={17} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-slate-100 bg-white py-16 text-center">
            <BookOpen className="mx-auto text-slate-300" size={45} />
            <h3 className="mt-4 font-semibold text-slate-700">
              No courses found
            </h3>
            <p className="mt-2 text-sm text-slate-500">
              Try changing your search or filter.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

function StatCard({ title, value, icon: Icon, color }) {
  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-slate-500">{title}</p>
          <h3 className="mt-2 text-3xl font-bold text-slate-800">{value}</h3>
        </div>

        <div className={`rounded-xl p-3 ${color}`}>
          <Icon size={25} />
        </div>
      </div>
    </div>
  );
}
