export interface RecipeDetails {
  name: string;
  category: string;
  preparationTime: string;
  totalCost: number;
  servings: number;
  cookTime: number;
  ingredients: string[];
  aiAllergenDetection?: AIAllergenDetection;
}

export interface AIAllergenDetection {
  itemsAllergenDetacted: {
    ingredient: string;
    allergens: string[];
  }[];
  severityType: "High" | "Medium" | "Low";
  notes: string;
}

export const recipeDetails: RecipeDetails[] = [
  {
    name: "Spaghetti Carbonara",
    category: "Pasta",
    preparationTime: "10 minutes",
    totalCost: 15,
    servings: 4,
    cookTime: 20,
    ingredients: [
      "spaghetti",
      "egg yolks",
      "parmesan cheese",
      "guanciale",
      "black pepper",
      "salt",
    ],
    aiAllergenDetection: {
      itemsAllergenDetacted: [
        {
          ingredient: "egg yolks",
          allergens: ["Eggs", "Sulfites", "Gluten"],
        },
        {
          ingredient: "parmesan cheese",
          allergens: ["Dairy", "Lactose", "Milk"],
        },
        {
          ingredient: "guanciale",
          allergens: ["Pork", "Sulfites", "Gluten"],
        },
      ],
      severityType: "High",
      notes:
        "Contains eggs and dairy, which are common allergens. Pork and sulfites also pose risks for certain individuals.",
    },
  },
  {
    name: "Chicken Tikka Masala",
    category: "Indian",
    preparationTime: "15 minutes",
    totalCost: 18,
    servings: 4,
    cookTime: 30,
    ingredients: [
      "chicken breast",
      "yogurt",
      "garam masala",
      "onion",
      "tomato",
      "garlic",
      "ginger",
      "cream",
    ],
    aiAllergenDetection: {
      itemsAllergenDetacted: [
        {
          ingredient: "yogurt",
          allergens: ["Dairy", "Lactose", "Milk"],
        },
        {
          ingredient: "garam masala",
          allergens: ["Cumin", "Coriander", "Mustard"],
        },
        {
          ingredient: "cream",
          allergens: ["Dairy", "Lactose", "Milk"],
        },
      ],
      severityType: "Medium",
      notes:
        "Contains dairy and mustard, which can be problematic for individuals with lactose intolerance or mustard allergies.",
    },
  },
  {
    name: "Vegetable Stir-Fry",
    category: "Vegetarian",
    preparationTime: "5 minutes",
    totalCost: 12,
    servings: 3,
    cookTime: 15,
    ingredients: [
      "bell peppers",
      "broccoli",
      "carrot",
      "soy sauce",
      "ginger",
      "garlic",
      "tofu",
    ],
    aiAllergenDetection: {
      itemsAllergenDetacted: [
        {
          ingredient: "soy sauce",
          allergens: ["Soy", "Wheat", "Gluten"],
        },
        {
          ingredient: "ginger",
          allergens: ["None"],
        },
        {
          ingredient: "tofu",
          allergens: ["Soy", "Lactose", "Gluten"],
        },
      ],
      severityType: "Medium",
      notes:
        "Contains soy and gluten, which are common allergens. Tofu may also cause reactions for some individuals.",
    },
  },
  {
    name: "Beef Burger",
    category: "Fast Food",
    preparationTime: "10 minutes",
    totalCost: 10,
    servings: 2,
    cookTime: 15,
    ingredients: [
      "beef patty",
      "burger buns",
      "cheese",
      "lettuce",
      "tomato",
      "onion",
      "ketchup",
    ],
    aiAllergenDetection: {
      itemsAllergenDetacted: [
        {
          ingredient: "burger buns",
          allergens: ["Wheat", "Gluten", "Yeast"],
        },
        {
          ingredient: "cheese",
          allergens: ["Dairy", "Lactose", "Milk"],
        },
        {
          ingredient: "beef patty",
          allergens: ["Beef", "Gluten", "Soy"],
        },
      ],
      severityType: "High",
      notes:
        "Contains gluten, dairy, and beef. Those with wheat or lactose allergies should avoid this dish.",
    },
  },
  {
    name: "Margherita Pizza",
    category: "Pizza",
    preparationTime: "15 minutes",
    totalCost: 20,
    servings: 2,
    cookTime: 20,
    ingredients: [
      "pizza dough",
      "mozzarella cheese",
      "tomato sauce",
      "basil",
      "olive oil",
    ],
    aiAllergenDetection: {
      itemsAllergenDetacted: [
        {
          ingredient: "pizza dough",
          allergens: ["Wheat", "Gluten", "Yeast"],
        },
        {
          ingredient: "mozzarella cheese",
          allergens: ["Dairy", "Lactose", "Milk"],
        },
        {
          ingredient: "tomato sauce",
          allergens: ["Tomato", "Citric acid", "Sulfites"],
        },
      ],
      severityType: "Medium",
      notes:
        "Contains wheat, dairy, and sulfites. Those with gluten intolerance or dairy allergies should avoid this pizza.",
    },
  },
  {
    name: "Caesar Salad",
    category: "Salad",
    preparationTime: "10 minutes",
    totalCost: 8,
    servings: 2,
    cookTime: 0,
    ingredients: [
      "romaine lettuce",
      "caesar dressing",
      "croutons",
      "parmesan cheese",
      "chicken breast",
    ],
    aiAllergenDetection: {
      itemsAllergenDetacted: [
        {
          ingredient: "caesar dressing",
          allergens: ["Eggs", "Dairy", "Garlic"],
        },
        {
          ingredient: "croutons",
          allergens: ["Wheat", "Gluten", "Yeast"],
        },
        {
          ingredient: "parmesan cheese",
          allergens: ["Dairy", "Lactose", "Milk"],
        },
      ],
      severityType: "Medium",
      notes:
        "Contains dairy, gluten, and eggs. Those with allergies to these ingredients should avoid the salad.",
    },
  },
  {
    name: "Salmon Fillet",
    category: "Seafood",
    preparationTime: "5 minutes",
    totalCost: 25,
    servings: 2,
    cookTime: 15,
    ingredients: [
      "salmon fillet",
      "lemon",
      "garlic",
      "olive oil",
      "rosemary",
      "salt",
    ],
    aiAllergenDetection: {
      itemsAllergenDetacted: [
        {
          ingredient: "salmon fillet",
          allergens: ["Fish", "Shellfish", "Histamine"],
        },
        {
          ingredient: "garlic",
          allergens: ["None"],
        },
        {
          ingredient: "rosemary",
          allergens: ["None"],
        },
      ],
      severityType: "High",
      notes:
        "Contains fish, which is a major allergen. Individuals with seafood allergies should avoid this dish.",
    },
  },
  {
    name: "Pancakes",
    category: "Breakfast",
    preparationTime: "5 minutes",
    totalCost: 6,
    servings: 4,
    cookTime: 10,
    ingredients: ["flour", "milk", "egg", "butter", "baking powder", "syrup"],
    aiAllergenDetection: {
      itemsAllergenDetacted: [
        {
          ingredient: "flour",
          allergens: ["Wheat", "Gluten", "Soy"],
        },
        {
          ingredient: "milk",
          allergens: ["Dairy", "Lactose", "Milk"],
        },
        {
          ingredient: "egg",
          allergens: ["Eggs", "Sulfites", "Gluten"],
        },
      ],
      severityType: "Medium",
      notes:
        "Contains gluten, dairy, and eggs. Those with these allergens should avoid this dish.",
    },
  },
];
