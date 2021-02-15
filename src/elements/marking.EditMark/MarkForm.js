import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Redux from "../../redux";
import Confs from "../../confs";
import Funcs from '../../funcs';

import EditArea from "../common/EditArea";
import EditToolBar from "../common/EditToolBar";

const _confs = window._ssconfs;

function MarkForm(props) {

  const editAreaDomId = `editArea_mark`;

  const dispatch = useDispatch();

  const { pageKey, formObj } = useSelector((state) => state.marking);
  const { errorNo, posting, martus, score, comment } = formObj;

  const {
    docKind: _docKind
  } = Funcs.common.info_from_pageKey(pageKey);
  const _confs_martus = _confs.marking.martus[_docKind];
  const _confs_scores = _confs.marking.scores;

  useEffect(() => {
    window.resizeFrameHeight();
  });

  const onClick_submit = function () {
    if (!martus) {
      dispatch(
        Redux.actions.marking.set_form_errorNo(1001)
      );
      return;
    }
    const data = {
      pageKey,
      martus,
      score,
      comment,
    };
    dispatch(Redux.thunks.marking.upsertMark(data));
  };

  const onClick_cancel = function () {
    dispatch(Redux.actions.marking.set_editing(false));
  };

  const onChange_EditArea = function (text) {
    dispatch(Redux.actions.marking.set_form_comment(text));
    if (errorNo) {
      dispatch(Redux.actions.marking.set_form_errorNo(0));
    }
    window.resizeFrameHeight();
  };

  // const onChange_TextArea = function (event) {
  //   dispatch(Redux.actions.marking.set_form_comment(event.target.value));
  //   if (errorNo) {
  //     dispatch(Redux.actions.marking.set_form_errorNo(0));
  //   }
  //   window.resizeFrameHeight();
  // };

  const onChange_martus = (evt) => {
    dispatch(Redux.actions.marking.set_form_martus(evt.target.value));
  };

  const onChange_score = (evt) => {
    dispatch(Redux.actions.marking.set_form_score(Number(evt.target.value)));
  };


  const SubmitButton = () => {
    if (posting) {
      return (
        <button className="ms-auto btn btn-sm btn-primary submit" disabled>
          <i className="fas fa-circle-notch fa-spin"></i>
        </button>
      );
    }
    return (
      <button className="ms-auto btn btn-sm btn-primary submit" onClick={onClick_submit}>Submit</button>
    );
  };

  const EditError = () => {
    if (!errorNo) return null;
    switch (errorNo) {
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

  const MyStatusDoms = [];
  for (const [file, item] of Object.entries(_confs_martus)) {
    MyStatusDoms.push((
      <div key={file} className="form-check form-check-inline">
        <input className="form-check-input" type="radio" id={`martus_${file}`} name="martus" value={file} checked={martus === file} onChange={onChange_martus} />
        <label className="form-check-label" htmlFor={`martus_${file}`}>{item.text}</label>
      </div>
    ));
  }

  const MyRatingDoms = [];
  MyRatingDoms.push((
    <div key={0} className="form-check form-check-inline">
      <input className="form-check-input" type="radio" id={`score_0`} name="score" value={0} checked={score === 0} onChange={onChange_score} />
      <label className="form-check-label" htmlFor={`score_0`}>[N/A]</label>
    </div>
  ));
  for (const [file, item] of Object.entries(_confs_scores)) {
    const v_score = Number(file);
    const v_title = item.text;
    MyRatingDoms.push((
      <div key={v_score} className="form-check form-check-inline">
        <input className="form-check-input" type="radio" id={`score_${v_score}`} name="score" value={v_score} checked={v_score === score} onChange={onChange_score} />
        <label className="form-check-label" htmlFor={`score_${v_score}`}>({v_score}) {v_title}</label>
      </div>
    ));
  }

  return (
    <div className="marking-form">
      <div className="editor">
        <div className="d-flex justify-content-between align-items-center headBar">
          <b>Marking</b>
          <button className="ms-auto btn btn-sm btn-link cancel" onClick={onClick_cancel}>Cancel</button>
        </div>
        <div className="mt-3">My status</div>
        <div>
          {MyStatusDoms}
        </div>
        <div className="mt-3">My rating <small className="text-muted">(Optional)</small></div>
        <div>
          {MyRatingDoms}
        </div>
        <div className="mt-3">My Comment <small className="text-muted">(Optional)</small></div>
        <EditArea domId={editAreaDomId} innerText={comment} onChange={onChange_EditArea} css="border-top" />
        <EditError />
        <EditToolBar editAreaDomId={editAreaDomId} SubmitButton={SubmitButton} />
      </div>
    </div>
  );
}

export default MarkForm;
