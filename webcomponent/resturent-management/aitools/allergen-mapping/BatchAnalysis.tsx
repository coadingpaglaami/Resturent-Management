"use client";

import { useState } from "react";
import { Wand2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
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
import { recipeDetails, type RecipeDetails } from "./Data";

export const BatchAnalysis = () => {
  const [selectedRecipes, setSelectedRecipes] = useState<RecipeDetails[]>([]);
  const [detectionMethod, setDetectionMethod] = useState<"database" | "ai" | "both">("both");
  const [analysisComplete, setAnalysisComplete] = useState(false);
  const [autoSave, setAutoSave] = useState(true);

  const handleRecipeSelect = (value: string) => {
    const recipe = recipeDetails.find((r) => r.name === value);
    if (recipe && !selectedRecipes.find((r) => r.name === recipe.name)) {
      setSelectedRecipes([...selectedRecipes, recipe]);
    }
  };

  const removeRecipe = (name: string) => {
    setSelectedRecipes(selectedRecipes.filter((r) => r.name !== name));
  };

  const runBatchAnalysis = () => {
    setAnalysisComplete(true);
    // In real app: run analysis on selectedRecipes
  };

  const totalAllergens = selectedRecipes.reduce((sum, recipe) => {
    return sum + (recipe.aiAllergenDetection?.itemsAllergenDetacted.flatMap(i => i.allergens).length || 0);
  }, 0);

  const avgAllergensPerRecipe = selectedRecipes.length > 0 ? (totalAllergens / selectedRecipes.length).toFixed(1) : "0.0";

  return (
    <div className=" flex flex-col gap-8">
      {/* Header */}
      <Card className="bg-blue-900/20 border-blue-500/30">
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold text-white dark:text-blue-300">Analyze multiple recipes at once</h2>
        </CardContent>
      </Card>

      {/* Recipe Multi-Select */}
      <div>
        <Label className="text-base font-medium">Select Recipes for Batch Analysis</Label>
        <div className="mt-3">
          <Select onValueChange={handleRecipeSelect}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Search and add recipes..." />
            </SelectTrigger>
            <SelectContent>
              {recipeDetails.map((recipe) => (
                <SelectItem
                  key={recipe.name}
                  value={recipe.name}
                  disabled={selectedRecipes.some((r) => r.name === recipe.name)}
                >
                  {recipe.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Selected Pills */}
          {selectedRecipes.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {selectedRecipes.map((recipe) => (
                <Badge
                  key={recipe.name}
                  variant="default"
                  className="bg-purple-600 hover:bg-purple-700 text-white pr-1 pl-3 py-1.5 text-sm font-medium"
                >
                  {recipe.name}
                  <button
                    onClick={() => removeRecipe(recipe.name)}
                    className="ml-2 text-white hover:text-gray-200 focus:outline-none"
                  >
                    ×
                  </button>
                </Badge>
              ))}
            </div>
          )}

          {selectedRecipes.length > 0 && (
            <p className="mt-3 text-sm text-muted-foreground">
              {selectedRecipes.length} recipe{selectedRecipes.length !== 1 ? "s" : ""} selected
            </p>
          )}
        </div>
      </div>

      {/* Detection Method & Run Button */}
      {selectedRecipes.length > 0 && (
        <>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div>
              <Label className="text-base font-medium">Detection Method</Label>
              <RadioGroup
                value={detectionMethod}
                onValueChange={(v) => setDetectionMethod(v as string as "database" | "ai" | "both")}
                className="mt-4 space-y-3"
              >
                <div className="flex items-center space-x-3">
                  <RadioGroupItem value="database" id="database" />
                  <Label htmlFor="database" className="cursor-pointer">
                    Database Only
                  </Label>
                </div>
                <div className="flex items-center space-x-3">
                  <RadioGroupItem value="ai" id="ai" />
                  <Label htmlFor="ai" className="cursor-pointer">
                    AI Only (requires API Key)
                  </Label>
                </div>
                <div className="flex items-center space-x-3">
                  <RadioGroupItem value="both" id="both" />
                  <Label htmlFor="both" className="cursor-pointer">
                    Both
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <div className="flex items-center space-x-3 text-red-400">
              <input
                type="checkbox"
                id="auto-save"
                checked={autoSave}
                onChange={(e) => setAutoSave(e.target.checked)}
                className="h-4 w-4 rounded border-gray-300 text-red-600 focus:ring-red-500"
              />
              <Label htmlFor="auto-save" className="cursor-pointer font-medium">
                Auto-save results to recipes
              </Label>
            </div>
          </div>

          <Button
            size="lg"
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-6"
            onClick={runBatchAnalysis}
          >
            <Wand2 className="mr-3 h-5 w-5" />
            Run Batch Analysis
          </Button>

          <div className="h-px bg-linear-to-r from-transparent via-blue-500 to-transparent" />
        </>
      )}

      {/* Completion Message */}
      {analysisComplete && (
        <Card className="bg-green-900/20 border-green-500/30">
          <CardContent className="p-4">
            <p className="dark:text-green-300 text-green-700 font-medium">Batch analysis complete!</p>
          </CardContent>
        </Card>
      )}

      {/* Batch Results */}
      {analysisComplete && (
        <>
          <h2 className="text-2xl font-bold">Batch Results</h2>

          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-12">#</TableHead>
                    <TableHead>Recipe</TableHead>
                    <TableHead>Allergens</TableHead>
                    <TableHead>FDA Top 9</TableHead>
                    <TableHead>Methods</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {selectedRecipes.map((recipe, index) => {
                    const allergenCount = recipe.aiAllergenDetection?.itemsAllergenDetacted.flatMap(i => i.allergens).length || 0;
                    const fdaCount = recipe.aiAllergenDetection?.itemsAllergenDetacted.flatMap(i => i.allergens)
                      .filter(a => ["Milk", "Eggs", "Fish", "Shellfish", "Tree Nuts", "Peanuts", "Wheat", "Soy", "Sesame"].includes(a)).length || 0;

                    return (
                      <TableRow key={recipe.name}>
                        <TableCell className="font-medium">{index}</TableCell>
                        <TableCell className="font-medium">{recipe.name}</TableCell>
                        <TableCell>{allergenCount}</TableCell>
                        <TableCell>{fdaCount}</TableCell>
                        <TableCell>
                          <Badge variant="secondary">AI + DB</Badge>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="pt-6">
                <p className="text-sm text-muted-foreground">Recipes Analyzed</p>
                <p className="text-3xl font-bold mt-2">{selectedRecipes.length}</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <p className="text-sm text-muted-foreground">Total Allergens Detected</p>
                <p className="text-3xl font-bold mt-2">{totalAllergens}</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <p className="text-sm text-muted-foreground">Avg Allergens/Recipe</p>
                <p className="text-3xl font-bold mt-2">{avgAllergensPerRecipe}</p>
              </CardContent>
            </Card>
          </div>

          {autoSave && (
            <Card className="bg-green-900/20 border-green-500/30">
              <CardContent className="p-4">
                <p className="dark:text-green-300 text-green-700 font-medium">All results saved to recipes!</p>
              </CardContent>
            </Card>
          )}
        </>
      )}
    </div>
  );
};