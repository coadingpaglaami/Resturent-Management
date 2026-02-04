"use client";
import { useGetSquareCustomerListQuery } from "@/api/pos";
import { useGetCloverCustomerListQuery } from "@/api/pos/clover";
import { CloverCustomer, SquareCustomer } from "@/interface/pos";
import { PosTablePage } from "@/webcomponent/reusable";
import { useState } from "react";

export const Customers = ({ provider }: { provider: string }) => {
  const [page] = useState(1);
  const limit = 10;

  const cloverCustomers = useGetCloverCustomerListQuery({ page, limit });
  const squareCustomers = useGetSquareCustomerListQuery({ page, limit });

  if (provider === "square") {
    return (
      <PosTablePage<SquareCustomer>
        title={`${provider} Customers`}
        isLoading={squareCustomers.isLoading}
        isError={squareCustomers.isError}
        errorMessage={squareCustomers.error?.message}
        data={squareCustomers.data?.results || []}
        columns={[
          { header: "Name", accessorKey: "given_name" },
          { header: "Email", accessorKey: "email" },
          { header: "Phone", accessorKey: "phone_number" },
          { header: "Company Name", accessorKey: "company_name" },
        ]}
      />
    );
  } else {
    return (
      <PosTablePage<CloverCustomer>
        title={`${provider} Customers`}
        isLoading={cloverCustomers.isLoading}
        isError={cloverCustomers.isError}
        errorMessage={cloverCustomers.error?.message}
        data={cloverCustomers.data?.results || []}
        columns={[
          { header: "Name", accessorKey: "first_name" },
          { header: "Email", accessorKey: "email" },
          { header: "Phone", accessorKey: "phone_number" },
        ]}
      />
    );
  }
};
