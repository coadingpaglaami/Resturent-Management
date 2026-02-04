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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useCreateInventoryItemMutation, useGetAllInventoryCategoriesQuery } from "@/api/inventory";
import { useGetUnitListQuery } from "@/api/units/query";
import { useGetAllergenListQuery } from "@/api/allergen";
import { useGetFoodLocationsQuery } from "@/api/storage/query";
import { useGetLocationsQuery } from "@/api/location";

const ingredientSchema = z.object({
  productName: z.string().min(1, "Product name is required"),
  sku: z.string().min(1, "SKU is required"),
  category: z.string().min(1, "Category is required"),
  location: z.string().min(1, "Location is required"),
  storageLocation: z.string().min(1, "Storage location is required"),
  minimumLevel: z.number().min(0, "Minimum level must be >= 0"),
  targetPar: z.number().min(0, "Target par must be >= 0"),
  allergens: z.array(z.string()),
  packSizeDescription: z.string().optional(),
  baseUnit: z.string().min(1, "Base unit is required"),
  currentPrice: z.number().min(0, "Current price must be >= 0"),
  effectiveDate: z.date(),
});

type IngredientFormValues = z.infer<typeof ingredientSchema>;

export const AddInventory = () => {
  const router = useRouter();

  // Fetch locations with object destructuring
  const { data: locationsData, isLoading: isLoadingLocations } =
    useGetLocationsQuery({ page: 1, limit: 100 });

  // Fetch storage locations with object destructuring (same API, different usage)
  const { data: storageLocationsData, isLoading: isLoadingStorageLocations } =
    useGetFoodLocationsQuery({ page: 1, limit: 100 });

  // Fetch units with object destructuring
  const { data: unitsData, isLoading: isLoadingUnits } = useGetUnitListQuery({
    page: 1,
    limit: 100,
  });

  // Fetch allergens with object destructuring
  const { data: allergensData, isLoading: isLoadingAllergens } =
    useGetAllergenListQuery({ page: 1, limit: 100 });

  // Fetch recipe categories with object destructuring
  const { data: categoriesData, isLoading: isLoadingCategories } =
    useGetAllInventoryCategoriesQuery({ page: 1, limit: 10 });


  // Create mutation with object destructuring
  const { mutate: createItem } =
    useCreateInventoryItemMutation();

  const form = useForm<IngredientFormValues>({
    resolver: zodResolver(ingredientSchema),
    defaultValues: {
      productName: "",
      sku: "",
      category: "",
      location: "",
      storageLocation: "",
      minimumLevel: 0,
      targetPar: 0,
      allergens: [],
      packSizeDescription: "",
      baseUnit: "",
      currentPrice: 0,
      effectiveDate: new Date(),
    },
  });

  const onSubmit = (data: IngredientFormValues) => {
    const payload = {
      product_name: data.productName,
      sku: data.sku,
      category: data.category,
      location: data.location,
      storage_location: data.storageLocation,
      pack_size_description: data.packSizeDescription || null,
      base_unit: data.baseUnit,
      current_price: data.currentPrice,
      minimum_level: String(data.minimumLevel),
      target_par: String(data.targetPar),
      allergen_ids: data.allergens,
    };

    createItem(payload, {
      onSuccess: () => {
        toast.success("Inventory item created successfully");
        router.push("/inventory/inventory-database");
      },
      onError: (error) => {
        toast.error(`Failed to create: ${error.message}`);
      },
    });
  };

  // Loading state
  if (
    isLoadingLocations ||
    isLoadingStorageLocations ||
    isLoadingUnits ||
    isLoadingAllergens ||
    isLoadingCategories
  ) {
    return (
      <div className="py-16 flex flex-col gap-4">
        <Heading title="Add New Inventory Item" subtitle="Loading..." />
      </div>
    );
  }

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
                    <FormLabel>
                      Category <span className="text-red-400">*</span>
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl className="w-full">
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {categoriesData?.results?.map((category) => (
                          <SelectItem key={category.id} value={category.id}>
                            {category.name}
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
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Location <span className="text-red-400">*</span>
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl className="w-full">
                        <SelectTrigger>
                          <SelectValue placeholder="Select location" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="w-full">
                        {locationsData?.results?.map((loc) => (
                          <SelectItem key={loc.id} value={loc.id}>
                            {loc.name}
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
                    <FormLabel>
                      Storage Location <span className="text-red-400">*</span>
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl className="w-full">
                        <SelectTrigger>
                          <SelectValue placeholder="Select storage location" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="w-full">
                        {storageLocationsData?.results?.map((storage) => (
                          <SelectItem key={storage.id} value={storage.id}>
                            {storage.name}
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
                name="packSizeDescription"
                render={({ field, fieldState }) => (
                  <InputField
                    id="packSizeDescription"
                    label="Pack Size Description"
                    placeholder="e.g., 1 case = 6 × 5 LB bags"
                    value={field.value}
                    onChange={field.onChange}
                    error={fieldState?.error?.message}
                  />
                )}
              />
              <FormField
                control={form.control}
                name="baseUnit"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Base Unit <span className="text-red-400">*</span>
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl className="w-full">
                        <SelectTrigger>
                          <SelectValue placeholder="Select unit" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="w-full">
                        {unitsData?.results?.map((unit) => (
                          <SelectItem key={unit.id} value={unit.id}>
                            {unit.name} ({unit.symbol})
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

          <Header title="Cost">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <FormField
                name="currentPrice"
                control={form.control}
                render={({ field, fieldState }) => (
                  <InputField
                    id="currentPrice"
                    label="Current Price"
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

          <Header title="Allergen Tags">
            <FormField
              control={form.control}
              name="allergens"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <ToggleGroup
                      type="multiple"
                      value={field.value}
                      onValueChange={field.onChange}
                      className="flex flex-wrap justify-start gap-3"
                    >
                      {allergensData?.results?.map((allergen) => (
                        <ToggleGroupItem
                          key={allergen.id}
                          value={allergen.id}
                          className="rounded-full dark:border-0 border px-4 py-2 text-sm font-medium data-[state=on]:bg-orange-500 dark:data-[state=on]:text-white dark:data-[state=off]:bg-slate-700/70 dark:data-[state=off]:text-slate-300"
                        >
                          {allergen.name}
                        </ToggleGroupItem>
                      ))}
                    </ToggleGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </Header>

          <Header title="Par Levels">
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
        </form>
      </Form>
    </div>
  );
};