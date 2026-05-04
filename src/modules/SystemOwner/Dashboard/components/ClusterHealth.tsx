import { motion } from "framer-motion";
import { TrendingUp } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export const ClusterHealth = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-xl bg-green-500/10 text-green-500">
          <TrendingUp size={20} />
        </div>
        <h2 className="text-2xl font-semibold tracking-tight dark:text-white">
          Cluster Health
        </h2>
      </div>

      <Card className="border-zinc-200 dark:border-white/5 bg-zinc-900 rounded-[2.5rem] overflow-hidden">
        <CardContent className="p-8 space-y-8">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-zinc-400 text-sm">Global Uptime</p>
              <p className="text-green-500 text-sm font-bold">99.98%</p>
            </div>
            <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "99.98%" }}
                className="h-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.4)]"
              />
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-zinc-400 text-sm">Resource Load</p>
              <p className="text-primary text-sm font-bold">34.2%</p>
            </div>
            <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ width: "34.2%" }}
                className="h-full bg-primary"
              />
            </div>
          </div>

          <div className="pt-4 border-t border-white/5">
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-white/5 text-center">
                <p className="text-[10px] text-zinc-500 uppercase">
                  Latency
                </p>
                <p className="text-lg font-bold text-white">42ms</p>
              </div>
              <div className="p-4 rounded-2xl bg-white/5 text-center">
                <p className="text-[10px] text-zinc-500 uppercase">
                  Clusters
                </p>
                <p className="text-lg font-bold text-white">8</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
