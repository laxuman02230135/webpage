import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken'; // To verify JWT for authentication

export const dynamic = 'force-dynamic';

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key'; // Use a secure secret for JWT

// Helper function to verify JWT token
const verifyToken = (token) => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return null;
  }
};

export async function GET(request) {
  try {
    // Get the token from cookies (you can also use Authorization header, depending on your setup)
    const token = request.cookies.get('token');

    if (!token) {
      return NextResponse.json({ message: 'Authentication required' }, { status: 401 });
    }

    const decoded = verifyToken(token);
    if (!decoded || decoded.email !== 'admin@cstcanteen.com') {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 403 });
    }

    // Fetch order items
    const orderItems = await prisma.orderItem.findMany({
      include: {
        order: true, // Including related Order data
      },
    });

    return NextResponse.json(orderItems, { status: 200 });
  } catch (error) {
    console.error('Error fetching order items:', error);
    return NextResponse.json(
      { message: 'Something went wrong. Please try again later.' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
