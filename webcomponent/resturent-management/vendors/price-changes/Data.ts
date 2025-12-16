export interface PriceChangeData {
  duration:
    | "Last 7 Days"
    | "Last 30 Days"
    | "Last 90 Days"
    | "Last 6 Months"
    | "Last Year";
  tablePriceChangeData: TablePriceChangeData[];
}

export interface TablePriceChangeData {
  ingredientName: string;
  vendorName: string;
  oldPrice: string;
  newPrice: string;
  dateChanged: string;
}

export const priceChangeData: PriceChangeData[] = [
  {
    duration: "Last 7 Days",
    tablePriceChangeData: [
      {
        ingredientName: "Ribeye Steak",
        vendorName: "Sysco Foods",
        oldPrice: "$145.00",
        newPrice: "$146.00",
        dateChanged: "2025-11-22",
      },
      {
        ingredientName: "Atlantic Salmon",
        vendorName: "US Foods",
        oldPrice: "$96.00",
        newPrice: "$97.00",
        dateChanged: "2025-11-21",
      },
      {
        ingredientName: "Roma Tomatoes",
        vendorName: "Restaurant Depot",
        oldPrice: "$46.25",
        newPrice: "$46.50",
        dateChanged: "2025-11-20",
      },
      {
        ingredientName: "Pineapple",
        vendorName: "Fresh Farms",
        oldPrice: "$5.00",
        newPrice: "$5.10",
        dateChanged: "2025-11-19",
      },
      {
        ingredientName: "Cod Fish",
        vendorName: "Ocean Fresh",
        oldPrice: "$25.00",
        newPrice: "$25.50",
        dateChanged: "2025-11-18",
      },
      {
        ingredientName: "Carrots",
        vendorName: "Grocery Hub",
        oldPrice: "$12.00",
        newPrice: "$12.25",
        dateChanged: "2025-11-17",
      },
    ],
  },
  {
    duration: "Last 30 Days",
    tablePriceChangeData: [
      {
        ingredientName: "Ribeye Steak",
        vendorName: "Sysco Foods",
        oldPrice: "$145.00",
        newPrice: "$147.00",
        dateChanged: "2025-11-15",
      },
      {
        ingredientName: "Atlantic Salmon",
        vendorName: "US Foods",
        oldPrice: "$96.00",
        newPrice: "$98.00",
        dateChanged: "2025-11-10",
      },
      {
        ingredientName: "Roma Tomatoes",
        vendorName: "Restaurant Depot",
        oldPrice: "$46.25",
        newPrice: "$47.00",
        dateChanged: "2025-11-05",
      },
      {
        ingredientName: "Pineapple",
        vendorName: "Fresh Farms",
        oldPrice: "$5.00",
        newPrice: "$5.50",
        dateChanged: "2025-11-02",
      },
      {
        ingredientName: "Cod Fish",
        vendorName: "Ocean Fresh",
        oldPrice: "$25.00",
        newPrice: "$26.00",
        dateChanged: "2025-10-30",
      },
      {
        ingredientName: "Carrots",
        vendorName: "Grocery Hub",
        oldPrice: "$12.00",
        newPrice: "$12.50",
        dateChanged: "2025-10-28",
      },
    ],
  },
  {
    duration: "Last 90 Days",
    tablePriceChangeData: [
      {
        ingredientName: "Ribeye Steak",
        vendorName: "Sysco Foods",
        oldPrice: "$145.00",
        newPrice: "$150.00",
        dateChanged: "2025-08-20",
      },
      {
        ingredientName: "Atlantic Salmon",
        vendorName: "US Foods",
        oldPrice: "$96.00",
        newPrice: "$100.00",
        dateChanged: "2025-08-18",
      },
      {
        ingredientName: "Roma Tomatoes",
        vendorName: "Restaurant Depot",
        oldPrice: "$46.25",
        newPrice: "$48.00",
        dateChanged: "2025-08-15",
      },
      {
        ingredientName: "Pineapple",
        vendorName: "Fresh Farms",
        oldPrice: "$5.00",
        newPrice: "$5.75",
        dateChanged: "2025-08-10",
      },
      {
        ingredientName: "Cod Fish",
        vendorName: "Ocean Fresh",
        oldPrice: "$25.00",
        newPrice: "$28.00",
        dateChanged: "2025-08-05",
      },
      {
        ingredientName: "Carrots",
        vendorName: "Grocery Hub",
        oldPrice: "$12.00",
        newPrice: "$13.00",
        dateChanged: "2025-08-02",
      },
    ],
  },
  {
    duration: "Last 6 Months",
    tablePriceChangeData: [
      {
        ingredientName: "Ribeye Steak",
        vendorName: "Sysco Foods",
        oldPrice: "$145.00",
        newPrice: "$155.00",
        dateChanged: "2025-05-15",
      },
      {
        ingredientName: "Atlantic Salmon",
        vendorName: "US Foods",
        oldPrice: "$96.00",
        newPrice: "$105.00",
        dateChanged: "2025-05-12",
      },
      {
        ingredientName: "Roma Tomatoes",
        vendorName: "Restaurant Depot",
        oldPrice: "$46.25",
        newPrice: "$50.00",
        dateChanged: "2025-05-08",
      },
      {
        ingredientName: "Pineapple",
        vendorName: "Fresh Farms",
        oldPrice: "$5.00",
        newPrice: "$6.00",
        dateChanged: "2025-05-04",
      },
      {
        ingredientName: "Cod Fish",
        vendorName: "Ocean Fresh",
        oldPrice: "$25.00",
        newPrice: "$30.00",
        dateChanged: "2025-05-01",
      },
      {
        ingredientName: "Carrots",
        vendorName: "Grocery Hub",
        oldPrice: "$12.00",
        newPrice: "$14.00",
        dateChanged: "2025-04-28",
      },
    ],
  },
  {
    duration: "Last Year",
    tablePriceChangeData: [
      {
        ingredientName: "Ribeye Steak",
        vendorName: "Sysco Foods",
        oldPrice: "$145.00",
        newPrice: "$160.00",
        dateChanged: "2024-11-22",
      },
      {
        ingredientName: "Atlantic Salmon",
        vendorName: "US Foods",
        oldPrice: "$96.00",
        newPrice: "$110.00",
        dateChanged: "2024-11-20",
      },
      {
        ingredientName: "Roma Tomatoes",
        vendorName: "Restaurant Depot",
        oldPrice: "$46.25",
        newPrice: "$55.00",
        dateChanged: "2024-11-18",
      },
      {
        ingredientName: "Pineapple",
        vendorName: "Fresh Farms",
        oldPrice: "$5.00",
        newPrice: "$6.50",
        dateChanged: "2024-11-15",
      },
      {
        ingredientName: "Cod Fish",
        vendorName: "Ocean Fresh",
        oldPrice: "$25.00",
        newPrice: "$35.00",
        dateChanged: "2024-11-10",
      },
      {
        ingredientName: "Carrots",
        vendorName: "Grocery Hub",
        oldPrice: "$12.00",
        newPrice: "$16.00",
        dateChanged: "2024-11-08",
      },
    ],
  },
];
