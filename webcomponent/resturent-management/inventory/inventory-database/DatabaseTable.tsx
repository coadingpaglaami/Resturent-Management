"use client";
import { useState, useMemo } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ArrowUpDown } from "lucide-react";
import { TableData } from "./Data";
import { Pagination } from "@/webcomponent/reusable";

interface DataBaseTableProps {
  data: TableData[];
  categoryFilter: string;
  searchValue: string;
  rowsPerPage?: number;
}

export const DataBaseTable = ({
  data,
  categoryFilter,
  searchValue,
  rowsPerPage = 10,
}: DataBaseTableProps) => {
  const [page, setPage] = useState(1);

  // Filtered data based on props
  const filteredData = useMemo(() => {
    return data.filter((row) => {
      const matchesCategory =
        categoryFilter === "all" ||
        row.category.toLowerCase() === categoryFilter.toLowerCase();
      const matchesSearch =
        row.name.toLowerCase().includes(searchValue.toLowerCase()) ||
        row.sku.toLowerCase().includes(searchValue.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [data, categoryFilter, searchValue]);

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const paginatedData = filteredData.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );


  return (
    <div className="mt-4 overflow-auto border rounded-md dark:bg-[#1D293D] box-shadow-card dark:border-[#314158] ">
      <Table className="">
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
            <TableHead className="text-sm dark:text-[#90A1B9]">
              <div className="flex items-center gap-1">
                Category <ArrowUpDown className="w-4 h-4" />
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
          {paginatedData.map((row, index) => (
            <TableRow key={index}>
              <TableCell className="text-sm">
                {index + 1 + (page - 1) * rowsPerPage}
              </TableCell>
              <TableCell className="text-sm">{row.name}</TableCell>
              <TableCell className="text-sm">{row.productName}</TableCell>
              <TableCell className="text-sm">{row.sku}</TableCell>
              <TableCell className="text-sm ">
                <span className="dark:bg-[#314158] bg-gray-200 px-2 py-1 rounded-md w-fit">
                  {row.category}
                </span>
              </TableCell>
              <TableCell className="text-sm">{row.packSize}</TableCell>
              <TableCell className="text-sm">{row.unit}</TableCell>
              <TableCell className="text-sm">{row.currentPrice}</TableCell>
              <TableCell className="text-sm">{row.lastPrice}</TableCell>
              <TableCell className="text-sm">{row.lastUpdated}</TableCell>
              <TableCell className="text-sm">{row.cpmUnit}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Pagination */}
      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={(p) => setPage(p)}
      />
    </div>
  );
};
