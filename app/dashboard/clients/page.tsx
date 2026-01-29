import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import Link from "next/link";
import { Plus, Mail, Phone, Building } from "lucide-react";

export default async function ClientsPage() {
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

  const clients = await prisma.client.findMany({
    where: { userId: user.id },
    include: {
      _count: {
        select: { invoices: true },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Clients</h1>
          <p className="text-gray-600 mt-1">Manage your client relationships</p>
        </div>
        <Link
          href="/dashboard/clients/new"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition flex items-center gap-2 font-medium"
        >
          <Plus className="w-5 h-5" />
          Add Client
        </Link>
      </div>

      {clients.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
          <p className="text-gray-600 mb-4">No clients yet</p>
          <Link
            href="/dashboard/clients/new"
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition inline-block"
          >
            Add Your First Client
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {clients.map((client) => (
            <div
              key={client.id}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 font-bold text-lg">
                    {client.name.charAt(0).toUpperCase()}
                  </span>
                </div>
                <span className="text-sm text-gray-500">
                  {client._count.invoices} {client._count.invoices === 1 ? 'invoice' : 'invoices'}
                </span>
              </div>

              <h3 className="text-lg font-bold text-gray-900 mb-2">{client.name}</h3>
              
              {client.company && (
                <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                  <Building className="w-4 h-4" />
                  <span>{client.company}</span>
                </div>
              )}

              <div className="space-y-1 mb-4">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Mail className="w-4 h-4" />
                  <span>{client.email}</span>
                </div>
                {client.phone && (
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Phone className="w-4 h-4" />
                    <span>{client.phone}</span>
                  </div>
                )}
              </div>

              <Link
                href={`/dashboard/clients/${client.id}`}
                className="block w-full text-center bg-gray-50 hover:bg-gray-100 text-gray-700 font-medium py-2 rounded-lg transition"
              >
                View Details
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
