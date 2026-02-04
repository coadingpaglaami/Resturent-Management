import { Allergen } from "./allergens";
import { FoodStorage } from "./food-storage";
import { Location } from "./location";
import { RecipieCategory } from "./recipiecategory";

export const ConstrainMain = () => {
  return (
    <div className="space-y-4">
      <Allergen />
      <Location />
      <RecipieCategory />
      <FoodStorage />
    </div>
  );
};
