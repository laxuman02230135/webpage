import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const orders = await prisma.order.findMany({
      include: {
        items: true,
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
        price: `Nu. ${parseFloat(item.price.replace(/[^0-9.]/g, '')) || 0}`,
      })),
    }));

    return new Response(JSON.stringify(formattedOrders), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Order fetch error:', error);
    return new Response(JSON.stringify({ message: 'Failed to fetch orders' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

export async function POST(request) {
  try {
    const { name, email, phone, pickupTime, specialInstructions, items, total } = await request.json();

    // Validate required fields
    if (!name?.trim() || !email?.trim() || !phone?.trim() || !pickupTime?.trim()) {
      return new Response(JSON.stringify({ error: 'Name, email, phone, and pickup time are required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    if (!items || !Array.isArray(items) || items.length === 0) {
      return new Response(JSON.stringify({ error: 'At least one item is required in the order' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Parse total (e.g., "Nu. 250" or 250 -> 250)
    const parsedTotal = typeof total === 'string' ? parseFloat(total.replace(/[^0-9.]/g, '')) : total;
    if (isNaN(parsedTotal) || parsedTotal <= 0) {
      return new Response(JSON.stringify({ error: 'Invalid total amount' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Validate and parse each item
    const orderItems = items.map((item, index) => {
      const parsedPrice = parseFloat(item.price.replace(/[^0-9.]/g, ''));
      if (!item.title?.trim() || !item.description?.trim() || isNaN(parsedPrice) || parsedPrice < 0) {
        throw new Error(`Invalid item at index ${index}: title, description, and valid price are required`);
      }
      return {
        title: item.title,
        description: item.description,
        price: `Nu. ${parsedPrice.toFixed(2)}`, // Store price as string in "Nu. X" format
        image: item.image || '',
      };
    });

    // Create the order in the database
    const newOrder = await prisma.order.create({
      data: {
        name,
        email,
        phone,
        pickupTime,
        specialInstructions: specialInstructions || '',
        total: parsedTotal,
        items: {
          create: orderItems,
        },
      },
      include: {
        items: true,
      },
    });

    // Format response to match frontend expectations
    const formattedOrder = {
      ...newOrder,
      total: `Nu. ${newOrder.total}`,
      items: newOrder.items.map(item => ({
        ...item,
        price: item.price,
      })),
    };

    return new Response(JSON.stringify(formattedOrder), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error creating order:', error);
    return new Response(JSON.stringify({ error: error.message || 'Failed to create order' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  } finally {
    await prisma.$disconnect();
  }
}