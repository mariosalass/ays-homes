import bcrypt from 'bcryptjs';
import { cookies } from 'next/headers';
import { Buffer } from 'buffer';
import { createHmac, timingSafeEqual } from 'crypto';
import { sql } from './db';

export const ADMIN_SESSION_COOKIE = 'ays_admin_session';

const SESSION_MAX_AGE = 60 * 60 * 24 * 7;
const DEFAULT_ADMIN_EMAILS = [
  'marioantonio228@gmail.com',
  'asalasc3@gmail.com',
  'susabazo@gmail.com',
];

function sessionSecret() {
  const secret =
    process.env.ADMIN_SESSION_SECRET ||
    process.env.AUTH_SECRET ||
    process.env.NEXTAUTH_SECRET ||
    process.env.DATABASE_URL;

  if (!secret) {
    throw new Error('Missing server-side session secret');
  }

  return secret;
}

function allowedAdminEmails() {
  const configured = process.env.ADMIN_EMAILS || process.env.ADMIN_ALLOWED_EMAILS;
  const emails = configured
    ? configured.split(',').map((email) => email.trim().toLowerCase()).filter(Boolean)
    : DEFAULT_ADMIN_EMAILS;

  return new Set(emails);
}

function sign(payload) {
  return createHmac('sha256', sessionSecret()).update(payload).digest('base64url');
}

function safeEqual(a, b) {
  const left = Buffer.from(a);
  const right = Buffer.from(b);
  return left.length === right.length && timingSafeEqual(left, right);
}

function createSessionValue(email) {
  const payload = Buffer.from(JSON.stringify({
    email,
    exp: Math.floor(Date.now() / 1000) + SESSION_MAX_AGE,
  })).toString('base64url');

  return `${payload}.${sign(payload)}`;
}

function verifySessionValue(value) {
  if (!value || !value.includes('.')) return null;

  const [payload, signature] = value.split('.');
  if (!payload || !signature || !safeEqual(sign(payload), signature)) return null;

  try {
    const data = JSON.parse(Buffer.from(payload, 'base64url').toString('utf8'));
    const email = String(data.email || '').trim().toLowerCase();
    if (!email || !data.exp || data.exp < Math.floor(Date.now() / 1000)) return null;
    if (!allowedAdminEmails().has(email)) return null;
    return { email };
  } catch {
    return null;
  }
}

export function getAdminSession() {
  return verifySessionValue(cookies().get(ADMIN_SESSION_COOKIE)?.value);
}

export function requireAdminSession() {
  const session = getAdminSession();
  if (!session) {
    const error = new Error('Unauthorized');
    error.status = 401;
    throw error;
  }
  return session;
}

export function setAdminSessionCookie(response, email) {
  response.cookies.set(ADMIN_SESSION_COOKIE, createSessionValue(email), {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: SESSION_MAX_AGE,
  });
}

export function clearAdminSessionCookie(response) {
  response.cookies.set(ADMIN_SESSION_COOKIE, '', {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 0,
  });
}

export async function authenticateAdmin(email, password) {
  const normalizedEmail = String(email || '').trim().toLowerCase();
  if (!normalizedEmail || !password || !allowedAdminEmails().has(normalizedEmail)) {
    return null;
  }

  const rows = await sql`
    select id, lower(email) as email, encrypted_password
    from auth.users
    where lower(email) = ${normalizedEmail}
      and encrypted_password is not null
      and deleted_at is null
      and (banned_until is null or banned_until < now())
      and is_anonymous = false
    limit 1
  `;

  const user = rows[0];
  if (!user?.encrypted_password) return null;

  const ok = await bcrypt.compare(password, user.encrypted_password);
  if (!ok) return null;

  return { id: user.id, email: user.email };
}
