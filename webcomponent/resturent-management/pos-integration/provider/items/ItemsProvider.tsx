"use client";

import { useDeleteSquareItemMutation, useGetSquareItemsQuery } from "@/api/pos";
import { SquareItem } from "@/interface/pos";
import { PosTablePage } from "@/webcomponent/reusable";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export const ItemsProvider = ({ provider }: { provider: string }) => {
  const router = useRouter();
  const [page] = useState(1);
  const limit = 10;

  const {
    data: squareItems,
    isLoading,
    isError,
    error,
    refetch,
  } = useGetSquareItemsQuery({ page, limit });

  const { mutate: deleteSquareItem, isPending } = useDeleteSquareItemMutation();

  const handleDelete = (row: SquareItem) => {
    deleteSquareItem(row.id, {
      onSuccess: () => {
        toast.success("Item deleted");
        refetch();
      },
    });
  };

  if (provider !== "square") {
    return <div>Clover Items Table to be implemented</div>;
  }

  return (
    <div className="py-16 flex flex-col gap-2.5">
      <Button
        onClick={() => router.push(`/pos-integration/${provider}/items/create`)}
        className="flex justify-end w-fit"
      >
        Create New Item
      </Button>

      <PosTablePage<SquareItem>
        title={`${provider} Items`}
        isLoading={isLoading}
        isError={isError}
        errorMessage={(error as { message: string })?.message}
        data={squareItems?.results || []}
        columns={[
          { header: "Name", cell: (row) => row.name },
          { header: "Description", cell: (row) => row.description || "N/A" },
          { header: "Category", cell: (row) => row.category_id || "N/A" },
        ]}
        renderActions={(row) => (
          <div className="flex gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={() =>
                router.push(`/pos-integration/${provider}/items/${row.id}`)
              }
            >
              Edit
            </Button>

            <Button
              size="sm"
              variant="destructive"
              disabled={isPending}
              onClick={() => handleDelete(row)}
            >
              Delete
            </Button>
          </div>
        )}
      />
    </div>
  );
};
