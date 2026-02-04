import axios from "@/lib/axios";
import { FOOD_MANAGER } from "../location/path";
import { Pagination } from "@/interface/Pagination";
import { LocationResponse } from "@/interface/Constrain";

const STORAGE_LOCATION = "storage-locations";

export const CreateFoodStorage = async ({ name }: { name: string }) => {
  const { data } = await axios.post(`/${FOOD_MANAGER}/${STORAGE_LOCATION}/`, {
    name,
  });
  return data;
};

export const GetAllFoodStorages = async ({
  page,
  limit,
}: Pagination): Promise<LocationResponse> => {
  const { data } = await axios.get(`/${FOOD_MANAGER}/${STORAGE_LOCATION}/`, {
    params: { page, limit },
  });
  return data;
};

export const GetFoodLocationDetails = async (locationId: string) => {
  const { data } = await axios.get(
    `/${FOOD_MANAGER}/${STORAGE_LOCATION}/${locationId}/`,
  );
  return data;
};

export const UpdateFoodLocation = async (
  { locationId }: { locationId: string },
  payload: { name: string },
) => {
  const { data } = await axios.patch(
    `/${FOOD_MANAGER}/${STORAGE_LOCATION}/${locationId}/`,
    payload,
  );
  return data;
};

export const DeleteFoodLocation = async (locationId: string) => {
  const { data } = await axios.delete(
    `/${FOOD_MANAGER}/${STORAGE_LOCATION}/${locationId}/`,
  );
  return data;
};
