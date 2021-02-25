import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Redux from "../../redux";
import Confs from "../../confs";

function EditError(props) {
  const { erstr } = props;

  useEffect(() => {
    window.resizeFrameHeight();
  });

  if (!erstr) return null;

  return (
    <div className="errorList">
      <div className="errorItem">{erstr}</div>
    </div>
  );
}

export default EditError;