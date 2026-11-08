import { useMemo, useState } from "react";
import {
  Wallet,
  TrendingUp,
  Users,
  BookOpen,
  Download,
  Search,
  CalendarDays,
  ArrowUpRight,
  ArrowDownRight,
  CheckCircle,
  Clock,
  CreditCard,
  MoreHorizontal,
  Banknote,
} from "lucide-react";

const initialTransactions = [
  {
    id: "TXN-2026-001",
    student: "Abel Asres",
    course: "Full Stack Web Development",
    date: "Nov 08, 2026",
    amount: 1200,
    status: "Completed",
    method: "Telebirr",
  },
  {
    id: "TXN-2026-002",
    student: "Sara Bekele",
    course: "React.js for Beginners",
    date: "Nov 07, 2026",
    amount: 850,
    status: "Pending",
    method: "CBE Birr",
  },
  {
    id: "TXN-2026-003",
    student: "Dawit Alemu",
    course: "Python Programming",
    date: "Nov 05, 2026",
    amount: 1500,
    status: "Completed",
    method: "Telebirr",
  },
  {
    id: "TXN-2026-004",
    student: "Meron Tadesse",
    course: "Full Stack Web Development",
    date: "Nov 03, 2026",
    amount: 1200,
    status: "Completed",
    method: "Bank Transfer",
  },
  {
    id: "TXN-2026-005",
    student: "Yonas Girma",
    course: "Database Management",
    date: "Nov 01, 2026",
    amount: 950,
    status: "Failed",
    method: "CBE Birr",
  },
  {
    id: "TXN-2026-006",
    student: "Hana Mohammed",
    course: "Python Programming",
    date: "Oct 28, 2026",
    amount: 1500,
    status: "Completed",
    method: "Telebirr",
  },
];

const monthlyEarnings = [
  { month: "May", amount: 4200 },
  { month: "Jun", amount: 5800 },
  { month: "Jul", amount: 4900 },
  { month: "Aug", amount: 7200 },
  { month: "Sep", amount: 6500 },
  { month: "Oct", amount: 8900 },
  { month: "Nov", amount: 6200 },
];

const formatCurrency = (amount) => `${amount.toLocaleString("en-US")} ETB`;

