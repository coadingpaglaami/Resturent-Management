"use client";
import { useGetCatalogListQuery } from "@/api/pos";
import { CatalogItem } from "@/interface/pos";
import { PosTablePage } from "@/webcomponent/reusable";
import { useState } from "react";
import { formatDate } from "date-fns";

export const CatalogProvider = ({ provider }: { provider: string }) => {
  const [page] = useState(1);
  const limit = 10;
  const squareCatalog = useGetCatalogListQuery({ page, limit });
  return (
    <PosTablePage<CatalogItem>
      title={`${provider} Catalog`}
      isLoading={squareCatalog.isLoading}
      isError={squareCatalog.isError}
      errorMessage={squareCatalog.error?.message}
      data={squareCatalog.data?.results || []}
      columns={[
        { header: "Name", cell: (row) => row.name },
        {
          header: "Updated At",
          cell: (row) => formatDate(new Date(row.updated_at), "PPpp") || "N/A",
        },
        {
          header: "Items",
          cell: (row) => row.items.map((item) => item).join(", ") || "N/A",
        },
      ]}
    />
  );
};
