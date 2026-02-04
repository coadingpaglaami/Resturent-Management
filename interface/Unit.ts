export interface Unit {
  id: string;
  name: string;
  symbol: string;
  unit_type: "weight" | "volume";
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface CreateUnitRequest {
  name: string;
  symbol: string;
  unit_type: "weight" | "volume";
}

export interface UpdateUnitRequest {
  name?: string;
  symbol?: string;
  unit_type?: "weight" | "volume";
  is_active?: boolean;
}
