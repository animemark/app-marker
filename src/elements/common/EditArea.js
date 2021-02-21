import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Redux from "../../redux";
import Confs from "../../confs";

function EditArea(props) {
  const { domId, innerText, onChange, css = '' } = props;

  useEffect(() => {
    console.log('EditArea useEffect:', domId);
    document.getElementById(domId).innerText = innerText;
  }, []);

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