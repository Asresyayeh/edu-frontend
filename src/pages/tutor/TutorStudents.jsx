import { useMemo, useState } from "react";
import {
  Users,
  Search,
  Filter,
  Mail,
  Phone,
  BookOpen,
  TrendingUp,
  MoreVertical,
  Eye,
  MessageSquare,
  X,
  GraduationCap,
  CalendarDays,
  CheckCircle,
} from "lucide-react";

const initialStudents = [
  {
    id: 1,
    name: "Abel Asres",
    email: "abel.asres@gmail.com",
    phone: "+251 911 234 567",
    course: "Full Stack Web Development",
    progress: 85,
    enrolled: "Oct 12, 2026",
    status: "Active",
    completedLessons: 27,
    totalLessons: 32,
    grade: "A",
    avatar: "AA",
  },
  {
    id: 2,
    name: "Sara Bekele",
    email: "sara.bekele@gmail.com",
    phone: "+251 912 345 678",
    course: "React.js for Beginners",
    progress: 65,
    enrolled: "Oct 15, 2026",
    status: "Active",
    completedLessons: 13,
    totalLessons: 20,
    grade: "B+",
    avatar: "SB",
  },
  {
    id: 3,
    name: "Dawit Alemu",
    email: "dawit.alemu@gmail.com",
    phone: "+251 913 456 789",
    course: "Python Programming",
    progress: 40,
    enrolled: "Oct 20, 2026",
    status: "Active",
    completedLessons: 11,
    totalLessons: 28,
    grade: "B",
    avatar: "DA",
  },
  {
    id: 4,
    name: "Meron Tadesse",
    email: "meron.tadesse@gmail.com",
    phone: "+251 914 567 890",
    course: "Full Stack Web Development",
    progress: 100,
    enrolled: "Sep 20, 2026",
    status: "Completed",
    completedLessons: 32,
    totalLessons: 32,
    grade: "A+",
    avatar: "MT",
  },
  {
    id: 5,
    name: "Yonas Girma",
    email: "yonas.girma@gmail.com",
    phone: "+251 915 678 901",
    course: "Database Management",
    progress: 20,
    enrolled: "Nov 01, 2026",
    status: "Active",
    completedLessons: 4,
    totalLessons: 18,
    grade: "C+",
    avatar: "YG",
  },
  {
    id: 6,
    name: "Hana Mohammed",
    email: "hana.mohammed@gmail.com",
    phone: "+251 916 789 012",
    course: "Python Programming",
    progress: 0,
    enrolled: "Nov 05, 2026",
    status: "Inactive",
    completedLessons: 0,
    totalLessons: 28,
    grade: "-",
    avatar: "HM",
  },
];

const statusStyles = {
  Active: "bg-green-100 text-green-700",
  Completed: "bg-blue-100 text-blue-700",
  Inactive: "bg-slate-100 text-slate-600",
};

