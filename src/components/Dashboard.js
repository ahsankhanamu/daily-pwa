import React, { useState } from "react";
import Calculator from "./Calculator";
import UnitConverter from "./UnitConverter";
import NotesApp from "./NotesApp";
import ZakatLedger from "./ZakatLedger";
import AuthWrapper from "./AuthWrapper";
import Settings from "./Settings";

const Dashboard = ({ user, setUser, favoriteUnits, setFavoriteUnits }) => {
  const [copyFormat, setCopyFormat] = useState("valueOnly");

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="tile bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-lightText">
          Calculator
        </h2>
        <Calculator />
      </div>

      <div className="tile bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-lightText">
          Unit Converter
        </h2>
        <UnitConverter favoriteUnits={favoriteUnits} />
      </div>

      <div className="tile bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-lightText">
          Notes
        </h2>
        <AuthWrapper user={user} setUser={setUser}>
          <NotesApp user={user} />
        </AuthWrapper>
      </div>

      <div className="tile bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-lightText">
          Zakat Ledger
        </h2>
        <AuthWrapper user={user} setUser={setUser}>
          <ZakatLedger user={user} />
        </AuthWrapper>
      </div>

      <div className="tile bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 md:col-span-2">
        <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-lightText">
          Settings
        </h2>
        <Settings
          favoriteUnits={favoriteUnits}
          setFavoriteUnits={setFavoriteUnits}
          copyFormat={copyFormat}
          setCopyFormat={setCopyFormat}
        />
      </div>
    </div>
  );
};

export default Dashboard;
