'use client';
import { Props } from "@/types/Provider";


export const Catalog = async({params}:Props) => {
  const { provider } = await params;
  return (
    <div>
      Catalog for {provider}
    </div>
  );
};
