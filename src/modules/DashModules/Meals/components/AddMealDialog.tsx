import { ImagePlus, Utensils } from "lucide-react";
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

interface AddMealDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export const AddMealDialog = ({ isOpen, onClose, onConfirm }: AddMealDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-xl rounded-2xl p-0 bg-card border-zinc-200 dark:border-white/5 overflow-hidden flex flex-col max-h-[85vh]">
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 blur-3xl rounded-full" />
        
        <div className="overflow-y-auto flex-1 custom-scrollbar">
          <DialogHeader className="relative z-10 p-10 pb-0">
          <div className="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-4">
            <Utensils className="text-primary" size={28} />
          </div>
          <DialogTitle className="text-3xl font-bold tracking-tighter">
            New <span className="text-primary">Dish</span>
          </DialogTitle>
          <DialogDescription className="text-zinc-500 font-medium">
            Draft a new culinary masterpiece for your restaurant menu.
          </DialogDescription>
        </DialogHeader>

        <div className="relative z-10 space-y-6 px-10 pt-6 pb-10">
          {/* Image Upload Placeholder */}
          <div className="relative group">
            <div className="h-40 w-full rounded-2xl border-2 border-dashed border-zinc-200 dark:border-white/10 flex flex-col items-center justify-center gap-2 hover:border-primary/50 transition-all bg-zinc-50/50 dark:bg-white/5 cursor-pointer">
              <ImagePlus size={32} className="text-zinc-400 group-hover:text-primary transition-colors" />
              <span className="text-xs font-bold uppercase tracking-widest text-zinc-500 group-hover:text-primary transition-colors">Dish Presentation Image</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-xs font-bold uppercase tracking-widest text-zinc-500 ml-1">Meal Title</Label>
              <Input placeholder="e.g. Braised Beef Short Rib" className="h-12 rounded-xl bg-zinc-50 dark:bg-white/5 border-zinc-200 dark:border-white/10" />
            </div>
            <div className="space-y-2">
              <Label className="text-xs font-bold uppercase tracking-widest text-zinc-500 ml-1">Price Component ($)</Label>
              <Input type="number" placeholder="0.00" className="h-12 rounded-xl bg-zinc-50 dark:bg-white/5 border-zinc-200 dark:border-white/10" />
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-xs font-bold uppercase tracking-widest text-zinc-500 ml-1">Menu Category</Label>
            <Select>
              <SelectTrigger className="h-12 rounded-xl bg-zinc-50 dark:bg-white/5 border-zinc-200 dark:border-white/10">
                <SelectValue placeholder="Select Destination Category" />
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
            <Textarea placeholder="Describe the ingredients and preparation method..." className="min-h-[100px] rounded-xl bg-zinc-50 dark:bg-white/5 border-zinc-200 dark:border-white/10 resize-none py-3" />
          </div>

          <div className="flex items-center justify-between p-4 rounded-xl bg-zinc-50 dark:bg-white/5 border border-zinc-100 dark:border-white/10">
            <div className="flex flex-col gap-0.5">
              <Label className="text-sm font-bold dark:text-white leading-none">Instant Availability</Label>
              <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-tight">Show on digital menu immediately</span>
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
            Authorize New Dish
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
