"use client";
import {
  ButtonIcon,
  Header,
  Heading,
  InputField,
} from "@/webcomponent/reusable";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus } from "lucide-react";
import { InventoryCountData, inventoryCountDataFromGeneratedData } from "./Data";
import { InventoryTableData } from "./InventoryTable";

const formSchema = z.object({
  countName: z.string().min(1, "Count name is required"),
  location: z.string().min(1, "Location is required"),
});

type FormValues = z.infer<typeof formSchema>;

const locationOptions = [
  "Freezer",
  "Walk-in Cooler",
  "Walk-in Freezer",
  "Dry Storage",
  "Refrigerated Prep",
];

interface InventoryCountDataProps {
  inventoryCountdata: InventoryCountData[];
}

export const InventoryCount = () => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      countName: "Weekly Count - Nov 24",
      location: "Freezer",
    },
  });

  const onSubmit = (data: FormValues) => {
    console.log("Start new count:", data);
    // Handle submission - e.g., navigate to count page or API call
  };
  const data: InventoryCountDataProps = {
    inventoryCountdata: inventoryCountDataFromGeneratedData,
    };
  return (
    <div className="flex flex-col gap-6">
      <Heading
        title="Restaurant Kitchen Inventory"
        subtitle="Sheet-to-Shelf Inventory Management"
      />
      <Header title="Start New Count">
        <div>
          {/* Count Name */}
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex md:flex-row flex-col gap-4 md:justify-between"
            >
              <div className="flex-1 grid md:grid-cols-2 gap-4 ">
                <FormField
                  control={form.control}
                  name="countName"
                  render={({ field, fieldState }) => (
                    <InputField
                      id="countName"
                      label="Count Name"
                      placeholder="Enter count name"
                      value={field.value}
                      onChange={field.onChange}
                      error={fieldState.error?.message}
                    />
                  )}
                />

                {/* Location Select */}
                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="">Location</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl className="w-full">
                          <SelectTrigger className="">
                            <SelectValue placeholder="Select location" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="dark:bg-slate-800 dark:border-slate-700">
                          {locationOptions.map((loc) => (
                            <SelectItem
                              key={loc}
                              value={loc}
                              className="dark:text-slate-200 focus:bg-blue-600 focus:text-white"
                            >
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
              <div className="flex items-end">
                <ButtonIcon
                  varient="primary"
                  icon={<Plus className="w-4 h-4" />}
                  type="submit"
                >
                  Start Count
                </ButtonIcon>
              </div>
            </form>
          </Form>
        </div>
      </Header>
      <Header title="Previous Inventory Counts">
        <InventoryTableData inventoryData={data.inventoryCountdata} />
      </Header>
    </div>
  );
};
