export interface LabourData {
  date: string; // e.g., "2025-11-20"
  totalHours: number; // e.g., 120
  totalCost: number; // e.g., 1500.50
}

export interface Modifier {
  name: string; // e.g., "Extra Cheese"
  linkedItem: string; // e.g., "Pizza"
  count: number; // e.g., 45
  extraRevenue: number; // e.g., 90.00
}

export interface Items {
  name: string; // e.g., "Burger"
  category: string; // e.g., "Fast Food"
  dayPart: string; // e.g., "Lunch"
  qtySold: number; // e.g., 150
  grossSales: number; // e.g., 2250.75
  netSales: number; // e.g., 2000.00
}

export interface SalesData {
  totalSales: number; // e.g., 5000.00
  totalItems: number; // e.g., 300
  totalDiscounts: number; // e.g., 250.00
  transactions: number; // e.g., 120
}

export interface NestedView {
  salseData: SalesData;
  items: Items[];
  modifiers: Modifier[];
  labourData: LabourData[];
}

export interface ImportBatch {
  batchId: number;
  dateRange: string;
  location: string;
  source: string;
  status: "Imported" | string;
  totalTransactions: number;
  nestedView: NestedView;
}

export const importBatchData: ImportBatch[] = [
  {
    batchId: 1,
    dateRange: "Nov 18-24, 2025",
    location: "Airport Location",
    source: "Toast POS",
    status: "Imported",
    totalTransactions: 1245,
    nestedView: {
      salseData: {
        totalSales: 20546,
        totalItems: 585,
        totalDiscounts: 762,
        transactions: 1245,
      },
      items: [
        {
          name: "Margherita Pizza",
          category: "Main Course",
          dayPart: "Dinner",
          qtySold: 245,
          grossSales: 3920,
          netSales: 3724,
        },
        {
          name: "Ribeye Steak",
          category: "Main Course",
          dayPart: "Dinner",
          qtySold: 142,
          grossSales: 6816,
          netSales: 6475,
        },
        {
          name: "Caesar Salad",
          category: "Appetizer",
          dayPart: "Lunch",
          qtySold: 198,
          grossSales: 2376,
          netSales: 2257,
        },
        {
          name: "Fettuccine Alfredo",
          category: "Main Course",
          dayPart: "Lunch",
          qtySold: 150,
          grossSales: 1500,
          netSales: 1350,
        },
      ],
      modifiers: [
        {
          name: "Extra Cheese",
          linkedItem: "Margherita Pizza",
          count: 89,
          extraRevenue: 267,
        },
        {
          name: "Medium Rare",
          linkedItem: "Ribeye Steak",
          count: 76,
          extraRevenue: 0,
        },
        {
          name: "Spicy",
          linkedItem: "Caesar Salad",
          count: 58,
          extraRevenue: 40,
        },
        {
          name: "Garlic Bread",
          linkedItem: "Fettuccine Alfredo",
          count: 50,
          extraRevenue: 100,
        },
      ],
      labourData: [
        {
          date: "2025-11-18",
          totalHours: 52,
          totalCost: 790,
        },
        {
          date: "2025-11-19",
          totalHours: 48,
          totalCost: 720,
        },
        {
          date: "2025-11-20",
          totalHours: 54,
          totalCost: 810,
        },
        {
          date: "2025-11-21",
          totalHours: 60,
          totalCost: 900,
        },
      ],
    },
  },
  {
    batchId: 2,
    dateRange: "Nov 11-17, 2025",
    location: "Park Square Location",
    source: "Toast POS",
    status: "Imported",
    totalTransactions: 1189,
    nestedView: {
      salseData: {
        totalSales: 15360,
        totalItems: 456,
        totalDiscounts: 432,
        transactions: 1189,
      },
      items: [
        {
          name: "Margherita Pizza",
          category: "Main Course",
          dayPart: "Dinner",
          qtySold: 190,
          grossSales: 2850,
          netSales: 2750,
        },
        {
          name: "Ribeye Steak",
          category: "Main Course",
          dayPart: "Dinner",
          qtySold: 80,
          grossSales: 5000,
          netSales: 4850,
        },
        {
          name: "Caesar Salad",
          category: "Appetizer",
          dayPart: "Lunch",
          qtySold: 110,
          grossSales: 1320,
          netSales: 1200,
        },
        {
          name: "Fettuccine Alfredo",
          category: "Main Course",
          dayPart: "Lunch",
          qtySold: 90,
          grossSales: 900,
          netSales: 850,
        },
      ],
      modifiers: [
        {
          name: "Extra Cheese",
          linkedItem: "Margherita Pizza",
          count: 45,
          extraRevenue: 135,
        },
        {
          name: "Medium Rare",
          linkedItem: "Ribeye Steak",
          count: 50,
          extraRevenue: 0,
        },
        {
          name: "Spicy",
          linkedItem: "Caesar Salad",
          count: 25,
          extraRevenue: 20,
        },
        {
          name: "Garlic Bread",
          linkedItem: "Fettuccine Alfredo",
          count: 30,
          extraRevenue: 60,
        },
      ],
      labourData: [
        {
          date: "2025-11-11",
          totalHours: 38,
          totalCost: 570,
        },
        {
          date: "2025-11-12",
          totalHours: 42,
          totalCost: 630,
        },
        {
          date: "2025-11-13",
          totalHours: 47,
          totalCost: 705,
        },
        {
          date: "2025-11-14",
          totalHours: 53,
          totalCost: 795,
        },
      ],
    },
  },
  {
    batchId: 3,
    dateRange: "Nov 4-10, 2025",
    location: "Downtown Location",
    source: "Toast POS",
    status: "Imported",
    totalTransactions: 1096,
    nestedView: {
      salseData: {
        totalSales: 19350,
        totalItems: 512,
        totalDiscounts: 600,
        transactions: 1096,
      },
      items: [
        {
          name: "Margherita Pizza",
          category: "Main Course",
          dayPart: "Dinner",
          qtySold: 180,
          grossSales: 2700,
          netSales: 2600,
        },
        {
          name: "Ribeye Steak",
          category: "Main Course",
          dayPart: "Dinner",
          qtySold: 100,
          grossSales: 6000,
          netSales: 5900,
        },
        {
          name: "Caesar Salad",
          category: "Appetizer",
          dayPart: "Lunch",
          qtySold: 120,
          grossSales: 1440,
          netSales: 1320,
        },
        {
          name: "Fettuccine Alfredo",
          category: "Main Course",
          dayPart: "Lunch",
          qtySold: 80,
          grossSales: 800,
          netSales: 750,
        },
      ],
      modifiers: [
        {
          name: "Extra Cheese",
          linkedItem: "Margherita Pizza",
          count: 80,
          extraRevenue: 240,
        },
        {
          name: "Medium Rare",
          linkedItem: "Ribeye Steak",
          count: 65,
          extraRevenue: 0,
        },
        {
          name: "Spicy",
          linkedItem: "Caesar Salad",
          count: 35,
          extraRevenue: 30,
        },
        {
          name: "Garlic Bread",
          linkedItem: "Fettuccine Alfredo",
          count: 45,
          extraRevenue: 90,
        },
      ],
      labourData: [
        {
          date: "2025-11-04",
          totalHours: 50,
          totalCost: 750,
        },
        {
          date: "2025-11-05",
          totalHours: 44,
          totalCost: 660,
        },
        {
          date: "2025-11-06",
          totalHours: 50,
          totalCost: 750,
        },
        {
          date: "2025-11-07",
          totalHours: 52,
          totalCost: 780,
        },
      ],
    },
  },
  {
    batchId: 4,
    dateRange: "Oct 28-Nov 3, 2025",
    location: "Downtown Location",
    source: "Toast POS",
    status: "Imported",
    totalTransactions: 1156,
    nestedView: {
      salseData: {
        totalSales: 17680,
        totalItems: 463,
        totalDiscounts: 500,
        transactions: 1156,
      },
      items: [
        {
          name: "Margherita Pizza",
          category: "Main Course",
          dayPart: "Dinner",
          qtySold: 210,
          grossSales: 3150,
          netSales: 3050,
        },
        {
          name: "Ribeye Steak",
          category: "Main Course",
          dayPart: "Dinner",
          qtySold: 110,
          grossSales: 6600,
          netSales: 6400,
        },
        {
          name: "Caesar Salad",
          category: "Appetizer",
          dayPart: "Lunch",
          qtySold: 140,
          grossSales: 1680,
          netSales: 1550,
        },
        {
          name: "Fettuccine Alfredo",
          category: "Main Course",
          dayPart: "Lunch",
          qtySold: 120,
          grossSales: 1200,
          netSales: 1150,
        },
      ],
      modifiers: [
        {
          name: "Extra Cheese",
          linkedItem: "Margherita Pizza",
          count: 90,
          extraRevenue: 270,
        },
        {
          name: "Medium Rare",
          linkedItem: "Ribeye Steak",
          count: 78,
          extraRevenue: 0,
        },
        {
          name: "Spicy",
          linkedItem: "Caesar Salad",
          count: 55,
          extraRevenue: 45,
        },
        {
          name: "Garlic Bread",
          linkedItem: "Fettuccine Alfredo",
          count: 60,
          extraRevenue: 120,
        },
      ],
      labourData: [
        {
          date: "2025-10-28",
          totalHours: 55,
          totalCost: 825,
        },
        {
          date: "2025-10-29",
          totalHours: 50,
          totalCost: 750,
        },
        {
          date: "2025-10-30",
          totalHours: 56,
          totalCost: 840,
        },
        {
          date: "2025-10-31",
          totalHours: 58,
          totalCost: 870,
        },
      ],
    },
  },
];
