import { ArrowLeft } from "lucide-react";
import { ImportBatch } from "../Data";
import {  Heading } from "@/webcomponent/reusable";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export const BatchDetails = ({ batch }: { batch: ImportBatch }) => {

    return (
        <div className="py-16 flex flex-col gap-6">
           <div className="flex items-center gap-2.5">
            <Button variant={"ghost"}>
            <ArrowLeft className="w-4 h-4 cursor-pointer" />
            </Button>
            <Heading title={`Batch #${batch.batchId} Details`} subtitle={`${batch.dateRange} . Downtown Location`} />

           </div>
           <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardContent className="">
            <div className="text-sm font-medium text-muted-foreground">Total Sales</div>
            <div className="text-2xl font-bold">
              ${batch.nestedView.salseData.totalSales.toLocaleString()}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="">
            <div className="text-sm font-medium text-muted-foreground">Total Items</div>
            <div className="text-2xl font-bold">{batch.nestedView.salseData.totalItems.toLocaleString()}</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="">
            <div className="text-sm font-medium text-muted-foreground">Total Discounts</div>
            <div className="text-2xl font-bold text-orange-500">
              ${batch.nestedView.salseData.totalDiscounts.toLocaleString()}
            </div>
          </CardContent>
        </Card>
        </div>

        <Card>
          <CardContent className="">
            <div className="text-sm font-medium text-muted-foreground">Transactions</div>
            <div className="text-2xl font-bold">{batch.nestedView.salseData.transactions.toLocaleString()}</div>
          </CardContent>
        </Card>
        <Tabs defaultValue="items" className="w-full">
        <TabsList className="flex gap-4 border-b">
          <TabsTrigger value="items" className="w-full">Items</TabsTrigger>
          <TabsTrigger value="modifiers">Modifiers</TabsTrigger>
          <TabsTrigger value="labor">Labor</TabsTrigger>
        </TabsList>

        {/* Items Tab */}
        <TabsContent value="items" className="w-full" >
          <Card className="w-full">
            <CardContent className="p-0">
              <Table className="w-full">
                <TableHeader>
                  <TableRow>
                    <TableHead>Item Name</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Day Part</TableHead>
                    <TableHead className="text-right">Qty Sold</TableHead>
                    <TableHead className="text-right">Gross Sales</TableHead>
                    <TableHead className="text-right">Net Sales</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {batch.nestedView.items.map((item) => (
                    <TableRow key={item.name}>
                      <TableCell className="font-medium">{item.name}</TableCell>
                      <TableCell>{item.category}</TableCell>
                      <TableCell>{item.dayPart}</TableCell>
                      <TableCell className="text-right">{item.qtySold}</TableCell>
                      <TableCell className="text-right">
                        ${item.grossSales.toLocaleString()}
                      </TableCell>
                      <TableCell className="text-right">
                        ${item.netSales.toLocaleString()}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Modifiers Tab */}
        <TabsContent value="modifiers">
          <Card className="w-full">
            <CardContent className="p-0" >
              <Table className="w-full" >
                <TableHeader className="w-full">
                  <TableRow>
                    <TableHead>Modifier Name</TableHead>
                    <TableHead>Linked Item</TableHead>
                    <TableHead className="text-right">Count</TableHead>
                    <TableHead className="text-right">Extra Revenue</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {batch.nestedView.modifiers.map((mod) => (
                    <TableRow key={mod.name}>
                      <TableCell className="font-medium">{mod.name}</TableCell>
                      <TableCell>{mod.linkedItem}</TableCell>
                      <TableCell className="text-right">{mod.count}</TableCell>
                      <TableCell className="text-right">
                        ${mod.extraRevenue.toFixed(2)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Labor Tab */}
        <TabsContent value="labor">
            <Card className="w-full">
<Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead className="text-right">Labor Hours</TableHead>
                    <TableHead className="text-right">Labor Cost</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {batch.nestedView.labourData.map((day) => (
                    <TableRow key={day.date}>
                      <TableCell className="font-medium">{day.date}</TableCell>
                      <TableCell className="text-right">{day.totalHours}</TableCell>
                      <TableCell className="text-right">
                        ${day.totalCost.toLocaleString()}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
        </TabsContent>
      </Tabs>
        </div>
    );
};