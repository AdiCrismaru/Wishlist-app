import React from "react";
import Nav from "../components/Nav";
import Wishlist from "../components/Wishlist";
import { useState } from "react";
import { nanoid } from "nanoid";
export default function WishlistPage() {
  const [notes, setNotes] = useState([
    {
      id: nanoid(),
      text: "This is my first note.",
      date: "18/08/2022",
    },
    {
      id: nanoid(),
      text: "This is my second note.",
      date: "19/08/2022",
    },
    {
      id: nanoid(),
      text: "This is my third note.",
      date: "20/08/2022",
    },
    {
      id: nanoid(),
      text: "This is my fourth note.",
      date: "21/08/2022",
    },
  ]);

  const addNote = (text) => {
    const date = new Date();
    const newNote = {
      id: nanoid,
      text: text,
      date: date.toLocaleDateString(),
    };
    const newNotes = [...notes, newNote];
    setNotes(newNotes);
  };

  const deleteNote = (id) => {
    const newNotes = notes.filter((note) => note.id !== id);
    setNotes(newNotes);
  };
  return (
    <div>
      <Nav />
      <div className="wishlist-container">
        <Wishlist
          notes={notes}
          handleAddNote={addNote}
          handleDeleteNote={deleteNote}
        />
      </div>
    </div>
  );
}
