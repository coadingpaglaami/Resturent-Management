"use client";

import { useState } from "react";
import { Management, PaginationData } from "@/webcomponent/reusable";
import {
  useGetAllergenListQuery,
  useCreateAllergenMutation,
  useUpdateAllergenMutation,
  useDeleteAllergenMutation,
} from "@/api/allergen";
import { toast } from "sonner"; // or your toast library
import { Entity } from "@/interface/Constrain";

export const Allergen = () => {
  const [loadingItemId, setLoadingItemId] = useState<string | number | null>(
    null,
  );
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 10;

  // Fetch allergens
  const { data, isLoading,refetch } = useGetAllergenListQuery({
    page: currentPage,
    limit: itemsPerPage,
  });

  // Mutations
  const createMutation = useCreateAllergenMutation();
  const updateMutation = useUpdateAllergenMutation();
  const deleteMutation = useDeleteAllergenMutation();

  // Define the type for the API allergen item

  // Transform API data to component format
  const allergens =
    data?.results?.map((item: Entity) => ({
      id: item.id,
      name: item.name,
    })) || ([] satisfies Entity[]);

  // Pagination data (if your API returns pagination)
  const pagination: PaginationData | undefined = data?.results
    ? {
        currentPage: currentPage || 1,
        totalPages: Math.ceil((data.count || 1) / itemsPerPage),
        totalItems: data.count || allergens.length,
        itemsPerPage: itemsPerPage,
      }
    : undefined;

  // Handle Add
  const handleAdd = async (name: string) => {
    try {
      await createMutation.mutateAsync({ name });
      toast.success("Allergen added successfully");
      refetch();
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "Failed to add allergen";
      toast.error(message);
      throw error;
    }
  };

  // Handle Edit
  const handleEdit = async (id: string | number, newName: string) => {
    setLoadingItemId(id);
    try {
      await updateMutation.mutateAsync({
        allergenId: String(id),
        payload: { name: newName },
      });
      toast.success("Allergen updated successfully");
      refetch();
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "Failed to update allergen";
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
      toast.success("Allergen deleted successfully");
      refetch();
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "Failed to delete allergen";
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
      items={allergens}
      pagination={pagination}
      title="Allergen Management"
      subtitle="Manage allergen types tracked across your ingredients and recipes"
      onAdd={handleAdd}
      onEdit={handleEdit}
      onDelete={handleDelete}
      onPageChange={pagination ? handlePageChange : undefined}
      addButtonText="Add Allergen"
      inputPlaceholder="Add new allergen..."
      isLoading={isLoading}
      loadingItemId={loadingItemId}
    />
  );
};
