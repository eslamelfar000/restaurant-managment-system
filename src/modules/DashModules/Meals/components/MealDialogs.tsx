import { AddMealDialog } from "./AddMealDialog";
import { EditMealDialog } from "./EditMealDialog";
import { DeleteMealDialog } from "./DeleteMealDialog";
import { Meal } from "../types";

interface MealDialogsProps {
  dialogMode: "add" | "edit" | "delete" | null;
  selectedMeal: Meal | null;
  onClose: () => void;
  onConfirm: () => void;
}

export const MealDialogs = ({ 
  dialogMode, 
  selectedMeal, 
  onClose, 
  onConfirm 
}: MealDialogsProps) => {
  return (
    <>
      <AddMealDialog 
        isOpen={dialogMode === "add"} 
        onClose={onClose} 
        onConfirm={onConfirm} 
      />
      
      <EditMealDialog 
        isOpen={dialogMode === "edit"} 
        meal={selectedMeal} 
        onClose={onClose} 
        onConfirm={onConfirm} 
      />
      
      <DeleteMealDialog 
        isOpen={dialogMode === "delete"} 
        meal={selectedMeal} 
        onClose={onClose} 
        onConfirm={onConfirm} 
      />
    </>
  );
};
