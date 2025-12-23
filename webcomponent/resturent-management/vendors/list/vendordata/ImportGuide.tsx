import { Button } from "@/components/ui/button";
import { orderGuideItems } from "../Data";
import { Plus, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";

interface ImportGuideProps {
  open?: boolean;
  onClose: (open: boolean) => void;
  onAddItems: (items: orderGuideItems[]) => void;
  existingSkus: Set<string>;
}

export const orderGuideArray: orderGuideItems[] = [
  {
    sku: "OL-003",
    category: "Oils",
    packSize: 1, // 1 GAL
    unitType: "oz",
    pricePack: 45.0,
    costPerUnit: 0.35,
    linkedIngredient: "Olive Oil",
    lastUpdated: "2023-10-27T10:00:00Z",
    priceHistory: {
      productName: "Extra Virgin Olive Oil",
      history: [
        { date: "2023-10-01", price: 44.5 },
        { date: "2023-10-27", price: 45.0 },
      ],
    },
  },
  {
    sku: "DY-019",
    category: "Dairy",
    packSize: 5, // 5 LB
    unitType: "lb",
    pricePack: 32.5,
    costPerUnit: 6.5,
    linkedIngredient: "Parmesan",
    lastUpdated: "2023-10-27T10:00:00Z",
    priceHistory: {
      productName: "Parmesan Cheese",
      history: [
        { date: "2023-10-01", price: 32.0 },
        { date: "2023-10-27", price: 32.5 },
      ],
    },
  },
  {
    sku: "PR-029",
    category: "Produce",
    packSize: 50, // 50 LB
    unitType: "lb",
    pricePack: 22.0,
    costPerUnit: 0.44,
    linkedIngredient: "Yellow Onion",
    lastUpdated: "2023-10-27T10:00:00Z",
    priceHistory: {
      productName: "Yellow Onions",
      history: [
        { date: "2023-10-01", price: 20.0 },
        { date: "2023-10-27", price: 22.0 },
      ],
    },
  },
  {
    sku: "DY-101",
    category: "Dairy",
    packSize: 1, // 1 GAL
    unitType: "gal",
    pricePack: 4.5,
    costPerUnit: 4.5,
    linkedIngredient: "Whole Milk",
    lastUpdated: "2023-10-27T10:00:00Z",
    priceHistory: {
      productName: "Whole Milk",
      history: [
        { date: "2023-10-01", price: 4.25 },
        { date: "2023-10-27", price: 4.5 },
      ],
    },
  },
  {
    sku: "MT-046",
    category: "Meat",
    packSize: 10, // 10 LB
    unitType: "lb",
    pricePack: 48.0,
    costPerUnit: 4.8,
    linkedIngredient: "Ground Beef",
    lastUpdated: "2023-10-27T10:00:00Z",
    priceHistory: {
      productName: "Ground Beef 80/20",
      history: [
        { date: "2023-10-01", price: 46.0 },
        { date: "2023-10-27", price: 48.0 },
      ],
    },
  },
];
export const ImportGuide = ({
  onClose,
  onAddItems,
  existingSkus,
}: ImportGuideProps) => {
  const selectableItems = orderGuideArray.filter(
    (item) => !existingSkus.has(item.sku)
  );
  const [searchTerm, setSearchTerm] = useState("");
  const filteredItems = selectableItems.filter(
    (item) =>
      item.priceHistory.productName
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      item.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category?.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
    <div>
      {/* Search Bar */}
      <div className="relative border-y dark:border-gray-200 py-2.5 px-3.5">
        <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
        <Input
          placeholder="Search by product name, SKU, or category..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 bg-muted/50 "
        />
      </div>

      {/* Items List */}
      <div className="flex-1 overflow-y-auto space-y-2 p-4">
        {filteredItems.length === 0 ? (
          <p className="text-center text-muted-foreground py-8">
            No items found matching your search.
          </p>
        ) : (
          filteredItems.map((item) => (
            <div
              key={item.sku}
              className="flex items-center justify-between p-4 rounded-lg  hover:bg-muted/60 transition-colors bg-black"
            >
              <div className="flex-1">
                <div className="flex items-center gap-3">
                  <p className="font-semibold">
                    {item.priceHistory.productName}
                  </p>
                  <Badge className="text-xs dark:bg-gray-500">
                    {item.category}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  SKU: {item.sku} • Pack Size: {item.packSize} {item.unitType} •
                  Unit: {item.unitType}
                </p>
              </div>

              <Button
                size="sm"
                className="bg-emerald-600 hover:bg-emerald-700 text-white cursor-pointer"
                onClick={() => {
                  onAddItems([item]);
                  onClose(false);
                }}
              >
                <Plus className="h-4 w-4 mr-1" />
                Add
              </Button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
