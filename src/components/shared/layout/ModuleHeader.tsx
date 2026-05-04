import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ModuleHeaderProps {
  title: string;
  subtitle: string;
  action?: ReactNode;
  className?: string;
}

export const ModuleHeader = ({ title, subtitle, action, className }: ModuleHeaderProps) => {
  return (
    <div className={cn("flex flex-col lg:flex-row lg:items-start lg:items-center justify-between gap-4", className)}>
      <div className="space-y-1 md:space-y-2">
        <h2 className="text-3xl md:text-4xl font-semibold tracking-tight dark:text-white leading-tight">
          {title.split(' ').map((word, i) => (
            i === title.split(' ').length - 1 ? (
              <span key={i} className="text-primary ml-1.5">{word}</span>
            ) : (
              <span key={i}>{word}</span>
            )
          ))}
        </h2>
        <p className="text-sm md:text-base text-muted-foreground max-w-2xl">
          {subtitle}
        </p>
      </div>
      {action && (
        <div className="flex-shrink-0 w-full lg:w-auto">
          {action}
        </div>
      )}
    </div>
  );
};
