import { useMemo, useState } from "react";
import {
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Clock,
  MapPin,
  Video,
  BookOpen,
  User,
  Filter,
  X,
  CheckCircle,
  CalendarCheck,
} from "lucide-react";

const initialClasses = [
  {
    id: 1,
    title: "Mathematics",
    child: "Abel Asres",
    grade: "Grade 9",
    tutor: "Abebe Kebede",
    date: "2026-11-09",
    start: "09:00 AM",
    end: "10:00 AM",
    type: "Online",
    status: "Upcoming",
    room: "Google Meet",
    color: "bg-blue-500",
    light: "bg-blue-50",
    text: "text-blue-600",
  },
  {
    id: 2,
    title: "English Language",
    child: "Sara Asres",
    grade: "Grade 7",
    tutor: "Hana Mohammed",
    date: "2026-11-09",
    start: "11:00 AM",
    end: "12:00 PM",
    type: "Online",
    status: "Upcoming",
    room: "Google Meet",
    color: "bg-emerald-500",
    light: "bg-emerald-50",
    text: "text-emerald-600",
  },
  {
    id: 3,
    title: "Physics",
    child: "Abel Asres",
    grade: "Grade 9",
    tutor: "Meron Tadesse",
    date: "2026-11-10",
    start: "02:00 PM",
    end: "03:00 PM",
    type: "Online",
    status: "Upcoming",
    room: "Zoom Meeting",
    color: "bg-purple-500",
    light: "bg-purple-50",
    text: "text-purple-600",
  },
  {
    id: 4,
    title: "Biology",
    child: "Sara Asres",
    grade: "Grade 7",
    tutor: "Dawit Alemu",
    date: "2026-11-11",
    start: "10:00 AM",
    end: "11:00 AM",
    type: "Online",
    status: "Upcoming",
    room: "Google Meet",
    color: "bg-orange-500",
    light: "bg-orange-50",
    text: "text-orange-600",
  },
  {
    id: 5,
    title: "Mathematics",
    child: "Abel Asres",
    grade: "Grade 9",
    tutor: "Abebe Kebede",
    date: "2026-11-12",
    start: "09:00 AM",
    end: "10:00 AM",
    type: "Online",
    status: "Upcoming",
    room: "Google Meet",
    color: "bg-blue-500",
    light: "bg-blue-50",
    text: "text-blue-600",
  },
  {
    id: 6,
    title: "English Language",
    child: "Sara Asres",
    grade: "Grade 7",
    tutor: "Hana Mohammed",
    date: "2026-11-13",
    start: "01:00 PM",
    end: "02:00 PM",
    type: "Online",
    status: "Upcoming",
    room: "Zoom Meeting",
    color: "bg-emerald-500",
    light: "bg-emerald-50",
    text: "text-emerald-600",
  },
];

const formatDate = (date) =>
  date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

