import { useState } from "react";
import {
  Search,
  Plus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { OrganizationDialogs } from "./components/OrganizationDialogs";
import { OrganizationTable } from "./components/OrganizationTable";

// Mock Data
const INITIAL_ORGANIZATIONS = [
  {
    id: "org_9921",
    name: "Gourmet Haven",
    domain: "gourmet.restaurantos.io",
    owner: "admin@gourmet.io",
    status: "active",
    plan: "Enterprise",
    region: "us-east-1",
  },
  {
    id: "org_4410",
    name: "Urban Bites",
    domain: "urbanbites.io",
    owner: "super@urban.com",
    status: "active",
    plan: "Pro",
    region: "eu-west-3",
  },
  {
    id: "org_1102",
    name: "Skyline Dining",
    domain: "skyline.restaurantos.io",
    owner: "ops@skyline.net",
    status: "suspended",
    plan: "Starter",
    region: "ap-southeast-1",
  },
];

export const OrganizationsList = () => {
  const [organizations, setOrganizations] = useState(INITIAL_ORGANIZATIONS);
  const [selectedOrg, setSelectedOrg] = useState<any>(null);
  const [dialogMode, setDialogMode] = useState<
    "add" | "edit" | "delete" | "ban" | "renew" | "show" | null
  >(null);

  const handleAction = (
    org: any,
    mode: "add" | "edit" | "delete" | "ban" | "renew" | "show",
  ) => {
    setSelectedOrg(org);
    setDialogMode(mode);
  };

  const closeDialog = () => {
    setDialogMode(null);
    setSelectedOrg(null);
  };

  const onConfirmAction = () => {
    if (dialogMode === "add") {
      toast.success("New tenant cluster provisioning started.");
    } else if (dialogMode === "edit") {
      toast.success(`Manifest for ${selectedOrg?.name} updated.`);
    } else if (dialogMode === "delete") {
      setOrganizations((prev) =>
        prev.filter((org) => org.id !== selectedOrg?.id),
      );
      toast.success(`${selectedOrg?.name} cluster terminated.`);
    } else if (dialogMode === "ban" || dialogMode === "renew") {
      setOrganizations((prev) =>
        prev.map((org) =>
          org.id === selectedOrg?.id
            ? {
                ...org,
                status: dialogMode === "ban" ? "suspended" : "active",
              }
            : org,
        ),
      );
      toast.success(`${selectedOrg?.name} access status updated.`);
    }
    closeDialog();
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1">
          <h2 className="text-3xl font-semibold dark:text-white">
            Tenant <span className="text-primary">Organizations</span>
          </h2>
          <p className="text-zinc-500 text-sm tracking-tight">
            Infrastructure Control / Global Instance Management
          </p>
        </div>
        <Button
          onClick={() => handleAction(null, "add")}
          className="rounded-[1.2rem] h-12 px-8 flex items-center gap-2 shadow-2xl shadow-primary/20 group"
        >
          <Plus
            size={20}
            className="group-hover:rotate-90 transition-transform"
          />
          Provision New Tenant
        </Button>
      </div>

      {/* Filters & Search */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="relative group md:col-span-2">
          <Input
            placeholder="Search clusters, domains, or owners..."
            className="h-14 rounded-2xl bg-white dark:bg-white/5 border-zinc-200 dark:border-white/10 pl-12 transition-all focus:ring-primary/20 text-lg"
          />
          <Search
            className="absolute left-4 top-4 text-zinc-400 group-focus-within:text-primary transition-colors"
            size={20}
          />
        </div>
      </div>

      {/* Table Container */}
      <OrganizationTable
        organizations={organizations}
        onAction={handleAction}
      />

      <OrganizationDialogs
        dialogMode={dialogMode}
        selectedOrg={selectedOrg}
        onClose={closeDialog}
        onConfirm={onConfirmAction}
      />
    </div>
  );
};

