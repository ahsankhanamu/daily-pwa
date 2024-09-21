import React, { useEffect, useState } from "react";

const DarkModeToggle = () => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <div className="flex items-center justify-center mt-4">
      <button
        onClick={() => setDarkMode(!darkMode)}
        className="px-4 py-2 rounded text-black dark:text-white bg-gray-300 dark:bg-gray-700 hover:bg-hoverAccent transition"
      >
        {darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
      </button>
    </div>
  );
};

export default DarkModeToggle;
