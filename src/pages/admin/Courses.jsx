import { useMemo, useState } from "react";
import {
  Search,
  Plus,
  BookOpen,
  CheckCircle,
  FileEdit,
  Archive,
  Pencil,
  Trash2,
  Eye,
  X,
  DollarSign,
  Users,
  Layers,
  Filter,
} from "lucide-react";

const initialCourses = [
  {
    id: 1,
    title: "Introduction to Web Development",
    tutor: "Sara Mohammed",
    category: "Programming",
    price: 1500,
    students: 45,
    status: "Published",
    createdAt: "Nov 20, 2026",
    description: "Learn the fundamentals of HTML, CSS, and JavaScript.",
  },
  {
    id: 2,
    title: "Advanced React Development",
    tutor: "Michael Bekele",
    category: "Programming",
    price: 2500,
    students: 32,
    status: "Published",
    createdAt: "Nov 18, 2026",
    description: "Build modern applications using React.",
  },
  {
    id: 3,
    title: "Database Management with PostgreSQL",
    tutor: "Abebe Kebede",
    category: "Database",
    price: 1800,
    students: 0,
    status: "Draft",
    createdAt: "Nov 16, 2026",
    description: "Understand relational databases and SQL.",
  },
  {
    id: 4,
    title: "Computer Networking Fundamentals",
    tutor: "Dawit Alemu",
    category: "Networking",
    price: 2000,
    students: 28,
    status: "Published",
    createdAt: "Nov 12, 2026",
    description: "Learn networking concepts and protocols.",
  },
  {
    id: 5,
    title: "Python Programming Basics",
    tutor: "Hana Tesfaye",
    category: "Programming",
    price: 1200,
    students: 0,
    status: "Archived",
    createdAt: "Nov 08, 2026",
    description: "Start learning Python programming.",
  },
];

const emptyForm = {
  title: "",
  tutor: "",
  category: "",
  price: "",
  status: "Draft",
  description: "",
};

