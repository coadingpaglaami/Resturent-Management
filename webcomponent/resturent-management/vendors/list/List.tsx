"use client";
import { ButtonIcon, Heading } from "@/webcomponent/reusable";
import { Plus } from "lucide-react";
import { vendors } from "./Data";
import { VendorsTable } from "./VendorTable";
import { useState } from "react";
import { AddVendor } from "./AddVendor";
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from "@/components/ui/dialog";

export const List = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const vendorData = vendors;
  return (
    <div className="py-16 flex flex-col gap-3.5">
      <div className="flex md:flex-row flex-col md:justify-between gap-2.5">
        <Heading
          title="Vendors"
          subtitle="Manage your vendor relationships and order guides"
        />
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen} >
          <DialogTrigger asChild className="overflow-y-auto">
         <ButtonIcon
            icon={<Plus />}
            varient="primary"
            onClick={() => setDialogOpen(!dialogOpen)}
          >
            Add Vendor
          </ButtonIcon>
          </DialogTrigger>

          <DialogContent >
            {/* <AddVendor /> */}
            <DialogHeader>
              Add Vendor
            </DialogHeader>
            <AddVendor onOpenChange={setDialogOpen} />
          </DialogContent>
        </Dialog>
      </div>
      <VendorsTable vendors={vendorData} />
    </div>
  );
};
