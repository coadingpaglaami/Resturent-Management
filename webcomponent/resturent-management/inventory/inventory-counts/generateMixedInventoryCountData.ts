import { InventoryCountData } from "./Data";

/**
 * Generate mixed Inventory Count table data with numeric IDs
 */
export function generateMixedInventoryCountData(
  count: number,
  baseData: InventoryCountData[]
): InventoryCountData[] {
  const result: InventoryCountData[] = [];

  const getRandom = <T,>(arr: T[]): T =>
    arr[Math.floor(Math.random() * arr.length)];

  const names = baseData.map((row) => row.name);

  for (let i = 0; i < count; i++) {
    const name = names[i % names.length];
    const randomRow = getRandom(baseData);

    const mixedRow: InventoryCountData = {
      id: i.toString(), // ✅ Numeric ID as string
      name,
      location: randomRow.location,
      date: randomRow.date,
      dateCreation: randomRow.dateCreation,
      lastUpdated: randomRow.lastUpdated,
      status: randomRow.status,
      viewTable: randomRow.viewTable?.map((section) => ({
        header: section.header,
        view: section.view.map((item) => ({
          ...item,
          actualCount:
            item.actualCount + Math.floor(Math.random() * 3 - 1), // ±1
        })),
      })),
    };

    result.push(mixedRow);
  }

  return result;
}
