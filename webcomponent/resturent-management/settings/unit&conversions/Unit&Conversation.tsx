"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { toast } from "sonner"; // or your toast library
import { useGetUnitListQuery, useUpdateUnitMutation } from "@/api/units/query";

export const UnitAndConversation = () => {
  // Fetch units with object destructuring
  const {
    data: unitsData,
    isLoading,
    isError,
    error,
    refetch,
  } = useGetUnitListQuery({ page: 1, limit: 100 });

  // Update mutation with object destructuring
  const { mutate: updateUnit, isPending: isUpdating } = useUpdateUnitMutation();

  const handleUnitToggle = (unitId: string, currentIsActive: boolean) => {
    updateUnit(
      {
        id: unitId,
        payload: { is_active: !currentIsActive },
      },
      {
        onSuccess: () => {
          refetch(); // Refetch the data after successful update
          toast.success("Unit updated successfully");
        },
        onError: (error) => {
          toast.error(`Failed to update unit: ${error.message}`);
        },
      },
    );
  };

  // Separate units by type
  const weightUnits =
    unitsData?.results?.filter((unit) => unit.unit_type === "weight") || [];

  const volumeUnits =
    unitsData?.results?.filter((unit) => unit.unit_type === "volume") || [];

  if (isLoading) {
    return (
      <div className="py-16 flex flex-col gap-8">
        <div>
          <h2 className="text-2xl font-semibold">Units & Conversions</h2>
        </div>
        <Card>
          <CardContent className="p-6">
            <p className="text-muted-foreground">Loading units...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="py-16 flex flex-col gap-8">
        <div>
          <h2 className="text-2xl font-semibold">Units & Conversions</h2>
        </div>
        <Card>
          <CardContent className="p-6">
            <p className="text-destructive">Error: {error.message}</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="py-16 flex flex-col gap-8">
      <div>
        <h2 className="text-2xl font-semibold">Units & Conversions</h2>
      </div>

      <Card>
        <CardContent className="p-6 space-y-8">
          {/* Weight Units */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-muted-foreground">
              Weight Units
            </h3>
            <div className="space-y-3">
              {weightUnits.map((unit) => (
                <div
                  key={unit.id}
                  className="flex items-center gap-4 px-4 py-3 rounded-lg bg-muted/40 hover:bg-muted/60 transition-colors"
                >
                  <Checkbox
                    id={unit.id}
                    checked={unit.is_active}
                    onCheckedChange={() =>
                      handleUnitToggle(unit.id, unit.is_active)
                    }
                    disabled={isUpdating}
                  />
                  <Label
                    htmlFor={unit.id}
                    className="flex-1 cursor-pointer text-base font-medium"
                  >
                    {unit.name} ({unit.symbol})
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Volume Units */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-muted-foreground">
              Volume Units
            </h3>
            <div className="space-y-3">
              {volumeUnits.map((unit) => (
                <div
                  key={unit.id}
                  className="flex items-center gap-4 px-4 py-3 rounded-lg bg-muted/40 hover:bg-muted/60 transition-colors"
                >
                  <Checkbox
                    id={unit.id}
                    checked={unit.is_active}
                    onCheckedChange={() =>
                      handleUnitToggle(unit.id, unit.is_active)
                    }
                    disabled={isUpdating}
                  />
                  <Label
                    htmlFor={unit.id}
                    className="flex-1 cursor-pointer text-base font-medium"
                  >
                    {unit.name} ({unit.symbol})
                  </Label>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
