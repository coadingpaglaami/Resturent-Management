"use client";
import { Heading } from "@/webcomponent/reusable";
import { priceChangeData } from "./Data";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import { ArrowUpIcon, ArrowDownIcon } from "lucide-react";
import { useState } from "react";
import { format } from "date-fns";

interface PriceChangeSummary {
  totalChanges: number;
  increases: number;
  decreases: number;
  avgChange: number;
}

export const PriceChanges = () => {
  const [selectedVendor, setSelectedVendor] = useState<string>("All Vendors");
  const [selectedDuration, setSelectedDuration] =
    useState<string>("Last 30 Days");

  // Get unique vendors
  const uniqueVendors = Array.from(
    new Set(
      priceChangeData
        .flatMap((d) => d.tablePriceChangeData)
        .map((item) => item.vendorName)
    )
  ).sort();
  console.log("Unique Vendors:", uniqueVendors);

  // Filter data based on selected duration
  const selectedData = priceChangeData.find(
    (d) => d.duration === selectedDuration
  );

  // Further filter by vendor if not "All Vendors"
  const filteredItems = selectedData
    ? selectedData.tablePriceChangeData.filter(
        (item) =>
          selectedVendor === "All Vendors" || item.vendorName === selectedVendor
      )
    : [];

  // Sort by date descending (most recent first)
  const sortedItems = [...filteredItems].sort(
    (a, b) =>
      new Date(b.dateChanged).getTime() - new Date(a.dateChanged).getTime()
  );

  // Calculate summary stats
  const summary: PriceChangeSummary = sortedItems.reduce(
    (acc, item) => {
      const oldVal = parseFloat(item.oldPrice.replace("$", ""));
      const newVal = parseFloat(item.newPrice.replace("$", ""));
      const changePercent = ((newVal - oldVal) / oldVal) * 100;

      acc.totalChanges++;
      if (changePercent > 0) acc.increases++;
      else if (changePercent < 0) acc.decreases++;

      acc.avgChange += changePercent;
      return acc;
    },
    { totalChanges: 0, increases: 0, decreases: 0, avgChange: 0 }
  );

  if (sortedItems.length > 0) {
    summary.avgChange = summary.avgChange / sortedItems.length;
  }

  const formatChange = (value: number) => {
    const abs = Math.abs(value).toFixed(1);
    const sign = value > 0 ? "+" : value < 0 ? "-" : "";
    return `${sign}${abs}%`;
  };
  const summaryCards = [
    {
      key: "total",
      label: "Total Changes (30 days)",
      value: summary.totalChanges,
      className: "text-3xl font-bold mt-2",
    },
    {
      key: "increase",
      label: "Price Increases",
      value: summary.increases,
      className: "text-3xl font-bold text-green-600 mt-2 flex items-center gap-2",
      icon: ArrowUpIcon,
    },
    {
      key: "decrease",
      label: "Price Decreases",
      value: summary.decreases,
      className:
        "text-3xl font-bold text-red-600 mt-2 flex items-center gap-2",
      icon: ArrowDownIcon,
    },
    {
      key: "avg",
      label: "Avg Change",
      value:
        summary.avgChange === 0
          ? "0.0%"
          : summary.avgChange > 0
          ? `+${summary.avgChange.toFixed(1)}%`
          : `${summary.avgChange.toFixed(1)}%`,
      className: `text-3xl font-bold mt-2 ${
        summary.avgChange >= 0 ? "text-green-600" : "text-red-600"
      }`,
    },
  ];

  return (
    <div className="py-16 flex flex-col gap-8">
      <Heading
        title="Price Changes"
        subtitle="Track vendor price changes over time"
      />

      {/* Summary Cards */}
      <div className="grid grid-cols-4 gap-4">
        {summaryCards.map((card) => {
          const Icon = card.icon;

          return (
            <Card key={card.key} className="p-6 ">
              <div className="text-sm text-muted-foreground">{card.label}</div>

              <div className={card.className}>
                {card.value}
                {Icon && <Icon className="w-5 h-5" />}
              </div>
            </Card>
          );
        })}
      </div>

      {/* Filters */}
      <div className="flex gap-4 items-center">
        <Select value={selectedVendor} onValueChange={setSelectedVendor}>
          <SelectTrigger className="w-64">
            <SelectValue placeholder="Select vendor" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All Vendors">All Vendors</SelectItem>
            {uniqueVendors.map((vendor) => (
              <SelectItem key={vendor} value={vendor}>
                {vendor}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={selectedDuration} onValueChange={setSelectedDuration}>
          <SelectTrigger className="w-64">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {priceChangeData.map((item) => (
              <SelectItem key={item.duration} value={item.duration}>
                {item.duration}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Table */}
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Ingredient</TableHead>
              <TableHead>Vendor</TableHead>
              <TableHead>Old Price</TableHead>
              <TableHead>New Price</TableHead>
              <TableHead>% Change</TableHead>
              <TableHead>Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedItems.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="text-center py-8 text-muted-foreground"
                >
                  No price changes found for selected filters.
                </TableCell>
              </TableRow>
            ) : (
              sortedItems.map((item, idx) => {
                const oldVal = parseFloat(item.oldPrice.replace("$", ""));
                const newVal = parseFloat(item.newPrice.replace("$", ""));
                const changePercent = ((newVal - oldVal) / oldVal) * 100;
                const isIncrease = changePercent > 0;

                return (
                  <TableRow key={idx}>
                    <TableCell className="font-medium">
                      {item.ingredientName}
                    </TableCell>
                    <TableCell>{item.vendorName}</TableCell>
                    <TableCell>{item.oldPrice}</TableCell>
                    <TableCell>{item.newPrice}</TableCell>
                    <TableCell>
                      <span
                        className={`font-medium flex items-center gap-1 ${
                          isIncrease ? "text-green-600" : "text-red-600"
                        }`}
                      >
                        {isIncrease ? (
                          <ArrowUpIcon className="w-4 h-4" />
                        ) : (
                          <ArrowDownIcon className="w-4 h-4" />
                        )}
                        {formatChange(changePercent)}
                      </span>
                    </TableCell>
                    <TableCell>
                      {format(new Date(item.dateChanged), "yyyy-MM-dd")}
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
};
