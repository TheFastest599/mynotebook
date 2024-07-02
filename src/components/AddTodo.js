import React, { useContext, useRef, useState } from 'react';
import todoContext from '../context/todos/todoContext';
import globalContext from '../context/global/globalContext';

const addTodoModalId = 'addTodoButton';

function AddTodo() {
  const context = useContext(todoContext);
  const { addTodo } = context;
  const gcontext = useContext(globalContext);
  const { showAlert } = gcontext;
  const refClose = useRef(null);
  const [todo, setTodo] = useState({
    todo: '',
  });
  const handleclick = () => {
    addTodo(todo.todo);
    showAlert('Todo added succesfully', 'success');
    setTodo({ todo: '' });
    refClose.current.click();
  };

  const onChange = e => {
    setTodo({ ...todo, [e.target.name]: e.target.value });
  };
  return (
    <div className="container my-3">
      <div
        className="modal fade"
        id={addTodoModalId}
        tabIndex="-1"
        aria-labelledby="addTodoModalLabel"
        aria-hidden="true"
        style={{ alignContent: 'center' }}
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="addTodoModalLabel">
                Add Todo
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
                <label htmlFor="todo" className="form-label">
                  Todo
                </label>
                <textarea
                  placeholder="Todo..."
                  type="text"
                  rows="2"
                  className="form-control"
                  id="todo"
                  name="todo"
                  aria-describedby="emailHelp"
                  onChange={e => {
                    if (
                      e.target.value.length <= 200 ||
                      e.target.value.length < todo.todo.length
                    ) {
                      onChange(e);
                    } else {
                      showAlert(
                        'Todo can not be more than 200 characters',
                        'danger'
                      );
                    }
                  }}
                  value={todo.todo}
                />
                <small className="text-body-secondary">
                  {todo.todo.length}/200
                </small>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                ref={refClose}
                onClick={() => setTodo({ todo: '' })}
              >
                Close
              </button>
              <button
                type="button"
                onClick={handleclick}
                disabled={todo.todo.length < 1}
                className="btn btn-primary"
              >
                Add Todo
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddTodo;
export { addTodoModalId };
