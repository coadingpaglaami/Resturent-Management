"use client";

import { recipeDetails } from "./Data";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const fdaTop9 = [
  "Milk",
  "Eggs",
  "Fish",
  "Shellfish",
  "Tree Nuts",
  "Peanuts",
  "Wheat",
  "Soy",
  "Sesame",
];

export const AllergenDataReports = () => {
  // Flatten all allergens from all recipes
  const allAllergens = recipeDetails.flatMap(
    (recipe) =>
      recipe.aiAllergenDetection?.itemsAllergenDetacted.flatMap(
        (item) => item.allergens
      ) || []
  );

  // Unique allergens across all recipes
  const uniqueAllergens = Array.from(new Set(allAllergens));

  // Count occurrences per allergen
  const allergenCounts = uniqueAllergens.map((allergen) => {
    const count = recipeDetails.filter((recipe) =>
      recipe.aiAllergenDetection?.itemsAllergenDetacted.some((item) =>
        item.allergens.includes(allergen)
      )
    ).length;

    const isFdaTop9 = fdaTop9.includes(allergen);

    return {
      allergen,
      recipesAffected: count,
      totalRecipes: recipeDetails.length,
      isFdaTop9,
    };
  });

  // Sort by number of recipes affected (descending)
  allergenCounts.sort((a, b) => b.recipesAffected - a.recipesAffected);

  // Summary stats
  const totalUniqueAllergens = uniqueAllergens.length;
  const fdaTop9Detected = allergenCounts.filter((a) => a.isFdaTop9).length;
  const recipesWithAllergens = recipeDetails.filter(
    (r) =>
      r.aiAllergenDetection?.itemsAllergenDetacted != undefined &&
      r.aiAllergenDetection?.itemsAllergenDetacted.length > 0
  ).length;

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h2 className="text-2xl font-semibold">Allergen Data Reports</h2>
        <p className="text-muted-foreground mt-2">
          Comprehensive overview of allergens detected across all recipes
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground">
              Total Unique Allergens
            </p>
            <p className="text-3xl font-bold mt-2">{totalUniqueAllergens}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground">FDA Top 9 Detected</p>
            <p className="text-3xl font-bold mt-2">{fdaTop9Detected}/9</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground">Recipes Analyzed</p>
            <p className="text-3xl font-bold mt-2">{recipeDetails.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground">
              Recipes with Allergens
            </p>
            <p className="text-3xl font-bold mt-2">{recipesWithAllergens}</p>
          </CardContent>
        </Card>
      </div>

      {/* Allergen Breakdown Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Allergen</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Recipes Affected</TableHead>
                <TableHead className="text-right">% of Menu</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {allergenCounts.map((item) => {
                const percentage = (
                  (item.recipesAffected / item.totalRecipes) *
                  100
                ).toFixed(1);

                return (
                  <TableRow key={item.allergen}>
                    <TableCell className="font-medium">
                      {item.allergen}
                    </TableCell>
                    <TableCell>
                      {item.isFdaTop9 ? (
                        <Badge className="bg-red-900 text-red-100">
                          FDA Top 9
                        </Badge>
                      ) : (
                        <Badge variant="secondary">Additional</Badge>
                      )}
                    </TableCell>
                    <TableCell>{item.recipesAffected}</TableCell>
                    <TableCell className="text-right font-medium">
                      {percentage}%
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Per-Recipe Allergen Matrix (Optional Bonus Table) */}
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-4">
            Allergen Matrix by Recipe
          </h3>
          <div className="overflow-x-auto md:max-w-[80vw]">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="sticky left-0 bg-background">
                    Recipe
                  </TableHead>
                  {uniqueAllergens.map((allergen) => (
                    <TableHead key={allergen} className="text-center min-w-24">
                      {allergen}
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {recipeDetails.map((recipe) => {
                  const recipeAllergens =
                    recipe.aiAllergenDetection?.itemsAllergenDetacted.flatMap(
                      (i) => i.allergens
                    ) || [];

                  return (
                    <TableRow key={recipe.name}>
                      <TableCell className="font-medium sticky left-0 bg-background">
                        {recipe.name}
                      </TableCell>
                      {uniqueAllergens.map((allergen) => (
                        <TableCell key={allergen} className="text-center">
                          {recipeAllergens.includes(allergen) ? (
                            <span className="text-green-400 font-bold text-lg">
                              ✓
                            </span>
                          ) : (
                            <span className="text-muted-foreground">–</span>
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
