import React, { useContext, useRef, useState } from 'react';
import noteContext from '../context/notes/noteContext';
import globalContext from '../context/global/globalContext';

const addNoteModalId = 'addNoteButton';

function AddNote() {
  const context = useContext(noteContext);
  const { addNote } = context;
  const gcontext = useContext(globalContext);
  const { showAlert } = gcontext;
  const refClose = useRef(null);
  const [note, setNote] = useState({
    title: '',
    description: '',
    tag: '',
  });
  const handleclick = () => {
    addNote(note.title, note.description, note.tag);
    showAlert('Note added succesfully', 'success');
    setNote({ title: '', description: '', tag: '' });
    refClose.current.click();
  };

  const onChange = e => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };
  return (
    <div className="container my-3">
      <div
        className="modal fade"
        id={addNoteModalId}
        tabIndex="-1"
        aria-labelledby="addNoteModalLabel"
        aria-hidden="true"
        style={{ alignContent: 'center' }}
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="addNoteModalLabel">
                Add Note
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="mb-3">
                <label htmlFor="title" className="form-label">
                  Title
                </label>
                <input
                  placeholder="Title..."
                  type="text"
                  className="form-control"
                  id="title"
                  name="title"
                  aria-describedby="emailHelp"
                  onChange={onChange}
                  value={note.title}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="description" className="form-label">
                  Description
                </label>
                <textarea
                  placeholder="Description..."
                  rows="4"
                  type="text"
                  className="form-control"
                  id="description"
                  name="description"
                  onChange={e => {
                    if (
                      e.target.value.length <= 5000 ||
                      e.target.value.length < note.description.length
                    ) {
                      onChange(e);
                    } else {
                      showAlert(
                        'Description can not be more than 1000 characters',
                        'danger'
                      );
                    }
                  }}
                  value={note.description}
                />
                <small className="text-body-secondary">
                  {note.description.length}/5000
                </small>
              </div>
              <div className="mb-3">
                <label htmlFor="tag" className="form-label">
                  Tag
                </label>
                <input
                  placeholder="Tag..."
                  type="text"
                  className="form-control"
                  id="tag"
                  name="tag"
                  onChange={onChange}
                  value={note.tag}
                />
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                ref={refClose}
                onClick={() => {
                  setNote({ title: '', description: '', tag: '' });
                }}
              >
                Close
              </button>
              <button
                type="button"
                onClick={handleclick}
                disabled={
                  note.title.length < 1 ||
                  note.description.length < 1 ||
                  note.tag.length < 1
                }
                className="btn btn-primary"
              >
                Add Note
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddNote;
export { addNoteModalId };
