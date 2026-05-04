import {
  MoreVertical,
  Edit,
  Trash2,
  CheckCircle2,
  XCircle,
  Search,
  UtensilsCrossed,
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Meal } from "../types";
import { cn } from "@/lib/utils";

interface MealTableProps {
  meals: Meal[];
  onAction: (meal: Meal | null, mode: "add" | "edit" | "delete") => void;
  onToggle: (id: string) => void;
}

export const MealTable = ({ meals, onAction, onToggle }: MealTableProps) => {
  return (
    <div className="border border-zinc-200 dark:border-white/5 rounded-3xl bg-white dark:bg-white/[0.02] overflow-hidden shadow-2xl shadow-black/5">
      <Table className="min-w-[1100px]">
        <TableHeader className="bg-zinc-50 dark:bg-white/5">
          <TableRow className="hover:bg-transparent border-b border-zinc-200 dark:border-white/5 h-16">
            <TableHead className="ps-8 text-sm">Dish / Composition</TableHead>
            <TableHead className="text-sm">Category</TableHead>
            <TableHead className="text-sm">Price Unit</TableHead>
            <TableHead className="text-sm">Menu Status</TableHead>
            <TableHead className="pe-8 text-right text-sm">Control</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {meals.length > 0 ? (
            meals.map((meal) => (
              <TableRow
                key={meal.id}
                className="hover:bg-zinc-50 dark:hover:bg-white/5 transition-colors border-b border-zinc-100 dark:border-white/5 h-20 group"
              >
                <TableCell className="ps-8">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-xl bg-zinc-100 dark:bg-white/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-500 shadow-inner overflow-hidden">
                      {meal.image ? (
                        <img
                          src={meal.image}
                          alt={meal.name}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <UtensilsCrossed size={20} />
                      )}
                    </div>
                    <div className="flex flex-col">
                      <span className="text-base tracking-tighter font-semibold dark:text-white line-clamp-1">
                        {meal.name}
                      </span>
                      <span className="text-sm text-zinc-500 line-clamp-1">
                        {meal.description}
                      </span>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className="rounded-full px-4 py-1 text-sm bg-zinc-100 dark:bg-white/5 text-zinc-600 dark:text-zinc-400 border-none"
                  >
                    {meal.category}
                  </Badge>
                </TableCell>
                <TableCell>
                  <span className="text-sm font-bold dark:text-white">
                    ${meal.price.toFixed(2)}
                  </span>
                </TableCell>
                <TableCell>
                  <button
                    onClick={() => onToggle(meal.id)}
                    className="flex items-center gap-2 group/status"
                  >
                    <div
                      className={cn(
                        "h-2 w-2 rounded-full animate-pulse",
                        meal.availability
                          ? "bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]"
                          : "bg-zinc-400",
                      )}
                    />
                    <span
                      className={cn(
                        "text-sm font-semibold capitalize transition-colors",
                        meal.availability
                          ? "text-green-500"
                          : "text-zinc-500 group-hover/status:text-zinc-700",
                      )}
                    >
                      {meal.availability ? "Active" : "Draft"}
                    </span>
                  </button>
                </TableCell>
                <TableCell className="pe-8 text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        className="h-10 w-10 p-0 rounded-xl hover:bg-zinc-200 dark:hover:bg-white/10"
                      >
                        <MoreVertical size={20} className="text-zinc-400" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      align="end"
                      className="w-56 rounded-2xl p-2 bg-white dark:bg-zinc-900 border-zinc-200 dark:border-white/5 shadow-2xl"
                    >
                      <DropdownMenuLabel className="text-[10px] text-zinc-400 px-3 py-2 uppercase tracking-widest">
                        Manifest Controls
                      </DropdownMenuLabel>
                      <DropdownMenuItem
                        onClick={() => onAction(meal, "edit")}
                        className="rounded-xl h-12 gap-3 px-3 cursor-pointer"
                      >
                        <Edit size={18} className="text-orange-500" />
                        <span className="text-sm">Modify Specifications</span>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator className="bg-zinc-100 dark:bg-white/5 my-1" />
                      <DropdownMenuItem
                        onClick={() => onAction(meal, "delete")}
                        className="rounded-xl h-12 gap-3 px-3 cursor-pointer text-red-600 focus:text-red-600 focus:bg-red-500/10"
                      >
                        <Trash2 size={18} />
                        <span className="text-sm">Terminate Dish</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={5} className="h-64 text-center">
                <div className="flex flex-col items-center justify-center space-y-3 opacity-50">
                  <div className="h-16 w-16 rounded-[2rem] bg-zinc-100 dark:bg-white/5 flex items-center justify-center">
                    <Search size={32} className="text-zinc-400" />
                  </div>
                  <div className="space-y-1">
                    <p className="font-bold text-zinc-900 dark:text-white">
                      No dishes detected
                    </p>
                    <p className="text-xs text-zinc-500 font-medium">
                      Clear filters or provision a new dish recipe.
                    </p>
                  </div>
                </div>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};
