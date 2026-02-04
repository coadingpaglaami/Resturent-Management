import { Props } from "@/types/Provider";
import { Customers } from "@/webcomponent/resturent-management";

export default async function CustomerPage({params}:Props) {
   const {provider} =await params
  return <Customers provider={provider} />;
}
