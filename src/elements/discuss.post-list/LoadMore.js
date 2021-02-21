import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Redux from "../../redux";
import Confs from "../../confs";

function LoadMore(props) {
  const {
    isMainList = true,
    loadStatus = 'initial',
    countLoaded = 0,
    countChild = 0,
    countReply = 0,
    onClick_loadMore = () => { },
    isHiddenList = false,
    onToggle_showHideList = () => { },
  } = props;

  let BtnDom = null;

  if (isMainList) {
    /**
     * depth 1
     */
    switch (loadStatus) {
      case 'initial':
        BtnDom = (
          <button type="button" className="btn btn-sm btn-secondary" onClick={onClick_loadMore}>Start Load</button>
        );
        break;
      case 'success':
        if (countChild) {
          BtnDom = (
            <button type="button" className="btn btn-sm btn-secondary" onClick={onClick_loadMore}>Load More ({countLoaded}/{countChild})</button>
          );
        } else {
          BtnDom = (
            <button type="button" className="btn btn-sm btn-secondary" onClick={onClick_loadMore}>Load More</button>
          );
        }
        break;
      case 'failure':
        BtnDom = (
          <button type="button" className="btn btn-sm btn-secondary" onClick={onClick_loadMore}>Try Again</button>
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
        if (countLoaded) {
          BtnDom = (
            <button type="button" className="btn btn-sm btn-light disabled">No More</button>
          );
        } else {
          BtnDom = (
            <button type="button" className="btn btn-sm btn-light disabled">Be the first to comment.</button>
          );
        }
        break;
      default:
        break;
    }
    if (BtnDom) {
      return (
        <div className="mt-5 d-grid gap-2 load-more">
          {BtnDom}
        </div>
      );
    }
  } else {
    /**
     * sub list
     */
    if (countReply) {
      const reps = countReply;
      const unit = countReply > 1 ? 'replies' : 'reply';
      switch (loadStatus) {
        case 'initial':
          BtnDom = (
            <div className="d-flex align-items-center small text-muted cursor-pointer" onClick={onClick_loadMore}>
              <i className="fas fa-fw fa-caret-down"></i>
              <span className="ms-2">load {reps} {unit}</span>
            </div>
          );
          break;
        case 'success':
          BtnDom = (
            <div className="d-flex align-items-center small text-muted cursor-pointer" onClick={onClick_loadMore}>
              <i className="fas fa-fw fa-caret-down"></i>
              <span className="ms-2">load more</span>
            </div>
          );
          break;
        case 'failure':
          BtnDom = (
            <div className="d-flex align-items-center small text-muted cursor-pointer" onClick={onClick_loadMore}>
              <i className="fas fa-fw fa-caret-down"></i>
              <span className="ms-2">try again</span>
            </div>
          );
          break;
        case 'pending':
          BtnDom = (
            <div className="d-flex align-items-center small text-muted">
              <i className="fas fa-fw fa-circle-notch fa-spin"></i>
              <span className="ms-2">loading...</span>
            </div>
          );
          break;
        case 'no_more':
          if (isHiddenList) {
            BtnDom = (
              <div className="d-flex align-items-center small text-muted cursor-pointer" onClick={onToggle_showHideList}>
                <i className="fas fa-fw fa-caret-down"></i>
                <span className="ms-2">show {countReply} {unit}</span>
              </div>
            );
          } else {
            BtnDom = (
              <div className="d-flex align-items-center small text-muted cursor-pointer" onClick={onToggle_showHideList}>
                <i className="fas fa-caret-up"></i>
                <span className="ms-2">fold up</span>
              </div>
            );
          }
          break;
        default:
          break;
      }
      if (BtnDom) {
        return (
          <div className="mt-3 d-flex justify-content-start align-items-end load-more">
            {BtnDom}
          </div>
        );
      }
    }
  }

  return null;
}

export default LoadMore;