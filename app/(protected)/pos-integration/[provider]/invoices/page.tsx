import { Props } from "@/types/Provider";
import { Invoices } from "@/webcomponent/resturent-management";

export default async function InvoicePage({ params }: Props) {
  const { provider } = await params;
  return <Invoices provider={provider} />;
}
