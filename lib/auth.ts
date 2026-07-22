// Kredensial dan profil awal untuk mode dummy JSON.
import accountsJson from '@/data/accounts.json';
import type { CustomerProfile } from '@/lib/types';

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

interface CustomerCredential extends CustomerAccount {
  password: string;
}

interface AdminCredential extends AdminAccount {
  password: string;
}

interface AccountData {
  customers: CustomerCredential[];
  admins: AdminCredential[];
  profiles: CustomerProfile[];
}

const accounts = accountsJson as unknown as AccountData;

export const customerCredentials = accounts.customers;
export const adminCredentials = accounts.admins;
export const customerProfiles = accounts.profiles;

export function getCustomerProfile(customerId: string): CustomerProfile | null {
  return customerProfiles.find((profile) => profile.customerId === customerId) ?? null;
}

function stripCustomer({ password: _password, ...account }: CustomerCredential): CustomerAccount {
  return account;
}

function stripAdmin({ password: _password, ...account }: AdminCredential): AdminAccount {
  return account;
}

export function verifyCustomer(email: string, password: string): CustomerAccount | null {
  const found = customerCredentials.find(
    (credential) =>
      credential.email.toLowerCase() === email.trim().toLowerCase() &&
      credential.password === password,
  );
  return found ? stripCustomer(found) : null;
}

export function verifyAdmin(email: string, password: string): AdminAccount | null {
  const found = adminCredentials.find(
    (credential) =>
      credential.email.toLowerCase() === email.trim().toLowerCase() &&
      credential.password === password,
  );
  return found ? stripAdmin(found) : null;
}
