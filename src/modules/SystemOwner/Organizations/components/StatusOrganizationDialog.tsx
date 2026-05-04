import { Ban, RefreshCw, UserCheck, ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface StatusOrganizationDialogProps {
  isOpen: boolean;
  mode: "ban" | "renew" | null;
  selectedOrg: any;
  onClose: () => void;
  onConfirm: () => void;
}

export const StatusOrganizationDialog = ({ isOpen, mode, selectedOrg, onClose, onConfirm }: StatusOrganizationDialogProps) => {
  if (!mode) return null;

  const isBanMode = mode === "ban";
  const isActive = selectedOrg?.status === "active";

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md rounded-2xl p-10 bg-card border-zinc-200 dark:border-white/5 overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 blur-3xl rounded-full" />
        <DialogHeader className="relative z-10">
          <div className="h-16 w-16 rounded-2xl bg-zinc-100 dark:bg-white/5 flex items-center justify-center mb-6">
            {isBanMode ? (
              isActive ? <ShieldAlert className="text-orange-500" size={32} /> : <UserCheck className="text-green-500" size={32} />
            ) : (
              <RefreshCw className="text-green-500" size={32} />
            )}
          </div>
          <DialogTitle className="text-3xl tracking-tighter dark:text-white">
            {isBanMode ? (isActive ? "Restrict Access?" : "Restore Access?") : "Renew Lease?"}
          </DialogTitle>
          <DialogDescription className="text-zinc-500 mt-2">
            Target: {selectedOrg?.name} ({selectedOrg?.domain})
          </DialogDescription>
        </DialogHeader>

        <div className="py-6 relative z-10">
          <p className="text-zinc-400 text-sm leading-relaxed">
            {isBanMode 
              ? "Modifying the access state will affect all users belonging to this organization immediately." 
              : "This operation will renew the subscription lease for this tenant instance for the next 12 months."}
          </p>
        </div>

        <DialogFooter className="relative z-10 sm:justify-start gap-3">
          <Button onClick={onConfirm} className="h-14 rounded-xl px-8 shadow-xl shadow-primary/20">Confirm Execution</Button>
          <Button variant="outline" onClick={onClose} className="h-14 rounded-xl px-8 border-zinc-200 dark:border-white/10 dark:text-white">Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
