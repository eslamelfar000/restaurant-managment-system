import { MoreVertical, UserCog, Trash2, Mail, Phone, Crown, Star, UserPlus, Ban, UserCheck } from "lucide-react";
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { RestaurantClient } from "../types";
import { cn } from "@/lib/utils";

interface ClientTableProps {
  clients: RestaurantClient[];
  onAction: (client: RestaurantClient | null, mode: "add" | "edit" | "delete") => void;
  onToggleStatus: (id: string) => void;
}

const tierStyles: Record<string, { color: string, icon: any }> = {
  vip: { color: "bg-orange-500/10 text-orange-500", icon: Crown },
  loyal: { color: "bg-blue-500/10 text-blue-500", icon: Star },
  regular: { color: "bg-zinc-500/10 text-zinc-500", icon: UserPlus },
  new: { color: "bg-green-500/10 text-green-500", icon: UserCheck },
};

export const ClientTable = ({ clients, onAction, onToggleStatus }: ClientTableProps) => {
  return (
    <div className="border border-zinc-200 dark:border-white/5 rounded-3xl bg-white dark:bg-white/[0.02] overflow-hidden shadow-2xl shadow-black/5">
      <Table className="min-w-[1100px]">
        <TableHeader className="bg-zinc-50 dark:bg-white/5">
          <TableRow className="hover:bg-transparent border-b border-zinc-200 dark:border-white/5 h-16">
            <TableHead className="ps-8 text-sm">Client Identity</TableHead>
            <TableHead className="text-sm">Loyalty Tier</TableHead>
            <TableHead className="text-sm">Engagement</TableHead>
            <TableHead className="text-sm">Account Status</TableHead>
            <TableHead className="pe-8 text-right text-sm">Control</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {clients.map((client) => (
            <TableRow key={client.id} className="hover:bg-zinc-50 dark:hover:bg-white/5 transition-colors border-b border-zinc-100 dark:border-white/5 h-20 group">
              <TableCell className="ps-8">
                <div className="flex items-center gap-4">
                  <Avatar className="h-12 w-12 rounded-xl border border-zinc-200 dark:border-white/10 shadow-inner">
                    <AvatarImage src={client.avatar} />
                    <AvatarFallback className="bg-zinc-100 dark:bg-white/5 text-primary font-bold text-sm uppercase">
                      {client.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <span className="text-base tracking-tighter font-semibold dark:text-white">{client.name}</span>
                    <span className="text-xs text-zinc-500 font-bold uppercase tracking-tighter">{client.email}</span>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <div className={cn("flex items-center gap-2 px-3 py-1 rounded-full w-fit text-xs font-bold capitalize", tierStyles[client.tier].color)}>
                  {(() => {
                    const Icon = tierStyles[client.tier].icon;
                    return <Icon size={12} />;
                  })()}
                  {client.tier}
                </div>
              </TableCell>
              <TableCell>
                <div className="flex flex-col">
                   <span className="text-sm font-bold dark:text-white">{client.totalOrders} Orders</span>
                   <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">${client.totalSpent.toFixed(2)} Spent</span>
                </div>
              </TableCell>
              <TableCell>
                <button 
                  onClick={() => onToggleStatus(client.id)}
                  className="flex items-center gap-2 group/status"
                >
                  <div className={cn(
                    "h-2 w-2 rounded-full animate-pulse",
                    client.status === 'active' 
                      ? "bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]" 
                      : client.status === 'blacklisted' ? "bg-red-500" : "bg-zinc-400"
                  )} />
                  <span className={cn(
                    "text-sm font-semibold capitalize transition-colors",
                    client.status === 'active' ? "text-green-500" : client.status === 'blacklisted' ? "text-red-500" : "text-zinc-500"
                  )}>
                    {client.status}
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
                    <DropdownMenuLabel className="text-[10px] text-zinc-400 px-3 py-2 uppercase tracking-widest">Client Management</DropdownMenuLabel>
                    <DropdownMenuItem onClick={() => onAction(client, "edit")} className="rounded-xl h-12 gap-3 px-3 cursor-pointer">
                      <UserCog size={18} className="text-orange-500" />
                      <span className="text-sm">Update Profile</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator className="bg-zinc-100 dark:bg-white/5 my-1" />
                    <DropdownMenuItem 
                      onClick={() => onToggleStatus(client.id)}
                      className="rounded-xl h-12 gap-3 px-3 cursor-pointer"
                    >
                      {client.status === 'active' ? (
                        <>
                          <Ban size={18} className="text-red-500" />
                          <span className="text-sm">Blacklist Client</span>
                        </>
                      ) : (
                        <>
                          <UserCheck size={18} className="text-green-500" />
                          <span className="text-sm">Restore Account</span>
                        </>
                      )}
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => onAction(client, "delete")} className="rounded-xl h-12 gap-3 px-3 cursor-pointer text-red-600 focus:text-red-600 focus:bg-red-500/10">
                      <Trash2 size={18} />
                      <span className="text-sm">Delete Client</span>
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
