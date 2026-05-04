import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import ar from "../locales/ar/ar.json";
import en from "../locales/en/en.json";

i18n
  .use(initReactI18next)
  .init({
    resources: {
      ar: ar, // The top-level "common" key in ar.json becomes the "common" namespace!
      en: en,
    },
    fallbackLng: "en",
    lng: localStorage.getItem("language") || "en", // Get from local storage
    debug: false,
    interpolation: {
      escapeValue: false, // React already safe from xss
    },
  });

export default i18n;
