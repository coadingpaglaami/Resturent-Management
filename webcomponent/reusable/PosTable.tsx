"use client";

import React from "react";

type Column<T> = {
  header: string;
  cell: (row: T) => React.ReactNode;
};

type Props<T> = {
  title: string;
  columns: Column<T>[];
  data?: T[];
  isLoading?: boolean;
  isError?: boolean;
  errorMessage?: string;
};

export const PosTablePage = <T,>({
  title,
  columns,
  data = [],
  isLoading,
  isError,
  errorMessage,
}: Props<T>) => {
  return (
    <div className="space-y-6 p-6">
      <h1 className="text-xl font-semibold">{title}</h1>

      <div className="border rounded-md overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-muted">
            <tr>
              {columns.map((col, index) => (
                <th key={index} className="text-left p-3 font-medium">
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {isLoading ? (
              <tr>
                <td className="p-4" colSpan={columns.length}>
                  Loading...
                </td>
              </tr>
            ) : isError ? (
              <tr>
                <td className="p-4" colSpan={columns.length}>
                  {errorMessage || "Something went wrong"}
                </td>
              </tr>
            ) : data.length === 0 ? (
              <tr>
                <td className="p-4" colSpan={columns.length}>
                  No data found
                </td>
              </tr>
            ) : (
              data.map((row, idx) => (
                <tr key={idx} className="border-t">
                  {columns.map((col, cidx) => (
                    <td key={cidx} className="p-3">
                      {col.cell(row)}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
