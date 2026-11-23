import { useMemo, useState } from "react";
import {
  Search,
  Plus,
  Users,
  GraduationCap,
  BookOpen,
  UserRound,
  MoreVertical,
  Eye,
  Pencil,
  Trash2,
  X,
  Mail,
  CalendarDays,
  Filter,
} from "lucide-react";

const initialUsers = [
  {
    id: 1,
    name: "Abebe Kebede",
    email: "abebe@example.com",
    role: "Student",
    status: "Active",
    joined: "Nov 21, 2026",
  },
  {
    id: 2,
    name: "Sara Mohammed",
    email: "sara@example.com",
    role: "Tutor",
    status: "Active",
    joined: "Nov 19, 2026",
  },
  {
    id: 3,
    name: "Dawit Alemu",
    email: "dawit@example.com",
    role: "Parent",
    status: "Active",
    joined: "Nov 18, 2026",
  },
  {
    id: 4,
    name: "Hana Tesfaye",
    email: "hana@example.com",
    role: "Student",
    status: "Inactive",
    joined: "Nov 15, 2026",
  },
  {
    id: 5,
    name: "Michael Bekele",
    email: "michael@example.com",
    role: "Tutor",
    status: "Active",
    joined: "Nov 12, 2026",
  },
  {
    id: 6,
    name: "Meron Getachew",
    email: "meron@example.com",
    role: "Student",
    status: "Active",
    joined: "Nov 10, 2026",
  },
];

