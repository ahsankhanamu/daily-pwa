import React, { useState, useEffect } from "react";
import { createFile, getFile } from "../helpers/googleDrive";

const NotesApp = ({ user }) => {
  const [notes, setNotes] = useState([]);
  const [note, setNote] = useState("");

  useEffect(() => {
    const loadNotes = async () => {
      const savedNotes = await getFile("notes.json", user.token);
      if (savedNotes) {
        setNotes(JSON.parse(savedNotes));
      } else {
        const localNotes = JSON.parse(localStorage.getItem("notes")) || [];
        setNotes(localNotes);
      }
    };
    loadNotes();
  }, [user.token]);

  const saveNote = async () => {
    if (!note.trim()) return;
    const newNotes = [...notes, note.trim()];
    setNotes(newNotes);
    setNote("");

    localStorage.setItem("notes", JSON.stringify(newNotes));

    await createFile("notes.json", JSON.stringify(newNotes), user.token);
  };

  return (
    <div className="flex flex-col">
      <textarea
        value={note}
        onChange={(e) => setNote(e.target.value)}
        className="w-full p-2 border rounded-md dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Write your note here..."
      />
      <button
        onClick={saveNote}
        className="mt-2 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition"
      >
        Save Note
      </button>
      <div className="mt-4">
        {notes.length === 0 ? (
          <p>No notes available.</p>
        ) : (
          notes.map((note, index) => (
            <div
              key={index}
              className="p-2 mb-2 bg-gray-200 dark:bg-gray-700 rounded-md"
            >
              {note}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default NotesApp;
