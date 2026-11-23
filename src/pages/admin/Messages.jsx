import { useMemo, useState } from "react";
import {
  Search,
  MessageSquare,
  Mail,
  MailOpen,
  CheckCircle,
  Clock,
  Eye,
  Send,
  Trash2,
  X,
  User,
  CalendarDays,
  Reply,
  Filter,
} from "lucide-react";

const initialMessages = [
  {
    id: 1,
    sender: "Abebe Kebede",
    email: "abebe@example.com",
    role: "Student",
    subject: "Unable to access my course",
    message:
      "Hello Admin, I enrolled in the Web Development course, but I cannot access the lessons. Please help me resolve this issue.",
    date: "2026-11-22",
    status: "Unread",
    priority: "High",
    reply: "",
  },
  {
    id: 2,
    sender: "Mekdes Alemu",
    email: "mekdes@example.com",
    role: "Tutor",
    subject: "Request to update course information",
    message:
      "I would like to update the description and thumbnail of my published course. Please let me know how I can proceed.",
    date: "2026-11-21",
    status: "Read",
    priority: "Medium",
    reply: "",
  },
  {
    id: 3,
    sender: "Dawit Tesfaye",
    email: "dawit@example.com",
    role: "Parent",
    subject: "Question about student progress",
    message:
      "I would like to know how I can monitor my child's learning progress and completed lessons.",
    date: "2026-11-20",
    status: "Resolved",
    priority: "Low",
    reply: "You can monitor progress from your parent dashboard.",
  },
  {
    id: 4,
    sender: "Sara Bekele",
    email: "sara@example.com",
    role: "Student",
    subject: "Payment confirmation problem",
    message:
      "I completed my payment using Chapa, but my enrollment still shows as pending. Could you check my transaction?",
    date: "2026-11-19",
    status: "Unread",
    priority: "High",
    reply: "",
  },
  {
    id: 5,
    sender: "Yonas Girma",
    email: "yonas@example.com",
    role: "Tutor",
    subject: "Tutor account verification",
    message:
      "I submitted my tutor registration details. I would like to know the status of my account verification.",
    date: "2026-11-18",
    status: "Read",
    priority: "Medium",
    reply: "",
  },
];

