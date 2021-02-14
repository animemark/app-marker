import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Redux from "../../redux";
import Confs from "../../confs";

function EditToolBar(props) {

  const { editAreaDomId, SubmitButton } = props;

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
      onClick={() => onClick_toolBtn(editAreaDomId, key)}
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
            onClick={() => onClick_toolBtn(editAreaDomId, "img")}
          >
            <span className="fas fa-fw fa-image"></span>
          </button>
          {btnsDomArray}
        </div>
      </div>
      <SubmitButton />
    </div>
  );
}

export default EditToolBar;


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
