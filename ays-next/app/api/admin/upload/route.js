import { requireAdminSession } from '@/lib/admin-auth';
import { handleApiError, jsonOk } from '@/lib/api';
import { uploadListingPhoto } from '@/lib/r2';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(request) {
  try {
    requireAdminSession();

    const form = await request.formData();
    const files = [
      ...form.getAll('file'),
      ...form.getAll('files'),
    ].filter((file) => file && typeof file.arrayBuffer === 'function');

    if (!files.length) {
      const error = new Error('No se recibieron imagenes');
      error.status = 400;
      throw error;
    }

    const uploaded = [];
    for (const file of files) {
      uploaded.push(await uploadListingPhoto(file));
    }

    return jsonOk({ files: uploaded });
  } catch (error) {
    return handleApiError(error);
  }
}
