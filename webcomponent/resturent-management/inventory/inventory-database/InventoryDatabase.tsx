"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ButtonIcon, Card, Heading } from "@/webcomponent/reusable";
import { cardDataInventory } from "./Data";
import { ArrowUp, Plus } from "lucide-react";
import { DataBaseTable } from "./DatabaseTable";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useGetAllInventoryCategoriesQuery, useGetInventoryItemListQuery } from "@/api/inventory";


export const InventoryDatabase = () => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [categoryFilter, setCategoryFilter] = useState("all");
  const router = useRouter();

  // Fetch inventory items with object destructuring
  const {
    data: inventoryData,
    isLoading: isLoadingInventory,
    isError: isInventoryError,
  } = useGetInventoryItemListQuery({ page, limit: 10 });

  // Fetch categories with object destructuring
  const { data: categoriesData, isLoading: isLoadingCategories } =
    useGetAllInventoryCategoriesQuery({ page: 1, limit: 10 });

  if (isLoadingInventory || isLoadingCategories) {
    return (
      <div className="py-16 flex flex-col gap-4">
        <Heading
          title="Inventory Database"
          subtitle="Loading..."
        />
      </div>
    );
  }

  if (isInventoryError) {
    return (
      <div className="py-16 flex flex-col gap-4">
        <Heading
          title="Inventory Database"
          subtitle="Failed to load inventory data"
        />
      </div>
    );
  }

  return (
    <div className="py-16 flex flex-col gap-4">
      <div className="flex items-center justify-between gap-3.5">
        <Heading
          title="Inventory Database"
          subtitle="Manage your ingredient inventory and pricing"
        />
        <div className="flex items-center gap-2.5">
          <ButtonIcon
            varient="secondaryTwo"
            icon={<ArrowUp className="w-4 h-4" />}
          >
            Import
          </ButtonIcon>
          <ButtonIcon
            varient="primary"
            icon={<Plus className="w-4 h-4" />}
            onClick={() =>
              router.push("/inventory/inventory-database/add-inventory")
            }
          >
            Add Ingredient
          </ButtonIcon>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {cardDataInventory.map((card, index) => (
          <Card key={index} {...card} />
        ))}
      </div>

      <div className="flex items-center gap-2 w-full">
        {/* Search Bar - 90% */}
        <div className="flex items-center w-[90%] border rounded-md px-3 py-2 bg-white dark:bg-[#1E2A37]">
          <svg
            className="w-5 h-5 text-gray-400 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-4.35-4.35M16.65 16.65A7.5 7.5 0 1110 2.5a7.5 7.5 0 016.65 14.15z"
            />
          </svg>
          <input
            type="text"
            placeholder="Search products by name or SKU"
            className="w-full bg-transparent outline-none text-sm text-gray-700 dark:text-gray-200"
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Category Select - 10% */}
        <div className="w-[10%]">
          <Select
            defaultValue="all"
            onValueChange={(value) => setCategoryFilter(value)}
          >
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categoriesData?.results?.map((category) => (
                <SelectItem key={category.id} value={category.id}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div>
        <DataBaseTable
          data={inventoryData?.results || []}
          categoryFilter={categoryFilter}
          searchValue={search}
          currentPage={page}
          totalPages={Math.ceil((inventoryData?.count || 0) / 10)}
          onPageChange={setPage}
        />
      </div>
    </div>
  );
};