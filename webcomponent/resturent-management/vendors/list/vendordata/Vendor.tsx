"use client";
import { ArrowLeft, Download, Upload } from "lucide-react";
import { Vendor } from "../Data";
import { ButtonIcon, Heading } from "@/webcomponent/reusable";
import { Card } from "@/components/ui/card";
import { format } from "date-fns/format";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useState } from "react";
import { ImportBatches } from "@/webcomponent/resturent-management/pos-integration";
import { CsvUploaderDialog } from "./ImportCsv";

export const VendorData = ({ vendorData }: { vendorData: Vendor }) => {
  const selectedItem = vendorData.orderGuideItems[0];
  const [orderGuide, setOrderGuide] = useState(false);
  const chartData = selectedItem.priceHistory.history.map((entry) => ({
    date: format(new Date(entry.date), "MMM dd"),
    price: entry.price,
  }));
  return (
    <div className="py-16 flex flex-col gap-6">
      <div className="flex md:flex-row flex-col md:justify-between gap-3.5">
        <div className="flex items-center gap-2">
          <ArrowLeft className="h-5 w-5 dark:text-slate-500" />
          <Heading title={vendorData.name} subtitle={vendorData.contactInfo} />
        </div>
        <div className="flex  md:items-center md:flex-row flex-col gap-2">
          <ButtonIcon icon={<Download className="h-4 w-4" />} varient="primary">
            Download CSV
          </ButtonIcon>
          <ButtonIcon
            varient="primary"
            icon={<Upload className="h-4 w-4" />}
            onClick={() => setOrderGuide(!orderGuide)}
          >
            Import Order Guide
          </ButtonIcon>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="dark:bg-slate-900 dark:border-slate-800 p-6">
          <p className="dark:text-slate-400 text-sm">Total SKUs</p>
          <p className="dark:text-white text-3xl font-bold mt-2">
            {vendorData.sku}
          </p>
        </Card>
        <Card className="dark:bg-slate-900 dark:border-slate-800 p-6">
          <p className="dark:text-slate-400 text-sm">Linked Ingredients</p>
          <p className="dark:text-white text-3xl font-bold mt-2">
            {vendorData.orderGuideItems.length}
          </p>
        </Card>
        <Card className="dark:bg-slate-900 dark:border-slate-800 p-6">
          <p className="dark:text-slate-400 text-sm">Last Import</p>
          <p className="dark:text-white text-3xl font-bold mt-2">
            {format(new Date(vendorData.lastOrderGuideImport), "MMM dd, yyyy")}
          </p>
        </Card>
      </div>
      <Tabs defaultValue="order-guide" className="w-full">
        <TabsList className="dark:bg-slate-900 grid w-full max-w-md grid-cols-2">
          <TabsTrigger
            value="order-guide"
            className="dark:data-[state=active]:bg-slate-800"
          >
            Order Guide Items
          </TabsTrigger>
          <TabsTrigger
            value="price-history"
            className="dark:data-[state=active]:bg-slate-800"
          >
            Price History
          </TabsTrigger>
        </TabsList>

        {/* Order Guide Items Tab */}
        <TabsContent value="order-guide" className="mt-6">
          <div className="dark:bg-slate-900 dark:border-slate-800 rounded-lg border">
            <Table>
              <TableHeader>
                <TableRow className="dark:border-slate-800 dark:hover:bg-transparent border-b hover:bg-transparent">
                  <TableHead className="dark:text-slate-300">SKU</TableHead>
                  <TableHead className="dark:text-slate-300">
                    Product Name
                  </TableHead>
                  <TableHead className="dark:text-slate-300">
                    Pack Size
                  </TableHead>
                  <TableHead className="dark:text-slate-300">
                    Price/Pack
                  </TableHead>
                  <TableHead className="dark:text-slate-300">
                    Cost/Unit
                  </TableHead>
                  <TableHead className="dark:text-slate-300">
                    Linked Ingredient
                  </TableHead>
                  <TableHead className="dark:text-slate-300">
                    Last Updated
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {vendorData.orderGuideItems.map((item) => (
                  <TableRow
                    key={item.sku}
                    className="dark:border-slate-800 dark:hover:bg-slate-800/50 border-b hover:bg-slate-800/50"
                  >
                    <TableCell className="dark:text-slate-400 font-mono">
                      {item.sku}
                    </TableCell>
                    <TableCell className="dark:text-white font-medium">
                      {item.priceHistory.productName}
                    </TableCell>
                    <TableCell className="dark:text-slate-300">
                      {item.packSize} {item.unitType}
                    </TableCell>
                    <TableCell className="dark:text-slate-300">
                      ${item.pricePack.toFixed(2)}
                    </TableCell>
                    <TableCell className="dark:text-slate-300">
                      ${item.costPerUnit.toFixed(2)}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="secondary"
                        className="dark:bg-emerald-900/50 dark:text-emerald-300 dark:border-emerald-800"
                      >
                        {item.linkedIngredient}
                      </Badge>
                    </TableCell>
                    <TableCell className="dark:text-slate-400">
                      {format(new Date(item.lastUpdated), "yyyy-MM-dd")}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>

        {/* Price History Tab */}
        <TabsContent value="price-history" className="mt-6 space-y-6">
          <Card className="dark:bg-slate-900 dark:border-slate-800 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="dark:text-white text-lg font-semibold">
                Price History: {selectedItem.priceHistory.productName}
              </h3>
            </div>
            <div className="h-96 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                  <XAxis
                    dataKey="date"
                    stroke="#94a3b8"
                    style={{ fontSize: "12px" }}
                  />
                  <YAxis
                    stroke="#94a3b8"
                    style={{ fontSize: "12px" }}
                    domain={["dataMin - 10", "dataMax + 10"]}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1e293b",
                      border: "1px solid #334155",
                      borderRadius: "8px",
                    }}
                    labelStyle={{ color: "#e2e8f0" }}
                  />
                  <Line
                    type="monotone"
                    dataKey="price"
                    stroke="#10b981"
                    strokeWidth={3}
                    dot={{ fill: "#10b981", r: 6 }}
                    activeDot={{ r: 8 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </TabsContent>
      </Tabs>

      {orderGuide && (
        <CsvUploaderDialog open={orderGuide} onOpenChange={setOrderGuide} />
      )}
    </div>
  );
};
