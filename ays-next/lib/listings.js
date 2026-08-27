import { sql } from './db';

export const LISTING_KINDS = new Set(['property', 'car', 'business']);

export function isValidListingKind(kind) {
  return LISTING_KINDS.has(kind);
}

export async function getListingsByKind(kind, limit) {
  if (!isValidListingKind(kind)) return [];

  if (limit) {
    return await sql`
      select *
      from public.listings
      where kind = ${kind}
      order by created_at desc
      limit ${limit}
    `;
  }

  return await sql`
    select *
    from public.listings
    where kind = ${kind}
    order by created_at desc
  `;
}

export async function getListingById(id) {
  const rows = await sql`
    select *
    from public.listings
    where id = ${id}
    limit 1
  `;

  return rows[0] || null;
}

export async function getSitemapListings() {
  return await sql`
    select id, kind, created_at as updated_at
    from public.listings
    order by created_at desc
  `;
}
