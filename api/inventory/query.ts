import {
  useQuery,
  useMutation,
  UseQueryResult,
  UseMutationResult,
} from "@tanstack/react-query";
import { PaginatedResponse } from "@/interface/PaginatedResponse";
import { Pagination } from "@/interface/Pagination";
import {
  InventoryItem,
  CreateInventoryItemRequest,
  UpdateInventoryItemRequest,
} from "@/interface/Inventory";
import {
  getInventoryItemList,
  createInventoryItem,
  updateInventoryItem,
  deleteInventoryItem,
  getInventoryItemById,
  getAllInventoryCategories,
} from "./api";
import { EntityResponse } from "@/interface/Constrain";

// GET list query
export const useGetInventoryItemListQuery = ({
  page = 1,
  limit = 10,
}: Pagination): UseQueryResult<PaginatedResponse<InventoryItem>, Error> => {
  return useQuery({
    queryKey: ["inventoryItems", page, limit],
    queryFn: () => getInventoryItemList({ page, limit }),
    staleTime: 10 * 60 * 1000,
  });
};

// CREATE mutation
export const useCreateInventoryItemMutation = (): UseMutationResult<
  InventoryItem,
  Error,
  CreateInventoryItemRequest
> => {
  return useMutation({
    mutationFn: (payload: CreateInventoryItemRequest) =>
      createInventoryItem(payload),
  });
};

// UPDATE mutation
export const useUpdateInventoryItemMutation = (): UseMutationResult<
  InventoryItem,
  Error,
  { id: string; payload: UpdateInventoryItemRequest }
> => {
  return useMutation({
    mutationFn: ({ id, payload }) => updateInventoryItem(id, payload),
  });
};

// DELETE mutation
export const useDeleteInventoryItemMutation = (): UseMutationResult<
  void,
  Error,
  string
> => {
  return useMutation({
    mutationFn: (id: string) => deleteInventoryItem(id),
  });
};

// GET by ID query
export const useGetInventoryItemByIdQuery = (
  id: string,
): UseQueryResult<InventoryItem, Error> => {
  return useQuery({
    queryKey: ["inventoryItem", id],
    queryFn: () => getInventoryItemById(id),
    enabled: !!id,
    staleTime: 10 * 60 * 1000,
  });
};

export const useGetAllInventoryCategoriesQuery = ({page, limit}: Pagination): UseQueryResult<
  EntityResponse,
  Error
> => {
  return useQuery({
    queryKey: ["inventoryCategories",page, limit],
    queryFn: () => getAllInventoryCategories({ page, limit }),
    staleTime: 10 * 60 * 1000,
  });
};
