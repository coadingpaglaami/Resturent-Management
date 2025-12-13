import { TableData } from "./Data";

/**
 * Generate mixed table data
 * @param count Number of rows to generate
 * @param baseData Base sample rows
 */
export function generateMixedTableData(
  count: number,
  baseData: TableData[]
): TableData[] {
  const result: TableData[] = [];
  const getRandom = <T>(arr: T[]): T =>
    arr[Math.floor(Math.random() * arr.length)];

  const names = baseData.map((row) => row.name); // keep original names

  for (let i = 0; i < count; i++) {
    // Cycle through names to repeat them
    const name = names[i % names.length];

    // Randomly pick other fields from any base row
    const randomRow = getRandom(baseData);

    const newRow: TableData = {
      ...randomRow,
      name, // use cycled name
    };

    result.push(newRow);
  }

  return result;
}
