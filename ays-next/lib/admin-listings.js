import { sql } from './db';
import { isValidListingKind } from './listings';

const TEXT_COLUMNS = new Set([
  'kind',
  'title',
  'price',
  'currency',
  'description',
  'prop_type',
  'operation',
  'location',
  'brand',
  'year',
  'km',
  'transmission',
  'fuel',
  'color',
  'provincia',
  'canton',
  'distrito',
  'sector',
  'business_type',
  'income_approx',
  'sale_reason',
  'includes',
  'engine',
  'operation_type',
  'finance_notes',
]);

const BOOLEAN_COLUMNS = new Set(['featured', 'available']);
const INTEGER_COLUMNS = new Set(['beds', 'baths', 'parking', 'area']);
const NUMBER_COLUMNS = new Set([
  'lat',
  'lng',
  'sale_price',
  'rent_price',
  'debt_amount',
  'down_payment',
  'option_purchase_price',
]);
const JSONB_COLUMNS = new Set(['photos', 'amenidades']);
const ARRAY_COLUMNS = new Set(['available_operations']);

const LISTING_COLUMNS = new Set([
  ...TEXT_COLUMNS,
  ...BOOLEAN_COLUMNS,
  ...INTEGER_COLUMNS,
  ...NUMBER_COLUMNS,
  ...JSONB_COLUMNS,
  ...ARRAY_COLUMNS,
]);

function numberOrNull(value) {
  if (value === null || value === undefined || value === '') return null;
  const n = Number(value);
  return Number.isFinite(n) ? n : null;
}

function intOrNull(value) {
  if (value === null || value === undefined || value === '') return null;
  const n = parseInt(value, 10);
  return Number.isFinite(n) ? n : null;
}

function textOrNull(value) {
  if (value === null || value === undefined) return null;
  return String(value);
}

function stringArray(value) {
  if (!Array.isArray(value)) return [];
  return value.map((item) => String(item)).filter(Boolean);
}

function castFor(column) {
  if (JSONB_COLUMNS.has(column)) return '::jsonb';
  if (ARRAY_COLUMNS.has(column)) return '::text[]';
  return '';
}

function sanitizeListingPayload(input, { creating = false } = {}) {
  if (!input || typeof input !== 'object') {
    throw new Error('Payload invalido');
  }

  const row = {};

  for (const [column, value] of Object.entries(input)) {
    if (!LISTING_COLUMNS.has(column)) continue;

    if (column === 'kind') {
      if (!isValidListingKind(value)) throw new Error('Tipo de publicacion invalido');
      row.kind = value;
    } else if (TEXT_COLUMNS.has(column)) {
      row[column] = textOrNull(value);
    } else if (BOOLEAN_COLUMNS.has(column)) {
      row[column] = Boolean(value);
    } else if (INTEGER_COLUMNS.has(column)) {
      row[column] = intOrNull(value);
    } else if (NUMBER_COLUMNS.has(column)) {
      row[column] = numberOrNull(value);
    } else if (JSONB_COLUMNS.has(column)) {
      row[column] = JSON.stringify(stringArray(value));
    } else if (ARRAY_COLUMNS.has(column)) {
      row[column] = Array.isArray(value) ? stringArray(value) : null;
    }
  }

  if (creating && !isValidListingKind(row.kind)) {
    throw new Error('Tipo de publicacion invalido');
  }

  if (creating && !String(row.title || '').trim()) {
    throw new Error('El titulo es obligatorio');
  }

  return row;
}

export async function listAdminListings(kind) {
  if (kind) {
    if (!isValidListingKind(kind)) throw new Error('Tipo de publicacion invalido');

    return await sql`
      select *
      from public.listings
      where kind = ${kind}
      order by created_at desc
    `;
  }

  return await sql`
    select *
    from public.listings
    order by created_at desc
  `;
}

export async function createAdminListing(input) {
  const row = sanitizeListingPayload(input, { creating: true });
  const columns = Object.keys(row);
  const values = columns.map((column) => row[column]);
  const placeholders = columns.map((column, index) => `$${index + 1}${castFor(column)}`);
  const query = `
    insert into public.listings (${columns.join(', ')})
    values (${placeholders.join(', ')})
    returning *
  `;
  const rows = await sql.query(query, values);
  return rows[0] || null;
}

export async function updateAdminListing(id, input) {
  const row = sanitizeListingPayload(input);
  delete row.kind;

  const columns = Object.keys(row);
  if (!columns.length) throw new Error('No hay cambios para guardar');

  const values = columns.map((column) => row[column]);
  const assignments = columns.map((column, index) => `${column} = $${index + 1}${castFor(column)}`);
  const query = `
    update public.listings
    set ${assignments.join(', ')}
    where id = $${columns.length + 1}
    returning *
  `;
  const rows = await sql.query(query, [...values, id]);
  return rows[0] || null;
}

export async function deleteAdminListing(id) {
  const rows = await sql`
    delete from public.listings
    where id = ${id}
    returning id
  `;
  return rows[0] || null;
}

export async function setListingFeatured(id, featured) {
  const rows = await sql`
    update public.listings
    set featured = ${Boolean(featured)}
    where id = ${id}
    returning *
  `;
  return rows[0] || null;
}

export async function setListingAvailable(id, available) {
  const rows = await sql`
    update public.listings
    set available = ${Boolean(available)}
    where id = ${id}
    returning *
  `;
  return rows[0] || null;
}
