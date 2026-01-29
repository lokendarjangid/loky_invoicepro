import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import { DollarSign, TrendingUp, TrendingDown, Calendar } from "lucide-react";

export default async function AnalyticsPage() {
  const { userId } = await auth();
  
  if (!userId) {
    redirect("/sign-in");
  }

  const user = await prisma.user.findUnique({
    where: { clerkId: userId },
  });

  if (!user) {
    redirect("/dashboard");
  }

  // Get all invoices
  const invoices = await prisma.invoice.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: "asc" },
  });

  // Calculate statistics
  const totalRevenue = invoices
    .filter(inv => inv.status === "paid")
    .reduce((sum, inv) => sum + inv.total, 0);

  const pendingAmount = invoices
    .filter(inv => inv.status === "sent" || inv.status === "overdue")
    .reduce((sum, inv) => sum + inv.total, 0);

  const overdueAmount = invoices
    .filter(inv => inv.status === "overdue")
    .reduce((sum, inv) => sum + inv.total, 0);

  const averageInvoice = invoices.length > 0 
    ? invoices.reduce((sum, inv) => sum + inv.total, 0) / invoices.length
    : 0;

  // Monthly revenue
  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();
  
  const thisMonthRevenue = invoices
    .filter(inv => {
      const invDate = new Date(inv.paidAt || inv.createdAt);
      return inv.status === "paid" && 
             invDate.getMonth() === currentMonth && 
             invDate.getFullYear() === currentYear;
    })
    .reduce((sum, inv) => sum + inv.total, 0);

  const lastMonth = currentMonth === 0 ? 11 : currentMonth - 1;
  const lastMonthYear = currentMonth === 0 ? currentYear - 1 : currentYear;

  const lastMonthRevenue = invoices
    .filter(inv => {
      const invDate = new Date(inv.paidAt || inv.createdAt);
      return inv.status === "paid" && 
             invDate.getMonth() === lastMonth && 
             invDate.getFullYear() === lastMonthYear;
    })
    .reduce((sum, inv) => sum + inv.total, 0);

  const monthlyGrowth = lastMonthRevenue > 0 
    ? ((thisMonthRevenue - lastMonthRevenue) / lastMonthRevenue) * 100 
    : 0;

  // Status breakdown
  const statusCounts = {
    draft: invoices.filter(inv => inv.status === "draft").length,
    sent: invoices.filter(inv => inv.status === "sent").length,
    paid: invoices.filter(inv => inv.status === "paid").length,
    overdue: invoices.filter(inv => inv.status === "overdue").length,
    cancelled: invoices.filter(inv => inv.status === "cancelled").length,
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Analytics</h1>
        <p className="text-gray-600 mt-1">Track your business performance</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          icon={<DollarSign className="w-6 h-6 text-green-600" />}
          label="Total Revenue"
          value={`$${totalRevenue.toFixed(2)}`}
          bgColor="bg-green-50"
        />
        <MetricCard
          icon={<Calendar className="w-6 h-6 text-blue-600" />}
          label="This Month"
          value={`$${thisMonthRevenue.toFixed(2)}`}
          change={monthlyGrowth}
          bgColor="bg-blue-50"
        />
        <MetricCard
          icon={<TrendingUp className="w-6 h-6 text-orange-600" />}
          label="Pending"
          value={`$${pendingAmount.toFixed(2)}`}
          bgColor="bg-orange-50"
        />
        <MetricCard
          icon={<TrendingDown className="w-6 h-6 text-red-600" />}
          label="Overdue"
          value={`$${overdueAmount.toFixed(2)}`}
          bgColor="bg-red-50"
        />
      </div>

      {/* Additional Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Invoice Status Breakdown</h3>
          <div className="space-y-3">
            <StatusRow label="Paid" count={statusCounts.paid} color="bg-green-500" />
            <StatusRow label="Sent" count={statusCounts.sent} color="bg-blue-500" />
            <StatusRow label="Overdue" count={statusCounts.overdue} color="bg-red-500" />
            <StatusRow label="Draft" count={statusCounts.draft} color="bg-gray-500" />
            <StatusRow label="Cancelled" count={statusCounts.cancelled} color="bg-gray-400" />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Stats</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-gray-600">Total Invoices</span>
              <span className="text-xl font-bold text-gray-900">{invoices.length}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-gray-600">Average Invoice</span>
              <span className="text-xl font-bold text-gray-900">${averageInvoice.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-gray-600">Payment Rate</span>
              <span className="text-xl font-bold text-gray-900">
                {invoices.length > 0 
                  ? Math.round((statusCounts.paid / invoices.length) * 100) 
                  : 0}%
              </span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-gray-600">Monthly Growth</span>
              <span className={`text-xl font-bold ${monthlyGrowth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {monthlyGrowth >= 0 ? '+' : ''}{monthlyGrowth.toFixed(1)}%
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Revenue Over Time */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Revenue Comparison</h3>
        <div className="grid grid-cols-2 gap-6">
          <div className="text-center p-6 bg-blue-50 rounded-lg">
            <p className="text-sm text-gray-600 mb-2">This Month</p>
            <p className="text-3xl font-bold text-blue-600">${thisMonthRevenue.toFixed(2)}</p>
          </div>
          <div className="text-center p-6 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600 mb-2">Last Month</p>
            <p className="text-3xl font-bold text-gray-600">${lastMonthRevenue.toFixed(2)}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function MetricCard({
  icon,
  label,
  value,
  change,
  bgColor,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  change?: number;
  bgColor: string;
}) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
      <div className={`${bgColor} w-12 h-12 rounded-lg flex items-center justify-center mb-4`}>
        {icon}
      </div>
      <p className="text-gray-600 text-sm mb-1">{label}</p>
      <div className="flex items-baseline gap-2">
        <p className="text-2xl font-bold text-gray-900">{value}</p>
        {change !== undefined && (
          <span className={`text-sm font-semibold ${change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {change >= 0 ? '+' : ''}{change.toFixed(1)}%
          </span>
        )}
      </div>
    </div>
  );
}

function StatusRow({ label, count, color }: { label: string; count: number; color: string }) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className={`w-3 h-3 rounded-full ${color}`} />
        <span className="text-gray-700">{label}</span>
      </div>
      <span className="text-gray-900 font-semibold">{count}</span>
    </div>
  );
}
