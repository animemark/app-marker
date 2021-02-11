import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Redux from "../redux";
import Confs from '../confs';
import Clock from "./Clock";
import LayoutHeader from "./LayoutHeader";
import LayoutMainer from "./LayoutMainer";
import LayoutFooter from "./LayoutFooter";

function Rooter() {

  const dispatch = useDispatch();
  const { listAt, postTo, badges, sortBy } = useSelector(state => state.discuss);

  useEffect(() => {
    if (listAt === false) {
      const pars = window.get_url_params();
      const pval = pars.list || pars.listAt || '';
      dispatch(Redux.actions.discuss.set_listAt(pval));
    }
  });

  useEffect(() => {
    if (postTo === false) {
      const pars = window.get_url_params();
      const pval = pars.post || pars.postTo || pars.list || pars.listAt || '';
      dispatch(Redux.actions.discuss.set_postTo(pval));
    }
  });

  useEffect(() => {
    if (badges === false) {
      const pars = window.get_url_params();
      const pval = pars.badges || '';
      const parr = String(pval).split(',').map(v => v.trim()).filter(v => v);
      dispatch(Redux.actions.discuss.set_badges(parr));
    }
  });

  useEffect(() => {
    if (sortBy === false) {
      let type = window.localStorage.getItem(Confs.localStorageKeys.sortBy);
      type = Confs.sortTypes[type] ? type : Confs.sortByDefault;
      dispatch(Redux.actions.discuss.set_sortBy(type));
    }
  });

  if (listAt === false || postTo === false || badges === false || sortBy === false) {
    return (
      <div className="d-flex justify-content-center align-items-center">
        <i className="fas fa-circle-notch fa-spin"></i>
      </div>
    );
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
