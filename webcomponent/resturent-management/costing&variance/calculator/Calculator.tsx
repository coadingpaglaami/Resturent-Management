"use client";

import{ useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calculator as CalculatorIcon, AlertCircle } from "lucide-react";

import { ButtonIcon, Heading } from "@/webcomponent/reusable";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";

interface Ingredient {
  name: string;
  category: string;
  expectedQty: number;
  actualQty: number;
  unitCost: number;
  unit: string; // Added for display
}

export const Calculator = () => {
  const [analysisName, setAnalysisName] = useState("");
  const [timePeriod, setTimePeriod] = useState("");
  const [threshold, setThreshold] = useState([5]);

  // All available ingredients
  const initialIngredients = useMemo<Ingredient[]>(
    () => [
      {
        name: "Ribeye Steak",
        category: "Meat",
        expectedQty: 50,
        actualQty: 42,
        unitCost: 15,
        unit: "lb",
      },
      {
        name: "Atlantic Salmon",
        category: "Seafood",
        expectedQty: 32,
        actualQty: 28,
        unitCost: 12,
        unit: "lb",
      },
      {
        name: "Roma Tomatoes",
        category: "Produce",
        expectedQty: 75,
        actualQty: 78,
        unitCost: 1.85,
        unit: "lb",
      },
      {
        name: "Fresh Basil",
        category: "Herbs",
        expectedQty: 20,
        actualQty: 18,
        unitCost: 2.25,
        unit: "bunch",
      },
      {
        name: "Organic Flour",
        category: "Dry Goods",
        expectedQty: 100,
        actualQty: 100,
        unitCost: 0.015,
        unit: "lb",
      },
    ],
    []
  );

  // State for selections
  const [selectedExpected, setSelectedExpected] = useState<string[]>([]);
  const [selectedActual, setSelectedActual] = useState<string[]>([]);
  const [calculated, setCalculated] = useState(false);

  // Toggle selections
  const toggleExpected = (name: string) => {
    setSelectedExpected((prev) =>
      prev.includes(name) ? prev.filter((n) => n !== name) : [...prev, name]
    );
  };

  const toggleActual = (name: string) => {
    setSelectedActual((prev) =>
      prev.includes(name) ? prev.filter((n) => n !== name) : [...prev, name]
    );
  };

  // Filter selected ingredients

  const expectedIngredients = initialIngredients.filter((ing) =>
    selectedExpected.includes(ing.name)
  );

  const actualIngredients = initialIngredients.filter((ing) =>
    selectedActual.includes(ing.name)
  );

  const hasSelections =
    expectedIngredients.length > 0 && actualIngredients.length > 0;

  // Results calculation
  const results = useMemo(() => {
    // Early return if no valid selections
    if (selectedExpected.length === 0 || selectedActual.length === 0) {
      return null;
    }

    const merged = initialIngredients
      .filter((ing) => selectedExpected.includes(ing.name)) // expected selected
      .map((exp) => {
        // Find matching actual usage, fallback to expected if not selected in actual
        const act =
          initialIngredients
            .filter((i) => selectedActual.includes(i.name))
            .find((a) => a.name === exp.name) || exp;

        const expectedCost = exp.expectedQty * exp.unitCost;
        const actualCost = act.actualQty * exp.unitCost;
        const varianceAmount = actualCost - expectedCost;
        const variancePercent =
          expectedCost !== 0 ? (varianceAmount / expectedCost) * 100 : 0;

        let status: "Over" | "Under" | "OK" = "OK";
        const absPercent = Math.abs(variancePercent);
        if (varianceAmount > 0 && absPercent >= threshold[0]) status = "Over";
        else if (varianceAmount < 0 && absPercent >= threshold[0])
          status = "Under";

        return {
          ...exp,
          actualQty: act.actualQty,
          expectedCost: expectedCost.toFixed(2),
          actualCost: actualCost.toFixed(2),
          varianceAmount: varianceAmount.toFixed(2),
          variancePercent: variancePercent.toFixed(1),
          status,
        };
      });

    const totalExpected = merged.reduce(
      (sum, i) => sum + parseFloat(i.expectedCost),
      0
    );
    const totalActual = merged.reduce(
      (sum, i) => sum + parseFloat(i.actualCost),
      0
    );
    const totalVariance = totalActual - totalExpected;
    const totalVariancePercent =
      totalExpected !== 0 ? (totalVariance / totalExpected) * 100 : 0;

    const isOverBudget = totalVariance > 0;

    return {
      merged,
      totalExpected: totalExpected.toFixed(2),
      totalActual: totalActual.toFixed(2),
      totalVariance: totalVariance.toFixed(2),
      totalVariancePercent: totalVariancePercent.toFixed(1),
      isOverBudget,
    };
  }, [selectedExpected, selectedActual, threshold, initialIngredients]);

  const handleCalculate = () => {
    if (hasSelections) setCalculated(true);
  };

  return (
    <div className="py-16 flex flex-col gap-8 ">
      <Heading
        title="Variance Calculator"
        subtitle="Usage Variance Analysis – Compare expected vs actual usage"
      />

      <p className="text-gray-400">
        The Variance Calculator helps you compare expected ingredient usage
        versus actual usage to identify variances and their cost impact on your
        operations.
      </p>

      {/* Selection Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Expected Selection */}
        <Card>
          <CardHeader>
            <CardTitle>Expected Usage Data</CardTitle>
            <CardDescription>
              Select ingredients for expected usage
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {initialIngredients.map((ing) => (
              <div key={ing.name} className="flex items-center space-x-2">
                <Checkbox
                  id={`exp-${ing.name}`}
                  checked={selectedExpected.includes(ing.name)}
                  onCheckedChange={() => toggleExpected(ing.name)}
                />
                <Label htmlFor={`exp-${ing.name}`}>
                  {ing.name} - {ing.expectedQty} {ing.unit}
                </Label>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Actual Selection */}
        <Card>
          <CardHeader>
            <CardTitle>Actual Usage Data</CardTitle>
            <CardDescription>
              Select ingredients for actual usage
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {initialIngredients.map((ing) => (
              <div key={ing.name} className="flex items-center space-x-2">
                <Checkbox
                  id={`act-${ing.name}`}
                  checked={selectedActual.includes(ing.name)}
                  onCheckedChange={() => toggleActual(ing.name)}
                />
                <Label htmlFor={`act-${ing.name}`}>
                  {ing.name} - {ing.actualQty} {ing.unit}
                </Label>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Controls */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <Label htmlFor="analysis-name">Analysis Name</Label>
          <Input
            id="analysis-name"
            placeholder="e.g., Week of Nov 18-24"
            value={analysisName}
            onChange={(e) => setAnalysisName(e.target.value)}
          />
        </div>

        <div>
          <Label htmlFor="time-period">Time Period</Label>
          <Input
            id="time-period"
            placeholder="e.g., Nov 18-24, 2025"
            value={timePeriod}
            onChange={(e) => setTimePeriod(e.target.value)}
          />
        </div>

        <div>
          <Label>High Variance Threshold (%)</Label>
          <div className="flex items-center gap-4 mt-2">
            <Slider
              value={threshold}
              onValueChange={setThreshold}
              min={1}
              max={20}
              step={1}
              className="flex-1"
            />
            <span className="w-12 text-right font-medium">{threshold[0]}%</span>
          </div>
        </div>
      </div>
      <div className="w-fit">
        <ButtonIcon
          onClick={handleCalculate}
          varient="primary"
          disabled={!hasSelections}
          icon={<CalculatorIcon className="h-5 w-5" />}
        >
          Calculate Variance
        </ButtonIcon>
      </div>

      {/* Animated Results Section */}
      <AnimatePresence>
        {calculated && results && (
          <motion.div
            initial={{ opacity: 0, y: 50, height: 0 }}
            animate={{ opacity: 1, y: 0, height: "auto" }}
            exit={{ opacity: 0, y: 50, height: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="space-y-8 overflow-hidden"
          >
            <Separator />

            {/* Alert Banner */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.3 }}
            >
              <Alert variant={results.isOverBudget ? "destructive" : "default"}>
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>
                  {results.isOverBudget
                    ? "Overall over budget – actual costs higher than expected"
                    : "Overall under budget – actual costs lower than expected"}
                </AlertTitle>
                <AlertDescription>
                  Review items flagged as &quot;Over&quot; for potential waste
                  or theft
                </AlertDescription>
              </Alert>
            </motion.div>

            {/* Summary Cards */}
            <motion.div
              className="grid grid-cols-2 md:grid-cols-4 gap-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, staggerChildren: 0.1 }}
            >
              {[
                { title: "Expected Cost", value: `$${results.totalExpected}` },
                { title: "Actual Cost", value: `$${results.totalActual}` },
                {
                  title: "Total Variance",
                  value: `$${results.totalVariance}`,
                  color: results.isOverBudget
                    ? "text-red-400"
                    : "text-emerald-400",
                },
                {
                  title: "Variance %",
                  value: `${results.totalVariancePercent}%`,
                  color: results.isOverBudget
                    ? "text-red-400"
                    : "text-emerald-400",
                },
              ].map((card, idx) => (
                <motion.div
                  key={idx}
                  variants={{
                    hidden: { y: 20, opacity: 0 },
                    show: { y: 0, opacity: 1 },
                  }}
                >
                  <Card
                    className={
                      card.color
                        ? `${
                            card.color.includes("red")
                              ? "dark:bg-red-950/50"
                              : "dark:bg-emerald-950/50"
                          }`
                        : ""
                    }
                  >
                    <CardHeader className="pb-2">
                      <CardDescription>{card.title}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className={`text-2xl font-bold ${card.color || ""}`}>
                        {card.value}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>

            {/* Detailed Table */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Detailed Variance Results</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Product</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Expected Qty</TableHead>
                        <TableHead>Actual Qty</TableHead>
                        <TableHead>Expected Cost</TableHead>
                        <TableHead>Actual Cost</TableHead>
                        <TableHead>Variance ($)</TableHead>
                        <TableHead>Variance (%)</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {results.merged.map((item) => (
                        <TableRow key={item.name}>
                          <TableCell className="font-medium">
                            {item.name}
                          </TableCell>
                          <TableCell>{item.category}</TableCell>
                          <TableCell>{item.expectedQty}</TableCell>
                          <TableCell>{item.actualQty}</TableCell>
                          <TableCell>${item.expectedCost}</TableCell>
                          <TableCell>${item.actualCost}</TableCell>
                          <TableCell
                            className={
                              parseFloat(item.varianceAmount) > 0
                                ? "text-red-400"
                                : "text-emerald-400"
                            }
                          >
                            ${item.varianceAmount}
                          </TableCell>
                          <TableCell
                            className={
                              parseFloat(item.varianceAmount) > 0
                                ? "text-red-400"
                                : "text-emerald-400"
                            }
                          >
                            {item.variancePercent}%
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                item.status === "Over"
                                  ? "destructive"
                                  : item.status === "Under"
                                  ? "secondary"
                                  : "default"
                              }
                            >
                              {item.status}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
