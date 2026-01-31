import { useQuery, useMutation } from "@tanstack/react-query";
import {
  getAllRecipieCategory,
  createRecipieCategory,
  updateRecipieCategory,
  deleteRecipieCategory,
} from "./api"; // Import your API functions
import { Pagination } from "@/interface/Pagination";

// Get Recipe Categories Query
export const useGetAllRecipieCategoryQuery = ({ page, limit }: Pagination) => {
  return useQuery({
    queryKey: ["recipieCategories", { page, limit }],
    queryFn: () => getAllRecipieCategory({ page, limit }),
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
};

// Create Recipe Category Mutation
export const useCreateRecipieCategoryMutation = () => {
  return useMutation({
    mutationKey: ["createRecipieCategory"],
    mutationFn: ({ name }: { name: string }) => {
      return createRecipieCategory({ name });
    },
  });
};

// Update Recipe Category Mutation
export const useUpdateRecipieCategoryMutation = () => {
  return useMutation({
    mutationKey: ["updateRecipieCategory"],
    mutationFn: ({
      recipieCategoryId,
      payload,
    }: {
      recipieCategoryId: string;
      payload: { name: string };
    }) => {
      return updateRecipieCategory(recipieCategoryId, payload);
    },
  });
};

// Delete Recipe Category Mutation
export const useDeleteRecipieCategoryMutation = () => {
  return useMutation({
    mutationKey: ["deleteRecipieCategory"],
    mutationFn: (recipieCategoryId: string) => {
      return deleteRecipieCategory(recipieCategoryId);
    },
  });
};
