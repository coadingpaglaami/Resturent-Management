// interface/Catalog.ts

export interface CatalogItem {
  id: string;
  name: string;
  updated_at: string; // ISO string
  is_deleted: boolean;
  items: unknown[]; // keep flexible since API returns []
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

// export interface SquareItem {
//   id: string;
//   name: string;
//   description: string;
//   category: string | null;
//   updated_at: string;
//   is_deleted: boolean;
//   variations: SquareItemVariation[];
// }

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

export interface CreateSquareCategoryRequest {
  name: string;
}

export interface SquareCategoryItem {
  id: string;
  name: string;
  updated_at: string;
  is_deleted: boolean;
  // items: any[]; // Replace with actual item type if available
}

export interface CreateSquareCategoryResponse {
  message: string;
  category: SquareCategoryItem;
}

export type CurrencyCode = "USD" | string;

// ---------- Item Variations ----------
export interface SquareItemVariation {
  name: string ;
  price_amount: number;
  price_currency: CurrencyCode;
  sku: string;
}

// ---------- Items (request) ----------
export interface CreateSquareItemRequest {
  name: string;
  description?: string;
  category_id?: string;
  variations?: SquareItemVariation[];
}

// Update item: same as post but all optional
export type UpdateSquareItemRequest = Partial<CreateSquareItemRequest>;

// ---------- Items (response model) ----------
// You said: "same interface" for GET too (as item request post).
// In real world response usually includes id, updated_at etc.
// If your backend returns more fields, extend this interface later.
export interface SquareItem extends CreateSquareItemRequest {
  id: string;
  updated_at?: string;
  is_deleted?: boolean;
}

// ---------- Categories ----------
export interface SquareCategory {
  id: string;
  name: string;
  updated_at: string;
  is_deleted: boolean;
  items: CreateSquareItemRequest[]; // you requested: items interface same as item request post
}

export interface SquareCategoryListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: SquareCategory[];
}

// ---------- Common simple message ----------
export interface MessageResponse {
  message: string;
}

// ---------- Create Category ----------
export interface CreateSquareCategoryRequest {
  name: string;
}

export interface CreateSquareCategoryResponse extends MessageResponse {
  category: SquareCategoryItem;
}

// ---------- Create Item ----------
export interface CreateSquareItemResponse extends MessageResponse {
  item: SquareItem;
}

// ---------- Update Category ----------
export interface UpdateSquareCategoryRequest {
  name: string;
}

export interface UpdateSquareCategoryResponse extends MessageResponse {
  category: SquareCategoryItem;
}

// ---------- Update Item ----------
export interface UpdateSquareItemResponse extends MessageResponse {
  item: SquareItem;
}