export default function TutorEarnings() {
  const [transactions] = useState(initialTransactions);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [period, setPeriod] = useState("Last 7 months");

  const filteredTransactions = useMemo(() => {
    return transactions.filter((transaction) => {
      const matchesSearch =
        transaction.student.toLowerCase().includes(searchTerm.toLowerCase()) ||
        transaction.course.toLowerCase().includes(searchTerm.toLowerCase()) ||
        transaction.id.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus =
        statusFilter === "All" || transaction.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [transactions, searchTerm, statusFilter]);

  const totalEarnings = 42500;
  const availableBalance = 12800;
  const pendingBalance = 3200;
  const withdrawnAmount = 26500;

  const maxEarning = Math.max(...monthlyEarnings.map((item) => item.amount));

  const downloadTransactions = () => {
    const headers = [
      "Transaction ID",
      "Student",
      "Course",
      "Date",
      "Amount",
      "Status",
      "Payment Method",
    ];

    const rows = filteredTransactions.map((transaction) => [
      transaction.id,
      transaction.student,
      transaction.course,
      transaction.date,
      transaction.amount,
      transaction.status,
      transaction.method,
    ]);

    const csv = [headers, ...rows]
      .map((row) => row.map((value) => `"${value}"`).join(","))
      .join("\n");

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "tutor-transactions.csv";
    link.click();

    URL.revokeObjectURL(url);
  };

  const requestPayout = () => {
    alert(
      "Your payout request has been submitted successfully. This is a demo action.",
    );
  };

  return (
    <div className="space-y-6">
      {/* Page heading */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Earnings & Payments
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Track your income, transactions, and payouts.
          </p>
        </div>

        <button
          onClick={downloadTransactions}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-800 px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-900"
        >
          <Download size={18} />
          Export Transactions
        </button>
      </div>

      {/* Earnings statistics */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Total Earnings"
          value={formatCurrency(totalEarnings)}
          subtitle="Lifetime income"
          icon={Wallet}
          color="bg-blue-100 text-blue-600"
          trend="+12.5%"
          positive
        />

        <StatCard
          title="Available Balance"
          value={formatCurrency(availableBalance)}
          subtitle="Ready for withdrawal"
          icon={Banknote}
          color="bg-green-100 text-green-600"
        />

        <StatCard
          title="Pending Payments"
          value={formatCurrency(pendingBalance)}
          subtitle="Awaiting confirmation"
          icon={Clock}
          color="bg-orange-100 text-orange-600"
        />

        <StatCard
          title="Total Withdrawn"
          value={formatCurrency(withdrawnAmount)}
          subtitle="Successfully paid out"
          icon={CreditCard}
          color="bg-purple-100 text-purple-600"
        />
      </div>

      {/* Chart and payout */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        {/* Monthly earnings chart */}
        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm xl:col-span-2">
          <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-lg font-bold text-gray-900">
                Earnings Overview
              </h2>
              <p className="text-sm text-gray-500">
                Your monthly income performance
              </p>
            </div>

            <select
              value={period}
              onChange={(e) => setPeriod(e.target.value)}
              className="rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-brand-600"
            >
              <option>Last 7 months</option>
              <option>This year</option>
            </select>
          </div>

          <div className="mb-5 flex items-end gap-2">
            <h3 className="text-3xl font-bold text-gray-900">
              {formatCurrency(6200)}
            </h3>
            <span className="mb-1 flex items-center text-sm font-medium text-green-600">
              <ArrowUpRight size={16} />
              12.5%
            </span>
          </div>

          <div className="flex h-56 items-end justify-between gap-2 border-b border-gray-100 pb-2">
            {monthlyEarnings.map((item) => (
              <div
                key={item.month}
                className="flex h-full flex-1 flex-col items-center justify-end gap-2"
              >
                <span className="text-[10px] text-gray-500 sm:text-xs">
                  {(item.amount / 1000).toFixed(1)}k
                </span>

                <div
                  className={`w-full max-w-12 rounded-t-lg transition-all ${
                    item.month === "Nov"
                      ? "bg-brand-800"
                      : "bg-brand-200 hover:bg-brand-400"
                  }`}
                  style={{
                    height: `${(item.amount / maxEarning) * 75}%`,
                  }}
                  title={`${item.month}: ${formatCurrency(item.amount)}`}
                />

                <span className="text-xs text-gray-500">{item.month}</span>
              </div>
            ))}
          </div>

          <div className="mt-5 flex items-center gap-2 text-xs text-gray-500">
            <span className="h-3 w-3 rounded-sm bg-brand-800" />
            Current month
            <span className="ml-3 h-3 w-3 rounded-sm bg-brand-200" />
            Previous months
          </div>
        </div>

        {/* Payout card */}
        <div className="flex flex-col rounded-2xl bg-brand-800 p-6 text-white shadow-sm">
          <div className="flex items-center justify-between">
            <div className="rounded-xl bg-white/10 p-3">
              <Wallet size={24} />
            </div>
            <span className="rounded-full bg-white/10 px-3 py-1 text-xs">
              Payout account
            </span>
          </div>

          <div className="mt-8">
            <p className="text-sm text-white/70">Available for withdrawal</p>
            <h2 className="mt-2 text-3xl font-bold">
              {formatCurrency(availableBalance)}
            </h2>
          </div>

          <div className="mt-6 space-y-3 border-t border-white/20 pt-5">
            <div className="flex justify-between text-sm">
              <span className="text-white/70">Pending balance</span>
              <span className="font-semibold">
                {formatCurrency(pendingBalance)}
              </span>
            </div>

            <div className="flex justify-between text-sm">
              <span className="text-white/70">Payment method</span>
              <span className="font-semibold">Telebirr</span>
            </div>

            <div className="flex justify-between text-sm">
              <span className="text-white/70">Next payout</span>
              <span className="font-semibold">Nov 15, 2026</span>
            </div>
          </div>

          <button
            onClick={requestPayout}
            className="mt-auto flex items-center justify-center gap-2 rounded-xl bg-white py-3 font-semibold text-brand-800 transition hover:bg-gray-100"
          >
            <CreditCard size={18} />
            Request Withdrawal
          </button>

          <p className="mt-3 text-center text-xs text-white/60">
            Demo only — no real money will be transferred.
          </p>
        </div>
      </div>

      {/* Earnings breakdown */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-bold text-gray-900">Top Earning Courses</h3>
            <BookOpen className="text-gray-400" size={20} />
          </div>

          <div className="space-y-5">
            <CourseEarning
              name="Full Stack Web Development"
              students="45 students"
              amount="15,500 ETB"
              percentage={85}
            />
            <CourseEarning
              name="React.js for Beginners"
              students="32 students"
              amount="11,000 ETB"
              percentage={65}
            />
            <CourseEarning
              name="Python Programming"
              students="28 students"
              amount="9,000 ETB"
              percentage={50}
            />
          </div>
        </div>

        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-bold text-gray-900">Payment Summary</h3>
            <TrendingUp className="text-gray-400" size={20} />
          </div>

          <div className="space-y-4">
            <SummaryRow
              icon={CheckCircle}
              label="Successful payments"
              value="38"
              color="text-green-600 bg-green-50"
            />
            <SummaryRow
              icon={Clock}
              label="Pending payments"
              value="5"
              color="text-orange-600 bg-orange-50"
            />
            <SummaryRow
              icon={ArrowDownRight}
              label="Failed payments"
              value="2"
              color="text-red-600 bg-red-50"
            />
            <SummaryRow
              icon={Users}
              label="Paying students"
              value="45"
              color="text-blue-600 bg-blue-50"
            />
          </div>
        </div>
      </div>

      {/* Transaction history */}
      <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
        <div className="border-b border-gray-100 p-5">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="text-lg font-bold text-gray-900">
                Transaction History
              </h2>
              <p className="text-sm text-gray-500">
                Review payments from your students.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <div className="relative">
                <Search
                  size={17}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />
                <input
                  type="text"
                  placeholder="Search transactions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full rounded-lg border border-gray-200 py-2.5 pl-9 pr-3 text-sm outline-none focus:border-brand-600 sm:w-64"
                />
              </div>

              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="rounded-lg border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-brand-600"
              >
                <option value="All">All Status</option>
                <option value="Completed">Completed</option>
                <option value="Pending">Pending</option>
                <option value="Failed">Failed</option>
              </select>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[850px] text-left">
            <thead className="bg-gray-50 text-xs uppercase text-gray-500">
              <tr>
                <th className="px-5 py-4 font-semibold">Transaction</th>
                <th className="px-5 py-4 font-semibold">Student</th>
                <th className="px-5 py-4 font-semibold">Course</th>
                <th className="px-5 py-4 font-semibold">Date</th>
                <th className="px-5 py-4 font-semibold">Amount</th>
                <th className="px-5 py-4 font-semibold">Method</th>
                <th className="px-5 py-4 font-semibold">Status</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {filteredTransactions.map((transaction) => (
                <tr
                  key={transaction.id}
                  className="transition hover:bg-gray-50"
                >
                  <td className="px-5 py-4 text-sm font-medium text-brand-800">
                    {transaction.id}
                  </td>
                  <td className="px-5 py-4 text-sm font-semibold text-gray-800">
                    {transaction.student}
                  </td>
                  <td className="max-w-48 truncate px-5 py-4 text-sm text-gray-600">
                    {transaction.course}
                  </td>
                  <td className="px-5 py-4 text-sm text-gray-500">
                    {transaction.date}
                  </td>
                  <td className="px-5 py-4 text-sm font-bold text-gray-900">
                    {formatCurrency(transaction.amount)}
                  </td>
                  <td className="px-5 py-4 text-sm text-gray-600">
                    {transaction.method}
                  </td>
                  <td className="px-5 py-4">
                    <StatusBadge status={transaction.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredTransactions.length === 0 && (
            <div className="p-10 text-center text-sm text-gray-500">
              No transactions found.
            </div>
          )}
        </div>

        <div className="border-t border-gray-100 px-5 py-4 text-sm text-gray-500">
          Showing {filteredTransactions.length} of {transactions.length}{" "}
          transactions
        </div>
      </div>
    </div>
  );
}

function StatCard({
  title,
  value,
  subtitle,
  icon: Icon,
  color,
  trend,
  positive,
}) {
  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between">
        <div className={`rounded-xl p-3 ${color}`}>
          <Icon size={22} />
        </div>
        {trend && (
          <span
            className={`flex items-center gap-1 text-xs font-semibold ${
              positive ? "text-green-600" : "text-red-600"
            }`}
          >
            <ArrowUpRight size={15} />
            {trend}
          </span>
        )}
      </div>
      <p className="mt-4 text-sm text-gray-500">{title}</p>
      <h3 className="mt-1 text-xl font-bold text-gray-900">{value}</h3>
      <p className="mt-1 text-xs text-gray-400">{subtitle}</p>
    </div>
  );
}

function CourseEarning({ name, students, amount, percentage }) {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between gap-3">
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-gray-800">{name}</p>
          <p className="text-xs text-gray-400">{students}</p>
        </div>
        <p className="shrink-0 text-sm font-bold text-gray-900">{amount}</p>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-gray-100">
        <div
          className="h-full rounded-full bg-brand-700"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}

function SummaryRow({ icon: Icon, label, value, color }) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className={`rounded-lg p-2 ${color}`}>
          <Icon size={18} />
        </div>
        <span className="text-sm text-gray-600">{label}</span>
      </div>
      <span className="font-bold text-gray-900">{value}</span>
    </div>
  );
}

function StatusBadge({ status }) {
  const styles = {
    Completed: "bg-green-50 text-green-700",
    Pending: "bg-orange-50 text-orange-700",
    Failed: "bg-red-50 text-red-700",
  };

  return (
    <span
      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
        styles[status] || "bg-gray-100 text-gray-600"
      }`}
    >
      {status}
    </span>
  );
}
