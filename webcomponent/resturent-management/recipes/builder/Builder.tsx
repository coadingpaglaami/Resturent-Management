"use client";

import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Plus, Save, Trash2, Upload } from "lucide-react";

import { ButtonIcon, Header, Heading } from "@/webcomponent/reusable";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
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


const categories = ["Main Course", "Appetizer", "Dessert", "Beverage"];
const units = ["g", "kg", "lb", "oz", "ml", "l", "tsp", "tbsp", "cup", "piece"];
const ingredients = [
  { id: "1", name: "Flour" },
  { id: "2", name: "Bun" },
  { id: "3", name: "Tomato" },
  { id: "4", name: "Salmon" },
];

const ingredientSchema = z.object({
  ingredientId: z.string().min(1, "Select an ingredient"),
  quantity: z.coerce.number().positive("Quantity must be positive"),
  unit: z.string().min(1, "Select a unit"),
});

const formSchema = z.object({
  name: z.string().min(1, "Recipe name is required"),
  description: z.string().optional(),
  category: z.string().min(1, "Select a category"),
  servings: z.number().positive("Servings must be positive"),
  prepTime: z.number().min(0, "Prep time >= 0"),
  cookTime: z.number().min(0, "Cook time >= 0"),
  ingredients: z.array(ingredientSchema).min(1, "Add at least one ingredient"),
  instructions: z.string().min(1, "Instructions are required"),
  image: z
    .any()
    .optional()
    .refine(
      (file) => !file || (file instanceof File && file.size <= 5 * 1024 * 1024),
      "Image must be less than 5MB"
    )
    .refine(
      (file) =>
        !file || (file instanceof File && file.type.startsWith("image/")),
      "Must be an image file"
    ),
});

type FormValues = z.infer<typeof formSchema>;

