import React, { useContext, useEffect } from 'react';
import AddStuffButton from './AddStuffButton';
import AddRemindMe, { addRemindMeModalId } from './AddRemindMe';
import RemindMeItem from './RemindMeItem';
import remindMeContext from '../context/remindmes/remindMeContext';
import UpdateRemindMe, { updateBtnId, updateRemindMe } from './UpdateRemindMe';

function Remindmes() {
  const { remindMes, getRemindMes, deleteRemindMe } =
    useContext(remindMeContext);

  useEffect(() => {
    if (localStorage.getItem('token')) {
      getRemindMes();
      // console.log(remindMes);
    }

    // eslint-disable-next-line
  }, []);
  return (
    <div>
      <AddRemindMe></AddRemindMe>
      <UpdateRemindMe></UpdateRemindMe>
      <AddStuffButton id={addRemindMeModalId}></AddStuffButton>
      <div className="container">
        {remindMes.length === 0 ? (
          <h3>No Reminders to display.</h3>
        ) : (
          <h2>Your Reminders</h2>
        )}

        <div className="row">
          {[...remindMes].reverse().map(remindMe => {
            return (
              <RemindMeItem
                remindMe={remindMe}
                key={remindMe._id}
                updateBtnId={updateBtnId}
                updateRemindMe={updateRemindMe}
                deleteRemindMe={deleteRemindMe}
              ></RemindMeItem>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Remindmes;
