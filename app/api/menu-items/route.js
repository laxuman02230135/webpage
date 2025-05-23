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