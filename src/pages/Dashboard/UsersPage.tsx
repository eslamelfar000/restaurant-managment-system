import { useState } from "react";
import { Search, Filter, UserPlus, Users as UsersIcon, Crown, Star, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useClients } from "@/modules/DashModules/Users/hooks/useClients";
import { ClientTable } from "@/modules/DashModules/Users/components/ClientTable";
import { RestaurantClient } from "@/modules/DashModules/Users/types";
import { PageTransition } from "@/components/shared/layout/PageTransition";
import { ModuleHeader } from "@/components/shared/layout/ModuleHeader";
import { StatsCard } from "@/components/shared/layout/StatsCard";
import { toast } from "sonner";

const ClientsPage = () => {
  const { clients, filters, setFilters, deleteClient, toggleClientStatus, totalCount } = useClients();
  const [selectedClient, setSelectedClient] = useState<RestaurantClient | null>(null);
  const [dialogMode, setDialogMode] = useState<"add" | "edit" | "delete" | null>(null);

  const handleAction = (client: RestaurantClient | null, mode: "add" | "edit" | "delete") => {
    setSelectedClient(client);
    setDialogMode(mode);
  };

  return (
    <PageTransition className="space-y-10">
      {/* Page Header */}
      <ModuleHeader 
        title="Client Database"
        subtitle="Customer Relationship / Loyalty & Lifecycle Management"
        action={
          <Button 
            onClick={() => handleAction(null, "add")}
            className="w-full lg:w-auto rounded-[1.2rem] h-12 px-8 flex items-center justify-center gap-2 shadow-2xl shadow-primary/20 group"
          >
            <UserPlus size={20} className="group-hover:rotate-90 transition-transform" />
            Onboard New Client
          </Button>
        }
      />

      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
         <StatsCard 
          label="Total Clients" 
          value={totalCount} 
          icon={UsersIcon} 
          color="primary"
          description="Global registered users"
         />
         <StatsCard 
          label="VIP Members" 
          value={clients.filter(c => c.tier === 'vip').length} 
          icon={Crown} 
          color="orange"
          description="High-value customers"
         />
         <StatsCard 
          label="Loyal Clients" 
          value={clients.filter(c => c.tier === 'loyal').length} 
          icon={Star} 
          color="blue"
          description="Repeat visitors"
         />
         <StatsCard 
          label="Conversion Rate" 
          value="24.8%" 
          icon={TrendingUp} 
          color="green"
          trend="+5.2%"
         />
      </div>

      {/* Filters Bar */}
      <div className="flex flex-col md:flex-row gap-4 items-center">
        <div className="relative flex-1 group">
          <Input 
            placeholder="Search by client identity, email or contact number..." 
            value={filters.search}
            onChange={(e) => setFilters({ ...filters, search: e.target.value })}
            className="h-14 rounded-2xl bg-white dark:bg-white/[0.02] border-zinc-200 dark:border-white/10 pl-12 transition-all focus:ring-primary/20 text-lg shadow-sm"
          />
          <Search className="absolute left-4 top-4 text-zinc-400 group-focus-within:text-primary transition-colors" size={22} />
        </div>
        <div className="flex items-center gap-2">
           <Button variant="outline" className="h-14 rounded-2xl px-6 border-zinc-200 dark:border-white/10 bg-white dark:bg-white/[0.02] shadow-sm gap-2 font-bold hover:border-primary/30 transition-all">
              <Filter size={20} />
              Tier
           </Button>
        </div>
      </div>

      {/* Table Section */}
      <ClientTable 
        clients={clients} 
        onAction={handleAction}
        onToggleStatus={(id) => {
          toggleClientStatus(id);
          toast.success("Client status updated.");
        }} 
      />
    </PageTransition>
  );
};

export default ClientsPage;
