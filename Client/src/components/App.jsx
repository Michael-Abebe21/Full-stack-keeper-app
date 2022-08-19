import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
import { useState, useEffect } from 'react';

const API_BASE = "http://localhost:3001";


function App() {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    GetNote()
 }, [])

 const GetNote = () => {
  fetch(API_BASE + "/note").then(res => res.json()).then(data => setNotes(data)).catch(err => console.log("Error: ", err));
 }


const deleteNote = async id => {
  const data = await fetch(API_BASE + "/note/delete/" + id, {method: "DELETE"}).then(res => res.json());

  setNotes(notes => notes.filter(note => note._id !== data._id));
}

const addNote = async newNote => {
  const data = await fetch(API_BASE + "/note/new", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    }, 
    body: JSON.stringify({
      title: newNote.title,
      content: newNote.content
    })
  }).then(res => res.json())

  setNotes([...notes, data]);
}

  return (
    <div>
      <Header />
      <CreateArea onAdd={addNote} />
      {notes.map((note) => {
        return (
          <Note
            key={note._id}
            id={note._id}
            title={note.title}
            content={note.content}
            onDelete={deleteNote}
          />
        );
      })}
      <Footer />
    </div>
  );
}

export default App;
