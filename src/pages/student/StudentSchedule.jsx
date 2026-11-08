import { useState } from "react";
import {
  CalendarDays,
  Clock,
  BookOpen,
  UserRound,
  ChevronLeft,
  ChevronRight,
  Video,
  MapPin,
  Filter,
} from "lucide-react";

export default function StudentSchedule() {
  const [selectedDay, setSelectedDay] = useState("All");
  const [filter, setFilter] = useState("All");
  const [weekOffset, setWeekOffset] = useState(0);

  const weekDays = [
    { name: "Monday", short: "Mon", date: 9 },
    { name: "Tuesday", short: "Tue", date: 10 },
    { name: "Wednesday", short: "Wed", date: 11 },
    { name: "Thursday", short: "Thu", date: 12 },
    { name: "Friday", short: "Fri", date: 13 },
    { name: "Saturday", short: "Sat", date: 14 },
    { name: "Sunday", short: "Sun", date: 15 },
  ];

  const lessons = [
    {
      id: 1,
      title: "React.js Advanced Concepts",
      course: "Full Stack Web Development",
      tutor: "Abebe Kebede",
      day: "Monday",
      date: 9,
      start: "09:00 AM",
      end: "10:30 AM",
      type: "Online",
      status: "Upcoming",
      color: "border-blue-500 bg-blue-50",
      textColor: "text-blue-700",
    },
    {
      id: 2,
      title: "UI Design Principles",
      course: "UI/UX Design Fundamentals",
      tutor: "Meron Tadesse",
      day: "Tuesday",
      date: 10,
      start: "10:00 AM",
      end: "11:30 AM",
      type: "Online",
      status: "Upcoming",
      color: "border-purple-500 bg-purple-50",
      textColor: "text-purple-700",
    },
    {
      id: 3,
      title: "Python Functions and Modules",
      course: "Python Programming",
      tutor: "Dawit Alemu",
      day: "Wednesday",
      date: 11,
      start: "02:00 PM",
      end: "03:30 PM",
      type: "Online",
      status: "Upcoming",
      color: "border-green-500 bg-green-50",
      textColor: "text-green-700",
    },
    {
      id: 4,
      title: "Database Relationships",
      course: "Database Management",
      tutor: "Helen Bekele",
      day: "Thursday",
      date: 12,
      start: "09:00 AM",
      end: "10:00 AM",
      type: "Online",
      status: "Upcoming",
      color: "border-orange-500 bg-orange-50",
      textColor: "text-orange-700",
    },
    {
      id: 5,
      title: "React Project Practice",
      course: "Full Stack Web Development",
      tutor: "Abebe Kebede",
      day: "Friday",
      date: 13,
      start: "03:00 PM",
      end: "04:30 PM",
      type: "Online",
      status: "Upcoming",
      color: "border-blue-500 bg-blue-50",
      textColor: "text-blue-700",
    },
    {
      id: 6,
      title: "Weekly Programming Review",
      course: "Python Programming",
      tutor: "Dawit Alemu",
      day: "Saturday",
      date: 14,
      start: "11:00 AM",
      end: "12:00 PM",
      type: "Online",
      status: "Upcoming",
      color: "border-green-500 bg-green-50",
      textColor: "text-green-700",
    },
  ];

  const filteredLessons = lessons.filter((lesson) => {
    const matchesDay = selectedDay === "All" || lesson.day === selectedDay;

    const matchesStatus = filter === "All" || lesson.status === filter;

    return matchesDay && matchesStatus;
  });

  const handlePreviousWeek = () => {
    setWeekOffset((previous) => previous - 1);
  };

  const handleNextWeek = () => {
    setWeekOffset((previous) => previous + 1);
  };

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">My Schedule</h1>
          <p className="mt-2 text-slate-500">
            Manage your lessons, classes, and learning timetable.
          </p>
        </div>

        <div className="flex items-center gap-2 rounded-xl bg-blue-50 px-4 py-3 text-blue-700">
          <CalendarDays size={20} />
          <span className="text-sm font-semibold">Weekly Schedule</span>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
        <StatCard
          title="Total Lessons"
          value="06"
          icon={BookOpen}
          color="bg-blue-100 text-blue-600"
        />

        <StatCard
          title="Upcoming Lessons"
          value="06"
          icon={CalendarDays}
          color="bg-orange-100 text-orange-600"
        />

        <StatCard
          title="Learning Hours"
          value="08"
          icon={Clock}
          color="bg-green-100 text-green-600"
        />
      </div>

      {/* Weekly Calendar */}
      <section className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm md:p-6">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-slate-800">
              Weekly Calendar
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              View your scheduled classes by day.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handlePreviousWeek}
              className="rounded-lg border p-2 text-slate-600 hover:bg-slate-50"
              aria-label="Previous week"
            >
              <ChevronLeft size={20} />
            </button>

            <span className="text-sm font-semibold text-slate-700">
              {weekOffset === 0
                ? "Current Week"
                : weekOffset > 0
                  ? `${weekOffset} Week(s) Ahead`
                  : `${Math.abs(weekOffset)} Week(s) Ago`}
            </span>

            <button
              onClick={handleNextWeek}
              className="rounded-lg border p-2 text-slate-600 hover:bg-slate-50"
              aria-label="Next week"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-7">
          {weekDays.map((day) => {
            const dayLessons = lessons.filter(
              (lesson) => lesson.day === day.name,
            );

            return (
              <button
                key={day.name}
                onClick={() =>
                  setSelectedDay(selectedDay === day.name ? "All" : day.name)
                }
                className={`rounded-xl border p-4 text-center transition ${
                  selectedDay === day.name
                    ? "border-blue-600 bg-blue-600 text-white"
                    : "border-slate-100 bg-slate-50 hover:border-blue-300 hover:bg-blue-50"
                }`}
              >
                <p className="text-xs font-medium">{day.short}</p>

                <p className="my-2 text-2xl font-bold">
                  {day.date + weekOffset * 7}
                </p>

                <span
                  className={`text-xs ${
                    selectedDay === day.name
                      ? "text-blue-100"
                      : "text-slate-500"
                  }`}
                >
                  {dayLessons.length} Lessons
                </span>
              </button>
            );
          })}
        </div>

        <button
          onClick={() => setSelectedDay("All")}
          className="mt-4 text-sm font-semibold text-blue-600 hover:underline"
        >
          View All Days
        </button>
      </section>

      {/* Lessons List */}
      <section className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm md:p-6">
        <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h2 className="text-xl font-bold text-slate-800">
              Scheduled Lessons
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              {selectedDay === "All"
                ? "All your upcoming lessons"
                : `Lessons for ${selectedDay}`}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Filter size={18} className="text-slate-500" />

            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-blue-500"
            >
              <option value="All">All Status</option>
              <option value="Upcoming">Upcoming</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
        </div>

        <div className="space-y-4">
          {filteredLessons.map((lesson) => (
            <div
              key={lesson.id}
              className={`rounded-xl border-l-4 ${lesson.color} p-5`}
            >
              <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
                {/* Lesson Information */}
                <div className="flex gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white shadow-sm">
                    <BookOpen size={23} className={lesson.textColor} />
                  </div>

                  <div>
                    <h3 className="font-bold text-slate-800">{lesson.title}</h3>

                    <p className="mt-1 text-sm text-slate-500">
                      {lesson.course}
                    </p>

                    <div className="mt-3 flex flex-wrap gap-4 text-xs text-slate-500">
                      <span className="flex items-center gap-1">
                        <UserRound size={14} />
                        {lesson.tutor}
                      </span>

                      <span className="flex items-center gap-1">
                        <Clock size={14} />
                        {lesson.start} - {lesson.end}
                      </span>

                      <span className="flex items-center gap-1">
                        {lesson.type === "Online" ? (
                          <Video size={14} />
                        ) : (
                          <MapPin size={14} />
                        )}
                        {lesson.type}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Date and Status */}
                <div className="flex items-center justify-between gap-4 md:flex-col md:items-end">
                  <div className="text-sm font-semibold text-slate-700">
                    {lesson.day}, {lesson.date + weekOffset * 7}
                  </div>

                  <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
                    {lesson.status}
                  </span>
                </div>
              </div>

              {/* Join Button */}
              {lesson.type === "Online" && (
                <div className="mt-4 flex justify-end">
                  <button
                    onClick={() => alert(`Joining ${lesson.title}...`)}
                    className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
                  >
                    <Video size={16} />
                    Join Class
                  </button>
                </div>
              )}
            </div>
          ))}

          {filteredLessons.length === 0 && (
            <div className="py-12 text-center">
              <CalendarDays size={45} className="mx-auto text-slate-300" />

              <h3 className="mt-4 font-semibold text-slate-700">
                No lessons found
              </h3>

              <p className="mt-2 text-sm text-slate-500">
                Try selecting another day or filter.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Schedule Note */}
      <div className="rounded-xl border border-blue-100 bg-blue-50 p-5">
        <div className="flex gap-3">
          <CalendarDays className="shrink-0 text-blue-600" size={22} />

          <div>
            <h3 className="font-semibold text-blue-800">Stay organized!</h3>

            <p className="mt-1 text-sm text-blue-700">
              Check your schedule regularly so you don't miss your upcoming
              lessons and online classes.
            </p>
          </div>
        </div>
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
