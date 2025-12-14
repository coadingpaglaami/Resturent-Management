import { generateMixedInventoryCountData } from "./generateMixedInventoryCountData";

export interface InventoryCountData {
  id: string; // ✅ UNIQUE ID
  name: string;
  location: string;
  date: string;
  dateCreation: string;
  lastUpdated: string;
  status: "Pending" | "Complete";
  viewTable?: {
    header: string;
    view: View[];
  }[];
}

export interface View {
  productName: string;
  productId: string;
  expected: string;
  unit: string;
  expectedValue: number;
  actualCount: number;
  unitPrice: string;
}

/**
 * Base inventory count data (seed data)
 */
export const inventoryCountData: InventoryCountData[] = [
  {
    id: "base-1",
    name: "Weekly Count - Nov 18",
    location: "Freezer",
    date: "2025-11-18",
    dateCreation: "2025-11-18 14:30",
    lastUpdated: "2025-11-18 14:30",
    status: "Pending",
    viewTable: [
      {
        header: "Dry Goods Storage",
        view: [
          {
            productName: "Organic Flour",
            productId: "1",
            expected: "6",
            unit: "lb",
            expectedValue: 6 * 0.8,
            actualCount: 8,
            unitPrice: "0.80",
          },
          {
            productName: "Extra Virgin Olive Oil",
            productId: "2",
            expected: "125",
            unit: "oz",
            expectedValue: 125 * 24.2,
            actualCount: 110,
            unitPrice: "24.20",
          },
        ],
      },
    ],
  },
  {
    id: "base-2",
    name: "Weekly Count - Nov 11",
    location: "Freezer",
    date: "2025-11-11",
    dateCreation: "2025-11-11 05:15",
    lastUpdated: "2025-11-11 05:15",
    status: "Complete",
    viewTable: [
      {
        header: "Walk-In Cooler",
        view: [
          {
            productName: "Ribeye Steak",
            productId: "4",
            expected: "25",
            unit: "lb",
            expectedValue: 25 * 14.6,
            actualCount: 20,
            unitPrice: "14.60",
          },
        ],
      },
    ],
  },
];

/**
 * ✅ Generated data (75 rows with unique IDs)
 */
export const inventoryCountDataFromGeneratedData: InventoryCountData[] =
  generateMixedInventoryCountData(75, inventoryCountData);
