// ============================ AUTH (DUMMY) ============================
import type { CustomerProfile } from '@/lib/types';
// Kredensial & sesi tiruan untuk demo. BELUM terhubung backend — password
// disimpan plaintext hanya untuk prototipe. Satu browser hanya memiliki satu
// sesi aktif dengan role admin atau customer.

export interface CustomerAccount {
  role: 'customer';
  id: string;
  name: string;
  email: string;
  company: string;
}

export interface AdminAccount {
  role: 'admin';
  id: string;
  name: string;
  email: string;
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
    role: 'customer',
    id: 'c1',
    name: 'Andi Wijaya',
    email: 'buyer@coatingsolutions.co.id',
    company: 'Coating Solutions Co.',
    password: 'password',
  },
  {
    role: 'customer',
    id: 'c2',
    name: 'Sari Dewi',
    email: 'po@maritimwarna.com',
    company: 'PT Maritim Warna',
    password: 'password',
  },
];

export const adminCredentials: AdminCredential[] = [
  {
    role: 'admin',
    id: 'u1',
    name: 'Admin PT IKN',
    email: 'admin@ptikn.com',
    password: 'password',
  },
];

export const customerProfiles: CustomerProfile[] = [
  {
    customerId: 'c1',
    name: 'Andi Wijaya',
    email: 'buyer@coatingsolutions.co.id',
    phone: '+62 812 1111 2222',
    company: 'Coating Solutions Co.',
    position: 'Purchasing Manager',
    companyEmail: 'procurement@coatingsolutions.co.id',
    companyPhone: '+62 21 460 2211',
    taxId: '01.234.567.8-001.000',
    addresses: [
      {
        id: 'addr-c1-1',
        label: 'Gudang Utama',
        recipient: 'Andi Wijaya',
        phone: '+62 812 1111 2222',
        line: 'Kawasan Industri Pulogadung Blok C2, Jakarta Timur 13920',
        primary: true,
      },
    ],
  },
  {
    customerId: 'c2',
    name: 'Sari Dewi',
    email: 'po@maritimwarna.com',
    phone: '+62 813 3333 4444',
    company: 'PT Maritim Warna',
    position: 'Procurement Officer',
    companyEmail: 'procurement@maritimwarna.com',
    companyPhone: '+62 61 694 2210',
    taxId: '02.987.654.3-112.000',
    addresses: [
      {
        id: 'addr-c2-1',
        label: 'Kantor & Gudang',
        recipient: 'Sari Dewi',
        phone: '+62 813 3333 4444',
        line: 'Jl. Pelabuhan No. 12, Belawan, Medan 20411',
        primary: true,
      },
    ],
  },
];

export function getCustomerProfile(customerId: string): CustomerProfile | null {
  return customerProfiles.find((profile) => profile.customerId === customerId) ?? null;
}

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
