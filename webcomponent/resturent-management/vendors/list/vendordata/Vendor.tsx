"use client";
import {
  ArrowLeft,
  Download,
  Plus,
  ShoppingCart,
  Trash2,
  Upload,
  XIcon,
} from "lucide-react";
import { orderGuideItems, Vendor } from "../Data";
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
import { CsvUploaderDialog } from "./ImportCsv";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ImportGuide } from "./ImportGuide";
import { CurrentOrder } from "./CurrentOrder";
import { motion, AnimatePresence } from "framer-motion"; // ← Added

interface CurrentOrderItem {
  name: string;
  sku: string;
  quantity: number;
  price: number;
}

export const VendorData = ({ vendorData }: { vendorData: Vendor }) => {
  const [orderGuideItems, setOrderGuideItems] = useState(
    vendorData.orderGuideItems
  );

  const [selectedSku, setSelectedSku] = useState(
    vendorData.orderGuideItems[0]?.sku
  );
  const [orderGuide, setOrderGuide] = useState(false);
  const selectedItem = orderGuideItems.find((item) => item.sku === selectedSku);

  const [collapse, setCollapse] = useState(false);
  const [weeklyBudget, setWeeklyBudget] = useState(1000);
  const [currentOrder, setCurrentOrder] = useState<CurrentOrderItem[]>([]);

  const handleAddItems = (items: orderGuideItems[]) => {
    setOrderGuideItems((prev) => {
      const existing = new Set(prev.map((i) => i.sku));
      const filtered = items.filter((i) => !existing.has(i.sku));
      return [...prev, ...filtered];
    });
  };
  const chartData = selectedItem
    ? selectedItem.priceHistory.history.map((entry) => ({
        date: format(new Date(entry.date), "MMM dd"),
        price: entry.price,
      }))
    : [];
  const [importGuideOpen, setImportGuideOpen] = useState(false);
  const handleAddToOrder = (item: orderGuideItems) => {
    setCurrentOrder((prev) => {
      const existing = prev.find((i) => i.sku === item.sku);

      if (existing) {
        return prev.map((i) =>
          i.sku === item.sku ? { ...i, quantity: i.quantity + 1 } : i
        );
      }

      return [
        ...prev,
        {
          sku: item.sku,
          name: item.priceHistory.productName,
          quantity: 1,
          price: item.pricePack,
        },
      ];
    });
  };

  return (
    <div className="py-16 flex flex-col gap-6">
      <div className="flex md:flex-row flex-col md:justify-between gap-3.5">
        <div className="flex items-center gap-2">
          <ArrowLeft className="h-5 w-5 dark:text-slate-500" />
          <Heading title={vendorData.name} subtitle={vendorData.contactInfo} />
        </div>
        <div className="flex  md:items-center md:flex-row flex-col gap-2">
          <div className="relative">
            {currentOrder.length > 0 && (
              <span className="absolute -left-3 -top-1 h-5 min-w-5 rounded-full bg-red-600 text-white text-xs flex items-center justify-center px-1">
                {currentOrder.length}
              </span>
            )}
            <ButtonIcon
              icon={<ShoppingCart className="h-4 w-4" />}
              varient="primary"
              className="bg-blue-600 text-white hover:bg-blue-700"
              onClick={() => setCollapse(!collapse)}
            >
              Current Order
            </ButtonIcon>
          </div>

          <ButtonIcon
            icon={<Download className="h-4 w-4" />}
            varient="primary"
            className="bg-green-600 text-white hover:bg-green-700"
          >
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
        <Card className="dark:bg-[#1D293D] dark:border-[#314158] p-6">
          <p className="dark:text-slate-400 text-sm">Total SKUs</p>
          <p className="dark:text-white text-3xl font-bold mt-2">
            {vendorData.sku}
          </p>
        </Card>
        <Card className="dark:bg-[#1D293D] dark:border-[#314158] p-6">
          <p className="dark:text-slate-400 text-sm">Linked Ingredients</p>
          <p className="dark:text-white text-3xl font-bold mt-2">
            {orderGuideItems.length}
          </p>
        </Card>
        <Card className="dark:bg-[#1D293D] dark:border-[#314158] p-6">
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
          <div
            className={`${
              collapse ? "flex items-baseline gap-3.5 w-full" : ""
            }`}
          >
            <div className="dark:bg-[#1D293D] dark:border-[#314158] rounded-lg border">
              <div className="p-2.5 flex md:flex-row flex-col md:justify-between gap-3.5 md:items-center border-b ">
                <span>{orderGuideItems.length} products in guide</span>

                <Dialog
                  open={importGuideOpen}
                  onOpenChange={setImportGuideOpen}
                >
                  <DialogTrigger asChild>
                    <ButtonIcon
                      icon={<Plus className="h-4 w-4" />}
                      varient="primary"
                      className="bg-green-600 text-white hover:bg-green-700"
                    >
                      Import New Guide
                    </ButtonIcon>
                  </DialogTrigger>

                  <DialogContent className="sm:max-w-3xl md:max-w-4xl lg:max-w-5xl p-0">
                    <DialogHeader className="p-0 ">
                      <div className="p-2.5 flex flex-col gap-2">
                        <h4 className="font-medium text-xl md:text-2xl">
                          Add Product to Order Guide
                        </h4>
                        <p className="text-sm dark:text-slate-400">
                          Select from ingredient database
                        </p>
                      </div>
                    </DialogHeader>

                    <ImportGuide
                      open={importGuideOpen}
                      onClose={setImportGuideOpen}
                      onAddItems={handleAddItems}
                      existingSkus={new Set(orderGuideItems.map((i) => i.sku))}
                    />
                    <DialogFooter className="border-t dark:border-gray-300">
                      <ButtonIcon
                        className="w-full rounded-none"
                        icon={<XIcon className="h-4 w-4" />}
                        varient="secondaryTwo"
                      >
                        Cancel
                      </ButtonIcon>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>

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
                    <TableHead className="dark:text-slate-300">
                      Actions
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {orderGuideItems.map((item) => (
                    <TableRow
                      key={item.sku}
                      onClick={() => setSelectedSku(item.sku)}
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
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <ButtonIcon
                            icon={<Plus className="h-4 w-4" />}
                            varient="primary"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleAddToOrder(item);
                            }}
                          >
                            Add To Order
                          </ButtonIcon>
                          <ButtonIcon
                            icon={<Trash2 className="h-4 w-4" />}
                            varient="primary"
                            className="bg-red-600 text-white hover:bg-red-700"
                          >
                            Remove
                          </ButtonIcon>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {/* Animated CurrentOrder Sidebar */}

            {collapse && (
              <div className="w-full overflow-hidden">
                <AnimatePresence>
                  {collapse && (
                    <motion.div
                      initial={{ x: "100%", opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      exit={{ x: "100%", opacity: 0 }}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 30,
                      }}
                      className="shrink-0 " // ensures it doesn't stretch
                    >
                      <CurrentOrder
                        data={currentOrder}
                        collapse={collapse}
                        onUpdateOrder={setCurrentOrder}
                        onPlaceOrder={() => console.log(currentOrder)}
                        onCollapse={() => setCollapse(false)}
                        weeklyBudget={weeklyBudget}
                        setWeeklyBudget={setWeeklyBudget}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}
          </div>
        </TabsContent>

        {/* Price History Tab */}
        <TabsContent value="price-history" className="mt-6 space-y-6">
          <Card className="dark:bg-slate-900 dark:border-slate-800 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="dark:text-white text-lg font-semibold">
                Price History: {selectedItem?.priceHistory.productName}
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
