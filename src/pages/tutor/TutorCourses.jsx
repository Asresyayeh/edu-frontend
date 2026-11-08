import { useMemo, useState } from "react";
import {
  BookOpen,
  Users,
  Clock,
  Search,
  Plus,
  MoreVertical,
  Edit,
  Trash2,
  Eye,
  Star,
  X,
  PlayCircle,
  CheckCircle,
  FileText,
} from "lucide-react";

const initialCourses = [
  {
    id: 1,
    title: "Full Stack Web Development",
    category: "Web Development",
    description: "Learn HTML, CSS, JavaScript, React, Node.js and databases.",
    students: 45,
    lessons: 32,
    duration: "12 weeks",
    price: 3500,
    rating: 4.9,
    progress: 75,
    status: "Published",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800",
  },
  {
    id: 2,
    title: "React.js for Beginners",
    category: "Programming",
    description: "Build modern and interactive web applications using React.",
    students: 32,
    lessons: 20,
    duration: "8 weeks",
    price: 2500,
    rating: 4.8,
    progress: 60,
    status: "Published",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800",
  },
  {
    id: 3,
    title: "Python Programming",
    category: "Programming",
    description:
      "Master Python fundamentals, functions and object-oriented programming.",
    students: 28,
    lessons: 28,
    duration: "10 weeks",
    price: 3000,
    rating: 4.7,
    progress: 40,
    status: "Published",
    image: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=800",
  },
  {
    id: 4,
    title: "Database Management",
    category: "Database",
    description: "Understand SQL, database design and PostgreSQL.",
    students: 19,
    lessons: 18,
    duration: "6 weeks",
    price: 2000,
    rating: 4.6,
    progress: 100,
    status: "Draft",
    image: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=800",
  },
];

const emptyCourse = {
  title: "",
  category: "Programming",
  description: "",
  lessons: "",
  duration: "",
  price: "",
};

const formatETB = (amount) =>
  new Intl.NumberFormat("en-ET", {
    maximumFractionDigits: 0,
  }).format(amount) + " ETB";

