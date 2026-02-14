import { Pagination } from "@/interface/Pagination";
import {
  CatalogItem,
  CreateSquareCategoryRequest,
  CreateSquareCategoryResponse,
  CreateSquareItemRequest,
  CreateSquareItemResponse,
  MessageResponse,
  PosProvider,
  SquareCategoryListResponse,
  SquareCustomer,
  SquareInvoice,
  SquareItem,
  SquareOrder,
  UpdateSquareCategoryRequest,
  UpdateSquareCategoryResponse,
  UpdateSquareItemRequest,
  UpdateSquareItemResponse,
} from "@/interface/pos";
import { useMutation, useQuery, UseQueryResult } from "@tanstack/react-query";
import {
  createSquareCategory,
  createSquareItem,
  deleteSquareCategory,
  deleteSquareItem,
  getCatalogList,
  getSquareCategories,
  getSquareCustomerList,
  getSquareInvoiceList,
  getSquareItemById,
  getSquareItemList,
  getSquareItems,
  getSquareOrderList,
  syncToInventory,
  updateSquareCategory,
  updateSquareItem,
} from "./api";
import { PaginatedResponse } from "@/interface/PaginatedResponse";

export const useGetCatalogListQuery = ({
  page = 1,
  limit = 10,
}: Pagination): UseQueryResult<PaginatedResponse<CatalogItem>, Error> => {
  return useQuery({
    queryKey: ["catalogList", page, limit],
    queryFn: () => getCatalogList({ page, limit }),
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
};

export const useGetSquareItemListQuery = ({
  page = 1,
  limit = 10,
}: Pagination): UseQueryResult<PaginatedResponse<SquareItem>, Error> => {
  return useQuery({
    queryKey: ["squareItems", page, limit],
    queryFn: () => getSquareItemList({ page, limit }),
    staleTime: 10 * 60 * 1000,
  });
};

export const useGetSquareCustomerListQuery = ({
  page = 1,
  limit = 10,
}: Pagination): UseQueryResult<PaginatedResponse<SquareCustomer>, Error> => {
  return useQuery({
    queryKey: ["squareCustomers", page, limit],
    queryFn: () => getSquareCustomerList({ page, limit }),
    staleTime: 10 * 60 * 1000,
  });
};

export const useGetSquareOrderListQuery = ({
  page = 1,
  limit = 10,
}: Pagination): UseQueryResult<PaginatedResponse<SquareOrder>, Error> => {
  return useQuery({
    queryKey: ["squareOrders", page, limit],
    queryFn: () => getSquareOrderList({ page, limit }),
    staleTime: 10 * 60 * 1000,
  });
};

export const useGetSquareInvoiceListQuery = ({
  page = 1,
  limit = 10,
}: Pagination): UseQueryResult<PaginatedResponse<SquareInvoice>, Error> => {
  return useQuery({
    queryKey: ["squareInvoices", page, limit],
    queryFn: () => getSquareInvoiceList({ page, limit }),
    staleTime: 10 * 60 * 1000,
  });
};

export const useSyncToInventoryMutation = () => {
  return useMutation({
    mutationKey: ["syncToInventory"],
    mutationFn: (payload: { provider: PosProvider; location_id: string }) =>
      syncToInventory(payload),
  });
};

export const useCreateSquareCategoryMutation = () => {
  return useMutation<
    CreateSquareCategoryResponse,
    Error,
    CreateSquareCategoryRequest
  >({
    mutationKey: ["createSquareCategory"],
    mutationFn: (payload) => createSquareCategory(payload),
  });
};

export const squareKeys = {
  categories: () => ["squareCategories"] as const,
  items: () => ["squareItems"] as const,
};

export const useGetSquareCategoriesQuery = ({ page = 1, limit = 10 }: Pagination): UseQueryResult<
  SquareCategoryListResponse,
  Error
> => {
  return useQuery({
    queryKey: [...squareKeys.categories(), page, limit],
    queryFn: () => getSquareCategories({ page, limit }),
    staleTime: 10 * 60 * 1000,
  });
};

// PATCH /square/categories/{id}/update/
export const useUpdateSquareCategoryMutation = () => {
  return useMutation<
    UpdateSquareCategoryResponse,
    Error,
    { categoryId: string; payload: UpdateSquareCategoryRequest }
  >({
    mutationKey: ["updateSquareCategory"],
    mutationFn: ({ categoryId, payload }) =>
      updateSquareCategory(categoryId, payload),
  });
};

// DELETE /square/categories/{id}/delete/
export const useDeleteSquareCategoryMutation = () => {
  return useMutation<MessageResponse, Error, string>({
    mutationKey: ["deleteSquareCategory"],
    mutationFn: (categoryId) => deleteSquareCategory(categoryId),
  });
};

// ================================
// ITEMS QUERIES + MUTATIONS
// ================================

// GET /square/items/
export const useGetSquareItemsQuery = ({page, limit}: Pagination): UseQueryResult<
  PaginatedResponse<SquareItem>,
  Error
> => {
  return useQuery({
    queryKey: [...squareKeys.items(), page, limit],
    queryFn: () => getSquareItems(),
    staleTime: 10 * 60 * 1000,
  });
};

// POST /square/items/create/
export const useCreateSquareItemMutation = () => {
  return useMutation<CreateSquareItemResponse, Error, CreateSquareItemRequest>({
    mutationKey: ["createSquareItem"],
    mutationFn: (payload) => createSquareItem(payload),
  });
};

// GET /square/items/{id}/
export const useGetSquareItemByIdQuery = (itemId: string): UseQueryResult<SquareItem, Error> => {
  return useQuery({
    queryKey: ["squareItem", itemId],
    queryFn: () => getSquareItemById(itemId),
    staleTime: 10 * 60 * 1000,
  });
};

// PATCH /square/items/{id}/update/
export const useUpdateSquareItemMutation = () => {
  return useMutation<
    UpdateSquareItemResponse,
    Error,
    { itemId: string; payload: UpdateSquareItemRequest }
  >({
    mutationKey: ["updateSquareItem"],
    mutationFn: ({ itemId, payload }) => updateSquareItem(itemId, payload),
  });
};

// DELETE /square/items/{id}/delete/
export const useDeleteSquareItemMutation = () => {
  return useMutation<MessageResponse, Error, string>({
    mutationKey: ["deleteSquareItem"],
    mutationFn: (itemId) => deleteSquareItem(itemId),
  });
};
