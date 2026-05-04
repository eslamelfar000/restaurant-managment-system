import { Users, Activity, Database } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

interface OrgStatsProps {
  metrics: {
    totalUsers: string;
    uptime: string;
    storageUsed: string;
  };
}

export const OrgStats = ({ metrics }: OrgStatsProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <StatCard icon={Users} label="Total Users" value={metrics.totalUsers} color="text-blue-500" bg="bg-blue-500/10" />
      <StatCard icon={Activity} label="System Uptime" value={metrics.uptime} color="text-emerald-500" bg="bg-emerald-500/10" />
      <StatCard icon={Database} label="Storage Used" value={metrics.storageUsed} color="text-purple-500" bg="bg-purple-500/10" />
    </div>
  );
};

const StatCard = ({ icon: Icon, label, value, color, bg }: any) => (
  <Card className="border-zinc-200 dark:border-white/5 bg-white dark:bg-zinc-900/50 rounded-3xl group hover:border-primary/20 transition-all duration-500 overflow-hidden shadow-sm">
    <CardContent className="p-8 flex items-center gap-5 relative">
      <div className="absolute right-0 top-0 h-16 w-16 bg-primary/5 rounded-full blur-2xl -mr-8 -mt-8 opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className={`h-14 w-14 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110 ${bg} ${color}`}>
        <Icon size={24} />
      </div>
      <div>
        <p className="text-[10px] text-zinc-500 tracking-wider mb-0.5 uppercase font-medium">{label}</p>
        <p className="text-2xl tracking-tighter dark:text-white leading-none font-semibold">{value}</p>
      </div>
    </CardContent>
  </Card>
);
