"use client";

import React from "react";

type Column<T> = {
  header: string;
  cell: (row: T) => React.ReactNode;
};

type Props<T> = {
  title?: string;
  columns: Column<T>[];
  data?: T[];
  isLoading?: boolean;
  isError?: boolean;
  errorMessage?: string;

  // 👇 Optional Action Renderer
  renderActions?: (row: T) => React.ReactNode;
};

export const PosTablePage = <T,>({
  columns,
  data = [],
  isLoading,
  isError,
  errorMessage,
  renderActions,
}: Props<T>) => {
  return (
    <div className="space-y-6 p-6">
      <div className="border rounded-md overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-muted">
            <tr>
              {columns.map((col, index) => (
                <th key={index} className="text-left p-3 font-medium">
                  {col.header}
                </th>
              ))}

              {/* 👇 Action Header (only if provided) */}
              {renderActions && (
                <th className="text-left p-3 font-medium">Actions</th>
              )}
            </tr>
          </thead>

          <tbody>
            {isLoading ? (
              <tr>
                <td className="p-4" colSpan={columns.length + (renderActions ? 1 : 0)}>
                  Loading...
                </td>
              </tr>
            ) : isError ? (
              <tr>
                <td className="p-4" colSpan={columns.length + (renderActions ? 1 : 0)}>
                  {errorMessage || "Something went wrong"}
                </td>
              </tr>
            ) : data.length === 0 ? (
              <tr>
                <td className="p-4" colSpan={columns.length + (renderActions ? 1 : 0)}>
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

                  {/* 👇 Action Cell */}
                  {renderActions && (
                    <td className="p-3">
                      {renderActions(row)}
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
