// src/components/Calculator.js
import React, { useState } from "react";

const Calculator = () => {
  const [input, setInput] = useState("");

  const handleInput = (value) => {
    setInput((prev) => prev + value);
  };

  const calculateResult = () => {
    try {
      // Evaluate the expression safely
      // eslint-disable-next-line no-eval
      const result = eval(input);
      setInput(result.toString());
    } catch {
      setInput("Error");
    }
  };

  const clearInput = () => {
    setInput("");
  };

  const buttons = [
    "7",
    "8",
    "9",
    "/",
    "4",
    "5",
    "6",
    "*",
    "1",
    "2",
    "3",
    "-",
    "0",
    ".",
    "=",
    "+",
    "C",
  ];

  return (
    <div className="flex flex-col">
      <div className="mb-4 p-4 bg-gray-200 dark:bg-gray-700 rounded text-right text-2xl">
        {input || "0"}
      </div>
      <div className="grid grid-cols-4 gap-2">
        {buttons.map((btn) => (
          <button
            key={btn}
            onClick={() => {
              if (btn === "=") {
                calculateResult();
              } else if (btn === "C") {
                clearInput();
              } else {
                handleInput(btn);
              }
            }}
            className="p-4 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
          >
            {btn}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Calculator;
