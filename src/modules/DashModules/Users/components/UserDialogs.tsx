import { AddUserDialog } from "./AddUserDialog";
import { EditUserDialog } from "./EditUserDialog";
import { DeleteUserDialog } from "./DeleteUserDialog";
import { RestaurantClient } from "../types";

interface UserDialogsProps {
  dialogMode: "add" | "edit" | "delete" | null;
  selectedUser: RestaurantClient | null;
  onClose: () => void;
  onConfirm: () => void;
}

export const UserDialogs = ({ 
  dialogMode, 
  selectedUser, 
  onClose, 
  onConfirm 
}: UserDialogsProps) => {
  return (
    <>
      <AddUserDialog 
        isOpen={dialogMode === "add"} 
        onClose={onClose} 
        onConfirm={onConfirm} 
      />
      
      <EditUserDialog 
        isOpen={dialogMode === "edit"} 
        user={selectedUser} 
        onClose={onClose} 
        onConfirm={onConfirm} 
      />
      
      <DeleteUserDialog 
        isOpen={dialogMode === "delete"} 
        user={selectedUser} 
        onClose={onClose} 
        onConfirm={onConfirm} 
      />
    </>
  );
};
