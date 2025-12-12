import {
  AlignVerticalJustifyStartIcon,
  LayoutDashboard,
  Mail,
  NotepadText,
  NotepadTextIcon,
  UserCogIcon,
  UserIcon,
  UsersIcon,
  Database,
  Calculator,
  FileText,
  BarChart,
  Box,
} from "lucide-react";

export const sidbaarLinks = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard, // Dashboard Icon
  },
  {
    label: "Costing & Variance",
    href: "/costing&variance",
    icon: Calculator, // Costing & Variance Icon
    dropdown: [
      {
        label: "Calculator",
        href: "/costing&variance/calculator",
        icon: Calculator, // Calculator Icon
      },
      {
        label: "Menu Costing",
        href: "/costing&variance/menu-costing",
        icon: FileText, // Menu Costing Icon
      },
    ],
  },
  {
    label: "Recipes",
    href: "/recipes",
    icon: Database, // Recipes Icon
    dropdown: [
      {
        label: "Builder",
        href: "/recipes/builder",
        icon: Box, // Recipe Builder Icon
      },
      {
        label: "View",
        href: "/recipes/view",
        icon: FileText, // Recipe View Icon
      },
    ],
  },
  {
    label: "Waste & Logs",
    href: "/wast&logs",
    icon: FileText, // Waste & Logs Icon
  },
  {
    label: "Vendors",
    href: "/vendors",
    icon: BarChart, // Vendors Icon
    dropdown: [
      {
        label: "Vendors List",
        href: "/vendors/list",
        icon: Box, // Vendors List Icon
      },
      {
        label: "Price Changes",
        href: "/vendors/price-changes",
        icon: FileText, // Price Changes Icon
      },
    ],
  },
  {
    label: "Analysis",
    href: "/analysis",
    icon: AlignVerticalJustifyStartIcon, // Analysis Icon
    dropdown: [
      {
        label: "Product Mix",
        href: "/analysis/product-mix",
        icon: AlignVerticalJustifyStartIcon, // Product Mix Icon
      },
      {
        label: "Daypart Analysis",
        href: "/analysis/daypart-analysis",
        icon: AlignVerticalJustifyStartIcon, // Daypart Analysis Icon
      },
      {
        label: "Category Performance",
        href: "/analysis/category-perfomance",
        icon: AlignVerticalJustifyStartIcon, // Category Performance Icon
      },
      {
        label: "Discounts & Voids",
        href: "/analysis/discount&void",
        icon: AlignVerticalJustifyStartIcon, // Discounts & Voids Icon
      },
      {
        label: "Labor & Productivity",
        href: "/analysis/labour&productivity",
        icon: AlignVerticalJustifyStartIcon, // Labor & Productivity Icon
      },
      {
        label: "Menu Engineering",
        href: "/analysis/menu-engineering",
        icon: AlignVerticalJustifyStartIcon, // Menu Engineering Icon
      },
    ],
  },
  {
    label: "POS Integration",
    href: "/pos-integration",
    icon: Box, // POS Integration Icon
    dropdown: [
      {
        label: "Connection",
        href: "/pos-integration/connection",
        icon: Box, // Connection Icon
      },
      {
        label: "Import Batches",
        href: "/pos-integration/import-batches",
        icon: Box, // Import Batches Icon
      },
      {
        label: "Item Mapping",
        href: "/pos-integration/item-mapping",
        icon: Box, // Item Mapping Icon
      },
    ],
  },
  {
    label: "AI Tools",
    href: "/ai-tools",
    icon: AlignVerticalJustifyStartIcon, // AI Tools Icon
    dropdown: [
      {
        label: "Allergen Mapping",
        href: "/aitools/allergen-mapping",
        icon: AlignVerticalJustifyStartIcon, // Allergen Mapping Icon
      },
      {
        label: "Recipe Generator",
        href: "/aitools/recipe-generator",
        icon: AlignVerticalJustifyStartIcon, // Recipe Generator Icon
      },
    ],
  },
  {
    label: "Settings",
    href: "/settings",
    icon: UserCogIcon, // Settings Icon
  },
];
