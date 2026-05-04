import { AddOrganizationDialog } from "./AddOrganizationDialog";
import { EditOrganizationDialog } from "./EditOrganizationDialog";
import { DeleteOrganizationDialog } from "./DeleteOrganizationDialog";
import { StatusOrganizationDialog } from "./StatusOrganizationDialog";

interface OrganizationDialogsProps {
  dialogMode: "show" | "edit" | "ban" | "renew" | "delete" | "add" | null;
  selectedOrg: any;
  onClose: () => void;
  onConfirm: () => void;
}

export const OrganizationDialogs = ({
  dialogMode,
  selectedOrg,
  onClose,
  onConfirm
}: OrganizationDialogsProps) => {
  if (!dialogMode) return null;

  return (
    <>
      <AddOrganizationDialog 
        isOpen={dialogMode === "add"} 
        onClose={onClose} 
        onConfirm={onConfirm} 
      />
      
      <EditOrganizationDialog 
        isOpen={dialogMode === "edit"} 
        selectedOrg={selectedOrg} 
        onClose={onClose} 
        onConfirm={onConfirm} 
      />
      
      <DeleteOrganizationDialog 
        isOpen={dialogMode === "delete"} 
        selectedOrg={selectedOrg} 
        onClose={onClose} 
        onConfirm={onConfirm} 
      />
      
      <StatusOrganizationDialog 
        isOpen={dialogMode === "ban" || dialogMode === "renew"} 
        mode={dialogMode === "ban" || dialogMode === "renew" ? dialogMode as "ban" | "renew" : null}
        selectedOrg={selectedOrg} 
        onClose={onClose} 
        onConfirm={onConfirm} 
      />
    </>
  );
};
