import { Props } from "@/types/Provider";
import { CatalogProvider } from "@/webcomponent/resturent-management";

export default async function ItemsPage({ params }: Props) {
  const { provider } = await params;

  return <CatalogProvider provider={provider} />;
}
