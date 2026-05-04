import { ImagePlus, Edit3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
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
import { Meal } from "../types";

interface EditMealDialogProps {
  isOpen: boolean;
  meal: Meal | null;
  onClose: () => void;
  onConfirm: () => void;
}

export const EditMealDialog = ({ isOpen, meal, onClose, onConfirm }: EditMealDialogProps) => {
  if (!meal) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-xl rounded-2xl p-0 bg-card border-zinc-200 dark:border-white/5 overflow-hidden flex flex-col max-h-[85vh]">
        <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/5 blur-3xl rounded-full" />
        
        <div className="overflow-y-auto flex-1 custom-scrollbar">
          <DialogHeader className="relative z-10 p-10 pb-0">
          <div className="h-14 w-14 rounded-2xl bg-orange-500/10 flex items-center justify-center mb-4">
            <Edit3 className="text-orange-500" size={28} />
          </div>
          <DialogTitle className="text-3xl font-bold tracking-tighter">
            Modify <span className="text-orange-500">Manifest</span>
          </DialogTitle>
          <DialogDescription className="text-zinc-500 font-medium">
            Update the specifications for <span className="font-bold text-zinc-900 dark:text-white">{meal.name}</span>.
          </DialogDescription>
        </DialogHeader>

        <div className="relative z-10 space-y-6 px-10 pt-6 pb-10">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-xs font-bold uppercase tracking-widest text-zinc-500 ml-1">Meal Title</Label>
              <Input defaultValue={meal.name} className="h-12 rounded-xl bg-zinc-50 dark:bg-white/5 border-zinc-200 dark:border-white/10" />
            </div>
            <div className="space-y-2">
              <Label className="text-xs font-bold uppercase tracking-widest text-zinc-500 ml-1">Price Component ($)</Label>
              <Input type="number" defaultValue={meal.price} className="h-12 rounded-xl bg-zinc-50 dark:bg-white/5 border-zinc-200 dark:border-white/10" />
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-xs font-bold uppercase tracking-widest text-zinc-500 ml-1">Menu Category</Label>
            <Select defaultValue={meal.category}>
              <SelectTrigger className="h-12 rounded-xl bg-zinc-50 dark:bg-white/5 border-zinc-200 dark:border-white/10">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="rounded-xl border-zinc-200 dark:border-white/5 shadow-2xl">
                <SelectItem value="Main Course" className="rounded-lg">Main Course</SelectItem>
                <SelectItem value="Burgers" className="rounded-lg">Burgers</SelectItem>
                <SelectItem value="Salads" className="rounded-lg">Salads</SelectItem>
                <SelectItem value="Drinks" className="rounded-lg">Drinks</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label className="text-xs font-bold uppercase tracking-widest text-zinc-500 ml-1">Dish Composition</Label>
            <Textarea defaultValue={meal.description} className="min-h-[100px] rounded-xl bg-zinc-50 dark:bg-white/5 border-zinc-200 dark:border-white/10 resize-none py-3" />
          </div>

          <div className="flex items-center justify-between p-4 rounded-xl bg-zinc-50 dark:bg-white/5 border border-zinc-100 dark:border-white/10">
            <div className="flex flex-col gap-0.5">
              <Label className="text-sm font-bold dark:text-white leading-none">Instant Availability</Label>
              <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-tight">Show on digital menu immediately</span>
            </div>
            <Switch defaultChecked={meal.availability} />
          </div>
        </div>
      </div>

      <DialogFooter className="relative z-10 p-10 pt-0 gap-3">
          <Button variant="ghost" onClick={onClose} className="h-14 rounded-xl font-bold flex-1">
            Cancel
          </Button>
          <Button onClick={onConfirm} className="h-14 rounded-xl font-bold flex-1 bg-orange-500 hover:bg-orange-600 shadow-2xl shadow-orange-500/20">
            Apply Updates
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