export default function ParentSchedule() {
  const [classes] = useState(initialClasses);
  const [selectedChild, setSelectedChild] = useState("All Children");
  const [selectedDate, setSelectedDate] = useState(
    new Date("2026-11-09T12:00:00"),
  );
  const [selectedClass, setSelectedClass] = useState(null);
  const [view, setView] = useState("week");

  const weekDates = useMemo(() => {
    const start = new Date(selectedDate);
    const day = start.getDay();
    start.setDate(start.getDate() - ((day + 6) % 7));

    return Array.from({ length: 7 }, (_, index) => {
      const date = new Date(start);
      date.setDate(start.getDate() + index);
      return date;
    });
  }, [selectedDate]);

  const filteredClasses = classes.filter((item) => {
    return selectedChild === "All Children" || item.child === selectedChild;
  });

  const selectedDayClasses = filteredClasses.filter(
    (item) => item.date === selectedDate.toISOString().split("T")[0],
  );

  const upcomingCount = filteredClasses.filter(
    (item) => item.status === "Upcoming",
  ).length;

  const changeWeek = (direction) => {
    const newDate = new Date(selectedDate);
    newDate.setDate(newDate.getDate() + direction * 7);
    setSelectedDate(newDate);
  };

  const isSameDay = (date1, date2) =>
    date1.toDateString() === date2.toDateString();

  return (
    <div className="space-y-7">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Children's Schedule
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Monitor your children's upcoming lessons and class activities.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <select
            value={selectedChild}
            onChange={(e) => setSelectedChild(e.target.value)}
            className="rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none focus:border-brand-600"
          >
            <option>All Children</option>
            <option>Abel Asres</option>
            <option>Sara Asres</option>
          </select>

          <div className="flex rounded-xl border border-gray-200 bg-white p-1">
            <button
              onClick={() => setView("week")}
              className={`rounded-lg px-4 py-2 text-sm font-medium ${
                view === "week"
                  ? "bg-brand-600 text-white"
                  : "text-gray-500 hover:bg-gray-50"
              }`}
            >
              Week
            </button>
            <button
              onClick={() => setView("day")}
              className={`rounded-lg px-4 py-2 text-sm font-medium ${
                view === "day"
                  ? "bg-brand-600 text-white"
                  : "text-gray-500 hover:bg-gray-50"
              }`}
            >
              Day
            </button>
          </div>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
        <StatCard
          icon={CalendarDays}
          title="Scheduled Classes"
          value={filteredClasses.length}
          color="text-blue-600"
          bg="bg-blue-50"
        />
        <StatCard
          icon={Clock}
          title="Upcoming Classes"
          value={upcomingCount}
          color="text-purple-600"
          bg="bg-purple-50"
        />
        <StatCard
          icon={CalendarCheck}
          title="Children"
          value={selectedChild === "All Children" ? "02" : "01"}
          color="text-emerald-600"
          bg="bg-emerald-50"
        />
      </div>

      {/* Calendar */}
      <section className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
        <div className="flex flex-col gap-4 border-b border-gray-100 p-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-lg font-bold text-gray-900">Weekly Calendar</h2>
            <p className="mt-1 text-sm text-gray-500">
              {formatDate(weekDates[0])} - {formatDate(weekDates[6])}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => changeWeek(-1)}
              className="rounded-lg border border-gray-200 p-2 hover:bg-gray-50"
              aria-label="Previous week"
            >
              <ChevronLeft size={19} />
            </button>

            <button
              onClick={() => setSelectedDate(new Date("2026-11-09T12:00:00"))}
              className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium hover:bg-gray-50"
            >
              Demo Week
            </button>

            <button
              onClick={() => changeWeek(1)}
              className="rounded-lg border border-gray-200 p-2 hover:bg-gray-50"
              aria-label="Next week"
            >
              <ChevronRight size={19} />
            </button>
          </div>
        </div>

        {view === "week" ? (
          <div className="grid grid-cols-1 divide-y divide-gray-100 md:grid-cols-7 md:divide-x md:divide-y-0">
            {weekDates.map((date) => {
              const dateKey = date.toISOString().split("T")[0];
              const dayClasses = filteredClasses.filter(
                (item) => item.date === dateKey,
              );

              return (
                <div
                  key={dateKey}
                  className={`min-h-64 p-3 ${
                    isSameDay(date, selectedDate) ? "bg-blue-50/40" : ""
                  }`}
                >
                  <button
                    onClick={() => setSelectedDate(date)}
                    className="mb-4 w-full text-left"
                  >
                    <p className="text-xs font-medium text-gray-400">
                      {date.toLocaleDateString("en-US", {
                        weekday: "short",
                      })}
                    </p>
                    <p
                      className={`mt-1 flex h-9 w-9 items-center justify-center rounded-full text-sm font-bold ${
                        isSameDay(date, selectedDate)
                          ? "bg-brand-600 text-white"
                          : "text-gray-800 hover:bg-gray-100"
                      }`}
                    >
                      {date.getDate()}
                    </p>
                  </button>

                  <div className="space-y-2">
                    {dayClasses.map((item) => (
                      <button
                        key={item.id}
                        onClick={() => setSelectedClass(item)}
                        className={`w-full rounded-lg border-l-4 ${item.color} ${item.light} p-2 text-left transition hover:shadow-sm`}
                      >
                        <p className="text-xs font-bold text-gray-800">
                          {item.title}
                        </p>
                        <p className="mt-1 text-xs text-gray-600">
                          {item.start}
                        </p>
                        <p className="mt-1 truncate text-xs text-gray-500">
                          {item.child}
                        </p>
                      </button>
                    ))}

                    {dayClasses.length === 0 && (
                      <p className="py-3 text-center text-xs text-gray-300">
                        No classes
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="p-5">
            <h3 className="mb-4 font-semibold text-gray-900">
              {selectedDate.toLocaleDateString("en-US", {
                weekday: "long",
                month: "long",
                day: "numeric",
              })}
            </h3>

            {selectedDayClasses.length ? (
              <div className="space-y-3">
                {selectedDayClasses.map((item) => (
                  <ClassCard
                    key={item.id}
                    item={item}
                    onClick={() => setSelectedClass(item)}
                  />
                ))}
              </div>
            ) : (
              <EmptyState />
            )}
          </div>
        )}
      </section>

      {/* Selected Day Classes */}
      <section className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-6">
        <div className="mb-5">
          <h2 className="text-lg font-bold text-gray-900">
            Classes for Selected Day
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            {formatDate(selectedDate)}
          </p>
        </div>

        {selectedDayClasses.length ? (
          <div className="space-y-3">
            {selectedDayClasses.map((item) => (
              <ClassCard
                key={item.id}
                item={item}
                onClick={() => setSelectedClass(item)}
              />
            ))}
          </div>
        ) : (
          <EmptyState />
        )}
      </section>

      {/* Upcoming Lessons */}
      <section className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-6">
        <div className="mb-5 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-gray-900">
              Upcoming Lessons
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Your children's next scheduled classes.
            </p>
          </div>
          <CalendarDays className="text-brand-600" size={22} />
        </div>

        <div className="space-y-3">
          {filteredClasses
            .slice()
            .sort(
              (a, b) =>
                new Date(`${a.date} ${a.start}`) -
                new Date(`${b.date} ${b.start}`),
            )
            .slice(0, 4)
            .map((item) => (
              <ClassCard
                key={item.id}
                item={item}
                onClick={() => setSelectedClass(item)}
              />
            ))}
        </div>
      </section>

      {/* Class Details Modal */}
      {selectedClass && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          onClick={() => setSelectedClass(null)}
        >
          <div
            className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900">
                Lesson Details
              </h2>
              <button
                onClick={() => setSelectedClass(null)}
                className="rounded-lg p-2 text-gray-400 hover:bg-gray-100"
              >
                <X size={20} />
              </button>
            </div>

            <div className={`mb-5 rounded-xl p-4 ${selectedClass.light}`}>
              <p className="text-sm text-gray-500">
                {selectedClass.child} · {selectedClass.grade}
              </p>
              <h3 className="mt-1 text-xl font-bold text-gray-900">
                {selectedClass.title}
              </h3>
              <p className={`mt-1 text-sm font-medium ${selectedClass.text}`}>
                {selectedClass.status}
              </p>
            </div>

            <div className="space-y-4">
              <DetailRow
                icon={User}
                label="Tutor"
                value={selectedClass.tutor}
              />
              <DetailRow
                icon={CalendarDays}
                label="Date"
                value={formatDate(new Date(`${selectedClass.date}T12:00:00`))}
              />
              <DetailRow
                icon={Clock}
                label="Time"
                value={`${selectedClass.start} - ${selectedClass.end}`}
              />
              <DetailRow
                icon={Video}
                label="Class Type"
                value={selectedClass.type}
              />
              <DetailRow
                icon={MapPin}
                label="Platform"
                value={selectedClass.room}
              />
            </div>

            <button
              onClick={() => setSelectedClass(null)}
              className="mt-6 w-full rounded-xl bg-brand-600 py-3 font-semibold text-white transition hover:bg-brand-700"
            >
              Close Details
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function StatCard({ icon: Icon, title, value, color, bg }) {
  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500">{title}</p>
          <h3 className="mt-2 text-2xl font-bold text-gray-900">{value}</h3>
        </div>
        <div
          className={`flex h-12 w-12 items-center justify-center rounded-xl ${bg} ${color}`}
        >
          <Icon size={23} />
        </div>
      </div>
    </div>
  );
}

function ClassCard({ item, onClick }) {
  return (
    <button
      onClick={onClick}
      className="flex w-full flex-col gap-3 rounded-xl border border-gray-100 p-4 text-left transition hover:border-brand-200 hover:bg-gray-50 sm:flex-row sm:items-center sm:justify-between"
    >
      <div className="flex items-center gap-3">
        <div
          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${item.light} ${item.text}`}
        >
          <BookOpen size={21} />
        </div>
        <div>
          <h3 className="font-semibold text-gray-900">{item.title}</h3>
          <p className="mt-1 text-sm text-gray-500">
            {item.child} · {item.tutor}
          </p>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
        <span className="flex items-center gap-1">
          <CalendarDays size={15} />
          {formatDate(new Date(`${item.date}T12:00:00`))}
        </span>
        <span className="flex items-center gap-1">
          <Clock size={15} />
          {item.start}
        </span>
        <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-600">
          {item.status}
        </span>
      </div>
    </button>
  );
}

function DetailRow({ icon: Icon, label, value }) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gray-50 text-brand-600">
        <Icon size={18} />
      </div>
      <div>
        <p className="text-xs text-gray-400">{label}</p>
        <p className="text-sm font-medium text-gray-800">{value}</p>
      </div>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="py-10 text-center">
      <CalendarDays className="mx-auto mb-3 text-gray-300" size={36} />
      <p className="font-medium text-gray-700">No classes scheduled</p>
      <p className="mt-1 text-sm text-gray-400">
        There are no lessons for this day.
      </p>
    </div>
  );
}