export default function TutorStudents() {
  const [students, setStudents] = useState(initialStudents);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [menuStudent, setMenuStudent] = useState(null);

  const filteredStudents = useMemo(() => {
    return students.filter((student) => {
      const matchesSearch =
        student.name.toLowerCase().includes(search.toLowerCase()) ||
        student.email.toLowerCase().includes(search.toLowerCase()) ||
        student.course.toLowerCase().includes(search.toLowerCase());

      const matchesStatus =
        statusFilter === "All" || student.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [students, search, statusFilter]);

  const activeCount = students.filter(
    (student) => student.status === "Active",
  ).length;

  const completedCount = students.filter(
    (student) => student.status === "Completed",
  ).length;

  const averageProgress = students.length
    ? Math.round(
        students.reduce((sum, student) => sum + student.progress, 0) /
          students.length,
      )
    : 0;

  const handleRemove = (id) => {
    if (window.confirm("Are you sure you want to remove this student?")) {
      setStudents((current) => current.filter((student) => student.id !== id));
      setMenuStudent(null);
    }
  };

  return (
    <div className="space-y-7">
      {/* Page Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">My Students</h1>
          <p className="mt-1 text-sm text-slate-500">
            Manage your students and monitor their learning progress.
          </p>
        </div>

        <div className="flex items-center gap-2 rounded-xl bg-blue-50 px-4 py-3 text-sm font-medium text-blue-700">
          <Users size={18} />
          {students.length} Total Students
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Total Students"
          value={students.length}
          icon={Users}
          color="blue"
        />
        <StatCard
          title="Active Students"
          value={activeCount}
          icon={GraduationCap}
          color="green"
        />
        <StatCard
          title="Completed Students"
          value={completedCount}
          icon={CheckCircle}
          color="purple"
        />
        <StatCard
          title="Average Progress"
          value={`${averageProgress}%`}
          icon={TrendingUp}
          color="orange"
        />
      </div>

      {/* Students Table */}
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="flex flex-col gap-4 border-b border-slate-100 p-5 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-800">
              Student Directory
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              View and manage students enrolled in your courses.
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
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search students..."
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
                className="w-full appearance-none rounded-xl border border-slate-200 bg-white py-2.5 pl-9 pr-8 text-sm outline-none focus:border-blue-500 sm:w-40"
              >
                <option value="All">All Students</option>
                <option value="Active">Active</option>
                <option value="Completed">Completed</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[850px] text-left">
            <thead className="bg-slate-50 text-xs uppercase text-slate-500">
              <tr>
                <th className="px-6 py-4 font-semibold">Student</th>
                <th className="px-6 py-4 font-semibold">Course</th>
                <th className="px-6 py-4 font-semibold">Progress</th>
                <th className="px-6 py-4 font-semibold">Grade</th>
                <th className="px-6 py-4 font-semibold">Status</th>
                <th className="px-6 py-4 font-semibold">Action</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {filteredStudents.map((student) => (
                <tr key={student.id} className="transition hover:bg-slate-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-sm font-bold text-blue-700">
                        {student.avatar}
                      </div>
                      <div>
                        <p className="font-semibold text-slate-800">
                          {student.name}
                        </p>
                        <p className="text-xs text-slate-500">
                          {student.email}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    <p className="max-w-48 text-sm font-medium text-slate-700">
                      {student.course}
                    </p>
                  </td>

                  <td className="px-6 py-4">
                    <div className="w-32">
                      <div className="mb-1 flex justify-between text-xs">
                        <span className="text-slate-500">
                          {student.completedLessons}/{student.totalLessons}{" "}
                          lessons
                        </span>
                        <span className="font-semibold text-slate-700">
                          {student.progress}%
                        </span>
                      </div>
                      <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                        <div
                          className="h-full rounded-full bg-blue-600"
                          style={{ width: `${student.progress}%` }}
                        />
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    <span className="font-semibold text-slate-700">
                      {student.grade}
                    </span>
                  </td>

                  <td className="px-6 py-4">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${statusStyles[student.status]}`}
                    >
                      {student.status}
                    </span>
                  </td>

                  <td className="relative px-6 py-4">
                    <button
                      onClick={() =>
                        setMenuStudent(
                          menuStudent === student.id ? null : student.id,
                        )
                      }
                      className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"
                    >
                      <MoreVertical size={19} />
                    </button>

                    {menuStudent === student.id && (
                      <div className="absolute right-8 top-12 z-20 w-44 rounded-xl border border-slate-200 bg-white p-2 shadow-xl">
                        <button
                          onClick={() => {
                            setSelectedStudent(student);
                            setMenuStudent(null);
                          }}
                          className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-slate-700 hover:bg-slate-50"
                        >
                          <Eye size={16} /> View Details
                        </button>

                        <button
                          onClick={() => {
                            window.location.href = `/tutor/messages?student=${student.id}`;
                          }}
                          className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-slate-700 hover:bg-slate-50"
                        >
                          <MessageSquare size={16} /> Send Message
                        </button>

                        <button
                          onClick={() => handleRemove(student.id)}
                          className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-red-600 hover:bg-red-50"
                        >
                          <X size={16} /> Remove Student
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}

              {filteredStudents.length === 0 && (
                <tr>
                  <td
                    colSpan="6"
                    className="px-6 py-12 text-center text-sm text-slate-500"
                  >
                    No students found. Try another search or filter.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="border-t border-slate-100 px-6 py-4 text-sm text-slate-500">
          Showing {filteredStudents.length} of {students.length} students
        </div>
      </div>

      {/* Student Details Modal */}
      {selectedStudent && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4"
          onClick={() => setSelectedStudent(null)}
        >
          <div
            className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-xl font-bold text-slate-800">
                Student Details
              </h2>
              <button
                onClick={() => setSelectedStudent(null)}
                className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"
              >
                <X size={20} />
              </button>
            </div>

            <div className="mb-6 flex items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 text-xl font-bold text-blue-700">
                {selectedStudent.avatar}
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-800">
                  {selectedStudent.name}
                </h3>
                <p className="text-sm text-slate-500">
                  {selectedStudent.email}
                </p>
                <span
                  className={`mt-2 inline-block rounded-full px-3 py-1 text-xs font-semibold ${statusStyles[selectedStudent.status]}`}
                >
                  {selectedStudent.status}
                </span>
              </div>
            </div>

            <div className="space-y-4 text-sm">
              <DetailRow
                icon={BookOpen}
                label="Enrolled Course"
                value={selectedStudent.course}
              />
              <DetailRow
                icon={Phone}
                label="Phone"
                value={selectedStudent.phone}
              />
              <DetailRow
                icon={CalendarDays}
                label="Enrollment Date"
                value={selectedStudent.enrolled}
              />
              <DetailRow
                icon={GraduationCap}
                label="Lessons Completed"
                value={`${selectedStudent.completedLessons} of ${selectedStudent.totalLessons}`}
              />
              <DetailRow
                icon={TrendingUp}
                label="Learning Progress"
                value={`${selectedStudent.progress}%`}
              />
              <DetailRow
                icon={CheckCircle}
                label="Grade"
                value={selectedStudent.grade}
              />
            </div>

            <button
              onClick={() => setSelectedStudent(null)}
              className="mt-7 w-full rounded-xl bg-blue-600 py-3 font-semibold text-white hover:bg-blue-700"
            >
              Close Details
            </button>
          </div>
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

function DetailRow({ icon: Icon, label, value }) {
  return (
    <div className="flex items-start gap-3">
      <div className="rounded-lg bg-slate-100 p-2 text-slate-500">
        <Icon size={17} />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-xs text-slate-500">{label}</p>
        <p className="mt-1 break-words font-medium text-slate-800">{value}</p>
      </div>
    </div>
  );
}
