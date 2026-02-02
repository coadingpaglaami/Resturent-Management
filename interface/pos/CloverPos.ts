// interface/clover/Item.ts

export interface CloverItem {
  id: string;
  name: string;
  code: string;
  price: number;
  price_type: string;
  default_tax_rates: boolean;
  is_revenue: boolean;
  category: string;
  category_name: string;
  updated_at: string;
  is_deleted: boolean;
  variations: unknown[];
}

// interface/clover/Customer.ts

export interface CloverCustomer {
  id: string;
  email: string | null;
  phone_number: string | null;
  first_name: string;
  last_name: string;
  customer_since: string | null;
  created_at_clover: string;
  updated_at: string;
  is_deleted: boolean;
}

// interface/clover/Order.ts

export interface CloverOrder {
  id: string;
  currency: string;
  customer: string;
  customer_name: string;
  employee_id: string;
  total: number;
  tax_amount: number | null;
  state: string;
  payment_state: string;
  title: string;
  note: string | null;
  created_at_clover: string;
  updated_at: string;
  is_deleted: boolean;
}

// interface/clover/Invoice.ts

export interface CloverInvoice {
  id: string;
  order: string;
  order_id: string;
  customer: string;
  customer_name: string;
  amount: number;
  currency: string;
  status: string;
  created_at_clover: string;
  updated_at: string;
  is_deleted: boolean;
}

// interface/clover/Payment.ts

export interface CloverPayment {
  id: string;
  order: string;
  order_id: string;
  customer: string | null;
  customer_name: string | null;
  employee_id: string;
  amount: number;
  tip_amount: number | null;
  tax_amount: number | null;
  currency: string;
  result: string;
  card_type: string | null;
  created_at_clover: string;
  updated_at: string;
}
