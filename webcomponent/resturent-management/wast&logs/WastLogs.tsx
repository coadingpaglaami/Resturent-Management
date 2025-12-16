"use client";

import React from "react";
import { format } from "date-fns";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Plus, Trash2, Calendar } from "lucide-react";

import { ButtonIcon, Heading } from "@/webcomponent/reusable";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";

const locations = [
  "Freezer",
  "Walk-in Cooler",
  "Walk-in Freezer",
  "Dry Storage",
];
const units = ["lb", "oz", "each", "bunch", "kg"];
const reasons = [
  "Spoilage",
  "Overcooked",
  "Misfire",
  "Comp",
  "Dropped",
  "Expired",
  "Other",
];

const ingredients = [
  { name: "Ribeye Steak", unitCost: 15 },
  { name: "Atlantic Salmon", unitCost: 12 },
  { name: "Roma Tomatoes", unitCost: 1.85 },
  { name: "Fresh Basil", unitCost: 2.25 },
  { name: "Organic Flour", unitCost: 0.015 },
];

const wasteEntrySchema = z.object({
  ingredient: z.string().min(1, "Ingredient is required"),
  quantity: z.number().positive("Quantity must be greater than 0"),
  unit: z.string().min(1, "Unit is required"),
  reason: z.string().min(1, "Reason is required"),
});

const formSchema = z.object({
  date: z.date({
    error: "A valid date is required",
  }),
  location: z.string().min(1, "Location is required"),
  entries: z
    .array(wasteEntrySchema)
    .min(1, "At least one waste entry is required"),
});

type FormValues = z.infer<typeof formSchema>;

interface WasteLog {
  id: string;
  date: string;
  location: string;
  totalCost: number;
}

