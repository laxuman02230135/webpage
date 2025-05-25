// pages/api/fetchorder.js
import prisma from '../../lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const orders = await prisma.order.findMany({
      include: {
        items: true, // fetch related order items
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
    console.log("this is order", orders);

    return NextResponse.json(orders);
  } catch (error) {
    console.error('Fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch orders' },
      { status: 500 }
    );
  }
}
