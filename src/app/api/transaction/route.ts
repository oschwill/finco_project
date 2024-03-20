import prisma from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { transaction_type, user_id, amount, category, date } = await req.json();

  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  try {
    const newTransaction = await prisma.transaction.create({
      data: {
        transaction_type,
        user_id,
        amount,
        category,
        date,
        timezone,
      },
    });

    if (!newTransaction) {
      throw new Error();
    }

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ success: false }, { status: 400 });
  }
}
