"use client";

import {
  useCreateSquareCategoryMutation,
  useDeleteSquareCategoryMutation,
  useGetSquareCategoriesQuery,
  useUpdateSquareCategoryMutation,
} from "@/api/pos";
import { CatalogItem } from "@/interface/pos";
import { PosTablePage } from "@/webcomponent/reusable";
import { useState } from "react";
import { format } from "date-fns";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export const CatalogProvider = ({ provider }: { provider: string }) => {
  const [page] = useState(1);
  const limit = 10;

  const squareCatalog = useGetSquareCategoriesQuery({ page, limit });

  const [open, setOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<CatalogItem | null>(
    null,
  );

  const { mutate: categoryCreate, isPending: isCreating } =
    useCreateSquareCategoryMutation();

  const { mutate: updateCategory, isPending: isUpdating } =
    useUpdateSquareCategoryMutation();

  const { mutate: deleteCategory, isPending: isDeleting } =
    useDeleteSquareCategoryMutation();

  const isEditMode = !!selectedCategory;

  // 🔹 Open Create
  const handleOpenCreate = () => {
    setSelectedCategory(null);
    setOpen(true);
  };

  // 🔹 Open Edit
  const handleOpenEdit = (category: CatalogItem) => {
    setSelectedCategory(category);
    setOpen(true);
  };

  // 🔹 Delete
  const handleDelete = (category: CatalogItem) => {
    deleteCategory(category.id, {
      onSuccess: () => {
        toast.success("Category deleted successfully");
        squareCatalog.refetch();
      },
    });
  };

  // 🔹 Submit (Create or Edit)
  const handleSubmit = (formData: FormData) => {
    const name = formData.get("name") as string;
    if (!name) return;

    if (isEditMode && selectedCategory) {
      updateCategory(
        { categoryId: selectedCategory.id, payload: { name } },
        {
          onSuccess: () => {
            toast.success("Category updated successfully");
            squareCatalog.refetch();
            setOpen(false);
            setSelectedCategory(null);
          },
        },
      );
    } else {
      categoryCreate(
        { name },
        {
          onSuccess: () => {
            toast.success("Category created successfully");
            squareCatalog.refetch();
            setOpen(false);
          },
        },
      );
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center gap-2.5">
        <h1 className="text-xl font-semibold">{provider} Catalog</h1>

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button variant="buttonBlue" onClick={handleOpenCreate}>
              Create New
            </Button>
          </DialogTrigger>

          <DialogContent className="min-w-md dark:bg-black bg-white rounded-lg p-6">
            <h2 className="text-lg font-medium">
              {isEditMode ? "Edit Category" : "Create New Category"}
            </h2>

            <form
              className="space-y-4 mt-4"
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit(new FormData(e.currentTarget));
              }}
            >
              <div>
                <label className="block text-sm font-medium mb-1">Name</label>
                <input
                  type="text"
                  name="name"
                  defaultValue={selectedCategory?.name || ""}
                  className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <Button
                type="submit"
                variant="buttonBlue"
                disabled={isCreating || isUpdating}
              >
                {isEditMode
                  ? isUpdating
                    ? "Updating..."
                    : "Update"
                  : isCreating
                    ? "Creating..."
                    : "Submit"}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Table */}
      <PosTablePage<CatalogItem>
        isLoading={squareCatalog.isLoading}
        isError={squareCatalog.isError}
        errorMessage={(squareCatalog.error as { message: string })?.message}
        data={squareCatalog.data?.results || []}
        columns={[
          { header: "Name", cell: (row) => row.name },
          {
            header: "Updated At",
            cell: (row) =>
              row.updated_at ? format(new Date(row.updated_at), "PPpp") : "N/A",
          },
          {
            header: "Items",
            cell: (row) =>
              row.items?.length
                ? row.items.map((item) => String(item)).join(", ")
                : "N/A",
          },
        ]}
        renderActions={(row) => (
          <div className="flex gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={() => handleOpenEdit(row)}
            >
              Edit
            </Button>

            <Button
              size="sm"
              variant="destructive"
              onClick={() => handleDelete(row)}
              disabled={isDeleting}
            >
              Delete
            </Button>
          </div>
        )}
      />
    </div>
  );
};
