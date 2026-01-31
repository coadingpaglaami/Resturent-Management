import { Allergen } from "./allergens";
import { Location } from "./location";
import { RecipieCategory } from "./recipiecategory";

export const ConstrainMain = () => {
  return (
    <div className="space-y-4">
      <Allergen />
      <Location />
      <RecipieCategory />
    </div>
  );
};
