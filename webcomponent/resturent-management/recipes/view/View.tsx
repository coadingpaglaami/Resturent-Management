"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { QRCodeCanvas } from "qrcode.react";
import { Copy, Edit, QrCode, ChevronDown } from "lucide-react";

import { Heading, ButtonIcon } from "@/webcomponent/reusable";
import { Plus } from "lucide-react";
import { recipesDataArray, RepiesData } from "./Data";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export const View = () => {
  const [recipes, setRecipes] = useState<RepiesData[]>(recipesDataArray);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [openRecipeId, setOpenRecipeId] = useState<number | null>(null);
  const [qrOpen, setQrOpen] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState<RepiesData | null>(null);

  const uniqueCategories = [
    { label: "All Categories", value: "all" },
    ...Array.from(new Set(recipes.map((item) => item.category)))
      .filter(Boolean)
      .map((cat) => ({ label: cat!, value: cat! })),
  ];

  const filteredRecipes =
    selectedCategory === "all"
      ? recipes
      : recipes.filter((r) => r.category === selectedCategory);

  const toggleAccordion = (id: number) => {
    setOpenRecipeId(openRecipeId === id ? null : id);
  };

  const duplicateRecipe = (recipe: RepiesData) => {
    const maxId = Math.max(...recipes.map((r) => r.id), 0) + 1;
    const newRecipe = {
      ...recipe,
      id: maxId,
      recipeName: `${recipe.recipeName} (Copy)`,
    };
    setRecipes([...recipes, newRecipe]);
  };

  const generateQrCode = (recipe: RepiesData) => {
    setSelectedRecipe(recipe);
    setQrOpen(true);
  };

  const editRecipe = (id: number) => {
    console.log(`Edit recipe ID: ${id}`);
  };

  return (
    <div className="flex flex-col gap-8 py-16 w-full  ">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-6">
        <Heading
          title="Recipes"
          subtitle="View and manage your recipe library"
        />
        <ButtonIcon varient="primary" icon={<Plus className="h-5 w-5" />}>
          Create Recipe
        </ButtonIcon>
      </div>

      {/* Category Filter */}
      <Select value={selectedCategory} onValueChange={setSelectedCategory}>
        <SelectTrigger className="w-60">
          <SelectValue placeholder="Filter by category" />
        </SelectTrigger>
        <SelectContent>
          {uniqueCategories.map((cat) => (
            <SelectItem key={cat.value} value={cat.value}>
              {cat.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Framer Motion Accordions */}
      <div className="space-y-4">
        {filteredRecipes.map((recipe) => {
          const totalCost = recipe.ingredients.reduce(
            (sum, ing) => sum + ing.cost,
            0
          );
          const isOpen = openRecipeId === recipe.id;

          return (
            <div
              key={recipe.id}
              className="overflow-hidden rounded-lg border border-gray-700 shadow-lg box-shadow-card bg-white dark:bg-gray-800"
            >
              {/* Accordion Trigger */}
              <button
                onClick={() => toggleAccordion(recipe.id)}
                className="w-full flex justify-between items-center p-6 text-left hover:opacity-80 transition-opacity"
              >
                <div className="flex md:flex-row items-baseline">
                  <div className="flex flex-col gap-2">
                    <h3 className="text-xl font-semibold">
                      {recipe.recipeName}
                    </h3>
                    <p className="text-sm mt-1">{recipe.subtitle}</p>
                    <div className="flex gap-2">
                      <div className="text-right flex gap-2.5">
                        <p>Servings</p>
                        <p className="font-medium">{recipe.servings}</p>
                      </div>
                      <div className="text-right flex gap-2.5 ">
                        <p>Prep Time</p>
                        <p className="font-medium">{recipe.preparationTime}</p>
                      </div>
                      <div className="text-right flex gap-2.5">
                        <p>Cook Time</p>
                        <p className="font-medium">{recipe.cookingTime}</p>
                      </div>
                    </div>
                  </div>
                  {recipe.category && (
                    <span className="inline-block mt-2 px-3 py-1 text-xs font-medium border border-blue-300 text-blue-300 rounded-full">
                      {recipe.category}
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-8 text-sm text-gray-300">
                  <div className="text-right">
                    <p>Total Cost</p>
                    <p className="text-2xl font-bold text-green-400">
                      ${totalCost.toFixed(2)}
                    </p>
                  </div>

                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown className="h-6 w-6 text-gray-400" />
                  </motion.div>
                </div>
              </button>

              {/* Animated Content */}
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    key="content"
                    initial="collapsed"
                    animate="open"
                    exit="collapsed"
                    variants={{
                      open: { opacity: 1, height: "auto" },
                      collapsed: { opacity: 0, height: 0 },
                    }}
                    transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                  >
                    <motion.div
                      variants={{
                        collapsed: { scale: 0.95 },
                        open: { scale: 1 },
                      }}
                      transition={{ duration: 0.3 }}
                      className="px-6 pb-8"
                    >
                      {/* Ingredients Table */}
                      <h4 className="text-lg font-medium mb-4">Ingredients</h4>
                      <Table className="dark:bg-black ">
                        <TableHeader>
                          <TableRow>
                            <TableHead>Ingredient</TableHead>
                            <TableHead>Quantity</TableHead>
                            <TableHead>Unit</TableHead>
                            <TableHead className="text-right">Cost</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {recipe.ingredients.map((ing, idx) => (
                            <TableRow key={idx}>
                              <TableCell className="font-medium">
                                {ing.name}
                              </TableCell>
                              <TableCell>{ing.quantity}</TableCell>
                              <TableCell>{ing.unit}</TableCell>
                              <TableCell className="text-right">
                                ${ing.cost.toFixed(2)}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>

                      {/* Instructions */}
                      <h4 className="text-lg font-medium mt-8 mb-4">
                        Cooking Instructions
                      </h4>
                      <ol className="list-decimal list-inside space-y-2 dark:bg-black p-3.5">
                        {recipe.instructions.map((step, idx) => (
                          <motion.li
                            key={idx}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.05 }}
                          >
                            {step}
                          </motion.li>
                        ))}
                      </ol>

                      {/* Action Buttons */}
                      <div className="flex flex-wrap gap-4 mt-8">
                        <Button
                          variant="secondary"
                          onClick={() => editRecipe(recipe.id)}
                        >
                          <Edit className="mr-2 h-4 w-4" />
                          Edit Recipe
                        </Button>
                        <Button
                          variant="secondary"
                          onClick={() => duplicateRecipe(recipe)}
                        >
                          <Copy className="mr-2 h-4 w-4" />
                          Duplicate Recipe
                        </Button>
                        <Button
                          variant="secondary"
                          onClick={() => generateQrCode(recipe)}
                        >
                          <QrCode className="mr-2 h-4 w-4" />
                          Generate QR Code
                        </Button>
                      </div>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

      {/* QR Code Modal */}
      <Dialog open={qrOpen} onOpenChange={setQrOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center">
              QR Code - {selectedRecipe?.recipeName}
            </DialogTitle>
          </DialogHeader>
          <div className="flex flex-col items-center gap-6 py-8">
            {selectedRecipe && (
              <>
                <QRCodeCanvas
                  value={JSON.stringify({
                    id: selectedRecipe.id,
                    name: selectedRecipe.recipeName,
                    servings: selectedRecipe.servings,
                    totalCost: selectedRecipe.ingredients.reduce(
                      (s, i) => s + i.cost,
                      0
                    ),
                  })}
                  size={280}
                  level="H"
                />
                <p className="text-sm text-center">
                  Scan to view recipe details
                </p>
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
