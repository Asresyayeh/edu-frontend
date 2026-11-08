import { useMemo, useState } from "react";
import {
  Users,
  Search,
  Plus,
  GraduationCap,
  BookOpen,
  TrendingUp,
  CalendarDays,
  Mail,
  Phone,
  MapPin,
  X,
  Eye,
  Edit,
  Trash2,
  CheckCircle,
  Clock,
  UserRound,
  Award,
} from "lucide-react";

const initialChildren = [
  {
    id: 1,
    name: "Abel Asres",
    grade: "Grade 9",
    age: 15,
    gender: "Male",
    school: "School of Tomorrow",
    email: "abel.asres@example.com",
    phone: "+251 912 345 678",
    location: "Addis Ababa",
    enrolledCourses: 2,
    completedCourses: 1,
    progress: 75,
    attendance: 92,
    status: "Active",
    courses: [
      { name: "Mathematics", progress: 85, tutor: "Abebe Kebede" },
      { name: "Physics", progress: 65, tutor: "Meron Tadesse" },
    ],
  },
  {
    id: 2,
    name: "Sara Asres",
    grade: "Grade 7",
    age: 13,
    gender: "Female",
    school: "School of Tomorrow",
    email: "sara.asres@example.com",
    phone: "+251 911 234 567",
    location: "Addis Ababa",
    enrolledCourses: 2,
    completedCourses: 1,
    progress: 68,
    attendance: 88,
    status: "Active",
    courses: [
      { name: "English", progress: 90, tutor: "Hana Mohammed" },
      { name: "Biology", progress: 45, tutor: "Dawit Alemu" },
    ],
  },
];

