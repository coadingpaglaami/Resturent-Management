// components/vendors/VendorsTable.tsx
"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Eye, Upload } from "lucide-react";
import { Vendor } from "./Data";
import { ButtonIcon } from "@/webcomponent/reusable";
import { useRouter } from "next/navigation";
// your provided data file

export const VendorsTable = ({ vendors }: { vendors: Vendor[] }) => {
  const router = useRouter();
  return (
    <div className="dark:rounded-md dark:border dark:border-slate-800 dark:bg-slate-900">
      <Table>
        <TableHeader>
          <TableRow className="dark:border-b dark:border-slate-800 dark:hover:bg-transparent">
            <TableHead className="dark:text-slate-300 dark:font-medium">
              Vendor Name
            </TableHead>
            <TableHead className="dark:text-slate-300 dark:font-medium">
              Contact Info
            </TableHead>
            <TableHead className="dark:text-slate-300 dark:font-medium">
              Number of SKUs
            </TableHead>
            <TableHead className="dark:text-slate-300 dark:font-medium">
              Last Order Guide Import
            </TableHead>
            <TableHead className="dark:text-right dark:text-slate-300 dark:font-medium">
              Actions
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {vendors.map((vendor) => (
            <TableRow
              key={vendor.name}
              className="dark:border-b dark:border-slate-800 dark:hover:bg-slate-800/50"
            >
              <TableCell className="dark:font-medium dark:text-white">
                {vendor.name}
              </TableCell>
              <TableCell className="dark:text-slate-400">
                {vendor.contactInfo}
              </TableCell>
              <TableCell className="dark:text-slate-300">
                {vendor.sku}
              </TableCell>
              <TableCell className="dark:text-slate-300">
                {vendor.lastOrderGuideImport}
              </TableCell>
              <TableCell className="dark:text-right">
                <div className="flex justify-end gap-2">
                  <ButtonIcon
                    icon={<Eye className="h-4 w-4" />}
                    varient="secondaryTwo"
                    onClick={() => router.push(`/vendors/list/${vendor.id}`)}
                  >
                    View
                  </ButtonIcon>
                  <ButtonIcon
                    icon={<Upload className="h-4 w-4" />}
                    varient="primary"
                  >
                    Import
                  </ButtonIcon>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
