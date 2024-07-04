import React, { useContext, useRef, useState } from 'react';
import globalContext from '../context/global/globalContext';
import noteContext from '../context/notes/noteContext';

let updateBtnId = 'updateNoteModal';

let updateNote;
function UpdateNote() {
  const gcontext = useContext(globalContext);
  const { showAlert } = gcontext;

  const context = useContext(noteContext);
  const { editNote } = context;

  const refClose = useRef(null);
  // Note
  const [note, setNote] = useState({
    id: '',
    etitle: '',
    edescription: '',
    etag: '',
  });

  // Update note function
  updateNote = currentNote => {
    // ref.current.click();
    setNote({
      id: currentNote._id,
      etitle: currentNote.title,
      edescription: currentNote.description,
      etag: currentNote.tag,
    });
  };

  // Handle click function
  const handleclick = e => {
    editNote(note.id, note.etitle, note.edescription, note.etag);
    showAlert('Updated Succesfully', 'success');
    refClose.current.click();
  };

  // Onchange function
  const onChange = e => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <div
        className="modal fade"
        id={updateBtnId}
        tabIndex="-1"
        aria-labelledby="updateNoteModalLabel"
        aria-hidden="true"
        style={{ alignContent: 'center' }}
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="updateNoteModalLabel">
                Edit Note
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form className="my-3">
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">
                    Title
                  </label>
                  <input
                    placeholder="Title..."
                    type="text"
                    className="form-control"
                    id="etitle"
                    name="etitle"
                    value={note.etitle}
                    aria-describedby="emailHelp"
                    onChange={onChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">
                    Description
                  </label>
                  <textarea
                    placeholder="Description..."
                    type="text"
                    rows="4"
                    className="form-control"
                    id="edescription"
                    name="edescription"
                    value={note.edescription}
                    onChange={e => {
                      if (
                        e.target.value.length <= 5000 ||
                        e.target.value.length < note.edescription.length
                      ) {
                        onChange(e);
                      } else {
                        showAlert(
                          'Description can not be more than 1000 characters',
                          'danger'
                        );
                      }
                    }}
                  />
                  <small className="text-body-secondary">
                    {note.edescription.length}/5000
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
                    id="etag"
                    name="etag"
                    value={note.etag}
                    onChange={onChange}
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                ref={refClose}
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleclick}
                disabled={
                  note.etitle.length < 1 ||
                  note.edescription.length < 1 ||
                  note.etag.length < 1
                }
              >
                Update Note
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UpdateNote;
export { updateNote, updateBtnId };
