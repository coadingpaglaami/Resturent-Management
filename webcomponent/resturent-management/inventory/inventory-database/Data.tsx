import { CardProps } from "@/webcomponent/reusable";
import { Package, TrendingUp } from "lucide-react";
import { generateMixedTableData } from "./MixedDataGenerator";

export const cardDataInventory: Pick<
  CardProps,
  "title" | "numString" | "icon" | "belwoText"
>[] = [
  {
    title: "Total Products",
    numString: "8",
    icon: Package, // You can replace this with the appropriate icon
    belwoText: undefined,
  },
  {
    title: "Most Expensive Item",
    numString: "$146.00",
    icon: TrendingUp, // You can replace this with the appropriate icon
    belwoText: (
      <div className="flex flex-col gap-1.5">
        <span>Chicken Breast</span>
        <span className="inline-flex gap-2 text-green-500">
          <TrendingUp /> <p>4.7%</p>
        </span>
      </div>
    ),
  },
  {
    title: "Total Inventory Value",
    numString: "$5,512.5",
    icon: undefined, // You can replace this with the appropriate icon
    belwoText: "Estimated based on last counts",
  },
  {
    title: "Top Category",
    numString: "Meat",
    icon: undefined,
    belwoText: "2 items",
  },
];
export interface TableData {
  name: string;
  productName: string;
  sku: string;
  location: string;
  category: string;
  packSize: string;
  unit: string;
  currentPrice: string;
  lastPrice: string;
  lastUpdated: string;
  cpmUnit: string;
}

export const tableData: TableData[] = [
  {
    name: "Organic Flour",
    productName: "FL-091",
    sku: "MT-043",
    location: "Dry Storage",
    category: "Baking",
    packSize: "25 LB",
    unit: "b",
    currentPrice: "$24.60",
    lastPrice: "$22.00",
    lastUpdated: "2023-12-20",
    cpmUnit: "$0.49",
  },
  {
    name: "Ribeye Steak",
    productName: "MT-046",
    sku: "Ribeye",
    location: "Walk-In Cooler",
    category: "Meat",
    packSize: "10 LB",
    unit: "b",
    currentPrice: "$146.00",
    lastPrice: "$138.50",
    lastUpdated: "2023-11-22",
    cpmUnit: "$14.30",
  },
  {
    name: "Atlantic Salmon",
    productName: "SF-012",
    sku: "Atlantic",
    location: "Walk-In Cooler",
    category: "Seafood",
    packSize: "4 LB",
    unit: "b",
    currentPrice: "$96.00",
    lastPrice: "$90.00",
    lastUpdated: "2023-11-31",
    cpmUnit: "$19.00",
  },
  {
    name: "Roma Tomatoes",
    productName: "PR-028",
    sku: "Roma",
    location: "Walk-In Cooler",
    category: "Produce",
    packSize: "25 LB",
    unit: "b",
    currentPrice: "$18.50",
    lastPrice: "$15.00",
    lastUpdated: "2023-11-18",
    cpmUnit: "$0.74",
  },
  {
    name: "Extra Virgin Olive Oil",
    productName: "XL-003",
    sku: "OliveOil",
    location: "Dry Storage",
    category: "Oils",
    packSize: "1 GAL",
    unit: "oz",
    currentPrice: "$28.75",
    lastPrice: "$24.00",
    lastUpdated: "2023-11-16",
    cpmUnit: "$0.62",
  },
  {
    name: "Parmesan Cheese",
    productName: "DY-010",
    sku: "Parmesan",
    location: "Walk-In Cooler",
    category: "Dairy",
    packSize: "5 LB",
    unit: "b",
    currentPrice: "$90.50",
    lastPrice: "$80.00",
    lastUpdated: "2023-11-15",
    cpmUnit: "$16.20",
  },
  {
    name: "Fresh Basil",
    productName: "HB-005",
    sku: "Basil",
    location: "Walk-In Cooler",
    category: "Herbs",
    packSize: "1 BUNCH",
    unit: "bunch",
    currentPrice: "$2.75",
    lastPrice: "$2.50",
    lastUpdated: "2023-11-22",
    cpmUnit: "$2.20",
  },
  {
    name: "Chicken Breast",
    productName: "MT-421",
    sku: "ChickenBreast",
    location: "Walk-In Cooler",
    category: "Meat",
    packSize: "40 LB",
    unit: "b",
    currentPrice: "$146.00",
    lastPrice: "$130.00",
    lastUpdated: "2023-11-24",
    cpmUnit: "$3.65",
  },
];

export const mixedTableData = generateMixedTableData(120, tableData);
