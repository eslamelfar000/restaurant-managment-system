import { useRecoilState } from "recoil";
import { languageAtom } from "@/state/atoms";
import { Languages } from "lucide-react";
import { useTranslation } from "react-i18next";

export const LanguageToggle = () => {
  const [language, setLanguage] = useRecoilState(languageAtom);
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const nextLang = language === "ar" ? "en" : "ar";
    setLanguage(nextLang);
    i18n.changeLanguage(nextLang);
  };

  return (
    <button
      onClick={toggleLanguage}
      className="p-2 rounded-lg hover:bg-primary/20 text-sidebar-foreground transition-colors flex items-center gap-1 text-sm font-semibold"
      aria-label="Toggle Language"
    >
      <Languages size={18} />
      {language === "ar" ? "EN" : "AR"}
    </button>
  );
};
