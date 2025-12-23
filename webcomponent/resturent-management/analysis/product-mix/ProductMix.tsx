"use client";

import React, { useMemo, useState } from "react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ArrowUpIcon, DollarSign, ShoppingCart } from "lucide-react";
import { productMixData, type ProductMixData } from "./Data";
import { Heading } from "@/webcomponent/reusable";

export const ProductMix = () => {
  // Filter states
  const [dateFrom, setDateFrom] = useState<Date | undefined>(
    new Date(2025, 10, 1)
  ); // Nov 1, 2025
  const [dateTo, setDateTo] = useState<Date | undefined>(
    new Date(2025, 10, 24)
  ); // Nov 24, 2025
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedDayPart, setSelectedDayPart] = useState<string>("all");

  // Filtered data
  const filteredData = useMemo(() => {
    return productMixData.filter((item) => {
      const categoryMatch =
        selectedCategory === "all" || item.category === selectedCategory;
      const dayPartMatch =
        selectedDayPart === "all" || item.dayPart === selectedDayPart;
      return categoryMatch && dayPartMatch;
    });
  }, [selectedCategory, selectedDayPart]);

  // Aggregated metrics
  const totals = useMemo(() => {
    const grossSales = filteredData.reduce(
      (sum, item) => sum + item.grossSales,
      0
    );
    const netSales = filteredData.reduce((sum, item) => sum + item.netSales, 0);
    const qtySold = filteredData.reduce((sum, item) => sum + item.qtySold, 0);
    const avgCheck = qtySold > 0 ? netSales / qtySold : 0;

    return { grossSales, netSales, qtySold, avgCheck };
  }, [filteredData]);

  // Group by item name to consolidate across day parts
  const groupedData = useMemo(() => {
    const map = new Map<string, ProductMixData>();

    filteredData.forEach((item) => {
      const existing = map.get(item.name);
      if (existing) {
        existing.qtySold += item.qtySold;
        existing.grossSales += item.grossSales;
        existing.discount += item.discount;
        existing.netSales += item.netSales;
        existing.voids += item.voids;
        existing.comps += item.comps;
      } else {
        map.set(item.name, { ...item });
      }
    });

    return Array.from(map.values());
  }, [filteredData]);

  // Top 5 by net sales
  const top5Items = useMemo(() => {
    return [...groupedData].sort((a, b) => b.netSales - a.netSales).slice(0, 5);
  }, [groupedData]);

  const maxNetSales = top5Items[0]?.netSales || 1;

  const statsCards = [
    {
      key: "gross",
      label: "Total Gross Sales",
      value: `$${totals.grossSales.toLocaleString(undefined, {
        minimumFractionDigits: 0,
      })}`,
      icon: DollarSign,
      iconClass: "dark:text-green-500",
    },
    {
      key: "net",
      label: "Total Net Sales",
      value: `$${totals.netSales.toLocaleString(undefined, {
        minimumFractionDigits: 0,
      })}`,
      subValue: "8.5%",
      subIcon: ArrowUpIcon,
      subClass: "dark:text-green-500",
      icon: DollarSign,
      iconClass: "dark:text-green-500",
    },
    {
      key: "qty",
      label: "Total Quantity Sold",
      value: totals.qtySold,
      icon: ShoppingCart,
      iconClass: "dark:text-blue-500",
    },
    {
      key: "avg",
      label: "Average Check",
      value: `$${totals.avgCheck.toFixed(2)}`,
      icon: DollarSign,
      iconClass: "dark:text-purple-500",
    },
  ];

  return (
    <div className=" dark:text-gray-100 py-16 flex flex-col gap-8 px-4 md:px-8">
      {/* Title */}
      <Heading
        title="Product Mix & Sales"
        subtitle="Analyze sales performance by menu item"
      />

      {/* Filters */}
      <div className="w-full dark:bg-gray-900 rounded-lg p-6">
        <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center justify-between">
          <div className="flex flex-col sm:flex-row gap-4 flex-wrap">
            <div className="flex items-center gap-3">
              <span className="text-sm dark:text-gray-400 whitespace-nowrap">
                Date Range
              </span>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100 dark:hover:bg-gray-700"
                  >
                    {dateFrom ? format(dateFrom, "MM/dd/yyyy") : "From"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={dateFrom}
                    onSelect={setDateFrom}
                    className="dark:bg-gray-900 dark:text-gray-100 dark:dark:dark:border-gray-800"
                  />
                </PopoverContent>
              </Popover>
              <span className="dark:text-gray-500">to</span>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100 dark:hover:bg-gray-700"
                  >
                    {dateTo ? format(dateTo, "MM/dd/yyyy") : "To"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={dateTo}
                    onSelect={setDateTo}
                    className="dark:bg-gray-900 dark:text-gray-100 dark:dark:dark:border-gray-800"
                  />
                </PopoverContent>
              </Popover>
            </div>

            <Select
              value={selectedCategory}
              onValueChange={setSelectedCategory}
            >
              <SelectTrigger className="w-48 dark:bg-gray-800 dark:border-gray-700">
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent className="dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100">
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="Main Course">Main Course</SelectItem>
                <SelectItem value="Appetizer">Appetizer</SelectItem>
                <SelectItem value="Dessert">Dessert</SelectItem>
              </SelectContent>
            </Select>

            <Select value={selectedDayPart} onValueChange={setSelectedDayPart}>
              <SelectTrigger className="w-48 dark:bg-gray-800 dark:border-gray-700">
                <SelectValue placeholder="All Dayparts" />
              </SelectTrigger>
              <SelectContent className="dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100">
                <SelectItem value="all">All Dayparts</SelectItem>
                <SelectItem value="Breakfast">Breakfast</SelectItem>
                <SelectItem value="Lunch">Lunch</SelectItem>
                <SelectItem value="Dinner">Dinner</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsCards.map((card) => {
          const Icon = card.icon;
          const SubIcon = card.subIcon;

          return (
            <Card key={card.key}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm dark:text-gray-400">{card.label}</p>

                    <p className="text-2xl font-bold mt-2">{card.value}</p>

                    {card.subValue && (
                      <div
                        className={`flex items-center gap-1 mt-2 text-sm ${card.subClass}`}
                      >
                        {SubIcon && <SubIcon className="h-4 w-4" />}
                        <span>{card.subValue}</span>
                      </div>
                    )}
                  </div>

                  <Icon className={`h-10 w-10 opacity-80 ${card.iconClass}`} />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Top 5 Items */}
      <div className=" w-full">
        <Card className="">
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold mb-6">
              Top 5 Items by Net Sales
            </h2>
            <div className="space-y-6">
              {top5Items.map((item) => (
                <div key={item.name} className="flex items-center gap-4">
                  <span className="text-sm dark:text-gray-400 w-44 truncate">
                    {item.name}
                  </span>
                  <div className="flex-1 dark:bg-gray-800 rounded-full h-10 relative overflow-hidden">
                    <div
                      className="absolute inset-y-0 left-0 dark:bg-blue-600 transition-all duration-500"
                      style={{
                        width: `${(item.netSales / maxNetSales) * 100}%`,
                      }}
                    />
                  </div>
                  <span className="text-sm dark:text-gray-300 w-28 text-right">
                    $
                    {item.netSales.toLocaleString(undefined, {
                      minimumFractionDigits: 1,
                      maximumFractionDigits: 1,
                    })}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Product Mix Details Table */}
      <div className=" w-full">
        <Card className="">
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold mb-6">Product Mix Details</h2>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="dark:dark:border-gray-800">
                    <TableHead className="dark:text-gray-400">
                      Item Name
                    </TableHead>
                    <TableHead className="dark:text-gray-400">
                      Category
                    </TableHead>
                    <TableHead className="dark:text-gray-400 text-right">
                      Qty Sold
                    </TableHead>
                    <TableHead className="dark:text-gray-400 text-right">
                      Gross Sales
                    </TableHead>
                    <TableHead className="dark:text-gray-400 text-right">
                      Discounts
                    </TableHead>
                    <TableHead className="dark:text-gray-400 text-right">
                      Net Sales
                    </TableHead>
                    <TableHead className="dark:text-gray-400 text-right">
                      Voids
                    </TableHead>
                    <TableHead className="dark:text-gray-400 text-right">
                      Comps
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {groupedData.map((item) => (
                    <TableRow
                      key={item.name}
                      className="dark:dark:border-gray-800"
                    >
                      <TableCell className="font-medium">{item.name}</TableCell>
                      <TableCell>
                        <Badge
                          variant="secondary"
                          className="dark:bg-gray-800 dark:text-gray-300"
                        >
                          {item.category}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        {item.qtySold}
                      </TableCell>
                      <TableCell className="text-right">
                        ${item.grossSales.toLocaleString()}
                      </TableCell>
                      <TableCell className="text-right dark:text-yellow-500">
                        ${item.discount.toFixed(1)}
                      </TableCell>
                      <TableCell className="text-right font-semibold">
                        ${item.netSales.toFixed(1)}
                      </TableCell>
                      <TableCell className="text-right">{item.voids}</TableCell>
                      <TableCell className="text-right">{item.comps}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
