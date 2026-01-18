import axios from "@/lib/axios";
import { FOOD_MANAGER, LOCATION, LOCATION_DETAIL } from "./path";

export const CreateLocation = async ({ name }: { name: string }) => {
  const { data } = await axios.post(`/${FOOD_MANAGER}/${LOCATION}`, { name });
  return data;
};

export const GetLocations = async () => {
  const { data } = await axios.get(`/${FOOD_MANAGER}/${LOCATION}`);
  return data;
};

export const GetLocationDetails = async (locationId: string) => {
  const { data } = await axios.get(
    `/${FOOD_MANAGER}/${LOCATION_DETAIL}/${locationId}`,
  );
  return data;
};
