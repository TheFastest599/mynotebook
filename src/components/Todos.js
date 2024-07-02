import React, { useContext, useEffect } from 'react';
import AddStuffButton from './AddStuffButton';
import TodoItem from './TodoItem';
import todoContext from '../context/todos/todoContext';
import AddTodo, { addTodoModalId } from './AddTodo';
import UpdateTodo, { updateTodoBtn, updateTodo } from './UpdateTodo';

function Todos() {
  const context = useContext(todoContext);
  const { todos, getTodos } = context;

  useEffect(() => {
    if (localStorage.getItem('token')) {
      getTodos();
    }

    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <AddTodo></AddTodo>
      <AddStuffButton id={addTodoModalId}></AddStuffButton>
      <UpdateTodo></UpdateTodo>

      <div className="container">
        {todos.length === 0 ? (
          <h3>No todos to display.</h3>
        ) : (
          <h2>Your todos</h2>
        )}
      </div>
      <div className="container todocontainer my-3">
        {[...todos].reverse().map(todo => {
          return (
            <TodoItem
              todo={todo}
              key={todo._id}
              updateTodoBtn={updateTodoBtn}
              updateTodo={updateTodo}
            ></TodoItem>
          );
        })}
      </div>
    </div>
  );
}

export default Todos;
