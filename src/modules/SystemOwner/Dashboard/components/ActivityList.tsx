import { motion } from "framer-motion";
import { Activity, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { SystemActivity } from "../types";

interface ActivityListProps {
  activities: SystemActivity[];
}

export const ActivityList = ({ activities }: ActivityListProps) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-primary/10 text-primary">
            <Activity size={20} />
          </div>
          <h2 className="text-2xl font-semibold tracking-tight dark:text-white">
            Recent Activity
          </h2>
        </div>
        <Button
          variant="ghost"
          className="text-xs text-primary hover:bg-primary/5"
        >
          View Master Log
        </Button>
      </div>

      <div className="space-y-4">
        {activities.map((activity, i) => (
          <motion.div
            key={activity.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 + i * 0.1 }}
            className="group flex items-center justify-between p-5 rounded-[2rem] bg-white dark:bg-white/[0.02] border border-zinc-200 dark:border-white/5 hover:border-primary/20 transition-all cursor-pointer"
          >
            <div className="flex items-center gap-5">
              <div
                className={cn(
                  "p-4 rounded-2xl transition-transform group-hover:scale-110",
                  activity.bg,
                  activity.color,
                )}
              >
                <activity.icon size={22} />
              </div>
              <div>
                <p className="text-base font-semibold dark:text-white">
                  {activity.title}
                </p>
                <p className="text-sm text-zinc-500">
                  Target:{" "}
                  <span className="text-zinc-900 dark:text-zinc-300 font-medium">
                    {activity.target}
                  </span>
                </p>
              </div>
            </div>
            <div className="text-right flex flex-col items-end gap-2">
              <span className="text-xs text-zinc-400 font-medium">
                {activity.time}
              </span>
              <button className="p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-white/5 text-zinc-400 opacity-0 group-hover:opacity-100 transition-all">
                <MoreHorizontal size={18} />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
