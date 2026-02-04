import axios from "@/lib/axios";
import { PaginatedResponse } from "@/interface/PaginatedResponse";
import { Pagination } from "@/interface/Pagination";
import {
  InventoryItem,
  CreateInventoryItemRequest,
  UpdateInventoryItemRequest,
} from "@/interface/Inventory";
import { FOOD_MANAGER } from "../location/path";
import { EntityResponse } from "@/interface/Constrain";

const INVENTORY = "inventory";
const ITEMS = "items";

// GET list
export const getInventoryItemList = async ({
  page,
  limit,
}: Pagination): Promise<PaginatedResponse<InventoryItem>> => {
  const { data } = await axios.get(`/${FOOD_MANAGER}/${INVENTORY}/${ITEMS}/`, {
    params: { page, limit },
  });
  return data;
};

// CREATE
export const createInventoryItem = async (
  payload: CreateInventoryItemRequest,
): Promise<InventoryItem> => {
  const { data } = await axios.post(
    `/${FOOD_MANAGER}/${INVENTORY}/${ITEMS}/create/`,
    payload,
  );
  return data;
};

// UPDATE
export const updateInventoryItem = async (
  id: string,
  payload: UpdateInventoryItemRequest,
): Promise<InventoryItem> => {
  const { data } = await axios.patch(
    `/${FOOD_MANAGER}/${INVENTORY}/${ITEMS}/${id}/`,
    payload,
  );
  return data;
};

// DELETE
export const deleteInventoryItem = async (id: string): Promise<void> => {
  await axios.delete(`/${FOOD_MANAGER}/${INVENTORY}/${ITEMS}/${id}/`);
};

export const getInventoryItemById = async (
  id: string,
): Promise<InventoryItem> => {
  const { data } = await axios.get(
    `/${FOOD_MANAGER}/${INVENTORY}/${ITEMS}/${id}/`,
  );
  return data;
};

export const createInventoryCategory = async (name: string): Promise<void> => {
  const { data } = await axios.post(`/${FOOD_MANAGER}/inventory-categories/`, {
    name,
  });
  return data;
};

export const getAllInventoryCategories = async ({
  page,
  limit,
}: Pagination): Promise<EntityResponse> => {
  const { data } = await axios.get(`/${FOOD_MANAGER}/inventory-categories/`, {
    params: { page, limit },
  });
  return data;
};
