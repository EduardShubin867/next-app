import { statSync } from 'fs';
import fs from 'fs/promises';
import { NextRequest, NextResponse } from 'next/server';
import path from 'path';

export async function GET(
  _req: NextRequest,
  context: {
    params: Promise<{ path: string[] }>;
  }
): Promise<NextResponse> {
  const { path: filePathArray } = await context.params;

  if (!filePathArray || filePathArray.length === 0) {
    return NextResponse.json({ error: 'Invalid file path' }, { status: 400 });
  }

  const fullPath = path.join(process.cwd(), ...filePathArray);

  try {
    const fileStat = statSync(fullPath);
    if (!fileStat.isFile()) {
      return NextResponse.json({ error: 'File not found' }, { status: 404 });
    }

    const fileBuffer = await fs.readFile(fullPath);

    // Определяем MIME-тип файла
    const mimeType = getMimeType(fullPath);

    return new NextResponse(fileBuffer, {
      status: 200,
      headers: {
        'Content-Type': mimeType,
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    });
  } catch (error) {
    console.error('Error serving file:', error);
    return NextResponse.json({ error: 'Server Error' }, { status: 500 });
  }
}

function getMimeType(filePath: string): string {
  const ext = path.extname(filePath).toLowerCase();
  const mimeTypes: { [key: string]: string } = {
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.png': 'image/png',
    '.gif': 'image/gif',
    '.webp': 'image/webp',
    '.svg': 'image/svg+xml',
  };

  return mimeTypes[ext] || 'application/octet-stream';
}
