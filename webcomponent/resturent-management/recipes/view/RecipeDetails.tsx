import { ChefHat, Clock, DollarSign, Users } from "lucide-react";
import { RepiesData } from "./Data";

export const RecipeSheetView = ({ recipe }: { recipe: RepiesData }) => {
  return (
    <>
      <div className="grid grid-cols-3 gap-3 p-4 border-b">
        <div className="flex flex-col items-center p-3 rounded-lg">
          <Users className="w-5 h-5 text-emerald-600 mb-1" />
          <span className="text-xs">Servings</span>
          <span className="text-lg font-semibold">{recipe.servings}</span>
        </div>
        <div className="flex flex-col items-center p-3 rounded-lg">
          <Clock className="w-5 h-5 text-blue-600 mb-1" />
          <span className="text-xs">Prep</span>
          <span className="text-lg font-semibold">
            {recipe.preparationTime}
          </span>
        </div>
        <div className="flex flex-col items-center p-3 rounded-lg">
          <ChefHat className="w-5 h-5 text-orange-600 mb-1" />
          <span className="text-xs">Cook</span>
          <span className="text-lg font-semibold">{recipe.cookingTime}</span>
        </div>
      </div>

      {/* Ingredients */}
      <div className="p-4 border-b">
        <h3 className="text-lg font-semibold mb-3">Ingredients</h3>
        <div className="space-y-2">
          {recipe.ingredients.map((ingredient, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 rounded-lg transition-colors"
            >
              <div className="flex items-center gap-3 flex-1">
                <span className="text-sm font-medium">{ingredient.name}</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-sm">
                  {ingredient.quantity} {ingredient.unit}
                </span>
                <span className="text-sm font-semibold flex items-center gap-1 min-w-[60px] justify-end">
                  <DollarSign className="w-3 h-3 text-emerald-600" />
                  {ingredient.cost.toFixed(2)}
                </span>
              </div>
            </div>
          ))}
          <div className="flex justify-end pt-2 pr-3">
            <span className="text-base font-bold flex items-center gap-1">
              Total: <DollarSign className="w-4 h-4 text-emerald-600" />
              {recipe.ingredients
                .reduce((sum, ing) => sum + ing.cost, 0)
                .toFixed(2)}
            </span>
          </div>
        </div>
      </div>

      {/* Cooking Instructions */}
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-3">Cooking Instructions</h3>
        <div className="space-y-4">
          {recipe.instructions.map((instruction, index) => (
            <div key={index} className="flex gap-4">
              <div className="shrink-0">
                <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center font-semibold text-sm">
                  {index + 1}
                </div>
              </div>
              <div className="flex-1 pt-1">
                <p className="text-sm leading-relaxed">{instruction}</p>
              </div>
              <div className="shrink-0 w-16 h-16 rounded-lg flex items-center justify-center">
                <ChefHat className="w-8 h-8 text-slate-400" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
