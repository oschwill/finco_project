import { UploadImage, deleteImage } from '@/lib/uploadImage';
import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';
import fs from 'fs/promises';
import { generateRandomPassword } from '@/lib/functionHelper';
import { sendDynamicEmail } from '@/lib/nodeMailer';

export async function POST(req: NextRequest) {
  const userData: FormData = await req.formData();

  // Holen uns datt Image
  const file: File | null = userData.get('picture') as unknown as File;

  if (file && file.size > 0) {
    // // const buffer = Buffer.from(bytes);
    /* CLOUDINARY */
    const data: any = await UploadImage(file, 'finco/profile');

    // Wir hängen die Bildinfos an die formData
    userData.append('publicId', data.public_id ? data.public_id : null);
    userData.append('profilePath', data.url ? data.url : null);
  }

  // const erstelle verify Token
  const token = generateRandomPassword(12);

  try {
    const newUser = await prisma.user.create({
      data: {
        name: userData.get('name') as string,
        email: userData.get('email') as string,
        password: userData.get('password') as string,
        credit_card: userData.get('cardNumber') as string,
        image_profile_id: (userData.get('publicId') as string) || null,
        image_profile_path: (userData.get('profilePath') as string) || null,
        register_token: token,
      },
    });

    if (!newUser) {
      throw new Error();
    }

    // Email Template einlesen und versenden
    let htmlTemplate = await fs.readFile(
      `${process.env.EMAIL_TEMPLATE_PATH}/verifyRegister.html`,
      'utf8'
    );

    htmlTemplate = htmlTemplate.replace('%username%', newUser.name);
    htmlTemplate = htmlTemplate.replace(
      '%link%',
      `${process.env.DOMAIN_URL}/register/verify/${token}/${newUser.email}`
    );

    // Versenden der Email

    const hasSend = await sendDynamicEmail({
      email: newUser.email,
      subject: 'Verify Registration',
      text: htmlTemplate,
      html: htmlTemplate,
    });

    if (!hasSend) {
      throw new Error();
    }

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    console.log(error);
    // Falls fehlgeschlagen sollten wir das cloudinary Bild wieder löschen
    await deleteImage(userData.get('publicId') as string);

    return NextResponse.json({ success: false }, { status: 400 });
  }
}
