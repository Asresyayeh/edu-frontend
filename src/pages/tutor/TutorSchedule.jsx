import { useMemo, useState } from "react";
import {
  CalendarDays,
  Clock,
  Users,
  BookOpen,
  ChevronLeft,
  ChevronRight,
  Video,
  MapPin,
  Plus,
  MoreVertical,
  X,
  CheckCircle,
  AlertCircle,
  CalendarCheck,
} from "lucide-react";

const initialClasses = [
  {
    id: 1,
    title: "React.js Advanced Concepts",
    course: "Full Stack Web Development",
    dayOffset: 0,
    start: "09:00 AM",
    end: "10:30 AM",
    students: 18,
    type: "Online",
    status: "Upcoming",
    color: "blue",
    description:
      "Advanced React hooks, context API, and performance optimization.",
  },
  {
    id: 2,
    title: "Introduction to UI Design",
    course: "React.js for Beginners",
    dayOffset: 1,
    start: "10:00 AM",
    end: "11:30 AM",
    students: 14,
    type: "Online",
    status: "Upcoming",
    color: "purple",
    description:
      "Learn design principles, layouts, and user-friendly interfaces.",
  },
  {
    id: 3,
    title: "Python Functions and Modules",
    course: "Python Programming",
    dayOffset: 2,
    start: "02:00 PM",
    end: "03:30 PM",
    students: 22,
    type: "Online",
    status: "Completed",
    color: "green",
    description: "Functions, parameters, modules, and reusable Python code.",
  },
  {
    id: 4,
    title: "Database Relationships",
    course: "Database Management",
    dayOffset: 3,
    start: "09:00 AM",
    end: "10:00 AM",
    students: 16,
    type: "Online",
    status: "Upcoming",
    color: "orange",
    description: "Understand database relationships and SQL joins.",
  },
  {
    id: 5,
    title: "React Project Practice",
    course: "Full Stack Web Development",
    dayOffset: 4,
    start: "03:00 PM",
    end: "04:30 PM",
    students: 18,
    type: "Online",
    status: "Upcoming",
    color: "blue",
    description: "Practical project development and student discussion.",
  },
  {
    id: 6,
    title: "Python Weekly Review",
    course: "Python Programming",
    dayOffset: 5,
    start: "11:00 AM",
    end: "12:00 PM",
    students: 22,
    type: "Online",
    status: "Upcoming",
    color: "green",
    description: "Review weekly topics and answer student questions.",
  },
];

const colorStyles = {
  blue: "bg-blue-50 border-blue-200 text-blue-700",
  purple: "bg-purple-50 border-purple-200 text-purple-700",
  green: "bg-green-50 border-green-200 text-green-700",
  orange: "bg-orange-50 border-orange-200 text-orange-700",
};

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

function getMonday(date) {
  const result = new Date(date);
  const day = result.getDay();
  result.setDate(result.getDate() - (day === 0 ? 6 : day - 1));
  result.setHours(0, 0, 0, 0);
  return result;
}

function formatDate(date) {
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
}

