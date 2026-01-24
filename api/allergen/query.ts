import { useQuery, useMutation } from "@tanstack/react-query";
import {
  getAllergenList,
  createAllergen,
  updateAllergen,
  deleteAllergen,
} from "./api"; // Import your API functions

// Fetch Allergen List Query
export const useGetAllergenListQuery = () => {
  return useQuery({
    queryKey: ["allergenList"],
    queryFn: getAllergenList,
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
};

// Create Allergen Mutation
export const useCreateAllergenMutation = () => {
  return useMutation({
    mutationKey: ["createAllergen"],
    mutationFn: ({ name }: { name: string }) => {
      return createAllergen({ name });
    },
  });
};

// Update Allergen Mutation
export const useUpdateAllergenMutation = () => {
  return useMutation({
    mutationKey: ["updateAllergen"],
    mutationFn: ({
      allergenId,
      payload,
    }: {
      allergenId: string;
      payload: { name: string };
    }) => {
      return updateAllergen(allergenId, payload);
    },
  });
};

// Delete Allergen Mutation
export const useDeleteAllergenMutation = () => {
  return useMutation({
    mutationKey: ["deleteAllergen"],
    mutationFn: (allergenId: string) => {
      return deleteAllergen(allergenId);
    },
  });
};
