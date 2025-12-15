interface InventorySummaryData {
  selectSummary: string;
  summaryHeader: string;
  status: "Pending" | "Completed" | "In Progress";
  tableData: TableData[];
}
interface TableData {
  id: number;
  area: string;
  itemsCount: string;
  expectedValue: number;
  countedValue: number;
  //variance will calculate from  expected and counted value (varience = expected - counted) varieancce percentage will be (varience/expected * 100)
  variance: number;
  variancePercentage: number;
}

export const inventorySummaryDataArray: InventorySummaryData[] = [
  {
    selectSummary: "Weekly Count - Nov 24, 2025",
    summaryHeader: "Summary by Storage Area",
    status: "Completed", // Added status field
    tableData: [
      {
        id: 1,
        area: "Dry Goods Storage",
        itemsCount: "3 / 3",
        expectedValue: 2450.5,
        countedValue: 2398.2,
        variance: 2450.5 - 2398.2, // -52.3
        variancePercentage: ((2450.5 - 2398.2) / 2450.5) * 100, // -2.1%
      },
      {
        id: 2,
        area: "Walk-in Cooler",
        itemsCount: "4 / 4",
        expectedValue: 4892,
        countedValue: 4756.5,
        variance: 4892 - 4756.5, // -135.5
        variancePercentage: ((4892 - 4756.5) / 4892) * 100, // -2.8%
      },
      {
        id: 3,
        area: "Walk-in Freezer",
        itemsCount: "2 / 2",
        expectedValue: 1372.5,
        countedValue: 1391.25,
        variance: 1372.5 - 1391.25, // 18.75
        variancePercentage: ((1372.5 - 1391.25) / 1372.5) * 100, // +1.4%
      },
    ],
  },
  {
    selectSummary: "Weekly Count - Nov 25, 2025",
    summaryHeader: "Summary by Storage Area",
    status: "In Progress", // Added status field
    tableData: [
      {
        id: 4,
        area: "Dry Goods Storage 2",
        itemsCount: "5 / 5",
        expectedValue: 3600.5,
        countedValue: 3590.7,
        variance: 3600.5 - 3590.7, // -9.8
        variancePercentage: ((3600.5 - 3590.7) / 3600.5) * 100, // -0.3%
      },
      {
        id: 5,
        area: "Walk-in Cooler 2",
        itemsCount: "6 / 6",
        expectedValue: 3200.7,
        countedValue: 3205.4,
        variance: 3200.7 - 3205.4, // 4.7
        variancePercentage: ((3200.7 - 3205.4) / 3200.7) * 100, // +0.1%
      },
      {
        id: 6,
        area: "Walk-in Freezer 2",
        itemsCount: "3 / 3",
        expectedValue: 1500.9,
        countedValue: 1498.4,
        variance: 1500.9 - 1498.4, // -2.5
        variancePercentage: ((1500.9 - 1498.4) / 1500.9) * 100, // -0.2%
      },
    ],
  },
  {
    selectSummary: "Weekly Count - Nov 26, 2025",
    summaryHeader: "Summary by Storage Area",
    status: "Completed", // Added status field
    tableData: [
      {
        id: 7,
        area: "Dry Goods Storage 3",
        itemsCount: "4 / 4",
        expectedValue: 4250.3,
        countedValue: 4232.8,
        variance: 4250.3 - 4232.8, // -17.5
        variancePercentage: ((4250.3 - 4232.8) / 4250.3) * 100, // -0.4%
      },
      {
        id: 8,
        area: "Walk-in Cooler 3",
        itemsCount: "5 / 5",
        expectedValue: 2780.4,
        countedValue: 2775.2,
        variance: 2780.4 - 2775.2, // -5.2
        variancePercentage: ((2780.4 - 2775.2) / 2780.4) * 100, // -0.2%
      },
      {
        id: 9,
        area: "Walk-in Freezer 3",
        itemsCount: "6 / 6",
        expectedValue: 3500.3,
        countedValue: 3487.1,
        variance: 3500.3 - 3487.1, // -13.2
        variancePercentage: ((3500.3 - 3487.1) / 3500.3) * 100, // -0.4%
      },
    ],
  },
  {
    selectSummary: "Weekly Count - Nov 27, 2025",
    summaryHeader: "Summary by Storage Area",
    status: "In Progress", // Added status field
    tableData: [
      {
        id: 10,
        area: "Dry Goods Storage 4",
        itemsCount: "7 / 7",
        expectedValue: 5000.5,
        countedValue: 4995.8,
        variance: 5000.5 - 4995.8, // -4.7
        variancePercentage: ((5000.5 - 4995.8) / 5000.5) * 100, // -0.1%
      },
      {
        id: 11,
        area: "Walk-in Cooler 4",
        itemsCount: "6 / 6",
        expectedValue: 3100.5,
        countedValue: 3099.9,
        variance: 3100.5 - 3099.9, // -0.6
        variancePercentage: ((3100.5 - 3099.9) / 3100.5) * 100, // -0.02%
      },
      {
        id: 12,
        area: "Walk-in Freezer 4",
        itemsCount: "5 / 5",
        expectedValue: 2000.8,
        countedValue: 1999.5,
        variance: 2000.8 - 1999.5, // -1.3
        variancePercentage: ((2000.8 - 1999.5) / 2000.8) * 100, // -0.07%
      },
    ],
  },
  {
    selectSummary: "Weekly Count - Nov 28, 2025",
    summaryHeader: "Summary by Storage Area",
    status: "Completed", // Added status field
    tableData: [
      {
        id: 13,
        area: "Dry Goods Storage 5",
        itemsCount: "3 / 3",
        expectedValue: 2900.3,
        countedValue: 2898.4,
        variance: 2900.3 - 2898.4, // -1.9
        variancePercentage: ((2900.3 - 2898.4) / 2900.3) * 100, // -0.07%
      },
      {
        id: 14,
        area: "Walk-in Cooler 5",
        itemsCount: "4 / 4",
        expectedValue: 5200.2,
        countedValue: 5201.3,
        variance: 5200.2 - 5201.3, // 1.1
        variancePercentage: ((5200.2 - 5201.3) / 5200.2) * 100, // +0.02%
      },
      {
        id: 15,
        area: "Walk-in Freezer 5",
        itemsCount: "2 / 2",
        expectedValue: 1500.4,
        countedValue: 1503.5,
        variance: 1500.4 - 1503.5, // 3.1
        variancePercentage: ((1500.4 - 1503.5) / 1500.4) * 100, // +0.2%
      },
    ],
  },
  {
    selectSummary: "Weekly Count - Nov 29, 2025",
    summaryHeader: "Summary by Storage Area",
    status: "In Progress", // Added status field
    tableData: [
      {
        id: 16,
        area: "Dry Goods Storage 6",
        itemsCount: "6 / 6",
        expectedValue: 4200.3,
        countedValue: 4195.5,
        variance: 4200.3 - 4195.5, // -4.8
        variancePercentage: ((4200.3 - 4195.5) / 4200.3) * 100, // -0.11%
      },
      {
        id: 17,
        area: "Walk-in Cooler 6",
        itemsCount: "5 / 5",
        expectedValue: 3800.5,
        countedValue: 3799.1,
        variance: 3800.5 - 3799.1, // -1.4
        variancePercentage: ((3800.5 - 3799.1) / 3800.5) * 100, // -0.04%
      },
      {
        id: 18,
        area: "Walk-in Freezer 6",
        itemsCount: "4 / 4",
        expectedValue: 1900.4,
        countedValue: 1899.7,
        variance: 1900.4 - 1899.7, // -0.7
        variancePercentage: ((1900.4 - 1899.7) / 1900.4) * 100, // -0.04%
      },
    ],
  },
];
