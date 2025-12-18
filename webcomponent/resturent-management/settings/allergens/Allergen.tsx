"use client";

import { useState } from "react";
import { Trash2 } from "lucide-react";
import { Heading } from "@/webcomponent/reusable";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

const initialAllergens = [
  "Milk",
  "Eggs",
  "Fish",
  "Shellfish",
  "Tree Nuts",
  "Peanuts",
  "Wheat",
  "Gluten",
  "Soy",
  "Sesame",
];

export const Allergen = () => {
  const [allergens, setAllergens] = useState<string[]>(initialAllergens);
  const [newAllergen, setNewAllergen] = useState("");

  const handleAddAllergen = () => {
    if (newAllergen.trim() && !allergens.includes(newAllergen.trim())) {
      setAllergens([...allergens, newAllergen.trim()]);
      setNewAllergen("");
    }
  };

  const handleRemoveAllergen = (allergen: string) => {
    setAllergens(allergens.filter((a) => a !== allergen));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddAllergen();
    }
  };

  return (
    <div className="p-3 flex flex-col gap-8">
      <Heading
        title="Allergen Management"
        subtitle="Manage allergen types tracked across your ingredients and recipes"
      />

      {/* Allergen Grid */}
      <Card>
        <CardContent className="p-6">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {allergens.map((allergen) => (
              <div
                key={allergen}
                className="flex items-center justify-between bg-muted/50 rounded-lg px-4 py-3"
              >
                <span className="font-medium">{allergen}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-destructive hover:bg-destructive/10"
                  onClick={() => handleRemoveAllergen(allergen)}
                >
                  <Trash2 className="h-4 w-4" />
                  <span className="sr-only">Remove {allergen}</span>
                </Button>
              </div>
            ))}
          </div>

          {/* Add New Allergen */}
          <div className="mt-8 flex gap-3">
            <Input
              placeholder="Add new allergen..."
              value={newAllergen}
              onChange={(e) => setNewAllergen(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1"
            />
            <Button onClick={handleAddAllergen} variant={"buttonBlue"}>
              Add Allergen
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};