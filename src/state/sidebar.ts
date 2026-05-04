import { atom } from "recoil";

const savedState = localStorage.getItem("sidebarOpen");
const defaultDesktopState = savedState !== null ? JSON.parse(savedState) : true;

export const sidebarOpenAtom = atom<boolean>({
  key: "sidebarOpen",
  default: defaultDesktopState,
  effects: [
    ({ onSet }) => {
      onSet((newValue) => {
        localStorage.setItem("sidebarOpen", JSON.stringify(newValue));
      });
    },
  ],
});

export const mobileSidebarOpenAtom = atom<boolean>({
  key: "mobileSidebarOpen",
  default: false,
});
