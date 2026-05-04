import { useEffect } from "react";
import { useRecoilValue } from "recoil";
import { themeAtom, languageAtom } from "@/state/atoms";
import { Outlet } from "react-router-dom";

export const AuthLayout = () => {
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
    <div className="flex flex-col min-h-screen bg-background text-foreground transition-colors">
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
};
