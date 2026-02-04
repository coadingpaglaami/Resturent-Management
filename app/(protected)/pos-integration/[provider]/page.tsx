import { Props } from "@/types/Provider";
import { ProviderLinks } from "@/webcomponent/resturent-management";

export default async function ProviderPage({ params }: Props) {
  return (
    <ProviderLinks params={params} />
  );
}
