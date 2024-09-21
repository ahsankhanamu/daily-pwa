// src/components/UnitConverter.js
import React, { useState } from "react";
import convert from "convert-units";
import { convertToFeetAndInches } from "../helpers/conversionHelper";
import SelectWrapper from "./SelectWrapper"; // Import the SelectWrapper

const UnitConverter = ({ favoriteUnits, copyFormat }) => {
  const [value, setValue] = useState(0);
  const [fromUnit, setFromUnit] = useState("m");
  const [unitType, setUnitType] = useState("length");
  const [results, setResults] = useState([]);
  const [copyState, setCopyState] = useState({});

  const availableUnits = convert().possibilities(unitType);

  const handleConversion = () => {
    const newResults = favoriteUnits[unitType].map((unit) => {
      if (unit === "ft & in") {
        const feetInchResult = convertToFeetAndInches(
          convert(value).from(fromUnit).to("m")
        );
        return {
          unit: "ft & in",
          value: `${feetInchResult.feet} ft, ${feetInchResult.inches} in`,
        };
      } else {
        const resultValue = convert(value).from(fromUnit).to(unit);
        return {
          unit,
          value:
            typeof resultValue === "number" && !isNaN(resultValue)
              ? resultValue
              : resultValue.toString(),
        };
      }
    });

    setResults(newResults);
    setCopyState({}); // Reset copy state when new conversion is done
  };

  const handleCopy = (result, index) => {
    const textToCopy =
      copyFormat === "valueWithUnit"
        ? `${result.value} ${result.unit}`
        : `${result.value}`;

    navigator.clipboard.writeText(textToCopy).then(() => {
      setCopyState((prev) => ({ ...prev, [index]: true }));

      setTimeout(() => {
        setCopyState((prev) => ({ ...prev, [index]: false }));
      }, 500);
    });
  };

  return (
    <div className="dark:bg-darkBg p-4 rounded-lg transition-colors">
      {/* <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-lightText">
        Unit Converter
      </h1>{" "} */}
      {/* Updated for heading */}
      <div className="mb-4">
        <label className="block mb-2 font-semibold text-gray-900 dark:text-lightText">
          Conversion Type:
        </label>
        <SelectWrapper
          value={unitType}
          onChange={(e) => setUnitType(e.target.value)}
        >
          <option value="length">Length</option>
          <option value="mass">Weight</option>
          <option value="volume">Volume</option>
          <option value="liquid">Liquid Measure</option>
        </SelectWrapper>
      </div>
      <div className="mb-4">
        <label className="block mb-2 font-semibold text-gray-700 dark:text-lightText">
          Value:
        </label>
        <input
          type="number"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-accent dark:bg-darkCard dark:border-gray-600 dark:text-lightText"
          placeholder="Enter value"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2 font-semibold text-gray-700 dark:text-lightText">
          From Unit:
        </label>
        <SelectWrapper
          value={fromUnit}
          onChange={(e) => setFromUnit(e.target.value)}
        >
          {availableUnits.map((unit) => (
            <option key={unit} value={unit}>
              {unit}
            </option>
          ))}
        </SelectWrapper>
      </div>
      <button
        onClick={handleConversion}
        className="w-full p-2 mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 rounded-md dark:text-white transition"
      >
        Convert
      </button>
      {results.length > 0 && (
        <div className="mt-6">
          <h4 className="text-lg font-semibold mb-2 text-gray-900 dark:text-lightText">
            Converted Values:
          </h4>
          {results.map((result, index) => (
            <div
              key={index}
              className="flex justify-between items-center bg-gray-50 dark:bg-darkCard p-2 rounded-md mb-2 shadow-md hover:bg-gray-100 dark:hover:bg-darkCardHover transition"
            >
              <span className="dark:text-lightText">
                <span className="text-gray-600 font-semibold px-2 dark:text-lightText">
                  {result.unit}
                </span>
                <span className="text-lg ml-2 dark:text-lightText">
                  {typeof result.value === "number"
                    ? result.value.toFixed(2)
                    : result.value}
                </span>
              </span>
              <button
                onClick={() => handleCopy(result, index)}
                className={`p-2 rounded-md text-white transition ${
                  copyState[index]
                    ? "bg-gray-400 dark:bg-gray-500"
                    : "bg-green-500 hover:bg-green-600 dark:bg-green-700 dark:hover:bg-green-600"
                }`}
                disabled={copyState[index]}
              >
                {copyState[index] ? "Copied" : "Copy"}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UnitConverter;
