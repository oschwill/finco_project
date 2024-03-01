import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import prisma from '@/lib/db';
import bcrypt from 'bcrypt';

export async function GET(req: NextRequest) {
  const nameCookie = req.cookies.get('tmpRegister');

  return new Response(
    JSON.stringify({ data: nameCookie && nameCookie !== undefined ? nameCookie.value : null }),
    {
      status: nameCookie && nameCookie !== undefined ? 200 : 400,
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
}

export async function POST(req: NextRequest) {
  const { name, email, password } = await req.json();
  const body = { name, email, password };

  // Abfragen ob die email Adresse schon existiert
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: body.email,
      },
    });

    if (user) {
      throw new Error();
    }
  } catch (error) {
    return NextResponse.json(
      { success: false, email: true },
      {
        status: 400,
      }
    );
  }

  const salt = await bcrypt.genSalt(10);
  body.password = await bcrypt.hash(body.password, salt);

  // Createn datt cookie
  cookies().set({
    name: 'tmpRegister',
    value: JSON.stringify(body),
    httpOnly: true,
    path: '/api/session', // Nur gültig auf dieser Route
    maxAge: 10 * 60, // 10 Minuten gültig
    secure: true,
  });

  const response = cookies().get('tmpRegister')
    ? NextResponse.json(
        { success: true },
        {
          status: 200,
        }
      )
    : NextResponse.json(
        { success: false },
        {
          status: 400,
        }
      );

  // Wir returnen den response mit dem cookie oder ohne und failen
  return response;
}
