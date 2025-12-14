"use client";
import { InventoryCountData, View } from "../Data";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, ChevronUp, ArrowLeft, Plus, Minus } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Card, Heading } from "@/webcomponent/reusable";

interface InventoryCountsViewChildProps {
  inventory: InventoryCountData;
}

interface FinalTotals {
  expected: number;
  counted: number;
  variance: number;
  variancePercent: number;
}

interface StatsOverviewProps {
  finalTotals: FinalTotals;
}

export default function StatsOverview({ finalTotals }: StatsOverviewProps) {
  const stats = [
    {
      label: "Expected Sales",
      value: finalTotals.expected,
      format: "currency" as const,
    },
    {
      label: "Counted Sales",
      value: finalTotals.counted,
      format: "currency" as const,
    },
    {
      label: "Variance ($)",
      value: finalTotals.variance,
      format: "currency" as const,
    },
    {
      label: "Variance (%)",
      value: finalTotals.variancePercent,
      format: "percent" as const,
    },
  ];

  const formatValue = (value: number, format: "currency" | "percent") => {
    const isNegative = value < 0;
    const absValue = Math.abs(value);

    let display = "";
    if (format === "currency") {
      display = `$${absValue.toFixed(2)}`;
    } else if (format === "percent") {
      display = `${absValue.toFixed(1)}%`;
    }

    return { display, isNegative };
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 py-6">
      {stats.map((stat) => {
        const { display, isNegative } = formatValue(stat.value, stat.format);

        return (
          <div
            key={stat.label}
            className="rounded-xl bg-slate-900/70 backdrop-blur-md border border-slate-800 px-6 py-5"
          >
            <p className="text-sm font-medium text-slate-400">{stat.label}</p>
            <p
              className={`mt-2 text-2xl font-bold ${
                isNegative ? "text-red-400" : "text-white"
              }`}
            >
              {isNegative ? "-" : ""}
              {display}
            </p>
          </div>
        );
      })}
    </div>
  );
}

