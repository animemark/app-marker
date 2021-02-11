import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Redux from '../redux';
import Confs from '../confs';

function SortByBar() {

  const dispatch = useDispatch();

  const { pageDoc, sortBy } = useSelector(state => state.discuss);

  const PageInfoDom = () => {
    if (!pageDoc) {
      return (
        <span></span>
      );
    }
    const unit_t = pageDoc.countChild > 1 ? 'topics' : 'topic';
    const unit_p = pageDoc.countReply > 1 ? 'posts' : 'post';
    return (
      <div>
        <span>{pageDoc.countChild} {unit_t}</span>
        <span className="ms-2">{pageDoc.countReply} {unit_p}</span>
      </div>
    );
  };

  const onClick_sortBy = (type) => {
    dispatch(Redux.actions.discuss.set_sortBy(type));
  };

  const SortBtnDom = (props) => {
    const { type } = props;
    const type_to_text = Confs.sortTypes;
    if (type === sortBy) {
      return (
        <button type="button" className="btn btn-sm btn-link ml-2 cursor-normal">{type_to_text[type]}</button>
      );
    }
    return (
      <button type="button" className="btn btn-sm btn-link ml-2 text-decoration-none text-muted" onClick={() => onClick_sortBy(type)}>{type_to_text[type]}</button>
    );
  };

  return (
    <div className="mt-3 d-flex justify-content-between align-items-center">
      <PageInfoDom />
      <div>
        <SortBtnDom type="hot" />
        <SortBtnDom type="new" />
        <SortBtnDom type="old" />
      </div>
    </div>
  );
}

export default SortByBar;