import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Redux from "../../redux";
import Confs from "../../confs";

function TimeAgo(props) {
  const { time: targetTime, css } = props;
  const { systemTime, clientTime } = useSelector(state => state.clock);
  const str = clac(targetTime, systemTime);
  return (
    <time className={css}>{str}</time>
  );
}

export default TimeAgo;

function clac(targetTime, systemTime) {

  const a = (new Date(targetTime)).getTime() / 1000;
  const b = systemTime / 1000;
  const d = Math.round(b - a);

  if (d < 60) {
    return `Just now`;
    //return `${d} secs ago`;
  }

  // in 1 hour
  if (d < 3600) {
    return `${Math.ceil(d / 60)} mins ago`;
  }

  // in 2 hours
  if (d < 3600 * 2) {
    return `1 hour ago`;
  }

  // in 100 hours
  if (d < 3600 * 100) {
    return `${Math.floor(d / 3600)} hours ago`;
  }

  return `${Math.floor(d / 86400)} days ago`;
}