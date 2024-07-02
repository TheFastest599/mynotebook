import React, { useContext, useState } from 'react';
import RemindMeContext from './remindMeContext';
import globalContext from '../global/globalContext';

const RemindMeState = props => {
  const host = process.env.REACT_APP_MYNOTEBOOK_HOST;
  const [remindMes, setRemindMes] = useState([]);
  const gcontext = useContext(globalContext);
  const { setSpinner } = gcontext;
  // Add a remindme

  // Get all remindmes
  const getRemindMes = async () => {
    // TODO : API Call
    setSpinner(true);
    const response = await fetch(`${host}/api/reminders/fetchallreminders`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token'),
      },
    });
    setSpinner(false);

    const json = await response.json();
    setRemindMes(json);
  };

  // Add a remindme
  const addRemindMe = async (
    title,
    reminder,
    dateTimeUtcUnix,
    dateTimeLocalString
  ) => {
    // TODO : API Call
    setSpinner(true);
    const response = await fetch(`${host}/api/reminders/addreminder`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token'),
      },
      body: JSON.stringify({
        title,
        reminder,
        dateTimeLocalString,
        dateTimeUtcUnix,
        status: 'pending',
      }),
    });
    setSpinner(false);

    const json = await response.json();
    setRemindMes(remindMes.concat(json.saveReminder));
  };

  // Delete a remindMe
  const deleteRemindMe = async id => {
    // TODO: API Call
    setSpinner(true);
    await fetch(`${host}/api/reminders/deletereminder/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token'),
      },
    });
    setSpinner(false);

    // const json = await response.json();
    const newRemindMes = remindMes.filter(remindMe => {
      return remindMe._id !== id;
    });
    setRemindMes(newRemindMes);
  };

  // Edit a remindMe
  const editRemindMe = async (
    id,
    title,
    reminder,
    dateTimeUtcUnix,
    dateTimeLocalString
  ) => {
    // TODO : API Call
    setSpinner(true);
    await fetch(`${host}/api/reminders/updatereminder/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token'),
      },
      body: JSON.stringify({
        title,
        reminder,
        dateTimeUtcUnix,
        dateTimeLocalString,
      }),
    });
    setSpinner(false);

    let newRemindMes = JSON.parse(JSON.stringify(remindMes));
    // Logic to edit in clint
    for (let index = 0; index < newRemindMes.length; index++) {
      const element = newRemindMes[index];
      if (element._id === id) {
        newRemindMes[index].title = title;
        newRemindMes[index].reminder = reminder;
        newRemindMes[index].dateTimeUtcUnix = dateTimeUtcUnix;
        newRemindMes[index].dateTimeLocalString = dateTimeLocalString;
        break;
      }
    }
    setRemindMes(newRemindMes);
  };

  return (
    <RemindMeContext.Provider
      value={{
        remindMes,
        getRemindMes,
        addRemindMe,
        deleteRemindMe,
        editRemindMe,
      }}
    >
      {props.children}
    </RemindMeContext.Provider>
  );
};

export default RemindMeState;
