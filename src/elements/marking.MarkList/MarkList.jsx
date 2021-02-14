import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Redux from "../../redux";
import Confs from "../../confs";

import MarkItem from "./MarkItem";

function MarkList(props) {

  const dispatch = useDispatch();

  const { pageKey, sortBy, markLis: { loadStatus, markOids, prevOid, prevPos } } = useSelector(state => state.marking);

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
      pageKey,
      sortBy,
      prevOid,
      prevPos,
    };
    dispatch(Redux.thunks.marking.loadList(data));
  };

  const LoadMoreDom = () => {
    switch (loadStatus) {
      case 'initial':
        return (
          <button type="button" className="btn btn-sm btn-secondary" onClick={() => loadMoreAct()}>Start Load</button>
        );
      case 'success':
        return (
          <button type="button" className="btn btn-sm btn-secondary" onClick={() => loadMoreAct()}>Load More</button>
        );
      case 'failure':
        return (
          <button type="button" className="btn btn-sm btn-secondary" onClick={() => loadMoreAct()}>Try Again</button>
        );
      case 'pending':
        return (
          <button type="button" className="btn btn-sm btn-secondary disabled">
            <i className="fas fa-circle-notch fa-spin"></i>
          </button>
        );
      case 'no_more':
        if (markOids?.length) {
          return (
            <button type="button" className="btn btn-sm btn-light disabled">No More</button>
          );
        } else {
          return (
            <button type="button" className="btn btn-sm btn-light disabled">Be the first to make mark.</button>
          );
        }
      default:
        break;
    }
    return null;
  };

  const itemList_to_DomList = markOids?.map((markOid) => (
    <MarkItem key={markOid} markOid={markOid} />
  ));

  return (
    <div className="marking-list">
      { itemList_to_DomList?.length > 0 &&
        <div className={`mt-3 d-grid gap-3`}>
          {itemList_to_DomList}
        </div>
      }
      { loadStatus === 'failure' &&
        <div className="mt-3 alert alert-danger">
          An exception was encountered while loading the list.
        </div>
      }
      <div className="mt-3 d-grid gap-2 load-more">
        <LoadMoreDom />
      </div>
    </div>
  );
}

export default MarkList;
