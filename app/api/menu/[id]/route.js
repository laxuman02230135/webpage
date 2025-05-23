import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

function jsonResponse(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

export async function GET(request, { params }) {
  try {
    const id = parseInt(params.id);
    if (isNaN(id)) return jsonResponse({ error: 'Invalid order ID' }, 400);

    const order = await prisma.order.findUnique({ where: { id } });
    if (!order) return jsonResponse({ error: 'Order not found' }, 404);

    return jsonResponse(order);
  } catch (error) {
    console.error(error);
    return jsonResponse({ error: 'Failed to fetch order' }, 500);
  }
}

export async function PUT(request, { params }) {
  try {
    const id = parseInt(params.id);
    if (isNaN(id)) {
      return new Response(JSON.stringify({ error: 'Invalid menu item ID' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const body = await request.json();
    const { title, description, price, image, category } = body;

    // Parse price (e.g., "Nu. 100" or "100" -> 100.00)
    const parsedPrice = parseFloat(price.replace(/[^0-9.]/g, ''));
    if (isNaN(parsedPrice) || parsedPrice < 0) {
      return new Response(JSON.stringify({ error: 'Invalid price format' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Map form category to Prisma enum
    const categoryMap = {
      'main-meals': 'MAIN_MEALS',
      'quick-bites': 'QUICK_BITES',
      'beverages': 'BEVERAGES',
    };

    if (!categoryMap[category]) {
      return new Response(JSON.stringify({ error: 'Invalid category' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const updatedItem = await prisma.menuItem.update({
      where: { id },
      data: {
        title,
        description,
        price: parsedPrice,
        image,
        category: categoryMap[category],
      },
    });

    // Format response to match form expectations
    const formattedItem = {
      ...updatedItem,
      category: category,
      price: `Nu. ${updatedItem.price.toFixed(2)}`,
    };

    return new Response(JSON.stringify(formattedItem), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error updating menu item:', error);
    return new Response(JSON.stringify({ error: 'Failed to update menu item' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  } finally {
    await prisma.$disconnect();
  }
}

export async function DELETE(request, { params }) {
  try {
    const id = parseInt(params.id);
    if (isNaN(id)) {
      return new Response(JSON.stringify({ error: 'Invalid menu item ID' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // First check if the item exists
    const existingItem = await prisma.menuItem.findUnique({
      where: { id },
    });

    if (!existingItem) {
      return new Response(JSON.stringify({ error: 'Menu item not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    await prisma.menuItem.delete({
      where: { id },
    });

    return new Response(null, { status: 204 });
  } catch (error) {
    console.error('Error deleting menu item:', error);
    return new Response(JSON.stringify({ error: 'Failed to delete menu item' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  } finally {
    await prisma.$disconnect();
  }
}
