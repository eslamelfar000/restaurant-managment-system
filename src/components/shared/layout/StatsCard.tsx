import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { MotionItem } from "./PageTransition";

interface StatsCardProps {
  label: string;
  value: string | number;
  icon: LucideIcon;
  trend?: string;
  description?: string;
  color?: "primary" | "green" | "blue" | "orange" | "purple";
  className?: string;
}

const colorStyles = {
  primary: "bg-primary/5 border-primary/10 text-primary shadow-primary/5",
  green: "bg-green-500/5 border-green-500/10 text-green-500 shadow-green-500/5",
  blue: "bg-blue-500/5 border-blue-500/10 text-blue-500 shadow-blue-500/5",
  orange: "bg-orange-500/5 border-orange-500/10 text-orange-500 shadow-orange-500/5",
  purple: "bg-purple-500/5 border-purple-500/10 text-purple-500 shadow-purple-500/5",
};

const iconStyles = {
  primary: "bg-primary/10 text-primary",
  green: "bg-green-500/10 text-green-500",
  blue: "bg-blue-500/10 text-blue-500",
  orange: "bg-orange-500/10 text-orange-500",
  purple: "bg-purple-500/10 text-purple-500",
};

export const StatsCard = ({ 
  label, 
  value, 
  icon: Icon, 
  trend, 
  description, 
  color = "primary",
  className 
}: StatsCardProps) => {
  return (
    <MotionItem className={cn(
      "p-8 rounded-[2rem] border transition-all duration-500 group relative overflow-hidden",
      colorStyles[color],
      className
    )}>
      <div className="absolute top-0 right-0 w-32 h-32 opacity-10 blur-3xl rounded-full bg-current -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700" />
      
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-6">
          <div className={cn(
            "h-14 w-14 rounded-2xl flex items-center justify-center transition-transform duration-500 group-hover:scale-110 shadow-inner",
            iconStyles[color]
          )}>
            <Icon size={28} />
          </div>
          {trend && (
            <span className="text-xs px-3 py-1 rounded-full bg-white/50 dark:bg-black/20 border border-current/10">
              {trend}
            </span>
          )}
        </div>
        
        <div className="space-y-1">
          <p className="text-[10px] tracking-[0.2em] opacity-60">
            {label}
          </p>
          <div className="flex items-baseline gap-2">
            <h3 className="text-4xl tracking-tighter dark:text-white">
              {value}
            </h3>
            {description && (
              <span className="text-xs opacity-50">{description}</span>
            )}
          </div>
        </div>
      </div>
    </MotionItem>
  );
};
