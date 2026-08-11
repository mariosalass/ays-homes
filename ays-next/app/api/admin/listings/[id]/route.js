import { requireAdminSession } from '@/lib/admin-auth';
import { deleteAdminListing, updateAdminListing } from '@/lib/admin-listings';
import { handleApiError, jsonError, jsonOk } from '@/lib/api';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function PATCH(request, { params }) {
  try {
    requireAdminSession();
    const listing = await updateAdminListing(params.id, await request.json());
    if (!listing) return jsonError('Publicacion no encontrada', 404);
    return jsonOk({ listing });
  } catch (error) {
    return handleApiError(error);
  }
}

export async function DELETE(_request, { params }) {
  try {
    requireAdminSession();
    const deleted = await deleteAdminListing(params.id);
    if (!deleted) return jsonError('Publicacion no encontrada', 404);
    return jsonOk({ id: deleted.id });
  } catch (error) {
    return handleApiError(error);
  }
}
