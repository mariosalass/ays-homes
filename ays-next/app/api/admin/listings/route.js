import { requireAdminSession } from '@/lib/admin-auth';
import { createAdminListing, listAdminListings } from '@/lib/admin-listings';
import { handleApiError, jsonOk } from '@/lib/api';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(request) {
  try {
    requireAdminSession();
    const kind = new URL(request.url).searchParams.get('kind') || '';
    const listings = await listAdminListings(kind);
    return jsonOk({ listings });
  } catch (error) {
    return handleApiError(error);
  }
}

export async function POST(request) {
  try {
    requireAdminSession();
    const listing = await createAdminListing(await request.json());
    return jsonOk({ listing }, { status: 201 });
  } catch (error) {
    return handleApiError(error);
  }
}
