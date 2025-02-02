"use client"
import { createContext, useContext, useEffect, useState } from "react";

type ITheme = "light" | "dark";

const ThemeContext = createContext({
    theme: "light",
    toggleTheme: () => {}
});

import { ReactNode } from "react";

interface ThemeProviderProps {
    children: ReactNode;
}

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
    const [theme, setTheme] = useState<ITheme>("light");

    useEffect(() => {
        const savedTheme:ITheme = localStorage.getItem("theme") as ITheme;
        if (savedTheme) {
            setTheme(savedTheme);
            document.documentElement.classList.add(savedTheme);
        }
    }, []);

    const toggleTheme = () => {
        const newTheme = theme === "light" ? "dark" : "light";
        setTheme(newTheme);
        document.documentElement.classList.remove(theme);
        document.documentElement.classList.add(newTheme);
        localStorage.setItem("theme", newTheme);
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => useContext(ThemeContext);
