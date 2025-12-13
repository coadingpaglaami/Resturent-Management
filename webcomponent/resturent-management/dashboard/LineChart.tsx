"use client";

import {
  LineChart as ReLineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { TrendingUp, Cog } from "lucide-react";

export interface LineChartProps {
  months: string;
  sales: number;
  cogs: number;
}

export const LineChart = ({ data }: { data: LineChartProps[] }) => {
  return (
    <Card className="w-full p-4 dark:bg-[#1E2A37] box-shadow-card h-full">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">
          Sales vs COGS Over Time
        </CardTitle>
      </CardHeader>

      {/* Make content stretch vertically */}
      <CardContent className="flex flex-col h-full">
        {/* CHART TAKES FULL AVAILABLE HEIGHT */}
        <div className="flex-1 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <ReLineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
              <XAxis dataKey="months" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />

              {/* SALES LINE */}
              <Line
                type="monotone"
                dataKey="sales"
                stroke="#10B981"
                strokeWidth={3}
                dot={{ r: 4 }}
              />

              {/* COGS LINE */}
              <Line
                type="monotone"
                dataKey="cogs"
                stroke="#F59E0B"
                strokeWidth={3}
                dot={{ r: 4 }}
              />
            </ReLineChart>
          </ResponsiveContainer>
        </div>

        {/* LEGEND BELOW CHART */}
        <div className="flex items-center gap-6 mt-4 w-full justify-center">
          <div className="flex items-center gap-2">
            <TrendingUp color="#10B981" size={18} />
            <span className="text-sm text-muted-foreground">Sales</span>
          </div>

          <div className="flex items-center gap-2">
            <Cog color="#F59E0B" size={18} />
            <span className="text-sm text-muted-foreground">COGS</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
