import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

interface AddOrganizationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export const AddOrganizationDialog = ({
  isOpen,
  onClose,
  onConfirm,
}: AddOrganizationDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-lg rounded-2xl p-8 bg-card border-zinc-200 dark:border-white/5 overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 blur-3xl rounded-full" />
        <DialogHeader className="relative z-10">
          <div className="h-16 w-16 rounded-2xl bg-zinc-100 dark:bg-white/5 flex items-center justify-center mb-6">
            <Plus className="text-primary" size={32} />
          </div>
          <DialogTitle className="text-3xl tracking-tighter dark:text-white">
            Provision Tenant
          </DialogTitle>
          <DialogDescription className="text-zinc-500 mt-2">
            Initialize a new enterprise cluster instance.
          </DialogDescription>
        </DialogHeader>

        <div className="py-6 space-y-4 relative z-10 max-h-[60vh] overflow-y-auto px-1 custom-scrollbar">
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs  text-zinc-400">
                  Organization Name
                </label>
                <Input
                  placeholder="e.g. Gourmet Haven"
                  className="h-12 rounded-xl bg-zinc-50 dark:bg-white/5 border-zinc-200 dark:border-white/10"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs  text-zinc-400">Primary Domain</label>
                <Input
                  placeholder="e.g. gourmet.io"
                  className="h-12 rounded-xl bg-zinc-50 dark:bg-white/5 border-zinc-200 dark:border-white/10"
                />
              </div>
            </div>

            <div className="pt-4 border-t border-zinc-100 dark:border-white/5 space-y-6">
              <h3 className="text-sm font-medium text-primary tracking-tight">
                Super Admin Credentials
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs  text-zinc-400">
                    Admin Full Name
                  </label>
                  <Input
                    placeholder="e.g. John Doe"
                    className="h-12 rounded-xl bg-zinc-50 dark:bg-white/5 border-zinc-200 dark:border-white/10"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs  text-zinc-400">
                    Contact Phone
                  </label>
                  <Input
                    placeholder="+1 234 567 890"
                    className="h-12 rounded-xl bg-zinc-50 dark:bg-white/5 border-zinc-200 dark:border-white/10"
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <label className="text-xs  text-zinc-400">
                    Admin Email Address
                  </label>
                  <Input
                    type="email"
                    placeholder="admin@tenant.io"
                    className="h-12 rounded-xl bg-zinc-50 dark:bg-white/5 border-zinc-200 dark:border-white/10"
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <label className="text-xs  text-zinc-400">
                    Account Password
                  </label>
                  <Input
                    type="password"
                    placeholder="••••••••"
                    className="h-12 rounded-xl bg-zinc-50 dark:bg-white/5 border-zinc-200 dark:border-white/10"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <DialogFooter className="relative z-10 sm:justify-start gap-3">
          <Button
            onClick={onConfirm}
            className="h-12 rounded-xl px-8 shadow-xl shadow-primary/20"
          >
            Confirm Execution
          </Button>
          <Button
            variant="outline"
            onClick={onClose}
            className="h-12 rounded-xl px-8 border-zinc-200 dark:border-white/10 dark:text-white"
          >
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
