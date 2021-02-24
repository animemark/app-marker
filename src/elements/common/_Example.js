import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Redux from "../../redux";
import Confs from "../../confs";
import Funcs from "../../funcs";

const _confs = window._ssconfs;

function _Example() {

  const dispatch = useDispatch();
  const { userIid } = useSelector(state => state.users);
  const [error, set_error] = useState(null);

  useEffect(() => {
    window.resizeFrameHeight();
  });

  return (
    <div>
      <p>Hello user: {userIid}</p>
    </div>
  );
}

export default _Example;