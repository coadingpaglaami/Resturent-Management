export interface CategoryPerformanceData {
  category: string;
  qtySold: number;
  netSales: number;
  avgPrice: number;
  foodCostPercentage: number;
}

export interface CategoryAnalysisData {
  categorySales: {
    mainCourse: number;
    appetizer: number;
    dessert: number;
    beverage: number;
  };
  categoryPercentage: {
    mainCourse: number;
    appetizer: number;
    dessert: number;
    beverage: number;
  };
  categoryPerformanceDetails: CategoryPerformanceData[];
}

export const categoryAnalysisData: CategoryAnalysisData = {
  categorySales: {
    mainCourse: 20193.8,
    appetizer: 3825.2,
    dessert: 1404,
    beverage: 3568,
  },
  categoryPercentage: {
    mainCourse: 69.7, // Main Course takes 69.7% of the sales
    appetizer: 13.2, // Appetizer takes 13.2% of the sales
    dessert: 4.8, // Dessert takes 4.8% of the sales
    beverage: 12.3, // Beverage takes 12.3% of the sales
  },
  categoryPerformanceDetails: [
    {
      category: "Main Course",
      qtySold: 677,
      netSales: 20193.8,
      avgPrice: 29.82,
      foodCostPercentage: 32.5,
    },
    {
      category: "Appetizer",
      qtySold: 284,
      netSales: 3825.2,
      avgPrice: 13.47,
      foodCostPercentage: 24.8,
    },
    {
      category: "Dessert",
      qtySold: 156,
      netSales: 1404,
      avgPrice: 9.0,
      foodCostPercentage: 18.5,
    },
    {
      category: "Beverage",
      qtySold: 892,
      netSales: 3568,
      avgPrice: 4.0,
      foodCostPercentage: 12.0,
    },
  ],
};
