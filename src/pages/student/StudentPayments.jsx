import { useState } from "react";
import {
  Wallet,
  CreditCard,
  CheckCircle,
  Clock,
  AlertCircle,
  Download,
  Plus,
  Search,
  Receipt,
  CalendarDays,
  X,
  ShieldCheck,
} from "lucide-react";

const initialPayments = [
  {
    id: "PAY-2026-001",
    course: "Full Stack Web Development",
    date: "Nov 02, 2026",
    amount: 3500,
    method: "Telebirr",
    status: "Paid",
  },
  {
    id: "PAY-2026-002",
    course: "UI/UX Design Fundamentals",
    date: "Oct 25, 2026",
    amount: 2500,
    method: "CBE Birr",
    status: "Paid",
  },
  {
    id: "PAY-2026-003",
    course: "Python Programming",
    date: "Nov 08, 2026",
    amount: 2000,
    method: "Telebirr",
    status: "Pending",
  },
  {
    id: "PAY-2026-004",
    course: "Database Management",
    date: "Oct 10, 2026",
    amount: 3000,
    method: "Bank Transfer",
    status: "Paid",
  },
];

const formatETB = (amount) =>
  new Intl.NumberFormat("en-ET", {
    style: "currency",
    currency: "ETB",
    maximumFractionDigits: 0,
  }).format(amount);

