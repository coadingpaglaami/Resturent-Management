"use client";

import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  // Generate page numbers with "..." logic
  const getPagination = () => {
    const pages: (number | string)[] = [];
    for (let i = 1; i <= totalPages; i++) {
      if (i <= 3 || i > totalPages - 2 || i === currentPage) {
        pages.push(i);
      } else if (i === 4 && currentPage > 4) {
        pages.push("...");
      } else if (i === totalPages - 2 && currentPage < totalPages - 3) {
        pages.push("...");
      }
    }
    return pages;
  };

  return (
    <div className="flex justify-end mt-2 gap-2 items-center">
      {/* Prev button */}
      <button
        onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
        className="px-2 py-1 rounded-md text-sm bg-gray-200 dark:bg-[#314158] hover:bg-gray-300 dark:hover:bg-[#433D55]"
        disabled={currentPage === 1}
      >
        Prev
      </button>

      {/* Page numbers */}
      {getPagination().map((p, i) =>
        p === "..." ? (
          <span key={i} className="px-2 py-1 text-sm">
            ...
          </span>
        ) : (
          <button
            key={i}
            onClick={() => onPageChange(Number(p))}
            className={`px-2 py-1 rounded-md text-sm ${
              p === currentPage
                ? "bg-[#4338CA] text-white"
                : "hover:bg-gray-200 dark:hover:bg-[#314158]"
            }`}
          >
            {p}
          </button>
        )
      )}

      {/* Next button */}
      <button
        onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
        className="px-2 py-1 rounded-md text-sm bg-gray-200 dark:bg-[#314158] hover:bg-gray-300 dark:hover:bg-[#433D55]"
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
};
