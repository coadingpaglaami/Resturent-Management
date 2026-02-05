import { create } from "zustand";
import { persist } from "zustand/middleware";

interface LocationState {
  locationId: string | null;
  setLocationId: (id: string) => void;
  clearLocation: () => void;
}

export const useLocationStore = create<LocationState>()(
  persist(
    (set) => ({
      locationId: null,
      setLocationId: (id) => set({ locationId: id }),
      clearLocation: () => set({ locationId: null }),
    }),
    {
      name: "selected-location-id",
    }
  )
);

