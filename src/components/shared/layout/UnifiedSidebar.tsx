import { useState, useEffect } from "react";
import { useRecoilValue, useSetRecoilState, useRecoilState } from "recoil";
import { sidebarOpenAtom, mobileSidebarOpenAtom } from "@/state/atoms";
import { NavLink, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { LucideIcon, LogOut, Bell, HelpCircle } from "lucide-react";

interface SidebarItem {
  key: string;
  icon: LucideIcon;
  href: string;
  label: string;
}

interface UnifiedSidebarProps {
  items: SidebarItem[];
  logoIcon: LucideIcon;
  title: string;
  subtitle: string;
  user: {
    name: string;
    role: string;
    initials: string;
  };
  extraContent?: React.ReactNode;
}

export const UnifiedSidebar = ({
  items,
  logoIcon: LogoIcon,
  title,
  subtitle,
  user,
  extraContent,
}: UnifiedSidebarProps) => {
  const sidebarOpen = useRecoilValue(sidebarOpenAtom);
  const mobileSidebarOpen = useRecoilValue(mobileSidebarOpenAtom);
  const setMobileSidebarOpen = useSetRecoilState(mobileSidebarOpenAtom);
  const location = useLocation();

  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isCurrentOpen = isMobile ? true : sidebarOpen;

  const handleMobileItemClick = () => {
    if (isMobile) {
      setMobileSidebarOpen(false);
    }
  };

  const renderNavItem = (item: SidebarItem) => {
    const isActive = location.pathname === item.href;

    const content = (
      <NavLink
        to={item.href}
        onClick={handleMobileItemClick}
        className={cn(
          "group relative flex items-center gap-3 rounded-2xl mb-1 overflw-x-hidden",
          isCurrentOpen ? "px-4 py-3" : "h-14 w-14 mx-auto justify-center",
          isActive
            ? "bg-primary text-white shadow-lg shadow-primary/20"
            : "text-zinc-500 hover:bg-zinc-100 dark:hover:bg-white/5 hover:text-zinc-900 dark:hover:text-white",
        )}
      >
        <item.icon
          size={22}
          className={cn(
            "group-hover:scale-110 shrink-0",
            isActive && "text-white",
          )}
        />
        <AnimatePresence mode="wait">
          {isCurrentOpen && (
            <motion.span
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              className="text-sm font-semibold whitespace-nowrap"
            >
              {item.label}
            </motion.span>
          )}
        </AnimatePresence>

        {isActive && !isCurrentOpen && (
          <motion.div
            layoutId="active-indicator-shared"
            className="absolute -left-2 top-1/4 -translate-y-1/5 w-1.5 h-8 bg-primary rounded-l-full shadow-[0_0_10px_rgba(255,121,102,0.5)]"
          />
        )}
      </NavLink>
    );

    if (isCurrentOpen) {
      return <div key={item.href}>{content}</div>;
    }

    return (
      <Tooltip key={item.href} delayDuration={0}>
        <TooltipTrigger asChild>{content}</TooltipTrigger>
        <TooltipContent
          side="right"
          sideOffset={10}
          className="text-xs py-2 px-3 bg-zinc-900 text-white border-none rounded-xl shadow-xl z-[100]"
        >
          {item.label}
        </TooltipContent>
      </Tooltip>
    );
  };

  return (
    <TooltipProvider>
      {/* Mobile Overlay */}
      <AnimatePresence>
        {mobileSidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[80] lg:hidden"
            onClick={() => setMobileSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      <aside
        className={cn(
          "fixed top-0 start-0 z-[90] h-screen bg-sidebar border-e border-zinc-200 dark:border-white/5 transition-all duration-300 ease-[0.16,1,0.3,1] flex flex-col",
          mobileSidebarOpen
            ? "translate-x-0 w-72 "
            : "-translate-x-full rtl:translate-x-full w-72 lg:translate-x-0 lg:rtl:translate-x-0",
          sidebarOpen ? "lg:w-72" : "lg:w-24",
        )}
      >
        {/* Header / Logo */}
        <div className="h-24 px-6 flex items-center justify-between border-b border-zinc-100 dark:border-white/5 relative">
          <AnimatePresence mode="wait">
            {isCurrentOpen ? (
              <motion.div
                key="logo-full-shared"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="flex items-center gap-3"
              >
                <div className="h-10 w-10 rounded-xl bg-primary flex items-center justify-center shadow-lg shadow-primary/20 shrink-0">
                  <LogoIcon className="text-white w-6 h-6" />
                </div>
                <div className="flex flex-col">
                  <span className="text-lg font-bold tracking-tighter leading-none dark:text-white">
                    {title}
                  </span>
                  <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest mt-1">
                    {subtitle}
                  </span>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="logo-mini-shared"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="mx-auto"
              >
                <div className="h-12 w-12 rounded-xl bg-primary flex items-center justify-center shadow-lg shadow-primary/20">
                  <LogoIcon className="text-white w-7 h-7" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Navigation Section */}
        <div className="flex-1 p-4 overflow-y-auto overflow-x-hidden custom-scrollbar">
          <nav className="space-y-1">
            {items.map((item) => renderNavItem(item))}
          </nav>
        </div>

        {/* Custom Extra Content (like POS button) */}
        {isCurrentOpen && extraContent && (
          <div className="px-6 py-4">{extraContent}</div>
        )}

        {/* Footer Section */}
        <div className="p-6 border-t border-zinc-100 dark:border-white/5 space-y-4 over">
          <div
            className={cn(
              "rounded-2xl p-3 flex items-center",
              isCurrentOpen
                ? "bg-zinc-50 dark:bg-white/5 border border-zinc-200 dark:border-white/10"
                : "bg-transparent p-0 justify-center",
            )}
          >
            <div className="h-10 w-10 rounded-xl bg-zinc-100 dark:bg-white/5 flex items-center justify-center shrink-0 border border-zinc-200 dark:border-white/10 font-bold text-xs text-zinc-500">
              {user.initials}
            </div>

            {isCurrentOpen && (
              <div className="ms-3 flex-1 overflow-hidden">
                <p className="text-sm font-bold truncate dark:text-white">
                  {user.name}
                </p>
                <p className="text-[10px] font-bold text-zinc-500 truncate uppercase tracking-tighter">
                  {user.role}
                </p>
              </div>
            )}

            {isCurrentOpen && (
              <button className="p-2 text-zinc-400 hover:text-red-500 transition-colors">
                <LogOut size={18} />
              </button>
            )}
          </div>
        </div>
      </aside>
    </TooltipProvider>
  );
};
