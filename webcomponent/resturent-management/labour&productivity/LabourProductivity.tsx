"use client";
import { Heading } from "@/webcomponent/reusable";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Clock, DollarSign, TrendingUp } from "lucide-react";
import { laborAnalysisData } from "./Data";

const {
  totalLaborHours,
  totalNetSales,
  avgSalesPerHour,
  salesVsLaborChartData,
  dailyLaborProductivity,
} = laborAnalysisData;

// Prepare chart data by combining dates with values
const chartData = salesVsLaborChartData.dates.map((date, index) => ({
  date,
  laborHours: salesVsLaborChartData.laborHours[index],
  netSales: salesVsLaborChartData.netSales[index],
}));

export const LabourProductivity = () => {
  return (
    <div className="py-16 flex flex-col gap-6">
      <Heading
        title="Labor & Productivity"
        subtitle="Track labor efficiency and sales productivity"
      />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="dark:bg-gray-900/70 dark:border-gray-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm dark:text-gray-400">Total Labor Hours</p>
                <p className="text-3xl font-bold mt-2">{totalLaborHours}</p>
              </div>
              <Clock className="h-10 w-10 dark:text-blue-500 opacity-80" />
            </div>
          </CardContent>
        </Card>

        <Card className="dark:bg-gray-900/70 dark:border-gray-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm dark:text-gray-400">Total Net Sales</p>
                <p className="text-3xl font-bold mt-2">
                  ${totalNetSales.toLocaleString()}
                </p>
              </div>
              <DollarSign className="h-10 w-10 dark:text-green-500 opacity-80" />
            </div>
          </CardContent>
        </Card>

        <Card className="dark:bg-gray-900/70 dark:border-gray-800 ring-2 dark:ring-emerald-500/30">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm dark:text-gray-400">Avg Sales per Hour</p>
                <p className="text-3xl font-bold mt-2 dark:text-emerald-400">
                  ${avgSalesPerHour.toFixed(2)}
                </p>
              </div>
              <TrendingUp className="h-10 w-10 dark:text-emerald-400 opacity-90" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Sales vs Labor Hours Over Time - Line Chart */}
      <div>
        <Card className="dark:bg-gray-900/70 dark:border-gray-800">
          <CardContent className="p-8">
            <h2 className="text-xl font-semibold mb-8">
              Sales vs Labor Hours Over Time
            </h2>
            <ResponsiveContainer width="100%" height={400}>
              <LineChart
                data={chartData}
                margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis
                  dataKey="date"
                  stroke="#9ca3af"
                  tick={{ fill: "#9ca3af" }}
                  tickFormatter={(value) => {
                    const date = new Date(value);
                    return `${date.getMonth() + 1}/${date.getDate()}`;
                  }}
                />
                <YAxis
                  yAxisId="left"
                  stroke="#f59e0b"
                  tick={{ fill: "#fdba74" }}
                  label={{
                    value: "Labor Hours",
                    angle: -90,
                    position: "insideLeft",
                    fill: "#fdba74",
                  }}
                />
                <YAxis
                  yAxisId="right"
                  orientation="right"
                  stroke="#22d3ee"
                  tick={{ fill: "#67e8f9" }}
                  label={{
                    value: "Net Sales ($)",
                    angle: 90,
                    position: "insideRight",
                    fill: "#67e8f9",
                  }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1f2937",
                    border: "none",
                    borderRadius: "8px",
                  }}
                  labelStyle={{ color: "#e5e7eb" }}
                  formatter={(value: number) => value.toLocaleString()}
                />
                <Legend
                  wrapperStyle={{ paddingTop: "20px" }}
                  iconType="line"
                  formatter={(value) => (
                    <span className="dark:text-gray-300">
                      {value === "laborHours" ? "Labor Hours" : "Net Sales ($)"}
                    </span>
                  )}
                />
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="laborHours"
                  stroke="#f59e0b"
                  strokeWidth={3}
                  dot={{ fill: "#f59e0b", r: 6 }}
                  activeDot={{ r: 8 }}
                  name="laborHours"
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="netSales"
                  stroke="#22d3ee"
                  strokeWidth={3}
                  dot={{ fill: "#22d3ee", r: 6 }}
                  activeDot={{ r: 8 }}
                  name="netSales"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Daily Labor Productivity Table */}
      <div>
        <Card className="dark:bg-gray-900/70 dark:border-gray-800">
          <CardContent className="p-8">
            <h2 className="text-xl font-semibold mb-8">
              Daily Labor Productivity
            </h2>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="dark:border-gray-800 hover:bg-transparent">
                    <TableHead className="dark:text-gray-400">Date</TableHead>
                    <TableHead className="dark:text-gray-400 text-right">
                      Labor Hours
                    </TableHead>
                    <TableHead className="dark:text-gray-400 text-right">
                      Net Sales
                    </TableHead>
                    <TableHead className="dark:text-gray-400 text-right">
                      Sales per Hour
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {dailyLaborProductivity.map((item) => (
                    <TableRow
                      key={item.date}
                      className="dark:border-gray-800 dark:hover:bg-gray-800/30"
                    >
                      <TableCell className="font-medium dark:text-gray-100">
                        {new Date(item.date).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </TableCell>
                      <TableCell className="text-right dark:text-gray-300">
                        {item.laborHours}
                      </TableCell>
                      <TableCell className="text-right font-medium dark:text-gray-100">
                        ${item.netSales.toLocaleString()}
                      </TableCell>
                      <TableCell className="text-right font-medium dark:text-emerald-400">
                        ${item.salesPerHour.toFixed(2)}
                      </TableCell>
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
