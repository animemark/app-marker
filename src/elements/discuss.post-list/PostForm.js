import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Redux from "../../redux";
import Confs from "../../confs";

import EditArea from "../common/EditArea";
import EditError from "../common/EditError";
import EditFiles from "../common/EditFiles";
import EditToolBar from "../common/EditToolBar";

const login_url = `https://id.${document.domain}/login`;

const errors = {
  login: 'It looks like you have not logged in yet?',
  message_empty: "Comments can't be blank.",
  invalid_file_size: 'Please verify that your image is under 5MB.',
  invalid_file_type: 'Accept .jpeg .jpg .gif .png .webp file only.',
  no_file_uploaded: 'No files were uploaded.',
  invalid_file_data: 'An error occurred while recognizing the file.',
  write_file_failed: 'An error occurred while writing the file.',
  unknown: 'Unknown error, please try again.',
};

function PostForm(props) {
  const { postTo, listOf, isRoot = false } = props;

  const editAreaDomId = `EditArea_${postTo}`;

  const dispatch = useDispatch();
  const { userIid } = useSelector((state) => state.users);
  const formVal = useSelector((state) => state.discuss.formKvs[postTo]);

  const { posting, message, showing, error, files } = formVal || {};
  const has_msg = message?.length ? true : false;
  const isShowForm = isRoot || showing ? true : false;

  useEffect(() => {
    if (!formVal) {
      dispatch(Redux.actions.discuss.init_form(postTo));
    }
  });

  if (!formVal) {
    return [];
  }

  const onClick_submit = function () {
    console.log('onClick_submit');
    if (!has_msg) {
      dispatch(Redux.actions.discuss.set_form_error({
        postTo,
        error: 'message_empty',
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
    dispatch(Redux.actions.discuss.set_form_error({ postTo, error: null }));
    window.resizeFrameHeight();
  };

  const onUploadEvent = function (pack) {
    const { finc, what, data } = pack;
    dispatch(Redux.actions.discuss.assign_form_files({
      postTo,
      files: {
        [finc]: pack
      },
    }));

    switch (what) {
      case 'failure':
        dispatch(Redux.actions.discuss.set_form_error({ postTo, error: data }));
        break;
      case 'success':
        const o_box = document.getElementById(editAreaDomId);
        let append = o_box.innerText ? '\n' : '';
        append += `<img src="attach:${data}"/>`;
        o_box.innerText = o_box.innerText + append;
        o_box.focus();
        dispatch(Redux.actions.discuss.set_form_message({ postTo, message: o_box.innerText }));
        dispatch(Redux.actions.discuss.set_form_error({ postTo, error: null }));
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

  const erstr = error ? (errors[error] || errors.unknown) : null;
  return (
    <div className={`${isRoot ? '' : 'mt-3'} discuss-form ${isShowForm ? '' : 'd-none'}`}>
      <div className="editor">
        <EditArea domId={editAreaDomId} innerText={message} onChange={onChange_EditArea} />
        <EditError erstr={erstr} />
        <EditFiles files={files} />
        <EditToolBar editAreaDomId={editAreaDomId} SubmitButton={SubmitButton} enableImgBtn={true} onUploadEvent={onUploadEvent} />
      </div>
    </div>
  );
}
export default PostForm;
