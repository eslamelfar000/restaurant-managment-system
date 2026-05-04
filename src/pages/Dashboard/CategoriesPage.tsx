import { useState } from "react";
import {
  Plus,
  Search,
  Filter,
  LayoutGrid,
  Tags,
  Eye,
  SlidersHorizontal,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCategories } from "@/modules/DashModules/Categories/hooks/useCategories";
import { CategoryTable } from "@/modules/DashModules/Categories/components/CategoryTable";
import { PageTransition } from "@/components/shared/layout/PageTransition";
import { ModuleHeader } from "@/components/shared/layout/ModuleHeader";
import { StatsCard } from "@/components/shared/layout/StatsCard";
import { toast } from "sonner";

const CategoriesPage = () => {
  const {
    categories,
    filters,
    setFilters,
    deleteCategory,
    toggleCategoryStatus,
    totalCount,
  } = useCategories();
  const [dialogMode, setDialogMode] = useState<
    "add" | "edit" | "delete" | null
  >(null);

  return (
    <PageTransition className="space-y-10">
      <ModuleHeader
        title="Menu Categories"
        subtitle="Menu Taxonomy / Strategic Dish Categorization"
        action={
          <Button
            onClick={() => setDialogMode("add")}
            className="w-full lg:w-auto rounded-[1.2rem] h-12 px-8 flex items-center justify-center gap-2 shadow-2xl shadow-primary/20 group"
          >
            <Plus
              size={20}
              className="group-hover:rotate-90 transition-transform"
            />
            Create Category
          </Button>
        }
      />

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatsCard
          label="Global Categories"
          value={totalCount}
          icon={LayoutGrid}
          color="primary"
          description="Total active taxonomies"
        />
        <StatsCard
          label="Published"
          value={categories.filter((c) => c.status === "active").length}
          icon={Eye}
          color="green"
          description="Visible on digital menu"
        />
        <StatsCard
          label="Hidden Items"
          value={categories.filter((c) => c.status === "hidden").length}
          icon={Tags}
          color="orange"
          description="In draft or seasonal"
        />
      </div>

      {/* Filters Bar */}
      <div className="flex flex-col lg:flex-row gap-4 items-stretch lg:items-center">
        <div className="relative flex-1 group">
          <Input
            placeholder="Search by category name or keyword..."
            value={filters.search}
            onChange={(e) => setFilters({ ...filters, search: e.target.value })}
            className="h-14 rounded-2xl bg-white dark:bg-white/[0.02] border-zinc-200 dark:border-white/10 pl-12 transition-all focus:ring-primary/20 text-lg shadow-sm"
          />
          <Search
            className="absolute left-4 top-4 text-zinc-400 group-focus-within:text-primary transition-colors"
            size={22}
          />
        </div>
        <Button
          variant="outline"
          className="h-14 rounded-2xl px-6 border-zinc-200 dark:border-white/10 bg-white dark:bg-white/[0.02] shadow-sm gap-2 hover:border-primary/30 transition-all"
        >
          <SlidersHorizontal size={20} />
          Advanced
        </Button>
      </div>

      <CategoryTable
        categories={categories}
        onAction={(cat, mode) => {
          if (mode === "delete") {
            deleteCategory(cat!.id);
            toast.success("Category terminated.");
          } else {
            setDialogMode(mode);
          }
        }}
        onToggle={(id) => {
          toggleCategoryStatus(id);
          toast.success("Category visibility updated.");
        }}
      />
    </PageTransition>
  );
};

export default CategoriesPage;
