import { ButtonIcon, Heading } from "@/webcomponent/reusable";
import { Plus } from "lucide-react";
import { vendors } from "./Data";
import { VendorsTable } from "./VendorTable";

export const List = () => {
  const vendorData = vendors;
  return (
    <div className="py-16 flex flex-col gap-3.5">
      <div className="flex md:flex-row flex-col md:justify-between gap-2.5">
        <Heading
          title="Vendors"
          subtitle="Manage your vendor relationships and order guides"
        />
        <ButtonIcon icon={<Plus />} varient="primary">
          Add Vendor
        </ButtonIcon>
      </div>
      <VendorsTable vendors={vendorData} />
    </div>
  );
};
