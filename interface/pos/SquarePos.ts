// interface/Catalog.ts

export interface CatalogItem {
  id: string;
  name: string;
  updated_at: string; // ISO string
  is_deleted: boolean;
  items: unknown[]; // keep flexible since API returns []
}

export interface CatalogListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: CatalogItem[];
}

export interface SquareItemVariation {
  id: string;
  name: string;
  sku: string;
  price_amount: number;
  price_currency: string;
  ordinal: number;
  is_deleted: boolean;
}

export interface SquareItem {
  id: string;
  name: string;
  description: string;
  category: string | null;
  updated_at: string;
  is_deleted: boolean;
  variations: SquareItemVariation[];
}

export interface SquareCustomer {
  id: string;
  email: string | null;
  phone_number: string | null;
  given_name: string;
  family_name: string;
  company_name: string | null;
  nickname: string | null;
  reference_id: string | null;
  created_at_square: string;
  updated_at: string;
  is_deleted: boolean;
}

export interface SquareOrder {
  id: string;
  location_id: string;
  customer: string;
  customer_name: string;
  reference_id: string | null;
  state: string;
  total_money_amount: number;
  total_money_currency: string;
  total_tax_amount: number;
  total_discount_amount: number;
  created_at_square: string;
  updated_at: string;
  closed_at: string | null;
  is_deleted: boolean;
}

export interface SquareInvoice {
  id: string;
  order_id: string;
  location_id: string;
  customer: string;
  customer_name: string;
  invoice_number: string;
  title: string;
  description: string;
  status: string;
  total_amount: number;
  currency: string;
  due_date: string;
  created_at_square: string;
  updated_at: string;
  is_deleted: boolean;
}