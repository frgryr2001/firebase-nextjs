import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { useTheme } from "next-themes";
export default function ToggleDarkMode() {
  const { setTheme, theme } = useTheme();

  return (
    <button
      className="relative inline-flex"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      <MoonIcon
        fontSize={20}
        className="rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
      />
      <SunIcon
        fontSize={20}
        className="absolute rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
      />
      <span className="sr-only">Toggle theme</span>
    </button>
  );
}
