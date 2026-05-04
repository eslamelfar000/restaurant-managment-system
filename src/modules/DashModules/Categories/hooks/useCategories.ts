import { useState, useMemo } from "react";
import { MenuCategory, CategoryFilters } from "../types";

const MOCK_CATEGORIES: MenuCategory[] = [
  {
    id: "cat-1",
    name: "Main Course",
    description: "Primary dishes including steaks, pastas, and roasts.",
    itemCount: 24,
    status: "active",
    sortOrder: 1,
  },
  {
    id: "cat-2",
    name: "Appetizers",
    description: "Starters and small plates to kick off your meal.",
    itemCount: 12,
    status: "active",
    sortOrder: 2,
  },
  {
    id: "cat-3",
    name: "Desserts",
    description: "Sweet treats, cakes, and artisanal gelatos.",
    itemCount: 8,
    status: "active",
    sortOrder: 3,
  },
  {
    id: "cat-4",
    name: "Beverages",
    description: "Fresh juices, cocktails, and wine selection.",
    itemCount: 15,
    status: "active",
    sortOrder: 4,
  },
  {
    id: "cat-5",
    name: "Seasonal Specials",
    description: "Limited time offers and seasonal chef picks.",
    itemCount: 5,
    status: "hidden",
    sortOrder: 5,
  },
];

export const useCategories = () => {
  const [categories, setCategories] = useState<MenuCategory[]>(MOCK_CATEGORIES);
  const [filters, setFilters] = useState<CategoryFilters>({
    search: "",
    status: "all",
  });

  const filteredCategories = useMemo(() => {
    return categories
      .filter((cat) => {
        const matchesSearch = cat.name
          .toLowerCase()
          .includes(filters.search.toLowerCase());
        const matchesStatus =
          filters.status === "all" || cat.status === filters.status;
        return matchesSearch && matchesStatus;
      })
      .sort((a, b) => a.sortOrder - b.sortOrder);
  }, [categories, filters]);

  const deleteCategory = (id: string) => {
    setCategories((prev) => prev.filter((c) => c.id !== id));
  };

  const toggleCategoryStatus = (id: string) => {
    setCategories((prev) =>
      prev.map((c) =>
        c.id === id
          ? { ...c, status: c.status === "active" ? "hidden" : "active" }
          : c,
      ),
    );
  };

  return {
    categories: filteredCategories,
    filters,
    setFilters,
    deleteCategory,
    toggleCategoryStatus,
    totalCount: categories.length,
  };
};
