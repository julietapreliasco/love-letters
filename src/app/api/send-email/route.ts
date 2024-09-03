import { NextResponse } from 'next/server';
import { sendEmail } from '@/lib/sendEmail';

export async function POST(request: Request) {
  const { name, email, message } = await request.json();

  if (!name || !email || !message) {
    return NextResponse.json(
      { error: 'All fields are required' },
      { status: 400 }
    );
  }

  try {
    await sendEmail({ name, email, message });
    return NextResponse.json(
      { message: 'Email sent correctly' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json({ error: 'Error sending email' }, { status: 500 });
  }
}
