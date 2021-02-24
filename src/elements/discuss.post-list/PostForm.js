import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Redux from "../../redux";
import Confs from "../../confs";

import EditArea from "../common/EditArea";
import EditErrors from "../common/EditErrors";
import EditFiles from "../common/EditFiles";
import EditToolBar from "../common/EditToolBar";

const login_url = `https://id.${document.domain}/login`;

function PostForm(props) {
  const { postTo, listOf, isRoot = false } = props;

  const editAreaDomId = `EditArea_${postTo}`;

  const dispatch = useDispatch();
  const { userIid } = useSelector((state) => state.users);
  const formVal = useSelector((state) => state.discuss.formKvs[postTo]);

  const { posting, message, errors, showing } = formVal || {};
  const has_msg = message?.length ? true : false;
  const isShowForm = isRoot || showing ? true : false;

  const [formFiles, set_formFiles] = useState({});

  useEffect(() => {
    if (!formVal) {
      dispatch(Redux.actions.discuss.init_form(postTo));
    }
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!errors?.length) {
        return;
      }
      const error = Array.from(errors).shift();
      const time_new = (new Date()).getTime();
      if (time_new - error.time >= 3000) {
        dispatch(Redux.actions.discuss.shift_form_error({ postTo }));
      }
    }, 1000);
    return () => clearTimeout(timer);
  });

  if (!formVal) {
    return [];
  }

  const onClick_submit = function () {
    console.log('onClick_submit');
    if (!has_msg) {
      dispatch(Redux.actions.discuss.push_form_error({
        postTo,
        error: `Comments can't be blank.`,
      }));
      return;
    }
    const data = {
      postTo,
      message,
    };
    dispatch(Redux.thunks.discuss.createPost(data));
    window.resizeFrameHeight();
  };

  const onChange_EditArea = function (text) {
    dispatch(Redux.actions.discuss.set_form_message({ postTo, message: text }));
    dispatch(Redux.actions.discuss.clean_form_error({ postTo }));
    window.resizeFrameHeight();
  };

  const onUploadEvent = function (pack) {
    const { finc, what, data } = pack;
    set_formFiles(Object.assign({}, formFiles, {
      [finc]: pack
    }));

    switch (what) {
      case 'failure':
        dispatch(Redux.actions.discuss.push_form_error({
          postTo,
          error: data,
        }));
        break;
      case 'success':
        const o_box = document.getElementById(editAreaDomId);
        let append = o_box.innerText ? '\n' : '';
        append += `<img src="attach:${data}"/>`;
        o_box.innerText = o_box.innerText + append
        o_box.focus();
        dispatch(Redux.actions.discuss.set_form_message({ postTo, message: o_box.innerText }));
        dispatch(Redux.actions.discuss.clean_form_error({ postTo }));
        break;
      default:
        break;
    }
    window.resizeFrameHeight();
  }

  const SubmitButton = () => {
    if (!userIid) {
      return (
        <a href={login_url} className="ms-auto btn btn-sm btn-secondary">Login First</a>
      );
    }
    if (posting) {
      return (
        <button className="ms-auto btn btn-sm btn-primary submit" disabled>
          <i className="fas fa-circle-notch fa-spin"></i>
        </button>
      );
    }
    return (
      <button
        className={`ms-auto btn btn-sm btn-primary submit`}
        disabled={!has_msg}
        onClick={() => { onClick_submit(); }}
      >
        POST
      </button>
    );
  };

  if (userIid === false) {
    return null;
  }

  if (!userIid) {
    if (isRoot) {
      return (
        <div className="discuss-form">
          <div className="info">You need to log in to comment.</div>
        </div>
      );
    }
    return null;
  }

  // if (userIid !== 1) {
  //   return (
  //     <div className="discuss-form">
  //       <div className="info">
  //         Under maintenance, stop posting new comments for a few minutes.
  //       </div>
  //     </div>
  //   );
  // }

  return (
    <div className={`${isRoot ? '' : 'mt-3'} discuss-form ${isShowForm ? '' : 'd-none'}`}>
      <div className="editor">
        <EditArea domId={editAreaDomId} innerText={message} onChange={onChange_EditArea} />
        <EditErrors errors={errors} />
        <EditFiles files={formFiles} />
        <EditToolBar editAreaDomId={editAreaDomId} SubmitButton={SubmitButton} enableImgBtn={true} onUploadEvent={onUploadEvent} />
      </div>
    </div>
  );
}
export default PostForm;
