"use client";
import { useMemo } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ArrowUpDown } from "lucide-react";
import { Pagination } from "@/webcomponent/reusable";
import { InventoryItem } from "@/interface/Inventory";


interface DataBaseTableProps {
  data: InventoryItem[];
  categoryFilter: string;
  searchValue: string;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const DataBaseTable = ({
  data,

  searchValue,
  currentPage,
  totalPages,
  onPageChange,
}: DataBaseTableProps) => {
  // Client-side filtering (optional - you might want server-side filtering instead)
  const filteredData = useMemo(() => {
    return data.filter((row) => {
      const matchesSearch =
        row.product_name.toLowerCase().includes(searchValue.toLowerCase()) ||
        row.sku.toLowerCase().includes(searchValue.toLowerCase());
      return matchesSearch;
    });
  }, [data, searchValue]);

  return (
    <div className="mt-4 overflow-auto border rounded-md dark:bg-[#1D293D] box-shadow-card dark:border-[#314158]">
      <Table>
        <TableHeader className="bg-transparent">
          <TableRow>
            <TableHead className="text-sm dark:text-[#90A1B9]">
              <div className="flex items-center gap-1">
                # <ArrowUpDown className="w-4 h-4" />
              </div>
            </TableHead>
            <TableHead className="text-sm dark:text-[#90A1B9]">
              <div className="flex items-center gap-1">
                Product Name <ArrowUpDown className="w-4 h-4" />
              </div>
            </TableHead>
            <TableHead className="text-sm dark:text-[#90A1B9]">
              <div className="flex items-center gap-1">
                SKU <ArrowUpDown className="w-4 h-4" />
              </div>
            </TableHead>
            <TableHead className="text-sm dark:text-[#90A1B9]">
              <div className="flex items-center gap-1">
                Location <ArrowUpDown className="w-4 h-4" />
              </div>
            </TableHead>
            <TableHead className="text-sm">Pack Size</TableHead>
            <TableHead className="text-sm">Unit</TableHead>
            <TableHead className="text-sm">
              <div className="flex items-center gap-1">
                Current Price <ArrowUpDown className="w-4 h-4" />
              </div>
            </TableHead>
            <TableHead className="text-sm">
              <div className="flex items-center gap-1">
                Last Price <ArrowUpDown className="w-4 h-4" />
              </div>
            </TableHead>
            <TableHead className="text-sm">
              <div className="flex items-center gap-1">
                Last Updated <ArrowUpDown className="w-4 h-4" />
              </div>
            </TableHead>
            <TableHead className="text-sm">
              <div className="flex items-center gap-1">
                Cost per Unit <ArrowUpDown className="w-4 h-4" />
              </div>
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {filteredData.length === 0 ? (
            <TableRow>
              <TableCell colSpan={10} className="text-center text-sm py-8">
                No inventory items found
              </TableCell>
            </TableRow>
          ) : (
            filteredData.map((row, index) => (
              <TableRow key={row.id}>
                <TableCell className="text-sm">
                  {index + 1 + (currentPage - 1) * 10}
                </TableCell>
                <TableCell className="text-sm">{row.product_name}</TableCell>
                <TableCell className="text-sm">{row.sku}</TableCell>
                <TableCell className="text-sm">{row.location_name}</TableCell>
                <TableCell className="text-sm">
                  {row.pack_size_description || "-"}
                </TableCell>
                <TableCell className="text-sm">{row.base_unit_symbol}</TableCell>
                <TableCell className="text-sm">
                  ${row.current_price?.toFixed(2) || "0.00"}
                </TableCell>
                <TableCell className="text-sm">
                  ${row.last_price?.toFixed(2) || "0.00"}
                </TableCell>
                <TableCell className="text-sm">
                  {new Date(row.last_updated).toLocaleDateString()}
                </TableCell>
                <TableCell className="text-sm">
                  ${row.cost_per_unit?.toFixed(2) || "0.00"}
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
      />
    </div>
  );
};