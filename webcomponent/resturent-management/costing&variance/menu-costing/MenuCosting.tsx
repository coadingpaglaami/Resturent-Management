"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { Heading } from "@/webcomponent/reusable";
import { recipieCostingDataArray } from "./Data";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
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
import { Alert, AlertDescription } from "@/components/ui/alert";

interface MenuItem {
  name: string;
  category: string;
  costorportion: number;
  sellingPrice: number;
}

const TARGET_FOOD_COST = 30; // 30% target food cost

export const MenuCosting = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [showAboveTargetOnly, setShowAboveTargetOnly] = useState(false);

  const data: MenuItem[] = recipieCostingDataArray;

  // Unique categories for filter
  const categories = useMemo(() => {
    const cats = Array.from(new Set(data.map((item) => item.category)));
    return cats.sort();
  }, []);

  // Filter data based on category and checkbox
  const filteredData = useMemo(() => {
    let filtered = data;

    if (selectedCategory !== "all") {
      filtered = filtered.filter((item) => item.category === selectedCategory);
    }

    if (showAboveTargetOnly) {
      filtered = filtered.filter((item) => {
        const foodCostPercent = (item.costorportion / item.sellingPrice) * 100;
        return foodCostPercent > TARGET_FOOD_COST;
      });
    }

    return filtered;
  }, [data, selectedCategory, showAboveTargetOnly]);

  // Calculations for summary cards
  const summary = useMemo(() => {
    const totalItems = filteredData.length;
    const avgFoodCost =
      filteredData.reduce((sum, item) => {
        return sum + (item.costorportion / item.sellingPrice) * 100;
      }, 0) / totalItems || 0;

    const itemsAboveTarget = filteredData.filter((item) => {
      const foodCostPercent = (item.costorportion / item.sellingPrice) * 100;
      return foodCostPercent > TARGET_FOOD_COST;
    }).length;

    // Find highest food cost % item
    const highestFoodCostItem = filteredData.reduce((max, item) => {
      const percent = (item.costorportion / item.sellingPrice) * 100;
      const maxPercent = (max.costorportion / max.sellingPrice) * 100;
      return percent > maxPercent ? item : max;
    }, filteredData[0]);

    return {
      totalItems,
      avgFoodCost: avgFoodCost.toFixed(1),
      itemsAboveTarget,
      highestFoodCostItem,
    };
  }, [filteredData]);

  // Enhanced data with calculations
  const tableData = filteredData.map((item) => {
    const foodCostPercent = (item.costorportion / item.sellingPrice) * 100;
    const grossProfit = item.sellingPrice - item.costorportion;
    const suggestedPrice = (
      item.costorportion /
      (TARGET_FOOD_COST / 100)
    ).toFixed(2);

    const isAboveTarget = foodCostPercent > TARGET_FOOD_COST;
    const isHighest = item.name === summary.highestFoodCostItem?.name;

    return {
      ...item,
      foodCostPercent: foodCostPercent.toFixed(1),
      grossProfit: grossProfit.toFixed(2),
      suggestedPrice,
      isAboveTarget,
      isHighest,
    };
  });

  return (
    <div className="py-16 flex flex-col gap-8">
      <Heading
        title="Menu Costing"
        subtitle="Analyze menu item profitability and pricing"
      />

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-gray-400">Total Menu Items</p>
            <p className="text-3xl font-bold mt-2">{summary.totalItems}</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-gray-400">Avg Food Cost %</p>
            <p className="text-3xl font-bold mt-2 text-emerald-400">
              {summary.avgFoodCost}%
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-gray-400">Items Above Target</p>
            <p className="text-3xl font-bold mt-2 text-red-400">
              {summary.itemsAboveTarget}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="All Categories" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {categories.map((cat) => (
              <SelectItem key={cat} value={cat}>
                {cat}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <div className="flex items-center space-x-2">
          <Checkbox
            id="above-target"
            checked={showAboveTargetOnly}
            onCheckedChange={(checked) =>
              setShowAboveTargetOnly(checked as boolean)
            }
          />
          <label
            htmlFor="above-target"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Only show items above target cost
          </label>
        </div>
      </div>

      {/* Table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Recipe Name</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Cost/Portion</TableHead>
                  <TableHead>Selling Price</TableHead>
                  <TableHead>Food Cost %</TableHead>
                  <TableHead>Gross Profit</TableHead>
                  <TableHead>Suggested Price</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <AnimatePresence>
                  {tableData.map((item) => (
                    <motion.tr
                      key={item.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <TableCell className="font-medium">{item.name}</TableCell>
                      <TableCell>
                        <Badge variant="default" className="bg-gray-300 text-black">{item.category}</Badge>
                      </TableCell>
                      <TableCell>${item.costorportion.toFixed(2)}</TableCell>
                      <TableCell>${item.sellingPrice.toFixed(2)}</TableCell>
                      <TableCell
                        className={
                          item.isHighest
                            ? "text-yellow-400 font-bold"
                            : item.isAboveTarget
                            ? "text-red-400"
                            : "text-emerald-400"
                        }
                      >
                        {item.foodCostPercent}%
                      </TableCell>
                      <TableCell className="text-emerald-400">
                        ${item.grossProfit}
                      </TableCell>
                      <TableCell>${item.suggestedPrice}</TableCell>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Pricing Guidance */}
      <Alert className="dark:bg-blue-950/50 bg-blue-100  dark:border-blue-800 flex ">
        <AlertDescription className="flex ">
          <strong>Pricing Guidance:</strong> Suggested prices are calculated
          based on a target{" "}
          <span className="font-bold">{TARGET_FOOD_COST}% food cost</span>.
          Adjust selling prices or reduce portion costs to improve
          profitability.
        </AlertDescription>
      </Alert>
    </div>
  );
};
