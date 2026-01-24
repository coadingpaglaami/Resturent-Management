import { useQuery, useMutation } from "@tanstack/react-query";
import {
  CreateLocation,
  GetLocations,
  GetLocationDetails,
  UpdateLocation,
  DeleteLocation,
} from "./api"; // Import your API functions

// Create Location Mutation
export const useCreateLocationMutation = () => {
  return useMutation({
    mutationKey: ["createLocation"],
    mutationFn: ({ name }: { name: string }) => {
      return CreateLocation({ name });
    },
  });
};

// Get Locations Query
export const useGetLocationsQuery = () => {
  return useQuery({
    queryKey: ["locations"],
    queryFn: GetLocations,
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
};

// Get Location Details Query
export const useGetLocationDetailsQuery = (locationId: string) => {
  return useQuery({
    queryKey: ["locationDetails", locationId],
    queryFn: () => GetLocationDetails(locationId),
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
};

// Update Location Mutation
export const useUpdateLocationMutation = () => {
  return useMutation({
    mutationKey: ["updateLocation"],
    mutationFn: ({
      locationId,
      payload,
    }: {
      locationId: string;
      payload: { name: string };
    }) => {
      return UpdateLocation({ locationId }, payload);
    },
  });
};

// Delete Location Mutation
export const useDeleteLocationMutation = () => {
  return useMutation({
    mutationKey: ["deleteLocation"],
    mutationFn: (locationId: string) => {
      return DeleteLocation(locationId);
    },
  });
};
