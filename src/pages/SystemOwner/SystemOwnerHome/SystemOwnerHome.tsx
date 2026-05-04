import { motion } from "framer-motion";
import {
  Building2,
  Users,
  Layers,
  TrendingUp,
  PlusCircle,
  ShieldAlert,
  RefreshCw,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { StatsGrid } from "@/modules/SystemOwner/Dashboard/components/StatsGrid";
import { ActivityList } from "@/modules/SystemOwner/Dashboard/components/ActivityList";
import { ClusterHealth } from "@/modules/SystemOwner/Dashboard/components/ClusterHealth";
import { SystemStat, SystemActivity } from "@/modules/SystemOwner/Dashboard/types";

const SystemOwnerHome = () => {
  const stats: SystemStat[] = [
    {
      label: "Active Tenants",
      value: "1,284",
      icon: Building2,
      change: "+12%",
      trend: "up",
      detail: "14 new this week",
      color: "blue",
    },
    {
      label: "Global Users",
      value: "48.2k",
      icon: Users,
      change: "+18%",
      trend: "up",
      detail: "8.4k daily active",
      color: "purple",
    },
    {
      label: "Active Plans",
      value: "12",
      icon: Layers,
      change: "Stable",
      trend: "neutral",
      detail: "3 pending updates",
      color: "orange",
    },
    {
      label: "MRR Growth",
      value: "$142k",
      icon: TrendingUp,
      change: "+24%",
      trend: "up",
      detail: "+$12k vs last month",
      color: "green",
    },
  ];

  const activities: SystemActivity[] = [
    {
      id: 1,
      type: "provision",
      title: "New Tenant Provisioned",
      target: "Gourmet Haven",
      time: "2 mins ago",
      icon: PlusCircle,
      color: "text-blue-500",
      bg: "bg-blue-500/10",
    },
    {
      id: 2,
      type: "security",
      title: "Access Restricted",
      target: "Skyline Diner",
      time: "45 mins ago",
      icon: ShieldAlert,
      color: "text-orange-500",
      bg: "bg-orange-500/10",
    },
    {
      id: 3,
      type: "renewal",
      title: "Subscription Renewed",
      target: "Urban Eats",
      time: "2 hours ago",
      icon: RefreshCw,
      color: "text-green-500",
      bg: "bg-green-500/10",
    },
    {
      id: 4,
      type: "provision",
      title: "New Tenant Provisioned",
      target: "Coastal Grill",
      time: "5 hours ago",
      icon: PlusCircle,
      color: "text-blue-500",
      bg: "bg-blue-500/10",
    },
  ];

  return (
    <div className="space-y-12 pb-20">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <motion.h1
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-5xl font-semibold tracking-tighter dark:text-white"
          >
            System <span className="text-primary">Overview</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="text-zinc-500 text-lg font-medium tracking-tight"
          >
            Infrastructure Control Center / Real-time Global Metrics
          </motion.p>
        </div>
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            className="rounded-2xl h-12 px-6 border-zinc-200 dark:border-white/10 dark:text-white"
          >
            Export Report
          </Button>
          <Button className="rounded-2xl h-12 px-6 shadow-xl shadow-primary/20">
            System Diagnostics
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <StatsGrid stats={stats} />

      {/* Main Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Activity Section */}
        <div className="lg:col-span-2">
          <ActivityList activities={activities} />
        </div>

        {/* Global Health Section */}
        <ClusterHealth />
      </div>
    </div>
  );
};

export default SystemOwnerHome;
