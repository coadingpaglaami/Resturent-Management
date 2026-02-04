import {
  useQuery,
  useMutation,
  UseQueryResult,
  UseMutationResult,
} from "@tanstack/react-query";
import { PaginatedResponse } from "@/interface/PaginatedResponse";
import { Pagination } from "@/interface/Pagination";
import { Unit, CreateUnitRequest, UpdateUnitRequest } from "@/interface/Unit";
import { getUnitList, createUnit, updateUnit, deleteUnit } from "./api";

// GET list query
export const useGetUnitListQuery = ({
  page = 1,
  limit = 10,
}: Pagination): UseQueryResult<PaginatedResponse<Unit>, Error> => {
  return useQuery({
    queryKey: ["units", page, limit],
    queryFn: () => getUnitList({ page, limit }),
    staleTime: 10 * 60 * 1000,
  });
};

// CREATE mutation
export const useCreateUnitMutation = (): UseMutationResult<
  Unit,
  Error,
  CreateUnitRequest
> => {
  return useMutation({
    mutationFn: (payload: CreateUnitRequest) => createUnit(payload),
  });
};

// UPDATE mutation
export const useUpdateUnitMutation = (): UseMutationResult<
  Unit,
  Error,
  { id: string; payload: UpdateUnitRequest }
> => {
  return useMutation({
    mutationFn: ({ id, payload }) => updateUnit(id, payload),
  });
};

// DELETE mutation
export const useDeleteUnitMutation = (): UseMutationResult<
  void,
  Error,
  string
> => {
  return useMutation({
    mutationFn: (id: string) => deleteUnit(id),
  });
};
