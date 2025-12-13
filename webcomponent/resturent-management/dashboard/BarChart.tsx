

export interface TopSellingMenuItemsProps {
  itemName: string;
  money: number;
}

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
export const TopSellingMenuItems = ({
  data,
}: {
  data: TopSellingMenuItemsProps[];
}) => {
  return (
    <Card className="w-full h-full p-4 dark:bg-[#1E2A37] box-shadow-card">
      <CardHeader>
        <CardTitle
          className="text-lg font-semibold"
          style={{ color: "#101828" }}
        >
          Top Selling Menu Items
        </CardTitle>
      </CardHeader>

      <CardContent className="h-full">
        <div className="h-full w-full ">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              layout="vertical" // <-- horizontal bars
              margin={{ left: 50, right: 20 }}
            >
              <CartesianGrid strokeDasharray="3 3" opacity={0.2} />

              {/* ITEM NAMES */}
              <YAxis
                dataKey="itemName"
                type="category"
                tick={{ fontSize: 12, fill: "#475467" }}
                width={120}
              />

              {/* MONEY VALUES */}
              <XAxis
                type="number"
                tick={{ fontSize: 12, fill: "#475467" }}
              />

              <Tooltip />

              {/* BAR */}
              <Bar
                dataKey="money"
                fill="#3B26D3"
                radius={[4, 4, 4, 4]}
                barSize={50}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};
