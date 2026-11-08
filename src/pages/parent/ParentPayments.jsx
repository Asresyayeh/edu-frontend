import { useMemo, useState } from "react";
import {
  CreditCard,
  Wallet,
  CheckCircle,
  Clock,
  Download,
  Search,
  Filter,
  CalendarDays,
  BookOpen,
  User,
  X,
  Receipt,
  ArrowDownToLine,
  TrendingUp,
  AlertCircle,
} from "lucide-react";

const initialPayments = [
  {
    id: "PAY-2026-001",
    child: "Abel Asres",
    course: "Mathematics",
    tutor: "Abebe Kebede",
    amount: 3500,
    date: "2026-11-02",
    method: "Telebirr",
    status: "Paid",
  },
  {
    id: "PAY-2026-002",
    child: "Abel Asres",
    course: "Physics",
    tutor: "Meron Tadesse",
    amount: 3000,
    date: "2026-11-05",
    method: "CBE Birr",
    status: "Paid",
  },
  {
    id: "PAY-2026-003",
    child: "Sara Asres",
    course: "English Language",
    tutor: "Hana Mohammed",
    amount: 2500,
    date: "2026-11-06",
    method: "Bank Transfer",
    status: "Pending",
  },
  {
    id: "PAY-2026-004",
    child: "Sara Asres",
    course: "Biology",
    tutor: "Dawit Alemu",
    amount: 2000,
    date: "2026-11-08",
    method: "Telebirr",
    status: "Overdue",
  },
  {
    id: "PAY-2026-005",
    child: "Abel Asres",
    course: "Mathematics",
    tutor: "Abebe Kebede",
    amount: 3500,
    date: "2026-10-02",
    method: "Telebirr",
    status: "Paid",
  },
];

const formatCurrency = (amount) =>
  `${Number(amount).toLocaleString("en-US")} ETB`;

const formatDate = (date) =>
  new Date(`${date}T12:00:00`).toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

