import { CardProps, VarienceProps } from "@/webcomponent/reusable";
import { TopSellingMenuItemsProps } from "./BarChart";
import { LineChartProps } from "./LineChart";

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
    belwoText: "1.2% vs last period",
    bgColor: "#1e2a47",
  },
  {
    title: "Actual Food Cost %",
    numString: "32.1%",
    belwoText: "2.3% vs last period",
    bgColor: "#1e2a47",
  },
  {
    title: "Total COGS",
    numString: "$54,600",
    belwoText: "Nov 1-24, 2025",
    bgColor: "#1e2a47",
  },
  {
    title: "Total POS Sales",
    numString: "$168,000",
    belwoText: "8.5% vs last period",
    bgColor: "#1e2a47",
  },
  {
    title: "Total Variance",
    numString: "-$1,510",
    belwoText: "Variance in performance",
    bgColor: "#9b1c1c",
  },
];

export const varienceProps: VarienceProps[] = [
  {
    title: "Highest Variance Ingredients",
    variance: [
      { name: "Ribeye Steak", value: -8.5, numString: "$1250", textColor: "#e74c3c" },
      { name: "Atlantic Salmon", value: -5.2, numString: "$680", textColor: "#e74c3c" },
      { name: "Organic Flour", value: 3.8, numString: "$420", textColor: "#2ecc71" },
    ],
  },
  {
    title: "Recent Price Changes",
    variance: [
      { name: "Olive Oil", value: 17.3, numString: "$28.75", textColor: "#2ecc71" },
      { name: "Chicken Breast", value: 12.3, numString: "$3.65", textColor: "#2ecc71" },
      { name: "Tomatoes", value: -11.9, numString: "$1.85", textColor: "#e74c3c" },
    ],
  },
  {
    title: "Low Stock Items",
    variance: [
      { name: "Parmesan Cheese", numString: "2 lbs", textColor: "#f39c12" },
      { name: "Heavy Cream", numString: "3 quarts", textColor: "#f39c12" },
      { name: "Fresh Basil", numString: "1 bunches", textColor: "#f39c12" },
    ],
  },
];

