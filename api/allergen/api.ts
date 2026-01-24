import axios from "@/lib/axios";
import { ALLERGEN, ALLERGEN_DETAIL } from "./path";
import { FOOD_MANAGER } from "../location/path";

export const getAllergenList = async () => {
  const { data } = await axios.get(`/${FOOD_MANAGER}/${ALLERGEN}/`);
  return data;
  // Implementation for fetching allergen list
};

export const createAllergen = async (payload: { name: string }) => {
  const { data } = await axios.post(`/${FOOD_MANAGER}/${ALLERGEN}/`, payload);
  return data;
  // Implementation for creating a new allergen
};

export const updateAllergen = async (
  allergenId: string,
  payload: { name: string },
) => {
  const { data } = await axios.patch(
    `/${FOOD_MANAGER}/${ALLERGEN_DETAIL}/${allergenId}/`,
    payload,
  );
  return data;
  // Implementation for updating an existing allergen
};

export const deleteAllergen = async (allergenId: string) => {
  const { data } = await axios.delete(
    `/${FOOD_MANAGER}/${ALLERGEN_DETAIL}/${allergenId}`,
  );
  return data;
  // Implementation for deleting an allergen
};
