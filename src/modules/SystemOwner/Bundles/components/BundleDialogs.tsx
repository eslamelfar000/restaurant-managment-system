import { Plus, Edit, Trash2, ShieldAlert, Package, CheckCircle2, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

interface BundleDialogsProps {
  dialogMode: "add" | "edit" | "delete" | "status" | null;
  selectedBundle: any;
  onClose: () => void;
  onConfirm: () => void;
}

export const BundleDialogs = ({ dialogMode, selectedBundle, onClose, onConfirm }: BundleDialogsProps) => {
  if (!dialogMode) return null;

  const isAdd = dialogMode === "add";
  const isEdit = dialogMode === "edit";
  const isDelete = dialogMode === "delete";
  const isStatus = dialogMode === "status";

  return (
    <Dialog open={dialogMode !== null} onOpenChange={onClose}>
      <DialogContent className="max-w-lg rounded-2xl p-8 bg-card border-zinc-200 dark:border-white/5 overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 blur-3xl rounded-full" />
        <DialogHeader className="relative z-10">
          <div className="h-16 w-16 rounded-2xl bg-zinc-100 dark:bg-white/5 flex items-center justify-center mb-6">
            {isDelete ? <Trash2 className="text-red-500" size={32} /> :
             isStatus ? (selectedBundle?.status === "active" ? <XCircle className="text-zinc-500" size={32} /> : <CheckCircle2 className="text-green-500" size={32} />) :
             isAdd ? <Plus className="text-primary" size={32} /> :
             <Edit className="text-orange-500" size={32} />}
          </div>
          <DialogTitle className="text-3xl font-semibold dark:text-white">
            {isDelete ? "Purge Bundle?" :
             isStatus ? (selectedBundle?.status === "active" ? "Archive Tier?" : "Publish Tier?") :
             isAdd ? "Create Bundle" : "Modify Tier"}
          </DialogTitle>
          <DialogDescription className="text-zinc-500 mt-2">
            {isAdd ? "Define a new service package for the global market." : `Target: ${selectedBundle?.name}`}
          </DialogDescription>
        </DialogHeader>

        <div className="py-6 space-y-4 relative z-10 max-h-[60vh] overflow-y-auto px-1 custom-scrollbar">
          {isAdd || isEdit ? (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs text-zinc-400">Bundle Name</label>
                  <Input placeholder="e.g. Pro Cluster" defaultValue={selectedBundle?.name} className="h-12 rounded-xl bg-zinc-50 dark:bg-white/5 border-zinc-200 dark:border-white/10" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs text-zinc-400">Price Point</label>
                  <Input placeholder="e.g. $199/mo" defaultValue={selectedBundle?.price} className="h-12 rounded-xl bg-zinc-50 dark:bg-white/5 border-zinc-200 dark:border-white/10" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs text-zinc-400">Feature Highlights</label>
                <Textarea 
                  placeholder="Describe the main benefits..." 
                  defaultValue={selectedBundle?.features}
                  className="min-h-[100px] rounded-xl bg-zinc-50 dark:bg-white/5 border-zinc-200 dark:border-white/10 resize-none p-4" 
                />
              </div>
            </div>
          ) : (
            <p className="text-zinc-400 text-sm leading-relaxed">
              {isDelete ? "Archiving a bundle will prevent new subscriptions. Existing tenants on this plan will remain unaffected until manual migration." :
               isStatus ? "Toggling visibility will affect how this tier appears on the public pricing page." :
               "Please confirm this administrative action."}
            </p>
          )}
        </div>

        <DialogFooter className="relative z-10 sm:justify-start gap-3">
          <Button onClick={onConfirm} variant={isDelete ? "destructive" : "default"} className={cn("h-12 rounded-xl px-8", !isDelete && "shadow-xl shadow-primary/20")}>
            Confirm Execution
          </Button>
          <Button variant="outline" onClick={onClose} className="h-12 rounded-xl px-8 border-zinc-200 dark:border-white/10 dark:text-white">
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
