import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Redux from "../../redux";
import Confs from '../../confs';
import Clock from "../common/Clock";

import Mainer from "./Mainer";

function Rooter() {

  const dispatch = useDispatch();
  const { inited, pageKey } = useSelector(state => state.marking);

  useEffect(() => {
    if (pageKey === false) {
      const pars = window.get_url_params();
      const pval = pars.pageKey || '';
      dispatch(Redux.actions.marking.set_pageKey(pval));
    }
  });

  useEffect(() => {
    if (pageKey) {
      if (inited === 'initial') {
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

  switch (inited) {
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
          <i className="fas fa-3x fa-sync-alt"></i>
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
