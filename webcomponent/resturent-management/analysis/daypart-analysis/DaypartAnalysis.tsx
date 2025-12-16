"use client";
import { Heading } from "@/webcomponent/reusable";
import { daypartAnalysisData } from "./Data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { DollarSign, ShoppingCart } from "lucide-react";

export const DaypartAnalysis = () => {
  const {
    daypartSales,
    topLunchItems,
    topDinnerItems,
    topBreakfastItems,
    chartData,
  } = daypartAnalysisData;

  // Prepare data for Recharts (combine daypart name with sales & quantity)
  const chartPreparedData = daypartSales.map((item, index) => ({
    name: item.daypart,
    sales: chartData.salesData[index],
    quantity: chartData.quantityData[index],
  }));

  const renderTopItemsSection = (
    title: string,
    items: typeof topLunchItems
  ) => (
    <Card className="bg-muted/50 border-0">
      <CardHeader>
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {items.map((item) => (
          <div
            key={item.itemName}
            className="flex justify-between items-center"
          >
            <span className="text-sm font-medium text-muted-foreground">
              {item.itemName}
            </span>
            <span className="text-lg font-bold text-emerald-400">
              ${item.sales.toLocaleString()}
            </span>
          </div>
        ))}
      </CardContent>
    </Card>
  );

  return (
    <div className="py-16 flex flex-col gap-8">
      <Heading
        title="Daypart Analysis"
        subtitle="Sales performance by time of day"
      />

      {/* Summary Cards - Breakfast, Lunch, Dinner, Late Night */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {daypartSales.map((daypart) => (
          <Card key={daypart.daypart} className="bg-muted/50 border-0">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-medium">
                {daypart.daypart}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-baseline gap-2">
                <DollarSign className="h-8 w-8 text-primary opacity-80" />
                <span className="text-3xl font-bold">
                  ${daypart.sales.toLocaleString()}
                </span>
              </div>
              <p className="text-sm text-muted-foreground mt-2 flex items-center gap-1">
                <ShoppingCart className="h-4 w-4" />
                {daypart.itemsSold} items sold
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Sales by Daypart Chart */}
      <Card className="bg-muted/50 border-0">
        <CardHeader>
          <CardTitle>Sales by Daypart</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={320}>
            <BarChart data={chartPreparedData} barGap={12} barCategoryGap={30}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis
                dataKey="name"
                tick={{ fill: "#9CA3AF" }}
                axisLine={{ stroke: "#374151" }}
              />
              <YAxis
                tick={{ fill: "#9CA3AF" }}
                axisLine={{ stroke: "#374151" }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1F2937",
                  border: "none",
                  borderRadius: "8px",
                  padding: "10px",
                }}
                labelStyle={{ color: "#F3F4F6", fontWeight: "bold" }}
                itemStyle={{ color: "#F3F4F6" }}
                formatter={(value: number) =>
                  value >= 1000 ? `$${value.toLocaleString()}` : value
                }
              />
              <Legend wrapperStyle={{ paddingTop: "20px" }} iconType="rect" />
              <Bar
                dataKey="quantity"
                fill="#60A5FA"
                name="Quantity"
                radius={[4, 4, 0, 0]}
              />
              <Bar
                dataKey="sales"
                fill="#34D399"
                name="Sales ($)"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Top Items Sections */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {renderTopItemsSection("Top Lunch Items", topLunchItems)}
        {renderTopItemsSection("Top Dinner Items", topDinnerItems)}
        {renderTopItemsSection("Top Breakfast Items", topBreakfastItems)}
      </div>
    </div>
  );
};
