import { Heading } from "@/webcomponent/reusable";
import { discountVoidsData } from "./Data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { AlertTriangle, XCircle, Gift } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export const DiscountsVoids = () => {
  const {
    totalDiscounts,
    totalVoids,
    totalComps,
    totalImpact,
    itemsWithDiscountsVoids,
  } = discountVoidsData;

  const formatCurrency = (value: number) => {
    const abs = Math.abs(value).toFixed(2);
    return value < 0 ? `-$${abs}` : `$${abs}`;
  };

  return (
    <div className="py-16 flex flex-col gap-8">
      <Heading
        title="Discounts & Voids"
        subtitle="Track discounts, voids, and comps"
      />

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Discounts */}
        <Card className="bg-muted/50 border-0">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-yellow-500" />
              Total Discounts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-yellow-500">
              ${totalDiscounts.toFixed(2)}
            </div>
          </CardContent>
        </Card>

        {/* Total Voids */}
        <Card className="bg-muted/50 border-0">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <XCircle className="h-5 w-5 text-red-500" />
              Total Voids
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-red-500">{totalVoids}</div>
          </CardContent>
        </Card>

        {/* Total Comps */}
        <Card className="bg-muted/50 border-0">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <Gift className="h-5 w-5 text-green-500" />
              Total Comps
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-500">
              {totalComps}
            </div>
          </CardContent>
        </Card>

        {/* Total Impact */}
        <Card className="bg-muted/50 border-0">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Impact
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-red-500">
              {formatCurrency(totalImpact)}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Items Table */}
      <Card className="bg-muted/50 border-0">
        <CardHeader>
          <CardTitle>Items with Discounts/Voids</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Item</TableHead>
                <TableHead className="text-right">Discount Amount</TableHead>
                <TableHead className="text-center">Void Count</TableHead>
                <TableHead className="text-center">Comp Count</TableHead>
                <TableHead className="text-right">Net Sales Impact</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {itemsWithDiscountsVoids.map((row) => (
                <TableRow key={row.item}>
                  <TableCell className="font-medium">{row.item}</TableCell>
                  <TableCell className="text-right text-yellow-500 font-medium">
                    ${row.discountAmount.toFixed(2)}
                  </TableCell>
                  <TableCell className="text-center">
                    <Badge
                      variant="secondary"
                      className="bg-red-500/10 text-red-500"
                    >
                      {row.voidCount}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-center">
                    <Badge
                      variant="secondary"
                      className="bg-green-500/10 text-green-500"
                    >
                      {row.compCount}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right text-red-500 font-medium">
                    {formatCurrency(row.netSalesImpact)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};
