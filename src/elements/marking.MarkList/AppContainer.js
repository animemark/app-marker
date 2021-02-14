import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Redux from "../../redux";
import Confs from '../../confs';
import Clock from "../common/Clock";

import Mainer from "./Mainer";

function Rooter() {

  const dispatch = useDispatch();
  const { inited, pageKey, sortBy } = useSelector(state => state.marking);

  useEffect(() => {
    window.resizeFrameHeight();
  });
  
  useEffect(() => {
    if (pageKey === false) {
      const pars = window.get_url_params();
      const pval = pars.pageKey || '';
      dispatch(Redux.actions.marking.set_pageKey(pval));
    }
  });


  useEffect(() => {
    if (sortBy === false) {
      let type = window.localStorage.getItem(Confs.localStorageKeys.marking_sortBy);
      type = Confs.marking.sortTypes[type] ? type : Confs.marking.sortByDefault;
      dispatch(Redux.actions.marking.set_sortBy(type));
    }
  });


  useEffect(() => {
    if (pageKey && sortBy) {
      if (inited === 'initial') {
        firstLoad();
      }
    }
  });

  const firstLoad = () => {
    const date = {
      pageKey,
      sortBy,
    };
    dispatch(Redux.thunks.marking.loadList(date));
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
