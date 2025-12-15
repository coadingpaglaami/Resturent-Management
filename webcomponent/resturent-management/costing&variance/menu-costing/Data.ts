interface RecipieCostingData {
  name: string;
  category: string;
  costorportion: number;
  sellingPrice: number;
}

export const recipieCostingDataArray: RecipieCostingData[] = [
  // Appetizer Category
  // 38.0% (costportion / selling price * 100)
  // Selling Price - Cost or Portion
  // Suggested Price = 40.50 //suggested Menu Price = Cost or Portion / Target Food Cost Percentage
  {
    name: "Grilled Salmon with Herb Butter",
    category: "Appetizer",
    costorportion: 12.15,
    sellingPrice: 32.0,
  },
  {
    name: "Classic Margherita Pizza",
    category: "Appetizer",
    costorportion: 4.23,
    sellingPrice: 16.0,
  },
  {
    name: "Caesar Salad",
    category: "Appetizer",
    costorportion: 2.85,
    sellingPrice: 12.0,
  },
  {
    name: "Pasta Carbonara",
    category: "Appetizer",
    costorportion: 5.6,
    sellingPrice: 22.0,
  },

  // Main Course Category
  {
    name: "Grilled Chicken with Lemon Sauce",
    category: "Main Course",
    costorportion: 6.0,
    sellingPrice: 18.0,
  },
  {
    name: "Beef Stir Fry",
    category: "Main Course",
    costorportion: 5.75,
    sellingPrice: 20.0,
  },
  {
    name: "Spaghetti Carbonara",
    category: "Main Course",
    costorportion: 6.0,
    sellingPrice: 18.0,
  },
  {
    name: "Grilled Ribeye Steak",
    category: "Main Course",
    costorportion: 16.43,
    sellingPrice: 48.0,
  },

  // Dessert Category
  {
    name: "Chocolate Lava Cake",
    category: "Dessert",
    costorportion: 3.0,
    sellingPrice: 12.0,
  },
  {
    name: "Lemon Cheesecake",
    category: "Dessert",
    costorportion: 4.5,
    sellingPrice: 15.0,
  },
  {
    name: "Vanilla Pudding",
    category: "Dessert",
    costorportion: 2.2,
    sellingPrice: 8.0,
  },
  {
    name: "Apple Pie",
    category: "Dessert",
    costorportion: 4.0,
    sellingPrice: 12.0,
  },

  // Additional Recipes
  {
    name: "Tom Yum Soup",
    category: "Appetizer",
    costorportion: 3.5,
    sellingPrice: 12.5,
  },
  {
    name: "Fish Tacos",
    category: "Main Course",
    costorportion: 4.75,
    sellingPrice: 15.0,
  },
  {
    name: "Grilled Shrimp Salad",
    category: "Main Course",
    costorportion: 7.5,
    sellingPrice: 22.0,
  },
  {
    name: "Pasta Primavera",
    category: "Main Course",
    costorportion: 5.0,
    sellingPrice: 18.0,
  },
  {
    name: "Tiramisu",
    category: "Dessert",
    costorportion: 4.0,
    sellingPrice: 14.0,
  },
  {
    name: "Banoffee Pie",
    category: "Dessert",
    costorportion: 3.5,
    sellingPrice: 12.0,
  },
  {
    name: "Chocolate Chip Cookies",
    category: "Dessert",
    costorportion: 2.0,
    sellingPrice: 8.0,
  },
  {
    name: "Churros",
    category: "Dessert",
    costorportion: 1.8,
    sellingPrice: 6.5,
  },
];
