import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Redux from "../../redux";
import Confs from "../../confs";

import SortByBar from "./SortByBar";
import MarkItem from "./MarkItem";

function MarkList(props) {

  const dispatch = useDispatch();

  const { params, sortBy, markLis: { loadStatus, markOids, prevOid, prevPos } } = useSelector(state => state.marking);

  useEffect(() => {
    window.resizeFrameHeight();
  });

  useEffect(() => {
    if (loadStatus === "initial") {
      loadMoreAct();
    }
  });

  const loadMoreAct = () => {
    const data = {
      sortBy,
      ...params,
      prevOid,
      prevPos,
    };
    dispatch(Redux.thunks.marking.loadList(data));
  };

  const LoadMoreDom = () => {
    let BtnDom = null;
    switch (loadStatus) {
      case 'initial':
        BtnDom = (
          <button type="button" className="btn btn-sm btn-secondary" onClick={() => loadMoreAct()}>Start Load</button>
        );
        break;
      case 'success':
        BtnDom = (
          <button type="button" className="btn btn-sm btn-secondary" onClick={() => loadMoreAct()}>Load More</button>
        );
        break;
      case 'failure':
        BtnDom = (
          <button type="button" className="btn btn-sm btn-secondary" onClick={() => loadMoreAct()}>Try Again</button>
        );
        break;
      case 'pending':
        BtnDom = (
          <button type="button" className="btn btn-sm btn-secondary disabled">
            <i className="fas fa-circle-notch fa-spin"></i>
          </button>
        );
        break;
      case 'no_more':
        if (markOids?.length) {
          BtnDom = (
            <button type="button" className="btn btn-sm btn-light disabled">No More</button>
          );
        } else {
          BtnDom = (
            <button type="button" className="btn btn-sm btn-light disabled">Be the first to make a mark.</button>
          );
        }
        break;
      default:
        break;
    }
    if (BtnDom) {
      return (
        <div className="d-grid load-more">
          {BtnDom}
        </div>
      );
    }
    return null;
  };

  const itemList_to_DomList = markOids?.map((markOid) => (
    <MarkItem key={markOid} markOid={markOid} />
  ));

  return (
    <div className="marking-list">
      <div className="d-grid gap-3">
        {Boolean(params.showSortByBar) &&
          <SortByBar />
        }
        {itemList_to_DomList}
        {loadStatus === 'failure' &&
          <div className="alert alert-danger">
            An exception was encountered while loading the list.
        </div>
        }
        <LoadMoreDom />
      </div>
    </div>
  );
}

export default MarkList;
