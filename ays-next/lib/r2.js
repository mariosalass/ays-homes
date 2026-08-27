import { Buffer } from 'buffer';
import { randomBytes } from 'crypto';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

let client;

function requiredEnv(name) {
  const value = process.env[name];
  if (!value) throw new Error(`Missing ${name}`);
  return value;
}

function r2Client() {
  if (!client) {
    const accountId = requiredEnv('R2_ACCOUNT_ID');
    client = new S3Client({
      region: 'auto',
      endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
      credentials: {
        accessKeyId: requiredEnv('R2_ACCESS_KEY_ID'),
        secretAccessKey: requiredEnv('R2_SECRET_ACCESS_KEY'),
      },
    });
  }

  return client;
}

function extensionFrom(fileName, contentType) {
  const fromName = String(fileName || '').split('.').pop()?.toLowerCase();
  if (fromName && /^[a-z0-9]{2,5}$/.test(fromName)) return fromName;

  if (contentType === 'image/png') return 'png';
  if (contentType === 'image/webp') return 'webp';
  if (contentType === 'image/gif') return 'gif';
  return 'jpg';
}

export function listingPhotoName(fileName, contentType) {
  const ext = extensionFrom(fileName, contentType);
  const random = randomBytes(6).toString('hex');
  return `listing-${Date.now()}-${random}.${ext}`;
}

export async function uploadListingPhoto(file) {
  if (!file || typeof file.arrayBuffer !== 'function') {
    throw new Error('Archivo invalido');
  }

  const contentType = file.type || 'application/octet-stream';
  if (!contentType.startsWith('image/')) {
    throw new Error('Solo se permiten imagenes');
  }

  const key = listingPhotoName(file.name, contentType);
  const body = Buffer.from(await file.arrayBuffer());

  await r2Client().send(new PutObjectCommand({
    Bucket: requiredEnv('R2_BUCKET'),
    Key: key,
    Body: body,
    ContentType: contentType,
  }));

  const publicBase = requiredEnv('R2_PUBLIC_URL').replace(/\/+$/, '');
  return { key, url: `${publicBase}/${key}` };
}
