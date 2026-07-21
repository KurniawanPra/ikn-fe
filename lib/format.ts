// Helper format bersama — mata uang, tanggal, nomor.
import type { Lang } from './types';

export function formatIDR(value: number | string | null | undefined): string {
  if (value == null || Number.isNaN(Number(value))) return '—';
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(Number(value));
}

export function formatDate(
  input: string | number | Date | null | undefined,
  lang: Lang = 'id'
): string {
  if (!input) return '—';
  const d = input instanceof Date ? input : new Date(input);
  if (Number.isNaN(d.getTime())) return String(input);
  return new Intl.DateTimeFormat(lang === 'en' ? 'en-GB' : 'id-ID', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(d);
}

export function formatDateTime(
  input: string | number | Date | null | undefined,
  lang: Lang = 'id'
): string {
  if (!input) return '—';
  const d = input instanceof Date ? input : new Date(input);
  if (Number.isNaN(d.getTime())) return String(input);
  return new Intl.DateTimeFormat(lang === 'en' ? 'en-GB' : 'id-ID', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(d);
}

export function pluralN(n: number, singular: string, plural?: string): string {
  return `${n} ${n === 1 ? singular : plural || singular}`;
}
