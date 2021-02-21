import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Redux from "../../redux";
import Confs from '../../confs';
import Clock from "../common/Clock";

import LayoutHeader from "./LayoutHeader";
import LayoutMainer from "./LayoutMainer";
import LayoutFooter from "./LayoutFooter";

function Rooter() {

  const dispatch = useDispatch();
  const { params, status, sortBy } = useSelector(state => state.marking);

  useEffect(() => {
    window.resizeFrameHeight();
  });

  useEffect(() => {
    const params = window.get_url_params();
    const sortBy = params.sortBy || window.localStorage.getItem(Confs.localStorageKeys.marking_sortBy);
    if (sortBy) {
      dispatch(Redux.actions.marking.set_sortBy(sortBy));
    }
    dispatch(Redux.actions.marking.set_params(params));
  }, []);// one-time useEffect

  useEffect(() => {
    if (params) {
      if (status === 'initial') {
        firstLoad();
      }
    }
  });

  const firstLoad = () => {
    const date = {
      sortBy,
      ...params,
    };
    dispatch(Redux.thunks.marking.loadList(date));
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
      <LayoutHeader />
      <LayoutMainer />
      <LayoutFooter />
      <Clock />
    </>
  );
}

export default Rooter;
