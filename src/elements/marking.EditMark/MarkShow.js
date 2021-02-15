import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Redux from '../../redux';
import Confs from "../../confs";
import Funcs from "../../funcs";

function MarkShow() {

  const [deleConfirm, set_deleConfirm] = useState(0);

  const dispatch = useDispatch();
  const { ssconfs } = useSelector(state => state.ssconfs);
  const { markDoc, deleing } = useSelector((state) => state.marking);

  useEffect(() => {
    window.resizeFrameHeight();
  });

  useEffect(() => {
    if (deleConfirm) {
      const timer = setTimeout(() => {
        set_deleConfirm(deleConfirm - 1);
      }, 1000);
      return () => {
        clearTimeout(timer);
      };
    }
  });

  const onClick_edit = () => {
    dispatch(Redux.actions.marking.set_editing(true));
  };

  const onClick_deleOpen = () => {
    set_deleConfirm(5);
  };

  const onClick_deleExec = () => {
    const data = {
      markOid: markDoc._id,
    };
    dispatch(Redux.thunks.marking.deleteMark(data));
  };

  if (!markDoc) {
    return (
      <div className="marking-show">
        <div className="d-grid">
          <button className="btn btn-sm btn-outline-success" type="button" onClick={onClick_edit}>I want to Mark</button>
        </div>
      </div>
    );
  }

  const { martus, score, _comment_in_html, _docKind } = markDoc;
  const _confs_martus = ssconfs.martus[_docKind];

  const EditBtnDom = () => {
    if (deleing) {
      return (
        <div>
          <button type="button" className="btn btn-sm btn-outline-danger" disabled>
            <i className="fas fa-circle-notch fa-spin"></i>
            <span className="ms-2">Deleting</span>
          </button>
        </div>
      );
    }

    if (deleConfirm) {
      return (
        <div>
          <button type="button" className="btn btn-sm btn-outline-danger" onClick={onClick_deleExec}>
            <span>Sure to delete?</span>
          </button>
        </div>
      );
    }

    return (
      <div>
        <button type="button" className="btn btn-sm btn-link" onClick={onClick_edit}>Edit</button>
        <button type="button" className="btn btn-sm btn-link text-muted" onClick={onClick_deleOpen}>Delete</button>
      </div>
    );
  };

  return (
    <div className="marking-show">
      <div className="MyMark">
        <div className="d-flex justify-content-between align-items-center headBar">
          <b>My Mark</b>
          <EditBtnDom />
        </div>
        <div className="mt-1">My status: {_confs_martus[martus].text}</div>
        <div className="mt-1">My rating: {score ? `(${score}) ${ssconfs.scores[score].text}` : '[N/A]'}</div>
        <div className="mt-1" dangerouslySetInnerHTML={{ __html: Funcs.common.format_limit_html(_comment_in_html) }}></div>
      </div>
    </div>
  );
}

export default MarkShow;

// <span className="d-none font-monospace">({deleConfirm})</span>