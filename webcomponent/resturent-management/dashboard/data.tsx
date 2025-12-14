import { CardProps, VarienceProps } from "@/webcomponent/reusable";
import { TopSellingMenuItemsProps } from "./BarChart";
import { LineChartProps } from "./LineChart";
import { AlertTriangle, DollarSign, TrendingUp } from "lucide-react";

export const lineChartData: LineChartProps[] = [
  { months: "Jan", sales: 135000, cogs: 45000 },
  { months: "Feb", sales: 140000, cogs: 46000 },
  { months: "Mar", sales: 145000, cogs: 47000 },
  { months: "Apr", sales: 150000, cogs: 48000 },
  { months: "May", sales: 160000, cogs: 50000 },
  { months: "Jun", sales: 168000, cogs: 54000 },
];

export const topSellingMenuItems: TopSellingMenuItemsProps[] = [
  { itemName: "Margherita Pizza", money: 26000 },
  { itemName: "Caesar Salad", money: 19500 },
  { itemName: "Grilled Salmon", money: 13000 },
  { itemName: "Beef Burger", money: 12000 },
  { itemName: "Pasta Carbonara", money: 6500 },
];

export const cardData: CardProps[] = [
  {
    title: "Theoretical Food Cost %",
    numString: "28.5%",
    belwoText: (
      <div className="flex items-center gap-2">
        <TrendingUp className="h-4 w-4 text-green-500" />
        <span className="inline-flex gap-2">
          {" "}
          <p className="text-green-500"> 1.2% </p>vs last period{" "}
        </span>
      </div>
    ),
    bgColor: "#004F3B33",
    bgWhite: "#A4F4CF",
    borderBlack: "#006045",
    borderWhite: "#A4F4CF",
    icon: DollarSign,
    darkIconColor: "#00D492",
    lightIconColor: "#4338CA",
  },
  {
    title: "Actual Food Cost %",
    numString: "32.1%",
    belwoText: (
      <div className="flex items-center gap-2">
        <TrendingUp className="h-4 w-4 text-green-500" />
        <span className="inline-flex gap-2">
          {" "}
          <p className="text-green-500"> 0.8% </p>vs last period{" "}
        </span>
      </div>
    ),
    bgColor: "#7B330633",
    bgWhite: "#FFFBEB",
    borderBlack: "#973C00",
    borderWhite: "#FEE685",
    icon: TrendingUp,
    darkIconColor: "#00D492",
    lightIconColor: "#4338CA",
  },
  {
    title: "Total COGS",
    numString: "$54,600",
    belwoText: (
      <div className="flex items-center gap-2">
        <TrendingUp className="h-4 w-4 text-green-500" />
        <span className="inline-flex gap-2">
          {" "}
          <p className="text-green-500"> 3.5% </p>vs last period{" "}
        </span>
      </div>
    ),
    bgColor: "#1D293D",
    borderBlack: "#314158",
    bgWhite: "#FFFFFF",
    borderWhite: "#E5E7EB",
    icon: DollarSign,
    darkIconColor: "#00D492",
    lightIconColor: "#4338CA",
  },
  {
    title: "Total POS Sales",
    numString: "$168,000",
    belwoText: (
      <div className="flex items-center gap-2">
        <TrendingUp className="h-4 w-4 text-green-500" />
        <span className="inline-flex gap-2">
          {" "}
          <p className="text-green-500"> 3.5% </p>vs last period{" "}
        </span>
      </div>
    ),
    bgColor: "#1D293D",
    borderBlack: "#314158",
    bgWhite: "#FFFFFF",
    borderWhite: "#E5E7EB",
    icon: DollarSign,
    darkIconColor: "#00D492",
    lightIconColor: "#4338CA",
  },
  {
    title: "Total Variance",
    numString: "-$1,510",
    bgColor: "#7B330633",
    bgWhite: "#FFFBEB",
    borderBlack: "#973C00",
    borderWhite: "#FEE685",
    icon: AlertTriangle,
    darkIconColor: "#00D492",
    lightIconColor: "#4338CA",
  },
];

export const varienceProps: VarienceProps[] = [
  {
    title: "Highest Variance Ingredients",
    variance: [
      {
        name: "Ribeye Steak",
        value: -8.5,
        numString: "$1250",
        textColor: "#FF6467",
      },
      {
        name: "Atlantic Salmon",
        value: -5.2,
        numString: "$680",
        textColor: "#FF6467",
      },
      {
        name: "Organic Flour",
        value: 3.8,
        numString: "$420",
        textColor: "#00D492",
      },
    ],
  },
  {
    title: "Recent Price Changes",
    variance: [
      {
        name: "Olive Oil",
        value: 17.3,
        numString: "$28.75",
        textColor: "#FF6467",
      },
      {
        name: "Chicken Breast",
        value: 12.3,
        numString: "$3.65",
        textColor: "#FF6467",
      },
      {
        name: "Tomatoes",
        value: -11.9,
        numString: "$1.85",
        textColor: "#00D492",
      },
    ],
  },
  {
    title: "Low Stock Items",
    variance: [
      { name: "Parmesan Cheese", numString: "2 lbs", textColor: "#FFB900" },
      { name: "Heavy Cream", numString: "3 quarts", textColor: "#FFB900" },
      { name: "Fresh Basil", numString: "1 bunches", textColor: "#FFB900" },
    ],
  },
];
