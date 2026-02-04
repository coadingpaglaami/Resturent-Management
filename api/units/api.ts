import axios from "@/lib/axios";
import { PaginatedResponse } from "@/interface/PaginatedResponse";
import { Pagination } from "@/interface/Pagination";
import { Unit,CreateUnitRequest,UpdateUnitRequest } from "@/interface/Unit";
import { FOOD_MANAGER } from "../location/path";

const UNITS = "units";

// GET list
export const getUnitList = async ({
  page,
  limit,
}: Pagination): Promise<PaginatedResponse<Unit>> => {
  const { data } = await axios.get(`/${FOOD_MANAGER}/${UNITS}/`, {
    params: { page, limit },
  });
  return data;
};

// CREATE
export const createUnit = async (
  payload: CreateUnitRequest
): Promise<Unit> => {
  const { data } = await axios.post(`/${FOOD_MANAGER}/${UNITS}/`, payload);
  return data;
};

// UPDATE
export const updateUnit = async (
  id: string,
  payload: UpdateUnitRequest
): Promise<Unit> => {
  const { data } = await axios.patch(
    `/${FOOD_MANAGER}/${UNITS}/${id}/`,
    payload
  );
  return data;
};

// DELETE
export const deleteUnit = async (id: string): Promise<void> => {
  await axios.delete(`/${FOOD_MANAGER}/${UNITS}/${id}/`);
};