export default function TutorCourses() {
  const [courses, setCourses] = useState(initialCourses);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [selectedMenu, setSelectedMenu] = useState(null);
  const [form, setForm] = useState(emptyCourse);

  const publishedCourses = courses.filter(
    (course) => course.status === "Published",
  ).length;

  const totalStudents = courses.reduce(
    (sum, course) => sum + course.students,
    0,
  );

  const filteredCourses = useMemo(() => {
    return courses.filter((course) => {
      const matchesSearch =
        course.title.toLowerCase().includes(search.toLowerCase()) ||
        course.category.toLowerCase().includes(search.toLowerCase());

      const matchesFilter = filter === "All" || course.status === filter;

      return matchesSearch && matchesFilter;
    });
  }, [courses, search, filter]);

  const openCreateModal = () => {
    setEditingId(null);
    setForm(emptyCourse);
    setShowModal(true);
  };

  const openEditModal = (course) => {
    setEditingId(course.id);
    setForm({
      title: course.title,
      category: course.category,
      description: course.description,
      lessons: String(course.lessons),
      duration: course.duration,
      price: String(course.price),
    });
    setSelectedMenu(null);
    setShowModal(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const courseData = {
      title: form.title.trim(),
      category: form.category,
      description: form.description.trim(),
      lessons: Number(form.lessons),
      duration: form.duration.trim(),
      price: Number(form.price),
      status: "Draft",
      students: 0,
      rating: 0,
      progress: 0,
      image:
        "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800",
    };

    if (
      !courseData.title ||
      !courseData.description ||
      !courseData.lessons ||
      !courseData.duration ||
      !courseData.price
    ) {
      alert("Please complete all course fields.");
      return;
    }

    if (editingId) {
      setCourses((previous) =>
        previous.map((course) =>
          course.id === editingId
            ? { ...course, ...courseData, id: editingId }
            : course,
        ),
      );
    } else {
      setCourses((previous) => [
        { ...courseData, id: Date.now() },
        ...previous,
      ]);
    }

    setShowModal(false);
    setEditingId(null);
    setForm(emptyCourse);
  };

  const deleteCourse = (id) => {
    if (window.confirm("Are you sure you want to delete this course?")) {
      setCourses((previous) => previous.filter((course) => course.id !== id));
    }
    setSelectedMenu(null);
  };

  const togglePublish = (id) => {
    setCourses((previous) =>
      previous.map((course) =>
        course.id === id
          ? {
              ...course,
              status: course.status === "Published" ? "Draft" : "Published",
            }
          : course,
      ),
    );
    setSelectedMenu(null);
  };

  const stats = [
    {
      label: "Total Courses",
      value: courses.length,
      icon: BookOpen,
      color: "text-blue-600",
      bg: "bg-blue-100",
    },
    {
      label: "Published Courses",
      value: publishedCourses,
      icon: CheckCircle,
      color: "text-green-600",
      bg: "bg-green-100",
    },
    {
      label: "Total Students",
      value: totalStudents,
      icon: Users,
      color: "text-purple-600",
      bg: "bg-purple-100",
    },
    {
      label: "Total Lessons",
      value: courses.reduce((sum, course) => sum + course.lessons, 0),
      icon: FileText,
      color: "text-orange-600",
      bg: "bg-orange-100",
    },
  ];

  return (
    <div className="space-y-7">
      {/* Page Heading */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">My Courses</h1>
          <p className="mt-1 text-sm text-slate-500">
            Create, organize and manage your teaching courses.
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
        >
          <Plus size={19} />
          Create New Course
        </button>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.label}
              className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <div className={`rounded-xl p-3 ${stat.bg}`}>
                  <Icon size={22} className={stat.color} />
                </div>
                <span className="text-xs text-slate-400">Overview</span>
              </div>

              <p className="mt-5 text-sm text-slate-500">{stat.label}</p>
              <h2 className="mt-1 text-2xl font-bold text-slate-800">
                {stat.value}
              </h2>
            </div>
          );
        })}
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col justify-between gap-4 rounded-2xl border border-slate-100 bg-white p-5 shadow-sm md:flex-row md:items-center">
        <div className="relative w-full md:max-w-sm">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search your courses..."
            className="w-full rounded-xl border border-slate-200 py-3 pl-10 pr-4 text-sm outline-none focus:border-blue-500"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          {["All", "Published", "Draft"].map((item) => (
            <button
              key={item}
              onClick={() => setFilter(item)}
              className={`rounded-lg px-4 py-2.5 text-sm font-medium transition ${
                filter === item
                  ? "bg-blue-600 text-white"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      {/* Course Cards */}
      {filteredCourses.length === 0 ? (
        <div className="rounded-2xl border border-slate-100 bg-white py-16 text-center">
          <BookOpen className="mx-auto text-slate-300" size={45} />
          <h3 className="mt-4 font-semibold text-slate-700">
            No courses found
          </h3>
          <p className="mt-1 text-sm text-slate-500">
            Try another search or create a new course.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {filteredCourses.map((course) => (
            <div
              key={course.id}
              className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm transition hover:shadow-md"
            >
              {/* Course Image */}
              <div className="relative h-48">
                <img
                  src={course.image}
                  alt={course.title}
                  className="h-full w-full object-cover"
                />

                <span
                  className={`absolute left-4 top-4 rounded-full px-3 py-1 text-xs font-semibold ${
                    course.status === "Published"
                      ? "bg-green-100 text-green-700"
                      : "bg-orange-100 text-orange-700"
                  }`}
                >
                  {course.status}
                </span>

                {/* Course Menu */}
                <div className="absolute right-4 top-4">
                  <button
                    onClick={() =>
                      setSelectedMenu(
                        selectedMenu === course.id ? null : course.id,
                      )
                    }
                    className="rounded-lg bg-white p-2 text-slate-700 shadow hover:bg-slate-100"
                  >
                    <MoreVertical size={19} />
                  </button>

                  {selectedMenu === course.id && (
                    <div className="absolute right-0 z-20 mt-2 w-44 overflow-hidden rounded-xl border border-slate-100 bg-white shadow-lg">
                      <button
                        onClick={() => openEditModal(course)}
                        className="flex w-full items-center gap-2 px-4 py-3 text-sm text-slate-600 hover:bg-slate-50"
                      >
                        <Edit size={16} />
                        Edit Course
                      </button>

                      <button
                        onClick={() => togglePublish(course.id)}
                        className="flex w-full items-center gap-2 px-4 py-3 text-sm text-slate-600 hover:bg-slate-50"
                      >
                        <Eye size={16} />
                        {course.status === "Published"
                          ? "Unpublish"
                          : "Publish"}
                      </button>

                      <button
                        onClick={() => deleteCourse(course.id)}
                        className="flex w-full items-center gap-2 px-4 py-3 text-sm text-red-600 hover:bg-red-50"
                      >
                        <Trash2 size={16} />
                        Delete Course
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Course Details */}
              <div className="p-5">
                <div className="mb-3 flex items-center justify-between gap-3">
                  <span className="rounded-lg bg-blue-50 px-3 py-1 text-xs font-medium text-blue-600">
                    {course.category}
                  </span>

                  <div className="flex items-center gap-1 text-sm text-yellow-500">
                    <Star size={16} fill="currentColor" />
                    <span className="font-semibold text-slate-700">
                      {course.rating || "New"}
                    </span>
                  </div>
                </div>

                <h2 className="text-lg font-bold text-slate-800">
                  {course.title}
                </h2>

                <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-500">
                  {course.description}
                </p>

                {/* Course Information */}
                <div className="mt-5 grid grid-cols-3 gap-3 border-y border-slate-100 py-4">
                  <div className="flex items-center gap-2">
                    <Users size={17} className="text-blue-600" />
                    <div>
                      <p className="text-sm font-bold text-slate-800">
                        {course.students}
                      </p>
                      <p className="text-xs text-slate-400">Students</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <BookOpen size={17} className="text-purple-600" />
                    <div>
                      <p className="text-sm font-bold text-slate-800">
                        {course.lessons}
                      </p>
                      <p className="text-xs text-slate-400">Lessons</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Clock size={17} className="text-orange-600" />
                    <div>
                      <p className="text-sm font-bold text-slate-800">
                        {course.duration}
                      </p>
                      <p className="text-xs text-slate-400">Duration</p>
                    </div>
                  </div>
                </div>

                {/* Course Progress */}
                <div className="mt-4">
                  <div className="mb-2 flex justify-between text-sm">
                    <span className="text-slate-500">Course completion</span>
                    <span className="font-semibold text-slate-700">
                      {course.progress}%
                    </span>
                  </div>

                  <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                    <div
                      className="h-full rounded-full bg-blue-600"
                      style={{ width: `${course.progress}%` }}
                    />
                  </div>
                </div>

                {/* Price and Actions */}
                <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="text-xs text-slate-400">Course Price</p>
                    <p className="text-lg font-bold text-slate-800">
                      {formatETB(course.price)}
                    </p>
                  </div>

                  <button
                    onClick={() =>
                      alert(
                        `Course details for "${course.title}" will be available when the course details page is connected.`,
                      )
                    }
                    className="flex items-center gap-2 rounded-xl border border-blue-200 px-4 py-2.5 text-sm font-semibold text-blue-600 transition hover:bg-blue-50"
                  >
                    <PlayCircle size={17} />
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Create / Edit Course Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/50 p-4">
          <div className="my-6 w-full max-w-xl rounded-2xl bg-white p-6 shadow-xl">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-slate-800">
                  {editingId ? "Edit Course" : "Create New Course"}
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  Enter your course information below.
                </p>
              </div>

              <button
                onClick={() => setShowModal(false)}
                className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"
              >
                <X size={21} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Course Title
                </label>
                <input
                  required
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  placeholder="Enter course title"
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Category
                </label>
                <select
                  value={form.category}
                  onChange={(e) =>
                    setForm({ ...form, category: e.target.value })
                  }
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-blue-500"
                >
                  <option>Programming</option>
                  <option>Web Development</option>
                  <option>Database</option>
                  <option>Design</option>
                  <option>Mathematics</option>
                  <option>Science</option>
                  <option>Other</option>
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Course Description
                </label>
                <textarea
                  required
                  rows="3"
                  value={form.description}
                  onChange={(e) =>
                    setForm({ ...form, description: e.target.value })
                  }
                  placeholder="Describe what students will learn..."
                  className="w-full resize-none rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-500"
                />
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Lessons
                  </label>
                  <input
                    required
                    type="number"
                    min="1"
                    value={form.lessons}
                    onChange={(e) =>
                      setForm({ ...form, lessons: e.target.value })
                    }
                    placeholder="32"
                    className="w-full rounded-xl border border-slate-200 px-3 py-3 text-sm outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Duration
                  </label>
                  <input
                    required
                    value={form.duration}
                    onChange={(e) =>
                      setForm({ ...form, duration: e.target.value })
                    }
                    placeholder="8 weeks"
                    className="w-full rounded-xl border border-slate-200 px-3 py-3 text-sm outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Price (ETB)
                  </label>
                  <input
                    required
                    type="number"
                    min="1"
                    value={form.price}
                    onChange={(e) =>
                      setForm({ ...form, price: e.target.value })
                    }
                    placeholder="2500"
                    className="w-full rounded-xl border border-slate-200 px-3 py-3 text-sm outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="flex flex-col-reverse gap-3 pt-3 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-600 hover:bg-slate-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white hover:bg-blue-700"
                >
                  {editingId ? "Save Changes" : "Create Course"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
