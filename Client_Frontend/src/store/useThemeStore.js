import { create } from "zustand";

export const useThemeStore = create((set) => ({
  theme:
    typeof window !== "undefined"
      ? localStorage.getItem("streamify-theme") || "coffee"
      : "coffee",

  setTheme: (theme) => {
    localStorage.setItem("streamify-theme", theme);
    set({ theme });
  },
}));