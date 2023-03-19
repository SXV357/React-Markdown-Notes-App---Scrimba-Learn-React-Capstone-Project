import React, {useEffect} from "react";
import Sidebar from "./Components/Sidebar";
import Editor from "./Components/Editor";
import Split from "react-split";
import { nanoid } from "nanoid";
import "./style.css";

export default function App() {
  // Attempt to get notes from local storage and if it doesn't exist, set it to an empty array
  const [notes, setNotes] = React.useState(() => {
    const storedNotes = JSON.parse(localStorage.getItem("notes"));
    return storedNotes !== null ? storedNotes : [];
  });

  // So that the user isn't directed to the editing screen at the beginning itself and has to create a new note.
  useEffect(() => {
    setNotes([])
  }, [])

  // The note the user is currently editing
  const [currentNoteId, setCurrentNoteId] = React.useState(
    (notes[0] && notes[0].id) || ""
  );

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]); // if notes array changes, save it to local storage and convert it to string

  // This is what the user is presented with whenever they create a new note
  function createNewNote() {
    const newNote = {
      id: nanoid(), // generating a new ID for the note since each of them has a unique one
      body: "# Type your markdown note's title here",
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
          newArr.push(note); // @param: noteId represents the id of the note the user is trying to delete
        }
      });
      return newArr;
    });
  }

  // We already have a function that shifts notes to the top of the array each time they're edited
  function findCurrentNote() {
    return (
      notes.find((note) => {
        return note.id === currentNoteId;
      }) || notes[0]
    );
  }

  console.log(notes.length);

  return (
    <main>
      {notes.length > 0 ? (
        <Split sizes={[30, 70]} direction="horizontal" className="split">
          <Sidebar
            notes={notes}
            currentNote={findCurrentNote()}
            setCurrentNoteId={setCurrentNoteId}
            newNote={createNewNote}
            del={deleteNote}
          />
          {currentNoteId && notes.length > 0 && (
            <Editor currentNote={findCurrentNote()} updateNote={updateNote} />
          )}
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
