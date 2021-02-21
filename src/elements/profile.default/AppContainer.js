import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Redux from "../../redux";
import Confs from '../../confs';
import Clock from "../common/Clock";

import LayoutHeader from "./LayoutHeader";
import LayoutMainer from "./LayoutMainer";
import LayoutFooter from "./LayoutFooter";

const _confs = window._ssconfs;

function Rooter() {

  const dispatch = useDispatch();
  const { params, status } = useSelector(state => state.profile);
  const [error, set_error] = useState(null);

  useEffect(() => {
    window.resizeFrameHeight();
  });

  useEffect(() => {
    //console.log('one time useEffect');
    const params = window.get_url_params();
    // user is required
    if (!params.user) {
      set_error('no-user');
      return;
    }
    // default menu selected
    if (!Confs.profile.menus[params.menu]) {
      params.menu = Confs.profile.menu_default;
    }
    // default params for each menus
    switch (params.menu) {
      case Confs.profile.menus.marks.file:
        if (!_confs.marking.file_to_file[params.martus]) {
          params.martus = null;
        }
        break;

      case Confs.profile.menus.posts.file:
        break;

      case Confs.profile.menus.files.file:
        break;

      default:
        break;
    }
    dispatch(Redux.actions.profile.set_params(params));
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
    const date = {
      ...params,
    };
    switch (params.menu) {
      case Confs.profile.menus.marks.file:
        dispatch(Redux.thunks.profile.LoadMarkList(date));
        break;

      case Confs.profile.menus.posts.file:
        dispatch(Redux.thunks.profile.LoadPostList(date));
        break;

      default:
        break;
    }
  };

  if (error) {
    switch (error) {
      case 'no-user':
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
    <div className="AppContainer profile">
      <LayoutHeader />
      <LayoutMainer />
      <LayoutFooter />
      <Clock />
    </div>
  );
}

export default Rooter;
