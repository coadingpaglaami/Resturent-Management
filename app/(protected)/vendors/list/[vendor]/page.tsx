import {
  Vendor,
  VendorData,
  vendors,
} from "@/webcomponent/resturent-management";

export default async function VendorPage({
  params,
}: {
  params: Promise<{ vendor: string }>;
}) {
  // Find the inventory data by unique id
  const { vendor } = await params;
  const vendorData: Vendor | undefined = vendors.find(
    (item) => item.id === vendor
  );

  if (!vendorData) return <div>Vendor not found</div>; // fallback
  return <VendorData vendorData={vendorData} />;
}
