import { Outlet } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { sidebarOpenAtom, themeAtom, languageAtom } from "@/state/atoms";
import { UnifiedSidebar } from "@/components/shared/layout/UnifiedSidebar";
import { UnifiedTopNav } from "@/components/shared/layout/UnifiedTopNav";
import { useEffect } from "react";
import { cn } from "@/lib/utils";
import { 
  LayoutDashboard, 
  Users, 
  UtensilsCrossed, 
  Grid2X2, 
  LayoutGrid, 
  Settings,
  ChefHat
} from "lucide-react";

const restaurantNavItems = [
  { key: "overview", icon: LayoutDashboard, href: "/dashboard", label: "Home" },
  { key: "users", icon: Users, href: "/dashboard/users", label: "Users" },
  { key: "meals", icon: UtensilsCrossed, href: "/dashboard/meals", label: "Meals" },
  { key: "categories", icon: Grid2X2, href: "/dashboard/categories", label: "Categories" },
  { key: "hall", icon: LayoutGrid, href: "/dashboard/hall", label: "Hall Management" },
  { key: "settings", icon: Settings, href: "/dashboard/settings", label: "Settings" },
];

export const RestoDashLayout = () => {
  const sidebarOpen = useRecoilValue(sidebarOpenAtom);
  const theme = useRecoilValue(themeAtom);
  const language = useRecoilValue(languageAtom);

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(theme);
    root.lang = language;
    root.dir = language === "ar" ? "rtl" : "ltr";
  }, [theme, language]);

  return (
    <div className="min-h-screen bg-background transition-colors font-['Work_Sans']">
      <UnifiedSidebar 
        items={restaurantNavItems}
        logoIcon={ChefHat}
        title="KitchenSync"
        subtitle="Gourmet Haven"
        user={{
          name: "Chef Mario",
          role: "Executive Chef",
          initials: "MR"
        }}
        // extraContent={
        //   <div className="p-4 rounded-[2rem] bg-zinc-50 dark:bg-white/5 border border-dashed border-zinc-200 dark:border-white/10">
        //     <p className="text-[10px] text-zinc-500 uppercase font-bold tracking-widest text-center mb-3">Express Terminal</p>
        //     <Button className="w-full h-11 rounded-2xl shadow-lg shadow-primary/10 gap-2 text-xs">
        //       <Utensils size={16} />
        //       Open POS
        //     </Button>
        //   </div>
        // }
      />
      <div className={cn(
        "transition-all duration-500 ease-[0.16,1,0.3,1] flex flex-col min-h-screen",
        sidebarOpen ? "lg:ms-72" : "lg:ms-24"
      )}>
        <UnifiedTopNav 
          searchPlaceholder="Search orders, tables, or dishes..."
          user={{
            name: "Chef Mario",
            role: "Executive Chef",
            email: "mario@gourmet.os",
            initials: "MR"
          }}
        />
        <main className="flex-1 p-4 md:p-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
           <Outlet />
        </main>
      </div>
    </div>
  );
};
