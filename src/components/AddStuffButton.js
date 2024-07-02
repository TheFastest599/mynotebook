import React from 'react';

function AddStuffButton(props) {
  return (
    <div>
      <button
        className="btn "
        data-bs-toggle="modal"
        data-bs-target={`#${props.id}`}
        id="addstuffbutton"
      >
        <i className="fa-solid fa-plus fa-xl" style={{ color: '#ffffff' }}></i>
      </button>
    </div>
  );
}

export default AddStuffButton;
