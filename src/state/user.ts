import { atom } from "recoil";

export const currentUserAtom = atom({
  key: "currentUser",
  default: {
    name: "أحمد",
    avatar: "/assets/images/user-img.png",
    points: 1240,
    progress: 67,
  },
});
