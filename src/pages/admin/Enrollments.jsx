import { useMemo, useState } from "react";
import {
  Search,
  Plus,
  ClipboardList,
  CheckCircle,
  Clock,
  XCircle,
  Eye,
  Pencil,
  Trash2,
  X,
  GraduationCap,
  BookOpen,
  CalendarDays,
  DollarSign,
  Users,
} from "lucide-react";

const initialEnrollments = [
  {
    id: 1,
    student: "Abebe Kebede",
    email: "abebe@example.com",
    course: "Full Stack Web Development",
    tutor: "John Smith",
    enrolledAt: "2026-11-10",
    amount: 2500,
    paymentStatus: "Paid",
    status: "Active",
  },
  {
    id: 2,
    student: "Meron Alemu",
    email: "meron@example.com",
    course: "Python Programming",
    tutor: "Sarah Johnson",
    enrolledAt: "2026-11-12",
    amount: 1800,
    paymentStatus: "Pending",
    status: "Pending",
  },
  {
    id: 3,
    student: "Dawit Tesfaye",
    email: "dawit@example.com",
    course: "UI/UX Design",
    tutor: "Michael Brown",
    enrolledAt: "2026-11-14",
    amount: 2000,
    paymentStatus: "Paid",
    status: "Active",
  },
  {
    id: 4,
    student: "Hana Girma",
    email: "hana@example.com",
    course: "Database Management",
    tutor: "David Wilson",
    enrolledAt: "2026-11-15",
    amount: 1500,
    paymentStatus: "Paid",
    status: "Completed",
  },
  {
    id: 5,
    student: "Yonas Bekele",
    email: "yonas@example.com",
    course: "JavaScript Fundamentals",
    tutor: "John Smith",
    enrolledAt: "2026-11-17",
    amount: 1200,
    paymentStatus: "Unpaid",
    status: "Cancelled",
  },
  {
    id: 6,
    student: "Sara Mulu",
    email: "sara@example.com",
    course: "React Development",
    tutor: "Sarah Johnson",
    enrolledAt: "2026-11-19",
    amount: 2200,
    paymentStatus: "Paid",
    status: "Active",
  },
];

const students = [
  "Abebe Kebede",
  "Meron Alemu",
  "Dawit Tesfaye",
  "Hana Girma",
  "Yonas Bekele",
  "Sara Mulu",
];

const courses = [
  "Full Stack Web Development",
  "Python Programming",
  "UI/UX Design",
  "Database Management",
  "JavaScript Fundamentals",
  "React Development",
];

const tutors = ["John Smith", "Sarah Johnson", "Michael Brown", "David Wilson"];

const statusStyles = {
  Active: "bg-green-100 text-green-700",
  Pending: "bg-amber-100 text-amber-700",
  Completed: "bg-blue-100 text-blue-700",
  Cancelled: "bg-red-100 text-red-700",
};

const paymentStyles = {
  Paid: "bg-green-100 text-green-700",
  Pending: "bg-amber-100 text-amber-700",
  Unpaid: "bg-red-100 text-red-700",
};

