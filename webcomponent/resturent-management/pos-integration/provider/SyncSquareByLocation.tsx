"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGetLocationsQuery } from "@/api/location";
import { toast } from "sonner";
import { useSyncToInventoryMutation } from "@/api/pos";
import { PosProvider } from "@/interface/pos";

export const SquareSyncByLocation = ({ provider }: { provider: string }) => {
  const [location_id, setLocationId] = useState<string>("");

  const { data, isLoading } = useGetLocationsQuery({ page: 1, limit: 100 });

  const { mutateAsync, isPending } = useSyncToInventoryMutation();

  // adjust this depending on your API response structure
  const locations = data?.results ?? [];

  const handleSync = async () => {
    if (!location_id) return;

    try {
      await mutateAsync({ provider: provider as PosProvider, location_id });
      toast.success("POS synced successfully ");
    } catch (err) {
      const error = err as Error;
      toast.error(error?.message || "Sync failed ❌");
    }
  };

  return (
    <div className="w-full flex flex-col gap-4 py-6">
      <div className="flex flex-col gap-2">
        <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
          Select Location
        </p>

        <Select value={location_id} onValueChange={setLocationId}>
          <SelectTrigger className="w-full">
            <SelectValue
              placeholder={isLoading ? "Loading..." : "Select location"}
            />
          </SelectTrigger>

          <SelectContent>
            {locations?.map((loc) => (
              <SelectItem key={loc.id} value={loc.id}>
                {loc.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Button
        onClick={handleSync}
        disabled={!location_id || isPending}
        className="w-fit "
        variant={"secondary"}
      >
        {isPending ? "Syncing..." : "Sync Inventory"}
      </Button>
    </div>
  );
};
