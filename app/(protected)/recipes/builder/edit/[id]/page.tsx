import { Builder, recipesDataArray } from "@/webcomponent/resturent-management";


export default async function EditRecipePage({
  params,
}: {
params: Promise<{id:string}>;
}) {
    const { id } = await params;
  const recipe = recipesDataArray.find(
    (r) => r.id === Number(id)
  );

  if (!recipe) {
    return <div>Recipe not found</div>;
  }

  return <Builder mode="edit" recipeData={recipe} />;
}
