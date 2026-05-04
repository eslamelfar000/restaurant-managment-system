import { useState } from "react";
import {
  Search,
  Plus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { BundleDialogs } from "@/modules/SystemOwner/Bundles/components/BundleDialogs";
import { BundleTable } from "@/modules/SystemOwner/Bundles/components/BundleTable";
import { PageTransition } from "@/components/shared/layout/PageTransition";

const INITIAL_BUNDLES = [
  {
    id: "1",
    name: "Starter Kit",
    price: "$49/mo",
    status: "active",
    features: "Up to 50 orders, Basic analytics",
    accounts: 124,
  },
  {
    id: "2",
    name: "Pro Cluster",
    price: "$199/mo",
    status: "active",
    features: "Unlimited orders, AI insights, Priority support",
    accounts: 450,
  },
  {
    id: "3",
    name: "Enterprise Mesh",
    price: "Custom",
    status: "inactive",
    features: "Multi-region, Dedicated infra, White-label",
    accounts: 12,
  },
];

const BundlesPage = () => {
  const [bundles, setBundles] = useState(INITIAL_BUNDLES);
  const [selectedBundle, setSelectedBundle] = useState<any>(null);
  const [dialogMode, setDialogMode] = useState<
    "add" | "edit" | "delete" | "status" | null
  >(null);

  const handleAction = (
    bundle: any,
    mode: "add" | "edit" | "delete" | "status",
  ) => {
    setSelectedBundle(bundle);
    setDialogMode(mode);
  };

  const closeDialog = () => {
    setDialogMode(null);
    setSelectedBundle(null);
  };

  const onConfirmAction = () => {
    if (dialogMode === "add") {
      toast.success("New subscription bundle published.");
    } else if (dialogMode === "edit") {
      toast.success(`${selectedBundle?.name} bundle updated.`);
    } else if (dialogMode === "delete") {
      setBundles((prev) => prev.filter((b) => b.id !== selectedBundle?.id));
      toast.success(`${selectedBundle?.name} bundle archived.`);
    } else if (dialogMode === "status") {
      setBundles((prev) =>
        prev.map((b) =>
          b.id === selectedBundle?.id
            ? { ...b, status: b.status === "active" ? "inactive" : "active" }
            : b,
        ),
      );
      toast.success(`${selectedBundle?.name} status toggled.`);
    }
    closeDialog();
  };

  return (
    <PageTransition className="space-y-10">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1">
          <h2 className="text-3xl font-semibold dark:text-white">
            Subscription <span className="text-primary">Bundles</span>
          </h2>
          <p className="text-zinc-500 text-sm tracking-tight">
            Package Management / Pricing Strategy / Service Tiers
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
          Create New Bundle
        </Button>
      </div>

      {/* Filters & Search */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="relative group md:col-span-2">
          <Input
            placeholder="Search bundles or features..."
            className="h-14 rounded-2xl bg-white dark:bg-white/5 border-zinc-200 dark:border-white/10 pl-12 transition-all focus:ring-primary/20 text-lg"
          />
          <Search
            className="absolute left-4 top-4 text-zinc-400 group-focus-within:text-primary transition-colors"
            size={20}
          />
        </div>
      </div>

      {/* Table Container */}
      <BundleTable bundles={bundles} onAction={handleAction} />

      <BundleDialogs
        dialogMode={dialogMode}
        selectedBundle={selectedBundle}
        onClose={closeDialog}
        onConfirm={onConfirmAction}
      />
    </PageTransition>
  );
};

export default BundlesPage;
