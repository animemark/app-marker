import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Redux from "../../redux";
import Confs from "../../confs";

function EditArea(props) {
  const { domId, innerText, onChange, css } = props;

  const [inited, set_inited] = useState(0);

  useEffect(() => {
    // set innerText only one time
    if (!inited) {
      document.getElementById(domId).innerText = innerText;
      set_inited(1);
    }
  }, [inited, innerText]);

  const handleKeyEvent = (event) => {
    const innerText = event?.target?.innerText ? String(event.target.innerText).trim() : '';
    onChange(innerText);
  };

  return (
    <div
      id={domId}
      className={`EditArea ${css}`}
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