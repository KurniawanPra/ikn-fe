'use client';

import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { orders as dummyOrders } from '@/lib/commerce';
import type { Order } from '@/lib/types';

interface TransactionContextValue {
  orders: Order[];
  ready: boolean;
  createOrder: (order: Order) => void;
  updateOrder: (number: string, changes: Partial<Order>) => void;
  getOrder: (number: string) => Order | null;
}

const STORAGE_KEY = 'ikn_orders_v1';
const TransactionContext = createContext<TransactionContextValue | null>(null);

function isOrder(value: unknown): value is Order {
  if (!value || typeof value !== 'object') return false;
  const order = value as Partial<Order>;
  return (
    typeof order.number === 'string' &&
    typeof order.date === 'string' &&
    Array.isArray(order.items) &&
    typeof order.total === 'number'
  );
}

export function TransactionProvider({ children }: { children: ReactNode }) {
  const [orders, setOrders] = useState<Order[]>(dummyOrders);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]') as unknown;
      if (Array.isArray(saved)) {
        const validOrders = saved.filter(isOrder);
        if (validOrders.length > 0) setOrders(validOrders);
      }
    } catch {
      // Gunakan transaksi awal dari JSON bila data lokal tidak valid.
    } finally {
      setReady(true);
    }
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(orders));
    } catch {}
  }, [orders, ready]);

  function createOrder(order: Order) {
    setOrders((current) => [order, ...current.filter((item) => item.number !== order.number)]);
  }

  function updateOrder(number: string, changes: Partial<Order>) {
    setOrders((current) =>
      current.map((order) => (order.number === number ? { ...order, ...changes } : order)),
    );
  }

  function getOrder(number: string): Order | null {
    return orders.find((order) => order.number === number) || null;
  }

  return (
    <TransactionContext.Provider value={{ orders, ready, createOrder, updateOrder, getOrder }}>
      {children}
    </TransactionContext.Provider>
  );
}

export function useTransactions(): TransactionContextValue {
  const context = useContext(TransactionContext);
  if (!context) {
    return {
      orders: dummyOrders,
      ready: false,
      createOrder: () => {},
      updateOrder: () => {},
      getOrder: (number) => dummyOrders.find((order) => order.number === number) || null,
    };
  }
  return context;
}
