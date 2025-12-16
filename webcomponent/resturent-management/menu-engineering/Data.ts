export interface MenuItemData {
  menuItem: string;
  category: string;
  qtySold: number;
  netSales: number;
  costPerPortion: number;
  foodCostPercentage: number;
  profitPerPortion: number;
  totalProfit: number;
  popularity: string;
  profitability: string;
  quadrant: string;
}

export const menuEngineeringMatrixData: MenuItemData[] = [
  {
    menuItem: "Ribeye Steak",
    category: "Main Course",
    qtySold: 142,
    netSales: 6475.2,
    costPerPortion: 16.43,
    foodCostPercentage: 34.2,
    profitPerPortion: 29.57,
    totalProfit: 4199,
    popularity: "High",
    profitability: "High",
    quadrant: "Star"
  },
  {
    menuItem: "Margherita Pizza",
    category: "Main Course",
    qtySold: 245,
    netSales: 3724,
    costPerPortion: 4.23,
    foodCostPercentage: 26.4,
    profitPerPortion: 11.77,
    totalProfit: 2883.65,
    popularity: "High",
    profitability: "High",
    quadrant: "Star"
  },
  {
    menuItem: "Grilled Salmon",
    category: "Main Course",
    qtySold: 156,
    netSales: 4992,
    costPerPortion: 12.15,
    foodCostPercentage: 38,
    profitPerPortion: 19.85,
    totalProfit: 3096.6,
    popularity: "Medium",
    profitability: "Medium",
    quadrant: "Puzzle"
  },
  {
    menuItem: "Caesar Salad",
    category: "Appetizer",
    qtySold: 198,
    netSales: 2257.2,
    costPerPortion: 2.85,
    foodCostPercentage: 23.8,
    profitPerPortion: 9.15,
    totalProfit: 1817.1,
    popularity: "High",
    profitability: "Medium",
    quadrant: "Plowhorse"
  },
  {
    menuItem: "Pasta Carbonara",
    category: "Main Course",
    qtySold: 134,
    netSales: 2800.6,
    costPerPortion: 5.60,
    foodCostPercentage: 25.5,
    profitPerPortion: 16.40,
    totalProfit: 2197.6,
    popularity: "Medium",
    profitability: "High",
    quadrant: "Star"
  }
];


