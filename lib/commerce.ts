// Data awal transaksi berasal dari JSON. TransactionProvider memindahkannya
// ke localStorage agar checkout dan perubahan status tetap persisten.
import transactionJson from '@/data/transactions.json';
import type {
  AdditionalFee,
  BankAccount,
  CustomerDashboardStats,
  Order,
  OrderStatusKey,
  PaymentStatusKey,
  ShippingMethod,
  StatusLabel,
} from '@/lib/types';

interface TransactionData {
  orderStatus: Record<OrderStatusKey, StatusLabel>;
  paymentStatus: Record<PaymentStatusKey, StatusLabel>;
  trackingSteps: OrderStatusKey[];
  bankAccounts: BankAccount[];
  additionalFees: AdditionalFee[];
  shippingMethods: ShippingMethod[];
  orders: Order[];
}

const transactions = transactionJson as unknown as TransactionData;

export const orderStatus = transactions.orderStatus;
export const paymentStatus = transactions.paymentStatus;
export const trackingSteps = transactions.trackingSteps;
export const bankAccounts = transactions.bankAccounts;
export const additionalFees = transactions.additionalFees;
export const shippingMethods = transactions.shippingMethods;
export const orders = transactions.orders;

export function getOrder(number: string, source: readonly Order[] = orders): Order | null {
  return source.find((order) => order.number === number) || null;
}

export function getOrdersByCustomer(
  customerId: string,
  source: readonly Order[] = orders,
): Order[] {
  return source
    .filter((order) => order.customer.id === customerId)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getOrderForCustomer(
  number: string,
  customerId: string,
  source: readonly Order[] = orders,
): Order | null {
  return source.find(
    (order) => order.number === number && order.customer.id === customerId,
  ) ?? null;
}

export function getCustomerDashboardStats(
  customerId: string,
  source: readonly Order[] = orders,
): CustomerDashboardStats {
  const customerOrders = getOrdersByCustomer(customerId, source);
  return {
    totalOrders: customerOrders.length,
    awaitingPayment: customerOrders.filter((order) =>
      ['unpaid', 'rejected'].includes(order.payment),
    ).length,
    inProgress: customerOrders.filter((order) =>
      ['awaiting_verification', 'processing', 'packing', 'shipped', 'delivered'].includes(order.status),
    ).length,
    completed: customerOrders.filter((order) => order.status === 'completed').length,
    transactionValue: customerOrders
      .filter((order) => order.status !== 'cancelled')
      .reduce((total, order) => total + order.total, 0),
  };
}

export function bankById(id: string) {
  return bankAccounts.find((bank) => bank.id === id) || null;
}

export function shippingById(id: string) {
  return shippingMethods.find((method) => method.id === id) || null;
}
