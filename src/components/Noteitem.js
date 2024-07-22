import React, { useContext, useState } from 'react';
import noteContext from '../context/notes/noteContext';
import globalContext from '../context/global/globalContext';

function Noteitem(props) {
  const gcontext = useContext(globalContext);
  const { showAlert } = gcontext;
  const context = useContext(noteContext);
  const { deleteNote } = context;
  const { note, updateNote, updateBtnId } = props;
  const [open, setOpen] = useState(false);
  const toggleModal = () => setOpen(!open);
  // let handleDesc = function () {
  //   if (note.description.length > 200) {
  //     return note.description.slice(0, 200) + '...';
  //   } else {
  //     return note.description;
  //   }
  // };

  return (
    <div className={`col-md-6 col-lg-4 my-2`}>
      <div
        className={`modal fade ${open ? 'show' : ''}`}
        style={{ display: open ? 'block' : 'none', alignContent: 'center' }}
        tabIndex="-1"
        id={note._id + 'modal'}
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">{note.title}</h5>
              <button
                type="button"
                className="btn-close"
                onClick={toggleModal}
              ></button>
            </div>
            <div className="modal-body">
              <textarea
                rows="5"
                type="text"
                className="form-control"
                id="description"
                name="description"
                readOnly
                value={note.description}
              />
              <p className="card-text">
                <small>#{note.tag}</small>
              </p>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={toggleModal}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Optional: Add a backdrop when the modal is open */}
      {open && <div className="modal-backdrop fade show"></div>}
      <div className="glassBox card">
        <div className="card-body ">
          <h5 className="card-title"> {note.title}</h5>
          <p
            className="card-text"
            style={{
              whiteSpace: 'pre-wrap',
              height: '100px',
              overflowY: 'hidden',
            }}
            id={note._id + 'desc'}
            onClick={e => {
              setOpen(true);
            }}
          >
            {note.description}
          </p>

          <div className="d-flex justify-content-between">
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="16"
                width="14"
                viewBox="0 0 448 512"
                type="button"
                className="mx-2"
                onClick={() => {
                  deleteNote(note._id);
                  showAlert('Deleted Successfully', 'success');
                }}
                style={{ fill: 'white' }}
              >
                <path d="M135.2 17.7C140.6 6.8 151.7 0 163.8 0H284.2c12.1 0 23.2 6.8 28.6 17.7L320 32h96c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 96 0 81.7 0 64S14.3 32 32 32h96l7.2-14.3zM32 128H416V448c0 35.3-28.7 64-64 64H96c-35.3 0-64-28.7-64-64V128zm96 64c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16z" />
              </svg>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="16"
                width="16"
                viewBox="0 0 512 512"
                type="button"
                className="mx-2"
                data-bs-toggle="modal"
                data-bs-target={`#${updateBtnId}`}
                onClick={() => {
                  updateNote(note);
                }}
                style={{ fill: 'white' }}
              >
                <path d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z" />
              </svg>
            </div>
            <p className="card-text">
              <small>#{note.tag}</small>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Noteitem;
