"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray } from "react-hook-form";
import * as z from "zod";
import { toast } from "sonner";

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
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Trash2, Plus } from "lucide-react";

import {
  useCreateSquareItemMutation,
  useGetSquareCategoriesQuery,
  useGetSquareItemByIdQuery,
  useUpdateSquareItemMutation,
} from "@/api/pos";

// ────────────────────────────────────────────────
// Zod Schema
// ────────────────────────────────────────────────
const variationSchema = z.object({
  id: z.string().optional(), // Track existing variation IDs
  name: z.string().min(1, "Variation name is required"),
  price_amount: z
    .number({ error: "Must be a number" })
    .min(0, "Price must be at least 0"),
  price_currency: z.enum(["USD", "EUR", "GBP", "BDT"]),
  sku: z.string().optional(),
});

const formSchema = z.object({
  name: z.string().min(2, "Item name must be at least 2 characters"),
  description: z.string().optional(),
  category_id: z.string().optional().or(z.literal("")),
  variations: z
    .array(variationSchema)
    .min(1, "At least one variation is required"),
});

type FormValues = z.infer<typeof formSchema>;

interface SquareItemCreateOrUpdateProps {
  provider?: string;
  editId?: string;
}

export const ItemCreateOrUpdate = ({
  provider,
  editId,
}: SquareItemCreateOrUpdateProps) => {
  const router = useRouter();
  const isEditMode = !!editId;

  const { data: categories, isLoading: categoriesLoading } =
    useGetSquareCategoriesQuery({
      page: 1,
      limit: 50,
    });

  const { data: itemData, isLoading: itemLoading } = useGetSquareItemByIdQuery(
    editId!,
  );

  const { mutate: createItem, isPending: isCreating } =
    useCreateSquareItemMutation();
  const { mutate: updateItem, isPending: isUpdating } =
    useUpdateSquareItemMutation();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      category_id: "",
      variations: [
        {
          id: undefined,
          name: "Regular",
          price_amount: 0,
          price_currency: "USD" as const,
          sku: "",
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "variations",
  });

  useEffect(() => {
    if (itemData) {
      form.reset({
        name: itemData.name || "",
        description: itemData.description || "",
        category_id: itemData.category_id || "",
        variations:
          itemData.variations?.map((v) => ({
            id: v.id, // Preserve the variation ID
            name: v.name || "Regular",
            price_amount: v.price_amount || 0,
            price_currency: (v.price_currency || "USD") as "USD" | "EUR" | "GBP" | "BDT",
            sku: v.sku || "",
          })) ?? [],
      });
    }
  }, [itemData, form]);

  const onSubmit = async (values: FormValues) => {
    try {
      if (isEditMode && itemData) {
        // Get original variation IDs
        const originalVariationIds = new Set(
          itemData.variations?.map(v => v.id).filter(Boolean) || []
        );
        
        // Get current variation IDs from form
        const currentVariationIds = new Set(
          values.variations.map(v => v.id).filter(Boolean)
        );
        
        // Find deleted variation IDs
        const deletedVariationIds = Array.from(originalVariationIds).filter(
          id => !currentVariationIds.has(id)
        );
        
        // Build variations array with updates and new ones
        const updatedVariations = values.variations.map((v, index) => ({
          id: v.id || "", // Empty string for new variations
          name: v.name,
          price_amount: v.price_amount,
          price_currency: v.price_currency,
          sku: v.sku || "",
          ordinal: index,
          is_deleted: false,
        }));
        
        // Add deleted variations marked as deleted
        const deletedVariations = deletedVariationIds.map(id => {
          const originalVariation = itemData.variations?.find(v => v.id === id);
          return {
            id: id as string,
            name: originalVariation?.name || "",
            price_amount: originalVariation?.price_amount || 0,
            price_currency: originalVariation?.price_currency || "USD" as "USD" | "EUR" | "GBP" | "BDT",
            sku: originalVariation?.sku || "",
            ordinal: 999, // Put deleted items at the end
            is_deleted: true,
          };
        });

        updateItem({
          itemId: editId,
          payload: {
            name: values.name,
            description: values.description,
            category_id: values.category_id || undefined,
            variations: [...updatedVariations, ...deletedVariations],
          },
        });
        toast.success("Item updated successfully");
      } else {
        // For creation, provide all required fields
        createItem({
          name: values.name,
          description: values.description,
          category_id: values.category_id || undefined,
          variations: values.variations.map((v, index) => ({
            id: "",
            name: v.name,
            price_amount: v.price_amount,
            price_currency: v.price_currency,
            sku: v.sku || "",
            ordinal: index,
            is_deleted: false,
          })),
        });
        toast.success("Item created successfully");
      }

      router.push(`/pos-integration/${provider}/items`);
    } catch (error) {
      const errorMessage = error instanceof Error 
        ? error.message 
        : "Something went wrong";
      toast.error(errorMessage);
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">
        {isEditMode ? "Update Square Item" : "Create Square Item"}
      </h1>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Name */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Item Name *</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. Margherita Pizza" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Description */}
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Short description of the item..."
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Category */}
          <FormField
            control={form.control}
            name="category_id"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  value={field.value}
                  disabled={categoriesLoading}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category (optional)" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {categories?.results?.map((cat) => (
                      <SelectItem key={cat.id} value={cat.id}>
                        {cat.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* ────────────────────────────────────────────────
              Variations (appendable)
          ──────────────────────────────────────────────── */}
          <div className="border rounded-lg p-5 bg-slate-50/50">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Variations *</h3>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() =>
                  append({
                    id: undefined,
                    name: "",
                    price_amount: 0,
                    price_currency: "USD" as const,
                    sku: "",
                  })
                }
              >
                <Plus className="mr-2 h-4 w-4" />
                Add Variation
              </Button>
            </div>

            {fields.map((field, index) => (
              <div
                key={field.id}
                className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-5 p-4 border rounded-lg bg-white relative"
              >
                <FormField
                  control={form.control}
                  name={`variations.${index}.name`}
                  render={({ field }) => (
                    <FormItem className="md:col-span-4">
                      <FormLabel>Variation Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Small, Large, etc." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name={`variations.${index}.price_amount`}
                  render={({ field }) => (
                    <FormItem className="md:col-span-3">
                      <FormLabel>Price</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          step="0.01"
                          {...field}
                          onChange={(e) =>
                            field.onChange(parseFloat(e.target.value) || 0)
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name={`variations.${index}.price_currency`}
                  render={({ field }) => (
                    <FormItem className="md:col-span-2">
                      <FormLabel>Currency</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Currency" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="USD">USD</SelectItem>
                          <SelectItem value="EUR">EUR</SelectItem>
                          <SelectItem value="GBP">GBP</SelectItem>
                          <SelectItem value="BDT">BDT</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name={`variations.${index}.sku`}
                  render={({ field }) => (
                    <FormItem className="md:col-span-2">
                      <FormLabel>SKU (optional)</FormLabel>
                      <FormControl>
                        <Input placeholder="SKU-123" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="absolute top-2 right-2">
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => remove(index)}
                    disabled={fields.length === 1}
                  >
                    <Trash2 className="h-4 w-4 text-red-600" />
                  </Button>
                </div>
              </div>
            ))}

            {form.formState.errors.variations?.root && (
              <p className="text-sm font-medium text-destructive mt-2">
                {form.formState.errors.variations.root.message}
              </p>
            )}
          </div>

          {/* Submit */}
          <div className="flex justify-end gap-4 pt-6">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.back()}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isCreating || isUpdating || itemLoading}
            >
              {isEditMode
                ? isUpdating
                  ? "Updating..."
                  : "Update Item"
                : isCreating
                  ? "Creating..."
                  : "Create Item"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};