export default function TutorSchedule() {
  const [classes, setClasses] = useState(initialClasses);
  const [weekOffset, setWeekOffset] = useState(0);
  const [selectedDay, setSelectedDay] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedClass, setSelectedClass] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);

  const [newClass, setNewClass] = useState({
    title: "",
    course: "Full Stack Web Development",
    dayOffset: 0,
    start: "09:00 AM",
    end: "10:00 AM",
    students: 0,
    type: "Online",
    description: "",
  });

  const monday = useMemo(() => {
    const date = getMonday(new Date());
    date.setDate(date.getDate() + weekOffset * 7);
    return date;
  }, [weekOffset]);

  const weekDates = useMemo(
    () =>
      days.map((day, index) => {
        const date = new Date(monday);
        date.setDate(monday.getDate() + index);
        return { day, date, dateNumber: date.getDate() };
      }),
    [monday],
  );

  const getClassDate = (item) => {
    const date = new Date(monday);
    date.setDate(monday.getDate() + item.dayOffset);
    return date;
  };

  const filteredClasses = classes.filter((item) => {
    const matchesDay =
      selectedDay === "All" || days[item.dayOffset] === selectedDay;

    const matchesStatus =
      statusFilter === "All" || item.status === statusFilter;

    return matchesDay && matchesStatus;
  });

  const upcomingCount = classes.filter(
    (item) => item.status === "Upcoming",
  ).length;

  const completedCount = classes.filter(
    (item) => item.status === "Completed",
  ).length;

  const totalStudents = classes.reduce((sum, item) => sum + item.students, 0);

  const handleAddClass = (e) => {
    e.preventDefault();

    const classItem = {
      ...newClass,
      id: Date.now(),
      status: "Upcoming",
      color: "blue",
    };

    setClasses((current) => [...current, classItem]);
    setShowAddModal(false);

    setNewClass({
      title: "",
      course: "Full Stack Web Development",
      dayOffset: 0,
      start: "09:00 AM",
      end: "10:00 AM",
      students: 0,
      type: "Online",
      description: "",
    });
  };

  return (
    <div className="space-y-7">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">My Schedule</h1>
          <p className="mt-1 text-sm text-slate-500">
            Organize your teaching sessions and manage upcoming classes.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-blue-700"
        >
          <Plus size={18} />
          Add New Class
        </button>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Total Classes"
          value={classes.length}
          icon={CalendarDays}
          color="blue"
        />
        <StatCard
          title="Upcoming Classes"
          value={upcomingCount}
          icon={Clock}
          color="orange"
        />
        <StatCard
          title="Completed Classes"
          value={completedCount}
          icon={CheckCircle}
          color="green"
        />
        <StatCard
          title="Total Enrollments"
          value={totalStudents}
          icon={Users}
          color="purple"
        />
      </div>

      {/* Weekly Calendar */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm md:p-6">
        <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h2 className="text-lg font-bold text-slate-800">
              Weekly Calendar
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              {formatDate(weekDates[0].date)} – {formatDate(weekDates[6].date)},{" "}
              {weekDates[6].date.getFullYear()}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setWeekOffset((value) => value - 1)}
              className="rounded-lg border border-slate-200 p-2 hover:bg-slate-50"
              aria-label="Previous week"
            >
              <ChevronLeft size={19} />
            </button>

            <button
              onClick={() => setWeekOffset(0)}
              className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
            >
              Today
            </button>

            <button
              onClick={() => setWeekOffset((value) => value + 1)}
              className="rounded-lg border border-slate-200 p-2 hover:bg-slate-50"
              aria-label="Next week"
            >
              <ChevronRight size={19} />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-7 gap-2">
          {weekDates.map(({ day, date, dateNumber }) => {
            const count = classes.filter(
              (item) => item.dayOffset === days.indexOf(day),
            ).length;

            const isSelected = selectedDay === day;

            return (
              <button
                key={day}
                onClick={() => setSelectedDay(isSelected ? "All" : day)}
                className={`rounded-xl border p-2 text-center transition sm:p-4 ${
                  isSelected
                    ? "border-blue-600 bg-blue-600 text-white"
                    : "border-slate-100 bg-slate-50 text-slate-700 hover:border-blue-300"
                }`}
              >
                <p className="text-xs font-medium sm:text-sm">{day}</p>
                <p className="my-2 text-lg font-bold sm:text-2xl">
                  {dateNumber}
                </p>
                <span
                  className={`mx-auto flex h-5 w-5 items-center justify-center rounded-full text-xs ${
                    isSelected
                      ? "bg-white/20 text-white"
                      : "bg-blue-100 text-blue-700"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        <div className="mt-5 flex flex-wrap gap-4 text-xs text-slate-500">
          <span className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-blue-500" />
            Web Development
          </span>
          <span className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-purple-500" />
            UI Design
          </span>
          <span className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-green-500" />
            Python
          </span>
          <span className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-orange-500" />
            Database
          </span>
        </div>
      </div>

      {/* Class List */}
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="flex flex-col justify-between gap-4 border-b border-slate-100 p-5 sm:flex-row sm:items-center">
          <div>
            <h2 className="text-lg font-bold text-slate-800">Class Schedule</h2>
            <p className="mt-1 text-sm text-slate-500">
              Your scheduled teaching sessions for this week.
            </p>
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm outline-none focus:border-blue-500"
          >
            <option value="All">All Classes</option>
            <option value="Upcoming">Upcoming</option>
            <option value="Completed">Completed</option>
          </select>
        </div>

        <div className="divide-y divide-slate-100">
          {filteredClasses.length > 0 ? (
            filteredClasses.map((item) => (
              <div
                key={item.id}
                className="flex flex-col gap-4 p-5 transition hover:bg-slate-50 md:flex-row md:items-center"
              >
                <div className="flex min-w-28 items-center gap-3">
                  <div className="rounded-xl bg-blue-50 p-3 text-blue-600">
                    <CalendarDays size={22} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-800">
                      {days[item.dayOffset]}
                    </p>
                    <p className="text-xs text-slate-500">
                      {formatDate(getClassDate(item))}
                    </p>
                  </div>
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="font-semibold text-slate-800">
                      {item.title}
                    </h3>
                    <span
                      className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                        item.status === "Completed"
                          ? "bg-green-100 text-green-700"
                          : "bg-orange-100 text-orange-700"
                      }`}
                    >
                      {item.status}
                    </span>
                  </div>

                  <p className="mt-1 text-sm text-slate-500">{item.course}</p>

                  <div className="mt-3 flex flex-wrap gap-4 text-xs text-slate-500">
                    <span className="flex items-center gap-1.5">
                      <Clock size={14} />
                      {item.start} - {item.end}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Users size={14} />
                      {item.students} students
                    </span>
                    <span className="flex items-center gap-1.5">
                      {item.type === "Online" ? (
                        <Video size={14} />
                      ) : (
                        <MapPin size={14} />
                      )}
                      {item.type}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setSelectedClass(item)}
                    className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100"
                  >
                    Details
                  </button>

                  <button
                    onClick={() => setSelectedClass(item)}
                    className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"
                    aria-label="View class"
                  >
                    <MoreVertical size={19} />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="p-12 text-center">
              <CalendarCheck
                size={35}
                className="mx-auto mb-3 text-slate-300"
              />
              <p className="font-semibold text-slate-700">No classes found</p>
              <p className="mt-1 text-sm text-slate-500">
                Try selecting another day or changing the status filter.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Class Details Modal */}
      {selectedClass && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4"
          onClick={() => setSelectedClass(null)}
        >
          <div
            className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-xl font-bold text-slate-800">
                Class Details
              </h2>
              <button
                onClick={() => setSelectedClass(null)}
                className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"
              >
                <X size={20} />
              </button>
            </div>

            <span
              className={`inline-block rounded-full border px-3 py-1 text-xs font-semibold ${
                colorStyles[selectedClass.color]
              }`}
            >
              {selectedClass.course}
            </span>

            <h3 className="mt-4 text-lg font-bold text-slate-800">
              {selectedClass.title}
            </h3>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              {selectedClass.description}
            </p>

            <div className="mt-6 grid grid-cols-2 gap-4">
              <DetailItem
                icon={CalendarDays}
                label="Date"
                value={formatDate(getClassDate(selectedClass))}
              />
              <DetailItem
                icon={Clock}
                label="Time"
                value={`${selectedClass.start} - ${selectedClass.end}`}
              />
              <DetailItem
                icon={Users}
                label="Students"
                value={selectedClass.students}
              />
              <DetailItem
                icon={Video}
                label="Class Type"
                value={selectedClass.type}
              />
            </div>

            <button
              onClick={() => setSelectedClass(null)}
              className="mt-7 w-full rounded-xl bg-blue-600 py-3 font-semibold text-white hover:bg-blue-700"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Add Class Modal */}
      {showAddModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4"
          onClick={() => setShowAddModal(false)}
        >
          <form
            onSubmit={handleAddClass}
            onClick={(e) => e.stopPropagation()}
            className="max-h-[90vh] w-full max-w-lg space-y-4 overflow-y-auto rounded-2xl bg-white p-6 shadow-xl"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-slate-800">
                Add New Class
              </h2>
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"
              >
                <X size={20} />
              </button>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Class Title
              </label>
              <input
                required
                value={newClass.title}
                onChange={(e) =>
                  setNewClass({ ...newClass, title: e.target.value })
                }
                placeholder="Enter class title"
                className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Course
              </label>
              <select
                value={newClass.course}
                onChange={(e) =>
                  setNewClass({ ...newClass, course: e.target.value })
                }
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
                Day
              </label>
              <select
                value={newClass.dayOffset}
                onChange={(e) =>
                  setNewClass({
                    ...newClass,
                    dayOffset: Number(e.target.value),
                  })
                }
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-blue-500"
              >
                {days.map((day, index) => (
                  <option key={day} value={index}>
                    {day}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Start Time
                </label>
                <input
                  required
                  value={newClass.start}
                  onChange={(e) =>
                    setNewClass({ ...newClass, start: e.target.value })
                  }
                  placeholder="09:00 AM"
                  className="w-full rounded-xl border border-slate-200 px-3 py-3 text-sm outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  End Time
                </label>
                <input
                  required
                  value={newClass.end}
                  onChange={(e) =>
                    setNewClass({ ...newClass, end: e.target.value })
                  }
                  placeholder="10:00 AM"
                  className="w-full rounded-xl border border-slate-200 px-3 py-3 text-sm outline-none focus:border-blue-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Number of Students
                </label>
                <input
                  type="number"
                  min="0"
                  value={newClass.students}
                  onChange={(e) =>
                    setNewClass({
                      ...newClass,
                      students: Number(e.target.value),
                    })
                  }
                  className="w-full rounded-xl border border-slate-200 px-3 py-3 text-sm outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Class Type
                </label>
                <select
                  value={newClass.type}
                  onChange={(e) =>
                    setNewClass({ ...newClass, type: e.target.value })
                  }
                  className="w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm outline-none focus:border-blue-500"
                >
                  <option>Online</option>
                  <option>In Person</option>
                </select>
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Description
              </label>
              <textarea
                rows="3"
                value={newClass.description}
                onChange={(e) =>
                  setNewClass({
                    ...newClass,
                    description: e.target.value,
                  })
                }
                placeholder="Describe the class..."
                className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-500"
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-xl bg-blue-600 py-3 font-semibold text-white hover:bg-blue-700"
            >
              Save Class
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
