// eslint-disable-next-line
import React, { useState, useEffect } from 'react';
// eslint-disable-next-line
import { useSelector, useDispatch } from 'react-redux';
// eslint-disable-next-line
import Redux from '../redux';

function Clock() {

  const dispatch = useDispatch();
  //const { systemTime } = useSelector(state => state.clock);
  const { clientTime } = useSelector(state => state.clock);
  
  useEffect(() => {
    const timer = setTimeout(function () {
      const timeDiff = (new Date()).getTime() - clientTime;
      dispatch(Redux.actions.clock.fix_systemTime(timeDiff));
    }, 1000 * 30);
    return () => clearTimeout(timer);
  });

  return null;

  
  // return (
  //   <div className="d-none">
  //     {systemTime}
  //   </div>
  // );
}

export default Clock;