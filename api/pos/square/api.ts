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
  SyncPayload,
  UpdateSquareCategoryRequest,
  UpdateSquareCategoryResponse,
  UpdateSquareItemRequest,
  UpdateSquareItemResponse,
} from "@/interface/pos";
import axios from "@/lib/axios";
import { CUSTOMERS, INVOICES, ITEMS, ORDERS, SQUARE } from "./path";
import { PaginatedResponse } from "@/interface/PaginatedResponse";

export const getCatalogList = async ({
  page,
  limit,
}: Pagination): Promise<PaginatedResponse<CatalogItem>> => {
  const { data } = await axios.get(`/${SQUARE}/catalog/`, {
    params: { page, limit },
  });
  return data;
};

export const getSquareItemList = async ({
  page,
  limit,
}: Pagination): Promise<PaginatedResponse<SquareItem>> => {
  const { data } = await axios.get(`/${SQUARE}/${ITEMS}/`, {
    params: { page, limit },
  });
  return data;
};

export const getSquareCustomerList = async ({
  page,
  limit,
}: Pagination): Promise<PaginatedResponse<SquareCustomer>> => {
  const { data } = await axios.get(`/${SQUARE}/${CUSTOMERS}/`, {
    params: { page, limit },
  });
  return data;
};

export const getSquareOrderList = async ({
  page,
  limit,
}: Pagination): Promise<PaginatedResponse<SquareOrder>> => {
  const { data } = await axios.get(`/${SQUARE}/${ORDERS}/`, {
    params: { page, limit },
  });
  return data;
};

export const getSquareInvoiceList = async ({
  page,
  limit,
}: Pagination): Promise<PaginatedResponse<SquareInvoice>> => {
  const { data } = await axios.get(`/${SQUARE}/${INVOICES}/`, {
    params: { page, limit },
  });
  return data;
};

export const syncToInventory = async ({
  provider,
  location_id,
}: SyncPayload) => {
  const endpointMap: Record<PosProvider, string> = {
    square: "/square/sync-to-inventory/",
    clover: "/clover/sync-to-inventory/",
  };

  const { data } = await axios.post(endpointMap[provider], {
    location_id,
  });

  return data;
};

export const createSquareCategory = async (
  payload: CreateSquareCategoryRequest
): Promise<CreateSquareCategoryResponse> => {
  const { data } = await axios.post(
    `/${SQUARE}/categories/create/`,
    payload
  );

  return data;
};

// GET /square/categories/
export const getSquareCategories = async ({
  page,
  limit,
}: Pagination): Promise<SquareCategoryListResponse> => {
  const { data } = await axios.get(`/square/categories/`, {
    params: { page, limit },
  });
  return data;
};

// PATCH /square/categories/{id}/update/  (body: { name })
export const updateSquareCategory = async (
  categoryId: string,
  payload: UpdateSquareCategoryRequest
): Promise<UpdateSquareCategoryResponse> => {
  const { data } = await axios.patch(
    `/square/categories/${categoryId}/update/`,
    payload
  );
  return data;
};

// DELETE /square/categories/{id}/delete/
export const deleteSquareCategory = async (
  categoryId: string
): Promise<MessageResponse> => {
  const { data } = await axios.delete(
    `/square/categories/${categoryId}/delete/`
  );
  return data;
};

// ================================
// ITEMS
// ================================

// POST /square/items/create/
export const createSquareItem = async (
  payload: CreateSquareItemRequest
): Promise<CreateSquareItemResponse> => {
  const { data } = await axios.post(`/square/items/create/`, payload);
  return data;
};

// GET /square/items/
export const getSquareItems = async (): Promise<PaginatedResponse<SquareItem>> => {
  const { data } = await axios.get(`/square/items/`);
  return data;
};

// GET /square/items/{id}/
export const getSquareItemById = async (itemId: string): Promise<SquareItem> => {
  const { data } = await axios.get(`/square/items/${itemId}/`);
  return data;
};

// PATCH /square/items/{id}/update/  (same as post but optional)
export const updateSquareItem = async (
  itemId: string,
  payload: UpdateSquareItemRequest
): Promise<UpdateSquareItemResponse> => {
  const { data } = await axios.patch(`/square/items/${itemId}/update/`, payload);
  return data;
};

// DELETE /square/items/{id}/delete/
export const deleteSquareItem = async (itemId: string): Promise<MessageResponse> => {
  const { data } = await axios.delete(`/square/items/${itemId}/delete/`);
  return data;
};