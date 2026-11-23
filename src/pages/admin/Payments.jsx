import { useMemo, useState } from "react";
import {
  Search,
  CreditCard,
  CheckCircle,
  Clock,
  XCircle,
  DollarSign,
  Eye,
  Pencil,
  Trash2,
  X,
  CalendarDays,
  User,
  BookOpen,
  Receipt,
  TrendingUp,
  Wallet,
} from "lucide-react";

const initialPayments = [
  {
    id: 1,
    transactionId: "TXN-2026-001",
    student: "Abebe Kebede",
    email: "abebe@example.com",
    course: "Full Stack Web Development",
    amount: 2500,
    method: "Chapa",
    date: "2026-11-10",
    status: "Completed",
  },
  {
    id: 2,
    transactionId: "TXN-2026-002",
    student: "Meron Alemu",
    email: "meron@example.com",
    course: "Python Programming",
    amount: 1800,
    method: "Telebirr",
    date: "2026-11-12",
    status: "Pending",
  },
  {
    id: 3,
    transactionId: "TXN-2026-003",
    student: "Dawit Tesfaye",
    email: "dawit@example.com",
    course: "UI/UX Design",
    amount: 2000,
    method: "Bank Transfer",
    date: "2026-11-14",
    status: "Completed",
  },
  {
    id: 4,
    transactionId: "TXN-2026-004",
    student: "Hana Girma",
    email: "hana@example.com",
    course: "Database Management",
    amount: 1500,
    method: "Chapa",
    date: "2026-11-15",
    status: "Failed",
  },
  {
    id: 5,
    transactionId: "TXN-2026-005",
    student: "Yonas Bekele",
    email: "yonas@example.com",
    course: "JavaScript Fundamentals",
    amount: 1200,
    method: "Telebirr",
    date: "2026-11-17",
    status: "Completed",
  },
  {
    id: 6,
    transactionId: "TXN-2026-006",
    student: "Sara Mulu",
    email: "sara@example.com",
    course: "React Development",
    amount: 2200,
    method: "Chapa",
    date: "2026-11-19",
    status: "Pending",
  },
];

const statusStyles = {
  Completed: "bg-green-100 text-green-700",
  Pending: "bg-amber-100 text-amber-700",
  Failed: "bg-red-100 text-red-700",
  Refunded: "bg-purple-100 text-purple-700",
};

