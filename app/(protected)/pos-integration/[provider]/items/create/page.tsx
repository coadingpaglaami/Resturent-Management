import { Props } from "@/types/Provider"
import { ItemCreateOrUpdate } from "@/webcomponent/resturent-management"

export default async function ItemCreateOrUpdatePage({ params }: Props) {
    const { provider } = await params;

    return <ItemCreateOrUpdate provider={provider} />
}