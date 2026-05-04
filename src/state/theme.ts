import { atom } from "recoil";

const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
const defaultTheme = savedTheme === "dark" || savedTheme === "light" ? savedTheme : "dark";

export const themeAtom = atom<"light" | "dark">({
  key: "theme",
  default: defaultTheme, // Initializes from localStorage or falls back to light
  effects: [
    ({ onSet }) => {
      onSet((newValue) => {
        localStorage.setItem("theme", newValue);
      });
    },
  ],
});
