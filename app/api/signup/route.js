// app/api/signup/route.js

import  prisma  from '../../lib/prisma'; // adjust the path as needed
import bcrypt from 'bcrypt';

export async function POST(request) {
  const body = await request.json();
  const { name, email, password } = body;

  if (!name || !email || !password) {
    return new Response(JSON.stringify({ message: 'All fields are required' }), {
      status: 400,
    });
  }

  try {
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return new Response(JSON.stringify({ message: 'Email already registered' }), {
        status: 409,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    return new Response(JSON.stringify({ message: 'User registered successfully' }), {
      status: 201,
    });
  } catch (error) {
    console.error('Signup error:', error);
    return new Response(JSON.stringify({ message: 'Internal server error' }), {
      status: 500,
    });
  }
}
