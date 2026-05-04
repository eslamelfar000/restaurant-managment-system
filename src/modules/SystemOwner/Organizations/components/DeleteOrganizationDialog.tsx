import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface DeleteOrganizationDialogProps {
  isOpen: boolean;
  selectedOrg: any;
  onClose: () => void;
  onConfirm: () => void;
}

export const DeleteOrganizationDialog = ({ isOpen, selectedOrg, onClose, onConfirm }: DeleteOrganizationDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md rounded-2xl p-10 bg-card border-zinc-200 dark:border-white/5 overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 blur-3xl rounded-full" />
        <DialogHeader className="relative z-10">
          <div className="h-16 w-16 rounded-2xl bg-zinc-100 dark:bg-white/5 flex items-center justify-center mb-6">
            <Trash2 className="text-red-500" size={32} />
          </div>
          <DialogTitle className="text-3xl tracking-tighter dark:text-white">Terminate Cluster?</DialogTitle>
          <DialogDescription className="text-zinc-500 mt-2">
            Target: {selectedOrg?.name} ({selectedOrg?.domain})
          </DialogDescription>
        </DialogHeader>

        <div className="py-6 relative z-10">
          <p className="text-zinc-400 text-sm leading-relaxed">
            This action is catastrophic and cannot be undone. All data, assets, and configurations for this tenant will be purged from the central infrastructure.
          </p>
        </div>

        <DialogFooter className="relative z-10 sm:justify-start gap-3">
          <Button onClick={onConfirm} variant="destructive" className="h-14 rounded-xl px-8">Confirm Execution</Button>
          <Button variant="outline" onClick={onClose} className="h-14 rounded-xl px-8 border-zinc-200 dark:border-white/10 dark:text-white">Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
