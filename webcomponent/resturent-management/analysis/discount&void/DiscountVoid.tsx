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
  const discountsCards = [
    {
      key: "discounts",
      label: "Total Discounts",
      value: `$${totalDiscounts.toFixed(2)}`,
      icon: AlertTriangle,
      iconClass: "text-yellow-500",
      valueClass: "text-3xl font-bold text-yellow-500",
    },
    {
      key: "voids",
      label: "Total Voids",
      value: totalVoids,
      icon: XCircle,
      iconClass: "text-red-500",
      valueClass: "text-3xl font-bold text-red-500",
    },
    {
      key: "comps",
      label: "Total Comps",
      value: totalComps,
      icon: Gift,
      iconClass: "text-green-500",
      valueClass: "text-3xl font-bold text-green-500",
    },
    {
      key: "impact",
      label: "Total Impact",
      value: formatCurrency(totalImpact),
      icon: null, // no icon
      valueClass: "text-3xl font-bold text-red-500",
    },
  ];

  return (
    <div className="py-16 flex flex-col gap-8">
      <Heading
        title="Discounts & Voids"
        subtitle="Track discounts, voids, and comps"
      />

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {discountsCards.map((card) => {
          const Icon = card.icon;
          return (
            <Card key={card.key} className="card">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                  {Icon && <Icon className={`h-5 w-5 ${card.iconClass}`} />}
                  {card.label}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className={card.valueClass}>{card.value}</div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Items Table */}
      <Card className="">
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
