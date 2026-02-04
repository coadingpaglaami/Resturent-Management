import { Props } from "@/types/Provider";
import { ChevronRight } from "lucide-react";
import { SquareSyncByLocation } from "./SyncSquareByLocation";

export const ProviderLinks = async ({ params }: Props) => {
  const resolvedParams = await params;

  const links = [
    {
      label: "Catalog",
      link: `/pos-integration/${resolvedParams.provider}/catalog`,
    },
    {
      label: "Items",
      link: `/pos-integration/${resolvedParams.provider}/items`,
    },
    {
      label: "Customers",
      link: `/pos-integration/${resolvedParams.provider}/customers`,
    },
    {
      label: "Order",
      link: `/pos-integration/${resolvedParams.provider}/order`,
    },
    {
      label: "Invoices",
      link: `/pos-integration/${resolvedParams.provider}/invoices`,
    },
    {
      label: "Payments",
      link: `/pos-integration/${resolvedParams.provider}/payments`,
    },
    {
      label: "Inventory",
      link: `/pos-integration/${resolvedParams.provider}/inventory`,
    },
  ];

  return (
    <div className="w-full max-w-7xl mx-auto p-4 bg-slate-50 dark:bg-[#0f172a] min-h-screen transition-colors duration-300">
      <nav className="flex flex-col gap-2">
        {links.map((item, index) => (
          <a
            key={index}
            href={item.link}
            className="group flex items-center justify-between px-4 py-4 rounded-md 
                       bg-white dark:bg-[#111827] 
                       hover:bg-slate-100 dark:hover:bg-[#1e293b] 
                       border border-slate-200 dark:border-transparent
                       shadow-sm transition-all duration-200"
          >
            <span className="text-sm font-medium text-slate-700 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-white">
              {item.label}
            </span>

            <ChevronRight
              size={18}
              className="text-slate-400 dark:text-slate-500 group-hover:translate-x-1 transition-transform"
            />
          </a>
        ))}
      </nav>
      <SquareSyncByLocation />
    </div>
  );
};
