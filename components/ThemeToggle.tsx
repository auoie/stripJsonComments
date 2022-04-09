import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Listbox } from "@headlessui/react";
import { FiSun, FiMoon } from "react-icons/fi";
import { RiComputerLine } from "react-icons/ri";

const update = () => {
  console.log("updating");
  if (
    localStorage["theme"] === "dark" ||
    (!("theme" in localStorage) &&
      window.matchMedia("(prefers-color-scheme: dark)").matches)
  ) {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
};
const settings = [
  {
    value: "light",
    label: "Light",
    icon: FiSun,
  },
  {
    value: "dark",
    label: "Dark",
    icon: FiMoon,
  },
  {
    value: "system",
    label: "System",
    icon: RiComputerLine,
  },
];
const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;
const useTheme = () => {
  const [setting, setSetting] = useState("system");
  const initial = useRef(true);
  useIsomorphicLayoutEffect(() => {
    console.log("first iso");
    const theme = localStorage["theme"];
    if (theme === "light" || theme === "dark") {
      setSetting(theme);
    }
    console.log("theme:", theme);
  }, []);
  useIsomorphicLayoutEffect(() => {
    console.log("second iso");
    if (setting === "system") {
      localStorage.removeItem("theme");
    } else if (setting === "light" || setting === "dark") {
      localStorage["theme"] = setting;
    }
    if (initial.current) {
      console.log("is innitial current");
      initial.current = false;
    } else {
      update();
    }
    console.log("localstorage[theme]:", localStorage["theme"]);
  }, [setting]);
  useEffect(() => {
    console.log("third use");
    let mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", update);
    } else {
      mediaQuery.addListener(update);
    }
    const onStorage = () => {
      update();
      const theme = localStorage["theme"];
      if (theme === "light" || theme === "dark") {
        setSetting(theme);
      } else {
        setSetting("system");
      }
    };
    window.addEventListener("storage", onStorage);
    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener("change", update);
      } else {
        mediaQuery.removeListener(update);
      }
      window.removeEventListener("storage", onStorage);
    };
  }, []);
  return [setting, setSetting] as const;
};

export const ThemeToggle = () => {
  const [setting, setSetting] = useTheme();
  return (
    <Listbox value={setting} onChange={setSetting}>
      <Listbox.Label className={"sr-only"}>Theme</Listbox.Label>
      <Listbox.Button type="button">
        <span className="dark:hidden">
          <FiSun className="h-6 w-6" />
        </span>
        <span className="hidden dark:inline">
          <FiMoon className="h-6 w-6" />
        </span>
      </Listbox.Button>
      <Listbox.Options>
        {settings.map(({ icon: Icon, label, value }) => {
          return (
            <Listbox.Option
              key={value}
              value={value}
              className="flex items-center"
            >
              <Icon />
              {label}
            </Listbox.Option>
          );
        })}
      </Listbox.Options>
    </Listbox>
  );
};
