"use client";

import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

export const UnitAndConversation = () => {
  // State for each checkbox
  const [weightUnits, setWeightUnits] = useState({
    grams: true,
    kilograms: true,
    ounces: true,
    pounds: true,
  });

  const [volumeUnits, setVolumeUnits] = useState({
    milliliters: true,
    liters: true,
    fluidOunces: true,
    cups: true,
    tablespoons: true,
    teaspoons: true,
  });

  const handleWeightChange = (key: keyof typeof weightUnits) => {
    setWeightUnits((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleVolumeChange = (key: keyof typeof volumeUnits) => {
    setVolumeUnits((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSave = () => {
    console.log("Saved units:", { weightUnits, volumeUnits });
    // Add save logic here
  };

  return (
    <div className="py-16 flex flex-col gap-8">
      <div>
        <h2 className="text-2xl font-semibold">Units & Conversions</h2>
      </div>

      <Card>
        <CardContent className="p-6 space-y-8">
          {/* Weight Units */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-muted-foreground">Weight Units</h3>
            <div className="space-y-3">
              {[
                { key: "grams", label: "Grams (g)" },
                { key: "kilograms", label: "Kilograms (kg)" },
                { key: "ounces", label: "Ounces (oz)" },
                { key: "pounds", label: "Pounds (lb)" },
              ].map((unit) => (
                <div
                  key={unit.key}
                  className="flex items-center gap-4 px-4 py-3 rounded-lg bg-muted/40 hover:bg-muted/60 transition-colors"
                >
                  <Checkbox
                    id={unit.key}
                    checked={weightUnits[unit.key as keyof typeof weightUnits]}
                    onCheckedChange={() => handleWeightChange(unit.key as keyof typeof weightUnits)}
                  />
                  <Label
                    htmlFor={unit.key}
                    className="flex-1 cursor-pointer text-base font-medium"
                  >
                    {unit.label}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Volume Units */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-muted-foreground">Volume Units</h3>
            <div className="space-y-3">
              {[
                { key: "milliliters", label: "Milliliters (ml)" },
                { key: "liters", label: "Liters (L)" },
                { key: "fluidOunces", label: "Fluid Ounces (fl oz)" },
                { key: "cups", label: "Cups" },
                { key: "tablespoons", label: "Tablespoons" },
                { key: "teaspoons", label: "Teaspoons" },
              ].map((unit) => (
                <div
                  key={unit.key}
                  className="flex items-center gap-4 px-4 py-3 rounded-lg bg-muted/40 hover:bg-muted/60 transition-colors"
                >
                  <Checkbox
                    id={unit.key}
                    checked={volumeUnits[unit.key as keyof typeof volumeUnits]}
                    onCheckedChange={() => handleVolumeChange(unit.key as keyof typeof volumeUnits)}
                  />
                  <Label
                    htmlFor={unit.key}
                    className="flex-1 cursor-pointer text-base font-medium"
                  >
                    {unit.label}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Save Button */}
          <div className="pt-4">
            <Button onClick={handleSave} variant={'buttonBlue'}>Save Changes</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};