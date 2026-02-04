"use client";
import {
  useGetCloverInvoiceListQuery,
  useGetSquareInvoiceListQuery,
} from "@/api/pos";
import { CloverInvoice, SquareInvoice } from "@/interface/pos";
import { PosTablePage } from "@/webcomponent/reusable";
import { useState } from "react";

export const Invoices = ({ provider }: { provider: string }) => {
  const [page] = useState(1);
  const limit = 10;
  const cloverInvoices = useGetCloverInvoiceListQuery({ page, limit });
  const squareInvoices = useGetSquareInvoiceListQuery({ page, limit });
  if (provider === "square") {
    return (
      <PosTablePage<SquareInvoice>
        title={`${provider} Invoices`}
        isLoading={squareInvoices.isLoading}
        isError={squareInvoices.isError}
        errorMessage={squareInvoices.error?.message}
        data={squareInvoices.data?.results || []}
        columns={[
          { header: "Invoice Number", cell: (row) => row.invoice_number },
          { header: "Customer", cell: (row) => row.customer_name },
          { header: "Status", cell: (row) => row.status || "N/A" },
          {
            header: "Total Amount",
            cell: (row) => row.total_amount || "N/A",
          },
        ]}
      />
    );
  } else {
    return (
      <PosTablePage<CloverInvoice>
        title={`${provider} Invoices`}
        isLoading={cloverInvoices.isLoading}
        isError={cloverInvoices.isError}
        errorMessage={cloverInvoices.error?.message}
        data={cloverInvoices.data?.results || []}
        columns={[
          { header: "Customer", cell: (row) => row.customer_name || "N/A" },
          { header: "Currency", cell: (row) => row.currency || "N/A" },
          {
            header: "Currency",
            cell: (row) => (row.currency ? row.currency : "N/A"),
          },
          {
            header: "Status",
            cell: (row) => (row.status ? row.status : "N/A"),
          },
        ]}
      />
    );
  }
};
