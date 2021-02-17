import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Redux from "../../redux";
import Confs from '../../confs';
import Clock from "../common/Clock";

import Mainer from "./Mainer";

function Rooter() {

  const dispatch = useDispatch();
  const { params, status, pageKey} = useSelector(state => state.marking);

  useEffect(() => {
    window.resizeFrameHeight();
  });

  useEffect(() => {
    if (params === false) {
      const params = window.get_url_params();
      if(!params.pageKey){
        // we can't go next if without payKey
        dispatch(Redux.actions.marking.set_params(null));
        return;
      }
      dispatch(Redux.actions.marking.set_pageKey(params.pageKey));
      dispatch(Redux.actions.marking.set_params(params));
    }
  });
  
  useEffect(() => {
    if (params) {
      if (status === 'initial') {
        firstLoad();
      }
    }
  });

  const firstLoad = () => {
    const date = {
      pageKey
    };
    dispatch(Redux.thunks.marking.myMark(date));
  };

  switch (status) {
    case 'initial':
    case 'pending':
      // loading icon
      return (
        <div className="d-flex justify-content-center align-items-center">
          <i className="fas fa-2x fa-circle-notch fa-spin"></i>
        </div>
      );

    case 'failure':
      // refresh icon
      return (
        <div className="d-flex justify-content-center align-items-center cursor-pointer" onClick={firstLoad}>
          <i className="fas fa-2x fa-sync-alt"></i>
        </div>
      );

    case 'success':
    default:
      // nothing to do
      break;
  }

  return (
    <>
      <Mainer />
      <Clock />
    </>
  );
}

export default Rooter;
