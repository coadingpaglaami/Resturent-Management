"use client";

import { useState } from "react";
import { Trash2, Edit2, Loader2 } from "lucide-react";
import { Heading } from "@/webcomponent/reusable";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

// Types
export interface AllergenItem {
  id: string | number;
  name: string;
}

export interface PaginationData {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
}

export interface AllergenManagementProps {
  // Data
  items: AllergenItem[];
  pagination?: PaginationData;

  // Header
  title: string;
  subtitle: string;

  // API Handlers
  onAdd: (name: string) => Promise<void>;
  onEdit: (id: string | number, newName: string) => Promise<void>;
  onDelete: (id: string | number) => Promise<void>;
  onPageChange?: (page: number) => Promise<void>;

  // UI Customization
  addButtonText?: string;
  inputPlaceholder?: string;
  gridCols?: {
    default?: number;
    sm?: number;
    md?: number;
    lg?: number;
  };

  // Loading states
  isLoading?: boolean;
  loadingItemId?: string | number | null;
}

export const Management = ({
  items,
  pagination,
  title,
  subtitle,
  onAdd,
  onEdit,
  onDelete,
  onPageChange,
  addButtonText = "Add Item",
  inputPlaceholder = "Add new item...",
  gridCols = {
    default: 2,
    sm: 3,
    md: 4,
    lg: 5,
  },
  isLoading = false,
  loadingItemId = null,
}: AllergenManagementProps) => {
  const [newItemName, setNewItemName] = useState("");
  const [editingId, setEditingId] = useState<string | number | null>(null);
  const [editValue, setEditValue] = useState("");
  const [isAdding, setIsAdding] = useState(false);

  const handleAdd = async () => {
    if (!newItemName.trim()) return;

    setIsAdding(true);
    try {
      await onAdd(newItemName.trim());
      setNewItemName("");
    } catch (error) {
      console.error("Error adding item:", error);
    } finally {
      setIsAdding(false);
    }
  };

  const handleEdit = async (id: string | number) => {
    if (!editValue.trim()) return;

    try {
      await onEdit(id, editValue.trim());
      setEditingId(null);
      setEditValue("");
    } catch (error) {
      console.error("Error editing item:", error);
    }
  };

  const handleDelete = async (id: string | number) => {
    try {
      await onDelete(id);
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  const startEdit = (item: AllergenItem) => {
    setEditingId(item.id);
    setEditValue(item.name);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditValue("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAdd();
    }
  };

  const handleEditKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    id: string | number,
  ) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleEdit(id);
    } else if (e.key === "Escape") {
      cancelEdit();
    }
  };

  const gridColsClass = `grid-cols-${gridCols.default || 2} sm:grid-cols-${
    gridCols.sm || 3
  } md:grid-cols-${gridCols.md || 4} lg:grid-cols-${gridCols.lg || 5}`;

  return (
    <div className="p-3 flex flex-col gap-8">
      <Heading title={title} subtitle={subtitle} />

      <Card>
        <CardContent className="p-6">
          {/* Items Grid */}
          {isLoading && items.length === 0 ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
          ) : items.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              No items found. Add your first item below.
            </div>
          ) : (
            <div className={`grid ${gridColsClass} gap-6`}>
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between bg-muted/50 rounded-lg px-4 py-3"
                >
                  {editingId === item.id ? (
                    <Input
                      value={editValue}
                      onChange={(e) => setEditValue(e.target.value)}
                      onKeyDown={(e) => handleEditKeyDown(e, item.id)}
                      onBlur={() => handleEdit(item.id)}
                      autoFocus
                      className="h-8 px-2 py-1 text-sm"
                    />
                  ) : (
                    <>
                      <span className="font-medium truncate text-sm max-w-[120px]">
                        {item.name}
                      </span>
                      <div className="flex items-center gap-1 ml-2 shrink-0">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-muted-foreground hover:text-foreground hover:bg-muted"
                          onClick={() => startEdit(item)}
                          disabled={loadingItemId === item.id}
                        >
                          <Edit2 className="h-4 w-4" />
                          <span className="sr-only">Edit {item.name}</span>
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-destructive hover:bg-destructive/10"
                          onClick={() => handleDelete(item.id)}
                          disabled={loadingItemId === item.id}
                        >
                          {loadingItemId === item.id ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            <Trash2 className="h-4 w-4" />
                          )}
                          <span className="sr-only">Remove {item.name}</span>
                        </Button>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Add New Item */}
          <div className="mt-8 flex gap-3">
            <Input
              placeholder={inputPlaceholder}
              value={newItemName}
              onChange={(e) => setNewItemName(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1"
              disabled={isAdding}
            />
            <Button
              onClick={handleAdd}
              variant="buttonBlue"
              disabled={isAdding || !newItemName.trim()}
            >
              {isAdding ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  Adding...
                </>
              ) : (
                addButtonText
              )}
            </Button>
          </div>

          {/* Pagination */}
          {pagination && pagination.totalPages > 1 && onPageChange && (
            <div className="mt-8 flex items-center justify-between border-t pt-6">
              <div className="text-sm text-muted-foreground">
                Showing{" "}
                {(pagination.currentPage - 1) * pagination.itemsPerPage + 1} to{" "}
                {Math.min(
                  pagination.currentPage * pagination.itemsPerPage,
                  pagination.totalItems,
                )}{" "}
                of {pagination.totalItems} items
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onPageChange(pagination.currentPage - 1)}
                  disabled={pagination.currentPage === 1 || isLoading}
                >
                  Previous
                </Button>
                <div className="flex items-center gap-1">
                  {Array.from(
                    { length: pagination.totalPages },
                    (_, i) => i + 1,
                  )
                    .filter((page) => {
                      // Show first page, last page, current page, and adjacent pages
                      return (
                        page === 1 ||
                        page === pagination.totalPages ||
                        Math.abs(page - pagination.currentPage) <= 1
                      );
                    })
                    .map((page, index, array) => {
                      // Add ellipsis
                      const showEllipsisBefore =
                        index > 0 && page - array[index - 1] > 1;
                      return (
                        <div key={page} className="flex items-center">
                          {showEllipsisBefore && (
                            <span className="px-2 text-muted-foreground">
                              ...
                            </span>
                          )}
                          <Button
                            variant={
                              page === pagination.currentPage
                                ? "default"
                                : "outline"
                            }
                            size="sm"
                            onClick={() => onPageChange(page)}
                            disabled={isLoading}
                            className="min-w-[36px]"
                          >
                            {page}
                          </Button>
                        </div>
                      );
                    })}
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onPageChange(pagination.currentPage + 1)}
                  disabled={
                    pagination.currentPage === pagination.totalPages ||
                    isLoading
                  }
                >
                  Next
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
