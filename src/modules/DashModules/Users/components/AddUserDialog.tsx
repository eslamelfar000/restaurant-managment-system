import { UserPlus, ShieldCheck, Mail, Phone, BadgeCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";

interface AddUserDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export const AddUserDialog = ({ isOpen, onClose, onConfirm }: AddUserDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-xl rounded-2xl p-0 bg-card border-zinc-200 dark:border-white/5 overflow-hidden flex flex-col max-h-[85vh]">
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 blur-3xl rounded-full" />
        
        <div className="overflow-y-auto flex-1 custom-scrollbar">
          <DialogHeader className="relative z-10 p-10 pb-0">
          <div className="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-4">
            <UserPlus className="text-primary" size={28} />
          </div>
          <DialogTitle className="text-3xl font-bold tracking-tighter">
            Provision <span className="text-primary">Staff Member</span>
          </DialogTitle>
          <DialogDescription className="text-zinc-500 font-medium">
            Grant system access and define operational roles for your team.
          </DialogDescription>
        </DialogHeader>
        

        <div className="relative z-10 space-y-6 px-10 pt-6 pb-10">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-xs font-bold uppercase tracking-widest text-zinc-500 ml-1">Full Identity</Label>
              <Input placeholder="e.g. Johnathan Doe" className="h-12 rounded-xl bg-zinc-50 dark:bg-white/5 border-zinc-200 dark:border-white/10" />
            </div>
            <div className="space-y-2">
              <Label className="text-xs font-bold uppercase tracking-widest text-zinc-500 ml-1">Internal Role</Label>
              <Select>
                <SelectTrigger className="h-12 rounded-xl bg-zinc-50 dark:bg-white/5 border-zinc-200 dark:border-white/10">
                  <SelectValue placeholder="Define Permissions" />
                </SelectTrigger>
                <SelectContent className="rounded-xl border-zinc-200 dark:border-white/5 shadow-2xl">
                  <SelectItem value="admin" className="rounded-lg">Administrator</SelectItem>
                  <SelectItem value="manager" className="rounded-lg">Operations Manager</SelectItem>
                  <SelectItem value="chef" className="rounded-lg">Kitchen Staff / Chef</SelectItem>
                  <SelectItem value="waiter" className="rounded-lg">Front of House</SelectItem>
                  <SelectItem value="cashier" className="rounded-lg">Finance / Cashier</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-xs font-bold uppercase tracking-widest text-zinc-500 ml-1 flex items-center gap-2">
               <Mail size={12} className="text-primary" />
               Corporate Email
            </Label>
            <Input type="email" placeholder="john.doe@restaurant.os" className="h-12 rounded-xl bg-zinc-50 dark:bg-white/5 border-zinc-200 dark:border-white/10" />
          </div>

          <div className="space-y-2">
            <Label className="text-xs font-bold uppercase tracking-widest text-zinc-500 ml-1 flex items-center gap-2">
               <Phone size={12} className="text-primary" />
               Contact Number
            </Label>
            <Input placeholder="+1 (234) 567-8900" className="h-12 rounded-xl bg-zinc-50 dark:bg-white/5 border-zinc-200 dark:border-white/10" />
          </div>

          <div className="flex items-center justify-between p-4 rounded-xl bg-zinc-50 dark:bg-white/5 border border-zinc-100 dark:border-white/10">
            <div className="flex flex-col gap-0.5">
              <Label className="text-sm font-bold dark:text-white leading-none">Instant Activation</Label>
              <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-tight">Enable system login immediately</span>
            </div>
            <Switch defaultChecked />
          </div>
        </div>
      </div>

      <DialogFooter className="relative z-10 p-10 pt-0 gap-3">
          <Button variant="ghost" onClick={onClose} className="h-14 rounded-xl font-bold flex-1">
            Cancel
          </Button>
          <Button onClick={onConfirm} className="h-14 rounded-xl font-bold flex-1 shadow-2xl shadow-primary/20">
            Onboard Member
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
