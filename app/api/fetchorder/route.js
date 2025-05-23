// pages/api/fetchorder.js
import prisma from '../../lib/prisma';

export async function GET(request) {
  try {
    const orders = await prisma.order.findMany({
      include: {
        items: true, // Include order items without trying to include menuItem
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    // Format the response for consistency
    const formattedOrders = orders.map(order => ({
      ...order,
      total: `Nu. ${order.total}`,
      items: order.items.map(item => ({
        ...item,
        title: item.title || 'Unknown Item',
        price: `Nu. ${parseFloat(item.price?.replace(/[^0-9.]/g, '') || 0)}`,
      })),
    }));

    return new Response(JSON.stringify(formattedOrders), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Fetch error:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch orders' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
