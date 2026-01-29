import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { clerkId: userId },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const body = await req.json();
    const { clientId, dueDate, items, notes, terms, tax, discount } = body;

    if (!clientId || !items || items.length === 0) {
      return NextResponse.json(
        { error: "Client and items are required" },
        { status: 400 }
      );
    }

    // Generate invoice number
    const count = await prisma.invoice.count({
      where: { userId: user.id },
    });
    const invoiceNumber = `INV-${String(count + 1).padStart(5, "0")}`;

    // Calculate totals
    const subtotal = items.reduce(
      (sum: number, item: any) => sum + item.quantity * item.rate,
      0
    );
    const taxAmount = (subtotal * (tax || 0)) / 100;
    const discountAmount = (subtotal * (discount || 0)) / 100;
    const total = subtotal + taxAmount - discountAmount;

    // Create invoice with items
    const invoice = await prisma.invoice.create({
      data: {
        userId: user.id,
        clientId,
        invoiceNumber,
        dueDate: new Date(dueDate),
        subtotal,
        tax: tax || 0,
        discount: discount || 0,
        total,
        notes,
        terms,
        items: {
          create: items.map((item: any) => ({
            description: item.description,
            quantity: item.quantity,
            rate: item.rate,
            amount: item.quantity * item.rate,
          })),
        },
      },
      include: {
        client: true,
        items: true,
      },
    });

    return NextResponse.json(invoice);
  } catch (error) {
    console.error("Error creating invoice:", error);
    return NextResponse.json(
      { error: "Failed to create invoice" },
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { clerkId: userId },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const invoices = await prisma.invoice.findMany({
      where: { userId: user.id },
      include: {
        client: true,
        items: true,
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(invoices);
  } catch (error) {
    console.error("Error fetching invoices:", error);
    return NextResponse.json(
      { error: "Failed to fetch invoices" },
      { status: 500 }
    );
  }
}
