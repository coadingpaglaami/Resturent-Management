export type PosProvider = "square" | "clover";

export interface SyncPayload {
  location_id: string;
  provider: PosProvider;
}
