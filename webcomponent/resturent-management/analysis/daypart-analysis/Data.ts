export interface DaypartSalesData {
  daypart: string;
  sales: number;
  itemsSold: number;
}

export interface TopItems {
  itemName: string;
  sales: number;
}

export interface ChartData {
  salesData: number[];  // Sales data for each daypart (in $)
  quantityData: number[];  // Quantity sold for each daypart
}

export interface DaypartAnalysis {
  daypartSales: DaypartSalesData[];
  topLunchItems: TopItems[];
  topDinnerItems: TopItems[];
  topBreakfastItems: TopItems[];
  chartData: ChartData;
}

export const daypartAnalysisData: DaypartAnalysis = {
  daypartSales: [
    { daypart: "Breakfast", sales: 8450, itemsSold: 124 },
    { daypart: "Lunch", sales: 42800, itemsSold: 456 },
    { daypart: "Dinner", sales: 98600, itemsSold: 612 },
    { daypart: "Late Night", sales: 18150, itemsSold: 183 }
  ],
  topLunchItems: [
    { itemName: "Caesar Salad", sales: 1068 },
    { itemName: "Margherita Pizza", sales: 1216 }
  ],
  topDinnerItems: [
    { itemName: "Ribeye Steak", sales: 4704 },
    { itemName: "Grilled Salmon", sales: 2784 }
  ],
  topBreakfastItems: [
    { itemName: "Eggs Benedict", sales: 675 },
    { itemName: "Pancake Stack", sales: 456 }
  ],
  chartData: {
    salesData: [8450, 42800, 98600, 18150], // Sales data for Breakfast, Lunch, Dinner, and Late Night
    quantityData: [124, 456, 612, 183]    // Quantity sold for Breakfast, Lunch, Dinner, and Late Night
  }
};