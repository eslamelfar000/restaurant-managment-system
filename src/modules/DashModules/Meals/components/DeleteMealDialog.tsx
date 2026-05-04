import { Trash2, ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Meal } from "../types";

interface DeleteMealDialogProps {
  isOpen: boolean;
  meal: Meal | null;
  onClose: () => void;
  onConfirm: () => void;
}

export const DeleteMealDialog = ({ isOpen, meal, onClose, onConfirm }: DeleteMealDialogProps) => {
  if (!meal) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md rounded-2xl p-10 bg-card border-zinc-200 dark:border-white/5 overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/5 blur-3xl rounded-full" />
        <DialogHeader className="relative z-10 text-center flex flex-col items-center">
          <div className="h-16 w-16 rounded-2xl bg-red-500/10 flex items-center justify-center mb-6">
            <ShieldAlert className="text-red-500" size={32} />
          </div>
          <DialogTitle className="text-2xl font-black tracking-tighter">
            Terminate <span className="text-red-500">Dish</span>
          </DialogTitle>
          <DialogDescription className="text-zinc-500 font-medium text-center mt-2">
            Are you sure you want to remove <span className="font-bold text-zinc-900 dark:text-white">"{meal.name}"</span> from your menu? This action is permanent.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="relative z-10 mt-8 flex-col sm:flex-col gap-3">
          <Button onClick={onConfirm} variant="destructive" className="h-14 rounded-xl font-bold w-full shadow-2xl shadow-red-500/20 gap-2">
            <Trash2 size={18} />
            Confirm Removal
          </Button>
          <Button variant="ghost" onClick={onClose} className="h-14 rounded-xl font-bold w-full">
            Keep Dish
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
