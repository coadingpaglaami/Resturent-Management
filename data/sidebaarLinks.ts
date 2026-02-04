import {
  AlignVerticalJustifyStartIcon,
  LayoutDashboard,
  UserCogIcon,
  Database,
  Calculator,
  FileText,
  BarChart,
  Box,
  Package,
} from "lucide-react";

export const sidbaarLinks = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: " Inventory",
    href: "/inventory",
    icon: Package,
    dropdown: [
      {
        label: "Inventory Database",
        href: "/inventory/inventory-database",
      },
      {
        label: " Inventory Counts",
        href: "/inventory/inventory-counts",
      },
      {
        label: "Inventory Summary",
        href: "/inventory/inventory-summary",
      },
    ],
  },
  {
    label: "Costing & Variance",
    href: "/costing&variance",
    icon: Calculator,
    dropdown: [
      {
        label: "Calculator",
        href: "/costing&variance/calculator",
      },
      {
        label: "Menu Costing",
        href: "/costing&variance/menu-costing",
      },
    ],
  },
  {
    label: "Recipes",
    href: "/recipes",
    icon: Database,
    dropdown: [
      {
        label: "Builder",
        href: "/recipes/builder",
      },
      {
        label: "View",
        href: "/recipes/view",
      },
    ],
  },
  {
    label: "Waste & Logs",
    href: "/wast&logs",
    icon: FileText,
  },
  {
    label: "Vendors",
    href: "/vendors",
    icon: BarChart,
    dropdown: [
      {
        label: "Vendors List",
        href: "/vendors/list",
      },
      {
        label: "Price Changes",
        href: "/vendors/price-changes",
      },
    ],
  },
  {
    label: "Analysis",
    href: "/analysis",
    icon: AlignVerticalJustifyStartIcon,
    dropdown: [
      {
        label: "Product Mix",
        href: "/analysis/product-mix",
      },
      {
        label: "Daypart Analysis",
        href: "/analysis/daypart-analysis",
      },
      {
        label: "Category Performance",
        href: "/analysis/category-perfomance",
      },
      {
        label: "Discounts & Voids",
        href: "/analysis/discount&void",
      },
      {
        label: "Labor & Productivity",
        href: "/analysis/labour&productivity",
      },
      {
        label: "Menu Engineering",
        href: "/analysis/menu-engineering",
      },
    ],
  },
  {
    label: "POS Integration",
    href: "/pos-integration",
    icon: Box,
    dropdown: [
      {
        label: "Connection",
        href: "/pos-integration/connection",
      },
      // {
      //   label: "Import Batches",
      //   href: "/pos-integration/import-batches",
      // },
      // {
      //   label: "Item Mapping",
      //   href: "/pos-integration/item-mapping",
      // },
    ],
  },
  {
    label: "AI Tools",
    href: "/ai-tools",
    icon: AlignVerticalJustifyStartIcon,
    dropdown: [
      {
        label: "Allergen Mapping",
        href: "/aitools/allergen-mapping",
      },
      {
        label: "Recipe Generator",
        href: "/aitools/recipe-generator",
      },
    ],
  },
  {
    label: "Settings",
    href: "/settings",
    icon: UserCogIcon,
  },
];
