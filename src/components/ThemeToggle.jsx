import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react"; // 👈 estos son los íconos

const ThemeToggle = () => {
    // Estado para guardar el tema actual (light o dark)
    const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

    // Cuando cambia el tema, actualizamos el <html class="dark"> y el localStorage
    useEffect(() => {
        if (theme === "dark") {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
        localStorage.setItem("theme", theme);
    }, [theme]);

    // Cambiar entre dark y light
    const toggleTheme = () => {
        setTheme(theme === "light" ? "dark" : "light");
    };

    return (
        <button
            onClick={toggleTheme}
            className="text-gray-800 dark:text-yellow-400 p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-all"
            aria-label="Toggle theme"
        >
            {/* Mostrar sol o luna según el tema */}
            {theme === "dark" ? (
                <Sun className="w-6 h-6" />
            ) : (
                <Moon className="w-6 h-6" />
            )}
        </button>
    );
};

export default ThemeToggle;
