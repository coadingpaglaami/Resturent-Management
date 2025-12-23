import { Heading } from "@/webcomponent/reusable";
import { menuEngineeringMatrixData } from "./Data";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

export const MenuEngineering = () => {
  const getQuadrantColor = (quadrant: string) => {
    switch (quadrant) {
      case "Star":
        return "bg-emerald-500/20 text-emerald-400 border-emerald-500/50";
      case "Plowhorse":
        return "bg-blue-500/20 text-blue-400 border-blue-500/50";
      case "Puzzle":
        return "bg-orange-500/20 text-orange-400 border-orange-500/50";
      case "Worst":
        return "bg-red-500/20 text-red-400 border-red-500/50";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const getPopularityBadge = (pop: string) => {
    switch (pop) {
      case "High":
        return "bg-emerald-500/20 text-emerald-400";
      case "Medium":
        return "bg-orange-500/20 text-orange-400";
      case "Low":
        return "bg-red-500/20 text-red-400";
      default:
        return "bg-muted";
    }
  };

  const getProfitabilityBadge = (prof: string) => {
    switch (prof) {
      case "High":
        return "bg-emerald-500/20 text-emerald-400";
      case "Medium":
        return "bg-orange-500/20 text-orange-400";
      case "Low":
        return "bg-red-500/20 text-red-400";
      default:
        return "bg-muted";
    }
  };
  return (
    <div className="py-16 flex flex-col gap-8">
      <Heading
        title="Menu Engineering"
        subtitle="Analyze menu items by popularity and profitability"
      />

      {/* Quadrant Legend Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-emerald-500/10 border-emerald-500/30">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/50">
                Star
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground mt-3">
              High popularity, high profitability. Keep and promote.
            </p>
          </CardContent>
        </Card>

        <Card className="bg-blue-500/10 border-blue-500/30">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/50">
                Average
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground mt-3">
              High popularity, low profitability. Increase prices or reduce
              costs.
            </p>
          </CardContent>
        </Card>

        <Card className="bg-orange-500/10 border-orange-500/30">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <Badge className="bg-orange-500/20 text-orange-400 border-orange-500/50">
                Puzzle
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground mt-3">
              Low popularity, high profitability. Market better or reposition.
            </p>
          </CardContent>
        </Card>

        <Card className="bg-red-500/10 border-red-500/30">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <Badge className="bg-red-500/20 text-red-400 border-red-500/50">
                Worst
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground mt-3">
              Low popularity, low profitability. Consider removing from menu.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Menu Engineering Matrix Table */}
      <Card className="">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Menu Item</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead className="text-right">Qty Sold</TableHead>
                  <TableHead className="text-right">Net Sales</TableHead>
                  <TableHead className="text-right">Cost/Portion</TableHead>
                  <TableHead className="text-right">Food Cost %</TableHead>
                  <TableHead className="text-right">Profit/Portion</TableHead>
                  <TableHead className="text-right">Total Profit</TableHead>
                  <TableHead className="text-center">Popularity</TableHead>
                  <TableHead className="text-center">Profitability</TableHead>
                  <TableHead className="text-center">Quadrant</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {menuEngineeringMatrixData.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={11}
                      className="text-center py-8 text-muted-foreground"
                    >
                      No menu items data available.
                    </TableCell>
                  </TableRow>
                ) : (
                  menuEngineeringMatrixData.map((item) => (
                    <TableRow key={item.menuItem}>
                      <TableCell className="font-medium">
                        {item.menuItem}
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary">{item.category}</Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        {item.qtySold}
                      </TableCell>
                      <TableCell className="text-right">
                        ${item.netSales.toFixed(2)}
                      </TableCell>
                      <TableCell className="text-right">
                        ${item.costPerPortion.toFixed(2)}
                      </TableCell>
                      <TableCell className="text-right text-orange-400">
                        {item.foodCostPercentage.toFixed(1)}%
                      </TableCell>
                      <TableCell className="text-right">
                        ${item.profitPerPortion.toFixed(2)}
                      </TableCell>
                      <TableCell className="text-right font-medium">
                        ${item.totalProfit.toFixed(2)}
                      </TableCell>
                      <TableCell className="text-center">
                        <Badge className={getPopularityBadge(item.popularity)}>
                          {item.popularity}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-center">
                        <Badge
                          className={getProfitabilityBadge(item.profitability)}
                        >
                          {item.profitability}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-center">
                        <Badge className={getQuadrantColor(item.quadrant)}>
                          {item.quadrant}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
