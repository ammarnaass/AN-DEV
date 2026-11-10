import { useState, useEffect, useCallback } from "react";

export function useTheme() {
  const [isDark, setIsDark] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("andev-theme");
      if (saved) return saved === "dark";
      return document.documentElement.getAttribute("data-theme") !== "light";
    }
    return true;
  });

  const applyTheme = useCallback((dark: boolean) => {
    if (typeof window === "undefined") return;
    const root = document.documentElement;
    if (dark) {
      root.setAttribute("data-theme", "dark");
      root.classList.add("dark");
      root.classList.remove("light");
      localStorage.setItem("andev-theme", "dark");
    } else {
      root.setAttribute("data-theme", "light");
      root.classList.add("light");
      root.classList.remove("dark");
      localStorage.setItem("andev-theme", "light");
    }
    setIsDark(dark);
  }, []);

  useEffect(() => {
    const handleStorage = (e: StorageEvent) => {
      if (e.key === "andev-theme") {
        setIsDark(e.newValue !== "light");
      }
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  const toggleTheme = useCallback(() => {
    applyTheme(!isDark);
  }, [isDark, applyTheme]);

  return {
    isDark,
    toggleTheme,
    setTheme: applyTheme,
  };
}
