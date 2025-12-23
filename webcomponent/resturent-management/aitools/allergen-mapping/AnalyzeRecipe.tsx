"use client";

import { useState } from "react";
import { Search, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { recipeDetails, type RecipeDetails } from "./Data";

const fdaTop9 = [
  "Milk/Dairy",
  "Eggs",
  "Fish",
  "Shellfish",
  "Tree Nuts",
  "Peanuts",
  "Wheat",
  "Soy",
  "Sesame",
];
const additionalAllergens = [
  "Gluten",
  "Corn",
  "Sulfites",
  "Nightshades",
  "Mustard",
  "Celery",
  "Lupin",
];

export const AnalyzeRecipe = () => {
  const [selectedRecipe, setSelectedRecipe] = useState<RecipeDetails | null>(
    null
  );
  const [aiResult, setAiResult] = useState<
    RecipeDetails["aiAllergenDetection"] | null
  >(null);
  const [manualTags, setManualTags] = useState<string[]>([]);
  const [qrGenerated, setQrGenerated] = useState(false);

  const handleRecipeChange = (value: string) => {
    const recipe = recipeDetails.find((r) => r.name === value) || null;
    setSelectedRecipe(recipe);
    setAiResult(null);
    setManualTags([]);
    setQrGenerated(false);
  };

  const runAIAnalysis = () => {
    if (selectedRecipe?.aiAllergenDetection) {
      setAiResult(selectedRecipe.aiAllergenDetection);
    }
  };

  const runDatabaseMatch = () => {
    // Simulate database match - using same AI data for demo
    if (selectedRecipe?.aiAllergenDetection) {
      setAiResult(selectedRecipe.aiAllergenDetection);
    }
  };

  const generateCombinedReport = () => {
    // In real app: combine AI + manual tags
    alert("Combined report generated! (Demo)");
  };

  const generateQRCode = () => {
    // Simulate QR generation + auto download
    setQrGenerated(true);
    setTimeout(() => {
      alert("QR Code downloaded as SVG & PNG!");
    }, 500);
  };

  const getSeverityBg = (severity?: string) => {
    if (!severity) return "";
    switch (severity) {
      case "High":
        return "bg-red-900/30 border-red-500/50";
      case "Medium":
        return "bg-orange-900/30 border-orange-500/50";
      case "Low":
        return "bg-green-900/30 border-green-500/50";
      default:
        return "";
    }
  };

  const allDetectedAllergens = Array.from(
    new Set([
      ...(aiResult?.itemsAllergenDetacted.flatMap((i) => i.allergens) || []),
      ...manualTags,
    ])
  );

  return (
    <div className="flex flex-col gap-8">
      {/* Recipe Selector */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
        <div className="flex-1 w-full">
          <Label htmlFor="recipe-select" className="text-sm font-medium">
            Select Recipe to Analyze
          </Label>
          <Select
            value={selectedRecipe?.name || ""}
            onValueChange={handleRecipeChange}
          >
            <SelectTrigger id="recipe-select" className="mt-2 w-full">
              <SelectValue placeholder="No recipe selected yet" />
            </SelectTrigger>
            <SelectContent>
              {recipeDetails.map((recipe) => (
                <SelectItem key={recipe.name} value={recipe.name}>
                  {recipe.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Recipe Details */}
      {selectedRecipe && (
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">Recipe Details</h3>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-6 text-sm">
              <div>
                <p className="text-muted-foreground">Category</p>
                <p className="font-medium">{selectedRecipe.category}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Servings</p>
                <p className="font-medium">{selectedRecipe.servings}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Prep Time</p>
                <p className="font-medium">20m</p>
              </div>
              <div>
                <p className="text-muted-foreground">Cook Time</p>
                <p className="font-medium">15m</p>
              </div>
              <div>
                <p className="text-muted-foreground">Total Cost</p>
                <p className="font-medium text-green-400">
                  ${selectedRecipe.totalCost.toFixed(2)}
                </p>
              </div>
            </div>
            <div className="mt-4">
              <p className="text-muted-foreground text-sm">Ingredients</p>
              <p className="font-medium">
                {selectedRecipe.ingredients.join(", ")}
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* AI & Database Analysis */}
      {selectedRecipe && (
        <div className="grid md:grid-cols-2 gap-6">
          <Card
            className="hover:bg-muted/30 transition-colors cursor-pointer"
            onClick={runAIAnalysis}
          >
            <CardContent className="p-8 text-center">
              <div className="flex justify-center mb-4">
                <Search className="h-10 w-10 text-muted-foreground" />
              </div>
              <h4 className="font-semibold mb-2">AI Detection</h4>
              <p className="text-sm text-muted-foreground mb-6">
                Use Claude AI to analyze recipe and detect allergens
              </p>
              <Button className="w-full bg-purple-600 hover:bg-purple-700">
                Run AI Analysis
              </Button>
            </CardContent>
          </Card>

          <Card
            className="hover:bg-muted/30 transition-colors cursor-pointer"
            onClick={runDatabaseMatch}
          >
            <CardContent className="p-8 text-center">
              <div className="flex justify-center mb-4">
                <div className="h-10 w-10 bg-muted rounded flex items-center justify-center">
                  <span className="text-xl">📄</span>
                </div>
              </div>
              <h4 className="font-semibold mb-2">Database Matching</h4>
              <p className="text-sm text-muted-foreground mb-6">
                Match ingredients against known allergen database
              </p>
              <Button className="w-full bg-purple-600 hover:bg-purple-700">
                Run Database Match
              </Button>
            </CardContent>
          </Card>
        </div>
      )}

      {/* AI Result Display */}
      {aiResult && (
        <Card className={`border-2 ${getSeverityBg(aiResult.severityType)}`}>
          <CardContent className="p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h4 className="font-semibold text-lg">
                  AI Allergen Detection Results
                </h4>
                <Badge
                  className="mt-2"
                  variant={
                    aiResult.severityType === "High"
                      ? "destructive"
                      : aiResult.severityType === "Medium"
                      ? "secondary"
                      : "default"
                  }
                >
                  Severity: {aiResult.severityType}
                </Badge>
              </div>
            </div>
            <div className="space-y-3">
              {aiResult.itemsAllergenDetacted.map((item, i) => (
                <div key={i} className="flex justify-between text-sm">
                  <span className="font-medium">{item.ingredient}</span>
                  <span className="text-muted-foreground">
                    {item.allergens.join(", ")}
                  </span>
                </div>
              ))}
            </div>
            <p className="mt-6 text-sm italic text-muted-foreground">
              {aiResult.notes}
            </p>
          </CardContent>
        </Card>
      )}

      {/* Manual Allergen Tagging */}
      {selectedRecipe && (
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-6">
              Manual Allergen Tagging
            </h3>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="font-medium mb-4">FDA Top 9 Allergens</h4>
                <div className="space-y-3">
                  {fdaTop9.map((allergen) => (
                    <div key={allergen} className="flex items-center space-x-3">
                      <Checkbox
                        id={allergen}
                        checked={manualTags.includes(allergen)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setManualTags([...manualTags, allergen]);
                          } else {
                            setManualTags(
                              manualTags.filter((t) => t !== allergen)
                            );
                          }
                        }}
                      />
                      <Label htmlFor={allergen} className="cursor-pointer">
                        {allergen}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-4">Additional Allergens</h4>
                <div className="space-y-3">
                  {additionalAllergens.map((allergen) => (
                    <div key={allergen} className="flex items-center space-x-3">
                      <Checkbox
                        id={allergen}
                        checked={manualTags.includes(allergen)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setManualTags([...manualTags, allergen]);
                          } else {
                            setManualTags(
                              manualTags.filter((t) => t !== allergen)
                            );
                          }
                        }}
                      />
                      <Label htmlFor={allergen} className="cursor-pointer">
                        {allergen}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Combined Report */}
      {(aiResult || manualTags.length > 0) && (
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">
              Combined Allergen Report
            </h3>
            <p className="text-sm text-muted-foreground mb-6">
              Generate a comprehensive report combining AI detection, database
              matching, and manual tags
            </p>
            <Button
              onClick={generateCombinedReport}
              className="bg-purple-600 hover:bg-purple-700"
            >
              Generate Combined Report
            </Button>

            {/* Summary Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
              <Card>
                <CardContent className="p-4 text-center">
                  <p className="text-2xl font-bold">
                    {allDetectedAllergens.length}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Total Allergens
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <p className="text-2xl font-bold">
                    {
                      allDetectedAllergens.filter((a) => fdaTop9.includes(a))
                        .length
                    }
                  </p>
                  <p className="text-sm text-muted-foreground">FDA Top 9</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <p className="text-2xl font-bold">
                    {aiResult ? "AI + Manual" : "Manual"}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Detection Method
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <p className="text-2xl font-bold">92%</p>
                  <p className="text-sm text-muted-foreground">
                    Avg Confidence
                  </p>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>
      )}

      {/* QR Code Generator */}
      {selectedRecipe && (
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">Generate QR Code</h3>
            <p className="text-sm text-muted-foreground mb-6">
              Create a QR code that customers can scan to view allergen
              information
            </p>
            <Button
              onClick={generateQRCode}
              disabled={qrGenerated}
              className="bg-purple-600 hover:bg-purple-700"
            >
              {qrGenerated ? (
                <>QR Code Generated & Downloaded!</>
              ) : (
                <>
                  <Download className="mr-2 h-4 w-4" />
                  Generate QR Code
                </>
              )}
            </Button>
            {qrGenerated && (
              <p className="text-sm text-green-400 mt-4">
                SVG & PNG files have been automatically downloaded.
              </p>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};