function CoursesPage() {
  const [courses, setCourses] = useState(initialCourses);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [showForm, setShowForm] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [form, setForm] = useState(emptyForm);

  const filteredCourses = useMemo(() => {
    return courses.filter((course) => {
      const matchesSearch =
        course.title.toLowerCase().includes(search.toLowerCase()) ||
        course.tutor.toLowerCase().includes(search.toLowerCase()) ||
        course.category.toLowerCase().includes(search.toLowerCase());

      const matchesStatus =
        statusFilter === "All" || course.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [courses, search, statusFilter]);

  const stats = [
    {
      label: "Total Courses",
      value: courses.length,
      icon: BookOpen,
      color: "bg-blue-100 text-blue-600",
    },
    {
      label: "Published",
      value: courses.filter((c) => c.status === "Published").length,
      icon: CheckCircle,
      color: "bg-emerald-100 text-emerald-600",
    },
    {
      label: "Draft",
      value: courses.filter((c) => c.status === "Draft").length,
      icon: FileEdit,
      color: "bg-amber-100 text-amber-600",
    },
    {
      label: "Archived",
      value: courses.filter((c) => c.status === "Archived").length,
      icon: Archive,
      color: "bg-slate-100 text-slate-600",
    },
  ];

  const resetForm = () => {
    setForm(emptyForm);
    setEditingCourse(null);
    setShowForm(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const courseData = {
      ...form,
      price: Number(form.price),
    };

    if (editingCourse) {
      setCourses((current) =>
        current.map((course) =>
          course.id === editingCourse.id
            ? { ...course, ...courseData }
            : course,
        ),
      );
    } else {
      setCourses((current) => [
        {
          id: Date.now(),
          ...courseData,
          students: 0,
          createdAt: new Date().toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          }),
        },
        ...current,
      ]);
    }

    resetForm();
  };

  const handleEdit = (course) => {
    setEditingCourse(course);
    setForm({
      title: course.title,
      tutor: course.tutor,
      category: course.category,
      price: String(course.price),
      status: course.status,
      description: course.description,
    });
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this course?")) {
      setCourses((current) => current.filter((course) => course.id !== id));
    }
  };

  const statusStyle = (status) => {
    switch (status) {
      case "Published":
        return "bg-emerald-50 text-emerald-600";
      case "Draft":
        return "bg-amber-50 text-amber-600";
      case "Archived":
        return "bg-slate-100 text-slate-600";
      default:
        return "bg-blue-50 text-blue-600";
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8">
      {/* Page Heading */}
      <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <p className="mb-1 text-sm font-medium text-blue-600">
            Administration / Courses
          </p>

          <h1 className="text-2xl font-bold text-slate-800 sm:text-3xl">
            Course Management
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Manage courses, tutors, pricing, and publication status.
          </p>
        </div>

        <button
          onClick={() => {
            resetForm();
            setShowForm(true);
          }}
          className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white shadow-lg shadow-blue-200 transition hover:bg-blue-700"
        >
          <Plus size={19} />
          Add New Course
        </button>
      </div>

      {/* Statistics */}
      <div className="mb-8 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.label}
              className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-500">
                    {stat.label}
                  </p>

                  <h2 className="mt-2 text-3xl font-bold text-slate-800">
                    {stat.value}
                  </h2>
                </div>

                <div className={`rounded-xl p-3 ${stat.color}`}>
                  <Icon size={25} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Courses Table */}
      <div className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm">
        <div className="flex flex-col justify-between gap-4 border-b border-slate-100 p-5 lg:flex-row lg:items-center">
          <div>
            <h2 className="text-lg font-bold text-slate-800">All Courses</h2>
            <p className="mt-1 text-sm text-slate-500">
              View and manage all courses on the platform.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <div className="relative">
              <Search
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type="text"
                placeholder="Search courses..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-xl border border-slate-200 py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 sm:w-64"
              />
            </div>

            <div className="relative">
              <Filter
                size={17}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full appearance-none rounded-xl border border-slate-200 bg-white py-2.5 pl-10 pr-8 text-sm outline-none focus:border-blue-500 sm:w-44"
              >
                <option value="All">All Status</option>
                <option value="Published">Published</option>
                <option value="Draft">Draft</option>
                <option value="Archived">Archived</option>
              </select>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[1000px] text-left">
            <thead className="bg-slate-50 text-xs uppercase tracking-wider text-slate-500">
              <tr>
                <th className="px-6 py-4 font-semibold">Course</th>
                <th className="px-6 py-4 font-semibold">Tutor</th>
                <th className="px-6 py-4 font-semibold">Category</th>
                <th className="px-6 py-4 font-semibold">Price</th>
                <th className="px-6 py-4 font-semibold">Students</th>
                <th className="px-6 py-4 font-semibold">Status</th>
                <th className="px-6 py-4 text-right font-semibold">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {filteredCourses.map((course) => (
                <tr key={course.id} className="transition hover:bg-slate-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
                        <BookOpen size={21} />
                      </div>

                      <div>
                        <p className="max-w-xs font-semibold text-slate-800">
                          {course.title}
                        </p>
                        <p className="mt-1 text-xs text-slate-400">
                          Added {course.createdAt}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-4 text-sm text-slate-600">
                    {course.tutor}
                  </td>

                  <td className="px-6 py-4">
                    <span className="rounded-full bg-indigo-50 px-3 py-1.5 text-xs font-semibold text-indigo-600">
                      {course.category}
                    </span>
                  </td>

                  <td className="px-6 py-4 text-sm font-semibold text-slate-700">
                    {course.price.toLocaleString()} ETB
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <Users size={16} className="text-slate-400" />
                      {course.students}
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    <span
                      className={`rounded-full px-3 py-1.5 text-xs font-semibold ${statusStyle(course.status)}`}
                    >
                      {course.status}
                    </span>
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => setSelectedCourse(course)}
                        title="View course"
                        className="rounded-lg p-2 text-blue-600 hover:bg-blue-50"
                      >
                        <Eye size={18} />
                      </button>

                      <button
                        onClick={() => handleEdit(course)}
                        title="Edit course"
                        className="rounded-lg p-2 text-emerald-600 hover:bg-emerald-50"
                      >
                        <Pencil size={18} />
                      </button>

                      <button
                        onClick={() => handleDelete(course.id)}
                        title="Delete course"
                        className="rounded-lg p-2 text-red-500 hover:bg-red-50"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {filteredCourses.length === 0 && (
                <tr>
                  <td
                    colSpan="7"
                    className="px-6 py-12 text-center text-slate-500"
                  >
                    No courses found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="border-t border-slate-100 px-6 py-4 text-sm text-slate-500">
          Showing {filteredCourses.length} of {courses.length} courses
        </div>
      </div>

      {/* Add / Edit Course Modal */}
      {showForm && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center overflow-y-auto bg-slate-900/50 p-4">
          <div className="my-auto w-full max-w-xl rounded-2xl bg-white p-6 shadow-2xl">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-slate-800">
                  {editingCourse ? "Edit Course" : "Create New Course"}
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  Enter the course information below.
                </p>
              </div>

              <button
                onClick={resetForm}
                className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"
                aria-label="Close form"
              >
                <X size={20} />
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
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-500"
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Tutor Name
                  </label>
                  <input
                    required
                    value={form.tutor}
                    onChange={(e) =>
                      setForm({ ...form, tutor: e.target.value })
                    }
                    placeholder="Enter tutor name"
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Category
                  </label>
                  <input
                    required
                    value={form.category}
                    onChange={(e) =>
                      setForm({ ...form, category: e.target.value })
                    }
                    placeholder="e.g. Programming"
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Price (ETB)
                  </label>
                  <input
                    required
                    type="number"
                    min="0"
                    value={form.price}
                    onChange={(e) =>
                      setForm({ ...form, price: e.target.value })
                    }
                    placeholder="Enter price"
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Course Status
                  </label>
                  <select
                    value={form.status}
                    onChange={(e) =>
                      setForm({ ...form, status: e.target.value })
                    }
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none focus:border-blue-500"
                  >
                    <option value="Draft">Draft</option>
                    <option value="Published">Published</option>
                    <option value="Archived">Archived</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Course Description
                </label>
                <textarea
                  rows="3"
                  value={form.description}
                  onChange={(e) =>
                    setForm({ ...form, description: e.target.value })
                  }
                  placeholder="Write a short course description..."
                  className="w-full resize-none rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-500"
                />
              </div>

              <button
                type="submit"
                className="w-full rounded-xl bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700"
              >
                {editingCourse ? "Save Changes" : "Create Course"}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Course Details Modal */}
      {selectedCourse && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-900/50 p-4">
          <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-xl font-bold text-slate-800">
                Course Details
              </h2>

              <button
                onClick={() => setSelectedCourse(null)}
                className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"
                aria-label="Close details"
              >
                <X size={20} />
              </button>
            </div>

            <div className="mb-5 flex h-24 items-center justify-center rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
              <BookOpen size={42} />
            </div>

            <h3 className="text-xl font-bold text-slate-800">
              {selectedCourse.title}
            </h3>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              {selectedCourse.description || "No description provided."}
            </p>

            <div className="mt-5 grid grid-cols-2 gap-3">
              <div className="rounded-xl bg-slate-50 p-4">
                <p className="text-xs text-slate-500">Tutor</p>
                <p className="mt-1 font-semibold text-slate-800">
                  {selectedCourse.tutor}
                </p>
              </div>

              <div className="rounded-xl bg-slate-50 p-4">
                <p className="text-xs text-slate-500">Category</p>
                <p className="mt-1 font-semibold text-slate-800">
                  {selectedCourse.category}
                </p>
              </div>

              <div className="rounded-xl bg-slate-50 p-4">
                <p className="text-xs text-slate-500">Price</p>
                <p className="mt-1 font-semibold text-slate-800">
                  {selectedCourse.price.toLocaleString()} ETB
                </p>
              </div>

              <div className="rounded-xl bg-slate-50 p-4">
                <p className="text-xs text-slate-500">Students</p>
                <p className="mt-1 font-semibold text-slate-800">
                  {selectedCourse.students}
                </p>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between">
              <span
                className={`rounded-full px-3 py-1.5 text-xs font-semibold ${statusStyle(selectedCourse.status)}`}
              >
                {selectedCourse.status}
              </span>

              <button
                onClick={() => setSelectedCourse(null)}
                className="rounded-xl bg-slate-100 px-5 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-200"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CoursesPage;
