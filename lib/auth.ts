// ============================ AUTH (DUMMY) ============================
// Kredensial & sesi tiruan untuk demo. BELUM terhubung backend — password
// disimpan plaintext hanya untuk keperluan prototipe frontend. Sesi Customer
// dan Admin dipisah (sesuai PRD: Customer tidak boleh mengakses /admin).

import type { Role } from '@/lib/types';

export type AccountKind = 'customer' | 'admin';

export interface CustomerAccount {
  kind: 'customer';
  id: string;
  name: string;
  email: string;
  company: string;
}

export interface AdminAccount {
  kind: 'admin';
  id: string;
  name: string;
  email: string;
  role: Role;
}

export type Account = CustomerAccount | AdminAccount;

// Kredensial demo (email → password + profil). Password sengaja seragam.
interface CustomerCredential extends CustomerAccount {
  password: string;
}
interface AdminCredential extends AdminAccount {
  password: string;
}

export const customerCredentials: CustomerCredential[] = [
  {
    kind: 'customer',
    id: 'c1',
    name: 'Andi Wijaya',
    email: 'buyer@coatingsolutions.co.id',
    company: 'Coating Solutions Co.',
    password: 'password',
  },
  {
    kind: 'customer',
    id: 'c2',
    name: 'Sari Dewi',
    email: 'po@maritimwarna.com',
    company: 'PT Maritim Warna',
    password: 'password',
  },
];

export const adminCredentials: AdminCredential[] = [
  {
    kind: 'admin',
    id: 'u1',
    name: 'Super Admin',
    email: 'superadmin@ptikn.com',
    role: 'super_admin',
    password: 'password',
  },
  {
    kind: 'admin',
    id: 'u2',
    name: 'Admin Katalog',
    email: 'katalog@ptikn.com',
    role: 'admin',
    password: 'password',
  },
];

// Buang field password sebelum data dipakai sebagai sesi.
function stripCustomer({ password: _pw, ...rest }: CustomerCredential): CustomerAccount {
  return rest;
}
function stripAdmin({ password: _pw, ...rest }: AdminCredential): AdminAccount {
  return rest;
}

export function verifyCustomer(email: string, password: string): CustomerAccount | null {
  const found = customerCredentials.find(
    (c) => c.email.toLowerCase() === email.trim().toLowerCase() && c.password === password
  );
  return found ? stripCustomer(found) : null;
}

export function verifyAdmin(email: string, password: string): AdminAccount | null {
  const found = adminCredentials.find(
    (a) => a.email.toLowerCase() === email.trim().toLowerCase() && a.password === password
  );
  return found ? stripAdmin(found) : null;
}
