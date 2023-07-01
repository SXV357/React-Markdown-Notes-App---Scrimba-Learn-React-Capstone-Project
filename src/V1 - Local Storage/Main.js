import React, {useState, useEffect} from "react";
import Sidebar from "./Components/Sidebar";
import Editor from "./Components/Editor";
import Split from "react-split";
import { nanoid } from "nanoid";
import "./style.css";

export default function Main() {
  // Attempt to get notes from local storage using lazy state initialization and if it doesn't exist, set it to an empty array
  const [notes, setNotes] = useState(() => {
    const storedNotes = JSON.parse(localStorage.getItem("notes"));
    return storedNotes !== null ? storedNotes : [];
  });

  // The note the user is currently editing
  const [currentNoteId, setCurrentNoteId] = useState("");

  useEffect(() => {
    !currentNoteId && setCurrentNoteId(notes[0]?.id);
  }, [notes, currentNoteId])

  const currentNote = notes.find((note) => note.id === currentNoteId) || notes[0];

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  // This is what the user is presented with whenever they create a new note
   function createNewNote() {
    const newNote = {
      body: "# Type your markdown note's title here",
      id: nanoid()
    };
    setNotes((prevNotes) => [newNote, ...prevNotes]);
    setCurrentNoteId(newNote.id);
  }

  function updateNote(text) {
    // this function pushes notes in which new changes have been made to the top of the notes list in the sidebae
    setNotes((oldNotes) => {
      const newArr = [];
      oldNotes.forEach((note) => {
        note.id === currentNoteId
          ? newArr.unshift({ ...note, body: text }) // the one the user has made changes to(it gets pushed up)
          : newArr.push(note);
      });
      return newArr;
    });
  }

  function deleteNote(event, noteId) {
    // this function deletes notes from the sidebar
    event.stopPropagation();
    setNotes((oldNotes) => {
      const newArr = [];
      oldNotes.forEach((note) => {
        if (note.id !== noteId) {
          newArr.push(note); // noteId represents the id of the note the user is trying to delete
        }
      });
      return newArr;
    });
  }

  return (
    <main>
      {notes.length > 0 ? (
        <Split sizes={[30, 70]} direction="horizontal" className="split">
          <Sidebar
            notes={notes}
            currentNote={currentNote}
            setCurrentNoteId={setCurrentNoteId}
            newNote={createNewNote}
            del={deleteNote}
          />
          <Editor currentNote = {currentNote} updateNote = {updateNote} />
        </Split>
      ) : (
        <div className="no-notes">
          <h1 className="no-note-title">You have no notes</h1>
          <button className="first-note" onClick={createNewNote}>
            Create one now
          </button>
        </div>
      )}
    </main>
  );
}