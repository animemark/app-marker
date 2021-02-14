import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Redux from "../../redux";
import Confs from "../../confs";

import EditArea from "../common/EditArea";
import EditToolBar from "../common/EditToolBar";

function PostForm(props) {
  const { postTo } = props;

  const editAreaDomId = `EditArea_${postTo}`;

  const dispatch = useDispatch();
  const { userIid, userKvs } = useSelector((state) => state.users);
  const userDoc = userKvs[userIid];

  const formVal = useSelector((state) => state.discuss.formKvs[postTo]);

  const { posting, message, errorNo } = formVal;
  const hasContent = message.length ? true : false;

  const onClick_submit = function () {
    if (!hasContent) {
      dispatch(
        Redux.actions.discuss.set_form_errorNo({ postTo, errorNo: 1001 })
      );
      return;
    }
    const data = {
      postTo,
      message,
    };
    dispatch(Redux.thunks.discuss.createPost(data));
  };

  const onChange_EditArea = function (text) {
    dispatch(Redux.actions.discuss.set_form_message({ postTo, message: text }));
    if (errorNo) {
      dispatch(Redux.actions.discuss.set_form_errorNo({ postTo, errorNo: 0 }));
    }
    window.resizeFrameHeight();
  };

  const SubmitButton = () => {
    if (posting) {
      return (
        <button className="ms-auto btn btn-sm btn-primary submit" disabled>
          <i className="fas fa-circle-notch fa-spin"></i>
        </button>
      );
    }
    if (userDoc) {
      return (
        <button
          className="ms-auto btn btn-sm btn-primary submit"
          disabled={!hasContent}
          onClick={onClick_submit}
        >
          POST
        </button>
      );
    }
    return (
      <button className="ms-auto btn btn-sm btn-secondary submit" disabled>
        Login First
      </button>
    );
  };

  const EditError = () => {
    if (!errorNo) return null;
    switch (errorNo) {
      case 1001:
        return (
          <div className="alert alert-danger error">
            Comments can't be blank.
          </div>
        );
      case Confs.eno.LoginRequired:
        return (
          <div className="alert alert-danger error">
            It looks like you have not logged in yet?
          </div>
        );
      default:
        return (
          <div className="alert alert-danger error">
            Unknown error, please try again.
          </div>
        );
    }
  };

  if (userIid === false) {
    return null;
  }

  if (!userIid) {
    return (
      <div className="discuss-form">
        <div className="info">You need to log in to comment.</div>
      </div>
    );
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
    <div className="discuss-form">
      <div className="editor">
        <EditArea domId={editAreaDomId} innerText={message} onChange={onChange_EditArea} />
        <EditError />
        <EditToolBar editAreaDomId={editAreaDomId} SubmitButton={SubmitButton} />
      </div>
    </div>
  );
}
export default PostForm;
