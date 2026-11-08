import { useMemo, useState } from "react";
import {
  ClipboardList,
  Plus,
  Search,
  Filter,
  Clock,
  Users,
  CheckCircle,
  AlertCircle,
  FileText,
  Eye,
  Edit,
  Trash2,
  X,
  CalendarDays,
  Download,
  Send,
  BookOpen,
} from "lucide-react";

const initialAssignments = [
  {
    id: 1,
    title: "Build a React Todo Application",
    course: "Full Stack Web Development",
    description:
      "Create a responsive Todo application using React hooks and component-based architecture.",
    dueDate: "2026-11-12",
    totalStudents: 18,
    submissions: 14,
    status: "Published",
    points: 100,
  },
  {
    id: 2,
    title: "Python Functions and Modules",
    course: "Python Programming",
    description:
      "Write Python functions and organize your code into reusable modules.",
    dueDate: "2026-11-15",
    totalStudents: 22,
    submissions: 10,
    status: "Published",
    points: 50,
  },
  {
    id: 3,
    title: "Database Design Project",
    course: "Database Management",
    description:
      "Design an ER diagram and create a relational database for a student management system.",
    dueDate: "2026-11-18",
    totalStudents: 16,
    submissions: 16,
    status: "Published",
    points: 100,
  },
  {
    id: 4,
    title: "UI Design Assignment",
    course: "React.js for Beginners",
    description:
      "Create a modern login and registration interface using design principles.",
    dueDate: "2026-11-22",
    totalStudents: 14,
    submissions: 0,
    status: "Draft",
    points: 50,
  },
];

const initialSubmissions = [
  {
    id: 1,
    student: "Abel Asres",
    email: "abel.asres@gmail.com",
    assignmentId: 1,
    submittedAt: "Nov 07, 2026",
    status: "Submitted",
    score: null,
  },
  {
    id: 2,
    student: "Sara Bekele",
    email: "sara.bekele@gmail.com",
    assignmentId: 1,
    submittedAt: "Nov 06, 2026",
    status: "Graded",
    score: 92,
  },
  {
    id: 3,
    student: "Dawit Alemu",
    email: "dawit.alemu@gmail.com",
    assignmentId: 1,
    submittedAt: "Nov 08, 2026",
    status: "Submitted",
    score: null,
  },
  {
    id: 4,
    student: "Meron Tadesse",
    email: "meron.tadesse@gmail.com",
    assignmentId: 2,
    submittedAt: "Nov 08, 2026",
    status: "Submitted",
    score: null,
  },
  {
    id: 5,
    student: "Yonas Girma",
    email: "yonas.girma@gmail.com",
    assignmentId: 3,
    submittedAt: "Nov 05, 2026",
    status: "Graded",
    score: 88,
  },
];

const emptyForm = {
  title: "",
  course: "Full Stack Web Development",
  description: "",
  dueDate: "",
  points: 100,
};

