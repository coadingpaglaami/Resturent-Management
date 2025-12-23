"use client";

import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import {  CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

type NotificationPreference = {
  id: string;
  label: string;
  description: string;
  checked: boolean;
};

export const Notification=()=>{
    const [preferences, setPreferences] = useState<NotificationPreference[]>([
    {
      id: "low-inventory",
      label: "Low inventory alerts",
      description: "Get notified when ingredients are running low",
      checked: true,
    },
    {
      id: "price-changes",
      label: "Price change alerts",
      description: "Notify when vendor prices change significantly",
      checked: false,
    },
    {
      id: "variance-threshold",
      label: "Variance threshold exceeded",
      description: "Alert when variance exceeds set threshold",
      checked: true,
    },
    {
      id: "weekly-reports",
      label: "Weekly reports",
      description: "Receive weekly summary reports via email",
      checked: true,
    },
    {
      id: "pos-import",
      label: "POS import completion",
      description: "Notify when POS data import completes",
      checked: false,
    },
  ]);

  const togglePreference = (id: string) => {
    setPreferences((prev) =>
      prev.map((pref) =>
        pref.id === id ? { ...pref, checked: !pref.checked } : pref
      )
    );
  };

  const handleSave = () => {
    console.log("Saved preferences:", preferences.filter(p => p.checked).map(p => p.label));
    // Add save logic here
  };
    return(
        <div className=" flex flex-col gap-8">
      <h2 className="text-2xl font-semibold">Notification Preferences</h2>

      <div className="bg-transparent">
        <CardContent className="p-6 space-y-4">
          {preferences.map((pref) => (
            <div
              key={pref.id}
              className="flex items-start gap-4 p-4 rounded-lg bg-muted/40 hover:bg-muted/60 transition-colors"
            >
              {/* Custom styled checkbox */}
              <div className="mt-0.5">
                <Checkbox
                  id={pref.id}
                  checked={pref.checked}
                  onCheckedChange={() => togglePreference(pref.id)}
                  className="data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600 dark:data-[state=checked]:bg-transparent dark:data-[state=checked]:border-gray-300 border-2 dbg-transparent w-5 h-5 rounded"
                />
              </div>

              <Label
                htmlFor={pref.id}
                className="flex-1 cursor-pointer space-y-1"
              >
                <div className="font-medium text-base">{pref.label}</div>
                <p className="text-sm text-muted-foreground">{pref.description}</p>
              </Label>
            </div>
          ))}

          <div className="pt-4" >
            <Button onClick={handleSave} variant={'buttonBlue'}>Save Preferences</Button>
          </div>
        </CardContent>
      </div>
    </div>
    )
}