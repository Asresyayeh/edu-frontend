import { useMemo, useState } from "react";
import {
  BookOpen,
  Search,
  GraduationCap,
  Users,
  TrendingUp,
  Clock,
  Star,
  CalendarDays,
  Eye,
  X,
  PlayCircle,
  CheckCircle,
  Filter,
  UserRound,
} from "lucide-react";

const initialCourses = [
  {
    id: 1,
    title: "Mathematics",
    category: "Science",
    child: "Abel Asres",
    grade: "Grade 9",
    tutor: "Abebe Kebede",
    tutorEmail: "abebe@example.com",
    progress: 85,
    lessonsCompleted: 17,
    totalLessons: 20,
    duration: "10 weeks",
    startDate: "Oct 01, 2026",
    nextClass: "Nov 10, 2026",
    nextClassTime: "02:00 PM",
    rating: 4.9,
    status: "In Progress",
    image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=700",
    description:
      "Learn algebra, geometry, equations, and essential mathematical problem-solving skills.",
  },
  {
    id: 2,
    title: "Physics",
    category: "Science",
    child: "Abel Asres",
    grade: "Grade 9",
    tutor: "Meron Tadesse",
    tutorEmail: "meron@example.com",
    progress: 65,
    lessonsCompleted: 13,
    totalLessons: 20,
    duration: "12 weeks",
    startDate: "Oct 05, 2026",
    nextClass: "Nov 11, 2026",
    nextClassTime: "10:00 AM",
    rating: 4.8,
    status: "In Progress",
    image: "https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?w=700",
    description:
      "Explore motion, force, energy, electricity, and fundamental physics concepts.",
  },
  {
    id: 3,
    title: "English Language",
    category: "Language",
    child: "Sara Asres",
    grade: "Grade 7",
    tutor: "Hana Mohammed",
    tutorEmail: "hana@example.com",
    progress: 90,
    lessonsCompleted: 18,
    totalLessons: 20,
    duration: "8 weeks",
    startDate: "Sep 15, 2026",
    nextClass: "Nov 09, 2026",
    nextClassTime: "04:00 PM",
    rating: 4.9,
    status: "In Progress",
    image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=700",
    description:
      "Improve grammar, vocabulary, reading comprehension, and communication skills.",
  },
  {
    id: 4,
    title: "Biology",
    category: "Science",
    child: "Sara Asres",
    grade: "Grade 7",
    tutor: "Dawit Alemu",
    tutorEmail: "dawit@example.com",
    progress: 45,
    lessonsCompleted: 9,
    totalLessons: 20,
    duration: "10 weeks",
    startDate: "Oct 10, 2026",
    nextClass: "Nov 12, 2026",
    nextClassTime: "01:00 PM",
    rating: 4.7,
    status: "In Progress",
    image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=700",
    description:
      "Understand living organisms, cells, human biology, and ecosystems.",
  },
];

