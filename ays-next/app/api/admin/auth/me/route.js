import { getAdminSession } from '@/lib/admin-auth';
import { jsonOk, jsonError } from '@/lib/api';

export const runtime = 'nodejs';

export async function GET() {
  const session = getAdminSession();
  if (!session) return jsonError('Unauthorized', 401);
  return jsonOk({ user: { email: session.email } });
}
