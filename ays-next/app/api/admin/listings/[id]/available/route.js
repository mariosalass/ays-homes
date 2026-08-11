import { requireAdminSession } from '@/lib/admin-auth';
import { setListingAvailable } from '@/lib/admin-listings';
import { handleApiError, jsonError, jsonOk } from '@/lib/api';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function PATCH(request, { params }) {
  try {
    requireAdminSession();
    const body = await request.json();
    const listing = await setListingAvailable(params.id, body.available);
    if (!listing) return jsonError('Publicacion no encontrada', 404);
    return jsonOk({ listing });
  } catch (error) {
    return handleApiError(error);
  }
}