function PaymentsPage() {
  const [payments, setPayments] = useState(initialPayments);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [methodFilter, setMethodFilter] = useState("All");

  const [showDetails, setShowDetails] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [editingPayment, setEditingPayment] = useState(null);

  const [formData, setFormData] = useState({
    student: "",
    email: "",
    course: "",
    amount: "",
    method: "Chapa",
    date: new Date().toISOString().split("T")[0],
    status: "Pending",
  });

  const completedPayments = payments.filter(
    (payment) => payment.status === "Completed",
  );

  const stats = [
    {
      title: "Total Transactions",
      value: payments.length,
      icon: Receipt,
      bg: "bg-blue-50",
      color: "from-blue-500 to-indigo-600",
    },
    {
      title: "Total Revenue",
      value: `${completedPayments
        .reduce((sum, payment) => sum + payment.amount, 0)
        .toLocaleString()} ETB`,
      icon: Wallet,
      bg: "bg-green-50",
      color: "from-emerald-500 to-green-600",
    },
    {
      title: "Pending Payments",
      value: payments.filter((p) => p.status === "Pending").length,
      icon: Clock,
      bg: "bg-amber-50",
      color: "from-amber-500 to-orange-500",
    },
    {
      title: "Failed Payments",
      value: payments.filter((p) => p.status === "Failed").length,
      icon: XCircle,
      bg: "bg-red-50",
      color: "from-red-500 to-rose-600",
    },
  ];

  const filteredPayments = useMemo(() => {
    return payments.filter((payment) => {
      const searchTerm = search.toLowerCase();

      const matchesSearch =
        payment.transactionId.toLowerCase().includes(searchTerm) ||
        payment.student.toLowerCase().includes(searchTerm) ||
        payment.email.toLowerCase().includes(searchTerm) ||
        payment.course.toLowerCase().includes(searchTerm);

      const matchesStatus =
        statusFilter === "All" || payment.status === statusFilter;

      const matchesMethod =
        methodFilter === "All" || payment.method === methodFilter;

      return matchesSearch && matchesStatus && matchesMethod;
    });
  }, [payments, search, statusFilter, methodFilter]);

  const openAddModal = () => {
    setEditingPayment(null);
    setFormData({
      student: "",
      email: "",
      course: "",
      amount: "",
      method: "Chapa",
      date: new Date().toISOString().split("T")[0],
      status: "Pending",
    });
    setShowModal(true);
  };

  const openEditModal = (payment) => {
    setEditingPayment(payment);
    setFormData({
      student: payment.student,
      email: payment.email,
      course: payment.course,
      amount: payment.amount,
      method: payment.method,
      date: payment.date,
      status: payment.status,
    });
    setShowModal(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !formData.student.trim() ||
      !formData.email.trim() ||
      !formData.course.trim() ||
      !formData.amount
    ) {
      return;
    }

    const paymentData = {
      ...formData,
      student: formData.student.trim(),
      email: formData.email.trim(),
      course: formData.course.trim(),
      amount: Number(formData.amount),
    };

    if (editingPayment) {
      setPayments((prev) =>
        prev.map((payment) =>
          payment.id === editingPayment.id
            ? { ...payment, ...paymentData }
            : payment,
        ),
      );
    } else {
      const newPayment = {
        id: Date.now(),
        transactionId: `TXN-${Date.now()}`,
        ...paymentData,
      };

      setPayments((prev) => [newPayment, ...prev]);
    }

    setShowModal(false);
  };

  const handleDelete = (payment) => {
    if (
      window.confirm(
        `Are you sure you want to delete transaction ${payment.transactionId}?`,
      )
    ) {
      setPayments((prev) => prev.filter((item) => item.id !== payment.id));
    }
  };

  const updateStatus = (id, status) => {
    setPayments((prev) =>
      prev.map((payment) =>
        payment.id === id ? { ...payment, status } : payment,
      ),
    );

    setSelectedPayment((prev) =>
      prev?.id === id ? { ...prev, status } : prev,
    );
  };

  return (
    <div className="min-h-screen space-y-7 p-4 sm:p-6 lg:p-8">
      {/* Page Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 sm:text-3xl">
            Payment Management
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Monitor transactions, payments, and platform revenue.
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-5 py-3 font-semibold text-white shadow-lg shadow-blue-200 transition hover:-translate-y-0.5 hover:shadow-xl"
        >
          <CreditCard size={20} />
          Add Payment
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
                  <h2 className="mt-2 text-2xl font-bold text-slate-800">
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

      {/* Revenue Summary */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <div className="flex items-center justify-between rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-700 p-6 text-white shadow-lg">
          <div>
            <p className="text-sm font-medium text-blue-100">
              Successfully Collected
            </p>
            <h2 className="mt-2 text-3xl font-bold">
              {completedPayments
                .reduce((sum, payment) => sum + payment.amount, 0)
                .toLocaleString()}{" "}
              ETB
            </h2>
            <p className="mt-2 text-xs text-blue-100">
              From completed transactions
            </p>
          </div>

          <div className="rounded-2xl bg-white/15 p-4">
            <TrendingUp size={32} />
          </div>
        </div>

        <div className="flex items-center justify-between rounded-2xl bg-gradient-to-r from-purple-600 to-violet-700 p-6 text-white shadow-lg">
          <div>
            <p className="text-sm font-medium text-purple-100">
              Pending Amount
            </p>
            <h2 className="mt-2 text-3xl font-bold">
              {payments
                .filter((payment) => payment.status === "Pending")
                .reduce((sum, payment) => sum + payment.amount, 0)
                .toLocaleString()}{" "}
              ETB
            </h2>
            <p className="mt-2 text-xs text-purple-100">
              Awaiting payment confirmation
            </p>
          </div>

          <div className="rounded-2xl bg-white/15 p-4">
            <Clock size={32} />
          </div>
        </div>
      </div>

      {/* Payments Table */}
      <div className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm">
        <div className="flex flex-col justify-between gap-4 border-b border-slate-100 p-5 xl:flex-row xl:items-center">
          <div>
            <h2 className="text-lg font-bold text-slate-800">
              All Transactions
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Review and manage all payment transactions.
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
                placeholder="Search transactions..."
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
              <option value="Completed">Completed</option>
              <option value="Pending">Pending</option>
              <option value="Failed">Failed</option>
              <option value="Refunded">Refunded</option>
            </select>

            <select
              value={methodFilter}
              onChange={(e) => setMethodFilter(e.target.value)}
              className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm outline-none focus:border-blue-500"
            >
              <option value="All">All Methods</option>
              <option value="Chapa">Chapa</option>
              <option value="Telebirr">Telebirr</option>
              <option value="Bank Transfer">Bank Transfer</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[1050px] text-left">
            <thead className="bg-slate-50 text-xs uppercase tracking-wider text-slate-500">
              <tr>
                <th className="px-6 py-4">Transaction ID</th>
                <th className="px-6 py-4">Student</th>
                <th className="px-6 py-4">Course</th>
                <th className="px-6 py-4">Amount</th>
                <th className="px-6 py-4">Method</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-center">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {filteredPayments.map((payment) => (
                <tr key={payment.id} className="transition hover:bg-blue-50/40">
                  <td className="px-6 py-4">
                    <span className="font-semibold text-blue-600">
                      {payment.transactionId}
                    </span>
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 font-bold text-blue-700">
                        {payment.student.charAt(0)}
                      </div>
                      <div>
                        <p className="font-semibold text-slate-800">
                          {payment.student}
                        </p>
                        <p className="text-xs text-slate-400">
                          {payment.email}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-4 text-sm text-slate-600">
                    {payment.course}
                  </td>

                  <td className="px-6 py-4 text-sm font-bold text-slate-800">
                    {payment.amount.toLocaleString()} ETB
                  </td>

                  <td className="px-6 py-4">
                    <span className="rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-700">
                      {payment.method}
                    </span>
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-sm text-slate-500">
                      <CalendarDays size={16} />
                      {payment.date}
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    <select
                      value={payment.status}
                      onChange={(e) => updateStatus(payment.id, e.target.value)}
                      className={`rounded-full border-0 px-3 py-1.5 text-xs font-semibold outline-none ${
                        statusStyles[payment.status]
                      }`}
                    >
                      <option value="Completed">Completed</option>
                      <option value="Pending">Pending</option>
                      <option value="Failed">Failed</option>
                      <option value="Refunded">Refunded</option>
                    </select>
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => {
                          setSelectedPayment(payment);
                          setShowDetails(true);
                        }}
                        title="View details"
                        className="rounded-lg bg-blue-50 p-2 text-blue-600 transition hover:bg-blue-100"
                      >
                        <Eye size={17} />
                      </button>

                      <button
                        onClick={() => openEditModal(payment)}
                        title="Edit payment"
                        className="rounded-lg bg-amber-50 p-2 text-amber-600 transition hover:bg-amber-100"
                      >
                        <Pencil size={17} />
                      </button>

                      <button
                        onClick={() => handleDelete(payment)}
                        title="Delete payment"
                        className="rounded-lg bg-red-50 p-2 text-red-600 transition hover:bg-red-100"
                      >
                        <Trash2 size={17} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {filteredPayments.length === 0 && (
                <tr>
                  <td
                    colSpan="8"
                    className="px-6 py-12 text-center text-slate-500"
                  >
                    No transactions found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="border-t border-slate-100 px-6 py-4 text-sm text-slate-500">
          Showing {filteredPayments.length} of {payments.length} transactions
        </div>
      </div>

      {/* Add / Edit Payment Modal */}
      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-black/50 p-4">
          <div className="my-8 w-full max-w-xl rounded-2xl bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 p-5">
              <div>
                <h2 className="text-xl font-bold text-slate-800">
                  {editingPayment ? "Edit Payment" : "Add New Payment"}
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  Enter transaction information.
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
                  Student Name
                </label>
                <input
                  required
                  value={formData.student}
                  onChange={(e) =>
                    setFormData({ ...formData, student: e.target.value })
                  }
                  placeholder="Enter student name"
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-500"
                />
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
                <input
                  required
                  value={formData.course}
                  onChange={(e) =>
                    setFormData({ ...formData, course: e.target.value })
                  }
                  placeholder="Enter course name"
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-500"
                />
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Amount (ETB)
                  </label>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    required
                    value={formData.amount}
                    onChange={(e) =>
                      setFormData({ ...formData, amount: e.target.value })
                    }
                    placeholder="2500"
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Payment Date
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.date}
                    onChange={(e) =>
                      setFormData({ ...formData, date: e.target.value })
                    }
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Payment Method
                  </label>
                  <select
                    value={formData.method}
                    onChange={(e) =>
                      setFormData({ ...formData, method: e.target.value })
                    }
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-500"
                  >
                    <option value="Chapa">Chapa</option>
                    <option value="Telebirr">Telebirr</option>
                    <option value="Bank Transfer">Bank Transfer</option>
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Payment Status
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) =>
                      setFormData({ ...formData, status: e.target.value })
                    }
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-500"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Completed">Completed</option>
                    <option value="Failed">Failed</option>
                    <option value="Refunded">Refunded</option>
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
                  {editingPayment ? "Save Changes" : "Create Payment"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Payment Details Modal */}
      {showDetails && selectedPayment && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-black/50 p-4">
          <div className="my-8 w-full max-w-md rounded-2xl bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 p-5">
              <h2 className="text-xl font-bold text-slate-800">
                Transaction Details
              </h2>

              <button
                onClick={() => setShowDetails(false)}
                className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"
              >
                <X size={21} />
              </button>
            </div>

            <div className="space-y-5 p-6">
              <div className="rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-700 p-5 text-center text-white">
                <DollarSign size={30} className="mx-auto mb-2" />
                <p className="text-sm text-blue-100">Transaction Amount</p>
                <h3 className="mt-1 text-3xl font-bold">
                  {selectedPayment.amount.toLocaleString()} ETB
                </h3>
                <p className="mt-2 text-xs text-blue-100">
                  {selectedPayment.transactionId}
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="rounded-xl bg-blue-50 p-3 text-blue-600">
                    <User size={20} />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400">Student</p>
                    <p className="font-semibold text-slate-800">
                      {selectedPayment.student}
                    </p>
                    <p className="text-xs text-slate-500">
                      {selectedPayment.email}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="rounded-xl bg-purple-50 p-3 text-purple-600">
                    <BookOpen size={20} />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400">Course</p>
                    <p className="font-semibold text-slate-800">
                      {selectedPayment.course}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="rounded-xl bg-green-50 p-3 text-green-600">
                    <CreditCard size={20} />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400">Payment Method</p>
                    <p className="font-semibold text-slate-800">
                      {selectedPayment.method}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="rounded-xl bg-amber-50 p-3 text-amber-600">
                    <CalendarDays size={20} />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400">Payment Date</p>
                    <p className="font-semibold text-slate-800">
                      {selectedPayment.date}
                    </p>
                  </div>
                </div>
              </div>

              <div className="border-t border-slate-100 pt-4">
                <p className="mb-2 text-xs font-semibold uppercase text-slate-400">
                  Transaction Status
                </p>
                <span
                  className={`rounded-full px-3 py-1.5 text-xs font-semibold ${
                    statusStyles[selectedPayment.status]
                  }`}
                >
                  {selectedPayment.status}
                </span>
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

export default PaymentsPage;
