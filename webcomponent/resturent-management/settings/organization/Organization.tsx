"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Zod schema with validation
const organizationSettingsSchema = z.object({
  organizationName: z
    .string()
    .min(1, "Organization name is required")
    .max(100, "Organization name is too long"),
  primaryLocation: z.string().min(1, "Please select a primary location"),
  timeZone: z.string().min(1, "Please select a time zone"),
  currency: z.string().min(1, "Please select a currency"),
  dateFormat: z.string().min(1, "Please select a date format"),
});

type OrganizationSettingsFormValues = z.infer<typeof organizationSettingsSchema>;

// Sample options (you can expand these as needed)
const locations = [
  "Airport Location",
  "Downtown Location",
  "Park Square Location",
  "Harbor View Location",
];

const timeZones = [
  "America/New_York (EST)",
  "America/Chicago (CST)",
  "America/Denver (MST)",
  "America/Los_Angeles (PST)",
  "America/Toronto (EST)",
  "Europe/London (GMT)",
  "Europe/Paris (CET)",
];

const currencies = [
  "USD ($)",
  "EUR (€)",
  "GBP (£)",
  "CAD ($)",
  "AUD ($)",
];

const dateFormats = [
  "MM/DD/YYYY",
  "DD/MM/YYYY",
  "YYYY-MM-DD",
  "DD-MM-YYYY",
];


export const Organization=()=>{
const form = useForm<OrganizationSettingsFormValues>({
    resolver: zodResolver(organizationSettingsSchema),
    defaultValues: {
      organizationName: "Gourmet Kitchen Group",
      primaryLocation: "Airport Location",
      timeZone: "America/New_York (EST)",
      currency: "USD ($)",
      dateFormat: "MM/DD/YYYY",
    },
  });

  const onSubmit = (data: OrganizationSettingsFormValues) => {
    console.log("Form submitted:", data);
    // Handle save logic here (API call, etc.)
  };
    return (
       <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {/* Organization Name */}
        <FormField
          control={form.control}
          name="organizationName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Organization Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter organization name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Primary Location & Time Zone (side by side on larger screens) */}
        <div className="grid gap-6 md:grid-cols-2">
          <FormField
            control={form.control}
            name="primaryLocation"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Primary Location</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl className="w-full">
                    <SelectTrigger>
                      <SelectValue placeholder="Select primary location" />
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

          <FormField
            control={form.control}
            name="timeZone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Time Zone</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl className="w-full">
                    <SelectTrigger>
                      <SelectValue placeholder="Select time zone" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {timeZones.map((tz) => (
                      <SelectItem key={tz} value={tz}>
                        {tz}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Currency */}
        <FormField
          control={form.control}
          name="currency"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Currency</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl className="w-full">
                  <SelectTrigger>
                    <SelectValue placeholder="Select currency" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {currencies.map((cur) => (
                    <SelectItem key={cur} value={cur}>
                      {cur}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Date Format */}
        <FormField
          control={form.control}
          name="dateFormat"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Date Format</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl className="w-full">
                  <SelectTrigger>
                    <SelectValue placeholder="Select date format" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {dateFormats.map((fmt) => (
                    <SelectItem key={fmt} value={fmt}>
                      {fmt}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Save Button */}
        <Button type="submit" variant={'buttonBlue'}>
          Save Changes
        </Button>
      </form>
    </Form>
    )
}