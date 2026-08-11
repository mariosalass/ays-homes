import { NextResponse } from 'next/server';
import { authenticateAdmin, setAdminSessionCookie } from '@/lib/admin-auth';

export const runtime = 'nodejs';

export async function POST(request) {
  try {
    const { email, password } = await request.json();
    const user = await authenticateAdmin(email, password);

    if (!user) {
      return NextResponse.json(
        { ok: false, error: 'Credenciales invalidas' },
        { status: 401 }
      );
    }

    const response = NextResponse.json({
      ok: true,
      user: { email: user.email },
    });
    setAdminSessionCookie(response, user.email);
    return response;
  } catch {
    return NextResponse.json(
      { ok: false, error: 'No se pudo iniciar sesion' },
      { status: 400 }
    );
  }
}
