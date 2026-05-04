import { useState } from "react";
import { Plus, Search, Filter, SlidersHorizontal, UtensilsCrossed, CheckCircle2, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useMeals } from "@/modules/DashModules/Meals/hooks/useMeals";
import { MealTable } from "@/modules/DashModules/Meals/components/MealTable";
import { MealDialogs } from "@/modules/DashModules/Meals/components/MealDialogs";
import { Meal } from "@/modules/DashModules/Meals/types";
import { PageTransition } from "@/components/shared/layout/PageTransition";
import { ModuleHeader } from "@/components/shared/layout/ModuleHeader";
import { StatsCard } from "@/components/shared/layout/StatsCard";
import { toast } from "sonner";

const MealsPage = () => {
  const { meals, filters, setFilters, deleteMeal, toggleAvailability, totalCount } = useMeals();
  const [selectedMeal, setSelectedMeal] = useState<Meal | null>(null);
  const [dialogMode, setDialogMode] = useState<"add" | "edit" | "delete" | null>(null);

  const handleAction = (meal: Meal | null, mode: "add" | "edit" | "delete") => {
    setSelectedMeal(meal);
    setDialogMode(mode);
  };

  const closeDialog = () => {
    setDialogMode(null);
    setSelectedMeal(null);
  };

  const onConfirmAction = () => {
    if (dialogMode === "add") {
      toast.success("New dish recipe authorized successfully.");
    } else if (dialogMode === "edit") {
      toast.success(`${selectedMeal?.name} manifest updated.`);
    } else if (dialogMode === "delete") {
      deleteMeal(selectedMeal!.id);
      toast.success(`${selectedMeal?.name} has been terminated.`);
    }
    closeDialog();
  };

  return (
    <PageTransition className="space-y-10">
      {/* Page Header */}
      <ModuleHeader 
        title="Kitchen Inventory"
        subtitle="Menu Engineering / Dish Lifecycle Management"
        action={
          <Button 
            onClick={() => handleAction(null, "add")}
            className="w-full lg:w-auto rounded-[1.2rem] h-12 px-8 flex items-center justify-center gap-2 shadow-2xl shadow-primary/20 group"
          >
            <Plus size={20} className="group-hover:rotate-90 transition-transform" />
            Provision New Dish
          </Button>
        }
      />

      {/* Stats Quick View */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
         <StatsCard 
          label="Global Recipe Count" 
          value={totalCount} 
          icon={UtensilsCrossed} 
          color="primary"
          description="Total archived dishes"
         />
         <StatsCard 
          label="Active Service" 
          value={meals.filter(m => m.availability).length} 
          icon={CheckCircle2} 
          color="green"
          description="Visible on digital menu"
         />
         <StatsCard 
          label="Marketplace Average" 
          value="$18.45" 
          icon={TrendingUp} 
          color="blue"
          description="Mean dish pricing"
         />
      </div>

      {/* Filters Bar */}
      <div className="flex flex-col lg:flex-row gap-4 items-stretch lg:items-center">
        <div className="relative flex-1 group">
          <Input 
            placeholder="Search by dish signature, category or UID..." 
            value={filters.search}
            onChange={(e) => setFilters({ ...filters, search: e.target.value })}
            className="h-14 rounded-2xl bg-white dark:bg-white/[0.02] border-zinc-200 dark:border-white/10 pl-12 transition-all focus:ring-primary/20 text-lg shadow-sm"
          />
          <Search className="absolute left-4 top-4 text-zinc-400 group-focus-within:text-primary transition-colors" size={22} />
        </div>
        <div className="flex items-center gap-2">
           <Button variant="outline" className="flex-1 lg:flex-initial h-14 rounded-2xl px-6 border-zinc-200 dark:border-white/10 bg-white dark:bg-white/[0.02] shadow-sm gap-2 hover:border-primary/30 transition-all">
              <Filter size={20} />
              Category
           </Button>
           <Button variant="outline" className="flex-1 lg:flex-initial h-14 rounded-2xl px-6 border-zinc-200 dark:border-white/10 bg-white dark:bg-white/[0.02] shadow-sm gap-2 hover:border-primary/30 transition-all">
              <SlidersHorizontal size={20} />
              Advanced
           </Button>
        </div>
      </div>

      {/* Table Section */}
      <MealTable 
        meals={meals} 
        onAction={handleAction}
        onToggle={toggleAvailability} 
      />

      <MealDialogs 
        dialogMode={dialogMode}
        selectedMeal={selectedMeal}
        onClose={closeDialog}
        onConfirm={onConfirmAction}
      />
    </PageTransition>
  );
};

export default MealsPage;
