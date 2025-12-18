export interface ItemMapping {
  posItemName: string;
  category: string;
  sales7d: number;
  revenue: number;
  status: "Mapped" | "Unmapped" | "Partial";
  mappedRecipe: string;
}

export const itemMappingData: ItemMapping[] = [
  {
    posItemName: "Classic Burger",
    category: "Burgers",
    sales7d: 450,
    revenue: 5850,
    status: "Mapped",
    mappedRecipe: "Classic Burger Recipe",
  },
  {
    posItemName: "Caesar Salad",
    category: "Salads",
    sales7d: 320,
    revenue: 3520,
    status: "Mapped",
    mappedRecipe: "Caesar Salad",
  },
  {
    posItemName: "Chicken Wings",
    category: "Appetizers",
    sales7d: 280,
    revenue: 3360,
    status: "Unmapped",
    mappedRecipe: "No recipe mapped",
  },
  {
    posItemName: "Fish Tacos",
    category: "Tacos",
    sales7d: 195,
    revenue: 2535,
    status: "Partial",
    mappedRecipe: "Fish Taco (incomplete)",
  },
  {
    posItemName: "Margherita Pizza",
    category: "Pizza",
    sales7d: 380,
    revenue: 5320,
    status: "Mapped",
    mappedRecipe: "Margherita Pizza",
  },
  {
    posItemName: "Soda",
    category: "Drinks",
    sales7d: 850,
    revenue: 1700,
    status: "Mapped",
    mappedRecipe: "Standard Drink Cost",
  },
  {
    posItemName: "Side Fries",
    category: "Sides",
    sales7d: 410,
    revenue: 1640,
    status: "Partial",
    mappedRecipe: "Fries (oil not mapped)",
  },
  {
    posItemName: "Steak Dinner",
    category: "Entrees",
    sales7d: 150,
    revenue: 7500,
    status: "Unmapped",
    mappedRecipe: "No recipe mapped",
  },
];
