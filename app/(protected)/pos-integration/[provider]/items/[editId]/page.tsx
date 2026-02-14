
import { ItemCreateOrUpdate } from "@/webcomponent/resturent-management";

interface EditProps {
  params:Promise< {
    provider: string;
    editId: string;
  }>;
}
export default async function ItemEditPage({ params }: EditProps) {
    const resolvedParams = await params; // now { provider: string, editId: string }
    const { provider, editId } = resolvedParams;          // destructure safely

    console.log(editId, provider);

    return <ItemCreateOrUpdate provider={provider} editId={editId} />
}
