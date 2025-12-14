// app/inventory/[id]/page.tsx
import {
  InventoryCountData,
  InventoryCountDataComponent,
  inventoryCountDataFromGeneratedData,
} from "@/webcomponent/resturent-management";

console.log();
interface InventoryCountsViewProps {
  data: string;
}

export default async function InventoryCountsView({
  params,
}: {
  params: Promise<InventoryCountsViewProps>;
}) {
  // Find the inventory data by unique id
  const { data } = await params;
  const inventoryItem: InventoryCountData | undefined =
    inventoryCountDataFromGeneratedData.find((item) => item.id === data);
  console.log("inventory Data", inventoryCountDataFromGeneratedData);
  console.log("inventoryItem", inventoryItem);

  if (!inventoryItem) return <div>Inventory not found</div>; // fallback

  return (
    <div className="p-4">
      <InventoryCountDataComponent inventory={inventoryItem} />
    </div>
  );
}
