interface Ingredient {
  name: string;
  quantity: string;
  unit: string;
  cost: number;
}

export interface RepiesData {
  id: number;
  recipeName: string;
  servings: number;
  subtitle: string;
  preparationTime: string;
  cookingTime: string;
  ingredients: Ingredient[];
  instructions: string[];
  category?: string;
}

export const recipesDataArray: RepiesData[] = [
  // Appetizer Category
  {
    id: 1,
    recipeName: "Grilled Salmon with Herb Butter",
    servings: 4,
    subtitle:
      "Fresh Atlantic salmon grilled to perfection with aromatic herb butter",
    preparationTime: "15 min",
    cookingTime: "20 min",
    ingredients: [
      { name: "Atlantic Salmon", quantity: "2", unit: "lb", cost: 24.0 },
      { name: "Fresh Basil", quantity: "2", unit: "bunch", cost: 4.5 },
      { name: "Extra Virgin Olive Oil", quantity: "4", unit: "oz", cost: 0.88 },
    ],
    instructions: [
      "Preheat grill to medium-high heat",
      "Season salmon with salt and pepper",
      "Grill for 15 minutes per side",
      "Top with herb butter before serving",
    ],
    category: "Appetizer",
  },
  {
    id: 2,
    recipeName: "Classic Margherita Pizza",
    servings: 2,
    subtitle: "Traditional Italian pizza with fresh mozzarella and basil",
    preparationTime: "30 min",
    cookingTime: "10 min",
    ingredients: [
      { name: "Organic Flour", quantity: "1.5", unit: "lb", cost: 1.47 },
      { name: "Roma Tomatoes", quantity: "1", unit: "lb", cost: 1.85 },
      { name: "Fresh Basil", quantity: "1", unit: "bunch", cost: 2.25 },
    ],
    instructions: [
      "Prepare pizza dough and let rise",
      "Roll out dough in circle",
      "Add tomato sauce and cheese",
      "Bake at 475°F for 10-12 minutes",
    ],
    category: "Appetizer",
  },
  {
    id: 3,
    recipeName: "Ribeye Steak with Roasted Vegetables",
    servings: 2,
    subtitle: "Premium ribeye steak roasted to order with seasonal vegetables",
    preparationTime: "20 min",
    cookingTime: "15 min",
    ingredients: [
      { name: "Ribeye Steak", quantity: "2", unit: "steaks", cost: 24.0 },
      { name: "Seasonal Vegetables", quantity: "1", unit: "lb", cost: 8.0 },
    ],
    instructions: [
      "Season ribeye steaks with salt and pepper",
      "Roast vegetables in oven at 400°F",
      "Grill steaks to desired doneness",
      "Serve with roasted vegetables",
    ],
    category: "Appetizer",
  },

  // Main Course Category
  {
    id: 4,
    recipeName: "Grilled Chicken with Lemon Sauce",
    servings: 4,
    subtitle: "Juicy grilled chicken served with a zesty lemon sauce",
    preparationTime: "10 min",
    cookingTime: "20 min",
    ingredients: [
      { name: "Chicken Breasts", quantity: "4", unit: "pieces", cost: 12.0 },
      { name: "Lemon", quantity: "2", unit: "pieces", cost: 1.0 },
      { name: "Olive Oil", quantity: "3", unit: "tbsp", cost: 0.5 },
    ],
    instructions: [
      "Season chicken breasts with salt and pepper",
      "Grill chicken for 10 minutes on each side",
      "Make lemon sauce with olive oil and fresh lemon juice",
      "Serve grilled chicken with lemon sauce",
    ],
    category: "Main Course",
  },
  {
    id: 5,
    recipeName: "Beef Stir Fry",
    servings: 4,
    subtitle: "A quick and easy stir fry with beef and vegetables",
    preparationTime: "15 min",
    cookingTime: "10 min",
    ingredients: [
      { name: "Beef Strips", quantity: "1", unit: "lb", cost: 6.0 },
      { name: "Bell Peppers", quantity: "2", unit: "pieces", cost: 2.5 },
      { name: "Soy Sauce", quantity: "3", unit: "tbsp", cost: 0.75 },
    ],
    instructions: [
      "Heat oil in a pan and stir fry beef strips until browned",
      "Add sliced bell peppers and stir fry for 2 minutes",
      "Add soy sauce and stir well",
      "Serve hot with rice",
    ],
    category: "Main Course",
  },
  {
    id: 6,
    recipeName: "Spaghetti Carbonara",
    servings: 4,
    subtitle: "Classic Italian pasta with creamy carbonara sauce",
    preparationTime: "10 min",
    cookingTime: "20 min",
    ingredients: [
      { name: "Spaghetti", quantity: "1", unit: "lb", cost: 1.0 },
      { name: "Pancetta", quantity: "8", unit: "oz", cost: 3.0 },
      { name: "Eggs", quantity: "4", unit: "pieces", cost: 2.0 },
    ],
    instructions: [
      "Cook spaghetti according to package instructions",
      "Fry pancetta until crispy",
      "Whisk eggs and combine with grated cheese",
      "Toss spaghetti with pancetta and egg mixture",
    ],
    category: "Main Course",
  },

  // Dessert Category
  {
    id: 7,
    recipeName: "Chocolate Lava Cake",
    servings: 4,
    subtitle: "Decadent chocolate cake with a gooey molten center",
    preparationTime: "10 min",
    cookingTime: "15 min",
    ingredients: [
      { name: "Dark Chocolate", quantity: "4", unit: "oz", cost: 2.5 },
      { name: "Butter", quantity: "4", unit: "tbsp", cost: 1.0 },
      { name: "Eggs", quantity: "2", unit: "pieces", cost: 0.5 },
    ],
    instructions: [
      "Preheat oven to 425°F",
      "Melt chocolate and butter together",
      "Whisk eggs and sugar, then combine with melted chocolate",
      "Bake for 10-12 minutes, until the edges are set",
    ],
    category: "Dessert",
  },
  {
    id: 8,
    recipeName: "Lemon Cheesecake",
    servings: 6,
    subtitle: "Smooth and creamy cheesecake with a tangy lemon flavor",
    preparationTime: "20 min",
    cookingTime: "30 min",
    ingredients: [
      { name: "Cream Cheese", quantity: "8", unit: "oz", cost: 3.0 },
      { name: "Graham Cracker Crumbs", quantity: "1", unit: "cup", cost: 1.5 },
      { name: "Lemon Zest", quantity: "2", unit: "tbsp", cost: 0.25 },
    ],
    instructions: [
      "Combine graham cracker crumbs and melted butter",
      "Press the mixture into the base of a baking pan",
      "Mix cream cheese, eggs, and lemon zest",
      "Bake at 350°F for 30 minutes",
    ],
    category: "Dessert",
  },
  {
    id: 9,
    recipeName: "Vanilla Pudding",
    servings: 4,
    subtitle: "Rich and creamy vanilla pudding made from scratch",
    preparationTime: "5 min",
    cookingTime: "10 min",
    ingredients: [
      { name: "Milk", quantity: "2", unit: "cups", cost: 1.0 },
      { name: "Sugar", quantity: "1", unit: "cup", cost: 0.5 },
      { name: "Vanilla Extract", quantity: "1", unit: "tbsp", cost: 0.25 },
    ],
    instructions: [
      "Heat milk and sugar in a saucepan",
      "Whisk in cornstarch and cook until thickened",
      "Remove from heat and add vanilla extract",
      "Serve chilled",
    ],
    category: "Dessert",
  },

  // Additional Recipes to complete 20
  {
    id: 10,
    recipeName: "Apple Pie",
    servings: 8,
    subtitle: "A classic dessert made with sweet apple filling",
    preparationTime: "20 min",
    cookingTime: "45 min",
    ingredients: [
      { name: "Apples", quantity: "6", unit: "pieces", cost: 3.0 },
      { name: "Sugar", quantity: "1", unit: "cup", cost: 0.5 },
      { name: "Cinnamon", quantity: "1", unit: "tsp", cost: 0.1 },
    ],
    instructions: [
      "Preheat oven to 375°F",
      "Peel and slice apples, mix with sugar and cinnamon",
      "Place in pie crust and bake for 45 minutes",
    ],
    category: "Dessert",
  },
  {
    id: 11,
    recipeName: "Chicken Alfredo",
    servings: 4,
    subtitle: "Creamy chicken pasta in a rich Alfredo sauce",
    preparationTime: "10 min",
    cookingTime: "20 min",
    ingredients: [
      { name: "Chicken Breast", quantity: "2", unit: "pieces", cost: 5.0 },
      { name: "Heavy Cream", quantity: "1", unit: "cup", cost: 2.0 },
      { name: "Parmesan Cheese", quantity: "1", unit: "cup", cost: 1.5 },
    ],
    instructions: [
      "Cook chicken and slice it thinly",
      "Boil pasta and drain",
      "Make Alfredo sauce by simmering cream and cheese",
      "Combine pasta, chicken, and sauce",
    ],
    category: "Main Course",
  },
  {
    id: 12,
    recipeName: "Chocolate Chip Cookies",
    servings: 24,
    subtitle: "Soft and chewy cookies with a perfect amount of chocolate chips",
    preparationTime: "10 min",
    cookingTime: "12 min",
    ingredients: [
      { name: "Butter", quantity: "1", unit: "cup", cost: 1.5 },
      { name: "Sugar", quantity: "1", unit: "cup", cost: 0.5 },
      { name: "Chocolate Chips", quantity: "1", unit: "cup", cost: 2.0 },
    ],
    instructions: [
      "Preheat oven to 350°F",
      "Mix butter and sugar, then add eggs and vanilla",
      "Fold in chocolate chips",
      "Scoop dough onto baking sheet and bake for 10-12 minutes",
    ],
    category: "Dessert",
  },
  {
    id: 13,
    recipeName: "Caesar Salad",
    servings: 4,
    subtitle: "Classic Caesar salad with crispy croutons and dressing",
    preparationTime: "10 min",
    cookingTime: "5 min",
    ingredients: [
      { name: "Romaine Lettuce", quantity: "2", unit: "heads", cost: 2.0 },
      { name: "Croutons", quantity: "1", unit: "cup", cost: 1.0 },
      { name: "Caesar Dressing", quantity: "1", unit: "cup", cost: 1.5 },
    ],
    instructions: [
      "Chop lettuce and toss with dressing",
      "Top with croutons and serve",
    ],
    category: "Appetizer",
  },

  {
    id: 14,
    recipeName: "Tom Yum Soup",
    servings: 4,
    subtitle: "Spicy and sour Thai soup with shrimp and lemongrass",
    preparationTime: "10 min",
    cookingTime: "15 min",
    ingredients: [
      { name: "Shrimp", quantity: "1", unit: "lb", cost: 8.0 },
      { name: "Lemongrass", quantity: "2", unit: "stalks", cost: 1.0 },
      { name: "Fish Sauce", quantity: "3", unit: "tbsp", cost: 0.5 },
    ],
    instructions: [
      "Boil water and add lemongrass and fish sauce",
      "Add shrimp and cook until pink",
      "Season with lime juice and chili",
      "Serve hot with cilantro garnish",
    ],
    category: "Appetizer",
  },
  {
    id: 15,
    recipeName: "Grilled Shrimp Tacos",
    servings: 4,
    subtitle: "Tacos filled with grilled shrimp and tangy slaw",
    preparationTime: "15 min",
    cookingTime: "10 min",
    ingredients: [
      { name: "Shrimp", quantity: "1", unit: "lb", cost: 8.0 },
      { name: "Corn Tortillas", quantity: "8", unit: "pieces", cost: 2.0 },
      { name: "Cabbage", quantity: "1", unit: "head", cost: 1.5 },
    ],
    instructions: [
      "Grill shrimp with seasoning",
      "Make slaw with shredded cabbage and dressing",
      "Assemble tacos with shrimp and slaw",
    ],
    category: "Appetizer",
  },

  {
    id: 16,
    recipeName: "Pasta Primavera",
    servings: 4,
    subtitle: "Pasta with a medley of fresh seasonal vegetables",
    preparationTime: "15 min",
    cookingTime: "20 min",
    ingredients: [
      { name: "Pasta", quantity: "1", unit: "lb", cost: 1.0 },
      { name: "Zucchini", quantity: "1", unit: "pieces", cost: 1.0 },
      { name: "Bell Peppers", quantity: "2", unit: "pieces", cost: 2.0 },
    ],
    instructions: [
      "Cook pasta and drain",
      "Sauté vegetables in olive oil",
      "Toss pasta with vegetables and Parmesan cheese",
    ],
    category: "Main Course",
  },

  {
    id: 17,
    recipeName: "Chicken Caesar Wraps",
    servings: 4,
    subtitle: "Caesar salad wrapped in a soft tortilla",
    preparationTime: "15 min",
    cookingTime: "5 min",
    ingredients: [
      { name: "Grilled Chicken", quantity: "2", unit: "pieces", cost: 6.0 },
      { name: "Tortillas", quantity: "4", unit: "pieces", cost: 2.0 },
      { name: "Caesar Dressing", quantity: "1", unit: "cup", cost: 1.5 },
    ],
    instructions: [
      "Grill chicken and slice it thin",
      "Toss chicken with Caesar dressing",
      "Wrap in tortillas with lettuce and Parmesan",
    ],
    category: "Main Course",
  },
];
