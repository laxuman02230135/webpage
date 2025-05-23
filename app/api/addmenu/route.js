import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const items = await prisma.menuItem.findMany();
    // Map enum categories to form-compatible values
    const formattedItems = items.map(item => ({
      ...item,
      category: item.category === 'MAIN_MEALS' ? 'main-meals' :
                item.category === 'QUICK_BITES' ? 'quick-bites' :
                'beverages',
      price: `Nu. ${item.price.toFixed(2)}`, // Format price for display
    }));
    return Response.json(formattedItems);
  } catch (error) {
    console.error('Error fetching menu items:', error);
    return Response.json({ error: 'Failed to fetch items' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}

export async function POST(request) {
  try {
    const { title, description, price, image, category } = await request.json();

    // Validate required fields
    if (!title?.trim() || !description?.trim() || !price || !image?.trim() || !category) {
      return Response.json({ error: 'All fields are required' }, { status: 400 });
    }

    // Parse price (e.g., "Nu. 100" or "100" -> 100.00)
    const parsedPrice = parseFloat(price.replace(/[^0-9.]/g, ''));
    if (isNaN(parsedPrice) || parsedPrice < 0) {
      return Response.json({ error: 'Invalid price format' }, { status: 400 });
    }

    // Map form category to Prisma enum
    const categoryMap = {
      'main-meals': 'MAIN_MEALS',
      'quick-bites': 'QUICK_BITES',
      'beverages': 'BEVERAGES',
    };

    if (!categoryMap[category]) {
      return Response.json({ error: 'Invalid category' }, { status: 400 });
    }

    // Create new menu item
    const newItem = await prisma.menuItem.create({
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
      ...newItem,
      category: category,
      price: `Nu. ${newItem.price.toFixed(2)}`,
    };

    return Response.json(formattedItem, { status: 201 });
  } catch (error) {
    console.error('Error creating menu item:', error);
    return Response.json({ error: 'Failed to add item' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}