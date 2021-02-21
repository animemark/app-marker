import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Redux from "../../redux";
import Confs from "../../confs";

import MarkItem from "./MarkItem";

function MarkList(props) {

  const dispatch = useDispatch();

  const { params, markList: { loadStatus, markKvs, relaKvs, markOids, relaIids, prevOid, prevPos } } = useSelector(state => state.profile);

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
      ...params,
      prevOid,
      prevPos,
    };
    dispatch(Redux.thunks.profile.LoadMarkList(data));
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
        if (markOids?.length || relaIids?.length) {
          BtnDom = (
            <button type="button" className="btn btn-sm btn-light disabled">No More</button>
          );
        } else {
          BtnDom = (
            <button type="button" className="btn btn-sm btn-light disabled">No Data</button>
          );
        }
        break;
      default:
        break;
    }
    if (BtnDom) {
      return (
        <div className="pt-5 d-grid load-more">
          {BtnDom}
        </div>
      );
    }
    return null;
  };

  const ItemDomList = [];
  if(markOids?.length){
    markOids.forEach((markOid) => {
      ItemDomList.push(
        <MarkItem key={markOid} markOid={markOid} />
      );
    });
  }else if(relaIids?.length){
    relaIids.forEach((relaIid) => {
      ItemDomList.push(
        <MarkItem key={relaIid} relaIid={relaIid} />
      );
    });
  }

  return (
    <div className="d-grid gap-3 marking-list">
      {ItemDomList}
      { loadStatus === 'failure' &&
        <div className="alert alert-danger">
          An exception was encountered while loading the list.
        </div>
      }
      <LoadMoreDom />
    </div>
  );
}

export default MarkList;
