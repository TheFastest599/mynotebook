import React, { useContext, useRef, useState } from 'react';
import dayjs from 'dayjs';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDateTimePicker } from '@mui/x-date-pickers/StaticDateTimePicker';
import remindMeContext from '../context/remindmes/remindMeContext';
import globalContext from '../context/global/globalContext';
// dayjs is a lightweight JavaScript date library for parsing, validating, manipulating, and formatting dates.
const utc = require('dayjs/plugin/utc');
// Importing the 'timezone' plugin to handle time zones
const timezone = require('dayjs/plugin/timezone');

// Adding the plugins to Day.js
dayjs.extend(utc);
dayjs.extend(timezone);

let updateBtnId = 'updateRemindMeModal';

let updateRemindMe;

function UpdateRemindMe() {
  // Getting the current date and time in the local time zone
  const currentDateTime = dayjs();

  // setting reminder value
  const [reminder, setReminder] = useState({
    id: '',
    title: '',
    reminder: '',
    dateTimeLocalString: '',
    dateTimeUtcUnix: '',
  });

  const onChange = e => {
    setReminder({ ...reminder, [e.target.name]: e.target.value });
  };

  // check if user choose a different time than current time.
  const [timeChanged, setTimeChanged] = useState(false);

  // For the date time picker value changed
  const [value, setValue] = useState(currentDateTime);

  function isMobileView() {
    // Define a breakpoint value (e.g., 600 pixels)
    const breakpoint = 600;

    // Check if the window width is less than the breakpoint
    return window.innerWidth < breakpoint;
  }

  // For opening and closing the date time picker
  const [open, setOpen] = useState(false);

  const refClose = useRef(null);

  const context = useContext(remindMeContext);
  const { editRemindMe } = context;
  const gcontext = useContext(globalContext);
  const { showAlert } = gcontext;
  const handleclick = () => {
    editRemindMe(
      reminder.id,
      reminder.title,
      reminder.reminder,
      reminder.dateTimeUtcUnix,
      reminder.dateTimeLocalString
    );
    showAlert('Reminder added succesfully', 'success');
    refClose.current.click();
  };

  // Update note function
  updateRemindMe = currentRemindMe => {
    // ref.current.click();
    setReminder({
      id: currentRemindMe._id,
      title: currentRemindMe.title,
      reminder: currentRemindMe.reminder,
      dateTimeUtcUnix: currentRemindMe.dateTimeUtcUnix,
      dateTimeLocalString: currentRemindMe.dateTimeLocalString,
    });
  };

  return (
    <div className="container my-3">
      <div
        className="modal fade"
        id={updateBtnId}
        tabIndex="-1"
        aria-labelledby="updateRemindMeModalLabel"
        aria-hidden="true"
        style={{ alignContent: 'center' }}
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="updateRemindMeModalLabel">
                Update Reminder
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
                  type="text"
                  className="form-control"
                  value={reminder.title}
                  onChange={onChange}
                  id="title"
                  name="title"
                  placeholder="Title..."
                />
              </div>
              <div className="mb-3">
                <label htmlFor="RemindMeTextarea1" className="form-label">
                  Enter your reminder-
                </label>
                <textarea
                  className="form-control"
                  id="RemindMeTextarea1"
                  rows="3"
                  name="reminder"
                  value={reminder.reminder}
                  onChange={e => {
                    if (
                      e.target.value.length <= 700 ||
                      e.target.value.length < reminder.reminder.length
                    ) {
                      onChange(e);
                    } else {
                      showAlert(
                        'Reminder can not be more than 700 characters',
                        'danger'
                      );
                    }
                  }}
                  placeholder="Reminder..."
                ></textarea>
                <small className="text-body-secondary">
                  {reminder.reminder.length}/700
                </small>
              </div>
              {!open && (
                <div className="mb-3">
                  <label
                    htmlFor="exampleFormControlInput1"
                    className="form-label"
                  >
                    Pick Date and time
                  </label>
                  <input
                    type="button"
                    className="form-control text-start"
                    onClick={() => setOpen(true)}
                    id="exampleFormControlInput1"
                    value={value.format('DD-MM-YYYY HH:mm')}
                  />
                </div>
              )}
              {/* Date time input box as button */}

              {open && (
                <LocalizationProvider
                  dateAdapter={AdapterDayjs}
                  disableenforcefocus
                >
                  <DemoContainer components={['StaticDateTimePicker']}>
                    <DemoItem label="Pick Date and time">
                      <StaticDateTimePicker
                        {...(!isMobileView()
                          ? { orientation: 'landscape' }
                          : {})}
                        disablePast
                        value={value}
                        onClose={() => {
                          setOpen(false);
                          // console.log('closed');
                        }}
                        onAccept={() => {
                          setOpen(false);
                          // console.log('accepted');
                          setTimeChanged(true);
                          setReminder({
                            ...reminder,
                            dateTimeLocalString:
                              value.format('DD-MM-YYYY HH:mm'),
                            dateTimeUtcUnix: value.utc().unix(),
                          });
                        }}
                        timezone="system"
                        onChange={newValue => {
                          if (newValue !== value) {
                            setValue(newValue);
                          }
                        }}
                      />
                    </DemoItem>
                  </DemoContainer>
                </LocalizationProvider>
              )}
              {/* Date Time picker */}
              <li id="passInfo">Your reminder will be sent to your email.</li>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                ref={refClose}
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                disabled={
                  reminder.title.length < 1 ||
                  reminder.reminder.length < 1 ||
                  !timeChanged
                }
                onClick={() => {
                  handleclick();
                  // console.log(reminder);
                  // console.log(
                  //   dayjs(
                  //     reminder.dateTimeLocalString,
                  //     'DD-MM-YYYY HH:mm'
                  //   ).format('DD-MM-YYYY HH:mm:ss')
                  // );
                  // console.log(
                  //   dayjs
                  //     .unix(reminder.dateTimeUtcUnix)
                  //     .format('DD-MM-YYYY HH:mm:ss')
                  // );
                }}
              >
                Update Reminder
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UpdateRemindMe;
export { updateBtnId, updateRemindMe };
