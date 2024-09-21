// src/components/Settings.js
import React, { useState } from "react";
import convert from "convert-units";
import SelectWrapper from "./SelectWrapper"; // Import the SelectWrapper

const Settings = ({
  favoriteUnits,
  setFavoriteUnits,
  copyFormat,
  setCopyFormat,
}) => {
  const [unitType, setUnitType] = useState("length");
  let availableUnits = convert().possibilities(unitType);

  // Add a custom option for 'ft and in'
  if (unitType === "length") {
    availableUnits.push("ft & in");
  }

  const handleUnitSelection = (index, unit) => {
    const newFavorites = {
      ...favoriteUnits,
      [unitType]: [...favoriteUnits[unitType]],
    };
    newFavorites[unitType][index] = unit;
    setFavoriteUnits(newFavorites);
  };

  return (
    <div className="p-4">
      <h3 className="text-2xl mb-4 text-center text-gray-900 dark:text-lightText">
        Select Favorite Units
      </h3>
      <div className="mb-4">
        <label className="mr-2 font-semibold text-gray-900 dark:text-lightText">
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

      <div>
        <h4 className="text-lg mb-2 font-semibold text-gray-900 dark:text-lightText">
          Select 4 favorite units for {unitType}:
        </h4>
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="mb-2">
            <SelectWrapper
              value={favoriteUnits[unitType][i] || availableUnits[0]}
              onChange={(e) => handleUnitSelection(i, e.target.value)}
            >
              {availableUnits.map((unit) => (
                <option key={unit} value={unit}>
                  {unit}
                </option>
              ))}
            </SelectWrapper>
          </div>
        ))}
      </div>

      <div className="mt-6">
        <label className="mr-2 font-semibold text-gray-900 dark:text-lightText">
          Copy Format:
        </label>
        <SelectWrapper
          value={copyFormat}
          onChange={(e) => setCopyFormat(e.target.value)}
        >
          <option value="valueOnly">Copy Value Only</option>
          <option value="valueWithUnit">Copy Value and Unit</option>
        </SelectWrapper>
      </div>
    </div>
  );
};

export default Settings;
