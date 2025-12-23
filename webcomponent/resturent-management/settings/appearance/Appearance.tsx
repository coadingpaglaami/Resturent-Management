"use client";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {  CardContent } from "@/components/ui/card";
import { useTheme } from "next-themes";
export const Appearance=()=>{
    const { theme, setTheme } = useTheme();
    return(
        <div className="p-3.5 flex flex-col gap-8">
      <h2 className="text-2xl font-semibold">Appearance</h2>

      <div>
        <CardContent className="p-6 space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium">Theme</label>
            <Select value={theme} onValueChange={setTheme}>
              <SelectTrigger className="w-full max-w-md">
                <SelectValue placeholder="Select theme" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">Light Theme</SelectItem>
                <SelectItem value="dark">Dark Theme</SelectItem>
                <SelectItem value="system">System Preference</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button onClick={() => setTheme(theme === "light" ? "dark" : "light")} variant={'buttonBlue'}>
            Save Appearance Settings
          </Button>
        </CardContent>
      </div>
    </div>
    )
}