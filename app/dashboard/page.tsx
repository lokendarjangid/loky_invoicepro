import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import { DollarSign, FileText, Users, Clock } from "lucide-react";
import Link from "next/link";

export default async function DashboardPage() {
  const { userId } = await auth();
  
  if (!userId) {
    redirect("/sign-in");
  }

  // Get or create user in database
  let user = await prisma.user.findUnique({
    where: { clerkId: userId },
  });

  if (!user) {
    const { emailAddresses, firstName, lastName } = await auth();
    const email = emailAddresses?.[0]?.emailAddress || "";
    const name = `${firstName || ""} ${lastName || ""}`.trim() || null;

    user = await prisma.user.create({
      data: {
        clerkId: userId,
        email,
        name,
      },
    });
  }

  // Get statistics
  const [totalInvoices, paidInvoices, clients, recentInvoices] = await Promise.all([
    prisma.invoice.count({ where: { userId: user.id } }),
    prisma.invoice.count({ where: { userId: user.id, status: "paid" } }),
    prisma.client.count({ where: { userId: user.id } }),
    prisma.invoice.findMany({
      where: { userId: user.id },
      include: { client: true },
      orderBy: { createdAt: "desc" },
      take: 5,
    }),
  ]);

  const totalRevenue = await prisma.invoice.aggregate({
    where: { userId: user.id, status: "paid" },
    _sum: { total: true },
  });

  const pendingRevenue = await prisma.invoice.aggregate({
    where: { userId: user.id, status: { in: ["sent", "overdue"] } },
    _sum: { total: true },
  });

  const revenue = totalRevenue._sum.total || 0;
  const pending = pendingRevenue._sum.total || 0;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-1">Welcome back! Here's your overview.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          icon={<DollarSign className="w-6 h-6 text-green-600" />}
          label="Total Revenue"
          value={`$${revenue.toFixed(2)}`}
          bgColor="bg-green-50"
        />
        <StatCard
          icon={<Clock className="w-6 h-6 text-orange-600" />}
          label="Pending"
          value={`$${pending.toFixed(2)}`}
          bgColor="bg-orange-50"
        />
        <StatCard
          icon={<FileText className="w-6 h-6 text-blue-600" />}
          label="Total Invoices"
          value={totalInvoices.toString()}
          bgColor="bg-blue-50"
        />
        <StatCard
          icon={<Users className="w-6 h-6 text-purple-600" />}
          label="Clients"
          value={clients.toString()}
          bgColor="bg-purple-50"
        />
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link
            href="/dashboard/invoices/new"
            className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition text-center"
          >
            <FileText className="w-8 h-8 text-blue-600 mx-auto mb-2" />
            <p className="font-semibold text-gray-900">Create Invoice</p>
          </Link>
          <Link
            href="/dashboard/clients/new"
            className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-purple-500 hover:bg-purple-50 transition text-center"
          >
            <Users className="w-8 h-8 text-purple-600 mx-auto mb-2" />
            <p className="font-semibold text-gray-900">Add Client</p>
          </Link>
          <Link
            href="/dashboard/analytics"
            className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-orange-500 hover:bg-orange-50 transition text-center"
          >
            <DollarSign className="w-8 h-8 text-orange-600 mx-auto mb-2" />
            <p className="font-semibold text-gray-900">View Analytics</p>
          </Link>
        </div>
      </div>

      {/* Recent Invoices */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-900">Recent Invoices</h2>
          <Link href="/dashboard/invoices" className="text-blue-600 hover:text-blue-700 font-medium">
            View All
          </Link>
        </div>
        {recentInvoices.length === 0 ? (
          <div className="p-12 text-center">
            <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-600 mb-4">No invoices yet</p>
            <Link
              href="/dashboard/invoices/new"
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition inline-block"
            >
              Create Your First Invoice
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Invoice #</th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Client</th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Amount</th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Status</th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Due Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {recentInvoices.map((invoice) => (
                  <tr key={invoice.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <Link href={`/dashboard/invoices/${invoice.id}`} className="text-blue-600 hover:text-blue-700 font-medium">
                        {invoice.invoiceNumber}
                      </Link>
                    </td>
                    <td className="px-6 py-4 text-gray-900">{invoice.client.name}</td>
                    <td className="px-6 py-4 text-gray-900 font-medium">${invoice.total.toFixed(2)}</td>
                    <td className="px-6 py-4">
                      <StatusBadge status={invoice.status} />
                    </td>
                    <td className="px-6 py-4 text-gray-600">
                      {new Date(invoice.dueDate).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

function StatCard({
  icon,
  label,
  value,
  bgColor,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  bgColor: string;
}) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
      <div className={`${bgColor} w-12 h-12 rounded-lg flex items-center justify-center mb-4`}>
        {icon}
      </div>
      <p className="text-gray-600 text-sm mb-1">{label}</p>
      <p className="text-2xl font-bold text-gray-900">{value}</p>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const styles = {
    draft: "bg-gray-100 text-gray-700",
    sent: "bg-blue-100 text-blue-700",
    paid: "bg-green-100 text-green-700",
    overdue: "bg-red-100 text-red-700",
    cancelled: "bg-gray-100 text-gray-500",
  };

  return (
    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${styles[status as keyof typeof styles] || styles.draft}`}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
}
