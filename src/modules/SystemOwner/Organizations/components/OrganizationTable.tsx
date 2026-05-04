import { Building2, MoreVertical, Eye, Lock, Unlock, Trash2 } from "lucide-react";
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface OrganizationTableProps {
  organizations: any[];
  onAction: (org: any, mode: "show" | "edit" | "ban" | "renew" | "delete" | "add") => void;
}

export const OrganizationTable = ({ organizations, onAction }: OrganizationTableProps) => {
  return (
    <div className="border border-zinc-200 dark:border-white/5 rounded-3xl bg-white dark:bg-white/[0.02] overflow-hidden shadow-2xl shadow-black/5">
      <Table className="min-w-[1100px]">
        <TableHeader className="bg-zinc-50 dark:bg-white/5">
          <TableRow className="hover:bg-transparent border-b border-zinc-200 dark:border-white/5 h-16">
            <TableHead className="ps-8 text-sm">Organization / Domain</TableHead>
            <TableHead className="text-sm">Owner Access</TableHead>
            <TableHead className="text-sm">Current Plan</TableHead>
            <TableHead className="text-sm">Instance Status</TableHead>
            <TableHead className="text-sm">Deployment</TableHead>
            <TableHead className="pe-8 text-right text-sm">Control</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {organizations.map((org) => (
            <TableRow
              key={org.id}
              className="hover:bg-zinc-50 dark:hover:bg-white/5 transition-colors border-b border-zinc-100 dark:border-white/5 h-20 group"
            >
              <TableCell className="ps-8">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-xl bg-zinc-100 dark:bg-white/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-500 shadow-inner">
                    <Building2 size={20} />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-base tracking-tighter font-semibold dark:text-white">
                      {org.name}
                    </span>
                    <span className="text-sm text-zinc-500">{org.domain}</span>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-3">
                  <Avatar className="h-8 w-8 rounded-lg border border-zinc-200 dark:border-white/10">
                    <AvatarImage src={""} />
                    <AvatarFallback className="text-sm text-white bg-primary rounded">
                      {org.owner.substring(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-sm text-zinc-600 dark:text-zinc-400">
                    {org.owner}
                  </span>
                </div>
              </TableCell>
              <TableCell>
                <Badge
                  variant="outline"
                  className={cn(
                    "rounded-full px-4 py-1 text-sm border-none",
                    org.plan === "Enterprise"
                      ? "bg-orange-500/10 text-orange-500"
                      : org.plan === "Pro"
                      ? "bg-blue-500/10 text-blue-500"
                      : "bg-zinc-500/10 text-zinc-500"
                  )}
                >
                  {org.plan}
                </Badge>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <div
                    className={cn(
                      "h-2 w-2 rounded-full animate-pulse",
                      org.status === "active"
                        ? "bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]"
                        : "bg-red-500"
                    )}
                  />
                  <span
                    className={cn(
                      "text-sm capitalize font-semibold",
                      org.status === "active" ? "text-green-500" : "text-red-500"
                    )}
                  >
                    {org.status}
                  </span>
                </div>
              </TableCell>
              <TableCell>
                <span className="text-sm text-zinc-500 font-mono">
                  {org.region}
                </span>
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
                    <DropdownMenuLabel className="text-[10px] text-zinc-400 px-3 py-2">
                      Quick Commands
                    </DropdownMenuLabel>
                    <DropdownMenuItem
                      onClick={() => onAction(org, "show")}
                      className="rounded-xl h-12 gap-3 px-3 cursor-pointer"
                    >
                      <Eye size={18} className="text-blue-500" />
                      <span className="text-xs">Cluster Health</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => onAction(org, "edit")}
                      className="rounded-xl h-12 gap-3 px-3 cursor-pointer"
                    >
                      <Building2 size={18} className="text-orange-500" />
                      <span className="text-xs">Modify Manifest</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => onAction(org, org.status === "active" ? "ban" : "renew")}
                      className="rounded-xl h-12 gap-3 px-3 cursor-pointer"
                    >
                      {org.status === "active" ? (
                        <Lock size={18} className="text-zinc-500" />
                      ) : (
                        <Unlock size={18} className="text-green-500" />
                      )}
                      <span className="text-xs">
                        {org.status === "active" ? "Lock Instance" : "Restore Access"}
                      </span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator className="bg-zinc-100 dark:bg-white/5 my-1" />
                    <DropdownMenuItem
                      onClick={() => onAction(org, "delete")}
                      className="rounded-xl h-12 gap-3 px-3 cursor-pointer text-red-600 focus:text-red-600 focus:bg-red-500/10"
                    >
                      <Trash2 size={18} />
                      <span className="text-xs">Terminate Cluster</span>
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
