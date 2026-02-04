"use client";
import { toast } from "sonner";
import {
  useCreateFoodLocationMutation,
  useDeleteFoodLocationMutation,
  useGetFoodLocationsQuery,
  useUpdateFoodLocationMutation,
} from "@/api/storage/query";
import { Entity } from "@/interface/Constrain";
import { Management, PaginationData } from "@/webcomponent/reusable";
import { useState } from "react";

export const FoodStorage = () => {
  const [loadingItemId, setLoadingItemId] = useState<string | number | null>(
    null,
  );
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 10;

  // Fetch food storages
  const { data, isLoading, refetch } = useGetFoodLocationsQuery({
    page: currentPage,
    limit: itemsPerPage,
  });

  // Mutations
  const createMutation = useCreateFoodLocationMutation();
  const updateMutation = useUpdateFoodLocationMutation();
  const deleteMutation = useDeleteFoodLocationMutation();

  // Define the type for the API location item

  // Transform API data to component format
  const locations =
    data?.results?.map((item: Entity) => ({
      id: item.id,
      name: item.name,
    })) || ([] satisfies Entity[]);
  // Pagination data (if your API returns pagination)
  const pagination: PaginationData | undefined = data?.results
    ? {
        currentPage: currentPage || 1,
        totalPages: Math.ceil((data.count || 1) / itemsPerPage),
        totalItems: data.count || locations.length,
        itemsPerPage: itemsPerPage,
      }
    : undefined;

  // Handle Add
  const handleAdd = async (name: string) => {
    try {
      await createMutation.mutateAsync({ name });
      toast.success("Location added successfully");
      refetch();
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "Failed to add location";
      toast.error(message);
      throw error;
    }
  };

  // Handle Edit
  const handleEdit = async (id: string | number, newName: string) => {
    setLoadingItemId(id);
    try {
      await updateMutation.mutateAsync({
        locationId: String(id),
        payload: { name: newName },
      });
      toast.success("Location updated successfully");
      refetch();
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "Failed to update location";
      toast.error(message);
      throw error;
    } finally {
      setLoadingItemId(null);
    }
  };

  // Handle Delete
  const handleDelete = async (id: string | number) => {
    setLoadingItemId(id);
    try {
      await deleteMutation.mutateAsync(String(id));
      toast.success("Location deleted successfully");
      refetch();
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "Failed to delete location";
      toast.error(message);
      throw error;
    } finally {
      setLoadingItemId(null);
    }
  };

  // Handle Page Change (if pagination is supported)
  const handlePageChange = async (page: number) => {
    // If your API supports pagination, you'll need to modify the query to accept page parameter
    // For now, this is a placeholder
    console.log("Change to page:", page);
    setCurrentPage(page);
    refetch();
  };

  return (
    <Management
      items={locations}
      pagination={pagination}
      title="Food Storage Management"
      subtitle="Manage Food Storage Here"
      onAdd={handleAdd}
      onEdit={handleEdit}
      onDelete={handleDelete}
      onPageChange={pagination ? handlePageChange : undefined}
      addButtonText="Add Food Storage"
      inputPlaceholder="Add new food storage..."
      isLoading={isLoading}
      loadingItemId={loadingItemId}
    />
  );
};
