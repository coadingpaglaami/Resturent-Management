export interface InventoryItem {
  id: string;
  product_name: string;
  sku: string;
  location_name: string;
  pack_size_description: string | null;
  base_unit_symbol: string;
  current_price: number | null;
  last_price: number | null;
  last_updated: string;
  cost_per_unit: number | null;
  minimum_level: string;
  target_par: string;
  pos_source: "SQUARE" | "CLOVER" | "OTHER" | string;
  is_pos_managed: boolean;
  product_image: string | null;
  is_active: boolean;
}

export interface CreateInventoryItemRequest {
  location: string;
  product_name: string;
  category: string;
  storage_location: string;
  base_unit: string;
  sku?: string;
  pack_size_description?: string | null;
  current_price?: number | null;
  last_price?: number | null;
  cost_per_unit?: number | null;
  minimum_level?: string;
  target_par?: string;
  pos_source?: string;
  is_pos_managed?: boolean;
  product_image?: string | null;
  is_active?: boolean;
}

export interface UpdateInventoryItemRequest {
  location?: string;
  product_name?: string;
  category?: string;
  storage_location?: string;
  base_unit?: string;
  sku?: string;
  pack_size_description?: string | null;
  current_price?: number | null;
  last_price?: number | null;
  cost_per_unit?: number | null;
  minimum_level?: string;
  target_par?: string;
  pos_source?: string;
  is_pos_managed?: boolean;
  product_image?: string | null;
  is_active?: boolean;
}
