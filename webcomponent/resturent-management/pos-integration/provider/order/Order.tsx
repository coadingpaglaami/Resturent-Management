"use client";

import { useGetSquareOrderListQuery } from "@/api/pos";
import { useGetCloverOrderListQuery } from "@/api/pos/clover";
import { CloverOrder, SquareOrder } from "@/interface/pos";
import { PosTablePage } from "@/webcomponent/reusable";
import { useState } from "react";

export const OrderProvider = ({ provider }: { provider: string }) => {
  const [page] = useState(1);
  const limit = 10;

  const cloverOrder = useGetCloverOrderListQuery({ page, limit });

  const squareOrders = useGetSquareOrderListQuery({ page, limit });
  if (provider === "square") {
    return (
      <PosTablePage<SquareOrder>
        title={`${provider} Orders`}
        isLoading={squareOrders.isLoading}
        isError={squareOrders.isError}
        errorMessage={squareOrders.error?.message}
        data={squareOrders.data?.results || []}
        columns={[
          { header: "Customer", cell: (row) => row.customer_name },
          { header: "Location", cell: (row) => row.state || "N/A" },
          {
            header: "Total Amount",
            cell: (row) => row.total_tax_amount || "N/A",
          },
        ]}
      />
    );
  } else {
    return (
      <PosTablePage<CloverOrder>
        title={`${provider} Orders`}
        isLoading={cloverOrder.isLoading}
        isError={cloverOrder.isError}
        errorMessage={cloverOrder.error?.message}
        data={cloverOrder.data?.results || []}
        columns={[
          { header: "Customer", cell: (row) => row.customer_name || "N/A" },
          { header: "Currency", cell: (row) => row.currency || "N/A" },
          {
            header: "Payment Status",
            cell: (row) => (row.payment_state ? row.payment_state : "N/A"),
          },
        ]}
      />
    );
  }
};
