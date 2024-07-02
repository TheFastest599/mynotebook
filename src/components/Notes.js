import React, { useContext, useEffect } from 'react';
import noteContext from '../context/notes/noteContext';
import Noteitem from './Noteitem';
import AddNote, { addNoteModalId } from './AddNote';
import AddStuffButton from './AddStuffButton';
import UpdateNote, { updateNote, updateBtnId } from './UpdateNote';

function Notes() {
  const context = useContext(noteContext);
  const { notes, getNotes } = context;
  useEffect(() => {
    if (localStorage.getItem('token')) {
      getNotes();
    }

    // eslint-disable-next-line
  }, []);

  return (
    <>
      <AddNote></AddNote>
      <UpdateNote></UpdateNote>
      <AddStuffButton id={addNoteModalId}></AddStuffButton>
      <div className="container my-3">
        {notes.length === 0 ? (
          <h3>No notes to display.</h3>
        ) : (
          <h2>Your notes</h2>
        )}

        <div className="row">
          {[...notes].reverse().map(note => {
            return (
              <Noteitem
                note={note}
                key={note._id}
                updateNote={updateNote}
                updateBtnId={updateBtnId}
              ></Noteitem>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default Notes;
