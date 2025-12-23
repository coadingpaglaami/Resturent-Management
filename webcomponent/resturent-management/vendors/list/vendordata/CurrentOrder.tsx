"use client";


import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Minus, Plus, Trash2 } from "lucide-react";

interface CurrentOrderItem {
  name: string;
  sku: string;
  quantity: number;
  price: number;
}

interface CurrentOrderProps {
  data: CurrentOrderItem[];
  collapse: boolean;
  onUpdateOrder?: (updated: CurrentOrderItem[]) => void;
  weeklyBudget?: number;
  onPlaceOrder?: () => void;
  onCollapse?: () => void;
  setWeeklyBudget?: (budget: number) => void;
}

export const CurrentOrder = ({
  data,
  collapse,
  onUpdateOrder,
  weeklyBudget=1000,
  onPlaceOrder,
  onCollapse,
  setWeeklyBudget
}: CurrentOrderProps) => {



const handleQuantityChange = (sku: string, delta: number) => {
  const updated = data.map((item) =>
    item.sku === sku ? { ...item, quantity: Math.max(0, item.quantity + delta) } : item
  );
  onUpdateOrder?.(updated);
};

// Delete
const handleDelete = (sku: string) => {
  const updated = data.filter((item) => item.sku !== sku);
  onUpdateOrder?.(updated);
};

// Total price
const totalPrice = data.reduce((acc, item) => acc + item.quantity * item.price, 0);

  const budgetDiff = weeklyBudget - totalPrice;
  const budgetBadge =
    budgetDiff >= 0 ? (
      <Badge variant="secondary" className="bg-green-600 text-white">
        ${budgetDiff.toFixed(2)} remaining
      </Badge>
    ) : (
      <Badge variant="secondary" className="bg-red-600 text-white">
        Over by ${Math.abs(budgetDiff).toFixed(2)}
      </Badge>
    );

  if (!collapse) return null;

  return (
    <div className="dark:bg-[#1D293D] box-shadow-card dark:border-slate-800 border rounded-lg flex flex-col gap-4 w-full">
      {/* Header */}
      <div className="flex justify-between items-center border-b border-slate-700 px-4 py-3 dark:bg-[#0F172B]">
        <h3 className="dark:text-white text-lg font-semibold">Current Order</h3>
        <Button variant="secondary" size="sm" onClick={onCollapse}>
          <Minus className="h-4 w-4" />
        </Button>
      </div>

      {/* Weekly Budget Input */}

      <div className="flex flex-col gap-1 px-4 py-3 dark:bg-[#0F172B]">
        <label className="text-sm dark:text-slate-400">Weekly Budget</label>
        <Input
          type="number"
          value={weeklyBudget}
          onChange={(e) => setWeeklyBudget?.(Number(e.target.value))}
          className="dark:bg-slate-800 dark:text-white"
        />
      </div>

      {/* Order Items */}
      <div className="flex flex-col gap-4 ">
        {data.map((item) => (
          <div
            key={item.sku}
            className="flex flex-col gap-2 border-b last:border-none dark:bg-[#0F172B] pb-2 px-4 py-3"
          >
            {/* Name, SKU, Delete */}
            <div className="flex justify-between items-center">
              <div className="flex flex-col">
                <span className="dark:text-white font-medium">{item.name}</span>
                <span className="dark:text-slate-400 font-mono text-sm">
                  {item.sku}
                </span>
              </div>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => handleDelete(item.sku)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>

            {/* Quantity and Update Price */}
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleQuantityChange(item.sku, -1)}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="dark:text-white">{item.quantity}</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleQuantityChange(item.sku, 1)}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <div className="dark:text-white font-medium">
                ${(item.quantity * item.price).toFixed(2)}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="flex flex-col gap-3 border-t dark:bg-[#0F172B] px-4 py-3">
        <div className="flex justify-between items-center">
          <span className="dark:text-slate-400">Order Total</span>
          <span className="dark:text-white font-semibold">
            ${totalPrice.toFixed(2)}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="dark:text-slate-400">Weekly Budget</span>
          <span className="dark:text-white font-semibold">
            ${weeklyBudget.toFixed(2)}
          </span>
        </div>
        <div>{budgetBadge}</div>
        <Button
          className="bg-green-600 text-white hover:bg-green-700 w-full"
          onClick={onPlaceOrder}
        >
          Place Order
        </Button>
      </div>
    </div>
  );
};
