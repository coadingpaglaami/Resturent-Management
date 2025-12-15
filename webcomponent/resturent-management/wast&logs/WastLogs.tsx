"use client";

import React, { useState } from "react";
import { format } from "date-fns";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Plus, Trash2 } from "lucide-react";

import { Heading } from "@/webcomponent/reusable";
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
  quantity: z.coerce.number().positive("Quantity must be greater than 0"),
  unit: z.string().min(1, "Unit is required"),
  reason: z.string().min(1, "Reason is required"),
});

const formSchema = z.object({
  date: z.string(),
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
  const today = format(new Date(), "MM/dd/yyyy");

  const [pastLogs, setPastLogs] = useState<WasteLog[]>([
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

  const form = useForm({
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
  const location = form.watch("location");

  // Calculate total cost in real-time
  const totalCurrentCost = watchedEntries.reduce((sum, entry) => {
    const ingredient = ingredients.find((i) => i.name === entry.ingredient);
    const cost = ingredient
      ? (entry.quantity as number) * ingredient.unitCost
      : 0;
    return sum + cost;
  }, 0);

  const onSubmit = (data: FormValues) => {
    const newLog: WasteLog = {
      id: Date.now().toString(),
      date: data.date,
      location: data.location,
      totalCost: totalCurrentCost,
    };

    setPastLogs([newLog, ...pastLogs]);
    form.reset();
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
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Date</FormLabel>
                      <FormControl>
                        <Input {...field} readOnly />
                      </FormControl>
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
                        <FormControl>
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

              {/* Dynamic Waste Entries */}
              <div className="space-y-4">
                <Label>Add Waste Entries</Label>
                {fields.map((field, index) => {
                  const ingredient = ingredients.find(
                    (i) => i.name === watchedEntries[index]?.ingredient
                  );
                  const entryCost = ingredient
                    ? (watchedEntries[index]?.quantity as number) *
                      ingredient.unitCost
                    : 0;

                  return (
                    <div
                      key={field.id}
                      className="grid grid-cols-1 md:grid-cols-6 gap-4 items-end"
                    >
                      <FormField
                        control={form.control}
                        name={`entries.${index}.ingredient`}
                        render={({ field }) => (
                          <FormItem className="md:col-span-2">
                            <Select
                              onValueChange={field.onChange}
                              value={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select ingredient..." />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {ingredients.map((ing) => (
                                  <SelectItem key={ing.name} value={ing.name}>
                                    {ing.name}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name={`entries.${index}.quantity`}
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input
                                type="number"
                                min="0"
                                step="any"
                                {...field}
                                value={field.value as number}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name={`entries.${index}.unit`}
                        render={({ field }) => (
                          <FormItem>
                            <Select
                              onValueChange={field.onChange}
                              value={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {units.map((u) => (
                                  <SelectItem key={u} value={u}>
                                    {u}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name={`entries.${index}.reason`}
                        render={({ field }) => (
                          <FormItem>
                            <Select
                              onValueChange={field.onChange}
                              value={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {reasons.map((r) => (
                                  <SelectItem key={r} value={r}>
                                    {r}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-red-400">
                          ${entryCost.toFixed(2)}
                        </span>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => remove(index)}
                          className="text-red-400 hover:text-red-300"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  );
                })}

                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    append({
                      ingredient: "",
                      quantity: 0,
                      unit: "lb",
                      reason: "Spoilage",
                    })
                  }
                  className="w-full"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Add Waste Entry
                </Button>
              </div>

              {watchedEntries.length > 0 && (
                <>
                  <Separator />
                  <div className="text-right text-xl font-bold text-red-400">
                    Total Cost: ${totalCurrentCost.toFixed(2)}
                  </div>
                </>
              )}

              <Button
                type="submit"
                size="lg"
                className="w-full bg-purple-600 hover:bg-purple-700"
                disabled={watchedEntries.length === 0}
              >
                Save Waste Log
              </Button>
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
                  <TableCell>{/* You can store entry count */}—</TableCell>
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
