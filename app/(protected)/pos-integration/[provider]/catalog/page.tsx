import { Props } from "@/types/Provider";
import { Catalog } from "@/webcomponent/resturent-management";

export default async function ItemsPage({ params }: Props) {

  return (
    <Catalog params={params} />
  )
  ;
}
