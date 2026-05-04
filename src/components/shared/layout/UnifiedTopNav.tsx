import { Search, Bell, Menu, User, LogOut, Settings as SettingsIcon, ChevronDown, Terminal, Command } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRecoilState } from "recoil";
import { mobileSidebarOpenAtom, sidebarOpenAtom } from "@/state/atoms";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LanguageToggle } from "@/components/shared/LanguageToggle/LanguageToggle";
import { ThemeToggle } from "@/components/shared/ThemeToggle/ThemeToggle";

interface UnifiedTopNavProps {
  searchPlaceholder: string;
  user: {
    name: string;
    role: string;
    email: string;
    initials: string;
  };
  customActions?: React.ReactNode;
}

export const UnifiedTopNav = ({ 
  searchPlaceholder, 
  user,
  customActions 
}: UnifiedTopNavProps) => {
  const [sidebarOpen, setSidebarOpen] = useRecoilState(sidebarOpenAtom);
  const [mobileOpen, setMobileOpen] = useRecoilState(mobileSidebarOpenAtom);

  return (
    <header className="h-24 px-4 gap-4  border-b border-zinc-100 dark:border-white/5 bg-sidebar backdrop-blur-md sticky top-0 z-[40] flex items-center justify-between transition-all duration-500">
      <div className="flex items-center gap-4 flex-1">
        {/* Desktop Sidebar Toggle */}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="hidden lg:flex rounded-xl h-11 w-11 text-zinc-500 hover:bg-zinc-100 dark:hover:bg-white/5"
        >
          <Menu
            size={22}
            className={cn(
              "transition-transform duration-500",
              !sidebarOpen && "rotate-180",
            )}
          />
        </Button>

        {/* Mobile Toggle */}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setMobileOpen(!mobileOpen)}
          className="lg:hidden p-2 rounded-xl hover:bg-zinc-100 dark:hover:bg-white/5 text-zinc-500"
        >
          <Terminal size={24} />
        </Button>

        {/* Search */}
        <div className="hidden lg:flex relative w-full max-w-lg group">
          <Input
            placeholder={searchPlaceholder}
            className="h-12 rounded-2xl bg-zinc-50 dark:bg-white/5 border-zinc-200 dark:border-white/10 pl-12 focus:ring-primary/20 transition-all text-sm font-medium"
          />
          <Search
            className="absolute left-4 top-3.5 text-zinc-400 group-focus-within:text-primary transition-colors"
            size={18}
          />
          <div className="absolute right-4 top-3 flex items-center gap-1 px-2 py-1 rounded-lg bg-zinc-200 dark:bg-white/10 text-[10px] font-bold text-zinc-500">
            <Command size={10} />
            <span>K</span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4">
        {/* Custom Dashboard Actions (like Environment badges) */}
        {customActions}

        {/* Shared Controls */}
        <div className="flex items-center gap-1.5 p-1.5 rounded-2xl bg-zinc-50 dark:bg-white/5 border border-zinc-200 dark:border-white/10">
          <LanguageToggle />
          <ThemeToggle />
        </div>

        {/* Profile Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-3 p-1.5 rounded-2xl bg-zinc-50 dark:bg-white/5 border border-zinc-200 dark:border-white/10 hover:border-primary/30 transition-all group outline-none">
              <Avatar className="h-10 w-10 rounded">
                <AvatarImage src="" />
                <AvatarFallback className="bg-primary/10 text-primary font-bold rounded-lg">
                  {user.initials}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col hidden sm:flex items-start">
                <span className="text-xs font-bold leading-none">
                  {user.name}
                </span>
                <span className="text-[10px] text-zinc-400 font-bold tracking-tighter mt-1">
                  {user.role}
                </span>
              </div>
              <ChevronDown
                size={14}
                className="text-zinc-400 group-hover:text-primary transition-colors mr-1"
              />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="w-64 mt-2 p-2 rounded-2xl bg-white dark:bg-zinc-900 border-zinc-200 dark:border-white/5 shadow-2xl"
          >
            <DropdownMenuLabel className="px-3 py-3">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-bold leading-none dark:text-white">
                  {user.name}
                </p>
                <p className="text-xs leading-none text-zinc-500">
                  {user.email}
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-zinc-100 dark:bg-white/5" />
            <DropdownMenuItem className="rounded-xl h-12 gap-3 px-3 cursor-pointer">
              <User size={18} className="text-zinc-500" />
              <span className="text-sm font-medium">My Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="rounded-xl h-12 gap-3 px-3 cursor-pointer">
              <SettingsIcon size={18} className="text-zinc-500" />
              <span className="text-sm font-medium">Settings</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-zinc-100 dark:bg-white/5" />
            <DropdownMenuItem className="rounded-xl h-12 gap-3 px-3 cursor-pointer text-red-500 focus:text-red-500 focus:bg-red-500/10">
              <LogOut size={18} />
              <span className="text-sm font-bold">Sign Out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};
