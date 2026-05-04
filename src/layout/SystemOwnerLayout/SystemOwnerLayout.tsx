import { useEffect } from "react";
import { useRecoilValue } from "recoil";
import { sidebarOpenAtom, themeAtom, languageAtom } from "@/state/atoms";
import { UnifiedSidebar } from "@/components/shared/layout/UnifiedSidebar";
import { UnifiedTopNav } from "@/components/shared/layout/UnifiedTopNav";
import { Outlet } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Building2,
  Layers,
  Settings,
  ShieldCheck,
} from "lucide-react";
import { useTranslation } from "react-i18next";

const systemOwnerNavItems = [
  {
    key: "home",
    icon: LayoutDashboard,
    href: "/system-owner",
    label: "Dashboard",
  },
  {
    key: "organizations",
    icon: Building2,
    href: "/system-owner/organizations",
    label: "Organizations",
  },
  {
    key: "plans",
    icon: Layers,
    href: "/system-owner/plans",
    label: "Subscription Plans",
  },
  {
    key: "settings",
    icon: Settings,
    href: "/system-owner/settings",
    label: "System Settings",
  },
];

export const SystemOwnerLayout = () => {
  const sidebarOpen = useRecoilValue(sidebarOpenAtom);
  const theme = useRecoilValue(themeAtom);
  const language = useRecoilValue(languageAtom);
  const { t } = useTranslation();

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
        items={systemOwnerNavItems}
        logoIcon={ShieldCheck}
        title="RestaurantOS"
        subtitle="System Core"
        user={{
          name: "Super Admin",
          role: "System Owner",
          initials: "SA",
        }}
      />
      <div
        className={cn(
          "flex-1 flex flex-col transition-all duration-500 ease-[0.16,1,0.3,1] ",
          sidebarOpen ? "lg:ms-72" : "lg:ms-24",
        )}
      >
        <UnifiedTopNav
          searchPlaceholder="Search core systems..."
          user={{
            name: "Super Admin",
            role: "System Owner",
            email: "core@restaurant.os",
            initials: "SA",
          }}
        />
        <main className="flex-1 p-4 md:p-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
