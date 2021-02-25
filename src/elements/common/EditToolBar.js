import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Redux from "../../redux";
import Confs from "../../confs";

function EditToolBar(props) {

  const {
    editAreaDomId,
    SubmitButton,
    enableImgBtn = false,
    onUploadEvent = () => { }
  } = props;

  const uploaderCallback = (pack) => {
    if (typeof onUploadEvent === 'function') {
      onUploadEvent(pack);
    }
  };

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

  const BtnsDomArray = Object.entries(btns).map(([key, val]) => (
    <button
      key={key}
      type="button"
      className="btn btn-sm btn-light"
      onClick={() => onClick_toolBtn(editAreaDomId, key)}
    >
      <span className={`fas fa-fw ${val}`}></span>
    </button>
  ));

  const ImgBtnDom = enableImgBtn ? (
    <button
      key="img"
      type="button"
      className="btn btn-sm btn-light"
      onClick={() => onClick_toolImg(editAreaDomId)}
    >
      <input type="file" className="d-none" id={`EditFile_${editAreaDomId}`} accept="image/*"
        onChange={(e) => { uploader_event(e, uploaderCallback) }}
        onDragEnter={(e) => { uploader_event(e, uploaderCallback) }}
        onDragOver={(e) => { uploader_event(e, uploaderCallback) }}
        onDrop={(e) => { uploader_event(e, uploaderCallback) }}
      />
      <span className="fas fa-fw fa-image"></span>
    </button>
  ) : null;

  return (
    <div className="toolBar">
      <div className="btn-group-wrapper">
        <div className="btn-group">
          {ImgBtnDom}
          {BtnsDomArray}
        </div>
      </div>
      <SubmitButton />
    </div>
  );
}

export default EditToolBar;

const onClick_toolImg = function (editAreaDomId) {
  const fileElem = document.getElementById(`EditFile_${editAreaDomId}`);
  if (fileElem) {
    fileElem.click();
  }
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


function uploader_event($event, callback) {
  console.log('uploader_event', $event);
  $event.stopPropagation();
  $event.preventDefault();
  uploader_upload($event, callback);
  $event.target.value = '';
}

const upload_file_inc = {
  val: 0,
};
function uploader_upload($event, callback) {
  const files = $event?.target?.files || $event?.dataTransfer?.files || null;
  if (!files?.[0]) {
    console.log('files?.[0]');
    return;
  }
  const file = files[0];

  const finc = ++upload_file_inc.val;

  callback({ finc, what: 'initial' });

  if (file.size > 5 * 1024 * 1024) {
    console.log('File size limit is 5MB', 'warning');
    console.log('Unfortunately your image upload failed. Please verify that your image is under 5MB.');
    callback({
      finc,
      what: 'failure',
      data: 'invalid_file_size'
    });
    return;
  }

  const regexp_img = /(image\/|\.)(jpeg|jpg|gif|png|webp)$/i;
  const is_img = regexp_img.test(file.type) || regexp_img.test(file.name) || false;
  if (!is_img) {
    console.log('Accept .jpeg .jpg .gif .png .webp file only', 'warning');
    callback({
      finc,
      what: 'failure',
      data: 'invalid_file_type'
    });
    return;
  }

  const formData = new FormData();
  formData.set('content', file);

  callback({ finc, what: 'pending' });

  Redux.networks.app_marker_api('/api/common/upload', formData, {
    onUploadProgress: (progressEvent) => {
      const { loaded, total } = progressEvent;
      callback({
        finc,
        what: 'posting', data: {
          loaded,
          total,
        }
      });
    }
  })
    .then(resp => resp.data)
    .then((json) => {
      const { err, res } = json;
      if (err) {
        callback({
          finc,
          what: 'failure',
          data: err,
        });
        return;
      }
      callback({ finc, what: 'success', data: res.name });
    })
    .catch((error) => {
      callback({
        finc,
        what: 'failure',
        data: 'unknown',
      });
    });

}