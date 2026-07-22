// ============================ TIPE BERSAMA ============================
// Model data mock yang dipakai lintas file. Sumber kebenaran tunggal agar
// strict mode tidak memaksa anotasi ad-hoc di tiap halaman.

export type Lang = 'id' | 'en';

// Nada warna badge/status.
export type Tone = 'ok' | 'warn' | 'bad' | 'info';

// Nama ikon yang tersedia di komponen Icon.
export type IconName =
  | 'arrow'
  | 'arrowDown'
  | 'chevronLeft'
  | 'chevronRight'
  | 'play'
  | 'leaf'
  | 'flask'
  | 'handshake'
  | 'target'
  | 'compass'
  | 'gear'
  | 'pin'
  | 'phone'
  | 'mail'
  | 'bag'
  | 'image'
  | 'trash'
  | 'orders'
  | 'wallet'
  | 'shieldCheck'
  | 'package'
  | 'truck'
  | 'checkCircle'
  | 'cancelCircle'
  | 'trendUp'
  | 'users'
  | 'paymentCheck'
  | 'drop'
  | 'check'
  | 'plus'
  | 'close'
  | 'quote'
  | 'sun'
  | 'moon';

// Label bilingual + nada (dipakai orderStatus, paymentStatus, stockLabels).
export interface StatusLabel {
  id: string;
  en: string;
  tone: Tone;
}

// ---- Catalog ----
export type PriceMode = 'fixed' | 'quote';
export type StockStatus = 'in_stock' | 'made_to_order' | 'out_of_stock';

export interface Category {
  slug: string;
  name: string;
  nameEn: string;
  desc: string;
}

export interface Product {
  slug: string;
  code: string;
  name: string;
  nameEn: string;
  category: string;
  kind: string;
  aliases?: string[];
  priceMode: PriceMode;
  price: number | null;
  unit: string;
  moq?: number;
  stock?: number;
  stockStatus: StockStatus;
  image: string;
  rating?: number;
  reviewCount?: number;
  summary: string;
  summaryEn?: string;
  highlights?: string[];
  specs?: string[][];
  applications?: string[];
  solubility?: string[][];
}

// Item keranjang (subset Product + qty).
export interface CartItem {
  slug: string;
  name: string;
  code: string;
  price: number | null;
  unit: string;
  image: string;
  qty: number;
}

export interface Review {
  id: string;
  product: string;
  customer: string;
  rating: number;
  date: string;
  body: string;
}

// ---- Commerce ----
export type OrderStatusKey =
  | 'awaiting_payment'
  | 'awaiting_verification'
  | 'processing'
  | 'packing'
  | 'shipped'
  | 'delivered'
  | 'completed'
  | 'cancelled';

export type PaymentStatusKey =
  | 'unpaid'
  | 'awaiting_confirmation'
  | 'paid'
  | 'rejected'
  | 'expired';

export interface OrderItem {
  slug: string;
  name: string;
  code: string;
  qty: number;
  unit: string;
  price: number;
}

export interface OrderAddress {
  label: string;
  recipient: string;
  phone: string;
  line: string;
}

export interface OrderTimelineEntry {
  status: OrderStatusKey;
  at: string;
}

export interface Order {
  number: string;
  date: string;
  customer: { id: string; name: string; email: string; pic: string };
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  adminFee: number;
  total: number;
  status: OrderStatusKey;
  payment: PaymentStatusKey;
  bank: string;
  shippingMethod: string;
  address: OrderAddress;
  trackingNo: string | null;
  proofUploaded?: boolean;
  reviewed?: boolean;
  dueAt?: string;
  timeline: OrderTimelineEntry[];
}

export interface CustomerAddress {
  id: string;
  label: string;
  recipient: string;
  phone: string;
  line: string;
  primary: boolean;
}

export interface CustomerProfile {
  customerId: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  position: string;
  companyEmail: string;
  companyPhone: string;
  taxId: string;
  addresses: CustomerAddress[];
}

export interface CustomerDashboardStats {
  totalOrders: number;
  awaitingPayment: number;
  inProgress: number;
  completed: number;
  transactionValue: number;
}

export interface BankAccount {
  id: string;
  bank: string;
  number: string;
  holder: string;
  active: boolean;
}

export type FeeType = 'shipping' | 'admin';

export interface AdditionalFee {
  id: string;
  label: string;
  type: FeeType;
  amount: number;
  active: boolean;
}

export interface ShippingMethod {
  id: string;
  label: string;
  amount: number;
}

// ---- Admin data ----
export interface DashboardStat {
  key: string;
  label: string;
  value: string;
  delta: string;
  icon: IconName;
  comparison: string;
  detail: string;
  href: string;
  actionLabel: string;
  tone?: 'positive' | 'attention' | 'neutral';
}

export interface SalesPoint {
  month: string;
  monthIndex: number;
  year: number;
  total: number;
  orders: number;
}

export type CustomerStatus = 'active' | 'inactive';

export interface Customer {
  id: string;
  name: string;
  email: string;
  pic: string;
  phone: string;
  company: string;
  orders: number;
  status: CustomerStatus;
  joined: string;
}

// Pengunjung publik adalah viewer tanpa sesi, bukan role ketiga.
export type Role = 'admin' | 'customer';

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: Role;
  active: boolean;
  permissions?: string[];
}

export interface NewsItem {
  slug: string;
  title: string;
  date: string;
  tag: string;
  published: boolean;
  thumb: string;
  excerpt: string;
}

export type GalleryType = 'image' | 'video';

export interface GalleryItem {
  id: string;
  title: string;
  type: GalleryType;
  src: string;
  published: boolean;
}

export interface Certificate {
  id: string;
  name: string;
  material: string;
  desc: string;
  file?: string;
  published: boolean;
}

export interface CustomerLogo {
  id: string;
  name: string;
}

export interface Brochure {
  id: string;
  title: string;
  file: string;
  size: string;
  published: boolean;
}

export interface MenuItem {
  id: string;
  label: string;
  url: string;
  parent: string | null;
  order: number;
  active: boolean;
}

export type WbsStatus = 'new' | 'review' | 'closed';

export interface WbsReport {
  id: string;
  code: string;
  subject: string;
  date: string;
  status: WbsStatus;
  anonymous: boolean;
}

export interface WbsStatusLabel {
  id: string;
  tone: Tone;
}