export const InventoryCountDataComponent = ({
  inventory,
}: InventoryCountsViewChildProps) => {
  // Use inventory.viewTable safely
  const [sections, setSections] = useState<InventoryCountData["viewTable"]>(
    inventory.viewTable || []
  );

  const allViews: View[] =
    inventory.viewTable?.flatMap((section) => section.view) ?? [];
  const totals = allViews.reduce(
    (acc, item) => {
      const unitPrice = Number(item.unitPrice);
      const countedValue = item.actualCount * unitPrice;

      acc.totalExpected += item.expectedValue;
      acc.totalCounted += countedValue;

      return acc;
    },
    {
      totalExpected: 0,
      totalCounted: 0,
    }
  );

  const totalVariance = totals.totalCounted - totals.totalExpected;

  const totalVariancePercent =
    totals.totalExpected === 0
      ? 0
      : (totalVariance / totals.totalExpected) * 100;

  const finalTotals = {
    expected: Number(totals.totalExpected.toFixed(2)),
    counted: Number(totals.totalCounted.toFixed(2)),
    variance: Number(totalVariance.toFixed(2)),
    variancePercent: Number(totalVariancePercent.toFixed(2)),
  };
  const [openSections, setOpenSections] = useState<string[]>(
    inventory.viewTable?.slice(0, 2).map((section) => section.header) || []
  );

  const toggleSection = (header: string) => {
    setOpenSections((prev) =>
      prev.includes(header)
        ? prev.filter((h) => h !== header)
        : [...prev, header]
    );
  };

  const updateCount = (
    sectionIndex: number,
    itemIndex: number,
    delta: number
  ) => {
    setSections((prev) => {
      const newSections = [...(prev || [])];
      const item = newSections[sectionIndex].view[itemIndex];
      if (!item) return newSections;

      // Update actual count
      item.actualCount = Math.max(0, item.actualCount + delta);

      // Recalculate expectedValue if needed or just keep existing
      item.expectedValue = Number(item.expectedValue.toFixed(2));

      return newSections;
    });
  };

  const formatCurrency = (val: number) => {
    const sign = val >= 0 ? "+" : "-";
    return `${sign}$${Math.abs(val).toFixed(2)}`;
  };
  const isNegative =
    typeof finalTotals.counted === "number"
      ? finalTotals.counted < 0
      : Number(finalTotals.counted) < 0;

  const countedCardColors = isNegative
    ? {
        bgColor: "#82181A33", // light red background
        borderColor: "#FCA5A5",
      }
    : {
        bgColor: "#004F3B80", // light green (or default)
        borderColor: "#86EFAC",
      };

  return (
    <div className="space-y-8 py-8">
      {/* Header */}
      <div className="flex items-center gap-4">
        <button onClick={() => window.history.back()}>
          <ArrowLeft className="h-6 w-6 cursor-pointer text-slate-300 hover:text-white transition" />
        </button>

        <Heading
          title={`Inventory Count - ${inventory.date}`}
          subtitle={inventory.name}
        />
      </div>

      <div className="space-y-8">
        {/* Your table or other content */}

        {/* Pass the totals from this component */}
        <StatsOverview finalTotals={finalTotals} />

        {/* Bottom buttons */}
      </div>

      {/* Sections */}
      <div className="space-y-6">
        {sections?.map((section, sectionIndex) => {
          const isOpen = openSections.includes(section.header);

          // Totals
          const expectedTotal = section.view.reduce(
            (sum, item) => sum + item.expectedValue,
            0
          );
          const countedTotal = section.view.reduce(
            (sum, item) => sum + item.actualCount,
            0
          );
          const varianceTotal = countedTotal - expectedTotal;

          return (
            <div
              key={section.header}
              className="overflow-hidden rounded-xl border border-slate-700 bg-slate-800/40 backdrop-blur"
            >
              {/* Section Header */}
              <button
                onClick={() => toggleSection(section.header)}
                className="flex w-full items-center justify-between px-6 py-4 hover:bg-slate-700/30 transition"
              >
                <div className="flex items-center gap-4">
                  {isOpen ? (
                    <ChevronUp className="h-5 w-5 text-slate-400" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-slate-400" />
                  )}
                  <div className="text-left">
                    <h3 className="text-lg font-semibold text-white">
                      {section.header}
                    </h3>
                    <p className="text-sm text-slate-400">
                      {section.view.length} items • Expected $
                      {expectedTotal.toFixed(2)} • Counted $
                      {countedTotal.toFixed(2)}
                    </p>
                  </div>
                </div>
                <span
                  className={`font-semibold ${
                    varianceTotal >= 0 ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {formatCurrency(varianceTotal)}
                </span>
              </button>

              {/* Collapsible Table */}
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: "auto" }}
                    exit={{ height: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden border-t border-slate-700"
                  >
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="text-slate-300">
                            Product
                          </TableHead>
                          <TableHead className="text-slate-300">
                            Expected
                          </TableHead>
                          <TableHead className="text-slate-300">
                            Expected Value
                          </TableHead>
                          <TableHead className="text-slate-300 text-center">
                            Actual Count
                          </TableHead>
                          <TableHead className="text-slate-300">
                            Unit Price
                          </TableHead>
                          <TableHead className="text-slate-300">
                            Variance (%)
                          </TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {section.view.map((item, itemIndex) => (
                          <TableRow key={item.productId}>
                            <TableCell className="font-medium text-white">
                              {item.productName}
                            </TableCell>
                            <TableCell className="text-slate-300">
                              {item.expected} {item.unit}
                            </TableCell>
                            <TableCell className="text-slate-300">
                              ${item.expectedValue.toFixed(2)}
                            </TableCell>
                            <TableCell className="text-center">
                              <div className="flex items-center justify-center gap-2">
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  className="h-8 w-8 p-2.5 dark:bg-slate-700 rounded-lg"
                                  onClick={() =>
                                    updateCount(sectionIndex, itemIndex, -1)
                                  }
                                >
                                  <Minus className="h-4 w-4" />
                                </Button>
                                <span className="w-12 text-center p-3.5 rounded-md dark:bg-black ">
                                  {item.actualCount}
                                </span>
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  className="h-8 w-8 p-2.5 dark:bg-slate-700 rounded-lg"
                                  onClick={() =>
                                    updateCount(sectionIndex, itemIndex, +1)
                                  }
                                >
                                  <Plus className="h-4 w-4" />
                                </Button>
                              </div>
                            </TableCell>
                            <TableCell className="text-slate-300">
                              ${item.unitPrice}
                            </TableCell>
                            <TableCell
                              className={`font-medium ${
                                item.actualCount * Number(item.unitPrice) -
                                  item.expectedValue >
                                0
                                  ? "text-green-400 "
                                  : item.actualCount * Number(item.unitPrice) -
                                      item.expectedValue <
                                    0
                                  ? "text-red-400"
                                  : "text-slate-400"
                              }`}
                            >
                              {(
                                item.actualCount * Number(item.unitPrice) -
                                item.expectedValue
                              ).toFixed(2)}
                              <br />
                              {(
                                ((item.actualCount * Number(item.unitPrice) -
                                  item.expectedValue) /
                                  item.expectedValue) *
                                100
                              ).toFixed(2)}
                              %
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

      {/* Bottom Actions */}
      <div className="flex justify-end gap-4 pt-8">
        <Button variant="outline" size="lg">
          Save Draft
        </Button>
        <Button
          size="lg"
          className="bg-green-600 hover:bg-green-700 text-white font-semibold"
        >
          Submit Count
        </Button>
      </div>
    </div>
  );
};
