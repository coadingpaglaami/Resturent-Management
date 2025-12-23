"use client";


import { useRouter } from "next/navigation";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

import { Eye, Trash2 } from "lucide-react";
import { Heading } from "@/webcomponent/reusable";
import { importBatchData } from "./Data";

export const ImportBatches = () => {
  const router = useRouter();




  return (
    <div className="py-16 flex flex-col gap-8">
      <Heading title="POS Import Batches" subtitle="View and manage POS data import batches" />

      <Card className="border shadow-sm">
        <CardContent className="p-0">
          <Table>
            <TableCaption className="text-muted-foreground">
              A list of recent POS data import batches from Toast POS.
            </TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12" />
                <TableHead>Batch ID</TableHead>
                <TableHead>Date Range</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Source</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Total Transactions</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {importBatchData.map((batch) => {
    

                return (
       
                    <>
                      <TableRow>
                        <TableCell>
                        </TableCell>
                        <TableCell className="font-medium">{batch.batchId}</TableCell>
                        <TableCell>{batch.dateRange}</TableCell>
                        <TableCell>{batch.location}</TableCell>
                        <TableCell>{batch.source}</TableCell>
                        <TableCell>
                          <Badge variant="default" className="bg-green-900 text-green-50 dark:bg-green-900">
                            {batch.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{batch.totalTransactions.toLocaleString()}</TableCell>
                        <TableCell className="text-right space-x-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => router.push(`/pos-integration/import-batches/${batch.batchId}`)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="text-destructive">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>

                  
                    </>
                 
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};