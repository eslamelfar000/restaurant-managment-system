import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { SystemStat } from "../types";

interface StatsGridProps {
  stats: SystemStat[];
}

export const StatsGrid = ({ stats }: StatsGridProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, i) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
        >
          <Card className="border-zinc-200 dark:border-white/5 bg-white dark:bg-white/[0.02] hover:bg-white dark:hover:bg-white/5 transition-all duration-300 rounded-[2.5rem] overflow-hidden group relative">
            <div
              className={cn(
                "absolute top-0 right-0 w-32 h-32 blur-3xl rounded-full -mr-16 -mt-16",
                stat.color === "blue" && "bg-blue-500/5",
                stat.color === "purple" && "bg-purple-500/5",
                stat.color === "orange" && "bg-orange-500/5",
                stat.color === "green" && "bg-green-500/5"
              )}
            />
            <CardContent className="p-8 relative z-10">
              <div className="flex items-center justify-between mb-6">
                <div
                  className={cn(
                    "p-4 rounded-2xl transition-colors",
                    stat.color === "blue" && "bg-blue-500/10 text-blue-500",
                    stat.color === "purple" && "bg-purple-500/10 text-purple-500",
                    stat.color === "orange" && "bg-orange-500/10 text-orange-500",
                    stat.color === "green" && "bg-green-500/10 text-green-500"
                  )}
                >
                  <stat.icon size={24} />
                </div>
                <Badge
                  variant="outline"
                  className={cn(
                    "rounded-full px-3 py-1 border-none text-[10px] font-bold uppercase tracking-wider",
                    stat.trend === "up"
                      ? "bg-green-500/10 text-green-500"
                      : "bg-zinc-500/10 text-zinc-500",
                  )}
                >
                  {stat.change}
                </Badge>
              </div>
              <div className="space-y-1">
                <p className="text-xs font-medium text-zinc-500 uppercase tracking-widest">
                  {stat.label}
                </p>
                <div className="flex items-baseline gap-2">
                  <h3 className="text-4xl font-semibold tracking-tighter dark:text-white">
                    {stat.value}
                  </h3>
                </div>
                <p className="text-[11px] text-zinc-400 font-medium">
                  {stat.detail}
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
};
