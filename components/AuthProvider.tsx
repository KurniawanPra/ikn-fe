'use client';

// Provider auth tiruan (dummy). Hanya satu sesi aktif: admin atau customer.
// Jika tidak ada sesi, pengguna tetap dapat mengakses situs sebagai viewer.

import { createContext, useContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import {
  verifyCustomer,
  verifyAdmin,
  type Account,
  type CustomerAccount,
  type AdminAccount,
} from '@/lib/auth';

const SESSION_KEY = 'ikn_auth_session_v2';

interface AuthContextValue {
  customer: CustomerAccount | null;
  admin: AdminAccount | null;
  ready: boolean;
  loginCustomer: (email: string, password: string) => CustomerAccount | null;
  loginAdmin: (email: string, password: string) => AdminAccount | null;
  logoutCustomer: () => void;
  logoutAdmin: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

function isAccount(value: unknown): value is Account {
  if (!value || typeof value !== 'object') return false;
  const account = value as Record<string, unknown>;
  const baseIsValid =
    typeof account.id === 'string' &&
    typeof account.name === 'string' &&
    typeof account.email === 'string';

  if (!baseIsValid) return false;
  if (account.role === 'admin') return true;
  return account.role === 'customer' && typeof account.company === 'string';
}

function readSession(): Account | null {
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    if (!raw) return null;
    const parsed: unknown = JSON.parse(raw);
    return isAccount(parsed) ? parsed : null;
  } catch {
    return null;
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [account, setAccount] = useState<Account | null>(null);
  const [ready, setReady] = useState(false);
  const customer: CustomerAccount | null = account?.role === 'customer' ? account : null;
  const admin: AdminAccount | null = account?.role === 'admin' ? account : null;

  useEffect(() => {
    setAccount(readSession());
    localStorage.removeItem('ikn_customer_session');
    localStorage.removeItem('ikn_admin_session');
    setReady(true);
  }, []);

  function loginCustomer(email: string, password: string): CustomerAccount | null {
    const acc = verifyCustomer(email, password);
    if (acc) {
      setAccount(acc);
      try {
        localStorage.setItem(SESSION_KEY, JSON.stringify(acc));
      } catch {}
    }
    return acc;
  }

  function loginAdmin(email: string, password: string): AdminAccount | null {
    const acc = verifyAdmin(email, password);
    if (acc) {
      setAccount(acc);
      try {
        localStorage.setItem(SESSION_KEY, JSON.stringify(acc));
      } catch {}
    }
    return acc;
  }

  function logoutCustomer() {
    if (account?.role !== 'customer') return;
    setAccount(null);
    try {
      localStorage.removeItem(SESSION_KEY);
    } catch {}
  }

  function logoutAdmin() {
    if (account?.role !== 'admin') return;
    setAccount(null);
    try {
      localStorage.removeItem(SESSION_KEY);
    } catch {}
  }

  return (
    <AuthContext.Provider
      value={{
        customer,
        admin,
        ready,
        loginCustomer,
        loginAdmin,
        logoutCustomer,
        logoutAdmin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    // Fallback aman bila dipakai di luar provider (mis. saat prerender).
    return {
      customer: null,
      admin: null,
      ready: false,
      loginCustomer: () => null,
      loginAdmin: () => null,
      logoutCustomer: () => {},
      logoutAdmin: () => {},
    };
  }
  return ctx;
}
