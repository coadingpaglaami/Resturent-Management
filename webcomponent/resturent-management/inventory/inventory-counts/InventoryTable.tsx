"use client";
import { InventoryCountData } from "./Data";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Eye, Trash2 } from "lucide-react";
import { Pagination } from "@/webcomponent/reusable";
import { useRouter } from "next/navigation";

interface InventoryTableProps {
  inventoryData: InventoryCountData[];
}

export const InventoryTableData = ({ inventoryData }: InventoryTableProps) => {
  const rowsPerPage = 5;
  const [page, setPage] = useState(1);
  const [deleteItem, setDeleteItem] = useState<InventoryCountData | null>(null);
  const router = useRouter();

  const totalPages = Math.ceil(inventoryData.length / rowsPerPage);

  const paginatedData = inventoryData.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  const handleDelete = () => {
    // later connect API here
    setDeleteItem(null);
  };

  return (
    <div className="space-y-3">
      {/* TABLE */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Last Updated</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {paginatedData.map((row, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium">{row.name}</TableCell>
              <TableCell>{row.location}</TableCell>
              <TableCell>{row.date}</TableCell>
              <TableCell>{row.lastUpdated}</TableCell>

              {/* STATUS */}
              <TableCell>
                <span
                  className={`px-2 py-1 rounded-md text-sm font-medium
                  ${
                    row.status === "Complete"
                      ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                      : "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
                  }`}
                >
                  {row.status}
                </span>
              </TableCell>

              {/* ACTIONS */}
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button size="sm" variant="outline" onClick={() => router.push(`/inventory/inventory-counts/${row.id}`)}>
                    <Eye className="w-4 h-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => setDeleteItem(row)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* PAGINATION */}
    <Pagination currentPage={page} onPageChange={setPage} totalPages={totalPages} />

      {/* DELETE DIALOG */}
      <Dialog open={!!deleteItem} onOpenChange={() => setDeleteItem(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Inventory Count</DialogTitle>
          </DialogHeader>

          <p className="text-sm">
            Are you sure you want to delete{" "}
            <span className="font-semibold">{deleteItem?.name}</span>?
          </p>

          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteItem(null)}>
              No
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              Yes, Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
