import React, { useContext, useState } from 'react';
import TodoContext from './todoContext';
import globalContext from '../global/globalContext';

const TodoState = props => {
  const host = process.env.REACT_APP_MYNOTEBOOK_HOST;
  const [todos, setTodos] = useState([]);
  const gcontext = useContext(globalContext);
  const { setSpinner } = gcontext;

  // Add a node

  // Get all todos
  const getTodos = async () => {
    // TODO : API Call
    setSpinner(true);
    const response = await fetch(`${host}/api/todos/fetchalltodos`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token'),
      },
    });
    setSpinner(false);

    const json = await response.json();
    setTodos(json);
  };

  // Add a todo
  const addTodo = async todo => {
    // TODO : API Call
    setSpinner(true);
    const response = await fetch(`${host}/api/todos/addtodo`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token'),
      },
      body: JSON.stringify({ todo: todo, status: 'pending' }),
    });
    setSpinner(false);

    const json = await response.json();
    setTodos(todos.concat(json.saveTodo));
  };

  // Delete a node
  const deleteTodo = async id => {
    // TODO: API Call
    setSpinner(true);
    await fetch(`${host}/api/todos/deletetodo/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token'),
      },
    });
    setSpinner(false);

    // const json = await response.json();
    const newTodos = todos.filter(todo => {
      return todo._id !== id;
    });
    setTodos(newTodos);
  };

  // Edit a node
  const editTodo = async (id, todo) => {
    // TODO : API Call
    setSpinner(true);
    await fetch(`${host}/api/todos/updatetodo/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token'),
      },
      body: JSON.stringify({ todo }),
    });
    setSpinner(false);

    let newTodos = JSON.parse(JSON.stringify(todos));
    // Logic to edit in clint
    for (let index = 0; index < newTodos.length; index++) {
      const element = newTodos[index];
      if (element._id === id) {
        newTodos[index].todo = todo;
        break;
      }
    }
    setTodos(newTodos);
  };

  // Status of a todo
  const statusTodo = async (id, status) => {
    // TODO : API Call
    setSpinner(true);
    await fetch(`${host}/api/todos/completetodo/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token'),
      },
      body: JSON.stringify({ status }),
    });
    setSpinner(false);

    let newTodos = JSON.parse(JSON.stringify(todos));
    // Logic to edit in clint
    for (let index = 0; index < newTodos.length; index++) {
      const element = newTodos[index];
      if (element._id === id) {
        newTodos[index].status = status;
        break;
      }
    }
    setTodos(newTodos);
  };

  return (
    <TodoContext.Provider
      value={{ todos, getTodos, addTodo, deleteTodo, editTodo, statusTodo }}
    >
      {props.children}
    </TodoContext.Provider>
  );
};

export default TodoState;
