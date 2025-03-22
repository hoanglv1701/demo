import { Theme, themes } from "@/styles/themeGlobal";
import { setStorageByName } from "@/utilities/localStorage";
import { useEffect, useState } from "react";

const isTheme = (theme: any): theme is Theme => {
  const themeArrs = {
    Primary: Theme.Primary,
    Thirdary: Theme.Thirdary,
    // Thirdary: Theme.Thirdary,
  };
  return Object.values(themeArrs).map(v => v.toString()).includes(theme);
}

function useTheme() {
  const savedTheme = localStorage.getItem("theme");
  const [theme, setTheme] = useState<string>(savedTheme || Theme.Primary);

  useEffect(() => {
    if (isTheme(savedTheme)) {
      setTheme(savedTheme);
    };
  }, [])

  useEffect(() => {
    setStorageByName("theme", theme)
    for (let prop in themes[theme]) {
      const root = document.querySelector(":root") as HTMLElement;
      root.style.setProperty(prop, themes[theme][prop]);
    }
  }, [theme]);

  const selectTheme = (theme: string) => {
    setTheme(theme);
  }

  return { theme, selectTheme };
}

export default useTheme;
