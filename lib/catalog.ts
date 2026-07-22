// Sumber awal katalog berasal dari JSON. CRUD admin menyalin data ini ke
// localStorage sehingga aplikasi tetap berfungsi tanpa backend.
import catalogJson from '@/data/catalog.json';
import type { Category, Product, Review, StatusLabel, StockStatus } from '@/lib/types';

interface CatalogData {
  categories: Category[];
  products: Product[];
  reviews: Review[];
}

const catalog = catalogJson as unknown as CatalogData;

export const categories: Category[] = catalog.categories;
export const products: Product[] = catalog.products;
export const reviews: Review[] = catalog.reviews;

export const stockLabels: Record<StockStatus, StatusLabel> = {
  in_stock: { id: 'Tersedia', en: 'In stock', tone: 'ok' },
  made_to_order: { id: 'Pre-order', en: 'Made to order', tone: 'warn' },
  out_of_stock: { id: 'Stok habis', en: 'Out of stock', tone: 'bad' },
};

export function getProduct(slug: string): Product | null {
  return products.find((product) => product.slug === slug) || null;
}

export function getCategory(slug: string): Category | null {
  return categories.find((category) => category.slug === slug) || null;
}

export function productsByCategory(slug: string): Product[] {
  return products.filter((product) => product.category === slug);
}

export function searchProducts(query: string): Product[] {
  const normalizedQuery = (query || '').trim().toLowerCase();
  if (!normalizedQuery) return products;

  return products.filter((product) => {
    const searchableText = [
      product.name,
      product.nameEn,
      product.code,
      product.kind,
      ...(product.aliases || []),
    ]
      .join(' ')
      .toLowerCase();

    return searchableText.includes(normalizedQuery);
  });
}

export function reviewsForProduct(slug: string): Review[] {
  return reviews.filter((review) => review.product === slug);
}