export default function ParentCourses() {
  const [courses] = useState(initialCourses);
  const [searchTerm, setSearchTerm] = useState("");
  const [childFilter, setChildFilter] = useState("All Children");
  const [categoryFilter, setCategoryFilter] = useState("All Categories");
  const [selectedCourse, setSelectedCourse] = useState(null);

  const children = ["All Children", ...new Set(courses.map((c) => c.child))];

  const categories = [
    "All Categories",
    ...new Set(courses.map((c) => c.category)),
  ];

  const filteredCourses = useMemo(() => {
    return courses.filter((course) => {
      const matchesSearch =
        course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.tutor.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.child.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesChild =
        childFilter === "All Children" || course.child === childFilter;

      const matchesCategory =
        categoryFilter === "All Categories" ||
        course.category === categoryFilter;

      return matchesSearch && matchesChild && matchesCategory;
    });
  }, [courses, searchTerm, childFilter, categoryFilter]);

  const totalLessons = courses.reduce(
    (total, course) => total + course.totalLessons,
    0,
  );

  const completedLessons = courses.reduce(
    (total, course) => total + course.lessonsCompleted,
    0,
  );

  const averageProgress =
    courses.length > 0
      ? Math.round(
          courses.reduce((total, course) => total + course.progress, 0) /
            courses.length,
        )
      : 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          My Children's Courses
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          Monitor enrolled courses, tutors, and learning progress.
        </p>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Total Courses"
          value={courses.length}
          subtitle="Across all children"
          icon={BookOpen}
          color="bg-blue-100 text-blue-600"
        />

        <StatCard
          title="Average Progress"
          value={`${averageProgress}%`}
          subtitle="Overall learning progress"
          icon={TrendingUp}
          color="bg-green-100 text-green-600"
        />

        <StatCard
          title="Completed Lessons"
          value={completedLessons}
          subtitle={`Out of ${totalLessons} lessons`}
          icon={CheckCircle}
          color="bg-purple-100 text-purple-600"
        />

        <StatCard
          title="Active Tutors"
          value={new Set(courses.map((course) => course.tutor)).size}
          subtitle="Currently teaching"
          icon={Users}
          color="bg-orange-100 text-orange-600"
        />
      </div>

      {/* Filters */}
      <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
        <div className="mb-4 flex items-center gap-2">
          <Filter size={18} className="text-gray-500" />
          <h2 className="font-semibold text-gray-800">Filter Courses</h2>
        </div>

        <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
          <div className="relative">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              placeholder="Search courses or tutors..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-xl border border-gray-200 py-3 pl-10 pr-4 text-sm outline-none focus:border-brand-600"
            />
          </div>

          <select
            value={childFilter}
            onChange={(e) => setChildFilter(e.target.value)}
            className="rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-brand-600"
          >
            {children.map((child) => (
              <option key={child}>{child}</option>
            ))}
          </select>

          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-brand-600"
          >
            {categories.map((category) => (
              <option key={category}>{category}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Course cards */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-gray-900">Enrolled Courses</h2>
          <p className="text-sm text-gray-500">
            {filteredCourses.length} courses found
          </p>
        </div>
      </div>

      {filteredCourses.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-2">
          {filteredCourses.map((course) => (
            <div
              key={course.id}
              className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition hover:shadow-md"
            >
              {/* Course image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={course.image}
                  alt={course.title}
                  className="h-full w-full object-cover transition duration-500 hover:scale-105"
                />

                <span className="absolute left-4 top-4 rounded-full bg-white px-3 py-1 text-xs font-semibold text-brand-800 shadow-sm">
                  {course.category}
                </span>

                <span className="absolute right-4 top-4 rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                  {course.status}
                </span>
              </div>

              <div className="space-y-4 p-5">
                <div>
                  <h3 className="text-lg font-bold text-gray-900">
                    {course.title}
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    {course.description}
                  </p>
                </div>

                {/* Child and tutor */}
                <div className="flex flex-col gap-3 rounded-xl bg-gray-50 p-3 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center gap-2">
                    <div className="rounded-full bg-blue-100 p-2 text-blue-700">
                      <UserRound size={17} />
                    </div>
                    <div>
                      <p className="text-xs text-gray-400">Student</p>
                      <p className="text-sm font-semibold text-gray-800">
                        {course.child}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="rounded-full bg-purple-100 p-2 text-purple-700">
                      <GraduationCap size={17} />
                    </div>
                    <div>
                      <p className="text-xs text-gray-400">Tutor</p>
                      <p className="text-sm font-semibold text-gray-800">
                        {course.tutor}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Progress */}
                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-sm font-semibold text-gray-700">
                      Course Progress
                    </span>
                    <span className="text-sm font-bold text-brand-800">
                      {course.progress}%
                    </span>
                  </div>

                  <div className="h-2.5 overflow-hidden rounded-full bg-gray-100">
                    <div
                      className="h-full rounded-full bg-brand-700"
                      style={{ width: `${course.progress}%` }}
                    />
                  </div>

                  <p className="mt-2 text-xs text-gray-500">
                    {course.lessonsCompleted} of {course.totalLessons} lessons
                    completed
                  </p>
                </div>

                {/* Course details */}
                <div className="grid grid-cols-2 gap-3 border-t border-gray-100 pt-4">
                  <div className="flex items-center gap-2">
                    <Clock size={16} className="text-gray-400" />
                    <span className="text-xs text-gray-600">
                      {course.duration}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Star
                      size={16}
                      className="fill-yellow-400 text-yellow-400"
                    />
                    <span className="text-xs text-gray-600">
                      {course.rating} Rating
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedCourse(course)}
                  className="flex w-full items-center justify-center gap-2 rounded-xl border border-brand-800 py-3 text-sm font-semibold text-brand-800 transition hover:bg-brand-50"
                >
                  <Eye size={17} />
                  View Course Details
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-gray-100 bg-white p-12 text-center shadow-sm">
          <BookOpen size={42} className="mx-auto mb-3 text-gray-300" />
          <h3 className="font-semibold text-gray-800">No courses found</h3>
          <p className="mt-1 text-sm text-gray-500">
            Try changing your search or filters.
          </p>
        </div>
      )}

      {/* Course details modal */}
      {selectedCourse && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) setSelectedCourse(null);
          }}
        >
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white shadow-xl">
            <div className="relative h-52">
              <img
                src={selectedCourse.image}
                alt={selectedCourse.title}
                className="h-full w-full object-cover"
              />
              <button
                onClick={() => setSelectedCourse(null)}
                className="absolute right-4 top-4 rounded-full bg-white p-2 text-gray-700 shadow hover:bg-gray-100"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-5 p-6">
              <div>
                <span className="rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-800">
                  {selectedCourse.category}
                </span>
                <h2 className="mt-3 text-2xl font-bold text-gray-900">
                  {selectedCourse.title}
                </h2>
                <p className="mt-2 text-sm leading-6 text-gray-500">
                  {selectedCourse.description}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <DetailBox label="Student" value={selectedCourse.child} />
                <DetailBox label="Grade" value={selectedCourse.grade} />
                <DetailBox label="Tutor" value={selectedCourse.tutor} />
                <DetailBox
                  label="Tutor Email"
                  value={selectedCourse.tutorEmail}
                />
                <DetailBox label="Duration" value={selectedCourse.duration} />
                <DetailBox
                  label="Rating"
                  value={`${selectedCourse.rating} / 5`}
                />
                <DetailBox
                  label="Start Date"
                  value={selectedCourse.startDate}
                />
                <DetailBox
                  label="Next Class"
                  value={`${selectedCourse.nextClass} · ${selectedCourse.nextClassTime}`}
                />
              </div>

              <div>
                <div className="mb-2 flex items-center justify-between">
                  <h3 className="font-bold text-gray-900">Learning Progress</h3>
                  <span className="font-bold text-brand-800">
                    {selectedCourse.progress}%
                  </span>
                </div>

                <div className="h-3 overflow-hidden rounded-full bg-gray-100">
                  <div
                    className="h-full rounded-full bg-brand-700"
                    style={{ width: `${selectedCourse.progress}%` }}
                  />
                </div>

                <p className="mt-2 text-sm text-gray-500">
                  {selectedCourse.lessonsCompleted} out of{" "}
                  {selectedCourse.totalLessons} lessons completed.
                </p>
              </div>

              <div className="flex items-center gap-2 rounded-xl bg-blue-50 p-4 text-sm text-blue-700">
                <CalendarDays size={20} />
                Next lesson: {selectedCourse.nextClass} at{" "}
                {selectedCourse.nextClassTime}
              </div>

              <button
                onClick={() =>
                  alert("Course learning details will be available soon.")
                }
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-brand-800 py-3 text-sm font-semibold text-white hover:bg-brand-900"
              >
                <PlayCircle size={18} />
                View Learning Details
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function StatCard({ title, value, subtitle, icon: Icon, color }) {
  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
      <div
        className={`mb-4 flex h-11 w-11 items-center justify-center rounded-xl ${color}`}
      >
        <Icon size={22} />
      </div>
      <p className="text-sm text-gray-500">{title}</p>
      <h3 className="mt-1 text-2xl font-bold text-gray-900">{value}</h3>
      <p className="mt-1 text-xs text-gray-400">{subtitle}</p>
    </div>
  );
}

function DetailBox({ label, value }) {
  return (
    <div className="rounded-xl bg-gray-50 p-3">
      <p className="text-xs text-gray-400">{label}</p>
      <p className="mt-1 break-words text-sm font-semibold text-gray-800">
        {value}
      </p>
    </div>
  );
}
