import axios from "@/lib/axios";
import { FOOD_MANAGER, LOCATION, LOCATION_DETAIL } from "./path";
import { Pagination } from "@/interface/Pagination";
import { LocationResponse } from "@/interface/Constrain";

export const CreateLocation = async ({ name }: { name: string }) => {
  const { data } = await axios.post(`/${FOOD_MANAGER}/${LOCATION}/`, { name });
  return data;
};

export const GetAllLocations = async ({
  page,
  limit,
}: Pagination): Promise<LocationResponse> => {
  const { data } = await axios.get(`/${FOOD_MANAGER}/${LOCATION}/`, {
    params: { page, limit },
  });
  return data;
};

export const GetLocationDetails = async (locationId: string) => {
  const { data } = await axios.get(
    `/${FOOD_MANAGER}/${LOCATION_DETAIL}/${locationId}/`,
  );
  return data;
};

export const UpdateLocation = async (
  { locationId }: { locationId: string },
  payload: { name: string },
) => {
  const { data } = await axios.patch(
    `/${FOOD_MANAGER}/${LOCATION_DETAIL}/${locationId}/`,
    payload,
  );
  return data;
};

export const DeleteLocation = async (locationId: string) => {
  const { data } = await axios.delete(
    `/${FOOD_MANAGER}/${LOCATION_DETAIL}/${locationId}/`,
  );
  return data;
};
