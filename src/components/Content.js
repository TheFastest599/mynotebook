import React, { useEffect } from 'react';
import NoteState from '../context/notes/NoteState';
import RemindMeState from '../context/remindmes/remindMeState';
import TodoState from '../context/todos/TodoState';
import Notes from './Notes';
import Remindmes from './Remindmes';
import Todos from './Todos';
import { useNavigate } from 'react-router-dom';

function Content() {
  document.title = 'My Notebook | Content';
  let navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem('token')) {
    } else {
      navigate('/login');
    }

    // eslint-disable-next-line
  }, []);
  return (
    <div>
      <ul className="nav nav-tabs my-3 " id="myTab" role="tablist">
        <li className="nav-item" role="presentation">
          <button
            className="nav-link active"
            id="notes-tab"
            data-bs-toggle="tab"
            data-bs-target="#notes-tab-pane"
            type="button"
            role="tab"
            onClick={() => {
              document.title = 'My Notebook | Notes';
            }}
            aria-controls="home-tab-pane"
            aria-selected="true"
          >
            Notes
          </button>
        </li>
        <li className="nav-item" role="presentation">
          <button
            className="nav-link"
            id="todos-tab"
            data-bs-toggle="tab"
            data-bs-target="#todos-tab-pane"
            type="button"
            role="tab"
            onClick={() => {
              document.title = 'My Notebook | Todos';
            }}
            aria-controls="profile-tab-pane"
            aria-selected="false"
          >
            Todos
          </button>
        </li>
        <li className="nav-item" role="presentation">
          <button
            className="nav-link"
            id="reminder-tab"
            data-bs-toggle="tab"
            data-bs-target="#reminder-tab-pane"
            type="button"
            role="tab"
            onClick={() => {
              document.title = 'My Notebook | Reminders';
            }}
            aria-controls="contact-tab-pane"
            aria-selected="false"
          >
            Reminder
          </button>
        </li>
      </ul>
      <div
        className="tab-content "
        id="myTabContent"
        style={{ marginBottom: '100px' }}
      >
        <div
          className="tab-pane fade show active"
          id="notes-tab-pane"
          role="tabpanel"
          aria-labelledby="home-tab"
          tabIndex="0"
        >
          <NoteState>
            <Notes></Notes>
          </NoteState>
        </div>
        <div
          className="tab-pane fade"
          id="todos-tab-pane"
          role="tabpanel"
          aria-labelledby="profile-tab"
          tabIndex="0"
        >
          <TodoState>
            <Todos></Todos>
          </TodoState>
        </div>
        <div
          className="tab-pane fade"
          id="reminder-tab-pane"
          role="tabpanel"
          aria-labelledby="contact-tab"
          tabIndex="0"
        >
          <RemindMeState>
            <Remindmes></Remindmes>
          </RemindMeState>
        </div>
      </div>
    </div>
  );
}

export default Content;
