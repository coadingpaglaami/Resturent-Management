'use client';
import { useGetSquareItemListQuery } from "@/api/pos";
import { useGetCloverItemListQuery } from "@/api/pos/clover";
import { CloverItem, SquareItem } from "@/interface/pos";
import { PosTablePage } from "@/webcomponent/reusable";
import { useState } from "react";

export const ItemsProvider = ({ provider }: { provider: string }) => {
  const [page] = useState(1);
  const limit = 10;

  const cloverItems = useGetCloverItemListQuery({ page, limit });
  const squareItems = useGetSquareItemListQuery({ page, limit });
  if (provider === "square") {
    return (
      <PosTablePage<SquareItem>
        title={`${provider} Items`}
        isLoading={squareItems.isLoading}
        isError={squareItems.isError}
        errorMessage={squareItems.error?.message}
        data={squareItems.data?.results || []}
        columns={[
          { header: "Name", cell: (row) => row.name },
          { header: "Description", cell: (row) => row.description || "N/A" },
          { header: "Category", cell: (row) => row.category || "N/A" },
        ]}
      />
    );
  } else {
    return (
      <PosTablePage<CloverItem>
        title={`${provider} Items`}
        isLoading={cloverItems.isLoading}
        isError={cloverItems.isError}
        errorMessage={cloverItems.error?.message}
        data={cloverItems.data?.results || []}
        columns={[
          { header: "Name", cell: (row) => row.name },
          { header: "Price", cell: (row) => row.price || "N/A" },
          {
            header: "Type Of Price",
            cell: (row) => (row.price_type ? row.price_type : "N/A"),
          },
        ]}
      />
    );
  }
};
