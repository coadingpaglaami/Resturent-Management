"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Heading } from "@/webcomponent/reusable";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";

// -----------------------------------------------------------------------------
// Types
// -----------------------------------------------------------------------------
export interface RecpieGeneratorTable {
  id: number;
  productName: string;
  category: string;
  unit: string;
  currentPriceperUnit: number;
  costPerOz: number;
  quantity?: number;
}

export interface RecipieGeneratorData {
  id: number;
  ingredientName: string;
  matchedProductName: string;
  matchPercentage: number;
  aiAmount: string;
  convertedAmount: string;
}

// -----------------------------------------------------------------------------
// Mock data (until backend + AI connected)
// -----------------------------------------------------------------------------
const PRODUCT_DATA: RecpieGeneratorTable[] = [
  {
    id: 1,
    productName: "Chicken Breast",
    category: "Protein",
    unit: "lb",
    currentPriceperUnit: 5.5,
    costPerOz: 0.34,
    quantity: 2,
  },
  {
    id: 2,
    productName: "Olive Oil",
    category: "Oil",
    unit: "gallon",
    currentPriceperUnit: 28,
    costPerOz: 0.22,
    quantity: 0.5,
  },
  {
    id: 3,
    productName: "Onion",
    category: "Produce",
    unit: "lb",
    currentPriceperUnit: 1.8,
    costPerOz: 0.11,
    quantity: 1,
  },
  {
    id: 4,
    productName: "Garlic",
    category: "Produce",
    unit: "bunch",
    currentPriceperUnit: 1.2,
    costPerOz: 0.05,
    quantity: 1,
  },
];

const AI_MAPPING: RecipieGeneratorData[] = [
  {
    id: 1,
    ingredientName: "Chicken",
    matchedProductName: "Chicken Breast",
    matchPercentage: 92,
    aiAmount: "24 oz",
    convertedAmount: "1.5 lb",
  },
  {
    id: 2,
    ingredientName: "Extra virgin olive oil",
    matchedProductName: "Olive Oil",
    matchPercentage: 88,
    aiAmount: "6 oz",
    convertedAmount: "0.04 gallon",
  },
  {
    id: 3,
    ingredientName: "Fresh basil",
    matchedProductName: "No match found",
    matchPercentage: 0,
    aiAmount: "2 oz",
    convertedAmount: "N/A",
  },
];

// -----------------------------------------------------------------------------
// Zod Schemas
// -----------------------------------------------------------------------------
const generateSchema = z.object({
  prompt: z.string().min(10, "Please describe the recipe in more detail"),
  confidence: z.number().min(1).max(100),
});

type GenerateValues = z.infer<typeof generateSchema>;

const recipeFormSchema = z.object({
  recipeName: z.string().min(2),
  servings: z.number().min(1),
  description: z.string().min(5),
  prepTime: z.number().min(1),
  cookTime: z.number().min(1),
  category: z.string(),
  instructions: z.string().min(10),
});

