import { MoreVertical, UserCog, Trash2, Mail, Phone, ShieldCheck, UserCheck, Ban } from "lucide-react";
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

interface UserTableProps {
  users: RestaurantClient[];
  onAction: (user: RestaurantClient | null, mode: "add" | "edit" | "delete") => void;
  onToggleStatus: (id: string) => void;
}

const roleColors: Record<string, string> = {
  admin: "bg-red-500/10 text-red-500 border-red-500/20",
  manager: "bg-blue-500/10 text-blue-500 border-blue-500/20",
  chef: "bg-orange-500/10 text-orange-500 border-orange-500/20",
  waiter: "bg-green-500/10 text-green-500 border-green-500/20",
  cashier: "bg-purple-500/10 text-purple-500 border-purple-500/20",
};

export const UserTable = ({ users, onAction, onToggleStatus }: UserTableProps) => {
  return (
    <div className="border border-zinc-200 dark:border-white/5 rounded-3xl bg-white dark:bg-white/[0.02] overflow-hidden shadow-2xl shadow-black/5">
      <Table>
        <TableHeader className="bg-zinc-50 dark:bg-white/5">
          <TableRow className="hover:bg-transparent border-b border-zinc-200 dark:border-white/5 h-16">
            <TableHead className="ps-8 text-sm">Staff Member</TableHead>
            <TableHead className="text-sm">Contact Manifest</TableHead>
            <TableHead className="text-sm">System Status</TableHead>
            <TableHead className="pe-8 text-right text-sm">Control</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id} className="hover:bg-zinc-50 dark:hover:bg-white/5 transition-colors border-b border-zinc-100 dark:border-white/5 h-20 group">
              <TableCell className="ps-8">
                <div className="flex items-center gap-4">
                  <Avatar className="h-12 w-12 rounded-xl border border-zinc-200 dark:border-white/10 shadow-inner">
                    <AvatarImage src={user.avatar} />
                    <AvatarFallback className="bg-zinc-100 dark:bg-white/5 text-primary font-bold text-sm rounded-lg">
                      {user.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <span className="text-base tracking-tighter font-semibold dark:text-white">{user.name}</span>
                    <span className="text-xs text-zinc-500 font-bold uppercase tracking-tighter">ID: {user.id}</span>
                  </div>
                </div>
              </TableCell>

              <TableCell>
                <div className="flex flex-col gap-1">
                   <div className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400">
                      <Mail size={14} className="text-primary" />
                      {user.email}
                   </div>
                   <div className="flex items-center gap-2 text-xs text-zinc-500">
                      <Phone size={12} className="text-zinc-400" />
                      {user.phone}
                   </div>
                </div>
              </TableCell>
              <TableCell>
                <button 
                  onClick={() => onToggleStatus(user.id)}
                  className="flex items-center gap-2 group/status"
                >
                  <div className={cn(
                    "h-2 w-2 rounded-full animate-pulse",
                    user.status === 'active' 
                      ? "bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]" 
                      : "bg-red-500"
                  )} />
                  <span className={cn(
                    "text-sm font-semibold capitalize transition-colors",
                    user.status === 'active' ? "text-green-500" : "text-red-500"
                  )}>
                    {user.status}
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
                    <DropdownMenuLabel className="text-[10px] text-zinc-400 px-3 py-2 uppercase tracking-widest">Team Control</DropdownMenuLabel>
                    <DropdownMenuItem onClick={() => onAction(user, "edit")} className="rounded-xl h-12 gap-3 px-3 cursor-pointer">
                      <UserCog size={18} className="text-orange-500" />
                      <span className="text-sm">Modify Profile</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator className="bg-zinc-100 dark:bg-white/5 my-1" />
                    <DropdownMenuItem 
                      onClick={() => onToggleStatus(user.id)}
                      className="rounded-xl h-12 gap-3 px-3 cursor-pointer"
                    >
                      {user.status === 'active' ? (
                        <>
                          <Ban size={18} className="text-red-500" />
                          <span className="text-sm">Suspend Access</span>
                        </>
                      ) : (
                        <>
                          <UserCheck size={18} className="text-green-500" />
                          <span className="text-sm">Restore Access</span>
                        </>
                      )}
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => onAction(user, "delete")} className="rounded-xl h-12 gap-3 px-3 cursor-pointer text-red-600 focus:text-red-600 focus:bg-red-500/10">
                      <Trash2 size={18} />
                      <span className="text-sm">Terminate Member</span>
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
