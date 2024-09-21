import React from "react";

const SelectWrapper = ({ value, onChange, label, children }) => {
  return (
    <div className="relative w-full">
      {label && (
        <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
          {label}
        </label>
      )}
      <select
        value={value}
        onChange={onChange}
        className="block w-full p-2.5 bg-white border border-gray-300 rounded-md shadow-sm text-sm appearance-none
          focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white 
          dark:focus:ring-blue-500 dark:focus:border-blue-500 transition-colors pr-10" // Add padding to the right for the custom chevron
      >
        {children}
      </select>

      {/* Custom arrow for select dropdown */}
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-700 dark:text-gray-300">
        <svg
          className="w-5 h-5"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M5.292 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </div>
    </div>
  );
};

export default SelectWrapper;
