"use client";
import { ButtonIcon, Header, Heading } from "@/webcomponent/reusable";
import { DownloadIcon } from "lucide-react";
import { inventorySummaryDataArray } from "./Data";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState } from "react";

export const InventorySummary = () => {
  const [selectedSummary, setSelectedSummary] = useState(
    inventorySummaryDataArray[0].selectSummary
  );

  const selectedData = inventorySummaryDataArray.find(
    (item) => item.selectSummary === selectedSummary
  )!;

  // Calculate totals
  const totalExpected = selectedData.tableData.reduce(
    (sum, row) => sum + row.expectedValue,
    0
  );
  const totalCounted = selectedData.tableData.reduce(
    (sum, row) => sum + row.countedValue,
    0
  );
  const totalVariance = totalExpected - totalCounted;
  const totalVariancePercentage =
    totalExpected !== 0 ? (totalVariance / totalExpected) * 100 : 0;

  const getVarianceColor = (value: number) => {
    if (value > 0) return "text-green-500";
    if (value < 0) return "text-red-500";
    return "text-muted-foreground";
  };

  const getVarianceBg = (value: number) => {
    if (value > 0) return "dark:bg-green-950/50 border-green-800";
    if (value < 0) return "dark:bg-red-950/50 border-red-800";
    return "dark:bg-muted/50 border-muted";
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  const formatPercentage = (value: number) => {
    const formatted = value.toFixed(2);
    return value >= 0 ? `+${formatted}%` : `${formatted}%`;
  };

  return (
    <div className="py-16 flex flex-col gap-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:justify-between gap-4">
        <Heading
          title="Inventory Summary"
          subtitle="View completed inventory count summaries"
        />
        <ButtonIcon
          varient="secondaryTwo"
          icon={<DownloadIcon className="h-4 w-4" />}
        >
          Download CSV
        </ButtonIcon>
      </div>

      {/* Select */}
      <Header title="Select Count to Summarize">
        <Select value={selectedSummary} onValueChange={setSelectedSummary}>
          <SelectTrigger className="w-full max-w-[380px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {inventorySummaryDataArray.map((item) => (
              <SelectItem key={item.selectSummary} value={item.selectSummary}>
                {item.selectSummary}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </Header>

      {/* Summary Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="dark:bg-muted/40 border-muted">
          <CardContent className="pt-6">
            <div className="flex flex-col gap-1">
              <p className="text-sm text-muted-foreground">Status</p>
              <Badge
                variant={
                  selectedData.status === "Completed"
                    ? "green"
                    : selectedData.status === "In Progress"
                    ? "secondary"
                    : "outline"
                }
                className="w-fit mt-1"
              >
                {selectedData.status}
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="dark:bg-muted/40 border-muted">
          <CardContent className="pt-6">
            <div className="flex flex-col gap-1">
              <p className="text-sm text-muted-foreground">Expected Value</p>
              <p className="text-2xl font-semibold">
                {formatCurrency(totalExpected)}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="dark:bg-muted/40 border-muted">
          <CardContent className="pt-6">
            <div className="flex flex-col gap-1">
              <p className="text-sm text-muted-foreground">Counted Value</p>
              <p className="text-2xl font-semibold">
                {formatCurrency(totalCounted)}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className={`border ${getVarianceBg(totalVariance)}`}>
          <CardContent className="pt-6">
            <div className="flex flex-col gap-1">
              <p className="text-sm text-muted-foreground">Variance</p>
              <p
                className={`text-2xl font-bold ${getVarianceColor(
                  totalVariance
                )}`}
              >
                {totalVariance >= 0 ? "+" : ""}
                {formatCurrency(totalVariance)}
              </p>
              <p
                className={`text-sm font-medium ${getVarianceColor(
                  totalVariance
                )}`}
              >
                {formatPercentage(totalVariancePercentage)}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Table Section */}
      <Card>
        <CardHeader>
          <CardTitle>Summary by Storage Area</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Area</TableHead>
                  <TableHead>Items Counted</TableHead>
                  <TableHead className="text-right">Expected Value</TableHead>
                  <TableHead className="text-right">Counted Value</TableHead>
                  <TableHead className="text-right">Variance</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {selectedData.tableData.map((row) => {
                  const variance = row.expectedValue - row.countedValue;
                  const variancePercentage =
                    row.expectedValue !== 0
                      ? (variance / row.expectedValue) * 100
                      : 0;

                  return (
                    <TableRow key={row.id}>
                      <TableCell className="font-medium">{row.area}</TableCell>
                      <TableCell>{row.itemsCount}</TableCell>
                      <TableCell className="text-right">
                        {formatCurrency(row.expectedValue)}
                      </TableCell>
                      <TableCell className="text-right">
                        {formatCurrency(row.countedValue)}
                      </TableCell>
                      <TableCell className="text-right">
                        <span
                          className={`font-medium ${getVarianceColor(
                            variance
                          )}`}
                        >
                          {variance >= 0 ? "+" : ""}
                          {formatCurrency(variance)}
                        </span>
                        <span className="text-muted-foreground text-xs ml-2">
                          ({formatPercentage(variancePercentage)})
                        </span>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
