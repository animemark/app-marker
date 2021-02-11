import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Redux from "../redux";
import Confs from "../confs";
import EditArea from "./EditArea";

function PostForm(props) {
  const { postTo } = props;

  const EditArea_domId = `EditArea_${postTo}`;

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
    window.resizeFrameHeight("PostForm");
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

  const ToolBar = () => {
    const btns = {
      b: "fa-bold",
      i: "fa-italic",
      u: "fa-underline",
      s: "fa-strikethrough",
      a: "fa-link",
      spoiler: "fa-eye-slash",
      code: "fa-code",
      blockquote: "fa-quote-left",
      hr: "fa-arrows-alt-h",
    };
    const btnsDomArray = Object.entries(btns).map(([key, val]) => (
      <button
        key={key}
        type="button"
        className="btn btn-sm btn-light"
        onClick={() => onClick_toolBtn(EditArea_domId, key)}
      >
        <span className={`fas fa-fw ${val}`}></span>
      </button>
    ));
    return (
      <div className="toolBar">
        <div className="btn-group-wrapper">
          <div className="btn-group">
            <button
              key="img"
              type="button"
              className="d-none btn btn-sm btn-light"
              onClick={() => onClick_toolBtn(EditArea_domId, "img")}
            >
              <span className="fas fa-fw fa-image"></span>
            </button>
            {btnsDomArray}
          </div>
        </div>
        <SubmitButton />
      </div>
    );
  };

  const ErrorDom = () => {
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
        <EditArea domId={EditArea_domId} onChange={onChange_EditArea} />
        <ErrorDom />
        <ToolBar />
      </div>
    </div>
  );
}

const onClick_toolBtn = function (EditArea_domId, code) {
  //console.log(`onClick_toolBtn: ${code}`);

  const o_box = document.getElementById(EditArea_domId);
  const o_par = window.getSelectionParentElement();
  if (o_par && o_par.getAttribute("id") === EditArea_domId) {
    // console.log("selected");
  } else {
    // console.log("setEndOfContenteditable");
    window.setEndOfContenteditable(o_box.firstChild || o_box);
  }

  const o_sel = window.getSelection();
  const sel_txt = o_sel.toString() || "";
  // console.log("sel_txt:", sel_txt);

  let tag_l = "";
  let tag_r = "";
  switch (code) {
    case "b":
    case "i":
    case "u":
    case "s":
    case "spoiler":
    case "code":
    case "blockquote": {
      tag_l = `<${code}>`;
      tag_r = `</${code}>`;
      break;
    }
    case "a": {
      tag_l = '<a href="#">';
      tag_r = "</a>";
      break;
    }
    case "img": {
      tag_l = '<img src="#"/>';
      tag_r = "";
      break;
    }
    case "hr": {
      tag_l = `<hr/>`;
      tag_r = "";
      break;
    }
    default:
      return;
  }

  let insertText = "";
  let length_add = 0;

  if (
    (tag_l === "" || sel_txt.startsWith(tag_l)) &&
    (tag_r === "" || sel_txt.endsWith(tag_r))
  ) {
    insertText = sel_txt.substr(
      tag_l.length,
      sel_txt.length - tag_l.length - tag_r.length
    );
    length_add = -(tag_l.length + tag_r.length);
  } else {
    insertText = `${tag_l}${sel_txt}${tag_r}`;
    length_add = tag_l.length + tag_r.length;
  }

  const new_sta = o_sel.getRangeAt(0).startOffset;
  const new_end = o_sel.getRangeAt(0).endOffset + length_add;

  document.execCommand("insertText", false, insertText);

  const o_txt = o_box.firstChild || o_box;
  const new_range = document.createRange();
  new_range.setStart(o_txt, new_sta);
  new_range.setEnd(o_txt, new_end);
  o_sel.removeAllRanges();
  o_sel.addRange(new_range);

  o_box.focus();
};

export default PostForm;
