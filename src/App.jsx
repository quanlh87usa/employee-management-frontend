import "./App.css";
import "./styles/components.css";
import useTheme from "./hooks/useTheme";
import EmployeesPage from "./pages/Employees/EmployeesPage";

function App() {

    const { theme, toggleTheme } = useTheme();

    return (
    <>
        <button 
            className="btn-secondary" 
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === "light" ? "dark" : "light"} theme`}
        >
            {theme === "light" ? "Switch to Dark" : "Switch to Light"}
        </button>
        <EmployeesPage />

    </>
    );
}

export default App;