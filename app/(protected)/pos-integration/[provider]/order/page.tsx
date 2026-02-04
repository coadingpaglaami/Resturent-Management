import { Props } from "@/types/Provider";
import { OrderProvider } from "@/webcomponent/resturent-management";

export default async function OrderPage({ params }: Props) {
  const { provider } = await params;
  return <OrderProvider provider={provider} />;
}
