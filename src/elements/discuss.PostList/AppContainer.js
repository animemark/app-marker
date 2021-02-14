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
  const { listAt, postTo, badges, sortBy, inited } = useSelector(state => state.discuss);

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
      let type = window.localStorage.getItem(Confs.localStorageKeys.discuss_sortBy);
      type = Confs.discuss.sortTypes[type] ? type : Confs.discuss.sortByDefault;
      dispatch(Redux.actions.discuss.set_sortBy(type));
    }
  });

  useEffect(() => {
    if (listAt && sortBy) {
      if (inited === 'initial') {
        firstLoad();
      }
    }
  });

  const firstLoad = () => {
    const data = {
      listAt,
      sortBy,
      prevOid: null,
      prevPos: null,
    };
    dispatch(Redux.thunks.discuss.loadList(data));
  };

  if (!listAt || !postTo || !sortBy || badges === false || ['initial', 'pending'].includes(inited)) {
    return (
      <div className="d-flex justify-content-center align-items-center">
        <i className="fas fa-3x fa-circle-notch fa-spin"></i>
      </div>
    );
  }

  if (inited === 'failure') {
    return (
      <div className="d-flex justify-content-center align-items-center cursor-pointer" onClick={firstLoad}>
        <i className="fas fa-3x fa-sync-alt"></i>
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
