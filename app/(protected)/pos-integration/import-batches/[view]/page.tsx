import { BatchDetails, ImportBatch, importBatchData } from "@/webcomponent/resturent-management";

export default async function BatchDetailsPage({params}: { params: Promise<{ view: number }> }) {

    const { view } =  await params;
        console.log("view param", view)
      const batchData: ImportBatch | undefined =
        importBatchData.find((item) => item.batchId === Number(view));
      console.log("inventory Data", importBatchData);
      console.log("batchData", batchData);
    
      if (!batchData) return <div>Inventory not found</div>; // fallback


    return (
        <BatchDetails 
        batch={batchData}
        />
    )
}