function EnrollmentsPage() {
  const [enrollments, setEnrollments] = useState(initialEnrollments);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [paymentFilter, setPaymentFilter] = useState("All");

  const [showModal, setShowModal] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [selectedEnrollment, setSelectedEnrollment] = useState(null);
  const [editingEnrollment, setEditingEnrollment] = useState(null);

  const [formData, setFormData] = useState({
    student: "",
    email: "",
    course: "",
    tutor: "",
    enrolledAt: new Date().toISOString().split("T")[0],
    amount: "",
    paymentStatus: "Pending",
    status: "Pending",
  });

  const stats = [
    {
      title: "Total Enrollments",
      value: enrollments.length,
      icon: ClipboardList,
      color: "from-blue-500 to-indigo-600",
      bg: "bg-blue-50",
    },
    {
      title: "Active Enrollments",
      value: enrollments.filter((e) => e.status === "Active").length,
      icon: CheckCircle,
      color: "from-emerald-500 to-green-600",
      bg: "bg-green-50",
    },
    {
      title: "Pending Enrollments",
      value: enrollments.filter((e) => e.status === "Pending").length,
      icon: Clock,
      color: "from-amber-500 to-orange-500",
      bg: "bg-orange-50",
    },
    {
      title: "Completed Enrollments",
      value: enrollments.filter((e) => e.status === "Completed").length,
      icon: GraduationCap,
      color: "from-purple-500 to-violet-600",
      bg: "bg-purple-50",
    },
  ];

  const filteredEnrollments = useMemo(() => {
    return enrollments.filter((enrollment) => {
      const searchTerm = search.toLowerCase();

      const matchesSearch =
        enrollment.student.toLowerCase().includes(searchTerm) ||
        enrollment.email.toLowerCase().includes(searchTerm) ||
        enrollment.course.toLowerCase().includes(searchTerm) ||
        enrollment.tutor.toLowerCase().includes(searchTerm);

      const matchesStatus =
        statusFilter === "All" || enrollment.status === statusFilter;

      const matchesPayment =
        paymentFilter === "All" || enrollment.paymentStatus === paymentFilter;

      return matchesSearch && matchesStatus && matchesPayment;
    });
  }, [enrollments, search, statusFilter, paymentFilter]);

  const openAddModal = () => {
    setEditingEnrollment(null);

    setFormData({
      student: "",
      email: "",
      course: "",
      tutor: "",
      enrolledAt: new Date().toISOString().split("T")[0],
      amount: "",
      paymentStatus: "Pending",
      status: "Pending",
    });

    setShowModal(true);
  };

  const openEditModal = (enrollment) => {
    setEditingEnrollment(enrollment);

    setFormData({
      student: enrollment.student,
      email: enrollment.email,
      course: enrollment.course,
      tutor: enrollment.tutor,
      enrolledAt: enrollment.enrolledAt,
      amount: enrollment.amount,
      paymentStatus: enrollment.paymentStatus,
      status: enrollment.status,
    });

    setShowModal(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !formData.student ||
      !formData.email.trim() ||
      !formData.course ||
      !formData.tutor
    ) {
      return;
    }

    const duplicate = enrollments.some(
      (item) =>
        item.student.toLowerCase() === formData.student.toLowerCase() &&
        item.course === formData.course &&
        item.id !== editingEnrollment?.id,
    );

    if (duplicate) {
      alert("This student is already enrolled in this course.");
      return;
    }

    const enrollmentData = {
      ...formData,
      email: formData.email.trim(),
      amount: Number(formData.amount) || 0,
    };

    if (editingEnrollment) {
      setEnrollments((prev) =>
        prev.map((item) =>
          item.id === editingEnrollment.id
            ? { ...item, ...enrollmentData }
            : item,
        ),
      );
    } else {
      const newEnrollment = {
        id: Date.now(),
        ...enrollmentData,
      };

      setEnrollments((prev) => [newEnrollment, ...prev]);
    }

    setShowModal(false);
  };

  const handleDelete = (enrollment) => {
    if (
      window.confirm(
        `Delete the enrollment of ${enrollment.student} for ${enrollment.course}?`,
      )
    ) {
      setEnrollments((prev) =>
        prev.filter((item) => item.id !== enrollment.id),
      );
    }
  };

  const updateStatus = (id, status) => {
    setEnrollments((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status } : item)),
    );

    setSelectedEnrollment((prev) =>
      prev?.id === id ? { ...prev, status } : prev,
    );
  };

  return (
    <div className="min-h-screen space-y-7 p-4 sm:p-6 lg:p-8">
      {/* Page Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 sm:text-3xl">
            Enrollment Management
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Manage student course enrollments and enrollment statuses.
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-5 py-3 font-semibold text-white shadow-lg shadow-blue-200 transition hover:-translate-y-0.5 hover:shadow-xl"
        >
          <Plus size={20} />
          Add Enrollment
        </button>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.title}
              className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-500">
                    {stat.title}
                  </p>
                  <h2 className="mt-2 text-3xl font-bold text-slate-800">
                    {stat.value}
                  </h2>
                </div>

                <div className={`rounded-2xl ${stat.bg} p-3`}>
                  <Icon size={26} className="text-slate-700" />
                </div>
              </div>

              <div
                className={`mt-4 h-1.5 rounded-full bg-gradient-to-r ${stat.color}`}
              />
            </div>
          );
        })}
      </div>

      {/* Enrollment Table */}
      <div className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm">
        <div className="flex flex-col justify-between gap-4 border-b border-slate-100 p-5 xl:flex-row xl:items-center">
          <div>
            <h2 className="text-lg font-bold text-slate-800">
              All Enrollments
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              View and manage all student course enrollments.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <div className="relative">
              <Search
                size={19}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                type="text"
                placeholder="Search enrollments..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-xl border border-slate-200 py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 sm:w-60"
              />
            </div>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm outline-none focus:border-blue-500"
            >
              <option value="All">All Statuses</option>
              <option value="Active">Active</option>
              <option value="Pending">Pending</option>
              <option value="Completed">Completed</option>
              <option value="Cancelled">Cancelled</option>
            </select>

            <select
              value={paymentFilter}
              onChange={(e) => setPaymentFilter(e.target.value)}
              className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm outline-none focus:border-blue-500"
            >
              <option value="All">All Payments</option>
              <option value="Paid">Paid</option>
              <option value="Pending">Pending</option>
              <option value="Unpaid">Unpaid</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[1050px] text-left">
            <thead className="bg-slate-50 text-xs uppercase tracking-wider text-slate-500">
              <tr>
                <th className="px-6 py-4">Student</th>
                <th className="px-6 py-4">Course</th>
                <th className="px-6 py-4">Tutor</th>
                <th className="px-6 py-4">Enrollment Date</th>
                <th className="px-6 py-4">Amount</th>
                <th className="px-6 py-4">Payment</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-center">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {filteredEnrollments.map((enrollment) => (
                <tr
                  key={enrollment.id}
                  className="transition hover:bg-blue-50/40"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 font-bold text-blue-700">
                        {enrollment.student.charAt(0)}
                      </div>

                      <div>
                        <p className="font-semibold text-slate-800">
                          {enrollment.student}
                        </p>
                        <p className="text-xs text-slate-400">
                          {enrollment.email}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-sm font-medium text-slate-700">
                      <BookOpen size={17} className="text-blue-500" />
                      {enrollment.course}
                    </div>
                  </td>

                  <td className="px-6 py-4 text-sm text-slate-600">
                    {enrollment.tutor}
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-sm text-slate-500">
                      <CalendarDays size={16} />
                      {enrollment.enrolledAt}
                    </div>
                  </td>

                  <td className="px-6 py-4 text-sm font-semibold text-slate-700">
                    {enrollment.amount.toLocaleString()} ETB
                  </td>

                  <td className="px-6 py-4">
                    <span
                      className={`rounded-full px-3 py-1.5 text-xs font-semibold ${
                        paymentStyles[enrollment.paymentStatus]
                      }`}
                    >
                      {enrollment.paymentStatus}
                    </span>
                  </td>

                  <td className="px-6 py-4">
                    <select
                      value={enrollment.status}
                      onChange={(e) =>
                        updateStatus(enrollment.id, e.target.value)
                      }
                      className={`rounded-full border-0 px-3 py-1.5 text-xs font-semibold outline-none ${
                        statusStyles[enrollment.status]
                      }`}
                    >
                      <option value="Active">Active</option>
                      <option value="Pending">Pending</option>
                      <option value="Completed">Completed</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => {
                          setSelectedEnrollment(enrollment);
                          setShowDetails(true);
                        }}
                        title="View details"
                        className="rounded-lg bg-blue-50 p-2 text-blue-600 transition hover:bg-blue-100"
                      >
                        <Eye size={17} />
                      </button>

                      <button
                        onClick={() => openEditModal(enrollment)}
                        title="Edit enrollment"
                        className="rounded-lg bg-amber-50 p-2 text-amber-600 transition hover:bg-amber-100"
                      >
                        <Pencil size={17} />
                      </button>

                      <button
                        onClick={() => handleDelete(enrollment)}
                        title="Delete enrollment"
                        className="rounded-lg bg-red-50 p-2 text-red-600 transition hover:bg-red-100"
                      >
                        <Trash2 size={17} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {filteredEnrollments.length === 0 && (
                <tr>
                  <td
                    colSpan="8"
                    className="px-6 py-12 text-center text-slate-500"
                  >
                    No enrollments found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="border-t border-slate-100 px-6 py-4 text-sm text-slate-500">
          Showing {filteredEnrollments.length} of {enrollments.length}{" "}
          enrollments
        </div>
      </div>

      {/* Add / Edit Enrollment Modal */}
      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-black/50 p-4">
          <div className="my-8 w-full max-w-xl rounded-2xl bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 p-5">
              <div>
                <h2 className="text-xl font-bold text-slate-800">
                  {editingEnrollment ? "Edit Enrollment" : "Add New Enrollment"}
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  Enter the student and course enrollment details.
                </p>
              </div>

              <button
                onClick={() => setShowModal(false)}
                className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"
              >
                <X size={21} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5 p-6">
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Student
                </label>
                <select
                  required
                  value={formData.student}
                  onChange={(e) =>
                    setFormData({ ...formData, student: e.target.value })
                  }
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-500"
                >
                  <option value="">Select student</option>
                  {students.map((student) => (
                    <option key={student} value={student}>
                      {student}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Student Email
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  placeholder="student@example.com"
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Course
                </label>
                <select
                  required
                  value={formData.course}
                  onChange={(e) =>
                    setFormData({ ...formData, course: e.target.value })
                  }
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-500"
                >
                  <option value="">Select course</option>
                  {courses.map((course) => (
                    <option key={course} value={course}>
                      {course}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Tutor
                </label>
                <select
                  required
                  value={formData.tutor}
                  onChange={(e) =>
                    setFormData({ ...formData, tutor: e.target.value })
                  }
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-500"
                >
                  <option value="">Select tutor</option>
                  {tutors.map((tutor) => (
                    <option key={tutor} value={tutor}>
                      {tutor}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Enrollment Date
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.enrolledAt}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        enrolledAt: e.target.value,
                      })
                    }
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Amount (ETB)
                  </label>
                  <input
                    type="number"
                    min="0"
                    required
                    value={formData.amount}
                    onChange={(e) =>
                      setFormData({ ...formData, amount: e.target.value })
                    }
                    placeholder="2500"
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Payment Status
                  </label>
                  <select
                    value={formData.paymentStatus}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        paymentStatus: e.target.value,
                      })
                    }
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-500"
                  >
                    <option value="Paid">Paid</option>
                    <option value="Pending">Pending</option>
                    <option value="Unpaid">Unpaid</option>
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Enrollment Status
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) =>
                      setFormData({ ...formData, status: e.target.value })
                    }
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-500"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Active">Active</option>
                    <option value="Completed">Completed</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-3 border-t border-slate-100 pt-5">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="rounded-xl border border-slate-200 px-5 py-2.5 font-semibold text-slate-600 hover:bg-slate-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-5 py-2.5 font-semibold text-white shadow-md hover:shadow-lg"
                >
                  {editingEnrollment ? "Save Changes" : "Create Enrollment"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Enrollment Details Modal */}
      {showDetails && selectedEnrollment && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-black/50 p-4">
          <div className="my-8 w-full max-w-md rounded-2xl bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 p-5">
              <h2 className="text-xl font-bold text-slate-800">
                Enrollment Details
              </h2>

              <button
                onClick={() => setShowDetails(false)}
                className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"
              >
                <X size={21} />
              </button>
            </div>

            <div className="space-y-5 p-6">
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100 text-blue-700">
                  <GraduationCap size={30} />
                </div>

                <div>
                  <h3 className="text-lg font-bold text-slate-800">
                    {selectedEnrollment.student}
                  </h3>
                  <p className="text-sm text-slate-500">
                    {selectedEnrollment.email}
                  </p>
                </div>
              </div>

              <div className="space-y-3 rounded-xl bg-slate-50 p-4">
                <div>
                  <p className="text-xs font-semibold uppercase text-slate-400">
                    Course
                  </p>
                  <p className="mt-1 font-medium text-slate-800">
                    {selectedEnrollment.course}
                  </p>
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase text-slate-400">
                    Tutor
                  </p>
                  <p className="mt-1 font-medium text-slate-800">
                    {selectedEnrollment.tutor}
                  </p>
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase text-slate-400">
                    Enrollment Date
                  </p>
                  <p className="mt-1 font-medium text-slate-800">
                    {selectedEnrollment.enrolledAt}
                  </p>
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase text-slate-400">
                    Amount
                  </p>
                  <p className="mt-1 font-medium text-slate-800">
                    {selectedEnrollment.amount.toLocaleString()} ETB
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <p className="mb-2 text-xs font-semibold uppercase text-slate-400">
                    Enrollment Status
                  </p>
                  <span
                    className={`rounded-full px-3 py-1.5 text-xs font-semibold ${
                      statusStyles[selectedEnrollment.status]
                    }`}
                  >
                    {selectedEnrollment.status}
                  </span>
                </div>

                <div>
                  <p className="mb-2 text-xs font-semibold uppercase text-slate-400">
                    Payment Status
                  </p>
                  <span
                    className={`rounded-full px-3 py-1.5 text-xs font-semibold ${
                      paymentStyles[selectedEnrollment.paymentStatus]
                    }`}
                  >
                    {selectedEnrollment.paymentStatus}
                  </span>
                </div>
              </div>
            </div>

            <div className="border-t border-slate-100 p-5 text-right">
              <button
                onClick={() => setShowDetails(false)}
                className="rounded-xl bg-slate-100 px-5 py-2.5 font-semibold text-slate-700 hover:bg-slate-200"
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

export default EnrollmentsPage;
