import { Pagination } from "@/interface/Pagination";
import axios from "@/lib/axios";
import { FOOD_MANAGER } from "../location/path";
import { Entity, EntityResponse } from "@/interface/Constrain";

export const getAllRecipieCategory = async ({ page, limit }: Pagination):Promise<EntityResponse> => {
  const { data } = await axios.get(`/${FOOD_MANAGER}/recipe-serve-category/`, {
    params: { page, limit },
  });
  return data;
};

export const createRecipieCategory = async (payload: { name: string }):Promise<Entity> => {
  const { data } = await axios.post(
    `/${FOOD_MANAGER}/recipe-serve-category/`,
    payload,
  );
  return data;
};

export const updateRecipieCategory = async (
  recipieCategoryId: string,
  payload: { name: string },
) => {
  const { data } = await axios.patch(
    `/${FOOD_MANAGER}/recipe-serve-category-detail/${recipieCategoryId}/`,
    payload,
  );
  return data;
};

export const deleteRecipieCategory = async (recipieCategoryId: string) => {
  const { data } = await axios.delete(
    `/${FOOD_MANAGER}/recipe-serve-category-detail/${recipieCategoryId}/`,
  );
  return data;
};
