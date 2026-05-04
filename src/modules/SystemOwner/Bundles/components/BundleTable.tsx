import { Package, Layers, MoreVertical, Edit, CheckCircle2, XCircle, Trash2 } from "lucide-react";
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
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface BundleTableProps {
  bundles: any[];
  onAction: (bundle: any, mode: "add" | "edit" | "delete" | "status") => void;
}

export const BundleTable = ({ bundles, onAction }: BundleTableProps) => {
  return (
    <div className="border border-zinc-200 dark:border-white/5 rounded-3xl bg-white dark:bg-white/[0.02] overflow-hidden shadow-2xl shadow-black/5">
      <Table className="min-w-[1100px]">
        <TableHeader className="bg-zinc-50 dark:bg-white/5">
          <TableRow className="hover:bg-transparent border-b border-zinc-200 dark:border-white/5 h-16">
            <TableHead className="ps-8 text-sm">Bundle Name</TableHead>
            <TableHead className="text-sm">Price Point</TableHead>
            <TableHead className="text-sm">Active Accounts</TableHead>
            <TableHead className="text-sm">Public Status</TableHead>
            <TableHead className="pe-8 text-right text-sm">Control</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {bundles.map((bundle) => (
            <TableRow
              key={bundle.id}
              className="hover:bg-zinc-50 dark:hover:bg-white/5 transition-colors border-b border-zinc-100 dark:border-white/5 h-20 group"
            >
              <TableCell className="ps-8">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-xl bg-zinc-100 dark:bg-white/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-500 shadow-inner">
                    <Package size={20} />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-base tracking-tighter font-semibold dark:text-white">
                      {bundle.name}
                    </span>
                    <span className="text-sm text-zinc-500 truncate max-w-[200px]">
                      {bundle.features}
                    </span>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <span className="text-lg font-medium text-zinc-700 dark:text-zinc-200">
                  {bundle.price}
                </span>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Layers size={14} className="text-zinc-400" />
                  <span className="text-sm font-medium dark:text-zinc-300">
                    {bundle.accounts}
                  </span>
                </div>
              </TableCell>
              <TableCell>
                <Badge
                  variant="outline"
                  className={cn(
                    "rounded-full px-4 py-1 text-sm border-none",
                    bundle.status === "active"
                      ? "bg-green-500/10 text-green-500"
                      : "bg-zinc-500/10 text-zinc-500",
                  )}
                >
                  {bundle.status === "active" ? "Public" : "Draft"}
                </Badge>
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
                    <DropdownMenuItem
                      onClick={() => onAction(bundle, "edit")}
                      className="rounded-xl h-12 gap-3 px-3 cursor-pointer"
                    >
                      <Edit size={18} className="text-orange-500" />
                      <span className="text-xs">Modify Tier</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => onAction(bundle, "status")}
                      className="rounded-xl h-12 gap-3 px-3 cursor-pointer"
                    >
                      {bundle.status === "active" ? (
                        <XCircle size={18} className="text-zinc-500" />
                      ) : (
                        <CheckCircle2 size={18} className="text-green-500" />
                      )}
                      <span className="text-xs">
                        {bundle.status === "active"
                          ? "Archive Tier"
                          : "Publish Tier"}
                      </span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator className="bg-zinc-100 dark:bg-white/5 my-1" />
                    <DropdownMenuItem
                      onClick={() => onAction(bundle, "delete")}
                      className="rounded-xl h-12 gap-3 px-3 cursor-pointer text-red-600 focus:text-red-600 focus:bg-red-500/10"
                    >
                      <Trash2 size={18} />
                      <span className="text-xs">Purge Bundle</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
