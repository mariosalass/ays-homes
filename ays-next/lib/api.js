import { NextResponse } from 'next/server';

export function jsonOk(data = {}, init) {
  return NextResponse.json({ ok: true, ...data }, init);
}

export function jsonError(error, status = 500) {
  return NextResponse.json(
    { ok: false, error: error?.message || String(error) },
    { status }
  );
}

export function handleApiError(error) {
  return jsonError(error, error?.status || 500);
}
