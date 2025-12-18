"use client";

import { useState } from "react";
import { Search, Filter } from "lucide-react";
import { Heading } from "@/webcomponent/reusable";
import { ItemMapping as ItemMappingData, itemMappingData } from "./Data";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const mappingTypes = [
  "Complete Match (1:1)",
  "Partial Match",
  "Customer Ratio",
];

const recipeOptions = [
  "Classic Burger Recipe",
  "Caesar Salad",
  "Chicken Wing Recipe",
  "Fish Taco",
  "Margherita Pizza",
  "Standard Drink Cost",
  "Fries (oil not mapped)",
  "Steak Dinner Recipe",
  "Vegetable Stir Fry",
  "Pasta Carbonara",
  "Grilled Salmon",
];

export const ItemMapping = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<ItemMappingData | null>(null);

  // Unique categories for filter
  const categories = Array.from(new Set(itemMappingData.map((item) => item.category)));
  categories.unshift("All Items"); // For "all" option

  // Filter logic
  const filteredData = itemMappingData.filter((item) => {
    const matchesSearch = item.posItemName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || selectedCategory === "All Items" || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Summary counts
  const totalItems = itemMappingData.length;
  const mappedCount = itemMappingData.filter((i) => i.status === "Mapped").length;
  const unmappedCount = itemMappingData.filter((i) => i.status === "Unmapped").length;
  const partialCount = itemMappingData.filter((i) => i.status === "Partial").length;

  const openEditDialog = (item: ItemMappingData ) => {
    setSelectedItem(item);
    setIsDialogOpen(true);
  };

  return (
    <div className="py-16 flex flex-col gap-8">
      <Heading
        title="Item Mapping"
        subtitle="Map POS menu items to recipes for accurate cost tracking"
      />

      {/* Summary Badges */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-sm text-muted-foreground">Total Items</div>
            <div className="text-2xl font-bold">{totalItems}</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-sm text-muted-foreground">Mapped</div>
            <div className="text-2xl font-bold flex items-center gap-2">
              {mappedCount}
              <Badge variant="default" className="bg-green-900 text-green-50">
                Complete
              </Badge>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-sm text-muted-foreground">Unmapped</div>
            <div className="text-2xl font-bold flex items-center gap-2">
              {unmappedCount}
              <Badge variant="destructive">0</Badge>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-sm text-muted-foreground">Partial</div>
            <div className="text-2xl font-bold flex items-center gap-2">
              {partialCount}
              <Badge variant="secondary">1</Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search + Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search items..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-full sm:w-48">
            <Filter className="h-4 w-4 mr-2" />
            <SelectValue placeholder="All Items" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Items</SelectItem>
            {categories.filter(cat => cat !== "All Items").map((cat) => (
              <SelectItem key={cat} value={cat}>
                {cat}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>POS Item</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Sales (7d)</TableHead>
                <TableHead>Revenue</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Mapped Recipe</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.map((item) => (
                <TableRow key={item.posItemName}>
                  <TableCell className="font-medium">{item.posItemName}</TableCell>
                  <TableCell>{item.category}</TableCell>
                  <TableCell>{item.sales7d.toLocaleString()}</TableCell>
                  <TableCell>${item.revenue.toLocaleString()}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        item.status === "Mapped"
                          ? "default"
                          : item.status === "Unmapped"
                          ? "destructive"
                          : "secondary"
                      }
                      className={
                        item.status === "Mapped" ? "bg-green-900 text-green-50" : ""
                      }
                    >
                      {item.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {item.mappedRecipe}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      size="sm"
                      onClick={() => openEditDialog(item)}
                      className="bg-[#155DFC]"
                    >
                      Edit Mapping
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Edit Mapping Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="">
          <DialogHeader>
            <DialogTitle>Map Recipe to POS Item</DialogTitle>
          </DialogHeader>

          {selectedItem && (
            <div className="grid gap-6 py-4">
              <div className="text-sm dark:bg-gray-800 flex flex-col gap-1 p-2.5 rounded-md">
                <span className="dark:text-gray-300">POS Item:</span> {selectedItem.posItemName}
                <span className="text-xs dark:text-gray-400">{selectedItem.category}</span>
              </div>

              <div className=" flex flex-col gap-2">
                <Label htmlFor="recipe">Select Recipe</Label>
                <Select defaultValue={selectedItem.mappedRecipe.includes("No recipe") ? undefined : selectedItem.mappedRecipe} >
                  <SelectTrigger id="recipe" className="dark:bg-gray-700 w-full">
                    <SelectValue placeholder="Choose a recipe..." />
                  </SelectTrigger>
                  <SelectContent className="w-full">
                    {recipeOptions.map((recipe) => (
                      <SelectItem key={recipe} value={recipe}>
                        {recipe}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor="mappingType">Mapping Type</Label>
                <Select defaultValue="Complete Match (1:1)">
                  <SelectTrigger id="mappingType" className="dark:bg-gray-700 w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="w-full">
                    {mappingTypes.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="notes">Notes (Optional)</Label>
                <Textarea
                  id="notes"
                  placeholder="Add any notes about this mapping..."
                  className="resize-none"
                  rows={3}
                />
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setIsDialogOpen(false)} className="bg-[#155DFC]">Save Mapping</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};