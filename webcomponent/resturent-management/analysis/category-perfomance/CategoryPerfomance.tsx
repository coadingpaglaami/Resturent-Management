"use client";

import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { categoryAnalysisData } from "./Data";
import { Heading } from "@/webcomponent/reusable";

const { categorySales, categoryPercentage, categoryPerformanceDetails } =
  categoryAnalysisData;

// Prepare data for Pie Chart
const pieData = [
  {
    name: "Main Course",
    value: categorySales.mainCourse,
    percentage: categoryPercentage.mainCourse,
    itemsSold: 677,
  },
  {
    name: "Appetizer",
    value: categorySales.appetizer,
    percentage: categoryPercentage.appetizer,
    itemsSold: 284,
  },
  {
    name: "Dessert",
    value: categorySales.dessert,
    percentage: categoryPercentage.dessert,
    itemsSold: 156,
  },
  {
    name: "Beverage",
    value: categorySales.beverage,
    percentage: categoryPercentage.beverage,
    itemsSold: 892,
  },
];

const COLORS = {
  "Main Course": "#22c55e", // green-500
  Appetizer: "#3b82f6", // blue-500
  Dessert: "#f59e0b", // amber-500
  Beverage: "#a855f7", // purple-500
};

const RADIAN = Math.PI / 180;
type LabelProps = {
  cx: number;
  cy: number;
  midAngle: number;
  innerRadius: number;
  outerRadius: number;
  percent: number;
  index?: number;
  name?: string;
};

const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
}: LabelProps) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return percent > 0.05 ? (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
      className="text-sm font-medium"
    >
      {`${(percent * 100).toFixed(1)}%`}
    </text>
  ) : null;
};

export const CategoryPerfomance = () => {
  return (
    <div className="py-16 flex flex-col gap-6">
      <Heading
        title="Category Performance"
        subtitle="Sales performance by menu category"
      />
      {/* Top Section: Pie Chart + Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Sales by Category - Pie Chart */}
        <Card className="">
          <CardContent className="p-8">
            <h2 className="text-xl font-semibold mb-8 ">Sales by Category</h2>
            <ResponsiveContainer width="100%" height={380}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={renderCustomizedLabel}
                  outerRadius={140}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {pieData.map((entry) => (
                    <Cell
                      key={entry.name}
                      fill={COLORS[entry.name as keyof typeof COLORS]}
                    />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    border: "none",
                    borderRadius: "8px",
                  }}
                  labelStyle={{ color: "#e5e7eb" }}
                  formatter={(value: number) =>
                    `$${value.toLocaleString(undefined, {
                      minimumFractionDigits: 1,
                    })}`
                  }
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Category Summary */}
        <Card className="">
          <CardContent className="p-8">
            <h2 className="text-xl font-semibold mb-8 text-gray-900 dark:text-gray-100">
              Category Summary
            </h2>
            <div className="space-y-7">
              {pieData.map((item) => (
                <div
                  key={item.name}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center gap-4">
                    <div
                      className="w-4 h-4 rounded-full"
                      style={{
                        backgroundColor:
                          COLORS[item.name as keyof typeof COLORS],
                      }}
                    />
                    <div>
                      <p className="font-medium text-gray-900 dark:text-gray-100">
                        {item.name}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {item.itemsSold} items sold
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900 dark:text-gray-100">
                      $
                      {item.value.toLocaleString(undefined, {
                        minimumFractionDigits: 1,
                      })}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {item.percentage.toFixed(1)}%
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Section: Category Performance Details Table */}
      <div>
        <Card className="b">
          <CardContent className="p-8">
            <h2 className="text-xl font-semibold mb-8 text-gray-900 dark:text-gray-100">
              Category Performance Details
            </h2>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-gray-200 dark:border-gray-800 hover:bg-transparent">
                    <TableHead className="text-gray-600 dark:text-gray-400">
                      Category
                    </TableHead>
                    <TableHead className="text-gray-600 dark:text-gray-400 text-right">
                      Qty Sold
                    </TableHead>
                    <TableHead className="text-gray-600 dark:text-gray-400 text-right">
                      Net Sales
                    </TableHead>
                    <TableHead className="text-gray-600 dark:text-gray-400 text-right">
                      Avg Price
                    </TableHead>
                    <TableHead className="text-gray-600 dark:text-gray-400 text-right">
                      Food Cost %
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {categoryPerformanceDetails.map((item) => {
                    let costColor = "";
                    if (item.category === "Main Course")
                      costColor = "text-yellow-600 dark:text-yellow-500";
                    else if (item.category === "Appetizer")
                      costColor = "text-cyan-600 dark:text-cyan-400";
                    else if (item.category === "Dessert")
                      costColor = "text-amber-600 dark:text-amber-400";
                    else if (item.category === "Beverage")
                      costColor = "text-purple-600 dark:text-purple-400";

                    return (
                      <TableRow
                        key={item.category}
                        className="border-gray-200 dark:border-gray-800 hover:bg-gray-100 dark:hover:bg-gray-800/30"
                      >
                        <TableCell className="font-medium text-gray-900 dark:text-gray-100">
                          {item.category}
                        </TableCell>
                        <TableCell className="text-right text-gray-600 dark:text-gray-300">
                          {item.qtySold.toLocaleString()}
                        </TableCell>
                        <TableCell className="text-right font-semibold text-gray-900 dark:text-gray-100">
                          $
                          {item.netSales.toLocaleString(undefined, {
                            minimumFractionDigits: 1,
                          })}
                        </TableCell>
                        <TableCell className="text-right text-gray-600 dark:text-gray-300">
                          ${item.avgPrice.toFixed(2)}
                        </TableCell>
                        <TableCell
                          className={`text-right font-medium ${costColor}`}
                        >
                          {item.foodCostPercentage.toFixed(1)}%
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
    </div>
  );
};
