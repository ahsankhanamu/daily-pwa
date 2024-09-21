// src/App.js
import React, { useState } from "react";
import Dashboard from "./components/Dashboard";
import Auth from "./components/Auth";
import ThemeToggler from "./components/ThemeToggler";

function App() {
  const [user, setUser] = useState(null);
  const [favoriteUnits, setFavoriteUnits] = useState({
    length: ["m", "km", "cm", "mm"],
    mass: ["kg", "g", "lb", "oz"],
    volume: ["l", "ml", "m3", "tsp"],
    liquid: ["l", "ml", "gal", "qt"],
  });
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
    if (theme === "light") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  return (
    <div
      className={`min-h-screen ${
        theme === "dark"
          ? "bg-gray-900 text-white"
          : "bg-gray-100 text-gray-900"
      }`}
    >
      <Auth setUser={setUser} />
      <div className="container mx-auto p-4">
        <div className="flex justify-end mb-4">
          <ThemeToggler toggleTheme={toggleTheme} currentTheme={theme} />
        </div>
        <Dashboard
          user={user}
          setUser={setUser}
          favoriteUnits={favoriteUnits}
          setFavoriteUnits={setFavoriteUnits}
        />
      </div>
    </div>
  );
}

export default App;
