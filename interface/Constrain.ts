export interface EntityResponse {
  count: number;              // The total count of entities
  next: string | null;        // URL for the next page, if available
  previous: string | null;    // URL for the previous page, if available
  results: Entity[];          // Array of entity objects
}

export interface Entity {
  id: string;                 // Unique identifier for the entity (UUID)
  name: string;               // Name of the entity
}

export interface LocationResponse {
  count: number;              // The total count of locations
  next: string | null;        // URL for the next page, if available
  previous: string | null;    // URL for the previous page, if available
  results: Location[];        // Array of location objects
}

export interface Location {
  id: string;                 // Unique identifier for the location (UUID)
  name: string;               // Name of the location
  is_active: boolean;         // Whether the location is active or not
}