function UsersPage() {
  const [users, setUsers] = useState(initialUsers);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("All");
  const [selectedUser, setSelectedUser] = useState(null);
  const [editingUser, setEditingUser] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    role: "Student",
  });

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const matchesSearch =
        user.name.toLowerCase().includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase());

      const matchesRole = roleFilter === "All" || user.role === roleFilter;

      return matchesSearch && matchesRole;
    });
  }, [users, search, roleFilter]);

  const stats = [
    {
      label: "Total Users",
      value: users.length,
      icon: Users,
      color: "bg-blue-100 text-blue-600",
    },
    {
      label: "Students",
      value: users.filter((u) => u.role === "Student").length,
      icon: GraduationCap,
      color: "bg-purple-100 text-purple-600",
    },
    {
      label: "Tutors",
      value: users.filter((u) => u.role === "Tutor").length,
      icon: BookOpen,
      color: "bg-emerald-100 text-emerald-600",
    },
    {
      label: "Parents",
      value: users.filter((u) => u.role === "Parent").length,
      icon: UserRound,
      color: "bg-orange-100 text-orange-600",
    },
  ];

  const resetForm = () => {
    setForm({ name: "", email: "", role: "Student" });
    setEditingUser(null);
    setShowAddForm(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editingUser) {
      setUsers((current) =>
        current.map((user) =>
          user.id === editingUser.id ? { ...user, ...form } : user,
        ),
      );
    } else {
      setUsers((current) => [
        {
          id: Date.now(),
          ...form,
          status: "Active",
          joined: new Date().toLocaleDateString("en-US", {
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

  const handleEdit = (user) => {
    setEditingUser(user);
    setForm({
      name: user.name,
      email: user.email,
      role: user.role,
    });
    setShowAddForm(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      setUsers((current) => current.filter((user) => user.id !== id));
    }
  };

  const toggleStatus = (id) => {
    setUsers((current) =>
      current.map((user) =>
        user.id === id
          ? {
              ...user,
              status: user.status === "Active" ? "Inactive" : "Active",
            }
          : user,
      ),
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8">
      {/* Page Heading */}
      <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <p className="mb-1 text-sm font-medium text-blue-600">
            Administration / Users
          </p>
          <h1 className="text-2xl font-bold text-slate-800 sm:text-3xl">
            User Management
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            Manage students, tutors, and parents on your platform.
          </p>
        </div>

        <button
          onClick={() => {
            resetForm();
            setShowAddForm(true);
          }}
          className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white shadow-lg shadow-blue-200 transition hover:bg-blue-700"
        >
          <Plus size={19} />
          Add New User
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

      {/* User Table */}
      <div className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm">
        <div className="flex flex-col justify-between gap-4 border-b border-slate-100 p-5 lg:flex-row lg:items-center">
          <div>
            <h2 className="text-lg font-bold text-slate-800">All Users</h2>
            <p className="mt-1 text-sm text-slate-500">
              View and manage registered platform users.
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
                placeholder="Search users..."
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
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
                className="w-full appearance-none rounded-xl border border-slate-200 bg-white py-2.5 pl-10 pr-8 text-sm outline-none focus:border-blue-500 sm:w-40"
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
            <thead className="bg-slate-50 text-xs uppercase tracking-wider text-slate-500">
              <tr>
                <th className="px-6 py-4 font-semibold">User</th>
                <th className="px-6 py-4 font-semibold">Role</th>
                <th className="px-6 py-4 font-semibold">Joined Date</th>
                <th className="px-6 py-4 font-semibold">Status</th>
                <th className="px-6 py-4 text-right font-semibold">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="transition hover:bg-slate-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 font-bold text-white">
                        {user.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-semibold text-slate-800">
                          {user.name}
                        </p>
                        <p className="text-sm text-slate-500">{user.email}</p>
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    <span className="rounded-full bg-indigo-50 px-3 py-1.5 text-xs font-semibold text-indigo-600">
                      {user.role}
                    </span>
                  </td>

                  <td className="px-6 py-4 text-sm text-slate-600">
                    <div className="flex items-center gap-2">
                      <CalendarDays size={15} className="text-slate-400" />
                      {user.joined}
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    <button
                      onClick={() => toggleStatus(user.id)}
                      className={`rounded-full px-3 py-1.5 text-xs font-semibold ${
                        user.status === "Active"
                          ? "bg-emerald-50 text-emerald-600"
                          : "bg-red-50 text-red-600"
                      }`}
                    >
                      {user.status}
                    </button>
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => setSelectedUser(user)}
                        title="View user"
                        className="rounded-lg p-2 text-blue-600 hover:bg-blue-50"
                      >
                        <Eye size={18} />
                      </button>

                      <button
                        onClick={() => handleEdit(user)}
                        title="Edit user"
                        className="rounded-lg p-2 text-emerald-600 hover:bg-emerald-50"
                      >
                        <Pencil size={18} />
                      </button>

                      <button
                        onClick={() => handleDelete(user.id)}
                        title="Delete user"
                        className="rounded-lg p-2 text-red-500 hover:bg-red-50"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {filteredUsers.length === 0 && (
                <tr>
                  <td
                    colSpan="5"
                    className="px-6 py-12 text-center text-slate-500"
                  >
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="border-t border-slate-100 px-6 py-4 text-sm text-slate-500">
          Showing {filteredUsers.length} of {users.length} users
        </div>
      </div>

      {/* Add / Edit User Modal */}
      {showAddForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-xl font-bold text-slate-800">
                {editingUser ? "Edit User" : "Add New User"}
              </h2>
              <button
                onClick={resetForm}
                className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Full Name
                </label>
                <input
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Enter full name"
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Email Address
                </label>
                <input
                  required
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="Enter email address"
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  User Role
                </label>
                <select
                  value={form.role}
                  onChange={(e) => setForm({ ...form, role: e.target.value })}
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none focus:border-blue-500"
                >
                  <option value="Student">Student</option>
                  <option value="Tutor">Tutor</option>
                  <option value="Parent">Parent</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full rounded-xl bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700"
              >
                {editingUser ? "Save Changes" : "Create User"}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* User Details Modal */}
      {selectedUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-xl font-bold text-slate-800">User Details</h2>
              <button
                onClick={() => setSelectedUser(null)}
                className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"
              >
                <X size={20} />
              </button>
            </div>

            <div className="mb-6 flex flex-col items-center">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-3xl font-bold text-white">
                {selectedUser.name.charAt(0)}
              </div>
              <h3 className="mt-3 text-xl font-bold text-slate-800">
                {selectedUser.name}
              </h3>
              <span className="mt-2 rounded-full bg-indigo-50 px-3 py-1 text-sm font-semibold text-indigo-600">
                {selectedUser.role}
              </span>
            </div>

            <div className="space-y-4 rounded-xl bg-slate-50 p-4">
              <div className="flex items-center gap-3 text-sm text-slate-600">
                <Mail size={17} />
                {selectedUser.email}
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-600">
                <CalendarDays size={17} />
                Joined {selectedUser.joined}
              </div>
              <div className="text-sm text-slate-600">
                Status: <strong>{selectedUser.status}</strong>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default UsersPage;
