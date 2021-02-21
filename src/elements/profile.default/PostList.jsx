import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Redux from "../../redux";
import Confs from "../../confs";

import PostItem from "./PostItem";

function PostList(props) {

  const dispatch = useDispatch();

  const { params, postList: { loadStatus, postOids, prevOid, prevPos } } = useSelector(state => state.profile);

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
    dispatch(Redux.thunks.profile.LoadPostList(data));
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
        if (postOids?.length) {
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
  if(postOids?.length){
    postOids.forEach((postOid) => {
      ItemDomList.push(
        <PostItem key={postOid} postOid={postOid} />
      );
    });
  }

  return (
    <div className="d-grid gap-3 posting-list">
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

export default PostList;