export const WasteLogs = () => {
  const today = new Date();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      date: today,
      location: "Freezer",
      entries: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "entries",
  });

  const watchedEntries = form.watch("entries");

  // State for the temporary new entry row
  const [newEntry, setNewEntry] = React.useState<{
    ingredient: string;
    quantity: number;
    unit: string;
    reason: string;
  }>({
    ingredient: "",
    quantity: 0,
    unit: "",
    reason: "",
  });

  // Calculate total cost in real-time
  const totalCurrentCost = watchedEntries.reduce((sum, entry) => {
    const ingredient = ingredients.find((i) => i.name === entry.ingredient);
    const cost = ingredient ? entry.quantity * ingredient.unitCost : 0;
    return sum + cost;
  }, 0);

  const [pastLogs] = React.useState<WasteLog[]>([
    {
      id: "1",
      date: "2025-11-24",
      location: "Downtown Location",
      totalCost: 45.5,
    },
    {
      id: "2",
      date: "2025-11-23",
      location: "Downtown Location",
      totalCost: 288.75,
    },
    {
      id: "3",
      date: "2025-11-22",
      location: "Downtown Location",
      totalCost: 59.73,
    },
    {
      id: "4",
      date: "2025-11-21",
      location: "Downtown Location",
      totalCost: 31.8,
    },
  ]);

  const onSubmit = (data: FormValues) => {
    console.log("Saved Waste Log:", data, "Total Cost:", totalCurrentCost);
    // Save to backend / update pastLogs here
    form.reset({
      date: today,
      location: "Freezer",
      entries: [],
    });
    setNewEntry({
      ingredient: "",
      quantity: 0,
      unit: "",
      reason: "",
    });
  };

  const isAddButtonDisabled =
    !newEntry.ingredient ||
    newEntry.quantity <= 0 ||
    !newEntry.unit ||
    !newEntry.reason;

  const handleAddEntry = () => {
    if (isAddButtonDisabled) return;

    append({
      ingredient: newEntry.ingredient,
      quantity: newEntry.quantity,
      unit: newEntry.unit,
      reason: newEntry.reason,
    });

    setNewEntry({
      ingredient: "",
      quantity: 0,
      unit: "",
      reason: "",
    });
  };

  return (
    <div className="py-16 flex flex-col gap-8">
      <Heading title="Waste & Logs" subtitle="Track and analyze food waste" />

      {/* Add Daily Waste Log */}
      <Card>
        <CardHeader>
          <CardTitle>Add Daily Waste Log</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              {/* Date & Location */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Date</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl className="w-full">
                            <Button
                              variant="outline"
                              className={cn(
                                "pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <Calendar className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <CalendarComponent
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) =>
                              date > new Date() || date < new Date("1900-01-01")
                            }
                            autoFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Location</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <FormControl className="w-full">
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {locations.map((loc) => (
                            <SelectItem key={loc} value={loc}>
                              {loc}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* New Entry Input Row */}
              <div className="flex md:flex-row md:justify-between flex-col gap-4 md:gap-6 items-end">
                <div className="flex-1 flex flex-col gap-2">
                  <Label>Select Ingredient</Label>
                  <Select
                    value={newEntry.ingredient}
                    onValueChange={(value) =>
                      setNewEntry((prev) => ({ ...prev, ingredient: value }))
                    }
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select ingredient..." />
                    </SelectTrigger>
                    <SelectContent>
                      {ingredients.map((ing) => (
                        <SelectItem key={ing.name} value={ing.name}>
                          {ing.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex flex-col gap-2">
                  <Label>Quantity</Label>
                  <Input
                    type="number"
                    min="0"
                    step="any"
                    placeholder="0"
                    value={newEntry.quantity || ""}
                    onChange={(e) =>
                      setNewEntry((prev) => ({
                        ...prev,
                        quantity: parseFloat(e.target.value) || 0,
                      }))
                    }
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <Label>Unit</Label>
                  <Select
                    value={newEntry.unit}
                    onValueChange={(value) =>
                      setNewEntry((prev) => ({ ...prev, unit: value }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Unit" />
                    </SelectTrigger>
                    <SelectContent>
                      {units.map((u) => (
                        <SelectItem key={u} value={u}>
                          {u}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex flex-col gap-2">
                  <Label>Reason</Label>
                  <Select
                    value={newEntry.reason}
                    onValueChange={(value) =>
                      setNewEntry((prev) => ({ ...prev, reason: value }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select reason..." />
                    </SelectTrigger>
                    <SelectContent>
                      {reasons.map((r) => (
                        <SelectItem key={r} value={r}>
                          {r}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="md:col-span-2">
                  <Button
                    type="button"
                    size="lg"
                    className="w-full bg-green-600 hover:bg-green-700"
                    disabled={isAddButtonDisabled}
                    onClick={handleAddEntry}
                  >
                    <Plus className="h-5 w-5" />
                  </Button>
                </div>
              </div>

              {/* Display Added Entries */}
              {fields.length > 0 && (
                <div className="space-y-4 mt-8">
                  <Separator />
                  {fields.map((field, index) => {
                    const entry = watchedEntries[index];
                    const ingredient = ingredients.find(
                      (i) => i.name === entry?.ingredient
                    );
                    const entryCost = ingredient
                      ? (entry?.quantity || 0) * ingredient.unitCost
                      : 0;

                    return (
                      <div
                        key={field.id}
                        className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center py-4 px-6 rounded-lg bg-muted/50"
                      >
                        <div className="md:col-span-3 font-medium">
                          {entry?.ingredient}
                        </div>

                        <div className="md:col-span-2 text-center">
                          {entry?.quantity} {entry?.unit}
                        </div>

                        <div className="md:col-span-3">
                          <Badge variant="secondary">{entry?.reason}</Badge>
                        </div>

                        <div className="md:col-span-2 text-right">
                          <span className="text-lg font-medium text-red-400">
                            ${entryCost.toFixed(2)}
                          </span>
                        </div>

                        <div className="md:col-span-2 flex justify-end">
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={() => remove(index)}
                            className="text-red-400 hover:text-red-500 hover:bg-red-50"
                          >
                            <Trash2 className="h-5 w-5" />
                          </Button>
                        </div>
                      </div>
                    );
                  })}

                  <div className="text-right text-2xl font-bold text-red-400 pt-6">
                    Total Cost: ${totalCurrentCost.toFixed(2)}
                  </div>
                </div>
              )}

              {/* Save Button */}
              <ButtonIcon
                type="submit"
                icon={undefined}
                disabled={fields.length === 0}
              >
                Save Waste Log
              </ButtonIcon>
            </form>
          </Form>
        </CardContent>
      </Card>

      {/* Past Waste Logs */}
      <Card>
        <CardHeader>
          <CardTitle>Past Waste Logs</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Items</TableHead>
                <TableHead>Total Cost</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pastLogs.map((log) => (
                <TableRow key={log.id}>
                  <TableCell>{log.date}</TableCell>
                  <TableCell>{log.location}</TableCell>
                  <TableCell>—</TableCell>
                  <TableCell className="text-red-400 font-medium">
                    ${log.totalCost.toFixed(2)}
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="icon">
                      <Trash2 className="h-4 w-4 text-red-400" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};
