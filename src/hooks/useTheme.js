import { useState, useEffect } from "react";

function useTheme() {
    const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "light");

    function toggleTheme() {
        setTheme(currentTheme => 
            currentTheme === "light" ? "dark" : "light"
        );
    }

    useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme);
        localStorage.setItem("theme", theme);
    }, [theme]);

    return { theme, toggleTheme };
}

export default useTheme;