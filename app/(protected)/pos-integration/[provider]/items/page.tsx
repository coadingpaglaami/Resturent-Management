import { Props } from "@/types/Provider";
import { ItemsProvider } from "@/webcomponent/resturent-management";

export default async function ItemsPage({ params }:Props) {
  const { provider } = await params;
  return <ItemsProvider provider={provider} />;
}
