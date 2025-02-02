"use client"
import { useTheme } from "@/contexts/theme-context";

const ThemeToggle = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <button
            className="p-2 rounded bg-gray-300 dark:bg-gray-700 text-black dark:text-white"
            onClick={toggleTheme}
        >
            {theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
        </button>
    );
};

export default ThemeToggle;
