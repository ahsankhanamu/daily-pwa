import React, { useState, useEffect } from "react";
import { createFile, getFile } from "../helpers/googleDrive";

const ZakatLedger = ({ user }) => {
  const [entries, setEntries] = useState([]);
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [totalZakat, setTotalZakat] = useState(0);

  useEffect(() => {
    const loadEntries = async () => {
      const savedEntries = await getFile("zakatLedger.json", user.token);
      if (savedEntries) {
        setEntries(JSON.parse(savedEntries));
        calculateZakat(JSON.parse(savedEntries));
      } else {
        const localEntries =
          JSON.parse(localStorage.getItem("zakatLedger")) || [];
        setEntries(localEntries);
        calculateZakat(localEntries);
      }
    };
    loadEntries();
  }, [user.token]);

  const calculateZakat = (ledgerEntries) => {
    const zakat = ledgerEntries.reduce(
      (sum, entry) => sum + entry.amount * 0.025,
      0
    ); // 2.5% Zakat
    setTotalZakat(zakat);
  };

  const addEntry = async () => {
    if (!name.trim() || !amount) return;
    const newEntry = { name: name.trim(), amount: parseFloat(amount) };
    const newEntries = [...entries, newEntry];
    setEntries(newEntries);
    setName("");
    setAmount("");

    localStorage.setItem("zakatLedger", JSON.stringify(newEntries));

    await createFile(
      "zakatLedger.json",
      JSON.stringify(newEntries),
      user.token
    );

    calculateZakat(newEntries);
  };

  return (
    <div className="flex flex-col">
      <div className="flex flex-col sm:flex-row sm:items-center mb-4">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full sm:w-1/2 p-2 border rounded-md dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 mr-2 mb-2 sm:mb-0"
          placeholder="Name"
        />
        <input
          value={amount}
          type="number"
          onChange={(e) => setAmount(e.target.value)}
          className="w-full sm:w-1/2 p-2 border rounded-md dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Amount Lent"
        />
      </div>
      <button
        onClick={addEntry}
        className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition mb-4"
      >
        Add Entry
      </button>
      <div>
        {entries.length === 0 ? (
          <p>No entries available.</p>
        ) : (
          <ul>
            {entries.map((entry, index) => (
              <li
                key={index}
                className="p-2 mb-2 bg-gray-200 dark:bg-gray-700 rounded-md flex justify-between items-center"
              >
                <span>{entry.name}</span>
                <span>{entry.amount.toFixed(2)}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="mt-4 text-xl font-semibold">
        Total Zakat: {totalZakat.toFixed(2)}
      </div>
    </div>
  );
};

export default ZakatLedger;
