import { create } from "zustand";

export const useThemeStore = create((set) => ({
  theme: localStorage.getItem("syncspace-theme") || "coffee",
  setTheme: (theme) => {
    localStorage.setItem("syncspace-theme", theme);
    set({ theme });
  },
}));