type RecipeFormValues = z.infer<typeof recipeFormSchema>;

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------
export const RecipeGenerator = () => {
  // search & filter
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<string>("all");

  // ai result toggle
  const [generated, setGenerated] = useState(false);

  const categories = useMemo(() => {
    const set = new Set(PRODUCT_DATA.map((p) => p.category));
    return ["all", ...Array.from(set)];
  }, []);

  const filteredProducts = useMemo(() => {
    return PRODUCT_DATA.filter((p) => {
      const matchSearch = p.productName
        .toLowerCase()
        .includes(search.toLowerCase());
      const matchCategory = category === "all" || p.category === category;
      return matchSearch && matchCategory;
    });
  }, [search, category]);

  // generate form
  const generateForm = useForm<GenerateValues>({
    resolver: zodResolver(generateSchema),
    defaultValues: { prompt: "", confidence: 80 },
  });

  // recipe edit form
  const recipeForm = useForm<RecipeFormValues>({
    resolver: zodResolver(recipeFormSchema),
    defaultValues: {
      recipeName: "AI Generated Chicken Dish",
      servings: 4,
      description: "A simple AI generated recipe using available ingredients",
      prepTime: 15,
      cookTime: 30,
      category: "Protein",
      instructions: "1. Prep ingredients\n2. Cook chicken\n3. Serve hot",
    },
  });

  return (
    <div className="py-16 flex flex-col gap-10 overflow-hidden">
      <Heading
        title="AI Recipe Generator"
        subtitle="Generate recipe ideas and calculate costs using AI based on available ingredients"
      />

      {/* 1st row: search + category */}
      <div className="flex flex-col md:flex-row gap-4">
        <Input
          placeholder="Search ingredients or products"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1"
        />
        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger className="md:w-64">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((c) => (
              <SelectItem key={c} value={c}>
                {c}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* 2nd div: product table */}
      <Card>
        <CardHeader>
          <CardTitle>Available Products</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Unit</TableHead>
                <TableHead>Cost / Unit</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProducts.map((p) => (
                <TableRow key={p.id}>
                  <TableCell>{p.productName}</TableCell>
                  <TableCell>{p.category}</TableCell>
                  <TableCell>{p.unit}</TableCell>
                  <TableCell>${p.currentPriceperUnit}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* 3rd div: generate recipe */}
      <Card>
        <CardHeader>
          <CardTitle>Generate Recipe</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <Form {...generateForm}>
            <form
              onSubmit={generateForm.handleSubmit(() => setGenerated(true))}
              className="space-y-6 "
            >
              <div className="flex md:flex-row flex-col gap-4">
                <FormField
                  control={generateForm.control}
                  name="prompt"
                  render={({ field }) => (
                    <FormItem className="flex flex-col flex-1">
                      <FormLabel>Describe the recipe you want</FormLabel>
                      <FormControl>
                        <Textarea rows={4} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={generateForm.control}
                  name="confidence"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Matching confidence ({field.value}%)
                      </FormLabel>
                      <FormControl>
                        <Slider
                          min={1}
                          max={100}
                          step={1}
                          value={[field.value]}
                          onValueChange={(v) => field.onChange(v[0])}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              <Button type="submit" variant="primary" className="w-full">
                Generate Recipe
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      {/* AI Result */}
      <AnimatePresence>
        {generated && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0 }}
            className="space-y-8 overflow-hidden"
          >
            <div className="rounded-lg bg-green-100 text-green-800 px-4 py-3 font-medium ">
              Recipe generated successfully!
            </div>

            {/* Ingredient Mapping */}
            <Card>
              <CardHeader>
                <CardTitle>Ingredient Mapping Result</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card>
                    <CardContent className="p-4">Mapped: 2</CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4">Unmapped: 1</CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4">Match Rate: 67%</CardContent>
                  </Card>
                </div>

                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>AI Ingredient</TableHead>
                      <TableHead>Matched Product</TableHead>
                      <TableHead>Match %</TableHead>
                      <TableHead>AI Amount</TableHead>
                      <TableHead>Converted</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {AI_MAPPING.map((row) => (
                      <TableRow key={row.id}>
                        <TableCell>{row.ingredientName}</TableCell>
                        <TableCell>{row.matchedProductName}</TableCell>
                        <TableCell>{row.matchPercentage}%</TableCell>
                        <TableCell>{row.aiAmount}</TableCell>
                        <TableCell>{row.convertedAmount}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            {/* Review & Edit */}
            <Card>
              <CardHeader>
                <CardTitle>Review and Edit Recipe</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <Form {...recipeForm}>
                  <form className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={recipeForm.control}
                        name="recipeName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Recipe Name</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={recipeForm.control}
                        name="servings"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Servings</FormLabel>
                            <FormControl>
                              <Input type="number" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={recipeForm.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Description</FormLabel>
                          <FormControl>
                            <Textarea rows={3} {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <FormField
                        control={recipeForm.control}
                        name="prepTime"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Prep Time (min)</FormLabel>
                            <FormControl>
                              <Input type="number" {...field} />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={recipeForm.control}
                        name="cookTime"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Cook Time (min)</FormLabel>
                            <FormControl>
                              <Input type="number" {...field} />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={recipeForm.control}
                        name="category"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Category</FormLabel>
                            <FormControl>
                              <Select
                                value={field.value}
                                onValueChange={field.onChange}
                              >
                                <SelectTrigger>
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  {categories
                                    .filter((c) => c !== "all")
                                    .map((c) => (
                                      <SelectItem key={c} value={c}>
                                        {c}
                                      </SelectItem>
                                    ))}
                                </SelectContent>
                              </Select>
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>

                    <Separator />

                    {/* Ingredients editable table */}
                    <div className="space-y-2">
                      <h4 className="font-semibold w-full">Ingredients</h4>
                      <p className="text-sm text-muted-foreground">
                        Edit quantities
                      </p>

                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Product</TableHead>
                            <TableHead>Quantity</TableHead>
                            <TableHead>Unit</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {PRODUCT_DATA.map((p) => (
                            <TableRow key={p.id}>
                              {/* Product select */}
                              <TableCell>
                                <Select defaultValue={p.productName}>
                                  <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select product" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {PRODUCT_DATA.map((prod) => (
                                      <SelectItem
                                        key={prod.id}
                                        value={prod.productName}
                                      >
                                        {prod.productName}
                                      </SelectItem>
                                    ))}
                                    <Separator className="my-1" />
                                    <div className="px-2 py-1">
                                      <Input placeholder="Add new product" />
                                    </div>
                                  </SelectContent>
                                </Select>
                              </TableCell>

                              {/* Quantity */}
                              <TableCell>
                                <Input
                                  type="number"
                                  defaultValue={p.quantity}
                                />
                              </TableCell>

                              {/* Unit select */}
                              <TableCell>
                                <Select defaultValue={p.unit}>
                                  <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select unit" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {["lb", "oz", "gallon", "bunch", "kg"].map(
                                      (unit) => (
                                        <SelectItem key={unit} value={unit}>
                                          {unit}
                                        </SelectItem>
                                      )
                                    )}
                                  </SelectContent>
                                </Select>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>

                    <Separator />

                    {/* Instructions */}
                    <FormField
                      control={recipeForm.control}
                      name="instructions"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Cooking Instructions</FormLabel>
                          <FormControl>
                            <Textarea rows={5} {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="flex flex-col md:flex-row gap-3">
                      <Button type="submit">Save Recipe</Button>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setGenerated(false)}
                      >
                        Start Over
                      </Button>
                      <Button type="button" variant="ghost">
                        View Raw Output
                      </Button>
                    </div>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