export default function StudentPayments() {
  const [payments, setPayments] = useState(initialPayments);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [showModal, setShowModal] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState("Telebirr");
  const [selectedCourse, setSelectedCourse] = useState(
    "Full Stack Web Development",
  );
  const [amount, setAmount] = useState("3500");

  const paidAmount = payments
    .filter((payment) => payment.status === "Paid")
    .reduce((sum, payment) => sum + payment.amount, 0);

  const pendingAmount = payments
    .filter((payment) => payment.status === "Pending")
    .reduce((sum, payment) => sum + payment.amount, 0);

  const filteredPayments = payments.filter((payment) => {
    const matchesSearch =
      payment.course.toLowerCase().includes(search.toLowerCase()) ||
      payment.id.toLowerCase().includes(search.toLowerCase());

    const matchesFilter = filter === "All" || payment.status === filter;

    return matchesSearch && matchesFilter;
  });

  const handlePayment = (e) => {
    e.preventDefault();

    const numericAmount = Number(amount);

    if (!numericAmount || numericAmount <= 0) {
      alert("Please enter a valid payment amount.");
      return;
    }

    const newPayment = {
      id: `PAY-${Date.now()}`,
      course: selectedCourse,
      date: new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "2-digit",
        year: "numeric",
      }),
      amount: numericAmount,
      method: selectedMethod,
      status: "Pending",
    };

    setPayments((previous) => [newPayment, ...previous]);
    setShowModal(false);
    setAmount("");
    alert(
      "Demo payment request created. Connect a payment gateway to process real payments.",
    );
  };

  const downloadReceipt = (payment) => {
    const receipt = `
EDUCONNECT ET
PAYMENT RECEIPT

Transaction ID: ${payment.id}
Course: ${payment.course}
Date: ${payment.date}
Amount: ${formatETB(payment.amount)}
Payment Method: ${payment.method}
Status: ${payment.status}

Thank you for learning with EduConnect ET.
`;

    const blob = new Blob([receipt], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = `${payment.id}-receipt.txt`;
    link.click();

    URL.revokeObjectURL(url);
  };

  const summaryCards = [
    {
      title: "Total Paid",
      amount: formatETB(paidAmount),
      description: "Successfully paid",
      icon: CheckCircle,
      color: "text-green-600",
      bg: "bg-green-100",
    },
    {
      title: "Pending Payments",
      amount: formatETB(pendingAmount),
      description: "Awaiting confirmation",
      icon: Clock,
      color: "text-orange-600",
      bg: "bg-orange-100",
    },
    {
      title: "Total Transactions",
      amount: payments.length,
      description: "All payment records",
      icon: Receipt,
      color: "text-blue-600",
      bg: "bg-blue-100",
    },
  ];

  return (
    <div className="space-y-7">
      {/* Heading */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">
            Payments & Billing
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Manage your course payments and view transaction history.
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
        >
          <Plus size={18} />
          Make a Payment
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {summaryCards.map((card) => {
          const Icon = card.icon;

          return (
            <div
              key={card.title}
              className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <div className={`rounded-xl p-3 ${card.bg}`}>
                  <Icon size={22} className={card.color} />
                </div>
                <Wallet size={20} className="text-slate-300" />
              </div>

              <p className="mt-5 text-sm text-slate-500">{card.title}</p>
              <h2 className="mt-1 text-2xl font-bold text-slate-800">
                {card.amount}
              </h2>
              <p className="mt-1 text-xs text-slate-400">{card.description}</p>
            </div>
          );
        })}
      </div>

      {/* Payment Notice */}
      <div className="flex flex-col gap-4 rounded-2xl border border-blue-100 bg-blue-50 p-5 sm:flex-row sm:items-center">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white text-blue-600">
          <ShieldCheck size={25} />
        </div>

        <div className="flex-1">
          <h3 className="font-bold text-slate-800">Secure course payments</h3>
          <p className="mt-1 text-sm text-slate-600">
            Payment processing through Telebirr, CBE Birr, and other supported
            providers will be available after gateway integration.
          </p>
        </div>
      </div>

      {/* Payment History */}
      <div className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm">
        <div className="flex flex-col justify-between gap-4 border-b border-slate-100 p-5 md:flex-row md:items-center">
          <div>
            <h2 className="font-bold text-slate-800">Payment History</h2>
            <p className="mt-1 text-sm text-slate-500">
              View and manage your course transactions.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <div className="relative">
              <Search
                size={17}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search payments..."
                className="w-full rounded-lg border border-slate-200 py-2.5 pl-9 pr-3 text-sm outline-none focus:border-blue-500 sm:w-52"
              />
            </div>

            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-blue-500"
            >
              <option value="All">All Payments</option>
              <option value="Paid">Paid</option>
              <option value="Pending">Pending</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[750px] text-left">
            <thead className="bg-slate-50 text-xs uppercase text-slate-500">
              <tr>
                <th className="px-6 py-4 font-semibold">Transaction ID</th>
                <th className="px-6 py-4 font-semibold">Course</th>
                <th className="px-6 py-4 font-semibold">Date</th>
                <th className="px-6 py-4 font-semibold">Amount</th>
                <th className="px-6 py-4 font-semibold">Method</th>
                <th className="px-6 py-4 font-semibold">Status</th>
                <th className="px-6 py-4 font-semibold">Receipt</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {filteredPayments.map((payment) => (
                <tr key={payment.id} className="transition hover:bg-slate-50">
                  <td className="px-6 py-4 text-sm font-medium text-blue-600">
                    {payment.id}
                  </td>

                  <td className="px-6 py-4 text-sm font-medium text-slate-700">
                    {payment.course}
                  </td>

                  <td className="px-6 py-4 text-sm text-slate-500">
                    <span className="flex items-center gap-2">
                      <CalendarDays size={15} />
                      {payment.date}
                    </span>
                  </td>

                  <td className="px-6 py-4 text-sm font-semibold text-slate-800">
                    {formatETB(payment.amount)}
                  </td>

                  <td className="px-6 py-4 text-sm text-slate-600">
                    {payment.method}
                  </td>

                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold ${
                        payment.status === "Paid"
                          ? "bg-green-100 text-green-700"
                          : "bg-orange-100 text-orange-700"
                      }`}
                    >
                      {payment.status === "Paid" ? (
                        <CheckCircle size={13} />
                      ) : (
                        <Clock size={13} />
                      )}
                      {payment.status}
                    </span>
                  </td>

                  <td className="px-6 py-4">
                    <button
                      onClick={() => downloadReceipt(payment)}
                      className="rounded-lg p-2 text-slate-500 transition hover:bg-blue-50 hover:text-blue-600"
                      title="Download receipt"
                    >
                      <Download size={18} />
                    </button>
                  </td>
                </tr>
              ))}

              {filteredPayments.length === 0 && (
                <tr>
                  <td
                    colSpan="7"
                    className="px-6 py-12 text-center text-sm text-slate-500"
                  >
                    No payment records found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Payment Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-slate-800">
                  Make a Payment
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  Create a demo payment request.
                </p>
              </div>

              <button
                onClick={() => setShowModal(false)}
                className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handlePayment} className="space-y-4">
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Select Course
                </label>
                <select
                  value={selectedCourse}
                  onChange={(e) => setSelectedCourse(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-500"
                >
                  <option>Full Stack Web Development</option>
                  <option>UI/UX Design Fundamentals</option>
                  <option>Python Programming</option>
                  <option>Database Management</option>
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Amount (ETB)
                </label>
                <input
                  type="number"
                  min="1"
                  required
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="Enter amount"
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Payment Method
                </label>
                <select
                  value={selectedMethod}
                  onChange={(e) => setSelectedMethod(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-500"
                >
                  <option>Telebirr</option>
                  <option>CBE Birr</option>
                  <option>Bank Transfer</option>
                </select>
              </div>

              <div className="rounded-xl bg-slate-50 p-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-500">Payment amount</span>
                  <span className="font-bold text-slate-800">
                    {formatETB(Number(amount) || 0)}
                  </span>
                </div>
              </div>

              <button
                type="submit"
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700"
              >
                <CreditCard size={18} />
                Continue
              </button>
            </form>

            <p className="mt-4 text-center text-xs text-slate-400">
              Demo only — no real money will be transferred.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