export default function ParentPayments() {
  const [payments, setPayments] = useState(initialPayments);
  const [selectedChild, setSelectedChild] = useState("All Children");
  const [selectedStatus, setSelectedStatus] = useState("All Status");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("Telebirr");
  const [paymentAmount, setPaymentAmount] = useState("");
  const [paymentReference, setPaymentReference] = useState("");

  const filteredPayments = useMemo(() => {
    return payments.filter((payment) => {
      const matchesChild =
        selectedChild === "All Children" || payment.child === selectedChild;

      const matchesStatus =
        selectedStatus === "All Status" || payment.status === selectedStatus;

      const matchesSearch =
        payment.course.toLowerCase().includes(searchTerm.toLowerCase()) ||
        payment.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        payment.child.toLowerCase().includes(searchTerm.toLowerCase());

      return matchesChild && matchesStatus && matchesSearch;
    });
  }, [payments, selectedChild, selectedStatus, searchTerm]);

  const totalPaid = filteredPayments
    .filter((p) => p.status === "Paid")
    .reduce((sum, p) => sum + p.amount, 0);

  const pendingAmount = filteredPayments
    .filter((p) => p.status === "Pending")
    .reduce((sum, p) => sum + p.amount, 0);

  const overdueAmount = filteredPayments
    .filter((p) => p.status === "Overdue")
    .reduce((sum, p) => sum + p.amount, 0);

  const handleDownloadReceipt = (payment) => {
    const receiptContent = `
EDUCONNECT ET
PAYMENT RECEIPT

Receipt ID: ${payment.id}
Date: ${formatDate(payment.date)}

Parent: Demo Parent
Student: ${payment.child}
Course: ${payment.course}
Tutor: ${payment.tutor}

Amount: ${formatCurrency(payment.amount)}
Payment Method: ${payment.method}
Status: ${payment.status}

Thank you for using EduConnect ET.
This is a demo receipt.
`;

    const blob = new Blob([receiptContent], {
      type: "text/plain",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${payment.id}-receipt.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handlePaymentRequest = (e) => {
    e.preventDefault();

    const amount = Number(paymentAmount);

    if (!amount || amount <= 0) {
      alert("Please enter a valid payment amount.");
      return;
    }

    const newPayment = {
      id: `PAY-${Date.now()}`,
      child: selectedChild === "All Children" ? "Abel Asres" : selectedChild,
      course: "General Course Payment",
      tutor: "EduConnect ET",
      amount,
      date: new Date().toISOString().split("T")[0],
      method: paymentMethod,
      status: "Pending",
      reference: paymentReference,
    };

    setPayments((previous) => [newPayment, ...previous]);
    setSelectedChild("All Children");
    setSelectedStatus("All Status");
    setSearchTerm("");
    setShowPaymentModal(false);
    setPaymentAmount("");
    setPaymentReference("");

    alert("Demo payment request created successfully.");
  };

  return (
    <div className="space-y-7">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Payments</h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage tuition fees and monitor your children's payment history.
          </p>
        </div>

        <button
          onClick={() => setShowPaymentModal(true)}
          className="flex items-center justify-center gap-2 rounded-xl bg-brand-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-700"
        >
          <CreditCard size={18} />
          Make Payment Request
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Total Paid"
          value={formatCurrency(totalPaid)}
          subtitle="Successfully paid"
          icon={CheckCircle}
          color="text-emerald-600"
          bg="bg-emerald-50"
        />

        <StatCard
          title="Pending Payments"
          value={formatCurrency(pendingAmount)}
          subtitle="Awaiting confirmation"
          icon={Clock}
          color="text-orange-600"
          bg="bg-orange-50"
        />

        <StatCard
          title="Overdue Payments"
          value={formatCurrency(overdueAmount)}
          subtitle="Require attention"
          icon={AlertCircle}
          color="text-red-600"
          bg="bg-red-50"
        />

        <StatCard
          title="Transactions"
          value={filteredPayments.length}
          subtitle="Payment records"
          icon={Receipt}
          color="text-blue-600"
          bg="bg-blue-50"
        />
      </div>

      {/* Payment Notice */}
      {overdueAmount > 0 && (
        <div className="flex flex-col gap-3 rounded-2xl border border-orange-200 bg-orange-50 p-4 sm:flex-row sm:items-center">
          <div className="flex items-center gap-3">
            <AlertCircle className="shrink-0 text-orange-600" size={22} />
            <div>
              <h3 className="font-semibold text-orange-800">
                Outstanding payment
              </h3>
              <p className="text-sm text-orange-700">
                You have {formatCurrency(overdueAmount)} in overdue demo
                payments.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Payment History */}
      <section className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
        <div className="border-b border-gray-100 p-5 sm:p-6">
          <div className="mb-5">
            <h2 className="text-lg font-bold text-gray-900">Payment History</h2>
            <p className="mt-1 text-sm text-gray-500">
              View and manage your children's tuition transactions.
            </p>
          </div>

          <div className="flex flex-col gap-3 lg:flex-row">
            <div className="relative flex-1">
              <Search
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                type="text"
                placeholder="Search course, student or transaction ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full rounded-xl border border-gray-200 py-3 pl-10 pr-4 text-sm outline-none focus:border-brand-600"
              />
            </div>

            <select
              value={selectedChild}
              onChange={(e) => setSelectedChild(e.target.value)}
              className="rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none focus:border-brand-600"
            >
              <option>All Children</option>
              <option>Abel Asres</option>
              <option>Sara Asres</option>
            </select>

            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none focus:border-brand-600"
            >
              <option>All Status</option>
              <option>Paid</option>
              <option>Pending</option>
              <option>Overdue</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[850px] text-left">
            <thead className="bg-gray-50 text-xs uppercase text-gray-500">
              <tr>
                <th className="px-5 py-4 font-semibold">Transaction</th>
                <th className="px-5 py-4 font-semibold">Student / Course</th>
                <th className="px-5 py-4 font-semibold">Date</th>
                <th className="px-5 py-4 font-semibold">Method</th>
                <th className="px-5 py-4 font-semibold">Amount</th>
                <th className="px-5 py-4 font-semibold">Status</th>
                <th className="px-5 py-4 text-right font-semibold">Action</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {filteredPayments.map((payment) => (
                <tr key={payment.id} className="hover:bg-gray-50">
                  <td className="px-5 py-4">
                    <p className="text-sm font-semibold text-gray-800">
                      {payment.id}
                    </p>
                    <p className="mt-1 text-xs text-gray-400">
                      {payment.tutor}
                    </p>
                  </td>

                  <td className="px-5 py-4">
                    <p className="text-sm font-medium text-gray-800">
                      {payment.child}
                    </p>
                    <p className="mt-1 text-xs text-gray-500">
                      {payment.course}
                    </p>
                  </td>

                  <td className="px-5 py-4 text-sm text-gray-600">
                    {formatDate(payment.date)}
                  </td>

                  <td className="px-5 py-4 text-sm text-gray-600">
                    {payment.method}
                  </td>

                  <td className="px-5 py-4 text-sm font-bold text-gray-900">
                    {formatCurrency(payment.amount)}
                  </td>

                  <td className="px-5 py-4">
                    <StatusBadge status={payment.status} />
                  </td>

                  <td className="px-5 py-4 text-right">
                    <button
                      onClick={() => setSelectedPayment(payment)}
                      className="rounded-lg px-3 py-2 text-sm font-medium text-brand-600 hover:bg-blue-50"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}

              {filteredPayments.length === 0 && (
                <tr>
                  <td colSpan="7" className="px-5 py-12 text-center">
                    <Receipt size={35} className="mx-auto mb-3 text-gray-300" />
                    <p className="font-medium text-gray-700">
                      No payment records found
                    </p>
                    <p className="mt-1 text-sm text-gray-400">
                      Try changing your search or filters.
                    </p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      {/* Payment Methods */}
      <section className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-6">
        <div className="mb-5">
          <h2 className="text-lg font-bold text-gray-900">
            Supported Payment Methods
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Available payment options for the demo platform.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <PaymentMethod
            name="Telebirr"
            description="Mobile payment"
            icon={Wallet}
          />
          <PaymentMethod
            name="CBE Birr"
            description="Mobile banking"
            icon={CreditCard}
          />
          <PaymentMethod
            name="Bank Transfer"
            description="Direct bank payment"
            icon={TrendingUp}
          />
        </div>
      </section>

      {/* Payment Details Modal */}
      {selectedPayment && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          onClick={() => setSelectedPayment(null)}
        >
          <div
            className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900">
                Payment Details
              </h2>
              <button
                onClick={() => setSelectedPayment(null)}
                className="rounded-lg p-2 text-gray-400 hover:bg-gray-100"
              >
                <X size={20} />
              </button>
            </div>

            <div className="mb-5 rounded-xl bg-gray-50 p-5 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-blue-50 text-brand-600">
                <Receipt size={24} />
              </div>
              <p className="mt-3 text-sm text-gray-500">Payment Amount</p>
              <h3 className="mt-1 text-2xl font-bold text-gray-900">
                {formatCurrency(selectedPayment.amount)}
              </h3>
              <div className="mt-3">
                <StatusBadge status={selectedPayment.status} />
              </div>
            </div>

            <div className="space-y-4">
              <DetailRow
                icon={Receipt}
                label="Transaction ID"
                value={selectedPayment.id}
              />
              <DetailRow
                icon={User}
                label="Student"
                value={selectedPayment.child}
              />
              <DetailRow
                icon={BookOpen}
                label="Course"
                value={selectedPayment.course}
              />
              <DetailRow
                icon={CalendarDays}
                label="Payment Date"
                value={formatDate(selectedPayment.date)}
              />
              <DetailRow
                icon={Wallet}
                label="Payment Method"
                value={selectedPayment.method}
              />
            </div>

            <div className="mt-6 flex gap-3">
              <button
                onClick={() => setSelectedPayment(null)}
                className="flex-1 rounded-xl border border-gray-200 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50"
              >
                Close
              </button>

              <button
                onClick={() => handleDownloadReceipt(selectedPayment)}
                className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-brand-600 py-3 text-sm font-semibold text-white hover:bg-brand-700"
              >
                <Download size={17} />
                Receipt
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Payment Request Modal */}
      {showPaymentModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          onClick={() => setShowPaymentModal(false)}
        >
          <form
            onSubmit={handlePaymentRequest}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md space-y-5 rounded-2xl bg-white p-6 shadow-xl"
          >
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-gray-900">
                  Payment Request
                </h2>
                <p className="mt-1 text-sm text-gray-500">
                  Create a demo payment request.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowPaymentModal(false)}
                className="rounded-lg p-2 text-gray-400 hover:bg-gray-100"
              >
                <X size={20} />
              </button>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Child
              </label>
              <select
                value={
                  selectedChild === "Sara Asres" ? "Sara Asres" : "Abel Asres"
                }
                onChange={(e) => setSelectedChild(e.target.value)}
                className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-brand-600"
              >
                <option>Abel Asres</option>
                <option>Sara Asres</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Amount (ETB)
              </label>
              <input
                type="number"
                min="1"
                step="0.01"
                required
                value={paymentAmount}
                onChange={(e) => setPaymentAmount(e.target.value)}
                placeholder="Enter amount"
                className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-brand-600"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Payment Method
              </label>
              <select
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-brand-600"
              >
                <option>Telebirr</option>
                <option>CBE Birr</option>
                <option>Bank Transfer</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Reference (Optional)
              </label>
              <input
                type="text"
                value={paymentReference}
                onChange={(e) => setPaymentReference(e.target.value)}
                placeholder="Transaction reference"
                className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-brand-600"
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-xl bg-brand-600 py-3 font-semibold text-white transition hover:bg-brand-700"
            >
              Submit Payment Request
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

function StatCard({ title, value, subtitle, icon: Icon, color, bg }) {
  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-sm text-gray-500">{title}</p>
          <h3 className="mt-2 text-xl font-bold text-gray-900">{value}</h3>
        </div>

        <div
          className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${bg} ${color}`}
        >
          <Icon size={22} />
        </div>
      </div>
      <p className="mt-3 text-xs text-gray-400">{subtitle}</p>
    </div>
  );
}

function StatusBadge({ status }) {
  const styles = {
    Paid: "bg-emerald-50 text-emerald-700",
    Pending: "bg-orange-50 text-orange-700",
    Overdue: "bg-red-50 text-red-700",
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

function PaymentMethod({ name, description, icon: Icon }) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-gray-100 p-4">
      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-brand-600">
        <Icon size={21} />
      </div>
      <div>
        <h3 className="font-semibold text-gray-900">{name}</h3>
        <p className="text-xs text-gray-500">{description}</p>
      </div>
    </div>
  );
}

function DetailRow({ icon: Icon, label, value }) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gray-50 text-brand-600">
        <Icon size={18} />
      </div>
      <div className="min-w-0">
        <p className="text-xs text-gray-400">{label}</p>
        <p className="break-all text-sm font-medium text-gray-800">{value}</p>
      </div>
    </div>
  );
}
