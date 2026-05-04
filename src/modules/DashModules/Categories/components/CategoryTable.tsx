import { MoreVertical, Edit, Trash2, LayoutGrid, Eye, EyeOff, Search } from "lucide-react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
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
import { MenuCategory } from "../types";
import { cn } from "@/lib/utils";

interface CategoryTableProps {
  categories: MenuCategory[];
  onAction: (category: MenuCategory | null, mode: "add" | "edit" | "delete") => void;
  onToggle: (id: string) => void;
}

export const CategoryTable = ({ categories, onAction, onToggle }: CategoryTableProps) => {
  return (
    <div className="border border-zinc-200 dark:border-white/5 rounded-3xl bg-white dark:bg-white/[0.02] overflow-hidden shadow-2xl shadow-black/5">
      <Table className="min-w-[1100px]">
        <TableHeader className="bg-zinc-50 dark:bg-white/5">
          <TableRow className="hover:bg-transparent border-b border-zinc-200 dark:border-white/5 h-16">
            <TableHead className="ps-8 text-sm">Category / Description</TableHead>
            <TableHead className="text-sm">Item Count</TableHead>
            <TableHead className="text-sm">Sort Order</TableHead>
            <TableHead className="text-sm">Visibility</TableHead>
            <TableHead className="pe-8 text-right text-sm">Control</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {categories.length > 0 ? (
            categories.map((cat) => (
              <TableRow key={cat.id} className="hover:bg-zinc-50 dark:hover:bg-white/5 transition-colors border-b border-zinc-100 dark:border-white/5 h-20 group">
                <TableCell className="ps-8">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-xl bg-primary/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-500 shadow-inner">
                      <LayoutGrid size={20} />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-base tracking-tighter font-semibold dark:text-white line-clamp-1">
                        {cat.name}
                      </span>
                      <span className="text-sm text-zinc-500 line-clamp-1">
                        {cat.description}
                      </span>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className="rounded-full px-4 py-1 text-sm bg-zinc-100 dark:bg-white/5 text-zinc-600 dark:text-zinc-400 border-none">
                    {cat.itemCount} Items
                  </Badge>
                </TableCell>
                <TableCell>
                  <span className="text-sm font-black dark:text-white">
                    #{cat.sortOrder}
                  </span>
                </TableCell>
                <TableCell>
                  <button 
                    onClick={() => onToggle(cat.id)}
                    className="flex items-center gap-2 group/status"
                  >
                    <div className={cn(
                      "h-2 w-2 rounded-full animate-pulse",
                      cat.status === 'active' 
                        ? "bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]" 
                        : "bg-zinc-400"
                    )} />
                    <span className={cn(
                      "text-sm font-semibold capitalize transition-colors",
                      cat.status === 'active' ? "text-green-500" : "text-zinc-500"
                    )}>
                      {cat.status === 'active' ? "Published" : "Hidden"}
                    </span>
                  </button>
                </TableCell>
                <TableCell className="pe-8 text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-10 w-10 p-0 rounded-xl hover:bg-zinc-200 dark:hover:bg-white/10">
                        <MoreVertical size={20} className="text-zinc-400" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56 rounded-2xl p-2 bg-white dark:bg-zinc-900 border-zinc-200 dark:border-white/5 shadow-2xl">
                      <DropdownMenuLabel className="text-[10px] text-zinc-400 px-3 py-2 uppercase tracking-widest">Category Control</DropdownMenuLabel>
                      <DropdownMenuItem onClick={() => onAction(cat, "edit")} className="rounded-xl h-12 gap-3 px-3 cursor-pointer">
                        <Edit size={18} className="text-orange-500" />
                        <span className="text-sm">Update Manifest</span>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator className="bg-zinc-100 dark:bg-white/5 my-1" />
                      <DropdownMenuItem 
                        onClick={() => onToggle(cat.id)}
                        className="rounded-xl h-12 gap-3 px-3 cursor-pointer"
                      >
                        {cat.status === 'active' ? (
                          <>
                            <EyeOff size={18} className="text-zinc-500" />
                            <span className="text-sm">Hide from Menu</span>
                          </>
                        ) : (
                          <>
                            <Eye size={18} className="text-green-500" />
                            <span className="text-sm">Publish Category</span>
                          </>
                        )}
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => onAction(cat, "delete")} className="rounded-xl h-12 gap-3 px-3 cursor-pointer text-red-600 focus:text-red-600 focus:bg-red-500/10">
                        <Trash2 size={18} />
                        <span className="text-sm">Terminate Category</span>
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
                   <LayoutGrid size={32} className="text-zinc-400" />
                   <p className="font-bold text-zinc-900 dark:text-white">No categories found</p>
                </div>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};
