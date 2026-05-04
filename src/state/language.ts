import { atom } from "recoil";

const savedLang = localStorage.getItem("language") as "ar" | "en" | null;
const defaultLang = savedLang === "ar" || savedLang === "en" ? savedLang : "ar";

export const languageAtom = atom<"ar" | "en">({
  key: "language",
  default: defaultLang, // Initializes from localStorage or falls back to ar
  effects: [
    ({ onSet }) => {
      onSet((newValue) => {
        localStorage.setItem("language", newValue);
      });
    },
  ],
});
