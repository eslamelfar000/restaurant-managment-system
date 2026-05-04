import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter,
  DialogDescription
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { ImagePlus, Utensils } from "lucide-react";
import { Meal } from "../types";

interface MealFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialData?: Meal | null;
}

export const MealForm = ({ open, onOpenChange, initialData }: MealFormProps) => {
  const isEditing = !!initialData;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] rounded-[2.5rem] bg-white dark:bg-zinc-950 border-zinc-200 dark:border-white/5 shadow-2xl p-0 overflow-hidden">
        <DialogHeader className="p-8 pb-0">
          <div className="h-14 w-14 rounded-[1.5rem] bg-primary/10 flex items-center justify-center mb-4">
             <Utensils className="text-primary" size={28} />
          </div>
          <DialogTitle className="text-2xl font-bold tracking-tight dark:text-white">
            {isEditing ? 'Update Dish' : 'Add New Dish'}
          </DialogTitle>
          <DialogDescription className="text-zinc-500 font-medium">
            Fill in the details below to {isEditing ? 'update your menu item' : 'add a new recipe to your kitchen'}.
          </DialogDescription>
        </DialogHeader>

        <form className="p-8 pt-6 space-y-6">
          {/* Image Upload Placeholder */}
          <div className="relative group">
            <div className="h-32 w-full rounded-3xl border-2 border-dashed border-zinc-200 dark:border-white/10 flex flex-col items-center justify-center gap-2 hover:border-primary/50 transition-all bg-zinc-50/50 dark:bg-white/5 cursor-pointer">
               <ImagePlus size={24} className="text-zinc-400 group-hover:text-primary transition-colors" />
               <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 group-hover:text-primary transition-colors">Upload Dish Image</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-xs font-bold uppercase tracking-wider text-zinc-500 ml-1">Dish Name</Label>
              <Input 
                id="name" 
                placeholder="e.g. Pasta Carbonara" 
                defaultValue={initialData?.name}
                className="h-12 rounded-2xl bg-zinc-50 dark:bg-white/5 border-zinc-200 dark:border-white/10 focus:ring-primary/20" 
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="price" className="text-xs font-bold uppercase tracking-wider text-zinc-500 ml-1">Price ($)</Label>
              <Input 
                id="price" 
                type="number" 
                placeholder="0.00" 
                defaultValue={initialData?.price}
                className="h-12 rounded-2xl bg-zinc-50 dark:bg-white/5 border-zinc-200 dark:border-white/10 focus:ring-primary/20" 
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="category" className="text-xs font-bold uppercase tracking-wider text-zinc-500 ml-1">Category</Label>
            <Select defaultValue={initialData?.category}>
              <SelectTrigger className="h-12 rounded-2xl bg-zinc-50 dark:bg-white/5 border-zinc-200 dark:border-white/10 focus:ring-primary/20">
                <SelectValue placeholder="Select Category" />
              </SelectTrigger>
              <SelectContent className="rounded-2xl bg-white dark:bg-zinc-900 border-zinc-200 dark:border-white/5 shadow-xl">
                <SelectItem value="Main Course" className="rounded-lg">Main Course</SelectItem>
                <SelectItem value="Burgers" className="rounded-lg">Burgers</SelectItem>
                <SelectItem value="Salads" className="rounded-lg">Salads</SelectItem>
                <SelectItem value="Drinks" className="rounded-lg">Drinks</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className="text-xs font-bold uppercase tracking-wider text-zinc-500 ml-1">Description</Label>
            <Textarea 
              id="description" 
              placeholder="Tell your customers about this dish..." 
              defaultValue={initialData?.description}
              className="min-h-[100px] rounded-2xl bg-zinc-50 dark:bg-white/5 border-zinc-200 dark:border-white/10 focus:ring-primary/20 resize-none py-3" 
            />
          </div>

          <div className="flex items-center justify-between p-4 rounded-2xl bg-zinc-50 dark:bg-white/5 border border-zinc-200 dark:border-white/10">
            <div className="flex flex-col gap-0.5">
              <Label className="text-sm font-bold dark:text-white">Availability</Label>
              <span className="text-[10px] text-zinc-500 font-medium tracking-tight">Show this dish on the digital menu</span>
            </div>
            <Switch defaultChecked={initialData?.availability ?? true} />
          </div>
        </form>

        <DialogFooter className="p-8 pt-0 gap-3">
          <Button variant="ghost" onClick={() => onOpenChange(false)} className="h-14 rounded-2xl font-bold flex-1">
            Cancel
          </Button>
          <Button className="h-14 rounded-2xl font-bold flex-1 shadow-lg shadow-primary/20">
            {isEditing ? 'Save Changes' : 'Add to Kitchen'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
