import { UploadImage } from '@/lib/uploadImage';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const userData: FormData = await req.formData();

  // Holen uns datt Image
  const file: File | null = userData.get('picture') as unknown as File;

  if (file) {
    // // const buffer = Buffer.from(bytes);
    /* CLOUDINARY */
    const data: any = await UploadImage(file, 'finco/profile');

    // Wir hängen die Bildinfos an die formData
    userData.append('publicId', data.public_id);
    userData.append('profilePath', data.url);
    console.log('DATA', userData);
  }

  // Datenbank Speicherung to be continued
  return NextResponse.json({ success: true });
}
