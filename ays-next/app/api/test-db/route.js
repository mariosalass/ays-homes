import { sql } from '../../../lib/db';

export async function GET() {
  try {
    const result = await sql`
      select count(*)::int as count
      from public.listings
    `;

    return Response.json({
      ok: true,
      count: result[0].count,
    });
  } catch (error) {
    return Response.json(
      {
        ok: false,
        error: error.message,
      },
      { status: 500 }
    );
  }
}