export default function ParentChildren() {
  const [children, setChildren] = useState(initialChildren);
  const [searchTerm, setSearchTerm] = useState("");
  const [gradeFilter, setGradeFilter] = useState("All");
  const [selectedChild, setSelectedChild] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingChild, setEditingChild] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    grade: "Grade 7",
    age: "",
    school: "School of Tomorrow",
    email: "",
    phone: "",
    location: "Addis Ababa",
  });

  const filteredChildren = useMemo(() => {
    return children.filter((child) => {
      const matchesSearch =
        child.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        child.grade.toLowerCase().includes(searchTerm.toLowerCase()) ||
        child.school.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesGrade = gradeFilter === "All" || child.grade === gradeFilter;

      return matchesSearch && matchesGrade;
    });
  }, [children, searchTerm, gradeFilter]);

  const resetForm = () => {
    setFormData({
      name: "",
      grade: "Grade 7",
      age: "",
      school: "School of Tomorrow",
      email: "",
      phone: "",
      location: "Addis Ababa",
    });
    setEditingChild(null);
  };

  const openAddModal = () => {
    resetForm();
    setShowAddModal(true);
  };

  const openEditModal = (child) => {
    setEditingChild(child);
    setFormData({
      name: child.name,
      grade: child.grade,
      age: String(child.age),
      school: child.school,
      email: child.email,
      phone: child.phone,
      location: child.location,
    });
    setShowAddModal(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editingChild) {
      setChildren((prev) =>
        prev.map((child) =>
          child.id === editingChild.id
            ? { ...child, ...formData, age: Number(formData.age) }
            : child,
        ),
      );
    } else {
      const newChild = {
        id: Date.now(),
        ...formData,
        age: Number(formData.age),
        enrolledCourses: 0,
        completedCourses: 0,
        progress: 0,
        attendance: 0,
        status: "Active",
        courses: [],
        gender: "Not specified",
      };

      setChildren((prev) => [...prev, newChild]);
    }

    setShowAddModal(false);
    resetForm();
  };

  const deleteChild = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to remove this child from the demo list?",
    );

    if (!confirmed) return;

    setChildren((prev) => prev.filter((child) => child.id !== id));

    if (selectedChild?.id === id) {
      setSelectedChild(null);
    }
  };

  const totalCourses = children.reduce(
    (total, child) => total + child.enrolledCourses,
    0,
  );

  const averageProgress =
    children.length > 0
      ? Math.round(
          children.reduce((total, child) => total + child.progress, 0) /
            children.length,
        )
      : 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Children</h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage your children's profiles and monitor their learning.
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="flex items-center justify-center gap-2 rounded-xl bg-brand-800 px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-900"
        >
          <Plus size={18} />
          Add Child
        </button>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Total Children"
          value={children.length}
          icon={Users}
          color="bg-blue-100 text-blue-600"
        />

        <StatCard
          title="Enrolled Courses"
          value={totalCourses}
          icon={BookOpen}
          color="bg-purple-100 text-purple-600"
        />

        <StatCard
          title="Average Progress"
          value={`${averageProgress}%`}
          icon={TrendingUp}
          color="bg-green-100 text-green-600"
        />

        <StatCard
          title="Active Children"
          value={children.filter((child) => child.status === "Active").length}
          icon={GraduationCap}
          color="bg-orange-100 text-orange-600"
        />
      </div>

      {/* Search and filters */}
      <div className="flex flex-col gap-3 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm sm:flex-row">
        <div className="relative flex-1">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            placeholder="Search children by name, grade or school..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-xl border border-gray-200 py-3 pl-10 pr-4 text-sm outline-none focus:border-brand-600"
          />
        </div>

        <select
          value={gradeFilter}
          onChange={(e) => setGradeFilter(e.target.value)}
          className="rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-brand-600"
        >
          <option value="All">All Grades</option>
          {Array.from({ length: 12 }, (_, i) => `Grade ${i + 1}`).map(
            (grade) => (
              <option key={grade} value={grade}>
                {grade}
              </option>
            ),
          )}
        </select>
      </div>

      {/* Children cards */}
      {filteredChildren.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
          {filteredChildren.map((child) => (
            <div
              key={child.id}
              className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition hover:shadow-md"
            >
              <div className="flex items-start justify-between border-b border-gray-100 p-5">
                <div className="flex items-center gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-100 text-brand-800">
                    <UserRound size={28} />
                  </div>

                  <div>
                    <h2 className="font-bold text-gray-900">{child.name}</h2>
                    <p className="mt-1 text-sm text-gray-500">
                      {child.grade} · {child.age} years old
                    </p>
                    <span className="mt-2 inline-flex rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-700">
                      {child.status}
                    </span>
                  </div>
                </div>

                <div className="flex gap-1">
                  <button
                    onClick={() => openEditModal(child)}
                    title="Edit child"
                    className="rounded-lg p-2 text-gray-400 hover:bg-gray-100 hover:text-brand-800"
                  >
                    <Edit size={17} />
                  </button>
                  <button
                    onClick={() => deleteChild(child.id)}
                    title="Remove child"
                    className="rounded-lg p-2 text-gray-400 hover:bg-red-50 hover:text-red-600"
                  >
                    <Trash2 size={17} />
                  </button>
                </div>
              </div>

              <div className="space-y-4 p-5">
                <div className="grid grid-cols-2 gap-3">
                  <InfoItem
                    icon={GraduationCap}
                    label="School"
                    value={child.school}
                  />
                  <InfoItem
                    icon={MapPin}
                    label="Location"
                    value={child.location}
                  />
                  <InfoItem icon={Mail} label="Email" value={child.email} />
                  <InfoItem icon={Phone} label="Phone" value={child.phone} />
                </div>

                <div className="border-t border-gray-100 pt-4">
                  <div className="mb-2 flex items-center justify-between">
                    <h3 className="text-sm font-semibold text-gray-800">
                      Overall Learning Progress
                    </h3>
                    <span className="text-sm font-bold text-brand-800">
                      {child.progress}%
                    </span>
                  </div>

                  <div className="h-2.5 overflow-hidden rounded-full bg-gray-100">
                    <div
                      className="h-full rounded-full bg-brand-700"
                      style={{ width: `${child.progress}%` }}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 rounded-xl bg-gray-50 p-3 text-center">
                  <div>
                    <p className="text-lg font-bold text-gray-900">
                      {child.enrolledCourses}
                    </p>
                    <p className="text-xs text-gray-500">Courses</p>
                  </div>
                  <div>
                    <p className="text-lg font-bold text-gray-900">
                      {child.completedCourses}
                    </p>
                    <p className="text-xs text-gray-500">Completed</p>
                  </div>
                  <div>
                    <p className="text-lg font-bold text-gray-900">
                      {child.attendance}%
                    </p>
                    <p className="text-xs text-gray-500">Attendance</p>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedChild(child)}
                  className="flex w-full items-center justify-center gap-2 rounded-xl border border-brand-800 py-3 text-sm font-semibold text-brand-800 transition hover:bg-brand-50"
                >
                  <Eye size={17} />
                  View Child Details
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-gray-100 bg-white p-12 text-center shadow-sm">
          <Users className="mx-auto mb-3 text-gray-300" size={40} />
          <h3 className="font-semibold text-gray-800">No children found</h3>
          <p className="mt-1 text-sm text-gray-500">
            Try changing your search or grade filter.
          </p>
        </div>
      )}

      {/* Child details modal */}
      {selectedChild && (
        <Modal onClose={() => setSelectedChild(null)}>
          <div className="border-b border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900">Child Details</h2>
              <button
                onClick={() => setSelectedChild(null)}
                className="rounded-lg p-2 text-gray-400 hover:bg-gray-100"
              >
                <X size={20} />
              </button>
            </div>
          </div>

          <div className="space-y-6 p-6">
            <div className="flex items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-100 text-brand-800">
                <GraduationCap size={32} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900">
                  {selectedChild.name}
                </h3>
                <p className="text-sm text-gray-500">
                  {selectedChild.grade} · {selectedChild.age} years old
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <DetailItem label="School" value={selectedChild.school} />
              <DetailItem label="Gender" value={selectedChild.gender} />
              <DetailItem label="Email" value={selectedChild.email} />
              <DetailItem label="Phone" value={selectedChild.phone} />
              <DetailItem label="Location" value={selectedChild.location} />
              <DetailItem
                label="Attendance"
                value={`${selectedChild.attendance}%`}
              />
            </div>

            <div>
              <h3 className="mb-3 font-bold text-gray-900">Enrolled Courses</h3>

              {selectedChild.courses.length > 0 ? (
                <div className="space-y-4">
                  {selectedChild.courses.map((course, index) => (
                    <div
                      key={index}
                      className="rounded-xl border border-gray-100 p-4"
                    >
                      <div className="flex items-center justify-between gap-3">
                        <h4 className="text-sm font-semibold text-gray-800">
                          {course.name}
                        </h4>
                        <span className="text-sm font-bold text-brand-800">
                          {course.progress}%
                        </span>
                      </div>
                      <p className="mt-1 text-xs text-gray-500">
                        Tutor: {course.tutor}
                      </p>
                      <div className="mt-3 h-2 overflow-hidden rounded-full bg-gray-100">
                        <div
                          className="h-full rounded-full bg-brand-700"
                          style={{ width: `${course.progress}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="rounded-xl bg-gray-50 p-4 text-sm text-gray-500">
                  No courses enrolled yet.
                </p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-3">
              <DetailStat
                icon={BookOpen}
                label="Enrolled Courses"
                value={selectedChild.enrolledCourses}
              />
              <DetailStat
                icon={Award}
                label="Completed Courses"
                value={selectedChild.completedCourses}
              />
            </div>
          </div>
        </Modal>
      )}

      {/* Add / Edit child modal */}
      {showAddModal && (
        <Modal onClose={() => setShowAddModal(false)}>
          <div className="flex items-center justify-between border-b border-gray-100 p-6">
            <div>
              <h2 className="text-xl font-bold text-gray-900">
                {editingChild ? "Edit Child" : "Add New Child"}
              </h2>
              <p className="mt-1 text-sm text-gray-500">
                Enter the child's information below.
              </p>
            </div>
            <button
              onClick={() => setShowAddModal(false)}
              className="rounded-lg p-2 text-gray-400 hover:bg-gray-100"
            >
              <X size={20} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 p-6">
            <FormInput
              label="Full Name"
              value={formData.name}
              onChange={(value) => setFormData({ ...formData, name: value })}
              required
            />

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Grade
                </label>
                <select
                  value={formData.grade}
                  onChange={(e) =>
                    setFormData({ ...formData, grade: e.target.value })
                  }
                  className="w-full rounded-xl border border-gray-200 px-3 py-3 text-sm outline-none focus:border-brand-600"
                >
                  {Array.from({ length: 12 }, (_, i) => `Grade ${i + 1}`).map(
                    (grade) => (
                      <option key={grade}>{grade}</option>
                    ),
                  )}
                </select>
              </div>

              <FormInput
                label="Age"
                type="number"
                value={formData.age}
                onChange={(value) => setFormData({ ...formData, age: value })}
                required
              />
            </div>

            <FormInput
              label="School"
              value={formData.school}
              onChange={(value) => setFormData({ ...formData, school: value })}
              required
            />

            <FormInput
              label="Email Address"
              type="email"
              value={formData.email}
              onChange={(value) => setFormData({ ...formData, email: value })}
            />

            <FormInput
              label="Phone Number"
              value={formData.phone}
              onChange={(value) => setFormData({ ...formData, phone: value })}
            />

            <FormInput
              label="Location"
              value={formData.location}
              onChange={(value) =>
                setFormData({ ...formData, location: value })
              }
            />

            <div className="flex flex-col-reverse gap-3 pt-3 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="rounded-xl border border-gray-200 px-5 py-3 text-sm font-semibold text-gray-600 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="rounded-xl bg-brand-800 px-5 py-3 text-sm font-semibold text-white hover:bg-brand-900"
              >
                {editingChild ? "Save Changes" : "Add Child"}
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}

function StatCard({ title, value, icon: Icon, color }) {
  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
      <div
        className={`mb-4 flex h-11 w-11 items-center justify-center rounded-xl ${color}`}
      >
        <Icon size={22} />
      </div>
      <p className="text-sm text-gray-500">{title}</p>
      <h3 className="mt-1 text-2xl font-bold text-gray-900">{value}</h3>
    </div>
  );
}

function InfoItem({ icon: Icon, label, value }) {
  return (
    <div className="flex min-w-0 items-start gap-2">
      <Icon size={16} className="mt-0.5 shrink-0 text-gray-400" />
      <div className="min-w-0">
        <p className="text-xs text-gray-400">{label}</p>
        <p className="truncate text-sm font-medium text-gray-700">
          {value || "Not provided"}
        </p>
      </div>
    </div>
  );
}

function DetailItem({ label, value }) {
  return (
    <div className="rounded-xl bg-gray-50 p-3">
      <p className="text-xs text-gray-400">{label}</p>
      <p className="mt-1 break-words text-sm font-semibold text-gray-800">
        {value || "Not provided"}
      </p>
    </div>
  );
}

function DetailStat({ icon: Icon, label, value }) {
  return (
    <div className="flex items-center gap-3 rounded-xl bg-brand-50 p-4">
      <Icon size={22} className="text-brand-800" />
      <div>
        <p className="text-lg font-bold text-gray-900">{value}</p>
        <p className="text-xs text-gray-500">{label}</p>
      </div>
    </div>
  );
}

function FormInput({ label, value, onChange, type = "text", required }) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        type={type}
        value={value}
        required={required}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-brand-600 focus:ring-2 focus:ring-brand-100"
      />
    </div>
  );
}

function Modal({ children, onClose }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white shadow-xl">
        {children}
      </div>
    </div>
  );
}
