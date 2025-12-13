"use client";
import {
  DateField,
  Header,
  Heading,
  InputField,
} from "@/webcomponent/reusable";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
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
const ingredientSchema = z.object({
  productName: z.string().min(1, "Product name is required"),
  sku: z.string().min(1, "SKU is required"),
  category: z.string().min(1, "Category is required"),
  storageLocation: z.string().min(1, "Storage location is required"),
  minimumLevel: z.number().min(0, "Minimum level must be >= 0"),
  targetPar: z.number().min(0, "Target par must be >= 0"),
  allergens: z.array(z.string()),
  packSizeDescription: z.string().optional(),
  baseUnit: z.string().min(1, "Base unit is required"),
  currentPrice: z.number().min(0, "Current price must be >= 0"),
  effectiveDate: z.date(),
});

// Infer type from schema
type IngredientFormValues = z.infer<typeof ingredientSchema>;

const allergenOptions = [
  "Gluten",
  "Dairy",
  "Eggs",
  "Nuts",
  "Peanuts",
  "Soy",
  "Fish",
  "Shellfish",
];
const baseUnitOptions = ["lb", "kg", "oz", "g", "each", "case", "liter", "gal"];
const categoryOptions = [
  "Product",
  "Produce",
  "Dairy",
  "Meat",
  "Seafood",
  "Bakery",
  "Beverage",
  "Dry Goods",
];
const storageLocationOptions = [
  "Dry Storage",
  "Walk-in Cooler",
  "Freezer",
  "Refrigerated Prep",
  "Shelf",
];
export const AddInventory = () => {
  const form = useForm<IngredientFormValues>({
    resolver: zodResolver(ingredientSchema),
    defaultValues: {
      productName: "",
      sku: "",
      category: "",
      storageLocation: "Dry Storage",
      minimumLevel: 0, // number
      targetPar: 0, // number
      allergens: ["Gluten", "Dairy", "Eggs"],
      packSizeDescription: "",
      baseUnit: "lb",
      currentPrice: 0, // number
      effectiveDate: new Date(),
    },
  });

  const onSubmit = (data: IngredientFormValues) => {
    console.log("Form submitted:", data);
    // Handle submission (e.g., API call)
  };
  return (
    <div className="py-16 flex flex-col gap-4">
      <Heading
        title="Add New Inventory Item"
        subtitle="Fill out the form below to add a new inventory item."
      />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-4"
        >
          <Header title="Add Inventory">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <FormField
                control={form.control}
                name="productName"
                render={({ field, fieldState }) => (
                  <InputField
                    id="productName"
                    label="Product Name"
                    placeholder="e.g., Organic Flour"
                    value={field.value}
                    onChange={field.onChange}
                    error={fieldState?.error?.message}
                    className=""
                  />
                )}
              />
              <FormField
                control={form.control}
                name="sku"
                render={({ field, fieldState }) => (
                  <InputField
                    id="sku"
                    label="SKU"
                    placeholder="e.g., SKU12345"
                    value={field.value}
                    onChange={field.onChange}
                    error={fieldState?.error?.message}
                  />
                )}
              />
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-slate-300">
                      Category <span className="text-red-400">*</span>
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl className="w-full">
                        <SelectTrigger className="bg-slate-700/70 border-slate-600 text-white">
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {categoryOptions.map((cat) => (
                          <SelectItem key={cat} value={cat}>
                            {cat}
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
                name="storageLocation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-slate-300">
                      Storage Location <span className="text-red-400">*</span>
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl className="w-full">
                        <SelectTrigger className="bg-slate-700/70 border-slate-600 text-white">
                          <SelectValue />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="w-full">
                        {storageLocationOptions.map((loc) => (
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
          </Header>
          <Header title="Units & Pack">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <FormField
                control={form.control}
                name="minimumLevel"
                render={({ field, fieldState }) => (
                  <InputField
                    id="minimumLevel"
                    label="Minimum Level"
                    placeholder="e.g., 10"
                    value={String(field.value)}
                    type="number"
                    onChange={(value) => field.onChange(Number(value))}
                    error={fieldState?.error?.message}
                  />
                )}
              />
              <FormField
                name="targetPar"
                control={form.control}
                render={({ field, fieldState }) => (
                  <InputField
                    id="targetPar"
                    label="Target Par"
                    placeholder="e.g., 50"
                    value={String(field.value)}
                    type="number"
                    onChange={(value) => field.onChange(Number(value))}
                    error={fieldState?.error?.message}
                  />
                )}
              />
            </div>
          </Header>
          <Header title="Cost">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <FormField
                name="currentPrice"
                control={form.control}
                render={({ field, fieldState }) => (
                  <InputField
                    id="currentPrice"
                    label="Pack Size Description"
                    placeholder="$0.00"
                    type="number"
                    value={String(field.value)}
                    onChange={(value) => field.onChange(Number(value))}
                    error={fieldState?.error?.message}
                  />
                )}
              />
              <FormField
                name="effectiveDate"
                control={form.control}
                render={({ field }) => (
                  <DateField
                    label="Effective Date"
                    className="w-full"
                    {...field}
                  />
                )}
              />
            </div>
          </Header>
        </form>
      </Form>
    </div>
  );
};
