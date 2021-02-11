import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Redux from '../redux';

function EditArea(props) {
  const { domId, onChange } = props;
  const handleKeyEvent = (event) => {
    const innerText = event?.target?.innerText ? String(event.target.innerText).trim() : '';
    onChange(innerText);
  };

  return (
    <div
      id={domId}
      className="EditArea"
      contentEditable="plaintext-only"
      suppressContentEditableWarning

      onInput={handleKeyEvent}
      onBlur={handleKeyEvent}
      onKeyUp={handleKeyEvent}
      onKeyDown={handleKeyEvent}
    ></div>
  );
}

export default EditArea;