export const Builder = () => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      category: "",
      servings: 1,
      prepTime: 0,
      cookTime: 0,
      ingredients: [{ ingredientId: "", quantity: 0, unit: "" }],
      instructions: "",
      image: null,
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "ingredients",
  });

  const watchedIngredients = form.watch(
    "ingredients"
  ) as FormValues["ingredients"];
  const totalCost = watchedIngredients.reduce((sum, ing) => {
    const mockCosts: Record<string, number> = {
      "1": 0.01,
      "2": 0.5,
      "3": 0.2,
    };
    const costPerUnit = mockCosts[ing.ingredientId] || 0;
    return sum + costPerUnit * ing.quantity;
  }, 0);

  const costPerServing =
    watchedIngredients.length > 0 && form.watch("servings") > 0
      ? totalCost / form.watch("servings")
      : 0;

  const onSubmit = (data: FormValues) => {
    console.log("Submitted data:", data);
  };

  return (
    <div className="py-16 flex flex-col gap-8">
      <Heading
        title="Create New Recipe"
        subtitle="Build recipes with ingredients from your database"
      />

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 flex  flex-col gap-4"
        >
          <div className="space-y-6 ">
            <Header title="Recipe Information">
              <div>
                <div className="space-y-6">
                  <div className="flex md:flex-row gap-3.5">
                    <div className="md:w-[70%] flex flex-col gap-3.5">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Recipe Name *</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="e.g. Grilled Salmon with Herb Butter"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Brief description of the recipe"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="flex items-center justify-center md:w-[30%]">
                      <FormField
                        control={form.control}
                        name="image"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <div className="relative w-full h-full min-h-48 bg-muted/30 rounded-lg border-2 border-dashed border-muted-foreground/30 flex items-center justify-center overflow-hidden">
                                {field.value ? (
                                  <div className="relative w-full h-full">
                                    <img
                                      src={URL.createObjectURL(field.value)}
                                      alt="Recipe preview"
                                      className="w-full h-full object-cover"
                                    />
                                    <Button
                                      type="button"
                                      variant="destructive"
                                      size="icon"
                                      className="absolute top-2 right-2"
                                      onClick={() => field.onChange(null)}
                                    >
                                      <Trash2 className="h-4 w-4" />
                                    </Button>
                                  </div>
                                ) : (
                                  <label
                                    htmlFor="recipe-image-upload"
                                    className="flex flex-col items-center gap-4 cursor-pointer p-8 text-center"
                                  >
                                    <div className="flex items-center justify-center rounded-full bg-muted/50">
                                      <Upload className="h-8 w-8 text-muted-foreground" />
                                    </div>
                                    <div className="space-y-1">
                                      <p className="text-sm font-medium">
                                        Upload your Recipe Photo
                                      </p>
                                      <p className="text-xs text-muted-foreground">
                                        Drag and drop or click to upload
                                      </p>
                                      <p className="text-xs text-muted-foreground">
                                        (Max 5MB, JPG/PNG)
                                      </p>
                                    </div>
                                  </label>
                                )}
                                <input
                                  id="recipe-image-upload"
                                  type="file"
                                  accept="image/*"
                                  className="hidden"
                                  onChange={(e) => {
                                    const file = e.target.files?.[0];
                                    if (file) {
                                      field.onChange(file);
                                    }
                                  }}
                                />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <FormField
                      control={form.control}
                      name="category"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Category *</FormLabel>
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
                              {categories.map((cat) => (
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
                      name="servings"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Servings *</FormLabel>
                          <FormControl>
                            <Input type="number" min={1} {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="prepTime"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Prep Time (min)</FormLabel>
                          <FormControl>
                            <Input type="number" min={0} {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="cookTime"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Cook Time (min)</FormLabel>
                          <FormControl>
                            <Input type="number" min={0} {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </div>
            </Header>
          </div>

          <div
            className="space-y-4 box-shadow-card p-4 rounded-lg bg-white border border-gray-200
    dark:border-gray-700 dark:bg-gray-800"
          >
            <div className="flex flex-row items-center justify-between">
              <h2 className="text-lg font-semibold">Ingredients</h2>
              <ButtonIcon
                type="button"
                varient="primary"
                onClick={() =>
                  append({ ingredientId: "", quantity: 0, unit: "" })
                }
                icon={<Plus />}
              >
                Add Ingredient
              </ButtonIcon>
            </div>

            <div className="space-y-4">
              {fields.map((field, index) => (
                <div
                  key={field.id}
                  className="flex flex-col md:flex-row md:items-end gap-3.5"
                >
                  <div className="md:flex-1">
                    <FormField
                      control={form.control}
                      name={`ingredients.${index}.ingredientId`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel
                            className={index !== 0 ? "sr-only" : undefined}
                          >
                            Ingredient
                          </FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            value={field.value}
                          >
                            <FormControl className="w-full">
                              <SelectTrigger>
                                <SelectValue placeholder="Select ingredient..." />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {ingredients.map((ing) => (
                                <SelectItem key={ing.id} value={ing.id}>
                                  {ing.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div>
                    <FormField
                      control={form.control}
                      name={`ingredients.${index}.quantity`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel
                            className={index !== 0 ? "sr-only" : undefined}
                          >
                            Quantity
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              min={0}
                              step="any"
                              {...field}
                              value={field.value as number}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div>
                    <FormField
                      control={form.control}
                      name={`ingredients.${index}.unit`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel
                            className={index !== 0 ? "sr-only" : undefined}
                          >
                            Unit
                          </FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            value={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Unit" />
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
                  </div>

                  <Button
                    type="button"
                    variant="destructive"
                    onClick={() => remove(index)}
                    disabled={fields.length === 1}
                  >
                    <Trash2 />
                  </Button>
                </div>
              ))}
            </div>

            <div className="flex justify-between pt-4 border-t">
              <div>
                <p className="text-sm font-medium">Total Recipe Cost</p>
                <p className="text-2xl font-bold">${totalCost.toFixed(2)}</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium">Cost per Serving</p>
                <p className="text-2xl font-bold">
                  ${costPerServing.toFixed(2)}
                </p>
              </div>
            </div>
          </div>

          <div
            className="space-y-4 box-shadow-card p-4 rounded-lg bg-white border border-gray-200
    dark:border-gray-700 dark:bg-gray-800"
          >
            <h2 className="text-lg font-semibold">Cooking Instructions</h2>
            <FormField
              control={form.control}
              name="instructions"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Enter step-by-step cooking instructions *
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="1. Preheat oven...&#10;2. Mix ingredients..."
                      className="min-h-[200px]"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Use numbered steps for clarity.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex justify-end gap-4">
            <ButtonIcon
              varient="secondaryTwo"
              type="button"
              onClick={() => form.reset()}
              icon={undefined}
            >
              Cancel
            </ButtonIcon>
            <ButtonIcon type="submit" varient="primary" icon={<Save />}>
              Save Recipe
            </ButtonIcon>
          </div>
        </form>
      </Form>
    </div>
  );
};
