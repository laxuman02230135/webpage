// pages/api/fetchorder.js
import prisma from '../../lib/prisma';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const orders = await prisma.order.findMany({
        include: {
          items: true, // fetch related order items
        },
        orderBy: {
          createdAt: 'desc',
        },
      });
      console.log("this is order",orders);

      res.status(200).json(orders);
    } catch (error) {
      console.error('Fetch error:', error);
      res.status(500).json({ error: 'Failed to fetch orders' });
    }
  } else {
    res.setHeader('Allow', ['GET']); // 🔧 FIX: this was incorrectly escaped
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
