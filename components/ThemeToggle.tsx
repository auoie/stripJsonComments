import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Listbox } from "@headlessui/react";
import { BsSunFill, BsMoonFill } from "react-icons/bs";
import { RiComputerFill } from "react-icons/ri";
import clsx from "clsx";

const update = () => {
  console.log("Updating...");
  if (
    localStorage["theme"] === "dark" ||
    (!("theme" in localStorage) &&
      window.matchMedia("(prefers-color-scheme: dark)").matches)
  ) {
    document.documentElement.classList.add("dark", "changing-theme");
  } else {
    document.documentElement.classList.remove("dark", "changing-theme");
  }
  window.setTimeout(() => {
    document.documentElement.classList.remove("changing-theme");
  });
};
const settings = [
  {
    value: "light",
    label: "Light",
    icon: BsSunFill,
  },
  {
    value: "dark",
    label: "Dark",
    icon: BsMoonFill,
  },
  {
    value: "system",
    label: "System",
    icon: RiComputerFill,
  },
] as const;
const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;
const useTheme = () => {
  const [setting, setSetting] = useState<"light" | "dark" | "system">("system");
  const initial = useRef(true);
  useIsomorphicLayoutEffect(() => {
    const theme = localStorage["theme"] as unknown;
    if (theme === "light" || theme === "dark") {
      setSetting(theme);
    }
  }, []);
  useIsomorphicLayoutEffect(() => {
    if (setting === "system") {
      localStorage.removeItem("theme");
    } else if (setting === "light" || setting === "dark") {
      localStorage["theme"] = setting;
    }
    if (initial.current) {
      initial.current = false;
    } else {
      update();
    }
  }, [setting]);
  useEffect(() => {
    let mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    mediaQuery.addEventListener("change", update);
    const onStorage = () => {
      update();
      const theme = localStorage["theme"] as unknown;
      if (theme === "light" || theme === "dark") {
        setSetting(theme);
      } else {
        setSetting("system");
      }
    };
    window.addEventListener("storage", onStorage);
    return () => {
      mediaQuery.removeEventListener("change", update);
      window.removeEventListener("storage", onStorage);
    };
  }, []);
  return [setting, setSetting] as const;
};

export const ThemeToggle = () => {
  const [setting, setSetting] = useTheme();
  return (
    <div className="w-72">
      <Listbox value={setting} onChange={setSetting}>
        <div className="relative">
          <Listbox.Label className={"sr-only"}>Theme</Listbox.Label>
          <Listbox.Button
            type="button"
            className={clsx(
              "relative w-full py-2 pl-3 pr-10 text-left shadow-md rounded-lg ring-1",
              "focus-visible:ring-2 focus-visible:ring-opacity-75 ring-black ring-opacity-5",
              "dark:ring-white dark:ring-opacity-5"
            )}
          >
            {settings.map(({ icon: Icon, value }) => (
              <div
                key={value}
                className={clsx(
                  setting != value && "hidden",
                  "flex items-center"
                )}
              >
                <Icon className="w-6 h-6" />
                <div className="ml-2 text-xl">Theme</div>
              </div>
            ))}
          </Listbox.Button>
          <Listbox.Options
            className={clsx(
              "absolute mt-1 z-50 w-full rounded-md shadow-lg py-1 ring-1 ring-opacity-5 focus:outline-none",
              "bg-white ring-black",
              "dark:bg-neutral-900  dark:ring-white dark:ring-opacity-5"
            )}
          >
            {settings.map(({ icon: Icon, label, value }) => {
              return (
                <Listbox.Option key={value} value={value} className="py-2 pl-3 cursor-pointer">
                  <div className="flex items-center">
                    <Icon className="w-6 h-6" />
                    <div className="ml-2 text-xl">{label}</div>
                  </div>
                </Listbox.Option>
              );
            })}
          </Listbox.Options>
        </div>
      </Listbox>
    </div>
  );
};
