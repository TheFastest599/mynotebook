import React, { useContext, useState } from 'react';
import NoteContext from './noteContext';
import globalContext from '../global/globalContext';

const NoteState = props => {
  const host = process.env.REACT_APP_MYNOTEBOOK_HOST;
  const [notes, setNotes] = useState([]);
  const gcontext = useContext(globalContext);
  const { setSpinner } = gcontext;
  // Add a node

  // Get all notes
  const getNotes = async () => {
    // TODO : API Call
    setSpinner(true);
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token'),
      },
    });
    setSpinner(false);

    const json = await response.json();
    setNotes(json);
  };

  // Add a Node
  const addNote = async (title, description, tag) => {
    // TODO : API Call
    setSpinner(true);
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token'),
      },
      body: JSON.stringify({ title, description, tag }),
    });
    setSpinner(false);

    const json = await response.json();
    setNotes(notes.concat(json.saveNote));
  };

  // Delete a node
  const deleteNote = async id => {
    // TODO: API Call
    setSpinner(true);
    await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token'),
      },
    });
    setSpinner(false);

    // const json = await response.json();
    const newNotes = notes.filter(note => {
      return note._id !== id;
    });
    setNotes(newNotes);
  };

  // Edit a node
  const editNote = async (id, title, description, tag) => {
    // TODO : API Call
    setSpinner(true);
    await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token'),
      },
      body: JSON.stringify({ title, description, tag }),
    });
    setSpinner(false);

    let newNotes = JSON.parse(JSON.stringify(notes));
    // Logic to edit in clint
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }
    }
    setNotes(newNotes);
  };

  return (
    <NoteContext.Provider
      value={{ notes, addNote, deleteNote, editNote, getNotes }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