function MessagesPage() {
  const [messages, setMessages] = useState(initialMessages);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [roleFilter, setRoleFilter] = useState("All");
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [replyText, setReplyText] = useState("");

  const stats = useMemo(
    () => ({
      total: messages.length,
      unread: messages.filter((m) => m.status === "Unread").length,
      read: messages.filter((m) => m.status === "Read").length,
      resolved: messages.filter((m) => m.status === "Resolved").length,
    }),
    [messages],
  );

  const filteredMessages = messages.filter((message) => {
    const searchMatch =
      message.sender.toLowerCase().includes(search.toLowerCase()) ||
      message.email.toLowerCase().includes(search.toLowerCase()) ||
      message.subject.toLowerCase().includes(search.toLowerCase());

    const statusMatch =
      statusFilter === "All" || message.status === statusFilter;

    const roleMatch = roleFilter === "All" || message.role === roleFilter;

    return searchMatch && statusMatch && roleMatch;
  });

  const updateStatus = (id, status) => {
    setMessages((prev) =>
      prev.map((message) =>
        message.id === id ? { ...message, status } : message,
      ),
    );

    setSelectedMessage((prev) =>
      prev?.id === id ? { ...prev, status } : prev,
    );
  };

  const openMessage = (message) => {
    const updated = {
      ...message,
      status: message.status === "Unread" ? "Read" : message.status,
    };

    setMessages((prev) =>
      prev.map((item) => (item.id === message.id ? updated : item)),
    );

    setSelectedMessage(updated);
    setReplyText("");
  };

  const sendReply = () => {
    if (!replyText.trim() || !selectedMessage) return;

    const updated = {
      ...selectedMessage,
      reply: replyText.trim(),
      status: "Resolved",
    };

    setMessages((prev) =>
      prev.map((message) =>
        message.id === selectedMessage.id ? updated : message,
      ),
    );

    setSelectedMessage(updated);
    setReplyText("");
  };

  const deleteMessage = (id) => {
    if (!window.confirm("Are you sure you want to delete this message?"))
      return;

    setMessages((prev) => prev.filter((message) => message.id !== id));
    setSelectedMessage(null);
  };

  const statusStyle = (status) => {
    const styles = {
      Unread: "bg-blue-100 text-blue-700",
      Read: "bg-slate-100 text-slate-700",
      Resolved: "bg-green-100 text-green-700",
    };
    return styles[status] || "bg-slate-100 text-slate-700";
  };

  const priorityStyle = (priority) => {
    const styles = {
      High: "bg-red-100 text-red-700",
      Medium: "bg-amber-100 text-amber-700",
      Low: "bg-green-100 text-green-700",
    };
    return styles[priority] || "bg-slate-100 text-slate-700";
  };

  return (
    <div className="min-h-screen space-y-6 p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Messages</h1>
          <p className="mt-1 text-sm text-slate-500">
            Manage messages and communication from platform users.
          </p>
        </div>

        <div className="flex items-center gap-2 rounded-xl bg-blue-50 px-4 py-3 text-blue-700">
          <MessageSquare size={20} />
          <span className="text-sm font-semibold">
            {stats.unread} Unread Messages
          </span>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          {
            label: "Total Messages",
            value: stats.total,
            icon: MessageSquare,
            color: "blue",
          },
          {
            label: "Unread Messages",
            value: stats.unread,
            icon: Mail,
            color: "amber",
          },
          {
            label: "Read Messages",
            value: stats.read,
            icon: MailOpen,
            color: "indigo",
          },
          {
            label: "Resolved Messages",
            value: stats.resolved,
            icon: CheckCircle,
            color: "green",
          },
        ].map((item) => {
          const Icon = item.icon;
          const colors = {
            blue: "bg-blue-100 text-blue-600",
            amber: "bg-amber-100 text-amber-600",
            indigo: "bg-indigo-100 text-indigo-600",
            green: "bg-green-100 text-green-600",
          };

          return (
            <div
              key={item.label}
              className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-500">{item.label}</p>
                  <h2 className="mt-2 text-3xl font-bold text-slate-800">
                    {item.value}
                  </h2>
                </div>
                <div className={`rounded-xl p-3 ${colors[item.color]}`}>
                  <Icon size={24} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Messages Table */}
      <div className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm">
        <div className="border-b border-slate-100 p-5">
          <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
            <div>
              <h2 className="text-lg font-bold text-slate-800">All Messages</h2>
              <p className="mt-1 text-sm text-slate-500">
                View and manage messages from students, tutors, and parents.
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
                  placeholder="Search messages..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 py-2.5 pl-10 pr-4 text-sm outline-none focus:border-blue-500 sm:w-64"
                />
              </div>

              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-blue-500"
              >
                <option value="All">All Statuses</option>
                <option value="Unread">Unread</option>
                <option value="Read">Read</option>
                <option value="Resolved">Resolved</option>
              </select>

              <select
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
                className="rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-blue-500"
              >
                <option value="All">All Roles</option>
                <option value="Student">Students</option>
                <option value="Tutor">Tutors</option>
                <option value="Parent">Parents</option>
              </select>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[850px] text-left">
            <thead className="bg-slate-50 text-xs uppercase text-slate-500">
              <tr>
                <th className="px-5 py-4">Sender</th>
                <th className="px-5 py-4">Subject</th>
                <th className="px-5 py-4">Date</th>
                <th className="px-5 py-4">Priority</th>
                <th className="px-5 py-4">Status</th>
                <th className="px-5 py-4 text-right">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {filteredMessages.map((message) => (
                <tr
                  key={message.id}
                  className={`transition hover:bg-slate-50 ${
                    message.status === "Unread" ? "bg-blue-50/30" : ""
                  }`}
                >
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 font-bold text-blue-700">
                        {message.sender.charAt(0)}
                      </div>
                      <div>
                        <p className="font-semibold text-slate-800">
                          {message.sender}
                        </p>
                        <p className="text-xs text-slate-500">{message.role}</p>
                      </div>
                    </div>
                  </td>

                  <td className="px-5 py-4">
                    <p
                      className={`text-sm ${
                        message.status === "Unread"
                          ? "font-bold text-slate-800"
                          : "font-medium text-slate-700"
                      }`}
                    >
                      {message.subject}
                    </p>
                    <p className="mt-1 max-w-xs truncate text-xs text-slate-400">
                      {message.message}
                    </p>
                  </td>

                  <td className="px-5 py-4 text-sm text-slate-500">
                    {message.date}
                  </td>

                  <td className="px-5 py-4">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${priorityStyle(message.priority)}`}
                    >
                      {message.priority}
                    </span>
                  </td>

                  <td className="px-5 py-4">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${statusStyle(message.status)}`}
                    >
                      {message.status}
                    </span>
                  </td>

                  <td className="px-5 py-4">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => openMessage(message)}
                        title="View message"
                        className="rounded-lg p-2 text-blue-600 hover:bg-blue-50"
                      >
                        <Eye size={18} />
                      </button>

                      <button
                        onClick={() => deleteMessage(message.id)}
                        title="Delete message"
                        className="rounded-lg p-2 text-red-600 hover:bg-red-50"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {filteredMessages.length === 0 && (
                <tr>
                  <td colSpan="6" className="px-5 py-12 text-center">
                    <MessageSquare
                      className="mx-auto mb-3 text-slate-300"
                      size={36}
                    />
                    <p className="font-medium text-slate-600">
                      No messages found
                    </p>
                    <p className="mt-1 text-sm text-slate-400">
                      Try changing your search or filters.
                    </p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="border-t border-slate-100 px-5 py-4 text-sm text-slate-500">
          Showing {filteredMessages.length} of {messages.length} messages
        </div>
      </div>

      {/* Message Details Modal */}
      {selectedMessage && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-950/50 p-4">
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 p-5">
              <div>
                <h2 className="text-lg font-bold text-slate-800">
                  Message Details
                </h2>
                <p className="text-sm text-slate-500">
                  Message #{selectedMessage.id}
                </p>
              </div>

              <button
                onClick={() => setSelectedMessage(null)}
                className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-5 p-5">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-lg font-bold text-blue-700">
                    {selectedMessage.sender.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-800">
                      {selectedMessage.sender}
                    </h3>
                    <p className="text-sm text-slate-500">
                      {selectedMessage.email}
                    </p>
                  </div>
                </div>

                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${statusStyle(selectedMessage.status)}`}
                >
                  {selectedMessage.status}
                </span>
              </div>

              <div className="grid gap-3 rounded-xl bg-slate-50 p-4 sm:grid-cols-2">
                <div>
                  <p className="text-xs text-slate-400">Sender Role</p>
                  <p className="mt-1 text-sm font-semibold text-slate-700">
                    {selectedMessage.role}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-slate-400">Date Received</p>
                  <p className="mt-1 text-sm font-semibold text-slate-700">
                    {selectedMessage.date}
                  </p>
                </div>
              </div>

              <div>
                <p className="text-xs font-semibold uppercase text-slate-400">
                  Subject
                </p>
                <h3 className="mt-2 text-lg font-bold text-slate-800">
                  {selectedMessage.subject}
                </h3>
              </div>

              <div>
                <p className="mb-2 text-xs font-semibold uppercase text-slate-400">
                  Message
                </p>
                <div className="rounded-xl border border-slate-200 p-4 text-sm leading-7 text-slate-700">
                  {selectedMessage.message}
                </div>
              </div>

              {selectedMessage.reply && (
                <div className="rounded-xl border border-green-200 bg-green-50 p-4">
                  <p className="mb-2 flex items-center gap-2 font-semibold text-green-800">
                    <Reply size={16} /> Admin Reply
                  </p>
                  <p className="text-sm leading-6 text-green-700">
                    {selectedMessage.reply}
                  </p>
                </div>
              )}

              {!selectedMessage.reply && (
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Reply to Message
                  </label>
                  <textarea
                    rows="4"
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    placeholder="Write your reply here..."
                    className="w-full rounded-xl border border-slate-200 p-3 text-sm outline-none focus:border-blue-500"
                  />

                  <button
                    onClick={sendReply}
                    disabled={!replyText.trim()}
                    className="mt-3 flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <Send size={16} />
                    Send Reply
                  </button>
                </div>
              )}
            </div>

            <div className="flex flex-wrap justify-between gap-3 border-t border-slate-100 p-5">
              <button
                onClick={() => deleteMessage(selectedMessage.id)}
                className="flex items-center gap-2 rounded-xl border border-red-200 px-4 py-2.5 text-sm font-semibold text-red-600 hover:bg-red-50"
              >
                <Trash2 size={16} />
                Delete
              </button>

              <div className="flex flex-wrap gap-2">
                {selectedMessage.status !== "Resolved" && (
                  <button
                    onClick={() => updateStatus(selectedMessage.id, "Resolved")}
                    className="flex items-center gap-2 rounded-xl bg-green-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-green-700"
                  >
                    <CheckCircle size={16} />
                    Mark Resolved
                  </button>
                )}

                <button
                  onClick={() => setSelectedMessage(null)}
                  className="rounded-xl bg-slate-100 px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-200"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MessagesPage;
