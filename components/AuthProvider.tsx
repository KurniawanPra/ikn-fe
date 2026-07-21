'use client';

// Provider auth tiruan (dummy). Menyimpan sesi Customer & Admin secara
// TERPISAH di localStorage — sesuai PRD, sesi keduanya tidak boleh bercampur.
// Belum terhubung backend; hanya untuk prototipe frontend.

import { createContext, useContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import {
  verifyCustomer,
  verifyAdmin,
  type Account,
  type CustomerAccount,
  type AdminAccount,
} from '@/lib/auth';

const CUSTOMER_KEY = 'ikn_customer_session';
const ADMIN_KEY = 'ikn_admin_session';

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

function read<T extends Account>(key: string): T | null {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : null;
  } catch {
    return null;
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [customer, setCustomer] = useState<CustomerAccount | null>(null);
  const [admin, setAdmin] = useState<AdminAccount | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setCustomer(read<CustomerAccount>(CUSTOMER_KEY));
    setAdmin(read<AdminAccount>(ADMIN_KEY));
    setReady(true);
  }, []);

  function loginCustomer(email: string, password: string): CustomerAccount | null {
    const acc = verifyCustomer(email, password);
    if (acc) {
      setCustomer(acc);
      try {
        localStorage.setItem(CUSTOMER_KEY, JSON.stringify(acc));
      } catch {}
    }
    return acc;
  }

  function loginAdmin(email: string, password: string): AdminAccount | null {
    const acc = verifyAdmin(email, password);
    if (acc) {
      setAdmin(acc);
      try {
        localStorage.setItem(ADMIN_KEY, JSON.stringify(acc));
      } catch {}
    }
    return acc;
  }

  function logoutCustomer() {
    setCustomer(null);
    try {
      localStorage.removeItem(CUSTOMER_KEY);
    } catch {}
  }

  function logoutAdmin() {
    setAdmin(null);
    try {
      localStorage.removeItem(ADMIN_KEY);
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
