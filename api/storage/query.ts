import { useQuery, useMutation } from "@tanstack/react-query";
import {
  CreateFoodStorage,
  DeleteFoodLocation,
  GetAllFoodStorages,
  GetFoodLocationDetails,
  UpdateFoodLocation,
} from "./api"; // Import your API functions
import { Pagination } from "@/interface/Pagination";

// Create Location Mutation
export const useCreateFoodLocationMutation = () => {
  return useMutation({
    mutationKey: ["createFoodLocation"],
    mutationFn: ({ name }: { name: string }) => {
      return CreateFoodStorage({ name });
    },
  });
};

// Get Locations Query
export const useGetFoodLocationsQuery = ({ page, limit }: Pagination) => {
  return useQuery({
    queryKey: ["foodLocations", page, limit],
    queryFn: () => GetAllFoodStorages({ page, limit }),
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
};

// Get Location Details Query
export const useGetFoodLocationDetailsQuery = (locationId: string) => {
  return useQuery({
    queryKey: ["foodLocationDetails", locationId],
    queryFn: () => GetFoodLocationDetails(locationId),
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
};

// Update Location Mutation
export const useUpdateFoodLocationMutation = () => {
  return useMutation({
    mutationKey: ["updateFoodLocation"],
    mutationFn: ({
      locationId,
      payload,
    }: {
      locationId: string;
      payload: { name: string };
    }) => {
      return UpdateFoodLocation({ locationId }, payload);
    },
  });
};

// Delete Location Mutation
export const useDeleteFoodLocationMutation = () => {
  return useMutation({
    mutationKey: ["deleteFoodLocation"],
    mutationFn: (locationId: string) => {
      return DeleteFoodLocation(locationId);
    },
  });
};
