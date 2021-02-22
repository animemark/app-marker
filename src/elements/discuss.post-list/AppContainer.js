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
  const { params, status, sortBy } = useSelector(state => state.discuss);
  const [error, set_error] = useState(null);

  useEffect(() => {
    window.resizeFrameHeight();
  });

  useEffect(() => {
    const params = window.get_url_params();

    // a patch
    if (params.listAt && !params.listOf) {
      params.listOf = params.listAt;
    }

    /**
     * listOf params is required
     * listOf mean list the child of the specified post
     */
    if (!params.listOf) {
      set_error('no-listOf');
      return;
    }

    if (!params.postTo) {
      params.postTo = params.listOf;
    }

    params.maxDepth = Number(params.maxDepth) || 4;
    params.maxDepth = Math.min(99, params.maxDepth);
    params.maxDepth = Math.max(1, params.maxDepth);

    params._badges = [];
    if (params.badges) {
      params._badges = String(params.badges).split(',').map(v => v.trim()).filter(v => v);
    }

    params._showRelaKeys = [];
    if (params.showRelaKeys) {
      params._showRelaKeys = String(params.showRelaKeys).split(',').map(v => v.trim()).filter(v => v);
    }

    const sortBy = params.sortBy || window.localStorage.getItem(Confs.localStorageKeys.discuss_sortBy) || Confs.discuss.sortByDefault;
    if (sortBy) {
      dispatch(Redux.actions.discuss.set_sortBy(sortBy));
    }

    dispatch(Redux.actions.discuss.set_params(params));
  }, []);// one-time useEffect

  useEffect(() => {
    if (!error) {
      if (params) {
        if (status === 'initial') {
          firstLoad();
        }
      }
    }
  });

  const firstLoad = () => {
    const data = {
      ...params,
      sortBy,
      prevOid: null,
      prevPos: null,
    };
    dispatch(Redux.thunks.discuss.loadList(data));
  };


  if (error) {
    switch (error) {
      case 'no-listOf':
        return (
          <div className="alert alert-danger justify-content-center align-items-center">
            Page 404!
          </div>
        );
      default:
        break;
    }

    return null;
  }

  switch (status) {
    case 'initial':
    case 'pending':
      // loading icon
      return (
        <div className="py-5 d-flex justify-content-center align-items-center">
          <i className="fas fa-2x fa-circle-notch fa-spin"></i>
        </div>
      );

    case 'failure':
      // refresh icon
      return (
        <div className="py-5 d-flex justify-content-center align-items-center cursor-pointer" onClick={firstLoad}>
          <i className="fas fa-2x fa-sync-alt"></i>
        </div>
      );

    case 'success':
    default:
      // nothing to do
      break;
  }

  return (
    <div className="AppContainer discuss">
      <LayoutHeader />
      <LayoutMainer />
      <LayoutFooter />
      <Clock />
    </div>
  );
}

export default Rooter;