export default function TutorAssignments() {
  const [assignments, setAssignments] = useState(initialAssignments);
  const [submissions, setSubmissions] = useState(initialSubmissions);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [activeTab, setActiveTab] = useState("assignments");
  const [showModal, setShowModal] = useState(false);
  const [editingAssignment, setEditingAssignment] = useState(null);
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [selectedSubmission, setSelectedSubmission] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [grade, setGrade] = useState("");

  const publishedCount = assignments.filter(
    (item) => item.status === "Published",
  ).length;

  const totalSubmissions = submissions.length;

  const pendingCount = submissions.filter(
    (item) => item.status === "Submitted",
  ).length;

  const gradedCount = submissions.filter(
    (item) => item.status === "Graded",
  ).length;

  const filteredAssignments = useMemo(() => {
    return assignments.filter((item) => {
      const matchesSearch =
        item.title.toLowerCase().includes(search.toLowerCase()) ||
        item.course.toLowerCase().includes(search.toLowerCase());

      const matchesStatus =
        statusFilter === "All" || item.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [assignments, search, statusFilter]);

  const openCreateModal = () => {
    setEditingAssignment(null);
    setForm(emptyForm);
    setShowModal(true);
  };

  const openEditModal = (assignment) => {
    setEditingAssignment(assignment);
    setForm({
      title: assignment.title,
      course: assignment.course,
      description: assignment.description,
      dueDate: assignment.dueDate,
      points: assignment.points,
    });
    setShowModal(true);
  };

  const handleSaveAssignment = (e) => {
    e.preventDefault();

    if (editingAssignment) {
      setAssignments((current) =>
        current.map((item) =>
          item.id === editingAssignment.id
            ? { ...item, ...form, points: Number(form.points) }
            : item,
        ),
      );
    } else {
      setAssignments((current) => [
        ...current,
        {
          id: Date.now(),
          ...form,
          points: Number(form.points),
          totalStudents: 0,
          submissions: 0,
          status: "Draft",
        },
      ]);
    }

    setShowModal(false);
    setEditingAssignment(null);
    setForm(emptyForm);
  };

  const handleDelete = (id) => {
    if (!window.confirm("Are you sure you want to delete this assignment?")) {
      return;
    }

    setAssignments((current) => current.filter((item) => item.id !== id));

    setSubmissions((current) =>
      current.filter((item) => item.assignmentId !== id),
    );
  };

  const togglePublish = (assignment) => {
    setAssignments((current) =>
      current.map((item) =>
        item.id === assignment.id
          ? {
              ...item,
              status: item.status === "Published" ? "Draft" : "Published",
            }
          : item,
      ),
    );
  };

  const handleGrade = (e) => {
    e.preventDefault();

    const score = Number(grade);
    const assignment = assignments.find(
      (item) => item.id === selectedSubmission.assignmentId,
    );

    if (!Number.isFinite(score) || score < 0 || score > assignment.points) {
      alert(`Enter a score between 0 and ${assignment.points}.`);
      return;
    }

    setSubmissions((current) =>
      current.map((item) =>
        item.id === selectedSubmission.id
          ? { ...item, status: "Graded", score }
          : item,
      ),
    );

    setSelectedSubmission(null);
    setGrade("");
  };

  const getAssignmentSubmissions = (assignmentId) =>
    submissions.filter((item) => item.assignmentId === assignmentId);

  const getAssignment = (id) => assignments.find((item) => item.id === id);

  return (
    <div className="space-y-7">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Assignments</h1>
          <p className="mt-1 text-sm text-slate-500">
            Create assignments, track submissions, and evaluate student work.
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700"
        >
          <Plus size={18} />
          Create Assignment
        </button>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Total Assignments"
          value={assignments.length}
          icon={ClipboardList}
          color="blue"
        />
        <StatCard
          title="Published"
          value={publishedCount}
          icon={BookOpen}
          color="green"
        />
        <StatCard
          title="Submissions"
          value={totalSubmissions}
          icon={FileText}
          color="purple"
        />
        <StatCard
          title="Pending Review"
          value={pendingCount}
          icon={Clock}
          color="orange"
        />
      </div>

      {/* Tabs */}
      <div className="flex gap-6 border-b border-slate-200">
        <button
          onClick={() => setActiveTab("assignments")}
          className={`border-b-2 pb-3 text-sm font-semibold ${
            activeTab === "assignments"
              ? "border-blue-600 text-blue-600"
              : "border-transparent text-slate-500 hover:text-slate-800"
          }`}
        >
          My Assignments ({assignments.length})
        </button>

        <button
          onClick={() => setActiveTab("submissions")}
          className={`border-b-2 pb-3 text-sm font-semibold ${
            activeTab === "submissions"
              ? "border-blue-600 text-blue-600"
              : "border-transparent text-slate-500 hover:text-slate-800"
          }`}
        >
          Student Submissions ({totalSubmissions})
        </button>
      </div>

      {/* Assignment List */}
      {activeTab === "assignments" && (
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="flex flex-col justify-between gap-4 border-b border-slate-100 p-5 sm:flex-row sm:items-center">
            <div>
              <h2 className="text-lg font-bold text-slate-800">
                Assignment List
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Manage your course assignments.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <div className="relative">
                <Search
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search assignments..."
                  className="w-full rounded-xl border border-slate-200 py-2.5 pl-10 pr-4 text-sm outline-none focus:border-blue-500 sm:w-60"
                />
              </div>

              <div className="relative">
                <Filter
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="w-full appearance-none rounded-xl border border-slate-200 bg-white py-2.5 pl-9 pr-8 text-sm outline-none focus:border-blue-500 sm:w-36"
                >
                  <option value="All">All Status</option>
                  <option value="Published">Published</option>
                  <option value="Draft">Draft</option>
                </select>
              </div>
            </div>
          </div>

          <div className="divide-y divide-slate-100">
            {filteredAssignments.length > 0 ? (
              filteredAssignments.map((assignment) => {
                const submitted = getAssignmentSubmissions(
                  assignment.id,
                ).length;

                return (
                  <div
                    key={assignment.id}
                    className="flex flex-col gap-4 p-5 transition hover:bg-slate-50 lg:flex-row lg:items-center"
                  >
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                      <FileText size={23} />
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="font-semibold text-slate-800">
                          {assignment.title}
                        </h3>

                        <span
                          className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                            assignment.status === "Published"
                              ? "bg-green-100 text-green-700"
                              : "bg-slate-100 text-slate-600"
                          }`}
                        >
                          {assignment.status}
                        </span>
                      </div>

                      <p className="mt-1 text-sm text-slate-500">
                        {assignment.course}
                      </p>

                      <div className="mt-3 flex flex-wrap gap-4 text-xs text-slate-500">
                        <span className="flex items-center gap-1.5">
                          <CalendarDays size={14} />
                          Due: {assignment.dueDate}
                        </span>

                        <span className="flex items-center gap-1.5">
                          <Users size={14} />
                          {assignment.totalStudents} students
                        </span>

                        <span className="flex items-center gap-1.5">
                          <FileText size={14} />
                          {submitted} submissions
                        </span>

                        <span className="font-medium text-slate-600">
                          {assignment.points} points
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                      <button
                        onClick={() => setSelectedAssignment(assignment)}
                        className="rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100"
                      >
                        <span className="flex items-center gap-1.5">
                          <Eye size={15} />
                          View
                        </span>
                      </button>

                      <button
                        onClick={() => openEditModal(assignment)}
                        className="rounded-lg border border-slate-200 p-2 text-slate-600 hover:bg-slate-100"
                        aria-label="Edit assignment"
                      >
                        <Edit size={17} />
                      </button>

                      <button
                        onClick={() => togglePublish(assignment)}
                        className="rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50"
                      >
                        {assignment.status === "Published"
                          ? "Unpublish"
                          : "Publish"}
                      </button>

                      <button
                        onClick={() => handleDelete(assignment.id)}
                        className="rounded-lg p-2 text-red-500 hover:bg-red-50"
                        aria-label="Delete assignment"
                      >
                        <Trash2 size={17} />
                      </button>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="p-12 text-center text-sm text-slate-500">
                No assignments found.
              </div>
            )}
          </div>
        </div>
      )}

      {/* Student Submissions */}
      {activeTab === "submissions" && (
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-100 p-5">
            <h2 className="text-lg font-bold text-slate-800">
              Student Submissions
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Review submitted assignments and provide grades.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[750px] text-left">
              <thead className="bg-slate-50 text-xs uppercase text-slate-500">
                <tr>
                  <th className="px-6 py-4">Student</th>
                  <th className="px-6 py-4">Assignment</th>
                  <th className="px-6 py-4">Submitted</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Score</th>
                  <th className="px-6 py-4">Action</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {submissions.map((submission) => {
                  const assignment = getAssignment(submission.assignmentId);

                  if (!assignment) return null;

                  return (
                    <tr key={submission.id}>
                      <td className="px-6 py-4">
                        <p className="font-semibold text-slate-800">
                          {submission.student}
                        </p>
                        <p className="text-xs text-slate-500">
                          {submission.email}
                        </p>
                      </td>

                      <td className="px-6 py-4 text-sm text-slate-700">
                        {assignment.title}
                      </td>

                      <td className="px-6 py-4 text-sm text-slate-500">
                        {submission.submittedAt}
                      </td>

                      <td className="px-6 py-4">
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-semibold ${
                            submission.status === "Graded"
                              ? "bg-green-100 text-green-700"
                              : "bg-orange-100 text-orange-700"
                          }`}
                        >
                          {submission.status}
                        </span>
                      </td>

                      <td className="px-6 py-4 text-sm font-semibold text-slate-700">
                        {submission.score === null
                          ? "Not graded"
                          : `${submission.score}/${assignment.points}`}
                      </td>

                      <td className="px-6 py-4">
                        <button
                          onClick={() => {
                            setSelectedSubmission(submission);
                            setGrade(
                              submission.score === null
                                ? ""
                                : String(submission.score),
                            );
                          }}
                          className="rounded-lg bg-blue-50 px-3 py-2 text-sm font-semibold text-blue-700 hover:bg-blue-100"
                        >
                          {submission.status === "Graded"
                            ? "View Grade"
                            : "Review"}
                        </button>
                      </td>
                    </tr>
                  );
                })}

                {submissions.length === 0 && (
                  <tr>
                    <td
                      colSpan="6"
                      className="px-6 py-12 text-center text-sm text-slate-500"
                    >
                      No submissions yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="border-t border-slate-100 px-6 py-4 text-sm text-slate-500">
            {gradedCount} graded · {pendingCount} awaiting review
          </div>
        </div>
      )}

      {/* Create / Edit Assignment Modal */}
      {showModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4"
          onClick={() => setShowModal(false)}
        >
          <form
            onSubmit={handleSaveAssignment}
            onClick={(e) => e.stopPropagation()}
            className="max-h-[90vh] w-full max-w-lg space-y-4 overflow-y-auto rounded-2xl bg-white p-6 shadow-xl"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-slate-800">
                {editingAssignment ? "Edit Assignment" : "Create Assignment"}
              </h2>

              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"
              >
                <X size={20} />
              </button>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Assignment Title
              </label>
              <input
                required
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                placeholder="Enter assignment title"
                className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Course
              </label>
              <select
                value={form.course}
                onChange={(e) => setForm({ ...form, course: e.target.value })}
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-blue-500"
              >
                <option>Full Stack Web Development</option>
                <option>React.js for Beginners</option>
                <option>Python Programming</option>
                <option>Database Management</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Description / Instructions
              </label>
              <textarea
                required
                rows="4"
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
                placeholder="Describe what students need to complete..."
                className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Due Date
                </label>
                <input
                  type="date"
                  required
                  min={new Date().toISOString().split("T")[0]}
                  value={form.dueDate}
                  onChange={(e) =>
                    setForm({ ...form, dueDate: e.target.value })
                  }
                  className="w-full rounded-xl border border-slate-200 px-3 py-3 text-sm outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Total Points
                </label>
                <input
                  type="number"
                  required
                  min="1"
                  value={form.points}
                  onChange={(e) => setForm({ ...form, points: e.target.value })}
                  className="w-full rounded-xl border border-slate-200 px-3 py-3 text-sm outline-none focus:border-blue-500"
                />
              </div>
            </div>

            <button
              type="submit"
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 py-3 font-semibold text-white hover:bg-blue-700"
            >
              <Send size={17} />
              {editingAssignment ? "Save Changes" : "Create Assignment"}
            </button>
          </form>
        </div>
      )}

      {/* Assignment Details Modal */}
      {selectedAssignment && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4"
          onClick={() => setSelectedAssignment(null)}
        >
          <div
            className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-xl font-bold text-slate-800">
                Assignment Details
              </h2>
              <button
                onClick={() => setSelectedAssignment(null)}
                className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"
              >
                <X size={20} />
              </button>
            </div>

            <h3 className="text-lg font-bold text-slate-800">
              {selectedAssignment.title}
            </h3>

            <p className="mt-1 text-sm text-blue-600">
              {selectedAssignment.course}
            </p>

            <p className="mt-4 text-sm leading-6 text-slate-600">
              {selectedAssignment.description}
            </p>

            <div className="mt-6 grid grid-cols-2 gap-4">
              <DetailItem
                icon={CalendarDays}
                label="Due Date"
                value={selectedAssignment.dueDate}
              />
              <DetailItem
                icon={Users}
                label="Students"
                value={selectedAssignment.totalStudents}
              />
              <DetailItem
                icon={FileText}
                label="Submissions"
                value={getAssignmentSubmissions(selectedAssignment.id).length}
              />
              <DetailItem
                icon={CheckCircle}
                label="Total Points"
                value={selectedAssignment.points}
              />
            </div>

            <button
              onClick={() => {
                setActiveTab("submissions");
                setSelectedAssignment(null);
              }}
              className="mt-7 w-full rounded-xl bg-blue-600 py-3 font-semibold text-white hover:bg-blue-700"
            >
              View Submissions
            </button>
          </div>
        </div>
      )}

      {/* Grade Submission Modal */}
      {selectedSubmission && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4"
          onClick={() => setSelectedSubmission(null)}
        >
          <form
            onSubmit={handleGrade}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md space-y-5 rounded-2xl bg-white p-6 shadow-xl"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-slate-800">
                Review Submission
              </h2>
              <button
                type="button"
                onClick={() => setSelectedSubmission(null)}
                className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"
              >
                <X size={20} />
              </button>
            </div>

            <div className="rounded-xl bg-slate-50 p-4">
              <p className="font-semibold text-slate-800">
                {selectedSubmission.student}
              </p>
              <p className="mt-1 text-sm text-slate-500">
                {getAssignment(selectedSubmission.assignmentId)?.title}
              </p>
              <p className="mt-2 text-xs text-slate-500">
                Submitted: {selectedSubmission.submittedAt}
              </p>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Score (Maximum:{" "}
                {getAssignment(selectedSubmission.assignmentId)?.points})
              </label>
              <input
                type="number"
                required
                min="0"
                max={getAssignment(selectedSubmission.assignmentId)?.points}
                value={grade}
                onChange={(e) => setGrade(e.target.value)}
                placeholder="Enter student score"
                className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-500"
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-xl bg-blue-600 py-3 font-semibold text-white hover:bg-blue-700"
            >
              Save Grade
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

function StatCard({ title, value, icon: Icon, color }) {
  const colors = {
    blue: "bg-blue-50 text-blue-600",
    green: "bg-green-50 text-green-600",
    purple: "bg-purple-50 text-purple-600",
    orange: "bg-orange-50 text-orange-600",
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-slate-500">{title}</p>
        <div className={`rounded-xl p-3 ${colors[color]}`}>
          <Icon size={21} />
        </div>
      </div>
      <h3 className="mt-4 text-2xl font-bold text-slate-800">{value}</h3>
    </div>
  );
}

function DetailItem({ icon: Icon, label, value }) {
  return (
    <div className="rounded-xl bg-slate-50 p-3">
      <div className="mb-2 flex items-center gap-2 text-slate-500">
        <Icon size={16} />
        <span className="text-xs">{label}</span>
      </div>
      <p className="text-sm font-semibold text-slate-800">{value}</p>
    </div>
  );
}
